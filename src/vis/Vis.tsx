// Motor de diagramas. Cada dibujo es función pura de (escena, paso, t): no hay estado ni CSS animado,
// así la web lo mueve con requestAnimationFrame y Remotion con el número de frame.
import type { ReactNode } from 'react';
import type { Accion } from '../data/tipos';
import type {
  Escena, EscenaAnticuerpo, EscenaCadenas, EscenaCanal, EscenaCiclo, EscenaCurvas, EscenaEscalera,
  EscenaFlujo, EscenaOrganos, EscenaPizarra, EscenaRuta, EscenaSinapsis, EscenaVias, Organo,
} from './tipos';

export const W = 960;
export const H = 600;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const suave = (x: number) => { const c = clamp(x); return c * c * (3 - 2 * c); };
const ap = (t: number, del = 0, d = 0.5) => suave((t - del) / d);
const fr = (x: number) => x - Math.floor(x);
const azar = (i: number, s = 1) => fr(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);

const tinta = 'var(--tinta)';
const tenue = 'var(--tinta-2)';
const linea = 'var(--linea)';
const fondo = 'var(--pizarra)';
const FONT = "'Atkinson Hyperlegible Next Variable', system-ui, sans-serif";

export const color = (a?: Accion): string => {
  switch (a) {
    case 'agonista': return 'var(--m-ago)';
    case 'antagonista': case 'bloqueante': return 'var(--m-ant)';
    case 'inhibidor': return 'var(--m-inh)';
    case 'modulador': return 'var(--m-mod)';
    case 'precursor': case 'liberador': return 'var(--m-pre)';
    case 'citotoxico': return 'var(--m-cit)';
    case 'anticuerpo': case 'hormona': case 'suplemento': return 'var(--m-bio)';
    default: return tinta;
  }
};
export const tinte = (a?: Accion): string => `color-mix(in srgb, ${color(a)} 14%, var(--pizarra))`;

function T(p: { x: number; y: number; c?: string; s?: number; w?: number; a?: 'start' | 'middle' | 'end'; o?: number; children: ReactNode; halo?: boolean }) {
  return (
    <text x={p.x} y={p.y} fill={p.c ?? tinta} fontSize={p.s ?? 30} fontWeight={p.w ?? 600} textAnchor={p.a ?? 'middle'} opacity={p.o}
      fontFamily={FONT} dominantBaseline="middle"
      style={p.halo ? { paintOrder: 'stroke', stroke: fondo, strokeWidth: 7, strokeLinejoin: 'round' } : undefined}>
      {p.children}
    </text>
  );
}

/** Parte un texto en renglones de hasta n caracteres. */
export function renglones(s: string, n: number): string[] {
  const out: string[] = []; let cur = '';
  for (const w of s.split(' ')) {
    if (cur && (cur + ' ' + w).length > n) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
  }
  if (cur) out.push(cur);
  return out;
}

function Multi(p: { x: number; y: number; t: string; n: number; s?: number; c?: string; w?: number; a?: 'start' | 'middle' | 'end'; o?: number; halo?: boolean }) {
  const r = renglones(p.t, p.n); const s = p.s ?? 26; const lh = s * 1.2;
  return <>{r.map((l, i) => <T key={i} x={p.x} y={p.y + (i - (r.length - 1) / 2) * lh} s={s} c={p.c} w={p.w} a={p.a} o={p.o} halo={p.halo}>{l}</T>)}</>;
}

/** Pastilla con el nombre del fármaco. */
function Pastilla({ x, y, n, a, o = 1, s = 30 }: { x: number; y: number; n: string; a: Accion; o?: number; s?: number }) {
  const w = Math.max(84, n.length * s * 0.56 + 34); const h = s * 1.75;
  return (
    <g opacity={o} transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={color(a)} />
      <T x={0} y={1} c="var(--sobre-marcador)" s={s} w={700}>{n}</T>
    </g>
  );
}

// ---------- Sinapsis ----------

function bloquea(a: Accion) { return a === 'antagonista' || a === 'bloqueante' || a === 'inhibidor'; }

function Sinapsis({ e, i, t }: { e: EscenaSinapsis; i: number; t: number }) {
  const p = e.pasos[i];
  const rs = e.receptores;
  const rx = (k: number) => (rs.length === 1 ? 480 : 300 + (k * 360) / (rs.length - 1));
  const postY = 412;
  const drogas = p.drogas ?? [];
  const blancos: Record<string, [number, number]> = { t: [776, 214], e: e.enzima?.en === 'terminal' ? [640, 96] : [150, 320], v: [420, 150], ar: [190, 214], lib: [480, 262] };
  rs.forEach((_, k) => { blancos['r' + k] = [rx(k), postY - 36]; });
  const bloqueado = (en: string) => drogas.some(d => d.en === en && bloquea(d.a));
  const agonizado = (en: string) => drogas.some(d => d.en === en && !bloquea(d.a));

  const nivel = p.nivel ?? (p.liberar ? 0.6 : 0);
  const n = Math.round(nivel * 34);
  const salida = (bloqueado('t') ? 0 : e.transportador ? 1 : 0);
  const part = Array.from({ length: n }, (_, k) => {
    const v = 0.16 + azar(k, 1) * 0.12;
    const u = fr(t * v + azar(k, 2));
    const d = azar(k, 3);
    const obj = k % (rs.length + (salida && p.limpia ? 1 : 0));
    const fin = obj < rs.length ? [rx(obj), postY - 18] : [776, 226];
    const x0 = 480 + (d - 0.5) * 34;
    const x = x0 + (fin[0] - x0) * suave(u) + Math.sin(u * 9 + d * 7) * 16;
    const y = 262 + (fin[1] - 262) * u;
    return { x, y, o: u > 0.94 ? (1 - u) * 16 : 1 };
  });

  return (
    <g>
      {/* neurona presináptica */}
      <path d="M300 -10 C300 60 170 80 170 170 C170 250 300 262 480 262 C660 262 790 250 790 170 C790 80 660 60 660 -10 Z"
        fill="var(--celula)" stroke={tinta} strokeWidth={4} strokeLinejoin="round" />
      <T x={480} y={28} s={29} c={tenue}>{e.precursor ? `${e.precursor} se convierte en ${e.nt}` : `Terminal que libera ${e.nt}`}</T>
      {/* vesículas */}
      {[[300, 130], [395, 90], [420, 180], [530, 110], [560, 190], [640, 150]].map(([x, y], k) => {
        const baja = p.liberar && k === 3 ? 0 : 0;
        return (
          <g key={k} transform={`translate(${x} ${y + baja})`}>
            <circle r={32} fill={fondo} stroke={tinta} strokeWidth={3.5} />
            {[0, 1, 2, 3, 4].map(j => <circle key={j} cx={Math.cos(j * 1.3) * 15} cy={Math.sin(j * 1.3) * 15} r={6.5} fill="var(--nt)" />)}
          </g>
        );
      })}
      {p.liberar && <g>
        <path d="M444 262 Q480 300 516 262" fill={fondo} stroke={tinta} strokeWidth={3.5} />
        {[0, 1, 2].map(k => <circle key={k} cx={480 + (k - 1) * 14} cy={274} r={6} fill="var(--nt)" />)}
      </g>}

      {/* transportador */}
      {e.transportador && <g transform="translate(776 214) rotate(-52)">
        <rect x={-24} y={-20} width={48} height={40} rx={10} fill={tinte('inhibidor')} stroke={color('inhibidor')} strokeWidth={4} />
        <rect x={-6} y={-20} width={12} height={40} fill={bloqueado('t') ? color('antagonista') : fondo} opacity={0.75} />
      </g>}
      {e.transportador && <T x={862} y={274} s={30} c={color('inhibidor')} w={700}>{e.transportador}</T>}

      {/* autorreceptor */}
      {e.autor && <g transform="translate(190 214) rotate(52)">
        <rect x={-22} y={-18} width={44} height={36} rx={10} fill={tinte('agonista')} stroke={color('agonista')} strokeWidth={4} />
      </g>}
      {e.autor && <T x={92} y={274} s={30} c={color('agonista')} w={700}>{e.autor}</T>}

      {/* enzima */}
      {e.enzima && (() => {
        const [x, y] = blancos.e;
        const b = bloqueado('e');
        const ab = b ? 0.04 : 0.32 + Math.sin(t * 5) * 0.18;
        return <g transform={`translate(${x} ${y})`}>
          <path d={`M0 0 L${44 * Math.cos(ab)} ${-44 * Math.sin(ab)} A44 44 0 1 0 ${44 * Math.cos(ab)} ${44 * Math.sin(ab)} Z`} fill={tinte('inhibidor')} stroke={color('inhibidor')} strokeWidth={4} strokeLinejoin="round" />
          <T x={-6} y={0} s={26} c={color('inhibidor')} w={800}>{e.enzima!.n}</T>
        </g>;
      })()}

      {/* neurona postsináptica */}
      <path d="M-10 412 C160 400 800 400 970 412 L970 610 L-10 610 Z" fill="var(--celula)" stroke={tinta} strokeWidth={4} />
      {rs.map((r, k) => {
        const on = (p.activos?.includes(k) || agonizado('r' + k)) && !bloqueado('r' + k);
        const x = rx(k); const pulso = on ? 0.6 + Math.sin(t * 7) * 0.4 : 0;
        return (
          <g key={k}>
            {on && <circle cx={x} cy={postY} r={48 + pulso * 10} fill={color('agonista')} opacity={0.16} />}
            {r.k === 'c'
              ? <g><rect x={x - 26} y={postY - 34} width={18} height={68} rx={7} fill={on ? color('agonista') : 'var(--receptor)'} stroke={tinta} strokeWidth={3} />
                <rect x={x + 8} y={postY - 34} width={18} height={68} rx={7} fill={on ? color('agonista') : 'var(--receptor)'} stroke={tinta} strokeWidth={3} /></g>
              : <path d={`M${x - 30} ${postY + 30} q0 -60 10 -60 q10 0 10 60 q0 -60 10 -60 q10 0 10 60 q0 -60 10 -60 q10 0 10 60`} fill="none" stroke={on ? color('agonista') : tinta} strokeWidth={6} strokeLinecap="round" />}
            <T x={x} y={postY + 66} s={33} w={800} c={on ? color('agonista') : tinta}>{r.n}</T>
            {on && [0, 1, 2].map(j => <circle key={j} cx={x} cy={postY + 88 + fr(t * 0.9 + j / 3) * 30} r={5} fill={color('agonista')} opacity={1 - fr(t * 0.9 + j / 3)} />)}
          </g>
        );
      })}

      {/* neurotransmisor */}
      {part.map((q, k) => <circle key={k} cx={q.x} cy={q.y} r={7.5} fill="var(--nt)" opacity={q.o} />)}

      {/* fármacos */}
      {drogas.map((d, k) => {
        const [x, y] = blancos[d.en] ?? [480, 330];
        const llega = ap(t, 0.1 + k * 0.25, 0.9);
        const izq = d.en === 'ar' || d.en === 'e';
        const x0 = izq ? -120 : 1080; const y0 = y + (k % 2 ? 40 : -30);
        const cx = x0 + (x - x0) * llega; const cy = y0 + (y - y0) * llega;
        const offY = d.en.startsWith('r') ? -54 : d.en === 't' ? 34 : d.en === 'e' ? -62 : d.en === 'ar' ? 34 : -52;
        const yy = Math.max(26, cy + offY);
        return <g key={d.n + d.en}>
          {bloquea(d.a) && llega > 0.95 && <g transform={`translate(${x} ${y})`} opacity={ap(t, 0.95 + k * 0.25, 0.3)}>
            <path d="M-26 -26 L26 26 M26 -26 L-26 26" stroke={color('antagonista')} strokeWidth={9} strokeLinecap="round" />
          </g>}
          <Pastilla x={Math.min(880, Math.max(100, cx))} y={yy} n={d.n} a={d.a} />
        </g>;
      })}

      {p.efecto && <g opacity={ap(t, 1.1, 0.6)}>
        <T x={480} y={560} s={36} w={800} c={p.tono === 'menos' ? color('antagonista') : p.tono === 'mas' ? color('agonista') : tinta} halo>{p.efecto}</T>
      </g>}
    </g>
  );
}

// ---------- Ruta metabólica ----------

function Ruta({ e, i, t }: { e: EscenaRuta; i: number; t: number }) {
  const p = e.pasos[i]; const n = e.nodos.length;
  const col = n > 4 ? 2 : 1;
  const porFila = n > 4 ? Math.ceil(n / 2) : n;
  const pos = (k: number): [number, number] => {
    const fila = Math.floor(k / porFila); const c = k % porFila;
    const paso = 860 / Math.max(1, porFila);
    const x = fila % 2 === 0 ? 50 + paso * (c + 0.5) : 910 - paso * (c + 0.5);
    return [x, col === 1 ? 240 : 150 + fila * 230];
  };
  return <g>
    {e.nodos.map((nod, k) => {
      if (k > p.hasta) return null;
      const [x, y] = pos(k); const nuevo = k === p.hasta; const o = nuevo ? ap(t) : 1;
      const luz = p.luz === k;
      const prev = k > 0 ? pos(k - 1) : null;
      const dr = (p.drogas ?? []).filter(d => d.en === k - 1);
      return <g key={k}>
        {prev && <g opacity={o}>
          <line x1={prev[0] + Math.sign(x - prev[0]) * 92} y1={prev[1] + (y === prev[1] ? 0 : 42)} x2={x - Math.sign(x - prev[0]) * 104} y2={y - (y === prev[1] ? 0 : 42)} stroke={tinta} strokeWidth={5} markerEnd="url(#fl)" />
          <Multi x={(x + prev[0]) / 2} y={(y + prev[1]) / 2 + (y === prev[1] ? -34 : 0)} t={e.enzimas[k - 1] ?? ''} n={16} s={22} c={color('inhibidor')} w={700} halo />
          {dr.map((d, j) => <Pastilla key={d.n} x={(x + prev[0]) / 2} y={(y + prev[1]) / 2 + 62 + j * 50} n={d.n} a={d.a} s={22} o={ap(t, 0.3 + j * 0.3)} />)}
        </g>}
        <g opacity={o}>
          <rect x={x - 96} y={y - 42} width={192} height={84} rx={18} fill={luz ? tinte('precursor') : 'var(--celula)'} stroke={luz ? color('precursor') : tinta} strokeWidth={luz ? 6 : 4} />
          <Multi x={x} y={y} t={nod} n={13} s={26} w={700} />
        </g>
      </g>;
    })}
  </g>;
}

// ---------- Cadenas de señal ----------

function Cadenas({ e, i, t }: { e: EscenaCadenas; i: number; t: number }) {
  const p = e.pasos[i]; const n = e.filas.length;
  const altoF = Math.min(170, 560 / n);
  return <g>
    {e.filas.map((f, k) => {
      if (k > p.fila) return null;
      const y = 40 + altoF * (k + 0.5) + (560 - altoF * n) / 2 - 30;
      const c = f.chips.length; const paso = 880 / c;
      const activa = k === p.fila; const o = activa ? ap(t) : 0.55;
      const u = fr(t * 0.45);
      return <g key={k} opacity={o}>
        {f.chips.map((ch, j) => {
          const x = 40 + paso * (j + 0.5);
          return <g key={j}>
            {j < c - 1 && <line x1={x + paso / 2 - 28} y1={y} x2={x + paso / 2 + 2} y2={y} stroke={tinta} strokeWidth={4} markerEnd="url(#fl)" />}
            <rect x={x - paso / 2 + 8} y={y - 44} width={paso - 44} height={88} rx={16} fill={j === 0 ? tinte(f.color) : 'var(--celula)'} stroke={j === 0 ? color(f.color) : tinta} strokeWidth={4} />
            <Multi x={x - 14} y={y} t={ch} n={Math.floor((paso - 50) / 14)} s={25} w={700} />
          </g>;
        })}
        {activa && <circle cx={40 + paso * 0.5 + u * paso * (c - 1) - 14} cy={y - 56} r={9} fill={color(f.color)} />}
        {f.nota && <T x={480} y={y + 62} s={22} c={tenue}>{f.nota}</T>}
      </g>;
    })}
  </g>;
}

// ---------- Órganos ----------

const ORG: Record<Organo, { x: number; y: number; lx: number; ly: number; lado: 'izq' | 'der' }> = {
  cerebro: { x: 480, y: 46, lx: 300, ly: 40, lado: 'izq' },
  ojo: { x: 500, y: 74, lx: 660, ly: 50, lado: 'der' },
  glandula: { x: 480, y: 124, lx: 300, ly: 116, lado: 'izq' },
  bronquio: { x: 456, y: 205, lx: 660, ly: 128, lado: 'der' },
  corazon: { x: 500, y: 232, lx: 300, ly: 208, lado: 'izq' },
  vaso: { x: 410, y: 300, lx: 660, ly: 214, lado: 'der' },
  estomago: { x: 505, y: 300, lx: 300, ly: 300, lado: 'izq' },
  intestino: { x: 480, y: 370, lx: 660, ly: 300, lado: 'der' },
  vejiga: { x: 480, y: 435, lx: 300, ly: 392, lado: 'izq' },
  utero: { x: 480, y: 412, lx: 660, ly: 390, lado: 'der' },
  piel: { x: 370, y: 340, lx: 300, ly: 480, lado: 'izq' },
  musculo: { x: 560, y: 520, lx: 660, ly: 480, lado: 'der' },
};

function Cuerpo() {
  return <g fill="var(--celula)" stroke={tinta} strokeWidth={4} strokeLinejoin="round">
    <circle cx={480} cy={70} r={50} />
    <path d="M452 118 L452 146 C400 152 372 170 362 210 L332 372 C330 384 352 390 356 378 L392 250 L404 330 L398 590 L460 590 L478 400 L482 400 L500 590 L562 590 L556 330 L568 250 L604 378 C608 390 630 384 628 372 L598 210 C588 170 560 152 508 146 L508 118 Z" />
  </g>;
}

function Organos({ e, i, t }: { e: EscenaOrganos; i: number; t: number }) {
  const acu = new Map<Organo, { t: string; c: Accion; nuevo: boolean }>();
  e.pasos.slice(0, i + 1).forEach((p, k) => p.organos.forEach(o => acu.set(o.o, { t: o.t, c: o.c, nuevo: k === i })));
  return <g>
    <Cuerpo />
    {[...acu.entries()].map(([org, v]) => {
      const q = ORG[org]; const o = v.nuevo ? ap(t) : 1;
      const izq = q.lado === 'izq';
      return <g key={org} opacity={o}>
        <line x1={q.x} y1={q.y} x2={q.lx + (izq ? 8 : -8)} y2={q.ly} stroke={color(v.c)} strokeWidth={3.5} />
        <circle cx={q.x} cy={q.y} r={13 + (v.nuevo ? Math.sin(t * 6) * 3 : 0)} fill={color(v.c)} />
        <Multi x={q.lx} y={q.ly} t={v.t} n={22} s={25} w={700} c={color(v.c)} a={izq ? 'end' : 'start'} />
      </g>;
    })}
  </g>;
}

// ---------- Canal iónico ----------

function abierto(modo: string, tt: number): boolean {
  switch (modo) {
    case 'normal': return fr(tt / 2.4) < 0.3;
    case 'frecuencia': return fr(tt / 0.8) < 0.5;
    case 'tiempo': return fr(tt / 2.4) < 0.82;
    default: return false;
  }
}

function Canal({ e, i, t }: { e: EscenaCanal; i: number; t: number }) {
  const p = e.pasos[i]; const open = abierto(p.modo, t);
  const hueco = open ? 34 : 6;
  const cx = 300; const my = 230;
  const ions = Array.from({ length: 10 }, (_, k) => {
    const u = fr(t * 0.42 + k / 10);
    const fuera = !open && u > 0.45;
    return { x: cx + Math.sin(k * 2.3 + u * 6) * (u < 0.4 ? 54 : 8), y: fuera ? 100 + k * 3 : 70 + u * 330, o: fuera ? 0.25 : 1 };
  });
  // Trazado de aperturas a lo largo del tiempo.
  const puntos: string[] = [];
  for (let k = 0; k <= 200; k++) {
    const tt = t - (200 - k) * 0.03;
    const on = tt >= 0 && abierto(p.modo, tt);
    puntos.push(`${560 + k * 1.8},${on ? 440 : 500}`);
  }
  return <g>
    <rect x={0} y={my - 40} width={600} height={80} fill={tinte('modulador')} />
    <path d={`M0 ${my - 40} H${cx - 92} M${cx + 92} ${my - 40} H600 M0 ${my + 40} H${cx - 92} M${cx + 92} ${my + 40} H600`} stroke={tinta} strokeWidth={4} />
    <rect x={cx - 92} y={my - 92} width={92 - hueco} height={184} rx={26} fill="var(--receptor)" stroke={tinta} strokeWidth={4} />
    <rect x={cx + hueco} y={my - 92} width={92 - hueco} height={184} rx={26} fill="var(--receptor)" stroke={tinta} strokeWidth={4} />
    <T x={80} y={92} s={25} c={tenue} a="start">Afuera</T>
    <T x={80} y={374} s={25} c={tenue} a="start">Adentro</T>
    {ions.map((q, k) => <g key={k} opacity={q.o}><circle cx={q.x} cy={q.y} r={15} fill={color('modulador')} /></g>)}
    <T x={500} y={92} s={28} w={800} c={color('modulador')}>{e.ion}</T>
    {(p.ligandos ?? []).map((l, k) => <Pastilla key={l.n} x={k === 0 ? 118 : 118} y={166 + k * 62 - (p.ligandos!.length - 1) * 30} n={l.n} a={l.a} o={ap(t, 0.1 + k * 0.2)} s={24} />)}
    {p.modo === 'bloqueado' && <path d={`M${cx - 30} ${my - 30} L${cx + 30} ${my + 30} M${cx + 30} ${my - 30} L${cx - 30} ${my + 30}`} stroke={color('antagonista')} strokeWidth={10} strokeLinecap="round" />}
    <T x={740} y={400} s={24} c={tenue}>Aperturas del canal</T>
    <polyline points={puntos.join(' ')} fill="none" stroke={color('modulador')} strokeWidth={5} strokeLinejoin="round" />
    <line x1={560} y1={516} x2={920} y2={516} stroke={linea} strokeWidth={3} />
    {p.texto && <Multi x={740} y={210} t={p.texto} n={24} s={30} w={800} c={tinta} o={ap(t, 0.2)} />}
  </g>;
}

// ---------- Escalera de dosis ----------

function Escalera({ e, i, t }: { e: EscenaEscalera; i: number; t: number }) {
  const p = e.pasos[i]; const n = e.zonas.length;
  const ancho = 880 / n;
  return <g>
    <T x={480} y={32} s={24} c={tenue}>{e.eje}</T>
    {e.zonas.map((z, k) => {
      const x = 40 + k * ancho; const h = 150 + k * 90; const y = 540 - h;
      const luz = k === p.zona; const visto = k <= p.zona;
      return <g key={k} opacity={visto ? (luz ? ap(t) : 0.45) : 0.12}>
        <rect x={x + 8} y={y} width={ancho - 16} height={h} rx={14} fill={luz ? tinte(z.c) : 'var(--celula)'} stroke={luz ? color(z.c) : tinta} strokeWidth={luz ? 6 : 3} />
        <T x={x + ancho / 2} y={y + 36} s={28} w={800}>{z.t}</T>
        <T x={x + ancho / 2} y={y + 80} s={32} w={800} c={color(z.c)}>{z.r}</T>
        <Multi x={x + ancho / 2} y={y + 80 + Math.max(70, (h - 80) / 2)} t={z.e} n={Math.floor(ancho / 14.5)} s={24} w={600} />
      </g>;
    })}
    <line x1={40} y1={566} x2={916} y2={566} stroke={tinta} strokeWidth={5} markerEnd="url(#fl)" />
  </g>;
}

// ---------- Pizarra: corchete, lista y efecto ----------

function Pizarra({ e, i, t }: { e: EscenaPizarra; i: number; t: number }) {
  const p = e.pasos[i]; const vis = e.lineas.slice(0, p.hasta + 1);
  const pag = Math.max(0, vis.length - 3); const mostrar = vis.slice(pag);
  const alturas = mostrar.map(l => Math.max(2, Math.ceil(l.lista.length / (l.lista.length > 4 ? 2 : 1))) * 54 + 34);
  let y = Math.max(16, (600 - alturas.reduce((a, b) => a + b, 0)) / 2);
  return <g>
    {mostrar.map((l, k) => {
      const nuevo = k === mostrar.length - 1 && pag + k === p.hasta; const h = alturas[k]; const y0 = y; y += h;
      const dosCol = l.lista.length > 4;
      const filas = dosCol ? Math.ceil(l.lista.length / 2) : l.lista.length;
      const alto = filas * 50;
      const ini = y0 + (h - alto) / 2;
      return <g key={l.resultado + k} opacity={nuevo ? 1 : 0.8}>
        {l.lista.map((nom, j) => {
          const col = dosCol ? j % 2 : 0; const fil = dosCol ? Math.floor(j / 2) : j;
          return <T key={nom} x={46 + col * 220} y={ini + 25 + fil * 50} a="start" s={35} w={700} c={color(l.a)} o={nuevo ? ap(t, 0.1 + j * 0.28, 0.35) : 1}>{nom}</T>;
        })}
        <path d={`M${dosCol ? 500 : 366} ${ini + 4} h16 v${alto - 8} h-16`} fill="none" stroke={color(l.a)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"
          opacity={nuevo ? ap(t, 0.1 + l.lista.length * 0.28, 0.3) : 1} />
        <Multi x={dosCol ? 542 : 412} y={ini + alto / 2} t={l.resultado} n={dosCol ? 22 : 28} s={30} w={700} a="start" o={nuevo ? ap(t, 0.3 + l.lista.length * 0.28, 0.4) : 1} />
      </g>;
    })}
  </g>;
}

// ---------- Flujo genérico ----------

function Flujo({ e, i, t }: { e: EscenaFlujo; i: number; t: number }) {
  const p = e.pasos[i]; const vistos = new Set(e.pasos.slice(0, i + 1).flatMap(q => q.ver));
  const nuevos = new Set(p.ver);
  const nodo = (id: string) => e.nodos.find(n => n.id === id)!;
  const op = (id: string) => nuevos.has(id) ? ap(t) : 1;
  return <g>
    {e.lazos.filter(l => vistos.has(l.a) && vistos.has(l.b)).map(l => {
      const a = nodo(l.a), b = nodo(l.b);
      const dx = b.x - a.x, dy = b.y - a.y; const d = Math.hypot(dx, dy) || 1;
      const wa = (a.w ?? 180) / 2 + 8, wb = (b.w ?? 180) / 2 + 12;
      const ra = Math.min(wa / Math.max(Math.abs(dx) / d, 0.01), 50 / Math.max(Math.abs(dy) / d, 0.01));
      const rb = Math.min(wb / Math.max(Math.abs(dx) / d, 0.01), 52 / Math.max(Math.abs(dy) / d, 0.01));
      const x1 = a.x + dx / d * ra, y1 = a.y + dy / d * ra, x2 = b.x - dx / d * rb, y2 = b.y - dy / d * rb;
      const c = l.inhibe ? color('antagonista') : tinta;
      return <g key={l.a + l.b} opacity={Math.min(op(l.a), op(l.b))}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={4.5} strokeDasharray={l.inhibe ? '12 9' : undefined} markerEnd={l.inhibe ? 'url(#fr)' : 'url(#fl)'} />
        {l.t && <Multi x={(x1 + x2) / 2} y={(y1 + y2) / 2} t={l.t} n={18} s={21} c={l.inhibe ? color('antagonista') : tenue} w={700} halo />}
      </g>;
    })}
    {e.nodos.filter(n => vistos.has(n.id)).map(n => {
      const w = n.w ?? 180; const luz = p.luz?.includes(n.id);
      return <g key={n.id} opacity={op(n.id)}>
        <rect x={n.x - w / 2} y={n.y - 44} width={w} height={88} rx={16} fill={n.a ? tinte(n.a) : 'var(--celula)'} stroke={n.a ? color(n.a) : tinta} strokeWidth={luz ? 7 : 4} />
        <Multi x={n.x} y={n.y} t={n.t} n={Math.floor(w / 13.2)} s={24} w={700} />
      </g>;
    })}
  </g>;
}

// ---------- Curvas ----------

function Curvas({ e, i, t }: { e: EscenaCurvas; i: number; t: number }) {
  const p = e.pasos[i];
  const x0 = 90, y0 = 530, ww = 790, hh = 470;
  const puntos = (s: EscenaCurvas['series'][number]) => {
    const out: string[] = [];
    for (let k = 0; k <= 200; k++) {
      const u = k / 200; let v: number;
      if (s.f === 'hill') {
        const h = s.pend ?? 7;
        const a = (s.emax ?? 1) * Math.pow(u, h); v = a / (Math.pow(s.ec50 ?? 0.4, h) + Math.pow(u, h));
      } else {
        const ka = 16, ke = 2.8; v = 1.55 * (ka / (ka - ke)) * (Math.exp(-ke * u) - Math.exp(-ka * u));
      }
      out.push(`${x0 + u * ww},${y0 - v * hh * 0.92}`);
    }
    return out;
  };
  return <g>
    <line x1={x0} y1={y0} x2={x0 + ww + 16} y2={y0} stroke={tinta} strokeWidth={5} markerEnd="url(#fl)" />
    <line x1={x0} y1={y0} x2={x0} y2={y0 - hh - 26} stroke={tinta} strokeWidth={5} markerEnd="url(#fl)" />
    <T x={x0 + ww / 2} y={572} s={26}>{e.ejes[0]}</T>
    <g transform={`rotate(-90 36 ${y0 - hh / 2})`}><T x={36} y={y0 - hh / 2} s={26}>{e.ejes[1]}</T></g>
    {p.ver.map(k => {
      const s = e.series[k]; const pts = puntos(s);
      const nuevo = !i || !e.pasos[i - 1].ver.includes(k);
      const lim = nuevo ? Math.round(ap(t, 0, 1.4) * 200) : 200;
      const fin = pts[Math.max(1, Math.min(lim, s.f === 'ct' ? 92 : 200))].split(',').map(Number);
      return <g key={k}>
        <polyline points={pts.slice(0, lim + 1).join(' ')} fill="none" stroke={color(s.c)} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        <T x={Math.min(fin[0], 820)} y={fin[1] - 26 - k * 2} s={26} w={800} c={color(s.c)} a="end" halo o={nuevo ? ap(t, 1) : 1}>{s.n}</T>
      </g>;
    })}
  </g>;
}

// ---------- Ciclo celular ----------

function arco(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
  return `M${p(a0)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)}`;
}

const FASES: { f: 'G1' | 'S' | 'G2' | 'M'; ini: number; fin: number; n: string }[] = [
  { f: 'G1', ini: -1.5, fin: 0.9, n: 'G1 Crecimiento' },
  { f: 'S', ini: 0.95, fin: 3.0, n: 'S Síntesis de ADN' },
  { f: 'G2', ini: 3.05, fin: 3.95, n: 'G2 Revisión' },
  { f: 'M', ini: 4.0, fin: 4.7, n: 'M Mitosis' },
];

function Ciclo({ e, i, t }: { e: EscenaCiclo; i: number; t: number }) {
  const p = e.pasos[i]; const cx = 300, cy = 300, r = 200;
  return <g>
    {FASES.map(f => {
      const luz = p.fase === f.f || p.todas;
      const m = (f.ini + f.fin) / 2;
      return <g key={f.f}>
        <path d={arco(cx, cy, r, f.ini, f.fin)} fill="none" stroke={luz ? color('citotoxico') : 'var(--receptor)'} strokeWidth={luz ? 52 : 40} strokeLinecap="butt" />
        <T x={cx + r * Math.cos(m)} y={cy + r * Math.sin(m)} s={30} w={800} c={luz ? 'var(--sobre-marcador)' : tinta}>{f.f}</T>
      </g>;
    })}
    <circle cx={cx + r * Math.cos(t * 0.5)} cy={cy + r * Math.sin(t * 0.5)} r={0} />
    <T x={cx} y={cy - 16} s={26} w={800}>{p.todas ? 'Todas las fases' : p.fase ?? 'Ciclo celular'}</T>
    {p.fase && <T x={cx} y={cy + 20} s={22} c={tenue}>{FASES.find(f => f.f === p.fase)?.n.split(' ').slice(1).join(' ') ?? 'Reposo'}</T>}
    {(p.drogas ?? []).map((d, k) => <Pastilla key={d} x={730} y={300 + (k - ((p.drogas!.length - 1) / 2)) * 72} n={d} a="citotoxico" o={ap(t, 0.2 + k * 0.25)} s={26} />)}
  </g>;
}

// ---------- Anticuerpo ----------

function Anticuerpo({ e, i, t }: { e: EscenaAnticuerpo; i: number; t: number }) {
  const p = e.pasos[i]; const cx = 260;
  const fab = p.luz === 'fab' || p.luz === 'todo'; const fc = p.luz === 'fc' || p.luz === 'todo';
  const hum = p.humano;
  const brazo = (s: number) => `M${cx + s * 16} 300 L${cx + s * 150} 90`;
  return <g>
    <path d={brazo(-1)} stroke={fab ? color('anticuerpo') : 'var(--receptor)'} strokeWidth={46} strokeLinecap="round" fill="none" />
    <path d={brazo(1)} stroke={fab ? color('anticuerpo') : 'var(--receptor)'} strokeWidth={46} strokeLinecap="round" fill="none" />
    <path d={`M${cx} 310 V520`} stroke={fc ? color('agonista') : 'var(--receptor)'} strokeWidth={54} strokeLinecap="round" fill="none" />
    <T x={cx - 196} y={156} s={28} w={800} c={color('anticuerpo')}>Fab</T>
    <T x={cx + 76} y={470} s={28} w={800} c={color('agonista')}>Fc</T>
    {fab && <g opacity={ap(t, 0.3)}><circle cx={cx - 164} cy={64} r={22} fill={color('antagonista')} /><circle cx={cx + 164} cy={64} r={22} fill={color('antagonista')} /></g>}
    {hum !== undefined && <T x={cx} y={570} s={28} w={800}>{`${hum}% humano`}</T>}
    {(p.partes ?? []).map((q, k) => {
      const x = 590; const y = 150 + k * 92; const o = ap(t, 0.15 + k * 0.4, 0.4);
      return <g key={k} opacity={o}>
        <T x={x} y={y} s={46} w={800} c={color('anticuerpo')} a="end">{q.t}</T>
        <T x={x + 22} y={y} s={28} w={600} a="start">{q.n}</T>
      </g>;
    })}
  </g>;
}

// ---------- Vías cerebrales ----------

function Vias({ e, i, t }: { e: EscenaVias; i: number; t: number }) {
  const p = e.pasos[i];
  return <g>
    <path d="M170 330 C120 200 250 60 460 60 C660 60 800 170 800 300 C800 370 750 400 690 400 C650 400 640 440 590 440 C540 440 520 410 470 420 C440 430 440 520 400 560 L350 556 C372 500 372 450 350 420 C280 420 200 400 170 330 Z"
      fill="var(--celula)" stroke={tinta} strokeWidth={4} strokeLinejoin="round" />
    {e.vias.map(v => {
      const luz = p.luz.includes(v.id);
      return <g key={v.id}>
        <path d={v.d} fill="none" stroke={luz ? color(v.a) : 'var(--receptor)'} strokeWidth={luz ? 9 : 5} strokeLinecap="round" strokeDasharray={luz ? '20 13' : undefined} strokeDashoffset={luz ? -t * 40 : 0} />
      </g>;
    })}
    {(p.tag ?? []).map((q, k) => {
      const v = e.vias.find(x => x.id === q.id);
      return <g key={q.id} opacity={ap(t, 0.2 + k * 0.3)}>
        <T x={938} y={70 + k * 112} s={27} w={800} c={color(v?.a)} a="end">{v?.n}</T>
        <Multi x={938} y={112 + k * 112} t={q.t} n={26} s={23} w={600} a="end" />
      </g>;
    })}
  </g>;
}

// ---------- Selector ----------

export function Dibujo({ e, i, t }: { e: Escena; i: number; t: number }) {
  switch (e.tipo) {
    case 'sinapsis': return <Sinapsis e={e} i={i} t={t} />;
    case 'ruta': return <Ruta e={e} i={i} t={t} />;
    case 'cadenas': return <Cadenas e={e} i={i} t={t} />;
    case 'organos': return <Organos e={e} i={i} t={t} />;
    case 'canal': return <Canal e={e} i={i} t={t} />;
    case 'escalera': return <Escalera e={e} i={i} t={t} />;
    case 'pizarra': return <Pizarra e={e} i={i} t={t} />;
    case 'flujo': return <Flujo e={e} i={i} t={t} />;
    case 'curvas': return <Curvas e={e} i={i} t={t} />;
    case 'ciclo': return <Ciclo e={e} i={i} t={t} />;
    case 'anticuerpo': return <Anticuerpo e={e} i={i} t={t} />;
    case 'vias': return <Vias e={e} i={i} t={t} />;
  }
}

export function Lienzo({ e, i, t, titulo }: { e: Escena; i: number; t: number; titulo?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={titulo ?? e.titulo} style={{ display: 'block', width: '100%', height: 'auto' }}>
      <defs>
        <marker id="fl" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={tinta} />
        </marker>
        <marker id="fr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="var(--m-ant)" />
        </marker>
      </defs>
      <Dibujo e={e} i={i} t={t} />
    </svg>
  );
}
