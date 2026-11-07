// Guía general de la 2ª ERA. Los grupos y fármacos no se repiten acá: salen de la farmacoteca.
import type { CapId } from './tipos';

export interface BloqueGuia { titulo: string; idea: string; caps: CapId[] }

export const BLOQUES: BloqueGuia[] = [
  { titulo: 'Mensajeros del sistema autónomo', idea: 'Manejan el cuerpo sin que lo pienses: corazón, pupila, bronquios, intestino.', caps: ['col', 'adr'] },
  { titulo: 'Mensajeros del cerebro', idea: 'Manejan movimiento, ánimo, ansiedad, sueño y convulsiones.', caps: ['dop', 'ser', 'gab'] },
  { titulo: 'Alergia, estómago y sangre', idea: 'Otro mensajero, la histamina, y lo que necesita la médula para formar glóbulos rojos.', caps: ['his'] },
  { titulo: 'Cáncer e inmunidad', idea: 'Acá no se trabaja con un mensajero: se ataca a la célula o a un blanco puntual.', caps: ['neo', 'acm'] },
];

export const INFO_CAP: Record<CapId, { mensajero: string; hace: string; sirve: string; porQue: string }> = {
  col: { mensajero: 'Acetilcolina', hace: 'Es el freno del cuerpo y la orden que mueve al músculo.', sirve: 'Miastenia, espasmos, bronquios, intubación', porQue: 'Va primero porque acá aprendés cómo funciona una sinapsis. Ese molde se repite en casi todos los capítulos.' },
  adr: { mensajero: 'Noradrenalina y adrenalina', hace: 'Es el acelerador del cuerpo.', sirve: 'Presión, corazón, asma, shock', porQue: 'Es lo opuesto al capítulo 1: se entiende por contraste.' },
  dop: { mensajero: 'Dopamina', hace: 'Controla movimiento, emociones y prolactina.', sirve: 'Parkinson, esquizofrenia, vómitos', porQue: 'Sale de la misma ruta que la noradrenalina, así que ya la tenés a medio camino.' },
  ser: { mensajero: 'Serotonina', hace: 'Regula ánimo, ansiedad, vasos e intestino.', sirve: 'Depresión, ansiedad, migraña, vómitos', porQue: 'Mismo molde, otra materia prima. Comparte con dopamina los antieméticos y las enzimas MAO.' },
  gab: { mensajero: 'GABA y glutamato', hace: 'GABA frena al cerebro y glutamato lo excita.', sirve: 'Ansiedad, insomnio, epilepsia', porQue: 'Cambia la lógica: ya no alcanza con activar o bloquear, importan los canales de cloro y sodio.' },
  his: { mensajero: 'Histamina, más hierro y EPO', hace: 'La histamina da alergia y ácido. Hierro y EPO forman glóbulos rojos.', sirve: 'Alergia, acidez, anemia', porQue: 'H1 y H2 siguen la lógica de activar o bloquear que ya conocés, y se suma el tema de la sangre.' },
  neo: { mensajero: 'Sin mensajero: ciclo celular', hace: 'Dañan a las células que se dividen.', sirve: 'Cáncer', porQue: 'Otra lógica: cada familia actúa en una fase del ciclo celular.' },
  acm: { mensajero: 'Sin mensajero: anticuerpos', hace: 'Son anticuerpos fabricados contra un blanco.', sirve: 'Cáncer y artritis reumatoide', porQue: 'Cierra el tema del cáncer, y los nombres se leen por el sufijo.' },
};

/** De qué materia prima sale cada mensajero. */
export const ORIGENES: { pasos: { t: string; cap?: CapId }[]; nota: string }[] = [
  { pasos: [{ t: 'Colina + acetil-CoA' }, { t: 'Acetilcolina', cap: 'col' }], nota: 'Termina acá.' },
  { pasos: [{ t: 'Tirosina' }, { t: 'L-DOPA' }, { t: 'Dopamina', cap: 'dop' }, { t: 'Noradrenalina', cap: 'adr' }, { t: 'Adrenalina', cap: 'adr' }], nota: 'Dopamina y noradrenalina son pasos de la misma cadena. Por eso se llaman catecolaminas. Las neuronas dopaminérgicas se quedan en dopamina porque les falta la enzima del paso siguiente.' },
  { pasos: [{ t: 'Triptófano' }, { t: '5-hidroxitriptófano' }, { t: 'Serotonina', cap: 'ser' }], nota: 'Es otra cadena: no sale de la dopamina. Se parecen en que las degrada la misma enzima, la MAO.' },
  { pasos: [{ t: 'Ciclo de Krebs' }, { t: 'Glutamato', cap: 'gab' }, { t: 'GABA', cap: 'gab' }], nota: 'El que frena sale del que excita.' },
  { pasos: [{ t: 'Histidina' }, { t: 'Histamina', cap: 'his' }], nota: 'Se guarda en mastocitos y basófilos.' },
];

export interface EjemploSinapsis { lugar: string; hace: string; ejemplos: Partial<Record<CapId, { activa?: string[]; frena?: string[]; texto?: string }>> }

/** Los cinco lugares donde puede actuar un fármaco, iguales en todos los sistemas. */
export const LUGARES: EjemploSinapsis[] = [
  { lugar: 'Fabricación', hace: 'Dar la materia prima.', ejemplos: { dop: { activa: ['levodopa'] } } },
  { lugar: 'Guardado', hace: 'Sacar al mensajero de la vesícula.', ejemplos: { adr: { activa: ['tiramina', 'efedrina'] } } },
  { lugar: 'Liberación', hace: 'Soltar más o soltar menos.', ejemplos: { col: { frena: ['toxina-botulinica'] }, adr: { frena: ['morfina-at2'] }, dop: { activa: ['amantadina'] }, gab: { texto: 'La toxina tetánica bloquea la liberación de GABA.' } } },
  { lugar: 'Receptor', hace: 'Activarlo o taparlo. Es donde actúan la mayoría.', ejemplos: {
    col: { activa: ['pilocarpina', 'betanecol'], frena: ['atropina', 'succinilcolina'] },
    adr: { activa: ['salbutamol', 'fenilefrina'], frena: ['propranolol', 'prazosin'] },
    dop: { activa: ['bromocriptina'], frena: ['haloperidol', 'domperidona'] },
    ser: { activa: ['sumatriptan', 'buspirona'], frena: ['ondansetron', 'risperidona'] },
    gab: { activa: ['diazepam', 'fenobarbital'], frena: ['flumazenil'] },
  } },
  { lugar: 'Limpieza', hace: 'Frenar la enzima o la recaptación, para que el mensajero dure más.', ejemplos: {
    col: { frena: ['neostigmina', 'paration'] }, adr: { frena: ['cocaina'] }, dop: { frena: ['selegilina', 'entacapona', 'cocaina'] }, ser: { frena: ['fluoxetina', 'moclobemida'] }, gab: { frena: ['valproico', 'vigabatrina'] },
  } },
];

/** Cómo se llega de un mapa a una fila del cuadro de examen. */
export const EJEMPLOS_FIN: { id: string; bloque: string; lugar: string; logica: string }[] = [
  { id: 'haloperidol', bloque: 'Mensajeros del cerebro', lugar: 'Receptor', logica: 'En la esquizofrenia sobra señal de dopamina. Si tapo el receptor D2, baja la señal.' },
  { id: 'salbutamol', bloque: 'Mensajeros del sistema autónomo', lugar: 'Receptor', logica: 'En el asma el bronquio está cerrado. Si activo β2, se abre.' },
  { id: 'fluoxetina', bloque: 'Mensajeros del cerebro', lugar: 'Limpieza', logica: 'Los antidepresivos buscan más serotonina en la sinapsis. Si freno la recaptación, dura más.' },
];

export const PASOS_CAPITULO: { t: string; d: string }[] = [
  { t: 'Mapa y nombres', d: 'Primero memorizás quién es quién. Acá va la mayor parte del tiempo.' },
  { t: 'Teoría y video', d: 'Recién ahora entendés por qué cada uno hace lo que hace.' },
  { t: 'Cuadro', d: 'Fijás nombre, mecanismo y efecto, tapando las columnas.' },
  { t: 'Choice y desarrollo', d: 'Practicás con preguntas reales de las fotos.' },
  { t: 'Examen del capítulo', d: 'Te muestra qué nombres todavía no están firmes.' },
];

/** Reparto para rendir en dos días. El peso sale de contar el examen de 40 choice. */
export const PLAN: { dia: string; caps: CapId[]; cierre: string }[] = [
  { dia: 'Día 1', caps: ['col', 'adr', 'dop', 'ser'], cierre: 'Cerrá con los casos de clase de colinérgicos y adrenérgicos.' },
  { dia: 'Día 2', caps: ['gab', 'his', 'neo', 'acm'], cierre: 'Leé lo mínimo de 1ª ERA, hacé un simulacro completo y repasá lo que falló.' },
];
