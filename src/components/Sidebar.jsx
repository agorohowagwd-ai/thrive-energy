export default function Sidebar({
    page,
    setPage,
    logout,
  }) {
    const item =
      "w-full text-left px-4 py-3 rounded-xl hover:bg-orange-100 transition"
  
    return (
      <div className="w-64 h-screen bg-white border-r border-gray-100 p-6">
  
        <h1 className="text-2xl font-semibold mb-10">
          ⚡ Energy Journal
        </h1>
  
        <div className="space-y-2">
  
          <button
            onClick={() => setPage("dashboard")}
            className={item}
          >
            Dashboard
          </button>
  
          <button
            onClick={() => setPage("calendar")}
            className={item}
          >
            Calendar
          </button>
  
          <button
            onClick={() => setPage("insights")}
            className={item}
          >
            Insights
          </button>
  
          <button
            onClick={() => setPage("premium")}
            className={item}
          >
            Premium
          </button>
  
        </div>
  
        <button
          onClick={logout}
          className="
          mt-10
          bg-orange-400
          text-white
          px-4
          py-3
          rounded-xl
          w-full
          "
        >
          Logout
        </button>
  
      </div>
    )
  }