
//Raag Detection Service


import { raagDefinitions, getThaat } from '../utils/raagDefinitions.js';

/**
 * Detect raags from a sequence of Hindi swaras
 * @param {Array} swaras - Array of Hindi swaras (e.g., ["सा", "रे", "ग", "म", "प"])
 * @returns {Array} Array of detected raags with confidence scores and details
 */
export const detectRaags = (swaras) => {
  if (!swaras || swaras.length < 3) return []; // Require at least 3 swaras for raag detection
  
  // Swaras are already in Hindi format, just filter out any invalid ones
  const validSwaras = swaras.filter(swara => swara && typeof swara === 'string');
  
  console.log("Analyzing swaras:", validSwaras);
  
  // Analyze against each raag
  const raagMatches = [];
  
  Object.entries(raagDefinitions).forEach(([raagKey, raag]) => {
    // Count frequency of each swara in recorded sequence
    const swaraFrequency = {};
    validSwaras.forEach(swara => {
      swaraFrequency[swara] = (swaraFrequency[swara] || 0) + 1;
    });
    
    // Calculate Vadi-Samvadi bonus 
    const vadiBonus = swaraFrequency[raag.vadi] ? (swaraFrequency[raag.vadi] / validSwaras.length) * 0.2 : 0;
    const samvadiBonus = swaraFrequency[raag.samvadi] ? (swaraFrequency[raag.samvadi] / validSwaras.length) * 0.1 : 0;
    const vadiSamvadiBonus = vadiBonus + samvadiBonus;
    
    // Calculate sequence accuracy for Aroha 
    let arohaSequenceScore = 0;
    let arohaPresenceScore = 0;
    
    for (let i = 0; i < raag.aroha.length; i++) {
      const expectedSwara = raag.aroha[i];
      if (validSwaras.includes(expectedSwara)) {
        arohaPresenceScore++;
        // Check if it appears in correct sequence
        const firstIndex = validSwaras.indexOf(expectedSwara);
        if (i === 0 || (firstIndex > validSwaras.indexOf(raag.aroha[i-1]))) {
          arohaSequenceScore++;
        }
      }
    }
    
    // Calculate sequence accuracy for Avaroha 
    let avarohaSequenceScore = 0;
    let avarohaPresenceScore = 0;
    
    for (let i = 0; i < raag.avaroha.length; i++) {
      const expectedSwara = raag.avaroha[i];
      if (validSwaras.includes(expectedSwara)) {
        avarohaPresenceScore++;
        // Check if it appears in correct sequence
        const firstIndex = validSwaras.indexOf(expectedSwara);
        if (i === 0 || (firstIndex > validSwaras.indexOf(raag.avaroha[i-1]))) {
          avarohaSequenceScore++;
        }
      }
    }
    
    // Calculate Pakad accuracy
    let pakadScore = 0;
    raag.pakad.forEach(expectedSwara => {
      if (validSwaras.includes(expectedSwara)) {
        pakadScore++;
      }
    });
    
    // Calculate accuracy scores
    const arohaPresenceConfidence = arohaPresenceScore / raag.aroha.length;
    const arohaSequenceConfidence = arohaSequenceScore / raag.aroha.length;
    const avarohaPresenceConfidence = avarohaPresenceScore / raag.avaroha.length;
    const avarohaSequenceConfidence = avarohaSequenceScore / raag.avaroha.length;
    const pakadConfidence = pakadScore / raag.pakad.length;
    
    // Penalty for extra swaras (noise)
    const extraSwaras = validSwaras.filter(swara => 
      !raag.aroha.includes(swara) && !raag.avaroha.includes(swara) && !raag.pakad.includes(swara)
    );
    const noisePenalty = Math.max(0, 1 - (extraSwaras.length / validSwaras.length));
    
    // Overall confidence with sequence importance
    const presenceConfidence = (arohaPresenceConfidence * 0.3 + avarohaPresenceConfidence * 0.3 + pakadConfidence * 0.2);
    const sequenceConfidence = (arohaSequenceConfidence * 0.4 + avarohaSequenceConfidence * 0.4 + pakadConfidence * 0.2);
    
    // Final confidence combines presence, sequence, noise penalty, and vadi-samvadi 
    const finalConfidence = ((presenceConfidence * 0.4 + sequenceConfidence * 0.6) * noisePenalty) + vadiSamvadiBonus;
    
    if (finalConfidence >= 0.4) { // Higher threshold for better accuracy
      raagMatches.push({
        raag: raagKey,
        name: raag.name,
        englishName: raag.englishName,
        confidence: finalConfidence,
        arohaPresenceConfidence,
        arohaSequenceConfidence,
        avarohaPresenceConfidence,
        avarohaSequenceConfidence,
        pakadConfidence,
        noisePenalty,
        vadiBonus,
        samvadiBonus,
        vadiSamvadiBonus,
        matchedSwaras: validSwaras.filter(swara => 
          raag.aroha.includes(swara) || raag.avaroha.includes(swara) || raag.pakad.includes(swara)
        ),
        extraSwaras: extraSwaras,
        time: raag.time,
        mood: raag.mood,
        thaat: getThaat(raagKey),
        totalRecordedSwaras: validSwaras.length,
        raagSwaras: raag.aroha.length,
        matchedSwarasCount: validSwaras.filter(swara => 
          raag.aroha.includes(swara) || raag.avaroha.includes(swara) || raag.pakad.includes(swara)
        ).length,
        vadi: raag.vadi,
        samvadi: raag.samvadi
      });
    }
  });
  
  // Sort by confidence (highest first)
  raagMatches.sort((a, b) => b.confidence - a.confidence);
  
  return raagMatches;
}; 