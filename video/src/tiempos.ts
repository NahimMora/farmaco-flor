export interface Beat { id: string; escena: number; paso: number; text: string; retener: string[]; archivo: string; inicio: number; frames: number; audio: number; cues: [number, number, string][] }
export interface Tiempo { cap: string; titulo: string; fps: number; total: number; marcas: { t: number; titulo: string }[]; beats: Beat[] }

// require.context junta todos los capítulos ya narrados.
declare const require: { context(d: string, r: boolean, e: RegExp): { keys(): string[]; (k: string): unknown } };
const ctx = require.context('./tiempos', false, /\.json$/);
export const TIEMPOS: Record<string, Tiempo> = Object.fromEntries(ctx.keys().map(k => { const t = ctx(k) as Tiempo; return [t.cap, t]; }));
