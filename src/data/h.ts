// Atajos para escribir contenido sin repetir campos.
import type { Accion, CapId, Desarrollo, Farmaco, Grupo, Pareja, Mnemotecnia, Prioridad, PreguntaOpciones, PreguntaVF } from './tipos';

const ARCH: Record<string, string> = { PRE: 'Preguntero Farmaco.pdf', ERA: 'Preguntero Farmaco.pdf (ERA 1)', EXA: 'fármaco a desarrollar.pdf', DES: 'FARMACO A DESARROL_250624_091543.pdf' };
export const fuente = (loc: string) => ({ archivo: ARCH[loc.split(' ')[0]] ?? loc, loc });

type Extra = Partial<Omit<Farmaco, 'id' | 'nombre' | 'cap' | 'grupo' | 'accion' | 'diana' | 'mecanismo' | 'efecto' | 'prioridad' | 'fuentes'>>;

export const hacerFicha = (cap: CapId) => (
  id: string, nombre: string, grupo: string, accion: Accion, diana: string, mecanismo: string, efecto: string,
  prioridad: Prioridad, fuentes: string[], extra: Extra = {},
): Farmaco => ({ id, nombre, cap, grupo, accion, diana, mecanismo, efecto, prioridad, fuentes, pizarra: fuentes.includes('PIZ'), ...extra });

export const g = (id: string, nombre: string, accion: Accion, resultado: string, extra: Partial<Grupo> = {}): Grupo => ({ id, nombre, accion, resultado, ...extra });

export const mn = (id: string, grupo: string, frase: string, partes: [string, string][], reconstruye: string, evita: string): Mnemotecnia =>
  ({ id, grupo, frase, partes: partes.map(([trozo, es]) => ({ trozo, es })), reconstruye, evita });

export const par = (a: string, b: string, porQue: string, aEs: string, bEs: string, truco: string): Pareja => ({ a, b, porQue, aEs, bEs, truco });

type ExtraP = Partial<Pick<PreguntaOpciones, 'nota' | 'farmacos' | 'estado' | 'claveMaterial'>>;

let nId = 0;
const uid = (c: string) => `${c}-g${++nId}`;

/** Opción múltiple del material. `loc` es la ubicación, por ejemplo 'PRE 10'. */
export const mcReal = (cap: CapId, loc: string, texto: string, opciones: string[], correctas: number[], por: string[], ex: ExtraP = {}): PreguntaOpciones =>
  ({ id: loc.replace(/\s/g, ''), cap, tipo: 'mc', origen: 'real', fuente: fuente(loc), texto, opciones, correctas, por, estado: 'verificada', ...ex });

export const vfReal = (cap: CapId, loc: string, texto: string, verdadero: boolean, explica: string, ex: ExtraP & { claveMaterial?: never } | { nota?: string; farmacos?: string[]; estado?: PreguntaVF['estado']; claveMaterial?: boolean } = {}): PreguntaVF =>
  ({ id: loc.replace(/\s/g, ''), cap, tipo: 'vf', origen: 'real', fuente: fuente(loc), texto, verdadero, explica, estado: 'verificada', ...(ex as object) });

export const mcGen = (cap: CapId, texto: string, opciones: string[], correcta: number, por: string[], ex: ExtraP = {}): PreguntaOpciones =>
  ({ id: uid(cap), cap, tipo: 'mc', origen: 'generada', texto, opciones, correctas: [correcta], por, estado: 'verificada', ...ex });

export const vfGen = (cap: CapId, texto: string, verdadero: boolean, explica: string, farmacos?: string[]): PreguntaVF =>
  ({ id: uid(cap), cap, tipo: 'vf', origen: 'generada', texto, verdadero, explica, estado: 'verificada', farmacos });

type ExtraD = Partial<Pick<Desarrollo, 'encontrada' | 'nota' | 'farmacos' | 'estado' | 'diagrama'>>;

/** Pregunta de desarrollo. `loc` puede juntar varias apariciones: 'DES 15, EXA 4, PRE 51'. */
export const dev = (cap: CapId, loc: string, texto: string, minima: string[], completa: string, ex: ExtraD = {}): Desarrollo =>
  ({ id: 'd-' + loc.split(',')[0].replace(/\s/g, ''), cap, texto, origen: 'real', fuente: fuente(loc), estado: ex.encontrada ? 'corregida' : 'verificada', minima, completa, ...ex });
