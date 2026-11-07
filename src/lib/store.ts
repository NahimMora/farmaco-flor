// Progreso guardado en este dispositivo. Cada cambio de forma suma una migración: el avance
// de Flor tiene que sobrevivir a todas las versiones nuevas de la app.
import { useSyncExternalStore } from 'react';

export type NivelNombre = 'nuevo' | 'aprendiendo' | 'reconocido' | 'recordado' | 'consolidado';

export interface Memoria {
  nivel: NivelNombre;
  /** Aciertos con opciones a la vista. */
  reconoce: number;
  /** Aciertos sin ninguna pista. */
  recuerda: number;
  errores: number;
  /** Días distintos en los que lo recordó sin pistas. */
  dias: string[];
  intervalo: number;
  proximo: number;
  ultimo: number;
  /** Con qué fármacos lo confundió y cuántas veces. */
  confusiones: Record<string, number>;
  /** Errores de agonista/antagonista o de selectividad. */
  erroresAccion: number;
}

export interface EstadoPregunta { ok: number; mal: number; ultimo: number; marcada?: boolean; ultimaBien?: boolean }
export type Autoeval = 'si' | 'parcial' | 'no';

export interface Sesion { fecha: number; tipo: string; ok: number; total: number; detalle?: string }

export interface Estado {
  v: number;
  memoria: Record<string, Memoria>;
  preguntas: Record<string, EstadoPregunta>;
  desarrollos: Record<string, Autoeval>;
  pasos: Record<string, string[]>;
  checklist: Record<string, boolean>;
  sesiones: Sesion[];
  ajustes: { tema: 'auto' | 'claro' | 'oscuro' };
  ultimoCap?: string;
}

const CLAVE = 'farmaco-flor';
export const VERSION = 1;

const vacio = (): Estado => ({ v: VERSION, memoria: {}, preguntas: {}, desarrollos: {}, pasos: {}, checklist: {}, sesiones: [], ajustes: { tema: 'auto' } });

/** Pasa un estado guardado de cualquier versión anterior a la actual. */
export function migrar(crudo: unknown): Estado {
  const base = vacio();
  if (!crudo || typeof crudo !== 'object') return base;
  const e = { ...base, ...(crudo as Partial<Estado>) };
  e.ajustes = { ...base.ajustes, ...e.ajustes };
  e.v = VERSION;
  return e;
}

function leer(): Estado {
  try {
    const s = localStorage.getItem(CLAVE);
    return s ? migrar(JSON.parse(s)) : vacio();
  } catch {
    return vacio();
  }
}

let estado: Estado = typeof localStorage === 'undefined' ? vacio() : leer();
const oyentes = new Set<() => void>();

function emitir(sig: Estado) {
  estado = sig;
  try { localStorage.setItem(CLAVE, JSON.stringify(sig)); } catch { /* sin espacio: sigue en memoria */ }
  oyentes.forEach(o => o());
}

export const actualizar = (fn: (e: Estado) => Estado) => emitir(fn(estado));
export const obtener = () => estado;
export const useEstado = () => useSyncExternalStore(cb => { oyentes.add(cb); return () => oyentes.delete(cb); }, () => estado, () => estado);

export function exportar(): string {
  return JSON.stringify({ app: 'farmaco-flor', fecha: new Date().toISOString(), estado }, null, 0);
}

/** Importa un progreso exportado. Fusiona quedándose con lo más avanzado de cada fármaco. */
export function importar(texto: string): { nombres: number } {
  const dat = JSON.parse(texto);
  if (dat?.app !== 'farmaco-flor' || !dat.estado) throw new Error('Ese archivo no es un progreso de Fármaco.');
  const nuevo = migrar(dat.estado);
  const orden: NivelNombre[] = ['nuevo', 'aprendiendo', 'reconocido', 'recordado', 'consolidado'];
  const memoria = { ...estado.memoria };
  for (const [id, m] of Object.entries(nuevo.memoria)) {
    const a = memoria[id];
    if (!a || orden.indexOf(m.nivel) > orden.indexOf(a.nivel) || m.ultimo > a.ultimo) memoria[id] = m;
  }
  emitir({
    ...estado,
    memoria,
    preguntas: { ...nuevo.preguntas, ...estado.preguntas },
    desarrollos: { ...nuevo.desarrollos, ...estado.desarrollos },
    pasos: { ...nuevo.pasos, ...estado.pasos },
    checklist: { ...nuevo.checklist, ...estado.checklist },
    sesiones: [...estado.sesiones, ...nuevo.sesiones].sort((x, y) => x.fecha - y.fecha).slice(-300),
  });
  return { nombres: Object.keys(nuevo.memoria).length };
}

export function borrarTodo() { emitir(vacio()); }

export function aplicarTema(t: 'auto' | 'claro' | 'oscuro') {
  if (t === 'auto') delete document.documentElement.dataset.tema;
  else document.documentElement.dataset.tema = t;
}
