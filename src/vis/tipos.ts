// Escenas: un diagrama + pasos con narración. Las mismas escenas se recorren en la web
// y se renderizan en los videos, así el texto y el dibujo nunca se contradicen.
import type { Accion } from '../data/tipos';

interface PasoBase {
  /** Narración de este paso. Es lo que lee Tomás y el texto que se ve en la web. */
  di: string;
  /** Términos que quedan anotados al costado del video. */
  retener?: string[];
}

export interface DrogaEnSinapsis {
  n: string;
  a: Accion;
  /** r0, r1, r2: receptores. t: transportador. e: enzima. v: vesícula. ar: autorreceptor. lib: liberación. */
  en: string;
}

export interface PasoSinapsis extends PasoBase {
  liberar?: boolean;
  nivel?: number;
  activos?: number[];
  drogas?: DrogaEnSinapsis[];
  efecto?: string;
  tono?: 'mas' | 'menos' | 'neutro';
  /** Muestra la recaptación o la degradación. */
  limpia?: boolean;
}

export interface EscenaSinapsis {
  tipo: 'sinapsis';
  id: string;
  titulo: string;
  nt: string;
  receptores: { n: string; k: 'g' | 'c' }[];
  transportador?: string;
  enzima?: { n: string; en: 'hendidura' | 'terminal' };
  autor?: string;
  precursor?: string;
  pasos: PasoSinapsis[];
}

export interface EscenaRuta {
  tipo: 'ruta';
  id: string;
  titulo: string;
  nodos: string[];
  enzimas: string[];
  pasos: (PasoBase & { hasta: number; luz?: number; drogas?: { n: string; a: Accion; en: number }[] })[];
}

export interface EscenaCadenas {
  tipo: 'cadenas';
  id: string;
  titulo: string;
  filas: { chips: string[]; color: Accion; nota?: string }[];
  pasos: (PasoBase & { fila: number })[];
}

export interface EscenaOrganos {
  tipo: 'organos';
  id: string;
  titulo: string;
  pasos: (PasoBase & { organos: { o: Organo; t: string; c: Accion }[] })[];
}

export type Organo = 'ojo' | 'glandula' | 'bronquio' | 'corazon' | 'vaso' | 'estomago' | 'intestino' | 'vejiga' | 'piel' | 'cerebro' | 'musculo' | 'utero';

export interface EscenaCanal {
  tipo: 'canal';
  id: string;
  titulo: string;
  ion: string;
  pasos: (PasoBase & {
    modo: 'cerrado' | 'normal' | 'frecuencia' | 'tiempo' | 'bloqueado';
    ligandos?: { n: string; a: Accion }[];
    texto?: string;
  })[];
}

export interface EscenaEscalera {
  tipo: 'escalera';
  id: string;
  titulo: string;
  eje: string;
  zonas: { t: string; r: string; e: string; c: Accion }[];
  pasos: (PasoBase & { zona: number })[];
}

export interface EscenaPizarra {
  tipo: 'pizarra';
  id: string;
  titulo: string;
  lineas: { lista: string[]; resultado: string; a: Accion }[];
  pasos: (PasoBase & { hasta: number })[];
}

export interface NodoFlujo { id: string; x: number; y: number; t: string; w?: number; a?: Accion }
export interface LazoFlujo { a: string; b: string; t?: string; inhibe?: boolean }

export interface EscenaFlujo {
  tipo: 'flujo';
  id: string;
  titulo: string;
  nodos: NodoFlujo[];
  lazos: LazoFlujo[];
  pasos: (PasoBase & { ver: string[]; luz?: string[] })[];
}

export interface EscenaCurvas {
  tipo: 'curvas';
  id: string;
  titulo: string;
  ejes: [string, string];
  series: { n: string; c: Accion; f: 'hill' | 'ct'; ec50?: number; emax?: number; pend?: number }[];
  pasos: (PasoBase & { ver: number[] })[];
}

export interface EscenaCiclo {
  tipo: 'ciclo';
  id: string;
  titulo: string;
  pasos: (PasoBase & { fase?: 'G0' | 'G1' | 'S' | 'G2' | 'M'; drogas?: string[]; todas?: boolean })[];
}

export interface EscenaAnticuerpo {
  tipo: 'anticuerpo';
  id: string;
  titulo: string;
  pasos: (PasoBase & { luz?: 'fab' | 'fc' | 'todo'; partes?: { t: string; n: string }[]; humano?: number })[];
}

export interface EscenaVias {
  tipo: 'vias';
  id: string;
  titulo: string;
  vias: { id: string; n: string; d: string; a: Accion }[];
  pasos: (PasoBase & { luz: string[]; tag?: { id: string; t: string }[] })[];
}

export type Escena =
  | EscenaSinapsis | EscenaRuta | EscenaCadenas | EscenaOrganos | EscenaCanal | EscenaEscalera
  | EscenaPizarra | EscenaFlujo | EscenaCurvas | EscenaCiclo | EscenaAnticuerpo | EscenaVias;

export type PasoCualquiera = Escena['pasos'][number];
