export function ParisIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Paris - Tour Eiffel">
      <defs>
        <linearGradient id="paris-night" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a2a44"/>
          <stop offset="60%" stopColor="#2e4e82"/>
          <stop offset="100%" stopColor="#1a3560"/>
        </linearGradient>
      </defs>

      {/* Night sky */}
      <rect width="240" height="240" rx="36" fill="url(#paris-night)"/>

      {/* Stars */}
      <circle cx="34" cy="26" r="1.5" fill="white" opacity="0.8"/>
      <circle cx="68" cy="18" r="1.2" fill="white" opacity="0.6"/>
      <circle cx="100" cy="30" r="1" fill="white" opacity="0.7"/>
      <circle cx="156" cy="22" r="1.5" fill="white" opacity="0.8"/>
      <circle cx="192" cy="36" r="1" fill="white" opacity="0.6"/>
      <circle cx="210" cy="16" r="1.2" fill="white" opacity="0.7"/>
      <circle cx="48" cy="52" r="1" fill="white" opacity="0.5"/>
      <circle cx="172" cy="46" r="1" fill="white" opacity="0.5"/>

      {/* Moon */}
      <circle cx="196" cy="30" r="12" fill="#f0e898"/>
      <circle cx="202" cy="26" r="10" fill="url(#paris-night)"/>

      {/* Halo around city (city glow) */}
      <ellipse cx="120" cy="200" rx="130" ry="28" fill="#e8a040" opacity="0.2"/>

      {/* Seine river */}
      <ellipse cx="120" cy="220" rx="130" ry="30" fill="#162d54" opacity="0.9"/>
      {/* Seine reflection shimmer */}
      <line x1="30" y1="214" x2="100" y2="214" stroke="#6090c8" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="140" y1="220" x2="220" y2="220" stroke="#6090c8" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

      {/* Banks / Quais */}
      <rect x="0" y="196" width="240" height="6" fill="#2a4030" opacity="0.8"/>

      {/* === TOUR EIFFEL === */}
      <g stroke="#b0986e" strokeLinecap="round" strokeLinejoin="round" fill="none">

        {/* Outer curved legs */}
        <path d="M 52 196 C 62 178 78 160 98 150" strokeWidth="13"/>
        <path d="M 188 196 C 178 178 162 160 142 150" strokeWidth="13"/>

        {/* Inner legs forming the arch */}
        <path d="M 88 196 C 91 182 94 170 100 162" strokeWidth="11"/>
        <path d="M 152 196 C 149 182 146 170 140 162" strokeWidth="11"/>

        {/* Horizontal brace between legs at base */}
        <line x1="89" y1="184" x2="151" y2="184" strokeWidth="4" opacity="0.6"/>

        {/* First platform */}
        <rect x="82" y="146" width="76" height="11" rx="3" fill="#b0986e" stroke="none"/>

        {/* Body: first to second floor */}
        <line x1="100" y1="157" x2="111" y2="106" strokeWidth="11"/>
        <line x1="140" y1="157" x2="129" y2="106" strokeWidth="11"/>

        {/* Brace mid */}
        <line x1="106" y1="136" x2="134" y2="136" strokeWidth="4" opacity="0.6"/>

        {/* Second platform */}
        <rect x="105" y="102" width="30" height="9" rx="2.5" fill="#b0986e" stroke="none"/>

        {/* Upper section */}
        <line x1="111" y1="111" x2="117" y2="50" strokeWidth="9"/>
        <line x1="129" y1="111" x2="123" y2="50" strokeWidth="9"/>

        {/* Upper brace */}
        <line x1="115" y1="82" x2="125" y2="82" strokeWidth="3.5" opacity="0.6"/>

        {/* Spire */}
        <path d="M 117 50 L 120 14 L 123 50 Z" fill="#b0986e" stroke="none"/>

        {/* Antenna */}
        <line x1="120" y1="14" x2="120" y2="6" strokeWidth="4"/>
        <circle cx="120" cy="6" r="3" fill="#b0986e" stroke="none"/>
      </g>

      {/* Platform lights (hover animated) */}
      <circle className="paris-light paris-light-1" cx="82" cy="151" r="4.5" fill="#ffe898"/>
      <circle className="paris-light paris-light-2" cx="158" cy="151" r="4.5" fill="#ffe898"/>
      <circle className="paris-light paris-light-3" cx="105" cy="106" r="3.5" fill="#ffe898"/>
      <circle className="paris-light paris-light-4" cx="135" cy="106" r="3.5" fill="#ffe898"/>
      <circle className="paris-light paris-light-5" cx="120" cy="10" r="4" fill="#fff8a0"/>
      <circle className="paris-light paris-light-6" cx="94" cy="172" r="3" fill="#ffe898"/>
      <circle className="paris-light paris-light-7" cx="146" cy="172" r="3" fill="#ffe898"/>
    </svg>
  );
}
