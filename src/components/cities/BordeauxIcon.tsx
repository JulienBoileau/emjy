export function BordeauxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Bordeaux - Place de la Bourse">
      <defs>
        <linearGradient id="bdx-sky" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe8cc"/>
          <stop offset="100%" stopColor="#e8843a"/>
        </linearGradient>
        <linearGradient id="bdx-water" x1="0" y1="150" x2="0" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#88c0dc"/>
          <stop offset="100%" stopColor="#3a84b0"/>
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="240" height="240" rx="36" fill="url(#bdx-sky)"/>

      {/* Sun */}
      <circle cx="28" cy="34" r="22" fill="#ffe870" opacity="0.92"/>
      <circle cx="28" cy="34" r="30" fill="#ffe870" opacity="0.18"/>

      {/* Quay / Ground */}
      <rect x="0" y="144" width="240" height="6" fill="#c87840" opacity="0.65"/>

      {/* === LEFT WING === */}
      <rect x="10" y="86" width="64" height="58" fill="#f6cc8a"/>
      {/* Columns */}
      <line x1="22" y1="86" x2="22" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      <line x1="34" y1="86" x2="34" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      <line x1="46" y1="86" x2="46" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      <line x1="58" y1="86" x2="58" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      <line x1="68" y1="86" x2="68" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      {/* Pediment */}
      <path d="M 10 86 L 42 64 L 74 86 Z" fill="#f6cc8a"/>
      <line x1="10" y1="86" x2="42" y2="64" stroke="#d8a060" strokeWidth="2"/>
      <line x1="74" y1="86" x2="42" y2="64" stroke="#d8a060" strokeWidth="2"/>
      {/* Arched windows */}
      <rect x="18" y="102" width="10" height="18" rx="5" fill="#c07838" opacity="0.38"/>
      <rect x="36" y="102" width="10" height="18" rx="5" fill="#c07838" opacity="0.38"/>
      <rect x="54" y="102" width="10" height="18" rx="5" fill="#c07838" opacity="0.38"/>
      {/* Entablature cornice */}
      <rect x="10" y="82" width="64" height="6" fill="#e8b870" opacity="0.7"/>

      {/* === CENTRAL SECTION === */}
      <rect x="76" y="76" width="88" height="68" fill="#fad898"/>
      {/* Columns */}
      <line x1="88" y1="76" x2="88" y2="144" stroke="#e0b870" strokeWidth="5"/>
      <line x1="102" y1="76" x2="102" y2="144" stroke="#e0b870" strokeWidth="5"/>
      <line x1="120" y1="76" x2="120" y2="144" stroke="#e0b870" strokeWidth="5"/>
      <line x1="138" y1="76" x2="138" y2="144" stroke="#e0b870" strokeWidth="5"/>
      <line x1="152" y1="76" x2="152" y2="144" stroke="#e0b870" strokeWidth="5"/>
      {/* Central pediment */}
      <path d="M 76 76 L 120 54 L 164 76 Z" fill="#fad898"/>
      <line x1="76" y1="76" x2="120" y2="54" stroke="#e0b870" strokeWidth="2"/>
      <line x1="164" y1="76" x2="120" y2="54" stroke="#e0b870" strokeWidth="2"/>
      {/* Entablature */}
      <rect x="76" y="72" width="88" height="6" fill="#f0c878" opacity="0.75"/>
      {/* Dome */}
      <ellipse cx="120" cy="44" rx="28" ry="18" fill="#f6cc8a"/>
      <ellipse cx="120" cy="41" rx="20" ry="12" fill="#fad898"/>
      <path d="M 98 44 Q 120 32 142 44 Z" fill="#d8a860" opacity="0.4"/>
      {/* Lantern on dome */}
      <rect x="116" y="27" width="8" height="14" rx="2" fill="#f2c070"/>
      <circle cx="120" cy="24" r="5" fill="#c87840"/>
      {/* Central arched windows */}
      <rect x="86" y="96" width="14" height="22" rx="7" fill="#c07838" opacity="0.38"/>
      <rect x="113" y="96" width="14" height="22" rx="7" fill="#c07838" opacity="0.38"/>
      <rect x="140" y="96" width="14" height="22" rx="7" fill="#c07838" opacity="0.38"/>

      {/* === RIGHT WING === */}
      <rect x="166" y="86" width="64" height="58" fill="#f6cc8a"/>
      {/* Columns */}
      <line x1="172" y1="86" x2="172" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      <line x1="182" y1="86" x2="182" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      <line x1="194" y1="86" x2="194" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      <line x1="206" y1="86" x2="206" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      <line x1="218" y1="86" x2="218" y2="144" stroke="#d8a060" strokeWidth="4.5"/>
      {/* Pediment */}
      <path d="M 166 86 L 198 64 L 230 86 Z" fill="#f6cc8a"/>
      <line x1="166" y1="86" x2="198" y2="64" stroke="#d8a060" strokeWidth="2"/>
      <line x1="230" y1="86" x2="198" y2="64" stroke="#d8a060" strokeWidth="2"/>
      {/* Arched windows */}
      <rect x="172" y="102" width="10" height="18" rx="5" fill="#c07838" opacity="0.38"/>
      <rect x="190" y="102" width="10" height="18" rx="5" fill="#c07838" opacity="0.38"/>
      <rect x="208" y="102" width="10" height="18" rx="5" fill="#c07838" opacity="0.38"/>
      {/* Entablature */}
      <rect x="166" y="82" width="64" height="6" fill="#e8b870" opacity="0.7"/>

      {/* === MIROIR D'EAU === */}
      <rect x="0" y="150" width="240" height="90" fill="url(#bdx-water)" opacity="0.84"/>

      {/* Building reflection (upside down, blurred) */}
      <g opacity="0.22" transform="scale(1,-1) translate(0,-300)">
        <rect x="10" y="86" width="64" height="58" fill="#f6cc8a"/>
        <rect x="76" y="76" width="88" height="68" fill="#fad898"/>
        <ellipse cx="120" cy="44" rx="28" ry="18" fill="#f6cc8a"/>
        <rect x="166" y="86" width="64" height="58" fill="#f6cc8a"/>
      </g>

      {/* Water ripple lines (hover animated) */}
      <line className="bdx-ripple bdx-ripple-1" x1="48" y1="168" x2="192" y2="168" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0"/>
      <line className="bdx-ripple bdx-ripple-2" x1="30" y1="186" x2="210" y2="186" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0"/>
      <line className="bdx-ripple bdx-ripple-3" x1="60" y1="204" x2="180" y2="204" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0"/>
    </svg>
  );
}
