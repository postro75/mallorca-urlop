import { useId } from "react";
import type { WxIcon } from "@/lib/wmo";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
};

export function IconSun({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.95" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        const x1 = 16 + Math.cos(r) * 9.2;
        const y1 = 16 + Math.sin(r) * 9.2;
        const x2 = 16 + Math.cos(r) * 12.4;
        const y2 = 16 + Math.sin(r) * 12.4;
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function IconCloud({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M10 22h12a5 5 0 0 0 .4-10 7 7 0 0 0-13.2 2A4.5 4.5 0 0 0 10 22z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function WxGlyph({
  kind,
  size = 64,
  night = false
}: {
  kind: WxIcon;
  size?: number;
  night?: boolean;
}) {
  const raw = useId().replace(/:/g, "");
  const sun = `s${raw}`;
  const glow = `g${raw}`;
  const cloud = `c${raw}`;
  const moon = `m${raw}`;
  const props = { width: size, height: size, viewBox: "0 0 64 64", "aria-hidden": true as const };

  const sunBody = (
    <>
      <defs>
        <radialGradient id={sun} cx="38%" cy="32%">
          <stop offset="0%" stopColor="#FFF4B0" />
          <stop offset="55%" stopColor="#FFC43A" />
          <stop offset="100%" stopColor="#FF8A1F" />
        </radialGradient>
        <radialGradient id={glow} cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFE066" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFE066" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="22" fill={`url(#${glow})`} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={32 + Math.cos(r) * 15.5}
            y1={32 + Math.sin(r) * 15.5}
            x2={32 + Math.cos(r) * 22}
            y2={32 + Math.sin(r) * 22}
            stroke="#FFB020"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="32" cy="32" r="11" fill={`url(#${sun})`} />
    </>
  );

  const moonBody = (
    <>
      <defs>
        <radialGradient id={moon} cx="35%" cy="30%">
          <stop offset="0%" stopColor="#F7F3E8" />
          <stop offset="100%" stopColor="#C9D2E8" />
        </radialGradient>
      </defs>
      <circle cx="14" cy="16" r="1.4" fill="#FFE9A8" />
      <circle cx="52" cy="22" r="1.1" fill="#FFE9A8" />
      <circle cx="48" cy="12" r="0.9" fill="#FFF" />
      <circle cx="36" cy="30" r="13" fill={`url(#${moon})`} />
      <circle cx="42" cy="26" r="4" fill="#D5DCEB" opacity="0.55" />
      <circle cx="31" cy="34" r="2.4" fill="#D5DCEB" opacity="0.4" />
    </>
  );

  const cloudPath = (
    <>
      <defs>
        <linearGradient id={cloud} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D5E4F5" />
        </linearGradient>
      </defs>
      <path
        d="M18 42h28a9 9 0 0 0 .5-18 14 14 0 0 0-27 3A8 8 0 0 0 18 42z"
        fill={`url(#${cloud})`}
        stroke="#C5D6EA"
        strokeWidth="1"
      />
    </>
  );

  if (kind === "clear") {
    return <svg {...props}>{night ? moonBody : sunBody}</svg>;
  }
  if (kind === "mainly-clear") {
    return (
      <svg {...props}>
        {night ? (
          <>
            {moonBody}
            <g transform="translate(4 10)">{cloudPath}</g>
          </>
        ) : (
          <>
            <g transform="translate(-6 -8) scale(0.78)">{sunBody}</g>
            {cloudPath}
          </>
        )}
      </svg>
    );
  }
  if (kind === "rain" || kind === "showers" || kind === "drizzle") {
    const drops = kind === "drizzle" ? 2 : 3;
    return (
      <svg {...props}>
        {cloudPath}
        {Array.from({ length: drops }).map((_, i) => (
          <path
            key={i}
            d={`M${22 + i * 8} 46 q2 6 0 10`}
            stroke="#3B82F6"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
            opacity={kind === "drizzle" ? 0.7 : 1}
          />
        ))}
      </svg>
    );
  }
  if (kind === "storm") {
    return (
      <svg {...props}>
        {cloudPath}
        <path d="M30 40l-7 10h8l-5 10 14-14h-8l5-6z" fill="#FFD166" stroke="#F4A261" strokeWidth="0.6" />
      </svg>
    );
  }
  if (kind === "fog") {
    return (
      <svg {...props}>
        <path d="M14 26h36" stroke="#A8B8C8" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M10 34h44" stroke="#C5D0DC" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M16 42h32" stroke="#A8B8C8" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "snow") {
    return (
      <svg {...props}>
        {cloudPath}
        <circle cx="24" cy="50" r="2.2" fill="#E8F4FF" stroke="#9EC5E8" />
        <circle cx="33" cy="54" r="2.2" fill="#E8F4FF" stroke="#9EC5E8" />
        <circle cx="42" cy="49" r="2.2" fill="#E8F4FF" stroke="#9EC5E8" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      {cloudPath}
      <path
        d="M14 34h20a8 8 0 0 0 .3-16 12 12 0 0 0-22 2A7 7 0 0 0 14 34z"
        fill="#B7C7D8"
        opacity="0.85"
      />
    </svg>
  );
}

export function NavIcon({ name }: { name: "today" | "weather" | "trips" | "island" }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", "aria-hidden": true as const };
  if (name === "today") {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="15" rx="3" {...stroke} />
        <path d="M8 3v4M16 3v4M4 10h16" {...stroke} />
      </svg>
    );
  }
  if (name === "weather") {
    return (
      <svg {...common}>
        <circle cx="10" cy="10" r="3.2" fill="currentColor" />
        <path d="M6 18h11a3.5 3.5 0 0 0 .3-7 5.2 5.2 0 0 0-10 .8A3.2 3.2 0 0 0 6 18z" fill="currentColor" opacity="0.85" />
      </svg>
    );
  }
  if (name === "trips") {
    return (
      <svg {...common}>
        <path d="M4 17l7-12 3 6 6-2-6 11H4z" {...stroke} />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11z" {...stroke} />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function MiniMetricIcon({ name }: { name: "sunup" | "sundown" | "sea" | "pressure" | "wind" | "uv" | "hum" | "wave" }) {
  const p = { width: 14, height: 14, viewBox: "0 0 24 24", "aria-hidden": true as const };
  if (name === "sunup" || name === "sundown") {
    return (
      <svg {...p}>
        <path d="M4 16h16M12 6v6M8 12l4-4 4 4M5 19h14" {...stroke} />
      </svg>
    );
  }
  if (name === "sea") {
    return (
      <svg {...p}>
        <path d="M3 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" {...stroke} />
        <path d="M3 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" {...stroke} />
      </svg>
    );
  }
  if (name === "pressure") {
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="8" {...stroke} />
        <path d="M12 12l4-3" {...stroke} />
      </svg>
    );
  }
  if (name === "wind") {
    return (
      <svg {...p}>
        <path d="M3 10h12a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3" {...stroke} />
      </svg>
    );
  }
  if (name === "uv") {
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" {...stroke} />
      </svg>
    );
  }
  if (name === "hum") {
    return (
      <svg {...p}>
        <path d="M12 3s7 8 7 12a7 7 0 1 1-14 0c0-4 7-12 7-12z" {...stroke} />
      </svg>
    );
  }
  return (
    <svg {...p}>
      <path d="M3 16c3-4 6-4 9 0s6 4 9 0" {...stroke} />
    </svg>
  );
}
