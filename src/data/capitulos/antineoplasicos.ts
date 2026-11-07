import type { Capitulo } from '../tipos';
import { g, hacerFicha, mn, par } from '../h';

const f = hacerFicha('neo');

export const antineoplasicos: Capitulo = {
  id: 'neo',
  n: 7,
  titulo: 'Antineoplásicos',
  objetivo: 'Ubicar cada familia en su mecanismo y en la fase del ciclo donde actúa.',
  avisos: ['En exámenes: cuadros con metotrexato, ciclofosfamida y «inhibe la mitosis, fase M». En el choice, 3 preguntas de fases y toxicidad.'],
  mapa: [
    { titulo: 'No específicos de fase', grupos: ['neo-alq', 'neo-ant'] },
    { titulo: 'Específicos de fase', grupos: ['neo-met', 'neo-epi', 'neo-vin', 'neo-tax'] },
  ],
  grupos: [
    g('neo-alq', 'Alquilantes', 'citotoxico', 'Se unen de forma covalente al ADN', { regla: 'Moléculas muy reactivas: unen un grupo alquilo a los ácidos nucleicos. Dan errores de lectura, enlaces cruzados y roturas.' }),
    g('neo-ant', 'Antibióticos antitumorales', 'citotoxico', 'Se intercalan en el ADN y bloquean la transcripción', { regla: 'Se unen a pares de bases de forma intercalada. Pueden romper el ADN.', patron: 'Las antraciclinas terminan en -rubicina.' }),
    g('neo-met', 'Antimetabolitos', 'citotoxico', 'Fase S: interfieren con la síntesis de ácidos nucleicos', { regla: 'Análogos de ácido fólico, pirimidinas o purinas.' }),
    g('neo-epi', 'Epipodofilotoxinas', 'citotoxico', 'G2 y M: inhiben topoisomerasa II', { regla: 'Evitan que la célula entre en mitosis y producen roturas dobles.' }),
    g('neo-vin', 'Alcaloides de la vinca', 'citotoxico', 'Mitosis: desarman el huso', { regla: 'Inhiben el ensamblaje de microtúbulos al unirse a la tubulina.', patron: 'Tienen -vin en el nombre.' }),
    g('neo-tax', 'Taxanos', 'citotoxico', 'Mitosis: estabilizan microtúbulos', { regla: 'Se unen a microtúbulos ya formados y los estabilizan.', patron: 'Terminan en -taxel.' }),
  ],
  farmacos: [
    f('ciclofosfamida', 'Ciclofosfamida', 'neo-alq', 'citotoxico', 'ADN', 'Se une de forma covalente con un grupo alquilo a los ácidos nucleicos del ADN', 'Antineoplásico', 1, ['NEO 8', 'NEO 15', 'DES c18', 'DES c25', 'DES c26'], { variantes: ['Cliclofosfamida'], indicaciones: 'LH, LNH, Burkitt, LLA, cáncer de mama', adversos: 'Cistitis hemorrágica, carcinoma de vejiga', confusiones: ['metotrexato'] }),
    f('busulfan', 'Busulfán', 'neo-alq', 'citotoxico', 'ADN', 'Alquil sulfonato: agente alquilante', 'Antineoplásico', 2, ['NEO 8'], { variantes: ['Busulfan'], adversos: 'Síndrome addisoniano' }),
    f('carmustina', 'Carmustina', 'neo-alq', 'citotoxico', 'ADN', 'Nitrosourea: alquila el ADN', 'Antineoplásico', 2, ['NEO 8']),
    f('doxorrubicina', 'Doxorrubicina', 'neo-ant', 'citotoxico', 'ADN', 'Altera la replicación normal uniéndose a los pares de bases del ADN y bloqueando la transcripción', 'Antineoplásico', 1, ['NEO 9', 'NEO 15', 'DES c18', 'DES c30'], { variantes: ['Doxorubicina'], sinonimos: ['Adriamicina'], adversos: 'Necrosis cardíaca', confusiones: ['bleomicina'] }),
    f('bleomicina', 'Bleomicina', 'neo-ant', 'citotoxico', 'ADN', 'Produce especies de oxígeno reactivo y daño directo al ADN (fase G2)', 'Antineoplásico', 2, ['NEO 7', 'NEO 9', 'NEO 15'], { indicaciones: 'LH, cáncer de testículo', adversos: 'Infiltrados pulmonares, fiebre', confusiones: ['doxorrubicina'] }),
    f('metotrexato', 'Metotrexato', 'neo-met', 'citotoxico', 'Síntesis de ácidos nucleicos', 'Análogo del ácido fólico: interfiere en la síntesis normal de ácidos nucleicos', 'Antineoplásico', 1, ['NEO 10', 'NEO 15', 'DES c17', 'DES c27', 'DES c30'], { sinonimos: ['MTX', 'Metotrexate'], variantes: ['Metrotexato'], indicaciones: 'Coriocarcinoma, LLA, cáncer de mama, osteosarcomas', adversos: 'Infiltrados pulmonares, fibrosis hepática, encefalopatía', confusiones: ['ciclofosfamida', 'fluorouracilo'] }),
    f('fluorouracilo', '5-Fluorouracilo', 'neo-met', 'citotoxico', 'Síntesis de ácidos nucleicos', 'Análogo de pirimidinas: interfiere en la síntesis de ácidos nucleicos', 'Antineoplásico', 1, ['NEO 10', 'NEO 15'], { sinonimos: ['5-FU', 'Fluoruracilo'], indicaciones: 'Adenocarcinoma de colon, páncreas y estómago', adversos: 'Ataxia cerebelosa', confusiones: ['metotrexato'] }),
    f('cladribina', 'Cladribina', 'neo-met', 'citotoxico', 'Síntesis de ácidos nucleicos', 'Análogo de purinas', 'Antineoplásico', 2, ['NEO 10']),
    f('etoposido', 'Etopósido', 'neo-epi', 'citotoxico', 'Topoisomerasa II', 'Inhibe la topoisomerasa II y evita que la célula entre en mitosis', 'Antineoplásico', 1, ['NEO 7', 'NEO 11', 'NEO 15', 'DES c17'], { variantes: ['Etoposido'], indicaciones: 'Cáncer de testículo, pulmón, LH, LNH', discrepancia: 'd-etoposido', confusiones: ['vincristina'] }),
    f('vincristina', 'Vincristina', 'neo-vin', 'citotoxico', 'Tubulina', 'Inhibe el ensamblaje de los microtúbulos al unirse a la tubulina', 'Antineoplásico', 1, ['NEO 12', 'NEO 15', 'DES c18', 'DES c28'], { adversos: 'Neuropatía periférica, íleo paralítico, estreñimiento', confusiones: ['paclitaxel', 'etoposido'] }),
    f('vinblastina', 'Vinblastina', 'neo-vin', 'citotoxico', 'Tubulina', 'Inhibe el ensamblaje de los microtúbulos', 'Antineoplásico', 2, ['NEO 12']),
    f('paclitaxel', 'Paclitaxel', 'neo-tax', 'citotoxico', 'Microtúbulos', 'Se une a los microtúbulos ya formados y los estabiliza', 'Antineoplásico', 1, ['NEO 12', 'NEO 15'], { indicaciones: 'Cáncer de ovario, mama, vejiga, pulmón', confusiones: ['vincristina'] }),
    f('docetaxel', 'Docetaxel', 'neo-tax', 'citotoxico', 'Microtúbulos', 'Se une a los microtúbulos ya formados y los estabiliza', 'Antineoplásico', 2, ['NEO 12']),
  ],
  mnemotecnias: [
    mn('m-tax', 'neo-tax', 'Taxi detenido: Pacli y Doce no se mueven', [['Pacli', 'Paclitaxel'], ['Doce', 'Docetaxel'], ['no se mueven', 'Estabilizan los microtúbulos']],
      'Los dos taxanos.', 'Confundirlos con vinca.'),
    mn('m-ciclo', 'neo-met', 'S de Síntesis y de metabolitoS: antimetabolitos en fase S', [['Síntesis', 'Fase S'], ['metabolitoS', 'Antimetabolitos']],
      'Dónde actúan los antimetabolitos.', 'Ponerlos como no específicos.'),
    mn('m-vin', 'neo-vin', 'Vinca desarma. Taxel taxativo: no se mueve', [['Vinca desarma', 'Inhibe el ensamblaje'], ['Taxel taxativo', 'Estabiliza los microtúbulos']],
      'La diferencia entre las dos familias de la mitosis.', 'Decir que los dos hacen lo mismo.'),
    mn('m-eto', 'neo-epi', 'EtoPÓsido: topoisomerasa, antes de Pasar a mitosis', [['Poner freno', 'Topoisomerasa II'], ['Pasar a mitosis', 'G2 y M']],
      'Etopósido inhibe topoisomerasa II.', 'Decir solo "inhibe la mitosis".'),
    mn('m-alq', 'neo-alq', 'Ciclo, Car y Bus alquilan a toda hora', [['Ciclo', 'Ciclofosfamida'], ['Car', 'Carmustina'], ['Bus', 'Busulfán'], ['a toda hora', 'No específicos de fase']],
      'Los alquilantes del cuadro.', 'Asignarles una fase.'),
    mn('m-rub', 'neo-ant', 'Rubicina roja, corazón roto', [['Rubicina', 'Antraciclinas: doxorrubicina'], ['Corazón roto', 'Necrosis cardíaca']],
      'Las antraciclinas y su toxicidad típica.', 'Confundir la toxicidad.'),
  ],
  parejas: [
    par('vincristina', 'paclitaxel', 'Los dos en microtúbulos, sentido contrario.', 'Impide armar: inhibe el ensamblaje.', 'Impide desarmar: los estabiliza.', 'Vinca desarma. Taxel taxativo.'),
    par('metotrexato', 'fluorouracilo', 'Dos antimetabolitos de distinto análogo.', 'Análogo de ácido fólico.', 'Análogo de pirimidinas.', 'MTX, folato.'),
    par('doxorrubicina', 'ciclofosfamida', 'Los dos dañan el ADN.', 'Se intercala.', 'Alquila.', 'Rubicina se mete, ciclo se pega.'),
    par('etoposido', 'vincristina', 'Los dos impiden llegar a la mitosis completa.', 'Topoisomerasa II.', 'Tubulina.', 'Etopósido, topoisomerasa.'),
  ],
  escenas: [
    {
      tipo: 'ciclo', id: 'neo-1', titulo: 'Ciclo celular',
      pasos: [
        { di: 'Las drogas citotóxicas dañan el potencial reproductivo de la célula. Por eso conviene mirar el ciclo. G uno: la célula crece y se prepara.', fase: 'G1' },
        { di: 'S: síntesis de ADN, dieciocho a veinte horas.', fase: 'S' },
        { di: 'G dos: revisión del ADN.', fase: 'G2' },
        { di: 'Y M: mitosis, treinta a sesenta minutos. Los tumores que crecen más rápido responden mejor: leucemias, linfomas y testículo responden más que colon o páncreas.', fase: 'M', retener: ['Crecen rápido: responden mejor'] },
      ],
    },
    {
      tipo: 'ciclo', id: 'neo-2', titulo: 'Qué droga actúa en cada fase',
      pasos: [
        { di: 'Hay dos grandes grupos. Los no específicos de fase matan a la célula en cualquier momento, y dependen de la dosis: alquilantes, nitrosoureas, antibióticos y platino.', todas: true, drogas: ['Alquilantes', 'Nitrosoureas', 'Antibióticos', 'Platino'], retener: ['No específicos: dosis dependientes'] },
        { di: 'Los específicos dependen de una fase. En G uno: esteroides y asparaginasa.', fase: 'G1', drogas: ['Esteroides', 'Asparaginasa'] },
        { di: 'En fase S: antimetabolitos.', fase: 'S', drogas: ['Metotrexato', '5-Fluorouracilo', 'Cladribina'], retener: ['Fase S: antimetabolitos'] },
        { di: 'En G dos: etopósido y bleomicina.', fase: 'G2', drogas: ['Etopósido', 'Bleomicina'], retener: ['G2: etopósido, bleomicina'] },
        { di: 'Y en mitosis: alcaloides de la vinca, taxanos y podofilotoxinas.', fase: 'M', drogas: ['Vincristina', 'Paclitaxel', 'Podofilotoxinas'], retener: ['M: vinca y taxanos'] },
      ],
    },
    {
      tipo: 'flujo', id: 'neo-3', titulo: 'Mecanismos sobre el ADN',
      nodos: [
        { id: 'adn', x: 480, y: 300, t: 'ADN', w: 180 },
        { id: 'alq', x: 170, y: 110, t: 'Alquilantes', w: 200, a: 'citotoxico' },
        { id: 'r1', x: 170, y: 300, t: 'Enlaces cruzados y roturas', w: 240 },
        { id: 'ant', x: 790, y: 110, t: 'Antraciclinas', w: 200, a: 'citotoxico' },
        { id: 'r2', x: 790, y: 300, t: 'Intercala y bloquea transcripción', w: 250 },
        { id: 'met', x: 170, y: 490, t: 'Antimetabolitos', w: 220, a: 'citotoxico' },
        { id: 'r3', x: 480, y: 490, t: 'Sin síntesis de ácidos nucleicos', w: 260 },
        { id: 'top', x: 790, y: 490, t: 'Etopósido: topoisomerasa II', w: 260, a: 'citotoxico' },
      ],
      lazos: [{ a: 'alq', b: 'r1' }, { a: 'r1', b: 'adn' }, { a: 'ant', b: 'r2' }, { a: 'r2', b: 'adn' }, { a: 'met', b: 'r3' }, { a: 'r3', b: 'adn' }, { a: 'top', b: 'adn', t: 'Roturas dobles' }],
      pasos: [
        { di: 'Alquilantes: moléculas muy reactivas que se unen covalentemente con un grupo alquilo a los ácidos nucleicos. Dan error de lectura, enlaces cruzados y roturas. Ejemplo que piden: ciclofosfamida.', ver: ['adn', 'alq', 'r1'], retener: ['Ciclofosfamida'] },
        { di: 'Antibióticos antitumorales: se unen a los pares de bases de manera intercalada y bloquean la transcripción. Ejemplo: doxorrubicina. La bleomicina forma especies reactivas de oxígeno y daña directo.', ver: ['ant', 'r2'], retener: ['Doxorrubicina', 'Bleomicina'] },
        { di: 'Antimetabolitos: interfieren con la síntesis de ácidos nucleicos. Análogo de ácido fólico: metotrexato. Pirimidinas: cinco fluorouracilo. Purinas: cladribina.', ver: ['met', 'r3'], retener: ['Metotrexato', '5-Fluorouracilo', 'Cladribina'] },
        { di: 'Y epipodofilotoxinas, como etopósido: inhiben la topoisomerasa dos y evitan que la célula entre en mitosis. Producen roturas dobles.', ver: ['top'], retener: ['Etopósido'] },
      ],
    },
    {
      tipo: 'flujo', id: 'neo-4', titulo: 'Vinca contra taxanos',
      nodos: [
        { id: 't', x: 170, y: 300, t: 'Tubulina', w: 180 },
        { id: 'm', x: 480, y: 300, t: 'Microtúbulo', w: 200 },
        { id: 'h', x: 790, y: 300, t: 'Huso mitótico', w: 200 },
        { id: 'v', x: 320, y: 110, t: 'Vincristina', w: 200, a: 'citotoxico' },
        { id: 'p', x: 640, y: 500, t: 'Paclitaxel', w: 200, a: 'citotoxico' },
      ],
      lazos: [{ a: 't', b: 'm', t: 'Ensamblaje' }, { a: 'm', b: 'h' }, { a: 'v', b: 'm', inhibe: true, t: 'Impide armar' }, { a: 'p', b: 'm', inhibe: true, t: 'Impide desarmar' }],
      pasos: [
        { di: 'La tubulina se ensambla en microtúbulos, que forman el huso mitótico.', ver: ['t', 'm', 'h'] },
        { di: 'Vincristina y vinblastina se unen a la tubulina e inhiben el ensamblaje. El huso se disuelve.', ver: ['v'], luz: ['v'], retener: ['Vinca: inhibe ensamblaje'] },
        { di: 'Paclitaxel y docetaxel hacen lo contrario: se unen a los microtúbulos ya formados y los estabilizan. Como no se desarman, la división se detiene.', ver: ['p'], luz: ['p'], retener: ['Taxanos: estabilizan'] },
      ],
    },
    {
      tipo: 'pizarra', id: 'neo-5', titulo: 'Toxicidad según el tiempo',
      lineas: [
        { lista: ['Náuseas y vómitos', 'Flebitis', 'Anafilaxia'], resultado: 'Inmediata: horas a días', a: 'antagonista' },
        { lista: ['Leucopenia', 'Alopecia', 'Estomatitis', 'Diarrea'], resultado: 'Temprana: días a semanas', a: 'modulador' },
        { lista: ['Anemia', 'Aspermia', 'Fibrosis pulmonar'], resultado: 'Diferida: semanas a meses', a: 'precursor' },
        { lista: ['Esterilidad', 'Leucemia aguda', 'Linfomas'], resultado: 'Tardía: meses a años', a: 'citotoxico' },
      ],
      pasos: [
        { di: 'El trabajo práctico pide toxicidad inmediata, temprana, diferida y tardía. Inmediata: náuseas y vómitos, flebitis y anafilaxia.', hasta: 0 },
        { di: 'Temprana: leucopenia, trombocitopenia, alopecia, estomatitis y diarrea.', hasta: 1 },
        { di: 'Diferida: anemia, aspermia y fibrosis pulmonar.', hasta: 2 },
        { di: 'Tardía: esterilidad y carcinogénesis, como leucemia aguda y linfomas.', hasta: 3 },
      ],
    },
  ],
  preguntas: [],
  desarrollos: [],
};
