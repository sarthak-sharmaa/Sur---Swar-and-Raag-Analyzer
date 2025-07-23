const InfoPanel = () => (
  <div
    id="info-panel"
    className="w-full bg-gradient-to-br from-yellow-50 to-amber-100 text-yellow-900 rounded-xl border-2 border-yellow-800 p-4 sm:p-6 mb-4 shadow text-sm sm:text-base font-serif"
  >
    <h2 className="text-lg sm:text-xl font-bold mb-3 text-yellow-900 font-serif">About Sur</h2>
    <p className="mb-3">
      <b>Sur</b> helps you identify musical notes and raags in real time, both in Western (C, D#, etc.) and Indian (सा, रे, etc.) notation.
    </p>
    <ul className="list-disc pl-4 sm:pl-6 mb-3 space-y-1">
      <li>
        <b>Note Detection</b>: Shows the detected note in both Western and Indian Sargam notation. The tuning meter shows how close you are to the exact pitch.
      </li>
      <li>
        <b>Raag Detection</b>: Analyzes sequences of notes to identify Indian classical raags based on their characteristic patterns (Aroha, Avaroha, Pakad).
      </li>
    </ul>
    <p className="mb-2">
      <b>How to use:</b>
    </p>
    <ol className="list-decimal pl-4 sm:pl-6 mb-3 space-y-1">
      <li>
        <b>Note Mode</b>: Select your base scale (which will be considered सा) and octave. Click <b>Start</b> and sing or play a note.
      </li>
      <li>
        <b>Raag Mode</b>: Click <b>Record Segment</b> and sing/play notes in sequence (like a melody). Click <b>Analyze Raag</b> to identify the raag.
      </li>
    </ol>
    <p className="text-xs sm:text-sm text-yellow-700 mt-2">
      Tip: For raag detection, try singing traditional raag patterns like Aaroh and Avaroh.
    </p>
  </div>
);

export default InfoPanel;