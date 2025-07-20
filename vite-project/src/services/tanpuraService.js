/**
 * Tanpura Service
 * Handles tanpura drone synthesis using Tone.js
 * Provides continuous Sa and Pa drone for raag practice
 */

import * as Tone from 'tone';
import { getPerfectFifth } from '../utils/audioUtils.js';

class TanpuraService {
  constructor() {
    this.isPlaying = false;
    this.oscillators = null;
  }

  /**
   * Start tanpura drone with Sa and Pa
   * @param {string} baseScale - The base scale (e.g., "C")
   * @param {string} baseOctave - The base octave (e.g., "4")
   * @returns {Promise<void>}
   */
  async startTanpura(baseScale, baseOctave) {
    try {
      // Start audio context if not already started
      await Tone.start();
      
      // Stop any existing tanpura first
      if (this.oscillators) {
        this.stopTanpura();
      }
      
      // Create tanpura with Sa and Pa
      const saNote = baseScale + baseOctave;
      const paNote = getPerfectFifth(baseScale) + baseOctave;
      
      console.log("Playing tanpura notes:", saNote, paNote);
      
      // Create two oscillators for Sa and Pa
      const saOsc = new Tone.Oscillator({
        frequency: Tone.Frequency(saNote),
        type: "sine"
      }).toDestination();
      
      const paOsc = new Tone.Oscillator({
        frequency: Tone.Frequency(paNote),
        type: "sine"
      }).toDestination();
      
      // Start both oscillators
      saOsc.start();
      paOsc.start();
      
      // Store both oscillators
      this.oscillators = { sa: saOsc, pa: paOsc };
      this.isPlaying = true;
      
    } catch (error) {
      console.error("Tanpura error:", error);
      throw new Error("Tanpura failed to start. Please try again.");
    }
  }

  /**
   * Stop tanpura drone
   */
  stopTanpura() {
    if (this.oscillators) {
      try {
        // Stop both oscillators
        if (this.oscillators.sa) {
          this.oscillators.sa.stop();
          this.oscillators.sa.dispose();
        }
        if (this.oscillators.pa) {
          this.oscillators.pa.stop();
          this.oscillators.pa.dispose();
        }
      } catch (error) {
        console.error("Error stopping tanpura:", error);
      } finally {
        // Always reset state
        this.oscillators = null;
        this.isPlaying = false;
      }
    }
  }

  /**
   * Check if tanpura is currently playing
   * @returns {boolean} True if tanpura is playing
   */
  getPlayingStatus() {
    return this.isPlaying;
  }
}

// Export singleton instance
export const tanpuraService = new TanpuraService(); 