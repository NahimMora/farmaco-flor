// Inventario de las fuentes principales. La cobertura se cuenta contra esto, no se estima.
import { DESARROLLOS, FARMACOS, PREGUNTAS } from './index';
import { CUADRO, PIZARRA } from './pizarra';
import { coincide } from '../lib/ejercicios';

export function cobertura() {
  const tiene = (l: string[]) => l.filter(n => FARMACOS.some(f => coincide(n, f))).length;
  return [
    { t: 'Fármacos del cuadro', total: CUADRO.length, hay: tiene(CUADRO) },
    { t: 'Nombres de la pizarra', total: PIZARRA.length, hay: tiene(PIZARRA) },
    { t: 'Choice del examen de 40', total: 40, hay: PREGUNTAS.filter(p => p.tipo === 'mc').length },
    { t: 'Verdadero o falso de las fotos', total: 17, hay: PREGUNTAS.filter(p => p.tipo === 'vf').length },
    { t: 'Casos de clase', total: 9, hay: DESARROLLOS.filter(d => d.caso).length },
  ];
}
