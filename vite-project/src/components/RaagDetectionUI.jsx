import { RaagConfidenceMeter } from "./UIComponents";

const RaagDetectionUI = ({
  detectedRaag,
  recordedNotesRef,
  showRecordedNotes,
  setShowRecordedNotes,
  detectedRaags,
  raagConfidence,
  startTanpura,
  stopTanpura,
  isTanpuraPlaying,
  startRecording,
  stopRecording,
  isRecording,
}) => (
  <div className="w-full mb-6">
    {/* Raag Analysis */}
    <div className="flex flex-col items-center">
      <div className="text-base font-bold text-yellow-900 mb-2">Raag Analysis</div>
      <div className="text-base text-yellow-900 mb-3 font-medium text-center">
        {detectedRaag || <span className="text-yellow-400">Click 'Record Segment' to start</span>}
      </div>
      {/* Recorded Swaras */}
      {recordedNotesRef.current.length > 0 && (
        <div className="w-full max-w-lg mb-3">
          <button
            onClick={() => setShowRecordedNotes(!showRecordedNotes)}
            className="text-xs text-yellow-800 bg-yellow-100 px-2 py-1 rounded hover:bg-yellow-200 transition-colors"
          >
            {showRecordedNotes ? "Hide" : "Show"} Recorded Swaras ({recordedNotesRef.current.length})
          </button>
          {showRecordedNotes && (
            <div className="mt-2 p-2 bg-yellow-50 rounded border text-xs text-yellow-900">
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
      {/* Detected Raags List */}
      {detectedRaags.length > 0 && (
        <div className="w-full max-w-lg mb-3">
          <div className="text-xs font-medium text-yellow-900 mb-2">
            Detected Raags ({detectedRaags.length} possibilities):
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {detectedRaags.map((raag, index) => (
              <div key={index} className={`bg-white p-3 rounded-lg border shadow-sm ${
                index === 0 ? 'border-2 border-green-400' : 'border-yellow-200'
              }`}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                  <div className="flex items-center gap-2">
                    {index === 0 && <span className="text-green-600 text-base">🥇</span>}
                    <span className="font-bold text-yellow-900 text-sm">
                      {raag.name} ({raag.englishName})
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    raag.confidence > 0.7 ? 'bg-green-100 text-green-800' :
                    raag.confidence > 0.5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {Math.round(raag.confidence * 100)}%
                  </span>
                </div>
                <div className="text-xs text-yellow-800 space-y-1">
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
            <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-800">
                <strong>💡 Tip:</strong> Multiple raags detected! The same swaras can belong to different raags. 
                Consider the time of day, mood, and characteristic phrases (pakad) to identify the correct raag.
              </div>
            </div>
          )}
        </div>
      )}
      {/* Confidence Meter */}
      {raagConfidence > 0.5 && <RaagConfidenceMeter confidence={raagConfidence} />}
      {/* Tanpura/Record Buttons */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-4">
        <button
          onClick={startTanpura}
          className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm ${
            isTanpuraPlaying ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isTanpuraPlaying}
        >
          🎵 Start Tanpura
        </button>
        <button
          onClick={stopTanpura}
          className={`bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm ${
            !isTanpuraPlaying ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isTanpuraPlaying}
        >
          ⏹️ Stop Tanpura
        </button>
        <button
          onClick={startRecording}
          className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm ${
            isRecording ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isRecording}
        >
          Record Segment
        </button>
        <button
          onClick={stopRecording}
          className={`bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-md text-sm ${
            !isRecording ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isRecording}
        >
          Analyze Raag
        </button>
      </div>
    </div>
  </div>
);

export default RaagDetectionUI;