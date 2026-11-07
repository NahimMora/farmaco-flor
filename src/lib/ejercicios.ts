// Ejercicios de memoria generados desde la farmacoteca. Los distractores salen de las confusiones
// documentadas y de grupos vecinos: nunca de opciones absurdas.
import type { Accion, CapId, Farmaco, Grupo, Pareja } from '../data/tipos';
import { CAPITULOS, FARMACOS, GRUPOS, PAREJAS, ficha, grupoDe, miembros } from '../data';
import { obtener } from './store';
import { urgencia } from './srs';

export type Ejercicio =
  | { k: 'opcion'; id: string; titulo: string; enunciado: string; opciones: { t: string; farmaco?: string }[]; ok: number; explica: string; objetivo: string; deAccion?: boolean }
  | { k: 'clasificar'; id: string; farmaco: string; opciones: { a: Accion; t: string }[]; ok: Accion; explica: string }
  | { k: 'lista'; id: string; grupo: string; titulo: string; cuantos: number; respuestas: string[] }
  | { k: 'hueco'; id: string; grupo: string; visibles: string[]; ocultos: string[] }
  | { k: 'pareja'; id: string; pareja: Pareja };

const mezclar = <T,>(a: T[], semilla = Math.random): T[] => {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(semilla() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
  return c;
};

export const TEXTO_ACCION: Record<Accion, string> = {
  agonista: 'Agonista', antagonista: 'Antagonista', inhibidor: 'Inhibidor', modulador: 'Modulador o canal', bloqueante: 'Bloqueante',
  precursor: 'Precursor', liberador: 'Libera', citotoxico: 'Citotóxico', anticuerpo: 'Anticuerpo', hormona: 'Hormona', suplemento: 'Suplemento',
};

function vecinos(f: Farmaco, n: number, cond: (x: Farmaco) => boolean = () => true): Farmaco[] {
  const conf = (f.confusiones ?? []).map(ficha).filter((x): x is Farmaco => !!x && cond(x));
  const mismoCap = mezclar(FARMACOS.filter(x => x.cap === f.cap && x.grupo !== f.grupo && x.prioridad <= 2 && cond(x)));
  const otros = mezclar(FARMACOS.filter(x => x.cap !== f.cap && x.prioridad === 1 && cond(x)));
  const out: Farmaco[] = [];
  for (const x of [...conf, ...mismoCap, ...otros]) if (x.id !== f.id && !out.some(o => o.id === x.id)) out.push(x);
  return out.slice(0, n);
}

function conOpciones(correcta: string, otras: { t: string; farmaco?: string }[], farmaco?: string) {
  const unicas = otras.filter((o, i) => o.t !== correcta && otras.findIndex(p => p.t === o.t) === i).slice(0, 3);
  const opciones = mezclar([{ t: correcta, farmaco }, ...unicas]);
  return { opciones, ok: opciones.findIndex(o => o.t === correcta) };
}

export function deFarmacoAGrupo(f: Farmaco): Ejercicio {
  const gr = grupoDe(f);
  const distintos = mezclar(GRUPOS.filter(g => g.id !== gr.id && CAPITULOS.find(c => c.id === f.cap)?.grupos.some(x => x.id === g.id)));
  const lejos = mezclar(GRUPOS.filter(g => g.id !== gr.id));
  const { opciones, ok } = conOpciones(gr.nombre, [...distintos, ...lejos].map(g => ({ t: g.nombre })));
  return { k: 'opcion', id: f.id + '-grupo', titulo: '¿A qué grupo pertenece?', enunciado: f.nombre, opciones, ok, objetivo: f.id, deAccion: true, explica: `${f.nombre}: ${gr.nombre}. ${gr.resultado}.` };
}

export function deMecanismoANombre(f: Farmaco): Ejercicio {
  const otras = vecinos(f, 8, x => x.mecanismo !== f.mecanismo);
  const { opciones, ok } = conOpciones(f.nombre, otras.map(x => ({ t: x.nombre, farmaco: x.id })), f.id);
  return { k: 'opcion', id: f.id + '-meca', titulo: '¿Qué fármaco es?', enunciado: `${f.mecanismo}. ${f.efecto}.`, opciones, ok, objetivo: f.id, explica: f.clave ?? `${f.nombre} pertenece a ${grupoDe(f).nombre}.` };
}

export function deNombreAMecanismo(f: Farmaco): Ejercicio {
  const otras = vecinos(f, 8, x => x.mecanismo !== f.mecanismo);
  const { opciones, ok } = conOpciones(f.mecanismo, otras.map(x => ({ t: x.mecanismo, farmaco: x.id })));
  return { k: 'opcion', id: f.id + '-acc', titulo: '¿Cuál es su mecanismo?', enunciado: f.nombre, opciones, ok, objetivo: f.id, deAccion: true, explica: f.clave ?? `Efecto: ${f.efecto}.` };
}

export function deNombreAEfecto(f: Farmaco): Ejercicio {
  const otras = vecinos(f, 10, x => x.efecto !== f.efecto);
  const { opciones, ok } = conOpciones(f.efecto, otras.map(x => ({ t: x.efecto })));
  return { k: 'opcion', id: f.id + '-efe', titulo: '¿Qué efecto produce?', enunciado: f.nombre, opciones, ok, objetivo: f.id, explica: `Mecanismo: ${f.mecanismo}.` };
}

export function clasificar(f: Farmaco): Ejercicio {
  const candidatas: Accion[] = ['agonista', 'antagonista', 'inhibidor', 'modulador'];
  const base = candidatas.includes(f.accion) ? candidatas : [f.accion, ...candidatas.slice(0, 3)];
  return { k: 'clasificar', id: f.id + '-clas', farmaco: f.id, opciones: base.map(a => ({ a, t: TEXTO_ACCION[a] })), ok: f.accion, explica: f.mecanismo };
}

export function intruso(g: Grupo): Ejercicio | null {
  const dentro = mezclar(miembros(g.id).filter(x => x.prioridad <= 2));
  if (dentro.length < 3) return null;
  const base = dentro[0];
  const fuera = vecinos(base, 12, x => x.grupo !== g.id)[0];
  if (!fuera) return null;
  const { opciones, ok } = conOpciones(fuera.nombre, dentro.slice(0, 3).map(x => ({ t: x.nombre, farmaco: x.id })), fuera.id);
  return { k: 'opcion', id: g.id + '-int', titulo: 'Encontrá el intruso', enunciado: `Tres son ${g.nombre.toLowerCase()}. ¿Cuál no?`, opciones, ok, objetivo: fuera.id, explica: `${fuera.nombre} pertenece a ${grupoDe(fuera).nombre}.` };
}

export function listaEnBlanco(g: Grupo): Ejercicio | null {
  const m = miembros(g.id).filter(x => x.prioridad <= 2);
  if (m.length < 2) return null;
  return { k: 'lista', id: g.id + '-lista', grupo: g.id, titulo: g.nombre, cuantos: m.length, respuestas: m.map(x => x.id) };
}

export function completarFamilia(g: Grupo): Ejercicio | null {
  const m = mezclar(miembros(g.id).filter(x => x.prioridad <= 2));
  if (m.length < 3) return null;
  const ocultar = Math.max(1, Math.min(2, Math.floor(m.length / 2)));
  return { k: 'hueco', id: g.id + '-hueco', grupo: g.id, visibles: m.slice(ocultar).map(x => x.id), ocultos: m.slice(0, ocultar).map(x => x.id) };
}

/** Si Flor confunde dos fármacos varias veces, arma una comparación directa entre ellos. */
export function parejasDeConfusiones(): Ejercicio[] {
  const out: Ejercicio[] = [];
  for (const [id, m] of Object.entries(obtener().memoria)) {
    for (const [otro, n] of Object.entries(m.confusiones)) {
      const a = ficha(id), b = ficha(otro);
      if (n >= 2 && a && b) {
        out.push({ k: 'pareja', id: `${id}-${otro}`, pareja: { a: id, b: otro, porQue: `Los confundiste ${n} veces.`, aEs: `${a.mecanismo}. ${a.efecto}.`, bEs: `${b.mecanismo}. ${b.efecto}.`, truco: a.clave ?? b.clave ?? `${a.nombre}: ${grupoDe(a).nombre}. ${b.nombre}: ${grupoDe(b).nombre}.` } });
      }
    }
  }
  return out;
}

/** Sesión escalonada: primero reconocer, después recuperar sin ayuda. */
export function sesionCapitulo(cap: CapId, n = 14): Ejercicio[] {
  const c = CAPITULOS.find(x => x.id === cap)!;
  return armar(c.farmacos.filter(f => f.prioridad <= 2), c.grupos, c.parejas, n);
}

export function sesionGrupo(grupo: string, n = 10): Ejercicio[] {
  const gr = GRUPOS.find(x => x.id === grupo)!;
  const propios = miembros(grupo).filter(f => f.prioridad <= 2);
  return armar(propios, [gr], [], n);
}

export function sesionGlobal(n = 16, ids?: string[]): Ejercicio[] {
  const base = ids ? ids.map(ficha).filter((x): x is Farmaco => !!x) : FARMACOS.filter(f => f.prioridad <= 2);
  return armar(base, GRUPOS, PAREJAS, n);
}

function armar(fichas: Farmaco[], grupos: Grupo[], parejas: Pareja[], n: number): Ejercicio[] {
  const mem = obtener().memoria;
  const orden = [...fichas].sort((a, b) => urgencia(b.id, b.prioridad) - urgencia(a.id, a.prioridad) || Math.random() - 0.5);
  const elegidos = orden.slice(0, Math.ceil(n * 0.7));
  const out: Ejercicio[] = [];
  for (const f of elegidos) {
    const m = mem[f.id];
    const nv = m?.nivel ?? 'nuevo';
    const r = Math.random();
    if (nv === 'nuevo' || nv === 'aprendiendo') {
      out.push(r < 0.5 ? deFarmacoAGrupo(f) : r < 0.75 ? clasificar(f) : deMecanismoANombre(f));
    } else {
      out.push(r < 0.4 ? deNombreAMecanismo(f) : r < 0.7 ? deMecanismoANombre(f) : deNombreAEfecto(f));
    }
  }
  const gm = mezclar(grupos.filter(g => miembros(g.id).some(f => f.prioridad <= 2)));
  for (const g of gm.slice(0, 2)) { const e = listaEnBlanco(g); if (e) out.push(e); }
  for (const g of gm.slice(2, 3)) { const e = completarFamilia(g); if (e) out.push(e); }
  for (const g of gm.slice(3, 4)) { const e = intruso(g); if (e) out.push(e); }
  for (const p of mezclar(parejas).slice(0, 1)) out.push({ k: 'pareja', id: p.a + p.b, pareja: p });
  // Las listas en blanco van al final: exigen más que las opciones.
  const faciles = mezclar(out.filter(e => e.k === 'opcion' || e.k === 'clasificar' || e.k === 'pareja'));
  const dificiles = mezclar(out.filter(e => e.k === 'lista' || e.k === 'hueco'));
  return [...faciles, ...dificiles].slice(0, n);
}

/** Normaliza un nombre escrito a mano. */
export function normal(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function lev(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  }
  return d[a.length][b.length];
}

/** ¿Lo escrito corresponde a este fármaco? Tolera errores de tipeo chicos. */
export function coincide(escrito: string, f: Farmaco): boolean {
  const e = normal(escrito);
  if (e.length < 3) return false;
  return [f.nombre, ...(f.variantes ?? []), ...(f.sinonimos ?? [])].some(n => {
    const m = normal(n);
    return m === e || (m.length >= 6 && lev(m, e) <= (m.length >= 10 ? 2 : 1));
  });
}
