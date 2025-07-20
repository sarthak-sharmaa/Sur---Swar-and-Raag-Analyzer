/**
 * Audio and Note Conversion Utilities
 * Contains functions for frequency detection, note conversion, and audio processing
 */

// Note names for Western and Hindi (Devanagari)
export const noteNames = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

export const noteNamesHindiDevanagari = [
  'सा', 'रे', 'रे', 'ग', 'ग', 'म', "म#", 'प', 'ध', 'ध', 'नि', 'नि',
];

// Indices for komal (flat) and teevra (sharp) swaras
export const komalIndices = [1, 3, 8, 10]; // re, ga, dha, ni
export const teevraIndex = 6; // Ma#

/**
 * Convert frequency to Western note name, octave, and MIDI number
 * @param {number} frequency - The frequency in Hz
 * @returns {Object} Object containing noteName, octave, and midiNumber
 */
export function frequencyToNoteName(frequency) {
  const A4 = 440;
  const midiNumber = Math.round(12 * Math.log2(frequency / A4) + 69);
  const noteIndex = midiNumber % 12;
  const octave = Math.floor(midiNumber / 12) - 1;
  const noteName = noteNames[noteIndex];
  return { noteName, octave, midiNumber };
}

/**
 * Convert to Hindi note (Sargam), with saptak and accidental logic
 * @param {string} noteName - Western note name
 * @param {number} octave - Octave number
 * @param {number} midiNumber - MIDI note number
 * @param {Object} baseScaleRef - Reference to base scale
 * @param {Object} baseOctaveRef - Reference to base octave
 * @returns {Object} Object containing hindiNote and midiDifference
 */
export function frequencyToHindiNoteName(noteName, octave, midiNumber, baseScaleRef, baseOctaveRef) {
  const baseScaleIndex = noteNames.indexOf(baseScaleRef.current);
  const noteIndex = noteNames.indexOf(noteName);
  
  // Calculate MIDI number for the chosen base note
  const midiOfBaseNote = parseInt(baseOctaveRef.current) * 12 + noteNames.indexOf(baseScaleRef.current) + 12;
  const midiDifference = midiNumber - midiOfBaseNote;
  
  // Hindi note index relative to base
  const hindiIndex = (noteIndex - baseScaleIndex + 12) % 12;
  let hindiNote = noteNamesHindiDevanagari[hindiIndex];
  
  // Komal (flat) swaras
  if (komalIndices.includes(hindiIndex)) {
    hindiNote = '♭' + hindiNote;
  }
  
  // Teevra Ma
  if (hindiIndex === teevraIndex) {
    hindiNote = 'म#';
  }
  
  // Saptak (octave) logic, relative to base note
  let saptak = '';
  const saptakDiff = Math.floor(midiDifference / 12);
  if (saptakDiff < 0) {
    saptak = '*'.repeat(Math.abs(saptakDiff)) + hindiNote;
  } else if (saptakDiff > 0) {
    saptak = hindiNote + '*'.repeat(saptakDiff);
  } else {
    saptak = hindiNote;
  }
  
  return { hindiNote: saptak, midiDifference };
}

/**
 * Get perfect fifth for a given note
 * @param {string} note - The base note
 * @returns {string} The perfect fifth note
 */
export function getPerfectFifth(note) {
  const noteIndex = noteNames.indexOf(note);
  const fifthIndex = (noteIndex + 7) % 12;
  return noteNames[fifthIndex];
}

/**
 * Calculate cent deviation from ideal frequency
 * @param {number} actualFreq - The actual detected frequency
 * @param {number} midiNumber - The MIDI note number
 * @returns {number} Cent deviation from ideal frequency
 */
export function calculateCentDeviation(actualFreq, midiNumber) {
  const idealFreq = 440 * Math.pow(2, (midiNumber - 69) / 12);
  return 1200 * Math.log2(actualFreq / idealFreq);
} 