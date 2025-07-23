import { useState, useRef } from "react";
import * as Tone from 'tone';
import { PitchDetector } from 'pitchy';
import { ModeSelector, BaseScaleSelector } from './UIComponents';
import Header from "./Header";
import InfoPanel from "./InfoPanel";
import NoteDetectionUI from "./NoteDetectionUI";
import RaagDetectionUI from "./RaagDetectionUI";


import { detectRaags } from '../services/raagDetectionService.js';
import { tanpuraService } from '../services/tanpuraService.js';
import { 
  frequencyToNoteName, 
  frequencyToHindiNoteName, 
  calculateCentDeviation 
} from '../utils/audioUtils.js';

const Body = () => {
  // STATE MANAGEMENT
  const [baseScale, setBaseScale] = useState("C");
  const baseScaleRef = useRef("C");
  const [baseOctave, setBaseOctave] = useState("4");
  const baseOctaveRef = useRef("4");

  const [detectedNote, setDetectedNote] = useState("");
  const [detectedHindiNote, setDetectedHindiNote] = useState("");
  const [centDeviation, setCentDeviation] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const isDetectingRef = useRef(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [detectionMode, setDetectionMode] = useState("note");
  const [detectedRaag, setDetectedRaag] = useState("");
  const [raagConfidence, setRaagConfidence] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const recordedNotesRef = useRef([]);
  const lastNoteTimeRef = useRef(0);
  const isRecordingRef = useRef(false);
  const [showRecordedNotes, setShowRecordedNotes] = useState(false);
  const [detectedRaags, setDetectedRaags] = useState([]);

  const [isTanpuraPlaying, setIsTanpuraPlaying] = useState(false);

  // AUDIO UTILITIES
  const handleTone = async (octave, note) => {
    try {
      await Tone.start();
      const synth = new Tone.Synth().toDestination();
      const fullNote = note + octave;
      synth.triggerAttackRelease(fullNote, "8n");
    } catch (error) {
      console.error("Note playback error:", error);
      alert("Note playback failed. Please try again.");
    }
  };

  const startTanpura = async () => {
    try {
      await tanpuraService.startTanpura(baseScale, baseOctave);
      setIsTanpuraPlaying(true);
    } catch (error) {
      console.error("Tanpura error:", error);
      alert("Tanpura failed to start. Please try again.");
    }
  };

  const stopTanpura = () => {
    tanpuraService.stopTanpura();
    setIsTanpuraPlaying(false);
  };

  // PITCH DETECTION 
  const startDetection = async () => {
    try {
      if (!navigator.mediaDevices) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsDetecting(true);
      isDetectingRef.current = true;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
      const detector = PitchDetector.forFloat32Array(2048);

      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);

      scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
        if (!isDetectingRef.current) return;

        const inputBuffer = audioProcessingEvent.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);

        let sumSquares = 0;
        for (let i = 0; i < inputData.length; i++) {
          sumSquares += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sumSquares / inputData.length);

        const [pitch, clarity] = detector.findPitch(inputData, audioContext.sampleRate);

        const clarityThreshold = 0.7;
        const minFreq = 60;
        const maxFreq = 1200;
        const minVolume = 0.001;

        if (pitch < minFreq || pitch > maxFreq || rms < minVolume) return;

        if (clarity > clarityThreshold && pitch > 0) {
          const { noteName, octave, midiNumber } = frequencyToNoteName(pitch);
          const { hindiNote } = frequencyToHindiNoteName(
            noteName, octave, midiNumber, baseScaleRef, baseOctaveRef
          );

          const fullNote = `${noteName}${octave}`;

          if (detectionMode === "note") {
            setDetectedNote(fullNote);
            setDetectedHindiNote(`${hindiNote}`);
            const cents = calculateCentDeviation(pitch, midiNumber);
            setCentDeviation(cents);
          } else if (detectionMode === "raag") {
            if (!isRecordingRef.current) {
              setDetectedRaag("Click 'Record Segment' to analyze raag");
              setRaagConfidence(0);
            } else {
              const currentTime = Date.now();
              const lastNote = recordedNotesRef.current[recordedNotesRef.current.length - 1];
              const normalizedHindiNote = hindiNote.replace(/[*₁₂₃₄₅₆₇₈₉०-९]+/g, '').replace(/\d+/g, '');
              if (
                (currentTime - lastNoteTimeRef.current > 400) &&
                (normalizedHindiNote !== lastNote)
              ) {
                recordedNotesRef.current.push(normalizedHindiNote);
                lastNoteTimeRef.current = currentTime;
                setDetectedRaag(`Recording... (${recordedNotesRef.current.length} swaras captured)`);
              }
            }
          }
        } else {
          if (detectionMode === "note") {
            setDetectedNote("");
            setDetectedHindiNote("");
            setCentDeviation(null);
          } else if (detectionMode === "raag" && !isRecordingRef.current) {
            setDetectedRaag("Click 'Record Segment' to analyze raag");
            setRaagConfidence(0);
          }
        }
      };
    } catch (error) {
      alert("Microphone error: " + error.message);
    }
  };

  const stopDetection = () => {
    setIsDetecting(false);
    isDetectingRef.current = false;
    setDetectedNote("");
    setDetectedHindiNote("");
    setDetectedRaag("");
    setRaagConfidence(0);
    setCentDeviation(null);
  };

  // RAAG RECORDING 
  const startRecording = async () => {
    setIsRecording(true);
    isRecordingRef.current = true;
    setRecordedNotes([]);
    recordedNotesRef.current = [];
    lastNoteTimeRef.current = 0;
    setDetectedRaags([]);
    setDetectedRaag("Recording... Sing or play notes in sequence");
    setRaagConfidence(0);

    if (!isDetectingRef.current) {
      await startDetection();
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    isRecordingRef.current = false;

    if (isDetectingRef.current && detectionMode === "raag") {
      stopDetection();
    }

    const finalNotes = recordedNotesRef.current;

    if (finalNotes.length > 0) {
      const detectedRaagsList = detectRaags(finalNotes);
      if (detectedRaagsList.length > 0) {
        setDetectedRaags(detectedRaagsList);
        setDetectedRaag("");
        setRaagConfidence(detectedRaagsList[0].confidence);
      } else {
        setDetectedRaag("No clear raag detected. Try singing/playing more notes in sequence.");
        setRaagConfidence(0);
        setDetectedRaags([]);
      }
    } else {
      setDetectedRaag("No notes recorded. Try again.");
      setRaagConfidence(0);
      setDetectedRaags([]);
    }
  };

  //  UI RENDERING 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-amber-50 to-stone-200 p-0 sm:p-4">
      <div className="w-full max-w-4xl flex flex-col items-center px-2 sm:px-6 py-6 border-4 border-yellow-900 rounded-2xl shadow-2xl bg-gradient-to-br from-yellow-50 via-amber-100 to-stone-100" style={{ boxShadow: "0 8px 32px 0 rgba(60, 30, 10, 0.18)" }}>
        <Header />
        {/* Info Section */}
        <div className="w-full max-w-2xl flex flex-col items-center mb-4 sm:mb-6">
          <button
            className="text-sm sm:text-base font-semibold text-yellow-900 bg-gradient-to-r from-yellow-200 to-amber-100 border border-yellow-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:from-yellow-300 hover:to-amber-200 transition-all duration-200 shadow"
            onClick={() => setInfoOpen((open) => !open)}
            aria-expanded={infoOpen}
            aria-controls="info-panel"
          >
            ℹ️ How to use?
          </button>
          {infoOpen && <InfoPanel />}
        </div>
        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl">
          <ModeSelector detectionMode={detectionMode} setDetectionMode={setDetectionMode} />
          <BaseScaleSelector
            baseScale={baseScale}
            setBaseScale={setBaseScale}
            baseOctave={baseOctave}
            setBaseOctave={setBaseOctave}
            handleTone={handleTone}
          />
          <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-stone-100 border-2 border-yellow-900 shadow-lg p-4 sm:p-6 rounded-2xl w-full flex flex-col items-center mx-auto font-serif">
            {detectionMode === "note" && (
              <NoteDetectionUI
                detectedNote={detectedNote}
                detectedHindiNote={detectedHindiNote}
                centDeviation={centDeviation}
                startDetection={startDetection}
                stopDetection={stopDetection}
                isDetecting={isDetecting}
              />
            )}
            {detectionMode === "raag" && (
              <RaagDetectionUI
                detectedRaag={detectedRaag}
                recordedNotesRef={recordedNotesRef}
                showRecordedNotes={showRecordedNotes}
                setShowRecordedNotes={setShowRecordedNotes}
                detectedRaags={detectedRaags}
                raagConfidence={raagConfidence}
                startTanpura={startTanpura}
                stopTanpura={stopTanpura}
                isTanpuraPlaying={isTanpuraPlaying}
                startRecording={startRecording}
                stopRecording={stopRecording}
                isRecording={isRecording}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
