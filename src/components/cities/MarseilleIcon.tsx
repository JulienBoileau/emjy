export function MarseilleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Marseille - Notre-Dame de la Garde">
      <defs>
        <linearGradient id="mars-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cce6f8"/>
          <stop offset="55%" stopColor="#5aace0"/>
          <stop offset="100%" stopColor="#1a6090"/>
        </linearGradient>
      </defs>

      {/* Sky & sea */}
      <rect width="240" height="240" rx="36" fill="url(#mars-sky)"/>

      {/* Deep sea in foreground */}
      <ellipse cx="120" cy="232" rx="140" ry="30" fill="#0e4878" opacity="0.9"/>

      {/* Sea surface */}
      <rect x="0" y="192" width="240" height="48" fill="#1460a0" opacity="0.75"/>

      {/* === ROCKY CLIFF (La Bonne Mère sits 162m high) === */}
      <path d="M 40 240 C 40 205 55 178 75 158 C 88 146 104 140 120 136 C 136 140 152 146 165 158 C 185 178 200 205 200 240 Z" fill="#9a7e58"/>
      {/* Cliff face texture */}
      <path d="M 75 158 C 88 146 104 140 120 136 C 114 143 109 152 108 162 Z" fill="#7a6040" opacity="0.55"/>
      <path d="M 165 158 C 152 146 136 140 120 136 C 126 143 131 152 132 162 Z" fill="#7a6040" opacity="0.4"/>
      {/* Rock details */}
      <line x1="90" y1="178" x2="82" y2="200" stroke="#6a5030" strokeWidth="2" opacity="0.4" strokeLinecap="round"/>
      <line x1="148" y1="175" x2="158" y2="198" stroke="#6a5030" strokeWidth="2" opacity="0.35" strokeLinecap="round"/>

      {/* === LOWER BASILICA (striped Romanesque-Byzantine) === */}
      {/* Main church body */}
      <rect x="86" y="114" width="68" height="26" fill="#f0ece0"/>
      {/* Characteristic stone stripes (alternating cream & dark) */}
      <rect x="86" y="119" width="68" height="3.5" fill="#6a4028" opacity="0.55"/>
      <rect x="86" y="127" width="68" height="3.5" fill="#6a4028" opacity="0.55"/>
      <rect x="86" y="135" width="68" height="3.5" fill="#6a4028" opacity="0.55"/>
      {/* Entrance arch */}
      <rect x="111" y="126" width="18" height="14" rx="9" fill="#6a4028" opacity="0.4"/>
      {/* Side buttresses */}
      <rect x="81" y="118" width="8" height="22" rx="2" fill="#e4decb"/>
      <rect x="81" y="118" width="8" height="4" fill="#6a4028" opacity="0.4"/>
      <rect x="81" y="126" width="8" height="4" fill="#6a4028" opacity="0.4"/>
      <rect x="151" y="118" width="8" height="22" rx="2" fill="#e4decb"/>
      <rect x="151" y="118" width="8" height="4" fill="#6a4028" opacity="0.4"/>
      <rect x="151" y="126" width="8" height="4" fill="#6a4028" opacity="0.4"/>

      {/* === UPPER BASILICA === */}
      <rect x="94" y="96" width="52" height="22" rx="2" fill="#f6f2e6"/>
      {/* Upper stripes */}
      <rect x="94" y="101" width="52" height="3" fill="#6a4028" opacity="0.5"/>
      <rect x="94" y="109" width="52" height="3" fill="#6a4028" opacity="0.5"/>
      {/* Arched windows upper */}
      <rect x="100" y="99" width="10" height="14" rx="5" fill="#6a4028" opacity="0.35"/>
      <rect x="130" y="99" width="10" height="14" rx="5" fill="#6a4028" opacity="0.35"/>

      {/* === BELL TOWER (the most recognizable feature - very tall) === */}
      <rect x="109" y="44" width="22" height="56" rx="3" fill="#f2ece0"/>
      {/* Tower stripes */}
      <rect x="109" y="51" width="22" height="3" fill="#6a4028" opacity="0.55"/>
      <rect x="109" y="60" width="22" height="3" fill="#6a4028" opacity="0.55"/>
      <rect x="109" y="69" width="22" height="3" fill="#6a4028" opacity="0.55"/>
      <rect x="109" y="78" width="22" height="3" fill="#6a4028" opacity="0.55"/>
      <rect x="109" y="87" width="22" height="3" fill="#6a4028" opacity="0.55"/>
      {/* Bell arch */}
      <path d="M 113 54 Q 120 48 127 54" fill="none" stroke="#8a5030" strokeWidth="2" strokeLinecap="round"/>
      {/* Tower crown */}
      <path d="M 105 44 L 120 30 L 135 44 Z" fill="#e4dcc8"/>
      <ellipse cx="120" cy="30" rx="15" ry="8" fill="#f0ead8"/>
      {/* Lantern */}
      <rect x="116" y="20" width="8" height="12" rx="2" fill="#e8dfc8"/>

      {/* === GOLDEN VIRGIN MARY STATUE (iconic silhouette) === */}
      {/* Pedestal */}
      <rect x="117" y="6" width="6" height="16" fill="#e8dcc8"/>
      {/* Glow halo (hover animated) */}
      <circle className="mars-halo" cx="120" cy="0" r="16" fill="#f8d040" opacity="0"/>
      {/* Statue robe */}
      <path d="M 116 16 C 117 12 119 8 120 4 C 121 8 123 12 124 16 Z" fill="#e8a818"/>
      {/* Statue head + crown */}
      <circle cx="120" cy="2" r="4.5" fill="#e8b820"/>
      <path d="M 116 1 L 120 -5 L 124 1" fill="none" stroke="#f8d030" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="120" cy="-5" r="2.5" fill="#f8d030"/>

      {/* === MEDITERRANEAN SEA DETAILS === */}
      {/* Wave lines (hover animated) */}
      <path className="mars-wave mars-wave-1" d="M 20 198 Q 60 193 100 198 Q 140 203 180 198 Q 210 193 240 198" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      <path className="mars-wave mars-wave-2" d="M 0 210 Q 50 205 100 210 Q 150 215 200 210 Q 225 205 240 210" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

      {/* === BOATS (Vieux-Port) === */}
      <g className="mars-boat mars-boat-1">
        <rect x="32" y="197" width="26" height="8" rx="4" fill="white" opacity="0.85"/>
        <line x1="45" y1="197" x2="45" y2="183" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.75"/>
        <path d="M 45 185 L 54 196 L 45 196 Z" fill="white" opacity="0.7"/>
      </g>
      <g className="mars-boat mars-boat-2">
        <rect x="186" y="200" width="22" height="7" rx="3.5" fill="white" opacity="0.8"/>
        <line x1="197" y1="200" x2="197" y2="188" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        <path d="M 197 190 L 205 199 L 197 199 Z" fill="white" opacity="0.65"/>
      </g>
    </svg>
  );
}
