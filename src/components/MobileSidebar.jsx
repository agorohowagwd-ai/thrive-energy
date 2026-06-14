export default function MobileSidebar({
    open,
    close,
    entries,
    }) {
    
    if (!open) return null
    
    return (
    <>
    <div
    onClick={close}
    className="
    fixed
    inset-0
    
        bg-black/20
    
        z-50
        "
      />
    
      <div
        className="
        fixed
    
        left-0
        top-0
        bottom-0
    
        w-[320px]
    
        z-[60]
    
        bg-[#5e1820]
    
        text-white
    
        p-6
        "
      >
        <div
          className="
          flex
          justify-between
          items-center
          mb-8
          "
        >
          <div>
            Energy OS
          </div>
    
          <button
            onClick={close}
          >
            ✕
          </button>
        </div>
    
        <div>
          Entries: {entries.length}
        </div>
      </div>
    </>
    
    )
    }
    