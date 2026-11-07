import type { Capitulo } from '../tipos';
import { dev, g, hacerFicha, mcGen, mcReal, mn, par, vfGen, vfReal } from '../h';

const f = hacerFicha('col');

export const colinergico: Capitulo = {
  id: 'col',
  n: 1,
  titulo: 'Colinérgicos',
  objetivo: 'Separar agonistas, anticolinesterásicos, antimuscarínicos y bloqueantes neuromusculares sin dudar.',
  avisos: [
    'En los exámenes reales piden seguido: 2 antagonistas colinérgicos y 4 efectos anticolinérgicos, y 5 efectos de la acetilcolina en distintos tejidos.',
    'Un error repetido en los apuntes: poner fisostigmina o malatión como antagonistas. Son anticolinesterásicos y hacen lo contrario.',
  ],
  mapa: [
    { titulo: 'Aumentan la acción de la acetilcolina', grupos: ['col-agom', 'col-rev', 'col-irr'] },
    { titulo: 'Bloquean a la acetilcolina', grupos: ['col-atr', 'col-esp', 'col-bro', 'col-nm'] },
  ],
  grupos: [
    g('col-agom', 'Agonistas muscarínicos', 'agonista', 'Imitan a la ACh en el receptor M', { regla: 'Se unen al receptor muscarínico y lo activan, como la acetilcolina.' }),
    g('col-rev', 'Anticolinesterásicos reversibles', 'inhibidor', '↑ ACh. Miastenia gravis', { regla: 'Inhiben la acetilcolinesterasa de forma reversible: la ACh dura más en la sinapsis.', patron: 'La terminación -stigmina marca a este grupo.', excepcion: 'Edrofonio también es reversible y no termina en -stigmina.' }),
    g('col-irr', 'Anticolinesterásicos irreversibles', 'inhibidor', 'Crisis colinérgica', { regla: 'Organofosforados: se unen de forma covalente a la acetilcolinesterasa y la anulan.' }),
    g('col-atr', 'Antimuscarínico clásico', 'antagonista', '↑ FC, midriasis, efectos anticolinérgicos', { regla: 'Bloqueante competitivo no selectivo de los receptores M. Es el modelo de todo el grupo.' }),
    g('col-esp', 'Antimuscarínicos antiespasmódicos', 'antagonista', 'Antiespasmódicos', { regla: 'Mismo mecanismo: bloqueo competitivo del receptor M. Relajan el músculo liso.' }),
    g('col-bro', 'Antimuscarínicos broncodilatadores', 'antagonista', 'Broncodilatación', { regla: 'Mismo mecanismo, usados en el aparato respiratorio.', patron: 'La terminación -tropio marca a los inhalados.' }),
    g('col-nm', 'Bloqueantes neuromusculares', 'bloqueante', 'Parálisis del músculo esquelético, para intubar', { regla: 'Bloquean el receptor nicotínico de la placa motora de forma reversible.', patron: 'La terminación -curio o -curonio marca a muchos.', excepcion: 'Succinilcolina es despolarizante y no termina así.' }),
  ],
  farmacos: [
    f('acetilcolina', 'Acetilcolina', 'col-agom', 'agonista', 'Receptores M y N', 'Agonista endógeno de receptores muscarínicos y nicotínicos', 'Efectos parasimpáticos y contracción del músculo esquelético', 1, ['COL 2', 'COL 14', 'DES 7'], {
      sinonimos: ['ACh', 'ACH'], clave: 'No es selectiva: activa M y N, aunque tiene más afinidad por M.', selectividad: 'No selectiva', discrepancia: 'd-ach',
    }),
    f('betanecol', 'Betanecol', 'col-agom', 'agonista', 'Receptor M', 'Agonista colinérgico (éster de colina) de los receptores muscarínicos', 'Trata la retención urinaria', 1, ['PIZ', 'COL 14'], {
      clave: 'Tiene "beta" en el nombre pero no es adrenérgico.', confusiones: ['atenolol'], selectividad: 'Muscarínico',
    }),
    f('pilocarpina', 'Pilocarpina', 'col-agom', 'agonista', 'Receptor M', 'Agonista selectivo de receptores muscarínicos', 'Miosis y aumento de saliva', 1, ['PIZ', 'COL 14'], {
      indicaciones: 'Uso como miótico en oftalmología', selectividad: 'Selectivo M',
    }),
    f('metacolina', 'Metacolina', 'col-agom', 'agonista', 'Receptores M y N', 'Éster de colina, agonista colinérgico', 'Efecto colinérgico', 3, ['COL 14']),
    f('carbacol', 'Carbacol', 'col-agom', 'agonista', 'Receptores M y N', 'Éster de colina, agonista colinérgico no selectivo', 'Efecto colinérgico', 3, ['COL 14']),
    f('muscarina', 'Muscarina', 'col-agom', 'agonista', 'Receptor M', 'Agonista selectivo del receptor muscarínico', 'Da nombre al receptor', 3, ['COL 14']),
    f('oxotremorina', 'Oxotremorina', 'col-agom', 'agonista', 'Receptor M', 'Agonista selectivo del receptor muscarínico', 'Uso experimental', 4, ['COL 14']),
    f('nicotina', 'Nicotina', 'col-agom', 'agonista', 'Receptor N', 'Agonista selectivo del receptor nicotínico', 'Da nombre al receptor', 3, ['COL 14']),
    f('dmpp', 'Dimetilfenilpiperazinio', 'col-agom', 'agonista', 'Receptor N', 'Agonista selectivo del receptor nicotínico', 'Uso experimental', 4, ['COL 14'], { sinonimos: ['DMPP'] }),

    f('fisostigmina', 'Fisostigmina', 'col-rev', 'inhibidor', 'Acetilcolinesterasa', 'Inhibidor reversible de la acetilcolinesterasa (sustrato)', '↑ ACh en la sinapsis', 1, ['PIZ', 'COL 15', 'EXA 9'], {
      clave: 'Anticolinesterásico. Nunca lo pongas como antagonista.', confusiones: ['atropina', 'neostigmina'], discrepancia: 'd-fiso', sinonimos: ['Eserina'],
    }),
    f('neostigmina', 'Neostigmina', 'col-rev', 'inhibidor', 'Acetilcolinesterasa', 'Inhibidor reversible de la acetilcolinesterasa (sustrato)', '↑ ACh. Miastenia gravis', 1, ['PIZ', 'COL 15', 'PRE 10'], {
      indicaciones: 'Miastenia gravis', clave: 'Es la excepción en la lista de irreversibles del preguntero.', confusiones: ['fisostigmina'],
    }),
    f('piridostigmina', 'Piridostigmina', 'col-rev', 'inhibidor', 'Acetilcolinesterasa', 'Inhibidor reversible de la acetilcolinesterasa', '↑ ACh. Miastenia gravis', 2, ['APU 45'], { indicaciones: 'Miastenia gravis' }),
    f('edrofonio', 'Edrofonio', 'col-rev', 'inhibidor', 'Acetilcolinesterasa', 'Inhibidor reversible (no sustrato) de la acetilcolinesterasa', 'Diagnóstico de miastenia gravis', 2, ['COL 15', 'APU 45']),

    f('paration', 'Paratión', 'col-irr', 'inhibidor', 'Acetilcolinesterasa', 'Organofosforado: inhibidor irreversible de la acetilcolinesterasa', 'Crisis colinérgica', 1, ['PIZ', 'COL 15', 'PRE 10'], { variantes: ['Parathion', 'Paration'], clave: 'Insecticida. Intoxica con exceso de efectos parasimpáticos.', confusiones: ['malation'] }),
    f('malation', 'Malatión', 'col-irr', 'inhibidor', 'Acetilcolinesterasa', 'Organofosforado: inhibidor irreversible de la acetilcolinesterasa', 'Crisis colinérgica', 1, ['PIZ', 'COL 15', 'PRE 10'], { variantes: ['Malathion', 'Malation'], clave: 'Un apunte lo pone como antagonista colinérgico: está mal.', discrepancia: 'd-fiso', confusiones: ['paration'] }),
    f('ecotiofato', 'Ecotiofato', 'col-irr', 'inhibidor', 'Acetilcolinesterasa', 'Organofosforado: inhibidor irreversible de la acetilcolinesterasa', 'Crisis colinérgica', 1, ['PIZ', 'COL 15', 'PRE 10'], { variantes: ['Ecotiofosfato'] }),

    f('atropina', 'Atropina', 'col-atr', 'antagonista', 'Receptores M', 'Antagonista competitivo no selectivo de los receptores muscarínicos', 'Aumenta la frecuencia cardíaca', 1, ['PIZ', 'COL 16', 'DES c25', 'DES c18', 'EXA 9'], {
      adversos: 'Midriasis, boca seca, taquicardia, alucinaciones', clave: 'Competitivo, no "no competitivo". No selectivo significa entre M1 a M5.', discrepancia: 'd-atropina', confusiones: ['atracurio', 'fisostigmina'], selectividad: 'No selectiva entre subtipos M',
    }),
    f('hioscina', 'Hioscina', 'col-esp', 'antagonista', 'Receptores M', 'Antagonista no selectivo del receptor colinérgico muscarínico', 'Antiespasmódico', 1, ['PIZ', 'COL 16', 'DES c4', 'DES c17', 'DES c28', 'PRE 23', 'PRE 65'], {
      sinonimos: ['Escopolamina', 'l-hioscina', 'Hiosina'], variantes: ['Hiosina', 'Escapolamina'], clave: 'Hioscina y escopolamina son la misma droga. Es muscarínica, no nicotínica.', discrepancia: 'd-hioscina', selectividad: 'No selectiva entre subtipos M',
    }),
    f('buscapina', 'Buscapina', 'col-esp', 'antagonista', 'Receptores M', 'Antagonista muscarínico. Es butilbromuro de hioscina', 'Antiespasmódico', 1, ['PIZ', 'APU 45'], {
      sinonimos: ['Butilbromuro de hioscina', 'Butilhioscina'], clave: 'Buscapina es una marca, no una droga distinta.',
    }),
    f('oxibutinina', 'Oxibutinina', 'col-esp', 'antagonista', 'Receptores M', 'Antagonista competitivo no selectivo de los receptores muscarínicos', 'Antiespasmódico', 1, ['PIZ', 'COL 16'], { variantes: ['Oxibutina'] }),
    f('propinoxato', 'Propinoxato', 'col-esp', 'antagonista', 'Receptores M', 'Antagonista no selectivo del receptor colinérgico muscarínico', 'Antiespasmódico', 1, ['PIZ', 'COL 16', 'DES c18', 'DES c27'], { sinonimos: ['Propinox'], confusiones: ['propranolol'] }),
    f('ciclopentolato', 'Ciclopentolato', 'col-esp', 'antagonista', 'Receptores M', 'Antagonista competitivo no selectivo de los receptores muscarínicos', 'Midriasis', 3, ['COL 16']),
    f('ipratropio', 'Ipratropio', 'col-bro', 'antagonista', 'Receptores M', 'Antagonista no selectivo del receptor muscarínico', 'Broncodilatación', 1, ['PIZ', 'COL 16', 'DES c26'], { confusiones: ['tiotropio', 'salbutamol'], clave: 'Broncodilata sin ser agonista β2.' }),
    f('tiotropio', 'Tiotropio', 'col-bro', 'antagonista', 'Receptores M', 'Antagonista competitivo no selectivo de los receptores muscarínicos', 'Broncodilatación', 1, ['PIZ', 'COL 16'], { confusiones: ['ipratropio'] }),
    f('biperideno', 'Biperideno', 'col-atr', 'antagonista', 'Receptores M', 'Antagonista muscarínico', 'Anticolinérgico central', 3, ['PRE 13'], { clave: 'Es el intruso de la pregunta de bloqueantes adrenérgicos.', externo: true }),

    f('succinilcolina', 'Succinilcolina', 'col-nm', 'bloqueante', 'Receptor N de la placa', 'Bloqueante neuromuscular: bloquea de forma reversible el receptor nicotínico (despolarizante)', 'Parálisis del músculo esquelético', 1, ['PIZ', 'COL 18', 'DES c17', 'DES c26', 'DES c27', 'APU 46'], {
      variantes: ['Succinil colina', 'Suxametonio'], clave: 'En los cuadros figura como antagonista nicotínico. Si querés sumar, aclará que es despolarizante.', discrepancia: 'd-succi', adversos: 'Apnea prolongada con colinesterasa atípica',
    }),
    f('atracurio', 'Atracurio', 'col-nm', 'bloqueante', 'Receptor N de la placa', 'Bloquea de forma reversible el receptor nicotínico de la placa', 'Parálisis del músculo esquelético', 1, ['PIZ', 'COL 18'], { confusiones: ['atropina'] }),
    f('tubocurarina', 'Tubocurarina', 'col-nm', 'bloqueante', 'Receptor N de la placa', 'Bloquea de forma reversible el receptor nicotínico de la placa', 'Parálisis del músculo esquelético', 1, ['PIZ', 'COL 18', 'APU 46'], { sinonimos: ['Curare'] }),
    f('pancuronio', 'Pancuronio', 'col-nm', 'bloqueante', 'Receptor N de la placa', 'Bloquea de forma reversible el receptor nicotínico de la placa', 'Parálisis del músculo esquelético', 1, ['PIZ', 'COL 18', 'APU 46']),
    f('rocuronio', 'Rocuronio', 'col-nm', 'bloqueante', 'Receptor N de la placa', 'Antagonista competitivo del receptor nicotínico', 'Parálisis del músculo esquelético', 3, ['APU 46']),
    f('vecuronio', 'Vecuronio', 'col-nm', 'bloqueante', 'Receptor N de la placa', 'Antagonista competitivo del receptor nicotínico', 'Parálisis del músculo esquelético', 3, ['APU 46']),
    f('mivacurio', 'Mivacurio', 'col-nm', 'bloqueante', 'Receptor N de la placa', 'Antagonista competitivo del receptor nicotínico', 'Parálisis del músculo esquelético', 3, ['APU 46']),
    f('toxina-botulinica', 'Toxina botulínica', 'col-nm', 'bloqueante', 'Liberación de ACh', 'Inhibe la liberación de acetilcolina', 'Parálisis por falta de liberación', 3, ['COL 4']),
  ],
  mnemotecnias: [
    mn('m-nm', 'col-nm', 'Su atraco entubó al paciente', [['Su', 'Succinilcolina'], ['atraco', 'Atracurio'], ['entubó', 'Tubocurarina'], ['paciente', 'Pancuronio']],
      'Los cuatro bloqueantes neuromusculares de la pizarra, y su uso: intubar.', 'Confundir Atracurio con Atropina: el atraco termina en parálisis, no en taquicardia.'),
    mn('m-irr', 'col-irr', 'Para mal, eco: lo malo deja eco para siempre', [['Para', 'Paratión'], ['mal', 'Malatión'], ['eco', 'Ecotiofato']],
      'Los tres organofosforados y que son irreversibles.', 'Ponerlos como reversibles o, peor, como antagonistas.'),
    mn('m-esp', 'col-esp', 'Hoy escapé buscando oxígeno propio', [['Hoy', 'Hioscina'], ['escapé', 'Escopolamina'], ['buscando', 'Buscapina'], ['oxígeno', 'Oxibutinina'], ['propio', 'Propinoxato']],
      'Los cinco antiespasmódicos de la pizarra. Escapaste del retorcijón.', 'Olvidar nombres de una lista larga. Recordá que hoy y escapé son la misma droga.'),
    mn('m-bro', 'col-bro', 'Mi tío Ipra respira hondo', [['tío', 'Tiotropio'], ['Ipra', 'Ipratropio'], ['respira', 'Broncodilatación']],
      'Los dos antimuscarínicos broncodilatadores.', 'Creer que todo broncodilatador es agonista β2.'),
    mn('m-pilo', 'col-agom', 'Pilocarpina: pupila chiquita y pileta de saliva. Betanecol: la vejiga se vacía', [['pupila chiquita', 'Pilocarpina da miosis'], ['pileta de saliva', 'Pilocarpina aumenta la saliva'], ['vejiga', 'Betanecol trata la retención urinaria']],
      'Los dos agonistas muscarínicos y su efecto.', 'Leer "beta" en betanecol y pensar en adrenérgicos.'),
  ],
  parejas: [
    par('atropina', 'fisostigmina', 'Un apunte real puso a la fisostigmina como antagonista colinérgico.', 'Bloquea el receptor: menos efecto de ACh.', 'Frena la enzima que degrada: más ACh.', 'Anticolinérgico baja la señal. Anticolinesterásico la sube.'),
    par('atropina', 'atracurio', 'Empiezan igual y ambos "bloquean" algo colinérgico.', 'Receptor muscarínico: taquicardia, midriasis.', 'Receptor nicotínico de la placa: parálisis.', 'Atracurio tiene -curio, de curare: parálisis.'),
    par('neostigmina', 'paration', 'Los dos inhiben la acetilcolinesterasa.', 'Reversible. Se usa para miastenia.', 'Irreversible. Intoxica.', '-stigmina se va. Organofosforado se queda.'),
    par('ipratropio', 'salbutamol', 'Mismo efecto, mecanismo opuesto en la lógica.', 'Bloquea M: quita la constricción colinérgica.', 'Activa β2: relaja el bronquio.', 'Uno saca el freno, otro aprieta el acelerador.'),
    par('propinoxato', 'propranolol', 'Nombres parecidos, sistemas distintos.', 'Antimuscarínico, antiespasmódico.', 'β-bloqueante no selectivo.', '-olol es β-bloqueante. -oxato acá es retorcijón.'),
    par('betanecol', 'atenolol', '"Beta" en el nombre confunde con adrenérgicos.', 'Agonista muscarínico.', 'Bloqueante β1.', 'Betanecol no toca receptores β.'),
    par('ipratropio', 'tiotropio', 'Hermanos de la misma familia.', 'Antimuscarínico inhalado.', 'Antimuscarínico inhalado.', 'Acá no hay trampa: en el examen sirven los dos.'),
  ],
  escenas: [
    {
      tipo: 'sinapsis', id: 'col-1', titulo: 'Cómo funciona la sinapsis colinérgica', nt: 'ACh', precursor: 'Colina + acetil-CoA',
      receptores: [{ n: 'Muscarínico', k: 'g' }, { n: 'Nicotínico', k: 'c' }], enzima: { n: 'AChE', en: 'hendidura' },
      pasos: [
        { di: 'Arrancamos por lo normal, porque cada fármaco de este capítulo toca una parte de este dibujo. Arriba está la terminal nerviosa. Acá, la colina acetiltransferasa une colina con acetil coenzima A y forma acetilcolina, que se guarda en vesículas.', retener: ['Colina acetiltransferasa'] },
        { di: 'Cuando llega el potencial de acción entra calcio, la vesícula se fusiona y libera acetilcolina a la hendidura. Esa liberación depende de calcio, y la toxina botulínica la impide.', liberar: true, nivel: 0.35, retener: ['Liberación Ca++ dependiente', 'Toxina botulínica la inhibe'] },
        { di: 'La acetilcolina activa dos familias de receptores: los muscarínicos, acoplados a proteína G, y los nicotínicos, que son canales iónicos. Tiene más afinidad por los muscarínicos, pero activa los dos. Por eso no es selectiva.', liberar: true, nivel: 0.7, activos: [0, 1], efecto: 'Activa M y N: no es selectiva', tono: 'mas', retener: ['M: proteína G', 'N: canal iónico'] },
        { di: 'Y así termina su efecto: en la hendidura está la acetilcolinesterasa, que la parte en acetato y colina. Esa enzima es uno de los blancos más importantes del capítulo.', liberar: false, nivel: 0.25, activos: [], efecto: 'La acetilcolinesterasa la degrada', tono: 'neutro', retener: ['Acetilcolinesterasa: acetato + colina'] },
      ],
    },
    {
      tipo: 'cadenas', id: 'col-2', titulo: 'Receptores: quién hace qué',
      filas: [
        { chips: ['M2 y M4', 'Gi', '↓ AC', '↑ salida de K+'], color: 'antagonista', nota: 'Corazón: frena' },
        { chips: ['M1, M3 y M5', 'Gq', '↑ PLC', 'IP3 y DAG'], color: 'agonista', nota: 'Músculo liso y glándulas: contrae y secreta' },
        { chips: ['Nicotínico', 'Pentámero', 'Poro catiónico', 'Despolariza'], color: 'modulador', nota: 'Placa motora y ganglios autonómicos' },
      ],
      pasos: [
        { di: 'Los muscarínicos M2 y M4 van con proteína G inhibitoria. El M2 está en el miocardio: abre canales de potasio, hiperpolariza y baja la frecuencia cardíaca. Por eso la acetilcolina frena el corazón.', fila: 0, retener: ['M2: miocardio', 'Bradicardia'] },
        { di: 'Los M1, M3 y M5 van con proteína Gq, que activa la fosfolipasa C y forma IP3 y DAG. El M3 está en músculo liso y glándulas: contrae y hace secretar.', fila: 1, retener: ['M3: músculo liso y glándulas', 'Gq: IP3 y DAG'] },
        { di: 'El nicotínico es otra cosa: un pentámero con un poro central. Entran cationes y la célula se despolariza. Está en la placa motora y en los ganglios autonómicos, tanto simpáticos como parasimpáticos.', fila: 2, retener: ['N: pentámero', 'Placa motora y ganglios'] },
      ],
    },
    {
      tipo: 'organos', id: 'col-3', titulo: 'Efectos de la acetilcolina en el cuerpo',
      pasos: [
        { di: 'Esto te lo piden casi textual: cinco efectos de la acetilcolina en distintos tejidos. En el ojo, contrae la pupila: miosis.', organos: [{ o: 'ojo', t: 'Miosis', c: 'agonista' }] },
        { di: 'En las glándulas, más secreción: saliva y lágrimas.', organos: [{ o: 'glandula', t: 'Más secreción', c: 'agonista' }] },
        { di: 'En el corazón, baja la frecuencia. Bradicardia.', organos: [{ o: 'corazon', t: 'Bradicardia', c: 'agonista' }] },
        { di: 'En el tubo digestivo, aumenta la motilidad.', organos: [{ o: 'intestino', t: 'Más motilidad', c: 'agonista' }] },
        { di: 'En la vejiga contrae el detrusor y ayuda a orinar. Por eso el betanecol sirve en la retención urinaria.', organos: [{ o: 'vejiga', t: 'Contrae la vejiga', c: 'agonista' }], retener: ['Betanecol: retención urinaria'] },
        { di: 'Y en el músculo esquelético, por el receptor nicotínico, contracción. Con esos seis ya te sobra para la pregunta.', organos: [{ o: 'musculo', t: 'Contracción (N)', c: 'agonista' }] },
      ],
    },
    {
      tipo: 'sinapsis', id: 'col-4', titulo: 'Anticolinesterásicos: más acetilcolina', nt: 'ACh',
      receptores: [{ n: 'Muscarínico', k: 'g' }, { n: 'Nicotínico', k: 'c' }], enzima: { n: 'AChE', en: 'hendidura' },
      pasos: [
        { di: 'Ahora sí, los fármacos. Si bloqueo la enzima que degrada a la acetilcolina, la acetilcolina se acumula. Eso hacen los anticolinesterásicos. Ojo con la palabra: no son antagonistas.', liberar: true, nivel: 0.4, activos: [0, 1], retener: ['Anticolinesterásico ≠ antagonista'] },
        { di: 'Los reversibles son fisostigmina y neostigmina. Inhiben la enzima un rato y se sueltan. Aumentan la acetilcolina, y por eso se usan en miastenia gravis.', liberar: true, nivel: 0.8, activos: [0, 1], drogas: [{ n: 'Neostigmina', a: 'inhibidor', en: 'e' }], efecto: 'Reversible: más ACh, miastenia gravis', tono: 'mas', retener: ['Fisostigmina', 'Neostigmina'] },
        { di: 'Los irreversibles son los organofosforados: paratión, malatión y ecotiofato. Se pegan a la enzima con unión covalente y no se sueltan. La acetilcolina sube sin control y aparece la crisis colinérgica.', liberar: true, nivel: 1, activos: [0, 1], drogas: [{ n: 'Paratión', a: 'inhibidor', en: 'e' }], efecto: 'Irreversible: crisis colinérgica', tono: 'menos', retener: ['Paratión', 'Malatión', 'Ecotiofato'] },
      ],
    },
    {
      tipo: 'sinapsis', id: 'col-5', titulo: 'Antimuscarínicos: bloquear el receptor M', nt: 'ACh',
      receptores: [{ n: 'Muscarínico', k: 'g' }, { n: 'Nicotínico', k: 'c' }], enzima: { n: 'AChE', en: 'hendidura' },
      pasos: [
        { di: 'Lo opuesto: dejo que haya acetilcolina, pero le tapo el receptor. La atropina compite por el sitio muscarínico. Es competitiva y no selectiva: no elige entre M1 y M5. Ese no selectiva es entre subtipos muscarínicos, no significa que bloquee nicotínicos.', liberar: true, nivel: 0.6, activos: [1], drogas: [{ n: 'Atropina', a: 'antagonista', en: 'r0' }], efecto: 'Competitiva y no selectiva entre subtipos M', tono: 'menos', retener: ['Atropina', 'Bloqueo competitivo'] },
        { di: 'La misma lógica vale para hioscina, escopolamina, oxibutinina y propinoxato, que se usan como antiespasmódicos. Y para ipratropio y tiotropio, que se inhalan y broncodilatan.', liberar: true, nivel: 0.6, activos: [1], drogas: [{ n: 'Hioscina', a: 'antagonista', en: 'r0' }], efecto: 'Antiespasmódicos y broncodilatadores', tono: 'menos', retener: ['Hioscina = escopolamina', 'Ipratropio', 'Tiotropio'] },
      ],
    },
    {
      tipo: 'organos', id: 'col-6', titulo: 'Efectos anticolinérgicos',
      pasos: [
        { di: 'Si bloqueo el receptor muscarínico, aparece lo contrario de lo que vimos. Esta lista también la piden: cuatro efectos anticolinérgicos. Ojo: midriasis y parálisis de la acomodación, con fotofobia.', organos: [{ o: 'ojo', t: 'Midriasis', c: 'antagonista' }] },
        { di: 'Boca seca, porque baja la secreción.', organos: [{ o: 'glandula', t: 'Boca seca', c: 'antagonista' }] },
        { di: 'Taquicardia. Ese es el efecto que la pizarra le anota a la atropina.', organos: [{ o: 'corazon', t: 'Taquicardia', c: 'antagonista' }] },
        { di: 'En los bronquios, menos secreción y broncodilatación.', organos: [{ o: 'bronquio', t: 'Broncodilatación', c: 'antagonista' }] },
        { di: 'Menos motilidad gastrointestinal.', organos: [{ o: 'intestino', t: 'Menos motilidad', c: 'antagonista' }] },
        { di: 'Dilatación de uréteres y vejiga. Por eso están contraindicados en la retención urinaria aguda y en la hipertrofia prostática.', organos: [{ o: 'vejiga', t: 'Retiene orina', c: 'antagonista' }], retener: ['Contraindicados: glaucoma, íleo paralítico, HPB, taquiarritmias'] },
        { di: 'Piel seca y caliente, porque se frena el sudor.', organos: [{ o: 'piel', t: 'Piel seca y caliente', c: 'antagonista' }] },
        { di: 'Y en el sistema nervioso central: excitación, desorientación y alucinaciones.', organos: [{ o: 'cerebro', t: 'Alucinaciones', c: 'antagonista' }] },
      ],
    },
    {
      tipo: 'sinapsis', id: 'col-7', titulo: 'Bloqueantes neuromusculares', nt: 'ACh',
      receptores: [{ n: 'Nicotínico', k: 'c' }],
      pasos: [
        { di: 'Última familia. En la placa motora el receptor es nicotínico. Si lo bloqueo de forma reversible, el músculo esquelético no recibe la orden y se paraliza. Eso se usa para intubar.', liberar: true, nivel: 0.6, drogas: [{ n: 'Atracurio', a: 'bloqueante', en: 'r0' }], efecto: 'Parálisis del músculo esquelético', tono: 'menos', retener: ['Receptor N de la placa'] },
        { di: 'Son succinilcolina, atracurio, tubocurarina y pancuronio. La succinilcolina es la distinta: es despolarizante. Atracurio y tubocurarina compiten con la acetilcolina.', liberar: true, nivel: 0.6, drogas: [{ n: 'Succinilcolina', a: 'bloqueante', en: 'r0' }], efecto: 'Su atraco entubó al paciente', tono: 'neutro', retener: ['Succinilcolina', 'Atracurio', 'Tubocurarina', 'Pancuronio'] },
      ],
    },
    {
      tipo: 'pizarra', id: 'col-8', titulo: 'La pizarra colinérgica',
      lineas: [
        { lista: ['Betanecol', 'Pilocarpina'], resultado: 'Agonistas muscarínicos', a: 'agonista' },
        { lista: ['Fisostigmina', 'Neostigmina'], resultado: 'Inhiben AChE, reversibles', a: 'inhibidor' },
        { lista: ['Paratión', 'Malatión', 'Ecotiofato'], resultado: 'Inhiben AChE, irreversibles', a: 'inhibidor' },
        { lista: ['Atropina', 'Hioscina', 'Oxibutinina', 'Propinoxato'], resultado: 'Bloquean M', a: 'antagonista' },
        { lista: ['Ipratropio', 'Tiotropio'], resultado: 'Bloquean M y broncodilatan', a: 'antagonista' },
        { lista: ['Succinilcolina', 'Atracurio', 'Tubocurarina', 'Pancuronio'], resultado: 'Bloquean N: parálisis', a: 'bloqueante' },
      ],
      pasos: [
        { di: 'Repasemos con la pizarra. Decilos en voz alta conmigo. Agonistas muscarínicos: betanecol y pilocarpina.', hasta: 0 },
        { di: 'Anticolinesterásicos reversibles: fisostigmina y neostigmina.', hasta: 1 },
        { di: 'Irreversibles: paratión, malatión y ecotiofato.', hasta: 2 },
        { di: 'Bloqueantes muscarínicos: atropina, hioscina, oxibutinina y propinoxato.', hasta: 3 },
        { di: 'Broncodilatadores: ipratropio y tiotropio.', hasta: 4 },
        { di: 'Y bloqueantes neuromusculares: succinilcolina, atracurio, tubocurarina y pancuronio. Ahora andá a la sección de nombres e intentá escribirlos sin mirar.', hasta: 5 },
      ],
    },
  ],
  preguntas: [
    mcReal('col', 'PRE 1', 'Los agonistas colinérgicos NO producen:', ['Salivación', 'Rubicundez', 'Vómito', 'Bradicardia'], [2], [
      'Sí la producen: estimulan glándulas por receptores M3.',
      'Puede aparecer por vasodilatación: no es la opción marcada.',
      'Es la clave del preguntero.',
      'Sí la producen: M2 en el corazón.',
    ], { estado: 'dudosa', nota: 'La clave marca vómito, pero un exceso colinérgico también puede dar vómitos. Respondé la clave si sale igual, y sabé que la pregunta es discutible.' }),
    vfReal('col', 'PRE 3', 'La acetilcolina es un agonista selectivo del receptor muscarínico', false, 'Activa receptores muscarínicos y nicotínicos. La presentación la pone entre los ésteres de colina no selectivos.', { farmacos: ['acetilcolina'] }),
    vfReal('col', 'PRE 9', 'La acetilcolina es un agonista selectivo del receptor muscarínico', false, 'Esta es la misma afirmación de la pregunta 3. El preguntero la marca verdadera acá y falsa allá. Lo correcto es falso: tiene más afinidad por M, pero también activa N.', { estado: 'corregida', claveMaterial: true, nota: 'El preguntero se contradice: pregunta 3 falso, pregunta 9 verdadero.', farmacos: ['acetilcolina'] }),
    vfReal('col', 'PRE 6', 'En el ojo la atropina provoca midriasis y parálisis de la acomodación', true, 'Bloquea M en el esfínter del iris y en el músculo ciliar.', { farmacos: ['atropina'] }),
    mcReal('col', 'PRE 10', 'Los siguientes fármacos son inhibidores irreversibles de la colinesterasa, EXCEPTO:', ['Parathion', 'Malathion', 'Ecotiofosfato', 'Neostigmina'], [3], [
      'Organofosforado, irreversible.', 'Organofosforado, irreversible.', 'Organofosforado, irreversible.', 'Correcta: es reversible.',
    ], { farmacos: ['neostigmina', 'paration', 'malation', 'ecotiofato'] }),
    vfReal('col', 'PRE 23', 'La hioscina es un antagonista selectivo del receptor muscarínico', true, 'Selectivo acá significa que actúa sobre M y no sobre N. Entre subtipos M no distingue: por eso los cuadros dicen "no selectivo". Son dos usos de la misma palabra.', { farmacos: ['hioscina'] }),
    vfReal('col', 'PRE 65', 'La hiosina es un antagonista selectivo del receptor nicotínico', false, 'Es muscarínica.', { farmacos: ['hioscina'] }),
    mcGen('col', 'Un paciente con intoxicación por insecticida llega con miosis, bradicardia y sialorrea. ¿Qué mecanismo explica el cuadro?', ['Bloqueo del receptor muscarínico', 'Inhibición irreversible de la acetilcolinesterasa', 'Bloqueo del receptor nicotínico de la placa', 'Agonismo del receptor β1'], 1, [
      'Daría lo contrario: midriasis y taquicardia.', 'Correcta: los organofosforados acumulan ACh y dan crisis colinérgica.', 'Daría parálisis, sin esos signos muscarínicos.', 'Daría taquicardia.',
    ], { farmacos: ['paration', 'malation'] }),
    mcGen('col', '¿Cuál de estos pares es de antagonistas colinérgicos?', ['Fisostigmina y malatión', 'Atropina e hioscina', 'Betanecol y pilocarpina', 'Neostigmina y atropina'], 1, [
      'Son anticolinesterásicos: aumentan la ACh. Este es el error de un apunte real.', 'Correcta: bloquean el receptor muscarínico.', 'Son agonistas.', 'La neostigmina es anticolinesterásica.',
    ], { farmacos: ['atropina', 'hioscina', 'fisostigmina', 'malation'] }),
    mcGen('col', 'Señalá la INCORRECTA sobre los antimuscarínicos:', ['Producen taquicardia', 'Están contraindicados en glaucoma', 'Aumentan la motilidad gastrointestinal', 'Producen boca seca'], 2, [
      'Es cierto: quitan el freno vagal.', 'Es cierto.', 'Correcta: la disminuyen.', 'Es cierto.',
    ]),
    mcGen('col', '¿Cuál de estos broncodilatadores NO es un agonista β2?', ['Salbutamol', 'Ipratropio', 'Isoproterenol', 'Adrenalina'], 1, [
      'Es agonista β2.', 'Correcta: bloquea receptores muscarínicos.', 'Agonista β.', 'Activa α y β.',
    ], { farmacos: ['ipratropio', 'salbutamol'] }),
    mcGen('col', '¿Qué fármaco produce parálisis del músculo esquelético por actuar en la placa motora?', ['Atropina', 'Propinoxato', 'Pancuronio', 'Pilocarpina'], 2, [
      'Bloquea M, no la placa.', 'Antiespasmódico: músculo liso.', 'Correcta: bloquea el receptor nicotínico.', 'Agonista muscarínico.',
    ], { farmacos: ['pancuronio', 'atropina'] }),
    mcGen('col', 'La neostigmina se usa en miastenia gravis porque:', ['Bloquea el receptor nicotínico', 'Aumenta la ACh disponible en la placa', 'Imita a la ACh en el receptor M', 'Aumenta la liberación de calcio'], 1, [
      'Eso paralizaría más.', 'Correcta: inhibe la acetilcolinesterasa.', 'No es agonista.', 'No actúa por calcio.',
    ], { farmacos: ['neostigmina'] }),
    mcGen('col', '¿Dónde predomina el receptor M2?', ['Músculo liso bronquial', 'Glándulas salivales', 'Miocardio', 'Placa motora'], 2, [
      'Es M3.', 'Es M3.', 'Correcta.', 'Es nicotínico.',
    ]),
    vfGen('col', 'Hioscina y escopolamina son la misma droga', true, 'La presentación dice escopolamina (l-hioscina).', ['hioscina']),
    vfGen('col', 'El betanecol es un agonista β adrenérgico', false, 'Es un agonista muscarínico: el nombre engaña.', ['betanecol']),
    vfGen('col', 'Los organofosforados inhiben la acetilcolinesterasa de forma irreversible', true, 'Unión covalente: por eso producen crisis colinérgica.', ['paration']),
    vfGen('col', 'La liberación de acetilcolina es independiente del calcio', false, 'Es dependiente de calcio. Algunos antibióticos la disminuyen compitiendo con el calcio.'),
  ],
  desarrollos: [
    dev('col', 'DES 8, EXA 20', 'Mencione 2 antagonistas colinérgicos y 4 efectos anticolinérgicos', ['Atropina e hioscina', 'Midriasis, taquicardia, boca seca, menor motilidad gastrointestinal'], 'Los antagonistas muscarínicos bloquean en forma competitiva el receptor M. Sin el tono parasimpático aparecen: midriasis y parálisis de la acomodación en el ojo, boca seca, taquicardia, broncodilatación con menor secreción bronquial, menor motilidad gastrointestinal, dilatación de uréteres y vejiga, piel seca y caliente, y en SNC excitación y alucinaciones.', {
      encontrada: 'EXA 20 respondía: Fisostigmina, Malatión', nota: 'Fisostigmina y malatión son anticolinesterásicos: aumentan la ACh. Nunca los pongas como antagonistas.', farmacos: ['atropina', 'hioscina'],
    }),
    dev('col', 'DES 2', 'Mencione 4 efectos de las drogas ANTICOLINÉRGICAS', ['Taquicardia', 'Alucinaciones', 'Dilatación de uréteres', 'Broncodilatación'], 'Sumá si te alcanza el tiempo: midriasis, boca seca, menor motilidad gastrointestinal, piel seca y caliente.'),
    dev('col', 'DES 7, EXA 19', 'Mencione 5 efectos de la ACETILCOLINA sobre diferentes tejidos', ['Bradicardia en el corazón', 'Miosis en el ojo', 'Aumento de secreción glandular', 'Aumento de la motilidad gastrointestinal', 'Contracción del músculo esquelético'], 'En el corazón hiperpolariza por M2 y baja la frecuencia. En músculo liso despolariza y contrae por M3. Estimula la secreción glandular. En la placa motora actúa sobre receptores nicotínicos y contrae el músculo esquelético.', { nota: 'EXA 19 listaba "efector de la unión neuromuscular" y "efector de fibras postganglionares": eso es dónde actúa, no un efecto. Mejor usar esta lista.' }),
    dev('col', 'EXA 9', 'Mencione 2 drogas que actúen sobre neurotransmisión colinérgica e indique su mecanismo de acción', ['Atropina: antagonista competitivo no selectivo de receptores muscarínicos', 'Fisostigmina: inhibidor reversible de la acetilcolinesterasa'], 'La atropina compite con la ACh en M1 a M5. La fisostigmina inhibe la enzima que degrada la ACh y la aumenta en la sinapsis.', {
      encontrada: 'Atropina: antagonista no competitivo', nota: 'La presentación dice que todos son bloqueantes no selectivos competitivos.', farmacos: ['atropina', 'fisostigmina'],
    }),
  ],
};
