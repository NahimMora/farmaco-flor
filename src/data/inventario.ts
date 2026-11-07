// Inventario real de lo que hay en las fuentes. Los porcentajes de cobertura salen de acá, no de estimaciones.
import { DESARROLLOS, FARMACOS, PREGUNTAS } from './index';
import { CUADROS } from './cuadros';
import { PIZARRA } from './pizarra';
import { coincide } from '../lib/ejercicios';

export const PREGUNTERO = Array.from({ length: 86 }, (_, i) => `PRE ${i + 1}`);
export const ERA1 = Array.from({ length: 20 }, (_, i) => `ERA ${i + 1}`);
export const EXAMEN = [...Array.from({ length: 38 }, (_, i) => `EXA ${i + 1}`), ...Array.from({ length: 7 }, (_, i) => `EXA Y${i + 1}`)];
export const DESARROLLAR = Array.from({ length: 30 }, (_, i) => `DES ${i + 1}`);

export function citas(): Set<string> {
  const s = new Set<string>();
  const add = (loc?: string) => loc?.split(',').forEach(x => s.add(x.trim().replace(/^DES c/, 'DES ')));
  PREGUNTAS.forEach(p => add(p.fuente?.loc));
  DESARROLLOS.forEach(d => add(d.fuente?.loc));
  CUADROS.forEach(c => add(c.fuente.loc));
  return s;
}

export function cobertura() {
  const c = citas();
  const tasa = (t: string, lista: string[]) => ({ t, total: lista.length, hay: lista.filter(x => c.has(x)).length });
  return [
    { t: 'Nombres de la pizarra', total: PIZARRA.length, hay: PIZARRA.filter(n => FARMACOS.some(f => coincide(n, f))).length },
    tasa('Preguntero', PREGUNTERO), tasa('Preguntero ERA 1', ERA1), tasa('Examen a desarrollar', EXAMEN), tasa('Fármaco a desarrollar ERA 2', DESARROLLAR),
  ];
}
