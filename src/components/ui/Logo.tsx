interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer hexagon shape */}
        <path
          d="M20 2L35 11V29L20 38L5 29V11L20 2Z"
          fill="url(#gradient1)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        
        {/* Inner code brackets */}
        <path
          d="M14 15L10 20L14 25"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 15L30 20L26 25"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Center slash */}
        <path
          d="M22 14L18 26"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient
            id="gradient1"
            x1="5"
            y1="2"
            x2="35"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#4F7396" />
            <stop offset="100%" stopColor="#2C4A6B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Company Name */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold text-black tracking-tight">
            StackWeb
          </span>
          <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
            Web Development
          </span>
        </div>
      )}
    </div>
  );
}

// Compact version for mobile
export function LogoCompact({ className = "" }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 2L35 11V29L20 38L5 29V11L20 2Z"
        fill="url(#gradient2)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 15L10 20L14 25"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 15L30 20L26 25"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 14L18 26"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="gradient2"
          x1="5"
          y1="2"
          x2="35"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4F7396" />
          <stop offset="100%" stopColor="#2C4A6B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
