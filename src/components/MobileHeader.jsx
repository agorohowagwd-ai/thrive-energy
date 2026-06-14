export default function MobileHeader({
    openSidebar,
    }) {
    return (
    <div
    className="
    lg:hidden
    
      sticky
      top-0
    
      z-40
    
      bg-white/80
      backdrop-blur-3xl
    
      border-b
      border-black/5
    
      px-6
      py-4
      "
    >
      <div
        className="
        flex
        items-center
        justify-between
        "
      >
        <button
          onClick={openSidebar}
          className="
          text-2xl
          "
        >
          ☰
        </button>
    
        <div
          className="
          text-lg
          font-semibold
          "
        >
          Energy Flow
        </div>
    
        <div />
      </div>
    </div>
    
    )
    }
    