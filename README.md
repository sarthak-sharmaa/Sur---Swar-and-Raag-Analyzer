# सुर (Sur) - The Smart Way to See Sound

A real-time musical note and chord detection app with support for both Western and Indian (Sargam) notation.

## Features

- **Real-time Note Detection**: Detect musical notes using your microphone
- **Dual Notation**: Display notes in both Western (C, D#, etc.) and Indian (सा, रे, etc.) notation
- **Chord Analysis**: Advanced chord detection using Node.js + Python backend
- **Tuning Meter**: Visual feedback for pitch accuracy
- **Multiple Scales**: Support for different base scales and octaves
- **Beautiful UI**: Modern, responsive design with Tailwind CSS

## Architecture

- **Frontend**: React + Vite with real-time pitch detection
- **Backend**: Node.js Express server with Python chord detection
- **Audio Processing**: Web Audio API + madmom library
- **Styling**: Tailwind CSS with gradient designs

## Quick Start

### Prerequisites

- Node.js 16+
- Python 3.8+
- FFmpeg (for audio processing)

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd Sur
```

### 2. Setup Backend

**Windows:**
```bash
setup-backend.bat
```

**Linux/macOS:**
```bash
chmod +x setup-backend.sh
./setup-backend.sh
```

**Manual Setup:**
```bash
# Install Node.js dependencies
cd backend
npm install

# Install Python dependencies
cd python
pip install -r requirements.txt
```

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

### 4. Start Frontend

```bash
cd vite-project
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

### Note Detection Mode
1. Select your base scale (which will be considered सा)
2. Click "Start" and sing/play a note
3. See the detected note in both Western and Indian notation
4. Use the tuning meter to check pitch accuracy

### Chord Detection Mode
1. Switch to "Chord Detection" mode
2. Click "Record Segment" and play/sing multiple notes
3. Click "Analyze" to detect chords
4. View detected chord sequence with confidence scores

## Project Structure

```
Sur/
├── backend/                    # Node.js + Python backend
│   ├── server.js              # Express server
│   ├── package.json           # Node.js dependencies
│   ├── python/
│   │   ├── chord_detect.py    # Python chord detection
│   │   └── requirements.txt   # Python dependencies
│   └── README.md              # Backend documentation
├── vite-project/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Body.jsx       # Main app component
│   │   │   └── UIComponents.jsx
│   │   ├── services/
│   │   │   └── chordDetectionService.js
│   │   └── config.js          # Configuration
│   └── package.json
├── setup-backend.bat          # Windows setup script
├── setup-backend.sh           # Unix setup script
└── README.md                  # This file
```

## Configuration

### Backend URL
Update the backend URL in `vite-project/src/config.js`:

```javascript
export const config = {
  backendUrl: 'http://localhost:5000', // Change for production
  // ...
};
```

### Environment Variables
Create `.env` file in `vite-project/`:

```bash
VITE_BACKEND_URL=http://localhost:5000
```

## Deployment

### Frontend (Vercel/Netlify)
1. Deploy the `vite-project/` folder
2. Set environment variable `VITE_BACKEND_URL` to your backend URL

### Backend (Railway/Render/VPS)
1. **Railway**: Connect GitHub repo, auto-detects Node.js
2. **Render**: Create Web Service, set build command: `npm install && pip install -r python/requirements.txt`
3. **VPS**: Install Node.js, Python, FFmpeg, then deploy

### Production Setup
1. Update CORS origins in `backend/server.js`
2. Set environment variables
3. Use PM2 for process management: `pm2 start server.js`

## Troubleshooting

### Python Dependencies
```bash
# If madmom installation fails
pip install --upgrade pip
pip install madmom --no-cache-dir
```

### Audio Issues
- Ensure microphone permissions are granted
- Use headphones to avoid feedback
- Check FFmpeg installation

### Backend Connection
- Verify backend is running on correct port
- Check CORS configuration
- Ensure firewall allows connections

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Tone.js, Pitchy
- **Backend**: Node.js, Express, Python, madmom, librosa
- **Audio**: Web Audio API, MediaRecorder API
- **Deployment**: Vercel (frontend), Railway/Render (backend)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review backend logs
3. Open an issue on GitHub

---

**Made with ❤️ for music lovers everywhere** 