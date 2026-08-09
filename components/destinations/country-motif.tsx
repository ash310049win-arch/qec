import type { MotifKey } from "@/lib/destinations-data"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Small reusable line-art shapes (thin strokes, no fills)             */
/* ------------------------------------------------------------------ */

function PetalBlossom({
  x,
  y,
  r,
  petals = 5,
  rotation = 0,
  petalScale = 1,
}: {
  x: number
  y: number
  r: number
  petals?: number
  rotation?: number
  petalScale?: number
}) {
  const pr = r * petalScale
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      {Array.from({ length: petals }).map((_, i) => {
        const rot = (360 / petals) * i
        return (
          <path
            key={i}
            d={`M0 -${pr} C ${pr * 0.72} -${pr * 0.4} ${pr * 0.85} ${pr * 0.3} 0 ${pr * 0.85} C -${pr * 0.85} ${pr * 0.3} -${pr * 0.72} -${pr * 0.4} 0 -${pr}`}
            transform={`rotate(${rot})`}
            fill="none"
            stroke="currentColor"
            strokeWidth={Math.max(1, pr * 0.11)}
          />
        )
      })}
      <circle r={r * 0.24} fill="none" stroke="currentColor" strokeWidth={Math.max(0.8, r * 0.1)} />
    </g>
  )
}

function Star({ x, y, r, points = 5 }: { x: number; y: number; r: number; points?: number }) {
  const spikes = points * 2
  const pts = Array.from({ length: spikes })
    .map((_, i) => {
      const angle = (Math.PI / points) * i - Math.PI / 2
      const rad = i % 2 === 0 ? r : r * 0.45
      return `${(Math.cos(angle) * rad).toFixed(1)} ${(Math.sin(angle) * rad).toFixed(1)}`
    })
    .join(" ")
  return (
    <polygon
      points={pts}
      transform={`translate(${x} ${y})`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  )
}

const MAPLE_LEAF_PATH =
  "M0 -30 L6 -18 L18 -20 L14 -10 L26 -6 L18 2 L24 14 L10 12 L12 26 L0 18 L-12 26 L-10 12 L-24 14 L-18 2 L-26 -6 L-14 -10 L-18 -20 L-6 -18 Z M0 18 L0 34"

const FLEUR_DE_LIS_PATH =
  "M-16 -6 C -22 -14 -20 -26 -10 -29 C -6 -18 -6 -6 -2 6 L -16 6 Z M16 -6 C 22 -14 20 -26 10 -29 C 6 -18 6 -6 2 6 L 16 6 Z M-10 6 C -12 12 -9 16 -2 16 L 2 16 C 9 16 12 12 10 6 C 8 1 4 1 0 1 C -4 1 -8 1 -10 6 Z M0 -29 L0 1"

const EAGLE_PATH =
  "M0 0 C -8 -14 -20 -18 -34 -16 C -22 -10 -14 -4 -8 2 C -20 -2 -30 2 -38 8 C -24 6 -14 8 -6 12 C -14 16 -20 22 -24 30 C -12 24 -4 18 0 10 C 4 18 12 24 24 30 C 20 22 14 16 6 12 C 14 8 24 6 38 8 C 30 2 20 -2 8 2 C 14 -4 22 -10 34 -16 C 20 -18 8 -14 0 0 Z"

const BOOMERANG_PATH =
  "M-26 6 L-10 -18 L-4 -8 L2 -18 L26 6 L18 13 L10 5 L4 12 L-4 5 L-12 12 Z"

const KORU_PATH =
  "M0 0 C 6 -2 10 -6 10 -12 C 10 -18 4 -22 -2 -20 C -10 -18 -12 -10 -8 -4 C -4 2 4 4 10 2 C 18 0 24 -6 26 -14"

const DUNE_PATH = "M0 20 Q 30 4 60 18 T 120 16"

/* ------------------------------------------------------------------ */
/* Per-motif tile content                                              */
/* ------------------------------------------------------------------ */

function MotifArt({ motif }: { motif: MotifKey }) {
  switch (motif) {
    case "cherry-blossom":
      return (
        <>
          <g strokeLinecap="round" fill="none">
            <path d="M40 150 C 80 120 110 130 140 96" strokeWidth="2" />
            <path d="M78 130 C 88 106 84 92 78 74" strokeWidth="1.4" />
            <path d="M112 116 C 128 100 132 92 138 78" strokeWidth="1.2" />
            <path d="M70 128 C 46 122 38 108 28 94" strokeWidth="1.2" />
          </g>
          <PetalBlossom x={140} y={94} r={15} />
          <PetalBlossom x={78} y={72} r={11} rotation={40} />
          <PetalBlossom x={26} y={90} r={10} rotation={-30} />
          <g strokeLinecap="round" fill="none" strokeWidth="1.1">
            <path d="M150 122 C 158 114 164 114 172 108" />
            <path d="M104 56 C 112 48 118 44 128 40" />
            <path d="M196 96 C 204 92 210 88 216 82" />
          </g>
          <g fill="none" strokeWidth="1.1">
            <PetalBlossom x={212} y={60} r={7} petals={5} rotation={20} />
            <PetalBlossom x={60} y={40} r={6} petals={5} rotation={-15} />
            <PetalBlossom x={176} y={160} r={8} petals={5} rotation={45} />
            <PetalBlossom x={300} y={120} r={9} petals={5} rotation={-45} />
          </g>
        </>
      )
    case "maple-leaf":
      return (
        <>
          <g fill="none" strokeLinecap="round">
            <path d={MAPLE_LEAF_PATH} strokeWidth="1.4" transform="translate(60 90) rotate(8) scale(1.6)" />
            <path d={MAPLE_LEAF_PATH} strokeWidth="1.1" transform="translate(220 60) rotate(-12) scale(1.1)" />
            <path d={MAPLE_LEAF_PATH} strokeWidth="1.3" transform="translate(280 180) rotate(24) scale(1.3)" />
            <path d={MAPLE_LEAF_PATH} strokeWidth="1" transform="translate(120 220) rotate(-20) scale(0.9)" />
            <path d="M40 40 h30 M300 40 h26 M20 300 h40 M280 300 h34" strokeWidth="1" />
          </g>
        </>
      )
    case "thistle-tartan":
      return (
        <>
          <g fill="none" strokeLinecap="round">
            <g transform="translate(60 120)">
              <path d="M0 60 L0 0" strokeWidth="1.4" />
              <path d="M-16 52 L-8 36 M14 50 L8 36 M-12 30 L-4 20 M12 28 L5 20" strokeWidth="1" />
              <path d="M0 -6 C 8 -12 14 -6 12 2 M0 -6 C -8 -12 -14 -6 -12 2" strokeWidth="1.2" />
              <path d="M-3 -14 L-9 -24 L0 -18 L9 -24 L3 -14" strokeWidth="1.2" />
            </g>
            <g transform="translate(230 220) scale(1.2)">
              <path d="M0 60 L0 0" strokeWidth="1.4" />
              <path d="M-16 52 L-8 36 M14 50 L8 36 M-12 30 L-4 20 M12 28 L5 20" strokeWidth="1" />
              <path d="M0 -6 C 8 -12 14 -6 12 2 M0 -6 C -8 -12 -14 -6 -12 2" strokeWidth="1.2" />
              <path d="M-3 -14 L-9 -24 L0 -18 L9 -24 L3 -14" strokeWidth="1.2" />
            </g>
          </g>
          <g stroke="#C89B3C" fill="none" strokeWidth="0.8" opacity="0.7">
            <path d="M180 20 v300 M240 20 v300 M300 20 v300" />
            <path d="M20 100 h300 M20 170 h300 M20 240 h300" />
          </g>
        </>
      )
    case "stars-stripes":
      return (
        <>
          <g fill="none">
            <Star x={60} y={70} r={16} />
            <Star x={160} y={140} r={22} />
            <Star x={270} y={70} r={14} />
            <Star x={120} y={240} r={13} />
            <Star x={260} y={250} r={18} />
          </g>
          <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7">
            <path d="M20 50 h300 M20 96 h300 M20 160 h300 M20 200 h300 M20 280 h300" />
          </g>
        </>
      )
    case "boomerang-southern-cross":
      return (
        <>
          <g fill="none">
            <path d={BOOMERANG_PATH} strokeWidth="1.5" transform="translate(80 190) rotate(15)" />
            <path d={BOOMERANG_PATH} strokeWidth="1.1" transform="translate(250 80) rotate(40) scale(0.8)" />
            <g strokeLinecap="round">
              <path d="M150 60 l4 14 M134 84 l16 2 M126 62 l6 12" strokeWidth="1" />
              <Star x={150} y={70} r={12} points={4} />
              <path d="M258 150 l4 12 M244 170 l13 2 M238 152 l5 10" strokeWidth="1" />
              <Star x={258} y={160} r={10} points={4} />
            </g>
          </g>
          <path d={DUNE_PATH} fill="none" strokeWidth="1" transform="translate(0 0)" />
          <path d={DUNE_PATH} fill="none" strokeWidth="1" transform="translate(0 40)" opacity="0.6" />
        </>
      )
    case "eagle-bavaria":
      return (
        <>
          <g fill="none">
            <path d={EAGLE_PATH} strokeWidth="1.3" transform="translate(150 90) scale(1.5)" />
            <path d={EAGLE_PATH} strokeWidth="1" transform="translate(70 250) scale(0.9)" />
            <path d={EAGLE_PATH} strokeWidth="1" transform="translate(270 260) scale(0.8) rotate(15)" />
          </g>
          <g stroke="currentColor" fill="none" strokeWidth="0.7" opacity="0.7">
            <path d="M40 40 h24 v24 h-24 Z M104 40 h24 v24 h-24 Z M168 40 h24 v24 h-24 Z M232 40 h24 v24 h-24 Z M296 40 h24 v24 h-24 Z" />
          </g>
        </>
      )
    case "shamrock":
      return (
        <>
          <g fill="none">
            <PetalBlossom x={70} y={150} r={20} petals={3} rotation={-90} />
            <path d="M70 170 l0 22 M62 192 l8 6 M78 192 l-8 6" strokeWidth="1.4" />
            <PetalBlossom x={210} y={70} r={14} petals={3} rotation={-90} />
            <path d="M210 84 l0 16 M204 100 l6 5 M216 100 l-6 5" strokeWidth="1.1" />
            <PetalBlossom x={260} y={220} r={16} petals={3} rotation={-90} />
            <path d="M260 236 l0 18 M252 254 l8 6 M268 254 l-8 6" strokeWidth="1.2" />
          </g>
          <g stroke="#C89B3C" fill="none" strokeWidth="1" opacity="0.7">
            <circle cx={150} cy={150} r={34} />
            <circle cx={150} cy={150} r={58} />
          </g>
        </>
      )
    case "fern-koru":
      return (
        <>
          <g fill="none" strokeLinecap="round">
            <path d={KORU_PATH} strokeWidth="1.6" transform="translate(90 130) scale(1.8)" />
            <path d={KORU_PATH} strokeWidth="1.1" transform="translate(250 60) scale(1.1)" />
            <path d={KORU_PATH} strokeWidth="1.3" transform="translate(220 250) scale(1.4) rotate(120)" />
            <path d="M40 60 C 80 40 120 40 160 60 C 120 76 80 76 40 60 Z" strokeWidth="1" />
          </g>
        </>
      )
    case "fleur-de-lis":
      return (
        <>
          <g fill="none">
            <path d={FLEUR_DE_LIS_PATH} strokeWidth="1.4" transform="translate(80 180) scale(1.7)" />
            <path d={FLEUR_DE_LIS_PATH} strokeWidth="1.1" transform="translate(240 90) scale(1.1)" />
            <path d={FLEUR_DE_LIS_PATH} strokeWidth="1.2" transform="translate(280 260) scale(1.2) rotate(10)" />
            <path d={FLEUR_DE_LIS_PATH} strokeWidth="1" transform="translate(40 60) scale(0.8) rotate(-12)" />
          </g>
        </>
      )
    case "tulip-windmill":
      return (
        <>
          <g fill="none" strokeLinecap="round">
            <g transform="translate(70 170)">
              <path d="M-13 14 C -15 -4 -8 -16 0 -18 C 8 -16 15 -4 13 14 C 8 8 4 6 0 6 C -4 6 -8 8 -13 14 Z" strokeWidth="1.3" />
              <path d="M0 6 L0 26 M-14 20 L0 26 L14 20" strokeWidth="1.1" />
            </g>
            <g transform="translate(250 220) scale(1.3)">
              <path d="M-13 14 C -15 -4 -8 -16 0 -18 C 8 -16 15 -4 13 14 C 8 8 4 6 0 6 C -4 6 -8 8 -13 14 Z" strokeWidth="1.3" />
              <path d="M0 6 L0 26 M-14 20 L0 26 L14 20" strokeWidth="1.1" />
            </g>
            <g transform="translate(170 70)">
              <path d="M0 0 C 4 -18 14 -26 22 -26 M0 0 C -4 -18 -14 -26 -22 -26 M0 0 C 16 -4 26 4 28 12 M0 0 C -16 -4 -26 4 -28 12" strokeWidth="1.2" />
              <circle r="3.5" fill="none" strokeWidth="1" />
            </g>
          </g>
        </>
      )
    case "palm-falcon":
      return (
        <>
          <g fill="none" strokeLinecap="round">
            <g transform="translate(120 230)">
              <path d="M0 0 C -8 -30 -30 -52 -60 -62 M0 0 C 2 -32 -2 -54 8 -72 M0 0 C 10 -28 28 -42 52 -46 M0 0 C -18 -18 -44 -26 -70 -28" strokeWidth="1.2" />
              <path d="M-38 -40 l-8 4 M-20 -44 l-6 6 M28 -30 l8 4 M40 -24 l8 3" strokeWidth="0.9" />
            </g>
            <g transform="translate(240 60)">
              <path d="M-26 0 C -30 -10 -22 -18 -10 -20 M26 0 C 30 -10 22 -18 10 -20 M-20 -6 C -14 -14 14 -14 20 -6 M-14 4 C -8 12 8 12 14 4" strokeWidth="1.2" />
              <circle cx="0" cy="8" r="5" fill="none" strokeWidth="1" />
            </g>
            <path d="M20 120 Q 60 100 100 118 M40 140 Q 80 124 120 138 M60 300 Q 100 280 140 296" strokeWidth="1.1" />
            <path d="M200 60 Q 240 44 280 58 M220 90 Q 260 76 300 88" strokeWidth="1" />
          </g>
        </>
      )
    case "mugunghwa":
      return (
        <>
          <g fill="none">
            <PetalBlossom x={80} y={120} r={18} petals={5} rotation={10} />
            <PetalBlossom x={230} y={230} r={22} petals={5} rotation={40} />
            <PetalBlossom x={280} y={80} r={13} petals={5} rotation={-20} />
            <PetalBlossom x={140} y={270} r={12} petals={5} rotation={70} />
            <g stroke="#C89B3C" fill="none" strokeWidth="1.2" opacity="0.75">
              <circle cx={155} cy={120} r={26} />
              <path d="M155 94 C 175 100 182 122 172 140 M155 146 C 138 140 130 122 138 104" strokeWidth="1" />
            </g>
          </g>
        </>
      )
    case "orchid-merlion":
      return (
        <>
          <g fill="none">
            <g transform="translate(110 120) rotate(15)">
              <PetalBlossom x={0} y={0} r={16} petals={5} petalScale={1.4} />
              <path d="M0 0 L0 34 M0 12 L10 26 M0 12 L-10 26" strokeWidth="1.1" strokeLinecap="round" />
            </g>
            <g transform="translate(250 250) rotate(-20) scale(1.1)">
              <PetalBlossom x={0} y={0} r={16} petals={5} petalScale={1.3} />
              <path d="M0 0 L0 30 M0 10 L9 24 M0 10 L-9 24" strokeWidth="1.1" strokeLinecap="round" />
            </g>
            <g transform="translate(70 250)">
              <circle r="14" fill="none" strokeWidth="1.2" />
              <path d="M-20 0 L-26 -12 L-12 -14 M20 0 L26 -12 L12 -14 M-24 -4 L-32 -18 M24 -4 L32 -18" strokeWidth="1" strokeLinecap="round" />
              <path d="M14 12 C 34 16 48 6 56 -10" strokeWidth="1.3" />
            </g>
          </g>
        </>
      )
    case "eagle-amber":
      return (
        <>
          <g fill="none">
            <path d={EAGLE_PATH} strokeWidth="1.2" transform="translate(150 200) scale(1.3) rotate(180)" />
            <g strokeWidth="1">
              <path d="M60 60 h30 M300 70 h28" strokeLinecap="round" />
            </g>
          </g>
          <g fill="none" strokeLinecap="round" stroke="#C89B3C" opacity="0.8">
            <ellipse cx={90} cy={140} rx={7} ry={11} strokeWidth="1.1" />
            <ellipse cx={250} cy={130} rx={6} ry={10} strokeWidth="1" />
            <ellipse cx={180} cy={60} rx={5} ry={8} strokeWidth="1" />
            <ellipse cx={300} cy={280} rx={6} ry={10} strokeWidth="1" />
          </g>
        </>
      )
    case "hibiscus":
      return (
        <>
          <g fill="none">
            <g transform="translate(90 130)">
              <PetalBlossom x={0} y={0} r={17} petals={5} rotation={30} petalScale={1.2} />
              <path d="M0 0 L0 30 M0 8 L8 22 M0 8 L-8 22" strokeWidth="1" strokeLinecap="round" />
              <circle cx={0} cy={-2} r={2.2} fill="none" strokeWidth="1" />
            </g>
            <g transform="translate(240 240) scale(1.2)">
              <PetalBlossom x={0} y={0} r={15} petals={5} rotation={-10} petalScale={1.2} />
              <path d="M0 0 L0 26 M0 7 L7 20 M0 7 L-7 20" strokeWidth="1" strokeLinecap="round" />
            </g>
            <g stroke="#C89B3C" fill="none" strokeWidth="1" opacity="0.8">
              <circle cx={180} cy={70} r={10} />
              <path d="M180 70 C 186 62 192 66 188 74 M180 70 C 172 62 168 68 174 75" strokeWidth="0.9" />
            </g>
          </g>
        </>
      )
  }
}

/* ------------------------------------------------------------------ */
/* Public motif component — faint tiled linework behind the hero       */
/* ------------------------------------------------------------------ */

export function CountryMotif({ motif, className }: { motif: MotifKey; className?: string }) {
  const patternId = `dest-motif-${motif}`
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        style={{ color: "#2A211D", opacity: 0.1 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={patternId} width="340" height="340" patternUnits="userSpaceOnUse">
            <MotifArt motif={motif} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
