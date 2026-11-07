import type { Capitulo } from '../tipos';
import { g, hacerFicha, mn, par } from '../h';

const f = hacerFicha('gab');

export const gaba: Capitulo = {
  id: 'gab',
  n: 5,
  titulo: 'GABA y glutamato',
  objetivo: 'Explicar por qué BZD y barbitúricos abren distinto el canal, y los tres mecanismos del valproico.',
  avisos: [
    'Mecanismo y efecto del ácido valproico se piden a desarrollar. Tenelo de memoria.',
    'Benzodiacepinas: aumentan la frecuencia de apertura. Barbitúricos: el tiempo. Sale en choice.',
  ],
  mapa: [
    { titulo: 'Aumentan la inhibición GABA', grupos: ['gab-bzd', 'gab-bar', 'gab-val', 'gab-rec'] },
    { titulo: 'Disminuyen la excitación', grupos: ['gab-na', 'gab-ca'] },
    { titulo: 'Antagonista', grupos: ['gab-flu'] },
  ],
  grupos: [
    g('gab-bzd', 'Benzodiacepinas', 'modulador', '↑ frecuencia de apertura de Cl−. Ansiolítico, sedante, hipnótico, anticonvulsivante', { regla: 'No activan solas al receptor: potencian al GABA en el GABA-A por un sitio alostérico.', patron: 'Terminan en -azepam o -zolam.' }),
    g('gab-bar', 'Barbitúricos', 'modulador', '↑ tiempo de apertura de Cl−. Anticonvulsivante, sedante', { regla: 'Actúan sobre el canal GABA-A y prolongan la apertura.', patron: 'Terminan en -barbital o -tal.' }),
    g('gab-val', 'Ácido valproico', 'inhibidor', 'Antiepiléptico. Tres mecanismos', { regla: 'Inhibe recaptación de GABA, inhibe GABA transaminasa e inhibe canales de Na+.' }),
    g('gab-rec', 'Frena la degradación de GABA', 'inhibidor', 'Más GABA: antiepiléptico', { regla: 'Vigabatrina inhibe la GABA transaminasa.' }),
    g('gab-na', 'Inactivan canales de Na+', 'modulador', '↑ tiempo de inactivación de Na+. Antiepilépticos', { regla: 'Aumentan el tiempo de inactivación del canal de sodio y bajan la excitación.' }),
    g('gab-ca', 'Bloquean canales de Ca++', 'bloqueante', 'Antiepiléptico', { regla: 'Bloqueo de canales de calcio.' }),
    g('gab-flu', 'Antagonista de benzodiacepinas', 'antagonista', 'Revierte la intoxicación por BZD', { regla: 'Compite por el sitio de benzodiacepinas en el GABA-A.' }),
  ],
  farmacos: [
    f('diazepam', 'Diazepam', 'gab-bzd', 'modulador', 'GABA-A', 'Potencia al GABA en el receptor GABA-A: ↑ frecuencia de apertura del canal de Cl−', 'Ansiolítico, sedante, hipnótico, anticonvulsivante, miorrelajante', 1, ['PIZ', 'GAB 30', 'GAB 31', 'DES 3', 'DES c17', 'PRE 52', 'PRE 71'], {
      variantes: ['Diazepan'], confusiones: ['fenobarbital', 'flumazenil'], discrepancia: 'd-bzd',
    }),
    f('clonazepam', 'Clonazepam', 'gab-bzd', 'modulador', 'GABA-A', 'Aumenta la frecuencia de apertura de los canales de cloro', 'Ansiolítico, sedante, hipnótico, anticonvulsivante', 1, ['PIZ', 'DES c30', 'DES 6'], { variantes: ['Clonazepan'] }),
    f('alprazolam', 'Alprazolam', 'gab-bzd', 'modulador', 'GABA-A', 'Aumenta la frecuencia de apertura de los canales de cloro', 'Ansiolítico, sedante, hipnótico', 1, ['PIZ', 'GAB 30', 'DES 6'], { variantes: ['Alprozolam'] }),
    f('midazolam', 'Midazolam', 'gab-bzd', 'modulador', 'GABA-A', 'Aumenta la frecuencia de apertura de los canales de cloro', 'Ansiolítico, sedante, hipnótico', 1, ['PIZ', 'GAB 30', 'PRE 22']),
    f('fenobarbital', 'Fenobarbital', 'gab-bar', 'modulador', 'GABA-A', 'Aumenta el tiempo de apertura de los canales de cloro', 'Anticonvulsivante y antiepiléptico', 1, ['PIZ', 'GAB 30', 'GAB 31', 'DES c18', 'DES c27', 'PRE 26', 'PRE 42'], { confusiones: ['diazepam', 'fenitoina'], clave: 'Tiempo, no frecuencia.' }),
    f('tiopental', 'Tiopental', 'gab-bar', 'modulador', 'GABA-A', 'Aumenta el tiempo de apertura de los canales de cloro', 'Anestésico general: sedante', 1, ['PIZ', 'GAB 30', 'CUA 6'], { variantes: ['Tiopental sódico'] }),
    f('valproico', 'Ácido valproico', 'gab-val', 'inhibidor', 'GABA-T, recaptación, Na+', 'Inhibe la recaptación de GABA, inhibe la GABA transaminasa e inhibe canales de Na+', 'Antiepiléptico', 1, ['PIZ', 'GAB 31', 'GAB 32', 'DES c1', 'DES c17', 'DES c25', 'DES 15', 'DES 23', 'EXA 4', 'EXA 26', 'PRE 28', 'PRE 51'], {
      sinonimos: ['Valproato'], variantes: ['Ac. Valproico', 'Acido valproico'], discrepancia: 'd-valproico', clave: 'Tres mecanismos. Si piden uno solo, cualquiera vale.', confusiones: ['vigabatrina', 'carbamazepina'],
    }),
    f('vigabatrina', 'Vigabatrina', 'gab-rec', 'inhibidor', 'GABA-T', 'Inhibe la GABA transaminasa', 'Antiepiléptico', 1, ['GAB 30', 'GAB 31', 'PRE 42'], { confusiones: ['valproico'] }),
    f('carbamazepina', 'Carbamazepina', 'gab-na', 'modulador', 'Canal de Na+', 'Aumenta el tiempo de inactivación de los canales de Na+', 'Antiepiléptico', 1, ['PIZ', 'GAB 30', 'GAB 32'], { variantes: ['Carbamacepina'], confusiones: ['fenitoina'], clave: 'También es inductor del citocromo P450.' }),
    f('fenitoina', 'Fenitoína', 'gab-na', 'modulador', 'Canal de Na+', 'Aumenta el tiempo de inactivación de los canales de Na+, disminuye la excitación neuronal', 'Antiepiléptico', 1, ['PIZ', 'GAB 30', 'GAB 32', 'DES c4', 'DES c17', 'DES c30', 'PRE 22', 'PRE 70'], {
      confusiones: ['carbamazepina', 'fenobarbital'], clave: 'No actúa sobre GABA-A. Bloquea sodio, no potasio.',
    }),
    f('lamotrigina', 'Lamotrigina', 'gab-na', 'modulador', 'Canal de Na+', 'Bloquea canales de Na+ e inhibe la excitación glutamatérgica', 'Antiepiléptico', 1, ['GAB 30', 'GAB 32', 'PRE 42', 'PRE 75'], { clave: 'No inhibe la recaptación de glutamato.' }),
    f('etosuximida', 'Etosuximida', 'gab-ca', 'bloqueante', 'Canal de Ca++', 'Bloqueo de canales de Ca++', 'Antiepiléptico: crisis de ausencia', 1, ['GAB 32', 'CUA 6']),
    f('flumazenil', 'Flumazenil', 'gab-flu', 'antagonista', 'GABA-A, sitio BZD', 'Antagonista competitivo del receptor GABA-A en el sitio de benzodiacepinas', 'Revierte la intoxicación por benzodiacepinas', 1, ['GAB 30', 'DES c17', 'APU 65'], {
      confusiones: ['diazepam'], discrepancia: 'd-flumazenil', clave: 'No "disminuye los niveles de GABA".',
    }),
    f('lorazepam', 'Lorazepam', 'gab-bzd', 'modulador', 'GABA-A', 'Aumenta la frecuencia de apertura de los canales de cloro', 'Anticonvulsivante en crisis agudas', 2, ['CUA 6']),
  ],
  mnemotecnias: [
    mn('m-bar', 'gab-bar', 'Feno y Tío se quedan más tiempo', [['Feno', 'Fenobarbital'], ['Tío', 'Tiopental'], ['más tiempo', 'Aumentan el tiempo de apertura']],
      'Los dos barbitúricos y su mecanismo.', 'Decir frecuencia.'),
    mn('m-vig', 'gab-rec', 'Vigabatrina vigila a la transaminasa', [['Vigila', 'Inhibe la GABA transaminasa']],
      'El blanco de la vigabatrina.', 'Ponerla sobre el receptor.'),
    mn('m-eto', 'gab-ca', 'Eto se ausenta con calcio', [['Eto', 'Etosuximida'], ['ausenta', 'Crisis de ausencia'], ['calcio', 'Bloquea canales de Ca++']],
      'Mecanismo y uso de la etosuximida.', 'Decir que actúa sobre sodio.'),
    mn('m-flu', 'gab-flu', 'Flumazenil es el fusible de las benzos', [['Fusible', 'Corta el efecto: antagonista competitivo']],
      'Para qué sirve el flumazenil.', 'Ponerlo como agonista parcial.'),
    mn('m-bzd', 'gab-bzd', 'Di Clo Al Mi Lo: frecuencia en el cloro', [['Di', 'Diazepam'], ['Clo', 'Clonazepam'], ['Al', 'Alprazolam'], ['Mi', 'Midazolam'], ['Lo', 'Lorazepam']],
      'Las cinco benzodiacepinas.', 'Olvidar una.'),
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
        { di: 'Además, etosuximida bloquea canales de calcio y se usa en crisis de ausencia.', modo: 'bloqueado', ligandos: [{ n: 'Etosuximida', a: 'bloqueante' }], texto: 'Otras dianas', retener: ['Etosuximida: Ca++'] },
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
  preguntas: [],
  desarrollos: [],
};
