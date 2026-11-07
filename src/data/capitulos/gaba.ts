import type { Capitulo } from '../tipos';
import { dev, g, hacerFicha, mcGen, mcReal, mn, par, vfGen, vfReal } from '../h';

const f = hacerFicha('gab');

export const gaba: Capitulo = {
  id: 'gab',
  n: 5,
  titulo: 'GABA y glutamato',
  objetivo: 'Explicar por qué BZD y barbitúricos abren distinto el canal, y los tres mecanismos del valproico.',
  avisos: [
    'Los tres mecanismos del ácido valproico aparecen en seis preguntas reales distintas. Son fijos.',
    'Benzodiacepinas: aumentan la frecuencia de apertura. Barbitúricos: el tiempo. El preguntero lo pregunta directo.',
  ],
  mapa: [
    { titulo: 'Aumentan la inhibición GABA', grupos: ['gab-bzd', 'gab-bar', 'gab-val', 'gab-rec'] },
    { titulo: 'Disminuyen la excitación', grupos: ['gab-na', 'gab-ca', 'gab-glu'] },
    { titulo: 'Antagonista', grupos: ['gab-flu'] },
  ],
  grupos: [
    g('gab-bzd', 'Benzodiacepinas', 'modulador', '↑ frecuencia de apertura de Cl−. Ansiolítico, sedante, hipnótico, anticonvulsivante', { regla: 'No activan solas al receptor: potencian al GABA en el GABA-A por un sitio alostérico.', patron: 'Terminan en -azepam o -zolam.' }),
    g('gab-bar', 'Barbitúricos', 'modulador', '↑ tiempo de apertura de Cl−. Anticonvulsivante, sedante', { regla: 'Actúan sobre el canal GABA-A y prolongan la apertura.', patron: 'Terminan en -barbital o -tal.' }),
    g('gab-val', 'Ácido valproico', 'inhibidor', 'Antiepiléptico. Tres mecanismos', { regla: 'Inhibe recaptación de GABA, inhibe GABA transaminasa e inhibe canales de Na+.' }),
    g('gab-rec', 'Inhiben recaptación o degradación', 'inhibidor', 'Más GABA: antiepilépticos', { regla: 'Vigabatrina frena la enzima y tiagabina la recaptación.' }),
    g('gab-na', 'Inactivan canales de Na+', 'modulador', '↑ tiempo de inactivación de Na+. Antiepilépticos', { regla: 'Aumentan el tiempo de inactivación del canal de sodio y bajan la excitación.' }),
    g('gab-ca', 'Bloquean canales de Ca++', 'bloqueante', 'Antiepiléptico', { regla: 'Bloqueo de canales de calcio.' }),
    g('gab-glu', 'Reducen el glutamato', 'antagonista', 'Antiepilépticos', { regla: 'Disminuyen la excitación glutamatérgica.' }),
    g('gab-flu', 'Antagonista de benzodiacepinas', 'antagonista', 'Revierte la intoxicación por BZD', { regla: 'Compite por el sitio de benzodiacepinas en el GABA-A.' }),
  ],
  farmacos: [
    f('diazepam', 'Diazepam', 'gab-bzd', 'modulador', 'GABA-A', 'Potencia al GABA en el receptor GABA-A: ↑ frecuencia de apertura del canal de Cl−', 'Ansiolítico, sedante, hipnótico, anticonvulsivante, miorrelajante', 1, ['PIZ', 'GAB 30', 'GAB 31', 'DES 3', 'DES c17', 'PRE 52', 'PRE 71'], {
      variantes: ['Diazepan'], confusiones: ['fenobarbital', 'flumazenil'], discrepancia: 'd-bzd',
    }),
    f('clonazepam', 'Clonazepam', 'gab-bzd', 'modulador', 'GABA-A', 'Aumenta la frecuencia de apertura de los canales de cloro', 'Ansiolítico, sedante, hipnótico, anticonvulsivante', 1, ['PIZ', 'DES c30', 'DES 6'], { variantes: ['Clonazepan'] }),
    f('alprazolam', 'Alprazolam', 'gab-bzd', 'modulador', 'GABA-A', 'Aumenta la frecuencia de apertura de los canales de cloro', 'Ansiolítico, sedante, hipnótico', 1, ['PIZ', 'GAB 30', 'DES 6'], { variantes: ['Alprozolam'] }),
    f('midazolam', 'Midazolam', 'gab-bzd', 'modulador', 'GABA-A', 'Aumenta la frecuencia de apertura de los canales de cloro', 'Ansiolítico, sedante, hipnótico', 1, ['PIZ', 'GAB 30', 'PRE 22']),
    f('imidazenil', 'Imidazenil', 'gab-bzd', 'modulador', 'GABA-A', 'Actúa en el sitio de benzodiacepinas', 'Ansiolítico', 3, ['GAB 30']),
    f('zopiclona', 'Zopiclona', 'gab-bzd', 'modulador', 'GABA-A', 'Hipnótico que actúa en el complejo GABA-A', 'Hipnótico', 3, ['APU 61'], { externo: true }),
    f('fenobarbital', 'Fenobarbital', 'gab-bar', 'modulador', 'GABA-A', 'Aumenta el tiempo de apertura de los canales de cloro', 'Anticonvulsivante y antiepiléptico', 1, ['PIZ', 'GAB 30', 'GAB 31', 'DES c18', 'DES c27', 'PRE 26', 'PRE 42'], { confusiones: ['diazepam', 'fenitoina'], clave: 'Tiempo, no frecuencia.' }),
    f('tiopental', 'Tiopental', 'gab-bar', 'modulador', 'GABA-A', 'Aumenta el tiempo de apertura de los canales de cloro', 'Sedante', 1, ['PIZ', 'GAB 30'], { variantes: ['Tiopental sódico'] }),
    f('valproico', 'Ácido valproico', 'gab-val', 'inhibidor', 'GABA-T, recaptación, Na+', 'Inhibe la recaptación de GABA, inhibe la GABA transaminasa e inhibe canales de Na+', 'Antiepiléptico', 1, ['PIZ', 'GAB 31', 'GAB 32', 'DES c1', 'DES c17', 'DES c25', 'DES 15', 'DES 23', 'EXA 4', 'EXA 26', 'PRE 28', 'PRE 51'], {
      sinonimos: ['Valproato'], variantes: ['Ac. Valproico', 'Acido valproico'], discrepancia: 'd-valproico', clave: 'Tres mecanismos. Si piden uno solo, cualquiera vale.', confusiones: ['vigabatrina', 'carbamazepina'],
    }),
    f('vigabatrina', 'Vigabatrina', 'gab-rec', 'inhibidor', 'GABA-T', 'Inhibe la GABA transaminasa', 'Antiepiléptico', 1, ['GAB 30', 'GAB 31', 'PRE 42'], { confusiones: ['valproico'] }),
    f('tiagabina', 'Tiagabina', 'gab-rec', 'inhibidor', 'Recaptación de GABA', 'Inhibe la recaptación de GABA', 'Antiepiléptico', 2, ['GAB 30'], { externo: true }),
    f('carbamazepina', 'Carbamazepina', 'gab-na', 'modulador', 'Canal de Na+', 'Aumenta el tiempo de inactivación de los canales de Na+', 'Antiepiléptico', 1, ['PIZ', 'GAB 30', 'GAB 32'], { variantes: ['Carbamacepina'], confusiones: ['fenitoina'], clave: 'También es inductor del citocromo P450.' }),
    f('fenitoina', 'Fenitoína', 'gab-na', 'modulador', 'Canal de Na+', 'Aumenta el tiempo de inactivación de los canales de Na+, disminuye la excitación neuronal', 'Antiepiléptico', 1, ['PIZ', 'GAB 30', 'GAB 32', 'DES c4', 'DES c17', 'DES c30', 'PRE 22', 'PRE 70'], {
      confusiones: ['carbamazepina', 'fenobarbital'], discrepancia: 'd-fenitoina', clave: 'No actúa sobre GABA-A. Bloquea sodio, no potasio.',
    }),
    f('lamotrigina', 'Lamotrigina', 'gab-na', 'modulador', 'Canal de Na+', 'Bloquea canales de Na+ e inhibe la excitación glutamatérgica', 'Antiepiléptico', 1, ['GAB 30', 'GAB 32', 'PRE 42', 'PRE 75'], { clave: 'No inhibe la recaptación de glutamato.' }),
    f('etosuximida', 'Etosuximida', 'gab-ca', 'bloqueante', 'Canal de Ca++', 'Bloqueo de canales de Ca++', 'Antiepiléptico', 2, ['GAB 32']),
    f('felbamato', 'Felbamato', 'gab-glu', 'antagonista', 'NMDA', 'Reduce la excitación glutamatérgica', 'Antiepiléptico', 2, ['GAB 30', 'PRE 42'], { clave: 'No inhibe AMPA: es la opción falsa del preguntero.' }),
    f('flumazenil', 'Flumazenil', 'gab-flu', 'antagonista', 'GABA-A, sitio BZD', 'Antagonista competitivo del receptor GABA-A en el sitio de benzodiacepinas', 'Revierte la intoxicación por benzodiacepinas', 1, ['GAB 30', 'DES c17', 'APU 65'], {
      confusiones: ['diazepam'], discrepancia: 'd-flumazenil', clave: 'No "disminuye los niveles de GABA".',
    }),
  ],
  mnemotecnias: [
    mn('m-bzd', 'gab-bzd', 'Di Clo Al Mi: frecuencia en el cloro', [['Di', 'Diazepam'], ['Clo', 'Clonazepam'], ['Al', 'Alprazolam'], ['Mi', 'Midazolam']],
      'Las cuatro benzodiacepinas de la pizarra.', 'Olvidar una de las cuatro.'),
    mn('m-fre', 'gab-bzd', 'BenzoFrecuencia, BarbiTiempo', [['Benzo, Frecuencia', 'BZD: abre más veces'], ['Barbi, Tiempo', 'Barbitúricos: abre más tiempo']],
      'La diferencia exacta en el canal de cloro.', 'El error del preguntero 26: fenobarbital con frecuencia.'),
    mn('m-val', 'gab-val', 'VAL: Vuelve, Atrapa y Limita', [['Vuelve', 'Inhibe la recaptación'], ['Atrapa', 'Inhibe la GABA transaminasa'], ['Limita', 'Inhibe canales de Na+']],
      'Los tres mecanismos del ácido valproico.', 'Acordarte de uno solo cuando piden tres.'),
    mn('m-na', 'gab-na', 'Carla Fenita, en la Lámpara: tres que apagan el sodio', [['Carla', 'Carbamazepina'], ['Fenita', 'Fenitoína'], ['Lámpara', 'Lamotrigina']],
      'Los tres que prolongan la inactivación del canal de Na+.', 'Pensar que actúan sobre GABA.'),
  ],
  parejas: [
    par('diazepam', 'fenobarbital', 'Mismo receptor, distinta forma de abrir.', 'Aumenta la frecuencia de apertura.', 'Aumenta el tiempo de apertura.', 'BenzoFrecuencia, BarbiTiempo.'),
    par('diazepam', 'flumazenil', 'Mismo sitio, efecto opuesto.', 'Potencia al GABA.', 'Antagonista: lo revierte.', 'Flumazenil saca de la intoxicación.'),
    par('fenitoina', 'fenobarbital', 'Empiezan igual y son antiepilépticos.', 'Canal de Na+.', 'GABA-A.', 'Fenitoína no actúa sobre GABA-A.'),
    par('valproico', 'vigabatrina', 'Los dos inhiben la GABA transaminasa.', 'Tres mecanismos.', 'Solo GABA-T.', 'Valproico hace de todo.'),
    par('carbamazepina', 'fenitoina', 'Mismo mecanismo.', 'Inactiva Na+.', 'Inactiva Na+.', 'Carbamazepina además induce el P450.'),
  ],
  escenas: [
    {
      tipo: 'flujo', id: 'gab-1', titulo: 'GABA y glutamato: dos caras',
      nodos: [
        { id: 'k', x: 170, y: 90, t: 'Ciclo de Krebs', w: 220 },
        { id: 'a', x: 170, y: 260, t: 'α-cetoglutarato', w: 220 },
        { id: 'g', x: 480, y: 260, t: 'Glutamato: excita', w: 240, a: 'agonista' },
        { id: 'b', x: 790, y: 260, t: 'GABA: inhibe', w: 220, a: 'antagonista' },
        { id: 't', x: 790, y: 470, t: 'GABA-T degrada', w: 220, a: 'inhibidor' },
        { id: 's', x: 480, y: 470, t: 'Ácido succínico', w: 220 },
      ],
      lazos: [{ a: 'k', b: 'a' }, { a: 'a', b: 'g', t: 'Transaminación' }, { a: 'g', b: 'b', t: 'GAD + vit. B6' }, { a: 'b', b: 't' }, { a: 't', b: 's' }, { a: 's', b: 'k', t: 'Shunt' }],
      pasos: [
        { di: 'El GABA es el principal neurotransmisor inhibitorio y el más abundante. Es un aminoácido. Y sale del glutamato, el principal excitatorio.', ver: ['g', 'b'], luz: ['b'] },
        { di: 'El glutamato se forma desde el alfa cetoglutarato del ciclo de Krebs, por transaminación. También desde glutamina.', ver: ['k', 'a'], retener: ['Glutamato: desde α-cetoglutarato o glutamina'] },
        { di: 'La glutamato decarboxilasa convierte glutamato en GABA, usando fosfato de piridoxal, la vitamina B seis, como cofactor. Esa es la respuesta del preguntero.', ver: [], luz: ['g', 'b'], retener: ['Cofactor: piridoxal, vitamina B6'] },
        { di: 'La GABA transaminasa lo degrada, y el shunt devuelve los productos al ciclo. Si inhibo esta enzima, aumenta el GABA. Eso hacen vigabatrina y ácido valproico.', ver: ['t', 's'], luz: ['t'], retener: ['Vigabatrina: inhibe GABA-T'] },
      ],
    },
    {
      tipo: 'cadenas', id: 'gab-2', titulo: 'Receptores',
      filas: [
        { chips: ['GABA-A', 'Ionotrópico', 'Pentámero', 'Abre Cl−'], color: 'modulador', nota: 'Postsináptico. Acá actúan BZD y barbitúricos' },
        { chips: ['GABA-B', 'Metabotrópico', 'Proteína Gi/o', 'Abre K+, baja Ca++'], color: 'antagonista', nota: 'Pre y postsináptico. Pulmón y vía aérea' },
        { chips: ['GABA-C', 'Ionotrópico', 'Subunidad ρ', 'Abre Cl−'], color: 'precursor', nota: 'Retina' },
        { chips: ['NMDA', 'Ionotrópico', 'Glicina coagonista', 'Na+, K+ y Ca++'], color: 'agonista', nota: 'Plasticidad neuronal' },
        { chips: ['AMPA', 'Ionotrópico', 'Postsináptico', 'Na+ y K+'], color: 'agonista', nota: 'Transmisión rápida' },
        { chips: ['Kainato', 'Ionotrópico', 'Pre y post', 'Función poco conocida'], color: 'agonista' },
      ],
      pasos: [
        { di: 'El GABA-A es un canal ionotrópico de cinco subunidades, un pentámero. Cuando se abre entra cloro y la neurona se inhibe. Acá actúan benzodiacepinas y barbitúricos. El GABA se une a la subunidad beta.', fila: 0, retener: ['GABA-A: pentámero, Cl−', 'GABA se une a β'] },
        { di: 'El GABA-B es metabotrópico: va con proteína G inhibitoria. Está pre y postsináptico, e interviene en el pulmón.', fila: 1, retener: ['GABA-B: proteína G'] },
        { di: 'El GABA-C es ionotrópico y está en la retina.', fila: 2 },
        { di: 'En glutamato, tres ionotrópicos. El NMDA necesita glicina como coagonista, deja pasar calcio y participa en la plasticidad.', fila: 3, retener: ['NMDA: glicina y Ca++'] },
        { di: 'El AMPA deja pasar sodio y potasio, y hace la transmisión rápida. No es canal de calcio ni metabotrópico.', fila: 4 },
        { di: 'Y el kainato es ionotrópico y se ubica pre y postsináptico. Esa es la opción correcta del preguntero.', fila: 5, retener: ['Kainato: pre y post'] },
      ],
    },
    {
      tipo: 'canal', id: 'gab-3', titulo: 'Frecuencia contra tiempo', ion: 'Cl−',
      pasos: [
        { di: 'Este dibujo es el corazón del capítulo. Sin GABA, el canal está cerrado.', modo: 'cerrado', texto: 'Canal cerrado' },
        { di: 'Con GABA el canal se abre de a ratos y entra cloro. Mirá el trazado de la derecha: cada escalón es una apertura.', modo: 'normal', ligandos: [{ n: 'GABA', a: 'agonista' }], texto: 'Apertura normal' },
        { di: 'Las benzodiacepinas no abren el canal solas. Se unen a otro sitio, y hacen que con el mismo GABA se abra muchas más veces. Más frecuencia.', modo: 'frecuencia', ligandos: [{ n: 'GABA', a: 'agonista' }, { n: 'Diazepam', a: 'modulador' }], texto: 'Benzodiacepinas: más frecuencia', retener: ['BZD: ↑ frecuencia'] },
        { di: 'Los barbitúricos hacen otra cosa: cada apertura dura mucho más. Más tiempo. Fijate el trazado: los escalones son largos.', modo: 'tiempo', ligandos: [{ n: 'GABA', a: 'agonista' }, { n: 'Fenobarbital', a: 'modulador' }], texto: 'Barbitúricos: más tiempo', retener: ['Barbitúricos: ↑ tiempo'] },
        { di: 'Y el flumazenil se sienta en el sitio de las benzodiacepinas y compite. Revierte la intoxicación.', modo: 'normal', ligandos: [{ n: 'GABA', a: 'agonista' }, { n: 'Flumazenil', a: 'antagonista' }], texto: 'Flumazenil revierte', retener: ['Flumazenil: antagonista'] },
      ],
    },
    {
      tipo: 'pizarra', id: 'gab-4', titulo: 'Efectos de BZD y barbitúricos',
      lineas: [
        { lista: ['Ansiolítico', 'Sedante', 'Hipnótico', 'Anticonvulsivante', 'Miorrelajante'], resultado: 'Benzodiacepinas', a: 'modulador' },
        { lista: ['Anticonvulsivante', 'Antiepiléptico', 'Sedante'], resultado: 'Barbitúricos', a: 'modulador' },
      ],
      pasos: [
        { di: 'Cuatro efectos de benzodiacepinas: ansiolítico, sedante, hipnótico y anticonvulsivante. Cinco, si sumás miorrelajante.', hasta: 0, retener: ['4 efectos de BZD'] },
        { di: 'Barbitúricos: anticonvulsivante, antiepiléptico y sedante.', hasta: 1 },
      ],
    },
    {
      tipo: 'sinapsis', id: 'gab-5', titulo: 'Ácido valproico: tres mecanismos', nt: 'GABA', transportador: 'GAT',
      receptores: [{ n: 'GABA-A', k: 'c' }], enzima: { n: 'GABA-T', en: 'hendidura' },
      pasos: [
        { di: 'Primer mecanismo: inhibe la recaptación de GABA. El GABA se queda en la hendidura.', liberar: true, nivel: 0.7, activos: [0], drogas: [{ n: 'Ác. valproico', a: 'inhibidor', en: 't' }], efecto: '1. Inhibe la recaptación', tono: 'mas', retener: ['1. Inhibe recaptación de GABA'] },
        { di: 'Segundo: inhibe la GABA transaminasa. Se degrada menos.', liberar: true, nivel: 0.9, activos: [0], drogas: [{ n: 'Ác. valproico', a: 'inhibidor', en: 'e' }], efecto: '2. Inhibe la GABA transaminasa', tono: 'mas', retener: ['2. Inhibe GABA-T'] },
        { di: 'Y tercero, por fuera del GABA: inhibe los canales de sodio, aumenta el tiempo de inactivación y baja la excitación. Recaptación, transaminasa y sodio. Decilo tres veces. Sale siempre.', liberar: true, nivel: 0.9, activos: [0], efecto: '3. Inhibe canales de Na+', tono: 'mas', retener: ['3. Inhibe canales de Na+'] },
      ],
    },
    {
      tipo: 'canal', id: 'gab-6', titulo: 'Antiepilépticos sobre sodio', ion: 'Na+',
      pasos: [
        { di: 'La epilepsia es un desequilibrio entre excitación e inhibición. Hay dos caminos: aumentar la inhibición GABA o bajar la excitación. Este es el segundo. El canal de sodio dispara la descarga.', modo: 'frecuencia', texto: 'Descarga excesiva' },
        { di: 'Carbamazepina, fenitoína, lamotrigina y ácido valproico aumentan el tiempo de inactivación del canal de sodio. Se abre menos veces.', modo: 'normal', ligandos: [{ n: 'Fenitoína', a: 'modulador' }, { n: 'Carbamazepina', a: 'modulador' }], texto: 'Más tiempo inactivado', retener: ['Carbamazepina', 'Fenitoína', 'Lamotrigina'] },
        { di: 'Además, etosuximida bloquea canales de calcio. Felbamato y lamotrigina bajan la excitación por glutamato.', modo: 'bloqueado', ligandos: [{ n: 'Etosuximida', a: 'bloqueante' }], texto: 'Otras dianas', retener: ['Etosuximida: Ca++'] },
      ],
    },
    {
      tipo: 'pizarra', id: 'gab-7', titulo: 'La pizarra de GABA',
      lineas: [
        { lista: ['Clonazepam', 'Diazepam', 'Alprazolam', 'Midazolam'], resultado: '↑ frecuencia de Cl−', a: 'modulador' },
        { lista: ['Fenobarbital', 'Tiopental'], resultado: '↑ tiempo de Cl−', a: 'modulador' },
        { lista: ['Ácido valproico'], resultado: 'Recaptación, GABA-T y Na+', a: 'inhibidor' },
        { lista: ['Carbamazepina', 'Fenitoína'], resultado: '↑ tiempo de inactivación de Na+', a: 'modulador' },
      ],
      pasos: [
        { di: 'Repetí conmigo. Benzodiacepinas: clonazepam, diazepam, alprazolam, midazolam. Frecuencia.', hasta: 0 },
        { di: 'Barbitúricos: fenobarbital y tiopental. Tiempo.', hasta: 1 },
        { di: 'Ácido valproico: recaptación, transaminasa y sodio.', hasta: 2 },
        { di: 'Carbamazepina y fenitoína: inactivación del canal de sodio.', hasta: 3 },
      ],
    },
  ],
  preguntas: [
    mcReal('gab', 'PRE 21', 'La correcta con respecto a los receptores GABA-b:', ['Se ubican exclusivamente en el terminal postsináptico', 'Está involucrado en las acciones centrales del GABA', 'Es un receptor involucrado en las acciones centrales del GABA', 'Es un receptor asociado a proteína G'], [3], [
      'Está pre y post.', 'La presentación destaca sus acciones periféricas.', 'Repite la opción anterior.', 'Correcta: metabotrópico, Gi/o.',
    ]),
    mcReal('gab', 'PRE 22', 'Cuál NO actúa sobre los receptores GABA-a:', ['Fenobarbital', 'Midazolam', 'Fenitoína', 'Diazepam'], [2], [
      'Barbitúrico.', 'Benzodiacepina.', 'Correcta: actúa en canales de Na+.', 'Benzodiacepina.',
    ], { farmacos: ['fenitoina', 'fenobarbital', 'midazolam', 'diazepam'] }),
    mcReal('gab', 'PRE 25', '¿Cuál de las siguientes sustancias actúan como cofactor en la síntesis y metabolismo del GABA?', ['Piridoxina', 'Calcio', 'Fosfolípidos', 'ATP'], [0], [
      'Correcta: fosfato de piridoxal, vitamina B6.', 'No.', 'No.', 'No.',
    ]),
    vfReal('gab', 'PRE 26', 'El fenobarbital es una droga anticonvulsivante agonista del receptor GABA-a, aumentando la frecuencia de apertura del canal de cloro', false, 'Aumenta el tiempo de apertura. La frecuencia es de las benzodiacepinas.', { farmacos: ['fenobarbital'] }),
    vfReal('gab', 'PRE 28', 'El ácido valproico es una droga anticonvulsivante que inhibe a la GABA transaminasa', true, 'Es uno de sus tres mecanismos.', { farmacos: ['valproico'] }),
    mcReal('gab', 'PRE 30', 'El GABA:', ['Es una proteína neurotransmisora inhibitoria', 'Es un aminoácido neurotransmisor excitatorio', 'Es un aminoácido NT inhibitorio', 'Es una proteína NT excitatoria'], [2], [
      'No es proteína.', 'Es inhibitorio.', 'Correcta.', 'Incorrecta en las dos palabras.',
    ]),
    mcReal('gab', 'PRE 32', 'Correcta con respecto a los receptores glutamatérgicos:', ['El receptor AMPA es un canal de Ca++', 'El receptor AMPA es metabotrópico y de ubicación post-sináptica', 'El receptor KAINATO es ionotrópico y de ubicación pre y post sináptica', 'El NMDA es ionotrópico y de ubicación presináptica'], [2], [
      'Na+ y K+.', 'Es ionotrópico.', 'Correcta.', 'Es postsináptico.',
    ]),
    mcReal('gab', 'PRE 35', 'La correcta con respecto al GABA-A:', ['Es un receptor ionotrópico asociado a un canal de Ca++', 'El GABA se une a la subunidad α', 'Presenta una estructura pentamérica', 'Es un receptor asociado a proteína'], [2], [
      'Canal de Cl−.', 'Se une a la subunidad β.', 'Correcta.', 'Es ionotrópico.',
    ]),
    mcReal('gab', 'PRE 40', 'La incorrecta con respecto al glutamato:', ['La recaptación neuronal depende de un transporte de Ca++', 'Distribuido en forma abundante en el SNC', 'Es un neurotransmisor excitatorio sintetizado a partir de glutamina', 'Es un neurotransmisor excitatorio sintetizado a partir de α-cetoglutarato'], [0], [
      'Correcta: depende del gradiente de Na+.', 'Es cierto.', 'Es cierto.', 'Es cierto.',
    ]),
    mcReal('gab', 'PRE 41', 'Marque la opción incorrecta con respecto a las vías gabaérgicas estriatófugas:', ['Terminan en la sustancia nigra reticulada', 'Terminan en el segmento interior del globus pallidus', 'Están formadas por neuronas excitatorias', 'Juega un rol en el control de la motricidad extrapiramidal'], [2], [
      'Es cierto.', 'Es cierto.', 'Correcta: son inhibitorias.', 'Es cierto.',
    ]),
    mcReal('gab', 'PRE 42', 'Marque la opción correcta:', ['El Felbamato inhibe el receptor glutamatérgico AMPA', 'El Fenobarbital inhibe la recaptación del Gaba', 'La Lamotrigina inhibe la recaptación de Glutamato', 'La Vigabatrina inhibe la GABA Transaminasa'], [3], [
      'No es su mecanismo en la presentación.', 'Actúa en GABA-A.', 'Canal de Na+ y excitación glutamatérgica.', 'Correcta.',
    ], { farmacos: ['vigabatrina', 'felbamato', 'lamotrigina', 'fenobarbital'] }),
    vfReal('gab', 'PRE 70', 'La Fenitoína es una droga anticonvulsivante y antiarrítmica y actúa bloqueando los canales de K', false, 'Actúa sobre canales de sodio.', { farmacos: ['fenitoina'] }),
    vfReal('gab', 'PRE 75', 'La Lamotrigina es un bloqueante de canales de sodio y tiene efecto anticonvulsivante', true, 'Está entre los que aumentan la inactivación del canal de Na+.', { farmacos: ['lamotrigina'] }),
    mcGen('gab', 'Un paciente con sobredosis de benzodiacepinas recibe:', ['Fenobarbital', 'Flumazenil', 'Vigabatrina', 'Fenitoína'], 1, [
      'Agravaría el cuadro.', 'Correcta: antagonista competitivo.', 'Antiepiléptico.', 'Antiepiléptico.',
    ], { farmacos: ['flumazenil'] }),
    mcGen('gab', '¿Qué aumenta el tiempo de inactivación de los canales de Na+?', ['Midazolam', 'Carbamazepina', 'Tiopental', 'Flumazenil'], 1, [
      'Actúa en GABA-A.', 'Correcta.', 'Actúa en GABA-A.', 'Actúa en GABA-A.',
    ], { farmacos: ['carbamazepina'] }),
    mcGen('gab', 'Señalá la correcta sobre las benzodiacepinas:', ['Son agonistas totales del GABA-A', 'Aumentan la frecuencia de apertura del canal de cloro', 'Aumentan el tiempo de apertura', 'Abren canales de sodio'], 1, [
      'Moduladoras: un cuadro las pone así y es impreciso.', 'Correcta.', 'Eso es de barbitúricos.', 'No.',
    ], { farmacos: ['diazepam'] }),
    mcGen('gab', '¿Qué tres mecanismos tiene el ácido valproico?', ['Inhibe recaptación de GABA, inhibe GABA-T, inhibe canales de Na+', 'Abre canales de Cl−, bloquea Ca++, inhibe MAO', 'Agonista GABA-A, antagonista NMDA, inhibe COMT', 'Inhibe GABA-T, activa AMPA, abre K+'], 0, [
      'Correcta.', 'No.', 'No.', 'No.',
    ], { farmacos: ['valproico'] }),
    mcGen('gab', 'La toxina tetánica:', ['Aumenta el GABA', 'Bloquea la liberación de GABA', 'Es un agonista GABA-A', 'Inhibe la GABA-T'], 1, [
      'Lo contrario.', 'Correcta.', 'No.', 'No.',
    ]),
    vfGen('gab', 'El receptor NMDA necesita glicina como coagonista', true, 'Ese sitio debe estar ocupado para que se active.'),
    vfGen('gab', 'El GABA-B es un canal de cloro', false, 'Es metabotrópico, acoplado a proteína Gi/o.'),
  ],
  desarrollos: [
    dev('gab', 'DES 15, DES 23, EXA 4, EXA 26, PRE 51', 'Mencione los mecanismos de acción del ÁCIDO VALPROICO', ['Inhibe la recaptación de GABA', 'Inhibe la GABA transaminasa', 'Inhibe canales de Na+'], 'Aumenta el GABA por dos vías y baja la excitación por la tercera. Efecto: antiepiléptico.', { farmacos: ['valproico'] }),
    dev('gab', 'DES 3, PRE 52, EXA Y2', 'Mencione el mecanismo de acción y 4 efectos del DIAZEPAM', ['Interactúa con el receptor GABA-A y aumenta la inhibición gabaérgica, con mayor frecuencia de apertura del canal de Cl−', 'Ansiolítico, sedante, hipnótico, anticonvulsivante'], 'Es modulador: potencia al GABA por un sitio alostérico. Quinto efecto: miorrelajante.', {
      encontrada: 'Inhibe al GABA en el SNC', nota: 'Una respuesta de EXA dice eso: está al revés. Potencia al GABA.', farmacos: ['diazepam'],
    }),
    dev('gab', 'DES 6', 'Mencione el mecanismo de acción de las BENZODIACEPINAS y 3 ejemplos', ['Aumentan la frecuencia de apertura de los canales de cloro del GABA-A', 'Diazepam, clonazepam, alprazolam'], 'Actúan por un sitio alostérico, no como agonistas directos.', {
      encontrada: 'Son agonistas totales', nota: 'La presentación dice que se fijan a sitios alostéricos y regulan el canal.', farmacos: ['diazepam', 'clonazepam', 'alprazolam'],
    }),
    dev('gab', 'DES 14, EXA 25', 'Mencione dos drogas que actúen sobre los receptores GABA-A y especifique sus principales efectos', ['Diazepam: ansiolítico, sedante, hipnótico, anticonvulsivante', 'Fenobarbital: anticonvulsivante, antiepiléptico, sedante'], 'Si te piden familias: benzodiacepinas y barbitúricos.', { farmacos: ['diazepam', 'fenobarbital'] }),
    dev('gab', 'EXA 1', 'Mencione 3 fármacos que actúen sobre Rs GABA-A', ['Diazepam', 'Fenobarbital', 'Flumazenil'], 'Benzodiacepinas y barbitúricos son familias: conviene dar un fármaco de cada una.', {
      encontrada: 'Benzodiacepinas, Barbitúricos, Ac. Valproico', nota: 'Pedían fármacos y hay dos familias. El valproico no actúa directamente sobre GABA-A.', farmacos: ['diazepam', 'fenobarbital', 'flumazenil'],
    }),
    dev('gab', 'EXA 2', 'Mencione un ejemplo de fármaco que inhiba la enzima GABA transaminasa', ['Ácido valproico'], 'Vigabatrina también.', { farmacos: ['valproico', 'vigabatrina'] }),
    dev('gab', 'EXA 3', 'Mencione 4 efectos farmacológicos de las Benzodiacepinas', ['Anticonvulsivante', 'Ansiolítico', 'Miorrelajante', 'Hipnótico'], 'También sedante.'),
    dev('gab', 'PRE 71', 'Sobre el diazepam mencione: biofase, mecanismo de acción, acción, efecto', ['Biofase: receptor GABA-A', 'Mecanismo: potencia la inhibición gabaérgica, más frecuencia de apertura', 'Acción: aumenta la conductancia al cloro e hiperpolariza', 'Efecto: sedación, relajación muscular y actividad anticonvulsiva'], 'Acción es lo que cambia en la célula; efecto es lo que se ve.', {
      encontrada: 'Biofase: GABA-A y GABA-B. Acción: prolongada', nota: 'Benzodiacepinas se relacionan con GABA-A, no con GABA-B. Y prolongada no es una acción.', farmacos: ['diazepam'],
    }),
  ],
};
