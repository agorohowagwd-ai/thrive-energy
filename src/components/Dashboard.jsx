<div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg">

  <h2 className="text-2xl font-semibold mb-4">
    New Entry
  </h2>

  <input
    className="
      w-full
      p-3
      mb-3
      border
      border-gray-200
      rounded-xl
    "
    placeholder="Activity"
    value={activity}
    onChange={(e) => setActivity(e.target.value)}
  />

  <textarea
    className="
      w-full
      p-3
      mb-3
      border
      border-gray-200
      rounded-xl
    "
    placeholder="Notes"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="
      w-full
      p-3
      mb-3
      border
      border-gray-200
      rounded-xl
    "
  >
    <option>Work</option>
    <option>Health</option>
    <option>Sport</option>
    <option>Family</option>
    <option>Learning</option>
    <option>Friends</option>
  </select>

  <div className="flex gap-3 mb-4">
    {["😴","😐","🙂","🤩"].map((m) => (
      <button
        key={m}
        type="button"
        onClick={() => setMood(m)}
        className={`
          text-3xl
          transition
          ${mood === m ? "scale-125" : ""}
        `}
      >
        {m}
      </button>
    ))}
  </div>

  <input
    className="
      w-full
      p-3
      mb-4
      border
      border-gray-200
      rounded-xl
    "
    type="number"
    placeholder="Energy 1-10"
    value={energy}
    onChange={(e) => setEnergy(e.target.value)}
  />

  <button
    onClick={addEntry}
    className="
      w-full
      py-3
      rounded-xl
      bg-orange-400
      hover:bg-orange-500
      transition
      font-medium
    "
  >
    Add Entry
  </button>

</div>