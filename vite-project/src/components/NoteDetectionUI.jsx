import { TuningMeter } from "./UIComponents";

const NoteDetectionUI = ({
  detectedNote,
  detectedHindiNote,
  centDeviation,
  startDetection,
  stopDetection,
  isDetecting,
}) => (
  <>
    <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center mb-6">
      <div className="flex flex-col items-center w-full sm:w-1/2">
        <div className="text-base font-bold text-yellow-900 mb-2">Absolute Note</div>
        <div className="text-2xl font-bold text-yellow-900 border-2 border-yellow-700 bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-3 rounded-lg w-full max-w-xs flex items-center justify-center shadow-md" style={{ minHeight: '50px', textAlign: 'center' }}>
          {detectedNote || <span className="text-yellow-400">-</span>}
        </div>
      </div>
      <div className="flex flex-col items-center w-full sm:w-1/2">
        <div className="text-base font-bold text-yellow-900 mb-2">Relative Note</div>
        <div className="text-2xl font-bold text-yellow-900 border-2 border-yellow-700 bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-3 rounded-lg w-full max-w-xs flex items-center justify-center shadow-md" style={{ minHeight: '50px', textAlign: 'center' }}>
          {detectedHindiNote || <span className="text-yellow-400">-</span>}
        </div>
      </div>
    </div>
    <TuningMeter cents={centDeviation} />
    <div className="flex flex-col sm:flex-row justify-center w-full gap-3 mt-4">
      <button
        onClick={startDetection}
        className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold text-base transition-all duration-200 shadow-md ${
          isDetecting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDetecting}
      >
        Start
      </button>
      <button
        onClick={stopDetection}
        className={`bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-semibold text-base transition-all duration-200 shadow-md ${
          !isDetecting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!isDetecting}
      >
        Stop
      </button>
    </div>
  </>
);

export default NoteDetectionUI;