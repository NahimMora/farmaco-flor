// Repetición espaciada. Regla central: acertar con opciones a la vista solo llega a "reconocido".
// Para avanzar hay que recordar el nombre sin pistas, y para consolidar, hacerlo en días distintos.
import { frecuencias } from '../data/cuadros';
import { actualizar, obtener, type Memoria, type NivelNombre } from './store';

const HORA = 3600e3;
const DIA = 24 * HORA;

export const NIVEL_TEXTO: Record<NivelNombre, string> = {
  nuevo: 'Sin aprender', aprendiendo: 'En aprendizaje', reconocido: 'Reconocido', recordado: 'Recordado sin ayuda', consolidado: 'Consolidado',
};

const hoy = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export const memoriaVacia = (): Memoria => ({ nivel: 'nuevo', reconoce: 0, recuerda: 0, errores: 0, dias: [], intervalo: 0, proximo: 0, ultimo: 0, confusiones: {}, erroresAccion: 0 });

export function esConfusion(m?: Memoria) {
  if (!m) return false;
  return m.erroresAccion >= 2 || Object.values(m.confusiones).some(n => n >= 2);
}

export type Resultado =
  | { modo: 'reconocer'; ok: boolean; confundidoCon?: string; deAccion?: boolean }
  | { modo: 'recordar'; nota: 'bien' | 'casi' | 'mal' };

export function calcular(prev: Memoria, r: Resultado, ahora: number): Memoria {
  const m: Memoria = { ...prev, confusiones: { ...prev.confusiones }, dias: [...prev.dias], ultimo: ahora };
  if (r.modo === 'reconocer') {
    if (r.ok) {
      m.reconoce += 1;
      if (m.nivel === 'nuevo' || m.nivel === 'aprendiendo') m.nivel = m.reconoce >= 2 ? 'reconocido' : 'aprendiendo';
      // Un acierto con opciones no agenda lejos: hay que probar recuperación pronto.
      m.proximo = Math.max(m.proximo, ahora + (m.nivel === 'reconocido' ? 6 * HORA : HORA));
    } else {
      m.errores += 1;
      if (r.deAccion) m.erroresAccion += 1;
      if (r.confundidoCon) m.confusiones[r.confundidoCon] = (m.confusiones[r.confundidoCon] ?? 0) + 1;
      if (m.nivel === 'consolidado') m.nivel = 'recordado'; else if (m.nivel !== 'recordado') m.nivel = 'aprendiendo';
      m.intervalo = 0;
      m.proximo = ahora + 10 * 60e3;
    }
    return m;
  }
  if (r.nota === 'bien') {
    m.recuerda += 1;
    const d = hoy(ahora);
    if (!m.dias.includes(d)) m.dias = [...m.dias, d].slice(-8);
    m.intervalo = m.intervalo < 1 ? 1 : Math.min(45, m.intervalo * 2.4);
    m.proximo = ahora + m.intervalo * DIA;
    m.nivel = m.dias.length >= 2 ? 'consolidado' : 'recordado';
  } else if (r.nota === 'casi') {
    m.intervalo = Math.max(0.5, m.intervalo * 0.6);
    m.proximo = ahora + m.intervalo * DIA;
    if (m.nivel === 'nuevo' || m.nivel === 'aprendiendo') m.nivel = 'reconocido';
  } else {
    m.errores += 1;
    m.intervalo = 0;
    m.proximo = ahora + 10 * 60e3;
    m.nivel = m.nivel === 'consolidado' ? 'recordado' : 'aprendiendo';
  }
  return m;
}

export function registrar(id: string, r: Resultado) {
  const ahora = Date.now();
  actualizar(e => ({ ...e, memoria: { ...e.memoria, [id]: calcular(e.memoria[id] ?? memoriaVacia(), r, ahora) } }));
}

export const nivelDe = (id: string): NivelNombre => obtener().memoria[id]?.nivel ?? 'nuevo';

let frec: Map<string, number> | undefined;

/** Puntaje de urgencia: vencidos, confusiones, prioridad y cuánto salió en exámenes reales. */
export function urgencia(id: string, prioridad: number, ahora = Date.now()): number {
  const m = obtener().memoria[id];
  frec ??= frecuencias();
  let p = (5 - prioridad) * 10 + Math.min(24, (frec.get(id) ?? 0) * 3);
  if (!m || m.nivel === 'nuevo') return p;
  if (m.proximo <= ahora) p += 40;
  if (esConfusion(m)) p += 30;
  if (m.nivel === 'aprendiendo') p += 20;
  if (m.nivel === 'consolidado' && m.proximo > ahora) p -= 80;
  if (m.nivel === 'recordado' && m.proximo > ahora) p -= 40;
  return p;
}
