export default function Background() {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
  
        <div
          className="
          absolute
          top-0
          left-0
          w-[700px]
          h-[700px]
          bg-pink-200
          rounded-full
          blur-[180px]
          opacity-50
          animate-pulse
          "
        />
  
        <div
          className="
          absolute
          bottom-0
          right-0
          w-[700px]
          h-[700px]
          bg-orange-200
          rounded-full
          blur-[180px]
          opacity-50
          animate-pulse
          "
        />
  
        <div
          className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          h-[500px]
          bg-purple-100
          rounded-full
          blur-[180px]
          opacity-40
          "
        />
  
      </div>
    )
  }