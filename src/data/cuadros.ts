// Cuadros reales de examen. Las filas apuntan a la farmacoteca para no duplicar respuestas.
import { DESARROLLOS, ficha } from './index';
import { CUADROS_BASE } from './examen';

/** Filas que los exámenes piden y no son un fármaco individual. */
export const FILAS_EXTRA: Record<string, { nombre: string; mecanismo: string; efecto: string }> = {
  'dopamina-baja': { nombre: 'Dopamina en dosis baja', mecanismo: 'Actúa sobre receptores D1 y D2', efecto: 'Vasodilatación, aumenta la diuresis, hipotensión y bradicardia' },
};

export const CUADROS = CUADROS_BASE;

export interface FilaVista { nombre: string; mecanismo: string; efecto: string; inversa: boolean; dado?: string }

export function filaCuadro(fila: (typeof CUADROS)[number]['filas'][number]): FilaVista {
  if (typeof fila !== 'string') return { nombre: fila.nombre, mecanismo: '', efecto: '', inversa: true, dado: fila.texto };
  const e = FILAS_EXTRA[fila];
  if (e) return { ...e, inversa: false };
  const f = ficha(fila);
  if (!f) throw new Error(`Fila de cuadro sin ficha: ${fila}`);
  return { nombre: f.nombre, mecanismo: f.mecanismo, efecto: f.efecto, inversa: false };
}

/** Cuántas veces aparece cada fármaco en cuadros y desarrollos reales. El repaso prioriza con esto. */
export function frecuencias(): Map<string, number> {
  const m = new Map<string, number>();
  const suma = (id: string) => m.set(id, (m.get(id) ?? 0) + 1);
  CUADROS.forEach(c => c.filas.forEach(f => { if (typeof f === 'string') suma(f); }));
  DESARROLLOS.forEach(d => d.farmacos?.forEach(suma));
  return m;
}
