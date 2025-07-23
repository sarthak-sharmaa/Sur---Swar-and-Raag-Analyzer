// Tuning Meter Component
export const TuningMeter = ({ cents }) => {
  const clamped = Math.max(-50, Math.min(50, cents || 0));
  const percent = ((clamped + 50) / 100) * 100;
  return (
    <div className="w-full max-w-lg flex flex-col items-center mt-5 sm:mt-7 lg:mt-9 mb-3 sm:mb-5">
      <div className="w-full h-5 sm:h-7 bg-yellow-200 rounded-full relative border border-yellow-700 overflow-hidden">
        <div
          className="absolute top-0 h-5 sm:h-7 w-1 sm:w-2 rounded-full bg-red-700 transition-all duration-200"
          style={{ left: `calc(${percent}% - 2px)` }}
        />
        <div className="absolute top-0 left-1/2 h-5 sm:h-7 w-0.5 bg-yellow-700" style={{ transform: 'translateX(-50%)' }} />
      </div>
      <div className="flex justify-between w-full max-w-lg text-gray-700 text-sm mt-2 sm:mt-3 px-2 font-medium">
        <span>-50 cents</span>
        <span className="text-red-700 font-semibold">In Tune</span>
        <span>+50 cents</span>
      </div>
      <div className="text-red-700 text-lg sm:text-xl mt-2 font-bold">
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
    <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 border-2 border-yellow-800 shadow-xl p-4 sm:p-6 rounded-lg w-full max-w-md flex flex-col items-center mx-auto">
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
export const BaseScaleSelector = ({ baseScale, setBaseScale, baseOctave, setBaseOctave, handleTone }) => (
  <div className="w-full flex flex-col items-center mb-2">
    <div className="bg-gradient-to-br from-white via-yellow-50 to-amber-100 border-2 border-yellow-800 shadow-lg rounded-xl w-full max-w-md px-6 py-4 flex flex-col items-center">
      <h2 className="text-base sm:text-lg font-bold mb-3 text-yellow-900 font-serif tracking-wide">
        Select Base Scale
      </h2>
      <div className="flex flex-row justify-center items-center gap-4 w-full">
        <select
          value={baseScale}
          onChange={e => setBaseScale(e.target.value)}
          className="w-40 sm:w-48 px-4 py-2 border border-yellow-800 rounded-lg bg-yellow-50 text-yellow-900 font-semibold text-base text-center shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        >
          {["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].map(note => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>
        <select
          value={baseOctave}
          onChange={e => setBaseOctave(e.target.value)}
          className="w-32 sm:w-40 px-4 py-2 border border-yellow-800 rounded-lg bg-yellow-50 text-yellow-900 font-semibold text-base text-center shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        >
          {["2", "3", "4", "5", "6"].map(oct => (
            <option key={oct} value={oct}>{oct}</option>
          ))}
        </select>
        <button
          onClick={() => handleTone(baseOctave, baseScale)}
          className="ml-2 px-4 py-2 bg-yellow-200 border border-yellow-800 rounded-lg text-yellow-900 font-semibold hover:bg-yellow-300 transition-all shadow"
          title="Play Sa"
        >
          ▶️ सा
        </button>
      </div>
    </div>
  </div>
);