import { useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Accion, Farmaco, Fuente } from '../data/tipos';
import { color } from '../vis/Vis';

export const estiloAccion = (a?: Accion): CSSProperties => ({ '--c': color(a) } as CSSProperties);

const SIGNO: Partial<Record<Accion, string>> = { agonista: '⊕', antagonista: '⊖', bloqueante: '⊖', inhibidor: '⊖' };
export const signo = (a: Accion) => SIGNO[a] ?? '';

export function Cinta({ tapada, children, onVer }: { tapada: boolean; children: ReactNode; onVer?: () => void }) {
  const [visto, setVisto] = useState(false);
  const oculta = tapada && !visto;
  return (
    <button type="button" className={'cinta' + (oculta ? ' tapada' : '')} aria-label={oculta ? 'Mostrar respuesta' : undefined}
      onClick={() => { if (oculta) { setVisto(true); onVer?.(); } else if (tapada) setVisto(false); }}>
      {children}
    </button>
  );
}

const SIGLAS: Record<string, string> = { PRE: 'Preguntero', ERA: 'Preguntero ERA 1', EXA: 'Examen a desarrollar', DES: 'Fármaco a desarrollar ERA 2' };

export function Origen({ real, fuente, estado }: { real: boolean; fuente?: Fuente; estado?: string }) {
  const loc = fuente?.loc.split(',').map(s => s.trim().replace(/^(\w+) (c?)(Y?\d+)$/, (_, a, c, b) => `${SIGLAS[a] ?? a}, ${c ? 'cuadro' : 'pregunta'} ${b}`)).join('. ');
  return (
    <div className="fila chico" style={{ marginBottom: 8, gap: 6 }}>
      <span className={'etiqueta' + (real ? ' real' : '')}>{real ? 'Pregunta real' : 'Práctica'}</span>
      {estado === 'dudosa' && <span className="etiqueta dudosa">Clave discutible</span>}
      {estado === 'corregida' && <span className="etiqueta corregida">Corregida</span>}
      {loc && <span className="tenue">{loc}</span>}
    </div>
  );
}

export function EnlaceFarmaco({ f }: { f: Farmaco }) {
  return <Link className="chip" style={estiloAccion(f.accion)} to={`/f/${f.id}`}>{f.nombre}</Link>;
}

export function Barra({ valor, total }: { valor: number; total: number }) {
  return <div className="barra" role="progressbar" aria-valuenow={valor} aria-valuemax={total}><i style={{ width: `${total ? (valor / total) * 100 : 0}%` }} /></div>;
}
