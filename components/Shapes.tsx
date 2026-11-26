import type { CSSProperties, ReactNode } from "react";

export const C = {
  purple: "#812990",
  orange: "#ed5e26",
  lime: "#acd03b",
  blue: "#2484c5",
  pink: "#c8225c",
  teal: "#0fa898",
  green: "#5bbe84",
  yellow: "#f7a823",
  ink: "#2b1f2d",
  deep: "#4a1752",
};

/** Text colour that stays readable on each brand colour. */
export const onColor = (c: string) => (["lime", "yellow", "green"].includes(c) ? "var(--ink)" : "#fff");

/**
 * Small flat glyphs in the same shape vocabulary as the illustrations (circles, pills,
 * scallops). Names follow the content data (pin, clock, heart…); any name without its
 * own drawing falls back to an abstract shape, which suits the reference style.
 */
export function Icon({ name, color = "purple", className }: { name: string; color?: string; className?: string }) {
  const c = (C as Record<string, string>)[color] ?? color;
  const ink = C.ink;
  let g: ReactNode;
  switch (name) {
    case "pin":
      g = <><path d="M24 4c8.3 0 15 6.4 15 14.6C39 30 24 44 24 44S9 30 9 18.6C9 10.4 15.7 4 24 4z" fill={c} /><circle cx="24" cy="18" r="6" fill="#fff" /></>;
      break;
    case "clock":
      g = <><circle cx="24" cy="24" r="19" fill={c} /><path d="M24 13v12l8 5" stroke={ink} strokeWidth="3.5" strokeLinecap="round" fill="none" /></>;
      break;
    case "calendar":
      g = <><rect x="6" y="9" width="36" height="33" rx="7" fill={c} /><rect x="6" y="9" width="36" height="10" rx="5" fill={ink} /><circle cx="17" cy="29" r="3" fill="#fff" /><circle cx="31" cy="29" r="3" fill="#fff" /></>;
      break;
    case "people":
      g = <><circle cx="16" cy="15" r="6" fill={c} /><rect x="8" y="23" width="16" height="20" rx="8" fill={c} /><circle cx="32" cy="13" r="6" fill={ink} /><rect x="24" y="21" width="16" height="22" rx="8" fill={ink} /></>;
      break;
    case "house":
      g = <><path d="M6 22L24 7l18 15v18a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" fill={c} /><rect x="19" y="28" width="10" height="15" rx="5" fill={ink} /></>;
      break;
    case "heart":
      g = <g transform="translate(24 27) rotate(45)"><rect x="-12" y="-12" width="24" height="24" fill={c} /><circle cx="-12" cy="0" r="12" fill={c} /><circle cx="0" cy="-12" r="12" fill={c} /></g>;
      break;
    case "star":
      g = <path d="M24 4l5.6 12.4L43 18l-10 9.3 2.7 13.5L24 34l-11.7 6.8L15 27.3 5 18l13.4-1.6z" fill={c} />;
      break;
    case "tick":
      g = <><circle cx="24" cy="24" r="19" fill={c} /><path d="M15 24.5l6 6 12-13" stroke={ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>;
      break;
    case "book":
      g = <><path d="M6 10h14a4 4 0 0 1 4 4v28a4 4 0 0 0-4-4H6z" fill={c} /><path d="M42 10H28a4 4 0 0 0-4 4v28a4 4 0 0 1 4-4h14z" fill={ink} /></>;
      break;
    case "camera":
      g = <><rect x="5" y="13" width="38" height="27" rx="8" fill={c} /><rect x="16" y="8" width="16" height="8" rx="4" fill={c} /><circle cx="24" cy="27" r="8" fill={ink} /></>;
      break;
    case "music":
      g = <><circle cx="14" cy="36" r="7" fill={c} /><circle cx="34" cy="32" r="7" fill={c} /><path d="M19 36V10l20-4v26" stroke={ink} strokeWidth="4" fill="none" strokeLinejoin="round" /></>;
      break;
    case "ball":
      g = <><circle cx="24" cy="24" r="19" fill={c} /><path d="M6 19c12 5 24 5 36 0M6 29c12-5 24-5 36 0" stroke="#fff" strokeWidth="3" fill="none" /></>;
      break;
    case "chef":
      g = <><circle cx="15" cy="18" r="9" fill={c} /><circle cx="33" cy="18" r="9" fill={c} /><circle cx="24" cy="13" r="10" fill={c} /><rect x="14" y="22" width="20" height="18" rx="4" fill={c} /><rect x="14" y="34" width="20" height="6" rx="3" fill={ink} /></>;
      break;
    case "sun":
      g = (
        <>
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x="22" y="2" width="4" height="9" rx="2" fill={c} transform={`rotate(${i * 45} 24 24)`} />
          ))}
          <circle cx="24" cy="24" r="11" fill={c} />
          <path d="M19.5 26c2.5 3 6.5 3 9 0" stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      );
      break;
    case "moon":
      g = <><path d="M28 5a19 19 0 1 0 15 29A16 16 0 0 1 28 5z" fill={c} /><path d="M34 10h7l-7 8h7" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>;
      break;
    case "lunch": // a bowl with steam, then a sleepy moon: "Lunch & rest"
      g = (
        <>
          <path d="M4 25h34a17 17 0 0 1-34 0z" fill={c} />
          <path d="M14 19c-2-3 2-5 0-8M22 19c-2-3 2-5 0-8" stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M38 4a8 8 0 1 0 7 12 6.5 6.5 0 0 1-7-12z" fill={ink} />
        </>
      );
      break;
    case "palette": // art and making things: "Create & go home"
      g = (
        <>
          <path d="M24 5C12.4 5 4 13 4 23.5S12 43 22 43c3.5 0 4-2.5 2.5-4.5S24 33 28 33h6c5.5 0 10-4 10-10C44 13 35 5 24 5z" fill={c} />
          <circle cx="14" cy="21" r="3.5" fill="#fff" />
          <circle cx="21" cy="13" r="3.5" fill={C.yellow} />
          <circle cx="31" cy="13" r="3.5" fill={C.lime} />
          <circle cx="37" cy="21" r="3.5" fill={C.blue} />
        </>
      );
      break;
    case "butterfly":
      g = (
        <>
          <ellipse cx="14" cy="17" rx="10" ry="11" fill={c} />
          <ellipse cx="34" cy="17" rx="10" ry="11" fill={c} />
          <ellipse cx="15" cy="34" rx="8" ry="8" fill={c} opacity=".75" />
          <ellipse cx="33" cy="34" rx="8" ry="8" fill={c} opacity=".75" />
          <rect x="21.5" y="10" width="5" height="32" rx="2.5" fill={ink} />
        </>
      );
      break;
    case "kite":
      g = (
        <>
          <path d="M24 3l14 15-14 15-14-15z" fill={c} />
          <path d="M24 3v30M10 18h28" stroke="#fff" strokeWidth="2" />
          <path d="M24 33c-4 4 4 6 0 10" stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      );
      break;
    case "puzzle":
      g = <path d="M8 14h9a5 5 0 1 1 10 0h9v9a5 5 0 1 1 0 10v9H27a5 5 0 1 0-10 0H8V33a5 5 0 1 0 0-10z" fill={c} />;
      break;
    case "sprout":
    case "tree":
    case "leaf":
      g = <><path d="M24 44V24" stroke={ink} strokeWidth="4" strokeLinecap="round" /><path d="M24 26C24 14 14 6 4 6c0 12 9 20 20 20z" fill={c} /><path d="M24 22c0-9 8-15 20-15 0 9-7 15-20 15z" fill={c} opacity=".75" /></>;
      break;
    case "teacup":
      g = <><path d="M6 16h30v10a15 15 0 0 1-30 0z" fill={c} /><path d="M36 20h3a5 5 0 0 1 0 10h-4" stroke={ink} strokeWidth="3.5" fill="none" /><rect x="4" y="40" width="34" height="4" rx="2" fill={ink} /></>;
      break;
    case "feet":
      g = <><ellipse cx="16" cy="28" rx="7" ry="11" fill={c} /><ellipse cx="32" cy="22" rx="7" ry="11" fill={c} /><circle cx="14" cy="12" r="3" fill={ink} /><circle cx="30" cy="6" r="3" fill={ink} /></>;
      break;
    case "piggy": // piggy bank with a coin going in
      g = (
        <>
          <circle cx="24" cy="7" r="5" fill={C.yellow} />
          <ellipse cx="22" cy="28" rx="16" ry="12" fill={c} />
          <path d="M12 19l2-8 6 6z" fill={c} />
          <rect x="35" y="24" width="8" height="8" rx="3" fill={c} />
          <circle cx="38" cy="28" r="1.2" fill={ink} /><circle cx="41" cy="28" r="1.2" fill={ink} />
          <rect x="11" y="36" width="5" height="8" rx="2.5" fill={c} /><rect x="26" y="36" width="5" height="8" rx="2.5" fill={c} />
          <rect x="18" y="17" width="10" height="3" rx="1.5" fill={ink} />
          <circle cx="29" cy="25" r="1.6" fill={ink} />
        </>
      );
      break;
    case "flag":
      g = <><path d="M10 6v38" stroke={ink} strokeWidth="4" strokeLinecap="round" /><path d="M12 8h26l-6 9 6 9H12z" fill={c} /></>;
      break;
    case "pencil":
      g = <g transform="rotate(45 24 24)"><rect x="18" y="4" width="12" height="30" rx="2" fill={c} /><path d="M18 34h12l-6 10z" fill={ink} /></g>;
      break;
    case "magnifier":
      g = <><circle cx="20" cy="20" r="13" fill={c} /><circle cx="20" cy="20" r="6" fill="#fff" /><path d="M30 30l11 11" stroke={ink} strokeWidth="5" strokeLinecap="round" /></>;
      break;
    default: {
      // abstract fallback, picked from the name so it stays stable
      const k = [...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 4;
      g = [
        <circle key="a" cx="24" cy="24" r="19" fill={c} />,
        <path key="b" transform="translate(-6 -6) scale(.5)" d={scallopPath(12)} fill={c} />,
        <path key="c" d="M5 20a19 19 0 0 0 38 0z" fill={c} />,
        <path key="d" d="M6 42C6 20 20 6 42 6c0 22-14 36-36 36z" fill={c} />,
      ][k];
    }
  }
  return (
    <svg className={`icon ${className ?? ""}`.trim()} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      {g}
    </svg>
  );
}

function Svg({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export const Tri = ({ c }: { c: string }) => (
  <Svg viewBox="0 0 300 112">
    <g fill={c}>
      <circle cx="56" cy="56" r="56" />
      <circle cx="150" cy="56" r="56" />
      <circle cx="244" cy="56" r="56" />
    </g>
  </Svg>
);

export function scallopPath(n = 12, depth = 0.16, R = 50, cx = 60) {
  const pt = (a: number, r: number) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cx + r * Math.sin(a)).toFixed(2)}`;
  let d = `M${pt(0, R)}`;
  for (let k = 0; k < n; k++) {
    const mid = (2 * Math.PI * (k + 0.5)) / n;
    const end = (2 * Math.PI * (k + 1)) / n;
    d += ` Q${pt(mid, R * (1 + depth * 2.2))} ${pt(end, R)}`;
  }
  return d + "Z";
}

export const Scallop = ({ c, n = 12 }: { c: string; n?: number }) => (
  <Svg viewBox="0 0 120 120">
    <path d={scallopPath(n)} fill={c} />
  </Svg>
);

export const Half = ({ c, rot = 0 }: { c: string; rot?: number }) => (
  <Svg viewBox="0 0 200 200">
    <path transform={`rotate(${rot} 100 100)`} d="M0 100 A100 100 0 0 0 200 100 Z" fill={c} />
  </Svg>
);

export const Pill = ({ c }: { c: string }) => (
  <Svg viewBox="0 0 200 76">
    <rect width="200" height="76" rx="38" fill={c} />
  </Svg>
);

export const Dot = ({ c }: { c: string }) => (
  <Svg viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" fill={c} />
  </Svg>
);

export const Loop = ({ c = C.ink, w = 3 }: { c?: string; w?: number }) => (
  <Svg viewBox="0 0 130 100">
    <path d="M4 74 C34 76 72 64 84 38 C94 14 70 2 58 18 C44 36 68 70 126 40" stroke={c} strokeWidth={w} strokeLinecap="round" />
  </Svg>
);

export const Slash = ({ c = C.ink, n = 3, w = 3 }: { c?: string; n?: number; w?: number }) => (
  <Svg viewBox={`0 0 ${50 + n * 22} 78`}>
    {Array.from({ length: n }, (_, i) => (
      <path key={i} d={`M${8 + i * 22} 70 L${40 + i * 22} 8`} stroke={c} strokeWidth={w} strokeLinecap="round" />
    ))}
  </Svg>
);

export const Leaf = ({ c }: { c: string }) => (
  <Svg viewBox="0 0 120 100">
    <path d="M6 94 C6 40 46 6 114 6 C114 60 74 94 6 94 Z" fill={c} />
  </Svg>
);

/** Absolutely positioned decorative wrapper. */
export function Shape({ className = "", anim = "", style, children }: { className?: string; anim?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`shape ${className} ${anim}`.trim()} style={style}>
      {children}
    </div>
  );
}

/** Small flat illustrations built from the same shape vocabulary. */
export function Ill({ kind }: { kind: number }) {
  const { purple, orange, lime, blue, pink, ink, deep } = C;
  const k = ((kind % 8) + 8) % 8;
  let inner: ReactNode;
  switch (k) {
    case 0:
      inner = (
        <>
          <rect x="8" y="26" width="104" height="44" rx="22" fill={purple} />
          <circle cx="32" cy="48" r="13" fill={lime} />
          <path d="M26 48l5 5 9-10" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="54" y="40" width="44" height="6" rx="3" fill="#f6d3df" />
          <rect x="54" y="52" width="28" height="6" rx="3" fill="#f6d3df" />
        </>
      );
      break;
    case 1:
      inner = (
        <>
          <circle cx="30" cy="30" r="12" fill={orange} />
          <rect x="14" y="46" width="32" height="44" rx="16" fill={orange} />
          <circle cx="60" cy="22" r="13" fill={blue} />
          <rect x="43" y="39" width="34" height="51" rx="17" fill={blue} />
          <circle cx="90" cy="30" r="12" fill={purple} />
          <rect x="74" y="46" width="32" height="44" rx="16" fill={purple} />
        </>
      );
      break;
    case 2:
      inner = (
        <>
          <rect x="10" y="18" width="100" height="64" rx="10" fill={lime} />
          <circle cx="64" cy="44" r="12" fill={blue} />
          <path d="M40 82a24 24 0 0 1 48 0z" fill={blue} />
          <rect x="18" y="28" width="12" height="12" rx="3" fill="#fff" />
          <rect x="18" y="44" width="12" height="12" rx="3" fill="#fff" />
        </>
      );
      break;
    case 3:
      inner = (
        <>
          <rect x="34" y="6" width="52" height="86" rx="8" fill={deep} />
          <rect x="42" y="16" width="20" height="10" rx="3" fill={pink} />
          <rect x="42" y="32" width="36" height="24" rx="4" fill={blue} />
          <rect x="42" y="62" width="36" height="8" rx="3" fill={orange} />
          <rect x="42" y="74" width="24" height="8" rx="3" fill={lime} />
        </>
      );
      break;
    case 4:
      inner = (
        <>
          <g transform="translate(60 54) rotate(45)">
            <rect x="-26" y="-26" width="52" height="52" fill={pink} />
            <circle cx="-26" cy="0" r="26" fill={pink} />
            <circle cx="0" cy="-26" r="26" fill={pink} />
          </g>
          <circle cx="94" cy="18" r="8" fill={lime} />
        </>
      );
      break;
    case 5:
      inner = (
        <>
          <path transform="translate(0 -12) scale(.9) translate(7 4)" d={scallopPath(10)} fill={orange} />
          <circle cx="60" cy="47" r="16" fill={lime} />
        </>
      );
      break;
    case 6:
      inner = (
        <>
          <circle cx="44" cy="52" r="34" fill={blue} />
          <path d="M14 40c20 8 40 8 60 0M14 64c20-8 40-8 60 0" stroke="#fff" strokeWidth="3" />
          <path d="M92 86l12-40 12 40z" fill={orange} />
          <rect x="88" y="84" width="32" height="6" rx="3" fill={orange} />
        </>
      );
      break;
    default:
      inner = (
        <>
          <circle cx="36" cy="74" r="14" fill={purple} />
          <rect x="46" y="18" width="6" height="58" rx="3" fill={purple} />
          <circle cx="84" cy="66" r="14" fill={pink} />
          <rect x="94" y="10" width="6" height="58" rx="3" fill={pink} />
          <rect x="46" y="10" width="54" height="12" rx="6" fill={lime} />
        </>
      );
  }
  return <Svg viewBox="0 0 120 96">{inner}</Svg>;
}

export const ArrowR = () => (
  <svg viewBox="0 0 36 10" aria-hidden="true"><path d="M0 5h34M30 1l4 4-4 4" stroke="currentColor" fill="none" /></svg>
);
export const ArrowL = () => (
  <svg viewBox="0 0 36 10" aria-hidden="true"><path d="M36 5H2M6 1L2 5l4 4" stroke="currentColor" fill="none" /></svg>
);
export const ArrowU = () => (
  <svg viewBox="0 0 10 36" aria-hidden="true"><path d="M5 36V2M1 6l4-4 4 4" stroke="currentColor" fill="none" /></svg>
);
export const ArrowD = () => (
  <svg viewBox="0 0 10 36" aria-hidden="true"><path d="M5 0v34M1 30l4 4 4-4" stroke="currentColor" fill="none" /></svg>
);
export const Chev = () => (
  <svg className="chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg>
);
