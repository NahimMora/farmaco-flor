// Diagramas ya resueltos para las preguntas que piden dibujar.
import type { Diagrama } from '../data/tipos';
import type { EscenaCurvas } from '../vis/tipos';
import { Lienzo } from '../vis/Vis';

const ESC: Record<Diagrama, EscenaCurvas> = {
  'curva-ct': { tipo: 'curvas', id: 'ct', titulo: 'Curva concentración tiempo', ejes: ['Tiempo', 'Concentración'], series: [{ n: 'Cmáx', c: 'precursor', f: 'ct' }], pasos: [{ di: '', ver: [0] }] },
  'dr-competitivo': { tipo: 'curvas', id: 'c', titulo: 'Antagonista competitivo', ejes: ['Log dosis', 'Efecto'], series: [{ n: 'Agonista solo', c: 'agonista', f: 'hill', ec50: 0.34 }, { n: 'Con antagonista', c: 'antagonista', f: 'hill', ec50: 0.6 }], pasos: [{ di: '', ver: [0, 1] }] },
  'dr-irreversible': { tipo: 'curvas', id: 'i', titulo: 'Antagonista irreversible', ejes: ['Log dosis', 'Efecto'], series: [{ n: 'Agonista solo', c: 'agonista', f: 'hill', ec50: 0.34 }, { n: 'Con antagonista', c: 'antagonista', f: 'hill', ec50: 0.42, emax: 0.55 }], pasos: [{ di: '', ver: [0, 1] }] },
  'dr-potenciacion': { tipo: 'curvas', id: 'p', titulo: 'Sinergismo de potenciación', ejes: ['Log dosis', 'Efecto'], series: [{ n: 'Droga sola', c: 'precursor', f: 'hill', ec50: 0.5, emax: 0.62 }, { n: 'Combinadas', c: 'agonista', f: 'hill', ec50: 0.3 }], pasos: [{ di: '', ver: [0, 1] }] },
};

export function DiagramaCurva({ id }: { id: Diagrama }) {
  return <div className="lienzo" style={{ margin: '10px 0' }}><Lienzo e={ESC[id]} i={0} t={5} /></div>;
}
