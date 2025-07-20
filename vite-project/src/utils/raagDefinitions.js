/**
 * Raag Definitions Database
 * Contains comprehensive information about Indian classical raags including:
 * - Aroha (ascending pattern)
 * - Avaroha (descending pattern) 
 * - Pakad (characteristic phrase)
 * - Vadi and Samvadi (most important swaras)
 * - Time, mood, and thaat information
 */

// Raag definitions with Aroha (ascending) and Avaroha (descending) patterns
export const raagDefinitions = {
  // Kalyan Thaat (Evening Raags)
  "Yaman": {
    name: "राग यमन",
    englishName: "Yaman",
    aroha: ["सा", "रे", "ग", "म#", "प", "ध", "नि", "सा"],
    avaroha: ["सा", "नि", "ध", "प", "म#", "ग", "रे", "सा"],
    pakad: ["नि", "रे", "ग", "म#", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "नि",
    time: "Evening",
    mood: "Serene, Peaceful"
  },
  "Shuddha Kalyan": {
    name: "राग शुद्ध कल्याण",
    englishName: "Shuddha Kalyan",
    aroha: ["सा", "रे", "ग", "म#", "प", "ध", "नि", "सा"],
    avaroha: ["सा", "नि", "ध", "प", "म#", "ग", "रे", "सा"],
    pakad: ["ग", "म#", "प", "ध", "प", "म#", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "नि",
    time: "Evening",
    mood: "Serene, Divine"
  },
  "Bhoopali": {
    name: "राग भूपाली",
    englishName: "Bhoopali",
    aroha: ["सा", "रे", "ग", "प", "ध", "सा"],
    avaroha: ["सा", "ध", "प", "ग", "रे", "सा"],
    pakad: ["ग", "प", "ध", "प", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "ध",
    time: "Evening",
    mood: "Peaceful, Devotional"
  },
  "Deshkar": {
    name: "राग देशकार",
    englishName: "Deshkar",
    aroha: ["सा", "रे", "ग", "प", "ध", "सा"],
    avaroha: ["सा", "ध", "प", "ग", "रे", "सा"],
    pakad: ["ग", "प", "ध", "प", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "ध",
    time: "Morning",
    mood: "Fresh, Bright"
  },

  // Bhairav Thaat (Morning Raags)
  "Bhairav": {
    name: "राग भैरव",
    englishName: "Bhairav",
    aroha: ["सा", "♭रे", "ग", "म", "प", "♭ध", "नि", "सा"],
    avaroha: ["सा", "नि", "♭ध", "प", "म", "ग", "♭रे", "सा"],
    pakad: ["म", "प", "♭ध", "प", "म", "ग", "♭रे", "सा"],
    vadi: "म",
    samvadi: "सा",
    time: "Morning",
    mood: "Serious, Devotional"
  },
  "Ahir Bhairav": {
    name: "राग अहीर भैरव",
    englishName: "Ahir Bhairav",
    aroha: ["सा", "♭रे", "ग", "म", "प", "♭ध", "नि", "सा"],
    avaroha: ["सा", "नि", "♭ध", "प", "म", "ग", "♭रे", "सा"],
    pakad: ["ग", "म", "प", "♭ध", "प", "म", "ग", "♭रे", "सा"],
    vadi: "म",
    samvadi: "सा",
    time: "Morning",
    mood: "Serene, Peaceful"
  },
  "Nat Bhairav": {
    name: "राग नट भैरव",
    englishName: "Nat Bhairav",
    aroha: ["सा", "रे", "ग", "म", "प", "♭ध", "नि", "सा"],
    avaroha: ["सा", "नि", "♭ध", "प", "म", "ग", "रे", "सा"],
    pakad: ["ग", "म", "प", "♭ध", "प", "म", "ग", "रे", "सा"],
    vadi: "म",
    samvadi: "सा",
    time: "Morning",
    mood: "Energetic, Dramatic"
  },

  // Bhairavi Thaat (Morning Raags)
  "Bhairavi": {
    name: "राग भैरवी",
    englishName: "Bhairavi",
    aroha: ["सा", "♭रे", "♭ग", "म", "प", "♭ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "♭ध", "प", "म", "♭ग", "♭रे", "सा"],
    pakad: ["म", "प", "♭ध", "प", "म", "♭ग", "♭रे", "सा"],
    vadi: "म",
    samvadi: "सा",
    time: "Morning",
    mood: "Serious, Devotional"
  },
  "Malkauns": {
    name: "राग मलकौंस",
    englishName: "Malkauns",
    aroha: ["सा", "♭ग", "म", "♭ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "♭ध", "म", "♭ग", "सा"],
    pakad: ["♭ध", "म", "♭ग", "म", "♭ध", "♭नि", "सा"],
    vadi: "म",
    samvadi: "सा",
    time: "Night",
    mood: "Mysterious, Deep"
  },
  "Darbari Kanada": {
    name: "राग दरबारी कनाडा",
    englishName: "Darbari Kanada",
    aroha: ["सा", "रे", "♭ग", "म", "प", "♭ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "♭ध", "प", "म", "♭ग", "रे", "सा"],
    pakad: ["♭ध", "प", "म", "♭ग", "रे", "सा"],
    vadi: "♭ध",
    samvadi: "♭ग",
    time: "Night",
    mood: "Serious, Majestic"
  },

  // Khamaj Thaat (Evening Raags)
  "Khamaj": {
    name: "राग खमाज",
    englishName: "Khamaj",
    aroha: ["सा", "रे", "ग", "म", "प", "ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "ध", "प", "म", "ग", "रे", "सा"],
    pakad: ["ग", "म", "प", "ध", "प", "म", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "♭नि",
    time: "Evening",
    mood: "Light, Playful"
  },
  "Jhinjhoti": {
    name: "राग झिंझोटी",
    englishName: "Jhinjhoti",
    aroha: ["सा", "रे", "ग", "म", "प", "ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "ध", "प", "म", "ग", "रे", "सा"],
    pakad: ["ग", "म", "प", "ध", "प", "म", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "♭नि",
    time: "Evening",
    mood: "Romantic, Melancholic"
  },
  "Rageshri": {
    name: "राग रागेश्री",
    englishName: "Rageshri",
    aroha: ["सा", "रे", "ग", "म", "प", "ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "ध", "प", "म", "ग", "रे", "सा"],
    pakad: ["ग", "म", "प", "ध", "प", "म", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "♭नि",
    time: "Evening",
    mood: "Romantic, Sweet"
  },

  // Kafi Thaat (Evening Raags)
  "Kafi": {
    name: "राग काफी",
    englishName: "Kafi",
    aroha: ["सा", "रे", "♭ग", "म", "प", "ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "ध", "प", "म", "♭ग", "रे", "सा"],
    pakad: ["♭ग", "म", "प", "ध", "प", "म", "♭ग", "रे", "सा"],
    vadi: "प",
    samvadi: "रे",
    time: "Evening",
    mood: "Romantic, Melancholic"
  },
  "Bageshri": {
    name: "राग बागेश्री",
    englishName: "Bageshri",
    aroha: ["सा", "रे", "♭ग", "म", "प", "ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "ध", "प", "म", "♭ग", "रे", "सा"],
    pakad: ["ध", "प", "म", "♭ग", "रे", "सा"],
    vadi: "ध",
    samvadi: "♭ग",
    time: "Night",
    mood: "Romantic, Melancholic"
  },
  "Pilu": {
    name: "राग पीलू",
    englishName: "Pilu",
    aroha: ["सा", "रे", "♭ग", "म", "प", "ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "ध", "प", "म", "♭ग", "रे", "सा"],
    pakad: ["♭ग", "म", "प", "ध", "प", "म", "♭ग", "रे", "सा"],
    vadi: "प",
    samvadi: "रे",
    time: "Evening",
    mood: "Light, Playful"
  },

  // Asavari Thaat (Morning Raags)
  "Asavari": {
    name: "राग आसावरी",
    englishName: "Asavari",
    aroha: ["सा", "रे", "♭ग", "म", "प", "♭ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "♭ध", "प", "म", "♭ग", "रे", "सा"],
    pakad: ["♭ध", "प", "म", "♭ग", "रे", "सा"],
    vadi: "♭ध",
    samvadi: "♭ग",
    time: "Morning",
    mood: "Serious, Mysterious"
  },
  "Jaunpuri": {
    name: "राग जौनपुरी",
    englishName: "Jaunpuri",
    aroha: ["सा", "रे", "♭ग", "म", "प", "♭ध", "♭नि", "सा"],
    avaroha: ["सा", "♭नि", "♭ध", "प", "म", "♭ग", "रे", "सा"],
    pakad: ["♭ध", "प", "म", "♭ग", "रे", "सा"],
    vadi: "♭ध",
    samvadi: "♭ग",
    time: "Morning",
    mood: "Serious, Mysterious"
  },

  // Bilawal Thaat (Morning Raags)
  "Alhaiya Bilawal": {
    name: "राग अल्हैया बिलावल",
    englishName: "Alhaiya Bilawal",
    aroha: ["सा", "रे", "ग", "म", "प", "ध", "नि", "सा"],
    avaroha: ["सा", "नि", "ध", "प", "म", "ग", "रे", "सा"],
    pakad: ["ग", "म", "प", "ध", "प", "म", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "नि",
    time: "Morning",
    mood: "Bright, Cheerful"
  },
  "Durga": {
    name: "राग दुर्गा",
    englishName: "Durga",
    aroha: ["सा", "रे", "ग", "म", "प", "ध", "सा"],
    avaroha: ["सा", "ध", "प", "म", "ग", "रे", "सा"],
    pakad: ["ग", "म", "प", "ध", "प", "म", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "ध",
    time: "Evening",
    mood: "Peaceful, Serene"
  },
  "Des": {
    name: "राग देश",
    englishName: "Des",
    aroha: ["सा", "रे", "ग", "म", "प", "ध", "नि", "सा"],
    avaroha: ["सा", "नि", "ध", "प", "म", "ग", "रे", "सा"],
    pakad: ["ग", "म", "प", "ध", "प", "म", "ग", "रे", "सा"],
    vadi: "ग",
    samvadi: "नि",
    time: "Evening",
    mood: "Romantic, Melancholic"
  },

  // Purvi Thaat (Afternoon Raags)
  "Purvi": {
    name: "राग पूर्वी",
    englishName: "Purvi",
    aroha: ["सा", "♭रे", "ग", "म#", "प", "♭ध", "नि", "सा"],
    avaroha: ["सा", "नि", "♭ध", "प", "म#", "ग", "♭रे", "सा"],
    pakad: ["म#", "प", "♭ध", "प", "म#", "ग", "♭रे", "सा"],
    vadi: "म#",
    samvadi: "सा",
    time: "Afternoon",
    mood: "Serious, Mysterious"
  },
  "Shree": {
    name: "राग श्री",
    englishName: "Shree",
    aroha: ["सा", "♭रे", "ग", "म#", "प", "♭ध", "नि", "सा"],
    avaroha: ["सा", "नि", "♭ध", "प", "म#", "ग", "♭रे", "सा"],
    pakad: ["म#", "प", "♭ध", "प", "म#", "ग", "♭रे", "सा"],
    vadi: "म#",
    samvadi: "सा",
    time: "Afternoon",
    mood: "Serious, Devotional"
  },

  // Marwa Thaat (Afternoon Raags)
  "Marwa": {
    name: "राग मारवा",
    englishName: "Marwa",
    aroha: ["सा", "♭रे", "ग", "म#", "प", "ध", "नि", "सा"],
    avaroha: ["सा", "नि", "ध", "प", "म#", "ग", "♭रे", "सा"],
    pakad: ["म#", "प", "ध", "प", "म#", "ग", "♭रे", "सा"],
    vadi: "म#",
    samvadi: "सा",
    time: "Afternoon",
    mood: "Serious, Mysterious"
  },
  "Sohini": {
    name: "राग सोहनी",
    englishName: "Sohini",
    aroha: ["सा", "♭रे", "ग", "म#", "प", "ध", "नि", "सा"],
    avaroha: ["सा", "नि", "ध", "प", "म#", "ग", "♭रे", "सा"],
    pakad: ["म#", "प", "ध", "प", "म#", "ग", "♭रे", "सा"],
    vadi: "म#",
    samvadi: "सा",
    time: "Afternoon",
    mood: "Romantic, Melancholic"
  },

  // Todi Thaat (Morning Raags)
  "Todi": {
    name: "राग तोड़ी",
    englishName: "Todi",
    aroha: ["सा", "♭रे", "♭ग", "म#", "प", "♭ध", "नि", "सा"],
    avaroha: ["सा", "नि", "♭ध", "प", "म#", "♭ग", "♭रे", "सा"],
    pakad: ["म#", "प", "♭ध", "प", "म#", "♭ग", "♭रे", "सा"],
    vadi: "म#",
    samvadi: "सा",
    time: "Morning",
    mood: "Serious, Mysterious"
  },
  "Miyan Ki Todi": {
    name: "राग मियां की तोड़ी",
    englishName: "Miyan Ki Todi",
    aroha: ["सा", "♭रे", "♭ग", "म#", "प", "♭ध", "नि", "सा"],
    avaroha: ["सा", "नि", "♭ध", "प", "म#", "♭ग", "♭रे", "सा"],
    pakad: ["म#", "प", "♭ध", "प", "म#", "♭ग", "♭रे", "सा"],
    vadi: "म#",
    samvadi: "सा",
    time: "Morning",
    mood: "Serious, Devotional"
  }
};

/**
 * Helper function to get thaat for a raag
 * @param {string} raagKey - The key of the raag
 * @returns {string} The thaat name
 */
export const getThaat = (raagKey) => {
  const thaatMap = {
    // Kalyan Thaat
    "Yaman": "Kalyan", "Shuddha Kalyan": "Kalyan", "Bhoopali": "Kalyan", "Deshkar": "Kalyan",
    // Bhairav Thaat  
    "Bhairav": "Bhairav", "Ahir Bhairav": "Bhairav", "Nat Bhairav": "Bhairav",
    // Bhairavi Thaat
    "Bhairavi": "Bhairavi", "Malkauns": "Bhairavi", "Darbari Kanada": "Bhairavi",
    // Khamaj Thaat
    "Khamaj": "Khamaj", "Jhinjhoti": "Khamaj", "Rageshri": "Khamaj",
    // Kafi Thaat
    "Kafi": "Kafi", "Bageshri": "Kafi", "Pilu": "Kafi",
    // Asavari Thaat
    "Asavari": "Asavari", "Jaunpuri": "Asavari",
    // Bilawal Thaat
    "Alhaiya Bilawal": "Bilawal", "Durga": "Bilawal", "Des": "Bilawal",
    // Purvi Thaat
    "Purvi": "Purvi", "Shree": "Purvi",
    // Marwa Thaat
    "Marwa": "Marwa", "Sohini": "Marwa",
    // Todi Thaat
    "Todi": "Todi", "Miyan Ki Todi": "Todi"
  };
  return thaatMap[raagKey] || "Unknown";
}; 