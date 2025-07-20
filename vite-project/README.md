# सुर (Sur) - Indian Note Detector

A sophisticated web application for real-time musical note detection and Indian classical raag analysis.

## 🎵 Features

### Note Detection Mode
- **Real-time pitch detection** using microphone input
- **Dual notation display**: Western (C, D#, E, etc.) and Indian Sargam (सा, रे, ग, म, etc.)
- **Tuning meter** showing cent deviation from perfect pitch
- **Base scale selection** allowing you to set your preferred tonic note
- **Octave selection** for different pitch ranges

### Raag Detection Mode
- **Sophisticated raag analysis** based on Indian classical music theory
- **Pattern recognition** for Aroha (ascending), Avaroha (descending), and Pakad (characteristic phrases)
- **Vadi-Samvadi analysis** using the most important swaras in each raag
- **Sequence accuracy** evaluation for authentic raag identification
- **Noise filtering** to penalize extra/off-notes
- **Multiple raag suggestions** with confidence scores and detailed breakdowns

### Tanpura Drone
- **Continuous Sa-Pa drone** for raag practice
- **Automatic perfect fifth calculation** based on selected base scale
- **Start/stop controls** for practice sessions

## 🏗️ Architecture

The application follows a modular architecture with clear separation of concerns:

```
src/
├── components/
│   ├── Body.jsx              # Main application component
│   └── UIComponents.jsx      # Reusable UI components
├── services/
│   ├── raagDetectionService.js  # Raag analysis algorithms
│   └── tanpuraService.js        # Tanpura drone functionality
├── utils/
│   ├── audioUtils.js            # Audio processing utilities
│   └── raagDefinitions.js       # Comprehensive raag database
└── App.jsx                      # Application entry point
```

### Key Components

#### `Body.jsx`
- Main application logic and state management
- Handles both note detection and raag analysis modes
- Manages audio context and microphone access
- Orchestrates all services and utilities

#### `raagDetectionService.js`
- Sophisticated raag detection algorithms
- Pattern matching for Aroha, Avaroha, and Pakad
- Vadi-Samvadi frequency analysis
- Sequence accuracy evaluation
- Noise penalty calculation

#### `tanpuraService.js`
- Tanpura drone synthesis using Tone.js
- Sa-Pa oscillator management
- Audio context handling
- Resource cleanup

#### `audioUtils.js`
- Frequency to note conversion
- Western to Indian notation mapping
- Cent deviation calculations
- Perfect fifth calculations

#### `raagDefinitions.js`
- Comprehensive database of 30+ major raags
- Complete pattern definitions (Aroha, Avaroha, Pakad)
- Vadi-Samvadi information
- Thaat classifications
- Time and mood metadata

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Modern web browser with microphone access
- HTTPS connection (required for microphone access)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Sur
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Usage

#### Note Detection Mode
1. Select your preferred **base scale** (default: C)
2. Choose the **octave** (default: 4)
3. Click **Start** to begin detection
4. Sing or play a note
5. View the detected note in both Western and Indian notation
6. Use the tuning meter to check pitch accuracy

#### Raag Detection Mode
1. Switch to **Raag Detection** mode
2. Select your **base scale** and **octave**
3. Optionally start the **tanpura drone** for practice
4. Click **Record Segment** to begin recording
5. Sing or play a sequence of notes (like a melody)
6. Click **Analyze Raag** to identify the raag
7. Review the detailed analysis with confidence scores

## 🎯 Raag Detection Algorithm

The raag detection uses a sophisticated multi-factor analysis:

### 1. Pattern Matching
- **Aroha (Ascending)**: Checks if swaras appear in ascending order
- **Avaroha (Descending)**: Checks if swaras appear in descending order
- **Pakad (Characteristic)**: Identifies characteristic phrases

### 2. Confidence Calculation
- **Presence Score**: Are the expected swaras present?
- **Sequence Score**: Are they in the correct order?
- **Noise Penalty**: Penalizes extra/off-notes
- **Vadi-Samvadi Bonus**: Rewards frequent use of important swaras

### 3. Final Score
```
Final Confidence = (Presence × 0.4 + Sequence × 0.6) × Noise Penalty + Vadi-Samvadi Bonus
```

## 📊 Supported Raags

The application includes 30+ major raags across all major thaats:

### Kalyan Thaat
- Yaman, Shuddha Kalyan, Bhoopali, Deshkar

### Bhairav Thaat
- Bhairav, Ahir Bhairav, Nat Bhairav

### Bhairavi Thaat
- Bhairavi, Malkauns, Darbari Kanada

### Khamaj Thaat
- Khamaj, Jhinjhoti, Rageshri

### Kafi Thaat
- Kafi, Bageshri, Pilu

### Asavari Thaat
- Asavari, Jaunpuri

### Bilawal Thaat
- Alhaiya Bilawal, Durga, Des

### Purvi Thaat
- Purvi, Shree

### Marwa Thaat
- Marwa, Sohini

### Todi Thaat
- Todi, Miyan Ki Todi

## 🧪 Testing & Validation

### Quick Test Report Template
```markdown
# Sur Application Test Report

## Test Environment
- Browser: [Your browser]
- OS: [Your OS]
- Microphone: [Your microphone]
- Environment: [Quiet room/Studio/etc.]

## Test Results

### Pitch Detection
- **Total Tests**: [Number]
- **Successful Detections**: [Number]
- **Accuracy**: [Percentage]%
- **Average Response Time**: [X]ms
- **Frequency Range Tested**: [Range]

### Raag Detection
- **Yaman Raag**: [X]% confidence
- **Bhairav Raag**: [X]% confidence
- **Bhairavi Raag**: [X]% confidence

## Conclusion
[Brief summary of performance]
```

**Testing Tips:**
- Use a digital tuner app or piano for reference
- Test in a quiet environment
- Record your actual results for accurate metrics
- Check browser console for response time data

## 🛠️ Technical Details

### Audio Processing
- **Pitch Detection**: Uses Pitchy library with YIN algorithm
- **Frequency Range**: 60Hz - 1200Hz
- **Clarity Threshold**: 0.7 (configurable)
- **Volume Threshold**: 0.001 RMS

### Performance Optimizations
- **Debounced note capture**: 400ms delay for raag mode
- **Efficient pattern matching**: O(n) complexity
- **Memory management**: Proper cleanup of audio resources
- **Modular architecture**: Easy to extend and maintain

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Pitchy Library**: For accurate pitch detection
- **Tone.js**: For audio synthesis
- **Indian Classical Music Community**: For raag definitions and theory
- **React Community**: For the excellent framework

## 📞 Support

For questions, issues, or contributions, please open an issue on GitHub.

---

**सुर** - Where technology meets tradition in the world of Indian classical music. 🎵
