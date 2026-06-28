export function LyonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Lyon - Basilique de Fourvière">
      <defs>
        <linearGradient id="lyon-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fce8cc"/>
          <stop offset="70%" stopColor="#f8a850"/>
          <stop offset="100%" stopColor="#e07030"/>
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="240" height="240" rx="36" fill="url(#lyon-sky)"/>

      {/* Sun glow on horizon */}
      <ellipse cx="120" cy="220" rx="140" ry="60" fill="#f8d060" opacity="0.22"/>

      {/* River Saône */}
      <ellipse cx="120" cy="228" rx="135" ry="24" fill="#5888b0" opacity="0.78"/>
      <line x1="40" y1="222" x2="110" y2="222" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
      <line x1="148" y1="227" x2="210" y2="227" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.38"/>

      {/* === COLLINE DE FOURVIÈRE (Hill) === */}
      <path d="M 0 240 L 0 198 C 28 194 56 178 84 155 C 100 142 110 128 120 118 C 130 128 140 142 156 155 C 184 178 212 194 240 198 L 240 240 Z" fill="#4e7828"/>
      {/* Hill shadow/depth */}
      <path d="M 98 152 C 108 138 114 126 120 118 C 117 125 115 134 115 142 Z" fill="#3a5e1c" opacity="0.55"/>
      {/* Tree hints */}
      <circle cx="68" cy="175" r="10" fill="#3a5e1c" opacity="0.5"/>
      <circle cx="172" cy="175" r="10" fill="#3a5e1c" opacity="0.5"/>
      <circle cx="52" cy="188" r="8" fill="#3a5e1c" opacity="0.4"/>
      <circle cx="188" cy="188" r="8" fill="#3a5e1c" opacity="0.4"/>

      {/* === BASILIQUE DE FOURVIÈRE === */}

      {/* Lower church level */}
      <rect x="74" y="103" width="92" height="24" rx="3" fill="#f0ead8"/>
      {/* Cornice */}
      <rect x="72" y="99" width="96" height="6" rx="2" fill="#e4d8be"/>
      {/* Lower arches */}
      <path d="M 96 127 Q 120 112 144 127 Z" fill="#d8c8a0" opacity="0.45"/>

      {/* Rear corner towers (partially visible) */}
      <rect x="83" y="80" width="12" height="27" rx="2" fill="#ddd4be"/>
      <path d="M 83 80 L 89 71 L 95 80 Z" fill="#ddd4be"/>
      <rect x="145" y="80" width="12" height="27" rx="2" fill="#ddd4be"/>
      <path d="M 145 80 L 151 71 L 157 80 Z" fill="#ddd4be"/>

      {/* Front corner towers (prominent) */}
      <rect x="73" y="76" width="14" height="31" rx="2" fill="#f0ead8"/>
      <path d="M 73 76 L 80 65 L 87 76 Z" fill="#e8e0c8"/>
      <rect x="153" y="76" width="14" height="31" rx="2" fill="#f0ead8"/>
      <path d="M 153 76 L 160 65 L 167 76 Z" fill="#e8e0c8"/>
      {/* Tower windows */}
      <rect x="77" y="82" width="6" height="10" rx="3" fill="#c8a870" opacity="0.4"/>
      <rect x="157" y="82" width="6" height="10" rx="3" fill="#c8a870" opacity="0.4"/>

      {/* Upper chapel level */}
      <rect x="86" y="68" width="68" height="38" rx="2" fill="#f8f2e4"/>
      {/* Facade arch */}
      <path d="M 86 80 Q 120 65 154 80" fill="#f0e8d0" stroke="#d8c898" strokeWidth="1.5"/>
      {/* Large rose window */}
      <circle cx="120" cy="82" r="10" fill="none" stroke="#c89850" strokeWidth="2.5"/>
      <circle cx="120" cy="82" r="5" fill="#c89850" opacity="0.45"/>
      <line x1="110" y1="82" x2="130" y2="82" stroke="#c89850" strokeWidth="1.5" opacity="0.5"/>
      <line x1="120" y1="72" x2="120" y2="92" stroke="#c89850" strokeWidth="1.5" opacity="0.5"/>
      {/* Side windows */}
      <rect x="91" y="80" width="7" height="14" rx="3.5" fill="#c89850" opacity="0.3"/>
      <rect x="142" y="80" width="7" height="14" rx="3.5" fill="#c89850" opacity="0.3"/>
      {/* Upper pediment */}
      <path d="M 86 68 L 120 56 L 154 68 Z" fill="#f8f2e4"/>
      <line x1="86" y1="68" x2="120" y2="56" stroke="#d8c898" strokeWidth="1.5"/>
      <line x1="154" y1="68" x2="120" y2="56" stroke="#d8c898" strokeWidth="1.5"/>

      {/* === BELL TOWER (left, tall & distinctive) === */}
      <rect x="90" y="35" width="22" height="38" rx="2" fill="#ece4ce"/>
      {/* Bell arch opening */}
      <path d="M 93 41 Q 101 36 109 41" fill="none" stroke="#c0a060" strokeWidth="2"/>
      {/* Tower stripes */}
      <line x1="90" y1="50" x2="112" y2="50" stroke="#c8a060" strokeWidth="1.5" opacity="0.5"/>
      <line x1="90" y1="61" x2="112" y2="61" stroke="#c8a060" strokeWidth="1.5" opacity="0.5"/>
      {/* Tower cap */}
      <path d="M 88 35 L 101 22 L 114 35 Z" fill="#e0d4bc"/>
      <ellipse cx="101" cy="22" rx="13" ry="6" fill="#ece4ce"/>

      {/* Decorative right tower */}
      <rect x="127" y="52" width="18" height="20" rx="2" fill="#ece4ce"/>
      <ellipse cx="136" cy="52" rx="9" ry="5" fill="#e0d4bc"/>
      <circle cx="136" cy="48" r="3" fill="#c8a860" opacity="0.7"/>

      {/* === GOLDEN VIRGIN MARY STATUE === */}
      {/* Pedestal */}
      <rect x="98" y="14" width="6" height="10" fill="#e8dcc8"/>
      {/* Statue glow halo (hover) */}
      <circle className="lyon-halo" cx="101" cy="8" r="14" fill="#f0d040" opacity="0"/>
      {/* Statue body */}
      <ellipse cx="101" cy="12" rx="4" ry="6" fill="#e8b018"/>
      {/* Statue head */}
      <circle cx="101" cy="5" r="4.5" fill="#e8b820"/>
      {/* Crown rays */}
      <line className="lyon-ray lyon-ray-1" x1="101" y1="2" x2="101" y2="-3" stroke="#f8d030" strokeWidth="2.5" strokeLinecap="round"/>
      <line className="lyon-ray lyon-ray-2" x1="97" y1="3" x2="93" y2="-1" stroke="#f8d030" strokeWidth="2" strokeLinecap="round"/>
      <line className="lyon-ray lyon-ray-3" x1="105" y1="3" x2="109" y2="-1" stroke="#f8d030" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
