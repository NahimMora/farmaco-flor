// Modelo de contenido. La farmacoteca es la única fuente: mapas, cuadros, tarjetas y preguntas
// automáticas se derivan de estas fichas para que no haya dos versiones de un mismo fármaco.
import type { Escena } from '../vis/tipos';

export type CapId = 'col' | 'adr' | 'dop' | 'ser' | 'gab' | 'his' | 'neo' | 'acm' | 'fun';

/** Tipo de acción. Define el color de marcador y los ejercicios de clasificación. */
export type Accion =
  | 'agonista' | 'antagonista' | 'inhibidor' | 'modulador' | 'bloqueante'
  | 'precursor' | 'liberador' | 'citotoxico' | 'anticuerpo' | 'hormona' | 'suplemento';

export type Prioridad = 1 | 2 | 3 | 4;

export interface Farmaco {
  id: string;
  nombre: string;
  /** Grafías encontradas en el material (para el buscador y para no duplicar fichas). */
  variantes?: string[];
  sinonimos?: string[];
  cap: CapId;
  grupo: string;
  accion: Accion;
  /** Receptor, enzima, canal o transportador. */
  diana: string;
  selectividad?: string;
  /** Versión para escribir en el examen. Corta y reproducible. */
  mecanismo: string;
  efecto: string;
  indicaciones?: string;
  adversos?: string;
  /** Lo que diferencia a este fármaco en el examen. */
  clave?: string;
  /** Ids de fármacos con los que se confunde. */
  confusiones?: string[];
  /** Referencias a fuentes.ts: 'PIZ', 'COL 16', 'DES c18'... */
  fuentes: string[];
  pizarra?: boolean;
  prioridad: Prioridad;
  /** Id de discrepancia documentada. */
  discrepancia?: string;
  /** El dato proviene de una fuente externa y no del material docente. */
  externo?: boolean;
}

export interface Grupo {
  id: string;
  nombre: string;
  accion: Accion;
  /** Lo común al grupo: va a la derecha del corchete, como en la pizarra. */
  resultado: string;
  /** Mecanismo común: se enseña antes que los integrantes. */
  regla?: string;
  /** Patrón de nombres válido, si existe. */
  patron?: string;
  excepcion?: string;
}

export interface BloqueMapa {
  titulo: string;
  grupos: string[];
}

export interface Mnemotecnia {
  id: string;
  grupo: string;
  frase: string;
  partes: { trozo: string; es: string }[];
  reconstruye: string;
  evita: string;
}

export interface Pareja {
  a: string;
  b: string;
  porQue: string;
  aEs: string;
  bEs: string;
  truco: string;
}

export interface Capitulo {
  id: CapId;
  n: number;
  titulo: string;
  /** Una línea con lo que hay que poder hacer al terminar. */
  objetivo: string;
  mapa: BloqueMapa[];
  grupos: Grupo[];
  farmacos: Farmaco[];
  mnemotecnias: Mnemotecnia[];
  parejas: Pareja[];
  escenas: Escena[];
  preguntas: Pregunta[];
  desarrollos: Desarrollo[];
  /** Lo que marcó el docente o el material para este capítulo. */
  avisos?: string[];
}

export type Estado = 'verificada' | 'corregida' | 'dudosa';

export interface Fuente {
  archivo: string;
  loc: string;
}

interface PreguntaBase {
  id: string;
  cap: CapId;
  texto: string;
  /** real: salió del material. generada: práctica creada para esta app. */
  origen: 'real' | 'generada';
  fuente?: Fuente;
  estado: Estado;
  /** Aclaración cuando la clave del material estaba mal o es discutible. */
  nota?: string;
  farmacos?: string[];
}

export interface PreguntaOpciones extends PreguntaBase {
  tipo: 'mc';
  opciones: string[];
  /** Índices aceptados. Más de uno solo si la pregunta está impugnada y se explica en `nota`. */
  correctas: number[];
  /** Por qué cada opción es correcta o incorrecta, en el mismo orden. */
  por: string[];
  /** Clave que traía el material, si es otra. */
  claveMaterial?: number;
}

export interface PreguntaVF extends PreguntaBase {
  tipo: 'vf';
  verdadero: boolean;
  explica: string;
  claveMaterial?: boolean;
}

export type Pregunta = PreguntaOpciones | PreguntaVF;

export type Diagrama = 'curva-ct' | 'dr-competitivo' | 'dr-irreversible' | 'dr-potenciacion';

export interface Desarrollo {
  id: string;
  cap: CapId;
  texto: string;
  origen: 'real' | 'generada';
  fuente?: Fuente;
  estado: Estado;
  /** Lo mínimo para aprobar. */
  minima: string[];
  /** Explicación completa. */
  completa: string;
  /** Lo que decía el material, si estaba mal. */
  encontrada?: string;
  nota?: string;
  farmacos?: string[];
  /** Diagrama para preguntas que piden dibujar. */
  diagrama?: Diagrama;
}

/** Cuadro real de examen: nombre, mecanismo, efecto. Las filas salen de la farmacoteca. */
export interface CuadroReal {
  id: string;
  titulo: string;
  fuente: Fuente;
  filas: string[];
}

export interface Discrepancia {
  id: string;
  tema: string;
  dice: { fuente: string; texto: string }[];
  tipo: 'error del apunte' | 'terminología' | 'a verificar' | 'error de pizarra' | 'clave dudosa';
  respuesta: string;
  porQue: string;
  externo?: string;
}
