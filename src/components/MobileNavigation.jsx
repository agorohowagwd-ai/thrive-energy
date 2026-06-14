export default function MobileNavigation({
    current = "home",
    }) {
    const items = [
    "Home",
    "Analytics",
    "Add",
    "Profile",
    ]
    
    return (
    <div
    className="
    lg:hidden
    
      fixed
      bottom-4
      left-4
      right-4
    
      z-50
      "
    >
      <div
        className="
        flex
        justify-between
    
        rounded-[28px]
    
        bg-white/85
        backdrop-blur-3xl
    
        border
        border-black/5
    
        px-4
        py-3
    
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        "
      >
        {items.map((item) => (
          <button
            key={item}
            className="
            flex-1
    
            py-2
    
            text-sm
    
            transition-all
            duration-300
    
            hover:text-[#7f1d1d]
            "
          >
            {item}
          </button>
        ))}
      </div>
    </div>
    
    )
    }
    