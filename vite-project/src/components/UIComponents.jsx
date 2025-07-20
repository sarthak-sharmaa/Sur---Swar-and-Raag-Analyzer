// Tuning Meter Component
export const TuningMeter = ({ cents }) => {
  const clamped = Math.max(-50, Math.min(50, cents || 0));
  const percent = ((clamped + 50) / 100) * 100;
  return (
    <div className="w-full max-w-lg flex flex-col items-center mt-4 sm:mt-6 lg:mt-8 mb-2 sm:mb-4">
      <div className="w-full h-4 sm:h-6 bg-gray-200 rounded-full relative border border-gray-300 overflow-hidden">
        {/* Animated pointer */}
        <div
          className="absolute top-0 h-4 sm:h-6 w-1 sm:w-1.5 rounded-full bg-amber-600 transition-all duration-200"
          style={{ left: `calc(${percent}% - 2px)` }}
        />
        {/* Center line */}
        <div className="absolute top-0 left-1/2 h-4 sm:h-6 w-0.5 bg-amber-500" style={{ transform: 'translateX(-50%)' }} />
      </div>
      <div className="flex justify-between w-full max-w-lg text-gray-600 text-xs mt-1 sm:mt-2 px-1 font-medium">
        <span>-50 cents</span>
        <span className="text-amber-700 font-semibold">In Tune</span>
        <span>+50 cents</span>
      </div>
      <div className="text-amber-700 text-sm sm:text-lg mt-1 font-bold">
        {cents !== null ? `${cents > 0 ? '+' : ''}${cents.toFixed(1)} cents` : <span className="text-gray-400">—</span>}
      </div>
    </div>
  );
};

// Raag Confidence Meter Component
export const RaagConfidenceMeter = ({ confidence }) => {
  const percent = confidence * 100;
  return (
    <div className="w-full max-w-lg flex flex-col items-center mt-3 sm:mt-4 mb-2 sm:mb-4">
      <div className="w-full h-3 sm:h-4 bg-gray-200 rounded-full relative border border-gray-300 overflow-hidden">
        <div
          className="absolute top-0 h-3 sm:h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 transition-all duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-gray-600 text-xs sm:text-sm mt-1">
        Raag Confidence: {percent.toFixed(0)}%
      </div>
    </div>
  );
};

// Mode Selector Component
export const ModeSelector = ({ detectionMode, setDetectionMode }) => {
  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 border-2 border-amber-400 shadow-xl p-4 sm:p-6 rounded-lg w-full max-w-md flex flex-col items-center mx-auto">
      <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800">
        Detection Mode
      </h2>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center">
        <button
          onClick={() => setDetectionMode("note")}
          className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
            detectionMode === "note"
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
              : "bg-white border-2 border-amber-400 text-gray-700 hover:bg-amber-50"
          }`}
        >
          Note Detection
        </button>
        <button
          onClick={() => setDetectionMode("raag")}
          className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
            detectionMode === "raag"
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
              : "bg-white border-2 border-amber-400 text-gray-700 hover:bg-amber-50"
          }`}
        >
          Raag Detection
        </button>
      </div>
    </div>
  );
};

// Base Scale Selector Component
export const BaseScaleSelector = ({ baseScale, setBaseScale, baseOctave, setBaseOctave, handleTone }) => {
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  
  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 border-2 border-amber-400 shadow-xl p-4 sm:p-6 rounded-lg w-full max-w-md flex flex-col items-center mx-auto">
      <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800">
        Select Base Scale
      </h2>
      <div className="flex flex-col sm:flex-row justify-around mb-4 sm:mb-6 gap-4 sm:gap-8 w-full">
        {/* Base Scale Selection */}
        <div className="flex flex-col items-center">
          <label className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-medium">Scale</label>
          <select
            className="bg-white border-2 border-amber-400 text-gray-800 rounded-md p-2 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm text-sm sm:text-base"
            value={baseScale}
            onChange={e => setBaseScale(e.target.value)}
          >
            {noteNames.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        {/* Octave Selection */}
        <div className="flex flex-col items-center">
          <label className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-medium">Octave</label>
          <select
            className="bg-white border-2 border-amber-400 text-gray-800 rounded-md p-2 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm text-sm sm:text-base"
            value={baseOctave}
            onChange={e => setBaseOctave(e.target.value)}
          >
            {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <button
        onClick={() => handleTone(baseOctave, baseScale)}
        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm sm:text-base"
      >
        Listen
      </button>
    </div>
  );
}; 