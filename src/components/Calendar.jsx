export default function Calendar({ entries }) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm">
  
        <h2 className="text-2xl font-semibold mb-6">
          Energy Calendar
        </h2>
  
        <div className="grid grid-cols-7 gap-2">
  
          {Array.from({ length: 30 }).map((_, i) => {
            const d = new Date()
            d.setDate(d.getDate() - (29 - i))
  
            const iso =
              d.toISOString().split("T")[0]
  
            const dayEntries =
              entries.filter(
                (e) => e.date === iso
              )
  
            const avg = dayEntries.length
              ? dayEntries.reduce(
                  (s, e) => s + e.energy,
                  0
                ) / dayEntries.length
              : 0
  
            let color = "bg-gray-200"
  
            if (avg >= 8)
              color = "bg-green-500"
            else if (avg >= 6)
              color = "bg-green-300"
            else if (avg >= 4)
              color = "bg-yellow-300"
            else if (avg > 0)
              color = "bg-red-300"
  
            return (
              <div
                key={i}
                className={`
                  h-12
                  rounded-xl
                  ${color}
                  flex
                  items-center
                  justify-center
                  text-sm
                `}
              >
                {d.getDate()}
              </div>
            )
          })}
  
        </div>
  
      </div>
    )
  }