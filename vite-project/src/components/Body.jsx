/**
 * Main Body Component for Sur - Indian Note Detector
 * 
 * This component provides:
 * - Real-time note detection in both Western and Indian notation
 * - Raag detection with sophisticated pattern analysis
 * - Tanpura drone for raag practice
 * - Base scale and octave selection
 * - Comprehensive UI for both note and raag modes
 * 
 * @author Sur Development Team
 * @version 2.0.0
 */

import { useState, useRef } from "react";
import * as Tone from 'tone';
import { PitchDetector } from 'pitchy';
import { TuningMeter, RaagConfidenceMeter, ModeSelector, BaseScaleSelector } from './UIComponents';

// Import modular services and utilities
import { detectRaags } from '../services/raagDetectionService.js';
import { tanpuraService } from '../services/tanpuraService.js';
import { 
  frequencyToNoteName, 
  frequencyToHindiNoteName, 
  calculateCentDeviation 
} from '../utils/audioUtils.js';

/**
 * Main Body component for the Indian Note Detector app
 * Handles both note detection and raag analysis modes
 */
const Body = () => {
  // ===== STATE MANAGEMENT =====
  
  // Base scale and octave selection state
  const [baseScale, setBaseScale] = useState("C");
  const baseScaleRef = useRef("C");
  const [baseOctave, setBaseOctave] = useState("4");
  const baseOctaveRef = useRef("4");

  // Note detection state
  const [detectedNote, setDetectedNote] = useState("");
  const [detectedHindiNote, setDetectedHindiNote] = useState("");
  const [centDeviation, setCentDeviation] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const isDetectingRef = useRef(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Raag detection state
  const [detectionMode, setDetectionMode] = useState("note"); // "note" or "raag"
  const [detectedRaag, setDetectedRaag] = useState("");
  const [raagConfidence, setRaagConfidence] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);
  const recordedNotesRef = useRef([]);
  const lastNoteTimeRef = useRef(0);
  const isRecordingRef = useRef(false);
  const [showRecordedNotes, setShowRecordedNotes] = useState(false);
  const [detectedRaags, setDetectedRaags] = useState([]);

  // Tanpura drone state
  const [isTanpuraPlaying, setIsTanpuraPlaying] = useState(false);



  // ===== AUDIO UTILITIES =====

  /**
   * Play a note using Tone.js synthesizer
   * @param {string} octave - The octave number
   * @param {string} note - The note name
   */
  const handleTone = async (octave, note) => {
    try {
      // Start audio context if not already started
      await Tone.start();
      
      const synth = new Tone.Synth().toDestination();
      const fullNote = note + octave;
      console.log("Playing note:", fullNote);
      synth.triggerAttackRelease(fullNote, "8n");
    } catch (error) {
      console.error("Note playback error:", error);
      alert("Note playback failed. Please try again.");
    }
  };

  /**
   * Start tanpura drone
   */
  const startTanpura = async () => {
    try {
      await tanpuraService.startTanpura(baseScale, baseOctave);
      setIsTanpuraPlaying(true);
    } catch (error) {
      console.error("Tanpura error:", error);
      alert("Tanpura failed to start. Please try again.");
    }
  };

  /**
   * Stop tanpura drone
   */
  const stopTanpura = () => {
    tanpuraService.stopTanpura();
    setIsTanpuraPlaying(false);
  };



  // ===== PITCH DETECTION =====

  /**
   * Start pitch detection using the microphone
   * Handles both note detection and raag recording modes
   */
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
        
        // Calculate RMS (volume) for noise filtering
        let sumSquares = 0;
        for (let i = 0; i < inputData.length; i++) {
          sumSquares += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sumSquares / inputData.length);
        
        // Use pitchy (YIN) to detect pitch
        const [pitch, clarity] = detector.findPitch(inputData, audioContext.sampleRate);
        
        // Detection thresholds
        const clarityThreshold = 0.7;
        const minFreq = 60;
        const maxFreq = 1200;
        const minVolume = 0.001;
        
        // Filter out invalid frequencies and low volume
        if (pitch < minFreq || pitch > maxFreq || rms < minVolume) return;
        
        if (clarity > clarityThreshold && pitch > 0) {
          const detectionStart = performance.now();
          const { noteName, octave, midiNumber } = frequencyToNoteName(pitch);
          const { hindiNote } = frequencyToHindiNoteName(
            noteName, octave, midiNumber, baseScaleRef, baseOctaveRef
          );
          
          const fullNote = `${noteName}${octave}`;
          const responseTime = performance.now() - detectionStart;
          
          // Debug logging with response time
          console.log(`Detected: ${fullNote} (pitch: ${pitch.toFixed(1)}Hz, clarity: ${clarity.toFixed(2)}, rms: ${rms.toFixed(4)}, response: ${responseTime.toFixed(1)}ms)`);
          
          if (detectionMode === "note") {
            // Note detection mode
            setDetectedNote(fullNote);
            setDetectedHindiNote(`${hindiNote}`);
            
            // Calculate cent deviation from ideal frequency
            const cents = calculateCentDeviation(pitch, midiNumber);
            setCentDeviation(cents);
          } else if (detectionMode === "raag") {
            // Raag detection mode
            if (!isRecordingRef.current) {
              setDetectedRaag("Click 'Record Segment' to analyze raag");
              setRaagConfidence(0);
            } else {
              // Capture notes during recording
              const currentTime = Date.now();
              const lastNote = recordedNotesRef.current[recordedNotesRef.current.length - 1];
              
              // Less sensitive note capture for raag detection
              if (
                (currentTime - lastNoteTimeRef.current > 400) && // 400ms delay
                (hindiNote !== lastNote)
              ) {
                recordedNotesRef.current.push(hindiNote);
                lastNoteTimeRef.current = currentTime;
                console.log("Captured Hindi note:", hindiNote, "Total:", recordedNotesRef.current.length);
                setDetectedRaag(`Recording... (${recordedNotesRef.current.length} swaras captured)`);
              }
            }
          }
        } else {
          // Clear detection when no valid pitch
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

  /**
   * Stop pitch detection and clean up resources
   */
  const stopDetection = () => {
    setIsDetecting(false);
    isDetectingRef.current = false;
    setDetectedNote("");
    setDetectedHindiNote("");
    setDetectedRaag("");
    setRaagConfidence(0);
    setCentDeviation(null);
  };

  // ===== RAAG RECORDING =====

  /**
   * Start recording for raag analysis
   */
  const startRecording = async () => {
    console.log("Starting recording...");
    setIsRecording(true);
    isRecordingRef.current = true;
    setRecordedNotes([]);
    recordedNotesRef.current = [];
    lastNoteTimeRef.current = 0;
    setDetectedRaags([]);
    setDetectedRaag("Recording... Sing or play notes in sequence");
    setRaagConfidence(0);
    
    // Start pitch detection if not already running
    if (!isDetectingRef.current) {
      await startDetection();
    }
  };

  /**
   * Stop recording and analyze raags
   */
  const stopRecording = async () => {
    console.log("Stopping recording...");
    console.log("Recorded notes:", recordedNotesRef.current);
    
    setIsRecording(false);
    isRecordingRef.current = false;
    
    // Stop pitch detection if it was started for recording
    if (isDetectingRef.current && detectionMode === "raag") {
      stopDetection();
    }
    
    const finalNotes = recordedNotesRef.current;
    
    if (finalNotes.length > 0) {
      console.log("Final notes for analysis:", finalNotes);
      
      // Detect raags from the recorded notes
      const detectedRaagsList = detectRaags(finalNotes);
      console.log("Detected raags:", detectedRaagsList);
      
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

  // ===== UI RENDERING =====

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col justify-center items-center p-2 sm:p-4 relative overflow-x-hidden">
      {/* Decorative left panel - hidden on mobile */}
      <div className="hidden lg:block absolute left-0 top-0 w-32 h-full bg-gradient-to-b from-amber-100 via-orange-100 to-yellow-100 opacity-60">
        <div className="h-full flex flex-col justify-center items-center space-y-6">
          <div className="text-amber-600 text-4xl">♪</div>
          <div className="text-orange-500 text-3xl">♫</div>
          <div className="text-amber-600 text-4xl">♩</div>
          <div className="text-orange-500 text-3xl">♪</div>
          <div className="text-amber-600 text-4xl">♫</div>
          <div className="text-orange-500 text-3xl">♩</div>
          <div className="text-amber-600 text-4xl">♪</div>
          <div className="text-orange-500 text-3xl">♫</div>
        </div>
      </div>
      
      {/* Decorative right panel - hidden on mobile */}
      <div className="hidden lg:block absolute right-0 top-0 w-32 h-full bg-gradient-to-b from-amber-100 via-orange-100 to-yellow-100 opacity-60">
        <div className="h-full flex flex-col justify-center items-center space-y-6">
          <div className="text-amber-600 text-4xl">♩</div>
          <div className="text-orange-500 text-3xl">♪</div>
          <div className="text-amber-600 text-4xl">♫</div>
          <div className="text-orange-500 text-3xl">♩</div>
          <div className="text-amber-600 text-4xl">♪</div>
          <div className="text-orange-500 text-3xl">♫</div>
          <div className="text-amber-600 text-4xl">♩</div>
          <div className="text-orange-500 text-3xl">♪</div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80"></div>

      {/* Main content */}
      <div className="w-full max-w-6xl flex flex-col items-center px-2 sm:px-4">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 tracking-wide drop-shadow-lg">
            <span className="font-extrabold">सुर</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-2 font-medium">The Smart Way to See Sound</p>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Collapsible Info Section */}
        <div className="w-full max-w-2xl flex flex-col items-center mb-4 sm:mb-6">
          <button
            className="text-sm sm:text-base font-medium text-amber-800 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-amber-200 hover:to-orange-200 transition-all duration-200 shadow-md mb-3 sm:mb-4"
            onClick={() => setInfoOpen((open) => !open)}
            aria-expanded={infoOpen}
            aria-controls="info-panel"
          >
            How to use?
          </button>
          {infoOpen && (
            <div
              id="info-panel"
              className="w-full bg-gradient-to-br from-white to-amber-50 text-gray-700 rounded-lg border-2 border-amber-300 p-4 sm:p-6 mb-4 shadow-lg text-sm sm:text-base"
            >
              <h2 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">About Sur</h2>
              <p className="mb-3">
                <b>Sur</b> helps you identify musical notes and raags in real time, both in Western (C, D#, etc.) and Indian (सा, रे, etc.) notation.
              </p>
              <ul className="list-disc pl-4 sm:pl-6 mb-3 space-y-1">
                <li><b>Note Detection</b>: Shows the detected note in both Western and Indian Sargam notation. The tuning meter shows how close you are to the exact pitch.</li>
                <li><b>Raag Detection</b>: Analyzes sequences of notes to identify Indian classical raags based on their characteristic patterns (Aroha, Avaroha, Pakad).</li>
              </ul>
              <p className="mb-2">
                <b>How to use:</b>
              </p>
              <ol className="list-decimal pl-4 sm:pl-6 mb-3 space-y-1">
                <li><b>Note Mode</b>: Select your base scale (which will be considered सा) and octave. Click <b>Start</b> and sing or play a note.</li>
                <li><b>Raag Mode</b>: Click <b>Record Segment</b> and sing/play notes in sequence (like a melody). Click <b>Analyze Raag</b> to identify the raag.</li>
              </ol>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">Tip: For raag detection, try singing traditional raag patterns like Sa Re Ga Ma Pa Dha Ni Sa.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl">
          {/* Mode Selection */}
          <ModeSelector detectionMode={detectionMode} setDetectionMode={setDetectionMode} />

          {/* Base scale and octave selection - show in both modes */}
          <BaseScaleSelector 
            baseScale={baseScale}
            setBaseScale={(value) => {
              setBaseScale(value);
              baseScaleRef.current = value;
            }}
            baseOctave={baseOctave}
            setBaseOctave={(value) => {
              setBaseOctave(value);
              baseOctaveRef.current = value;
            }}
            handleTone={handleTone}
          />

          {/* Note displays and tuning meter */}
          <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 border-2 border-amber-400 shadow-xl p-4 sm:p-6 lg:p-8 rounded-lg w-full flex flex-col items-center mx-auto">
            
            {/* Note Detection Display (only in note mode) */}
            {detectionMode === "note" && (
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 w-full items-center justify-center mb-6 sm:mb-8">
                {/* Absolute Note Box */}
                <div className="flex flex-col items-center w-full lg:w-1/2">
                  <div className="text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">Absolute Note</div>
                  <div
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-700 border-2 border-amber-400 bg-gradient-to-r from-amber-100 to-orange-100 px-4 sm:px-6 py-3 sm:py-4 rounded-lg w-full max-w-xs lg:max-w-md flex items-center justify-center shadow-md"
                    style={{ minHeight: '50px', textAlign: 'center' }}
                  >
                    {detectedNote || <span className="text-gray-400">-</span>}
                  </div>
                </div>
                {/* Relative Note Box */}
                <div className="flex flex-col items-center w-full lg:w-1/2">
                  <div className="text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">Relative Note</div>
                  <div
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-700 border-2 border-amber-400 bg-gradient-to-r from-amber-100 to-orange-100 px-4 sm:px-6 py-3 sm:py-4 rounded-lg w-full max-w-xs lg:max-w-md flex items-center justify-center shadow-md"
                    style={{ minHeight: '50px', textAlign: 'center' }}
                  >
                    {detectedHindiNote || <span className="text-gray-400">-</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Raag Detection Display (only in raag mode) */}
            {detectionMode === "raag" && (
              <div className="w-full mb-6 sm:mb-8">
                <div className="flex flex-col items-center">
                  <div className="text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-3">Raag Analysis</div>
                  
                  {/* Simple status display */}
                  <div className="text-base sm:text-lg text-purple-700 mb-3 sm:mb-4 font-medium text-center">
                    {detectedRaag || <span className="text-gray-400">Click 'Record Segment' to start</span>}
                  </div>
                  
                  {/* Show recorded notes dropdown */}
                  {recordedNotesRef.current.length > 0 && (
                    <div className="w-full max-w-lg mb-3 sm:mb-4">
                      <button
                        onClick={() => setShowRecordedNotes(!showRecordedNotes)}
                        className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        {showRecordedNotes ? "Hide" : "Show"} Recorded Swaras ({recordedNotesRef.current.length})
                      </button>
                      {showRecordedNotes && (
                        <div className="mt-2 p-2 sm:p-3 bg-gray-50 rounded border text-xs sm:text-sm text-gray-700">
                          <div className="font-medium mb-1">Recorded Swaras:</div>
                          <div className="flex flex-wrap gap-1">
                            {recordedNotesRef.current.map((swara, index) => (
                              <span key={index} className="bg-white px-2 py-1 rounded border text-xs">
                                {swara}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Show detected raags in sequence */}
                  {detectedRaags.length > 0 && (
                    <div className="w-full max-w-lg mb-3 sm:mb-4">
                      <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Detected Raags ({detectedRaags.length} possibilities):
                      </div>
                      <div className="space-y-2 sm:space-y-3 max-h-60 sm:max-h-80 overflow-y-auto">
                        {detectedRaags.map((raag, index) => (
                          <div key={index} className={`bg-white p-3 sm:p-4 rounded-lg border shadow-sm ${
                            index === 0 ? 'border-2 border-green-400' : 'border-gray-200'
                          }`}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                              <div className="flex items-center gap-2">
                                {index === 0 && <span className="text-green-600 text-base sm:text-lg">🥇</span>}
                                <span className="font-bold text-purple-700 text-sm sm:text-lg">
                                  {raag.name} ({raag.englishName})
                                </span>
                              </div>
                              <span className={`text-xs sm:text-sm px-2 py-1 rounded ${
                                raag.confidence > 0.7 ? 'bg-green-100 text-green-800' :
                                raag.confidence > 0.5 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {Math.round(raag.confidence * 100)}%
                              </span>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                              <div><strong>Thaat:</strong> {raag.thaat}</div>
                              <div><strong>Time:</strong> {raag.time}</div>
                              <div><strong>Mood:</strong> {raag.mood}</div>
                              <div><strong>Recorded:</strong> {raag.totalRecordedSwaras} swaras | <strong>Matched:</strong> {raag.matchedSwarasCount}/{raag.raagSwaras} raag swaras</div>
                              <div><strong>Aroha:</strong> {raag.arohaPresenceConfidence > 0.3 ? "✓" : "✗"} Presence: {Math.round(raag.arohaPresenceConfidence * 100)}% | Sequence: {Math.round(raag.arohaSequenceConfidence * 100)}%</div>
                              <div><strong>Avaroha:</strong> {raag.avarohaPresenceConfidence > 0.3 ? "✓" : "✗"} Presence: {Math.round(raag.avarohaPresenceConfidence * 100)}% | Sequence: {Math.round(raag.avarohaSequenceConfidence * 100)}%</div>
                              <div><strong>Pakad:</strong> {raag.pakadConfidence > 0.3 ? "✓" : "✗"} ({Math.round(raag.pakadConfidence * 100)}%)</div>
                              <div><strong>Noise Penalty:</strong> {Math.round(raag.noisePenalty * 100)}% (extra swaras: {raag.extraSwaras.length})</div>
                              <div><strong>Vadi-Samvadi Bonus:</strong> +{Math.round(raag.vadiSamvadiBonus * 100)}% (Vadi: {raag.vadi}, Samvadi: {raag.samvadi})</div>
                              <div><strong>Matched Swaras:</strong> {raag.matchedSwaras.join(", ")}</div>
                              {raag.extraSwaras.length > 0 && (
                                <div><strong>Extra Swaras:</strong> <span className="text-red-600">{raag.extraSwaras.join(", ")}</span></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {detectedRaags.length > 1 && (
                        <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-xs sm:text-sm text-blue-800">
                            <strong>💡 Tip:</strong> Multiple raags detected! The same swaras can belong to different raags. 
                            Consider the time of day, mood, and characteristic phrases (pakad) to identify the correct raag.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {raagConfidence > 0.5 && <RaagConfidenceMeter confidence={raagConfidence} />}
                </div>
              </div>
            )}
            
            {/* Tuning Meter */}
            {detectionMode === "note" && <TuningMeter cents={centDeviation} />}
            
            {/* Start/Stop Buttons - only in note mode */}
            {detectionMode === "note" && (
              <div className="flex flex-col sm:flex-row justify-center w-full gap-3 sm:gap-6 mt-4">
                <button
                  onClick={startDetection}
                  className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-md ${
                    isDetecting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isDetecting}
                >
                  Start
                </button>
                <button
                  onClick={stopDetection}
                  className={`bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-md ${
                    !isDetecting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isDetecting}
                >
                  Stop
                </button>
              </div>
            )}

            {/* Recording Controls (only in raag mode) */}
            {detectionMode === "raag" && (
              <div className="flex flex-col items-center gap-3 sm:gap-4 mt-4">
                {/* 2x2 Button Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
                  <button
                    onClick={startTanpura}
                    className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm sm:text-base ${
                      isTanpuraPlaying ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isTanpuraPlaying}
                  >
                    🎵 Start Tanpura
                  </button>
                  <button
                    onClick={stopTanpura}
                    className={`bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm sm:text-base ${
                      !isTanpuraPlaying ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!isTanpuraPlaying}
                  >
                    ⏹️ Stop Tanpura
                  </button>
                  <button
                    onClick={startRecording}
                    className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm sm:text-base ${
                      isRecording ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isRecording}
                  >
                    Record Segment
                  </button>
                  <button
                    onClick={stopRecording}
                    className={`bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm sm:text-base ${
                      !isRecording ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!isRecording}
                  >
                    Analyze Raag
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
