// Recorrido paso a paso de los diagramas. Es la versión sin video de cada explicación.
import { useEffect, useRef, useState } from 'react';
import type { Escena } from '../vis/tipos';
import { Lienzo } from '../vis/Vis';

function useTiempo(clave: string) {
  const [t, setT] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto) { setT(4); return; }
    const ini = performance.now();
    const tic = (a: number) => { setT((a - ini) / 1000); raf.current = requestAnimationFrame(tic); };
    raf.current = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf.current);
  }, [clave]);
  return t;
}

export function Teoria({ escenas, onFin }: { escenas: Escena[]; onFin?: () => void }) {
  const [ei, setEi] = useState(0);
  const [pi, setPi] = useState(0);
  const e = escenas[ei];
  const p = e.pasos[pi];
  const t = useTiempo(`${ei}-${pi}`);
  const primero = ei === 0 && pi === 0;
  const ultimo = ei === escenas.length - 1 && pi === e.pasos.length - 1;
  const avanzar = () => {
    if (pi + 1 < e.pasos.length) setPi(pi + 1);
    else if (ei + 1 < escenas.length) { setEi(ei + 1); setPi(0); }
    else onFin?.();
  };
  const atras = () => {
    if (pi > 0) setPi(pi - 1);
    else if (ei > 0) { setEi(ei - 1); setPi(escenas[ei - 1].pasos.length - 1); }
  };
  return (
    <div>
      <div className="segmento" aria-label="Temas" style={{ marginBottom: 10 }}>
        {escenas.map((x, i) => <button key={x.id} type="button" aria-pressed={i === ei} onClick={() => { setEi(i); setPi(0); }}>{x.titulo}</button>)}
      </div>
      <div className="lienzo"><Lienzo e={e} i={pi} t={t} /></div>
      <div className="puntos" aria-hidden>{e.pasos.map((_, i) => <i key={i} className={i <= pi ? 'ya' : ''} />)}</div>
      <p className="narracion" aria-live="polite">{p.di}</p>
      <div className="dos">
        <button type="button" className="boton sec" disabled={primero} onClick={atras}>Anterior</button>
        <button type="button" className="boton" onClick={avanzar}>{ultimo ? 'Terminar' : 'Siguiente'}</button>
      </div>
    </div>
  );
}
