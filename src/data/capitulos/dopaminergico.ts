import type { Capitulo } from '../tipos';
import { dev, g, hacerFicha, mcGen, mcReal, mn, par, vfGen, vfReal } from '../h';

const f = hacerFicha('dop');

export const dopaminergico: Capitulo = {
  id: 'dop',
  n: 3,
  titulo: 'Dopaminérgicos',
  objetivo: 'Decir qué sube la dopamina para Parkinson, qué la bloquea para psicosis y por qué.',
  avisos: [
    'Bromocriptina es agonista. Es el error más repetido en las respuestas de estudiantes.',
    'Lógica de todo el capítulo: en el Parkinson falta dopamina en la vía nigroestriada, y en la esquizofrenia sobra en la mesolímbica.',
  ],
  mapa: [
    { titulo: 'Suben la señal dopaminérgica', grupos: ['dop-pre', 'dop-ago', 'dop-enz', 'dop-rec'] },
    { titulo: 'Bajan la señal dopaminérgica', grupos: ['dop-ant', 'dop-dep'] },
  ],
  grupos: [
    g('dop-pre', 'Precursor y liberador', 'precursor', 'Antiparkinsonianos', { regla: 'Dan materia prima o hacen salir más dopamina.' }),
    g('dop-ago', 'Agonistas dopaminérgicos', 'agonista', 'Antiparkinsonianos. ⊖ prolactina', { regla: 'Activan el receptor sin necesitar dopamina. Por eso bajan la prolactina.' }),
    g('dop-enz', 'Inhibidores del metabolismo', 'inhibidor', 'Antiparkinsonianos: ↑ dopamina', { regla: 'Frenan las enzimas que degradan dopamina.', patron: 'La terminación -capona marca a los inhibidores de COMT.' }),
    g('dop-rec', 'Inhiben la recaptación', 'inhibidor', 'Euforia. Psicosis por consumo', { regla: 'Bloquean el transportador DAT.' }),
    g('dop-ant', 'Antagonistas D2', 'antagonista', 'Antipsicótico o antiemético', { regla: 'Bloquean el receptor D2. En SNC, antipsicóticos. Domperidona actúa en la periferia y es antiemética.' }),
    g('dop-dep', 'Vacían vesículas', 'inhibidor', 'Depleción de dopamina', { regla: 'Impiden guardar dopamina en la vesícula.' }),
  ],
  farmacos: [
    f('levodopa', 'Levodopa', 'dop-pre', 'precursor', 'Síntesis de dopamina', 'Precursor de dopamina: atraviesa la BHE', 'Antiparkinsoniano', 1, ['PIZ', 'DOP 30', 'DES c25', 'PRE 86', 'EXA 38'], {
      sinonimos: ['L-DOPA', 'L-Dopa', 'Levo-dopa'], clave: 'La dopamina no cruza la BHE; la levodopa sí. Un apunte dice lo contrario.', discrepancia: 'd-levodopa', confusiones: ['amantadina'], adversos: 'Pérdida de eficacia con el avance neuronal',
    }),
    f('carbidopa', 'Carbidopa', 'dop-pre', 'inhibidor', 'L-AAD periférica', 'Inhibe la L-AAD', 'Se asocia a levodopa', 3, ['ADR 14'], { externo: true }),
    f('amantadina', 'Amantadina', 'dop-pre', 'liberador', 'Liberación de dopamina', 'Aumenta la liberación de dopamina', 'Antiparkinsoniano de primera etapa', 1, ['PIZ', 'DOP 30', 'DES c26', 'PRE 7'], {
      clave: 'Es la que "no actúa sobre receptores dopaminérgicos" del preguntero.', confusiones: ['levodopa'],
    }),
    f('bromocriptina', 'Bromocriptina', 'dop-ago', 'agonista', 'D2', 'Agonista selectivo de los receptores D2', 'Antiparkinsoniano', 1, ['PIZ', 'DOP 31', 'DES c12', 'DES c26', 'DES c28', 'PRE 36'], {
      discrepancia: 'd-bromo', selectividad: 'D2', confusiones: ['haloperidol', 'cabergolina'], clave: 'Agonista. Nunca antagonista.', indicaciones: 'Parkinson, hiperprolactinemia',
    }),
    f('pergolida', 'Pergolida', 'dop-ago', 'agonista', 'D', 'Agonista dopaminérgico no selectivo', 'Disminuye prolactina', 1, ['PIZ', 'DOP 30', 'DOP 31'], { variantes: ['Pergolina'], selectividad: 'No selectivo', discrepancia: 'd-grafias' }),
    f('cabergolina', 'Cabergolina', 'dop-ago', 'agonista', 'D', 'Agonista dopaminérgico no selectivo', 'Disminuye prolactina', 1, ['PIZ', 'DOP 30', 'DOP 31'], { variantes: ['Carbegolina', 'Cabergolida', 'Carbegolida'], selectividad: 'No selectivo', confusiones: ['bromocriptina'], discrepancia: 'd-grafias' }),
    f('selegilina', 'Selegilina', 'dop-enz', 'inhibidor', 'MAO-B', 'Inhibidor irreversible selectivo de la MAO-B', 'Antiparkinsoniano', 1, ['PIZ', 'ADR 12', 'DOP 30', 'DES c1', 'DES c12', 'DES 24', 'PRE 55', 'PRE 37', 'PRE 38'], {
      variantes: ['Seleglina'], selectividad: 'MAO-B', confusiones: ['moclobemida', 'clorgilina', 'entacapona'], clave: 'MAO-B, no COMT ni MAO-A.',
    }),
    f('entacapona', 'Entacapona', 'dop-enz', 'inhibidor', 'COMT', 'Inhibidor reversible de la COMT', '↑ concentración de dopamina', 1, ['PIZ', 'ADR 13', 'DOP 30'], { variantes: ['Entacapone'], confusiones: ['selegilina', 'tolcapona'] }),
    f('tolcapona', 'Tolcapona', 'dop-enz', 'inhibidor', 'COMT', 'Inhibidor reversible de la COMT', '↑ concentración de dopamina', 2, ['ADR 13', 'DOP 30'], { variantes: ['Tolcapone'] }),
    f('cocaina', 'Cocaína', 'dop-rec', 'inhibidor', 'DAT', 'Inhibe la recaptación de dopamina y noradrenalina (DAT)', 'Euforia, simpaticomimético', 2, ['DOP 7', 'DOP 30', 'ADR 12', 'PRE 12'], { confusiones: ['anfetamina'] }),
    f('anfetamina', 'Anfetamina', 'dop-rec', 'liberador', 'DAT y vesícula', 'Aumenta la liberación de dopamina y bloquea DAT', 'Cuadros psicóticos similares a la esquizofrenia', 2, ['DOP 7', 'DOP 25', 'DOP 30', 'ADR 5', 'PRE 12'], { sinonimos: ['Anfetaminas'], confusiones: ['cocaina'] }),
    f('haloperidol', 'Haloperidol', 'dop-ant', 'antagonista', 'D2', 'Antagonista selectivo de los receptores D2', 'Antipsicótico', 1, ['PIZ', 'DOP 30', 'DES c1', 'DES c12', 'DES c18', 'PRE 55', 'PRE 61', 'EXA 35'], {
      selectividad: 'D2', confusiones: ['bromocriptina', 'domperidona', 'labetalol'], clave: 'Puede dar parkinsonismo. Un cuadro le puso antiemético: el efecto de examen es antipsicótico.', discrepancia: 'd-haloperidol', adversos: 'Parkinsonismo, aumento de prolactina',
    }),
    f('clorpromazina', 'Clorpromazina', 'dop-ant', 'antagonista', 'D2', 'Bloquea receptores D2', 'Antipsicótico', 2, ['DOP 30', 'APU 57'], { variantes: ['Clorpromacina'], adversos: 'Parkinsonismo' }),
    f('domperidona', 'Domperidona', 'dop-ant', 'antagonista', 'D2', 'Antagonista de los receptores D2', 'Antiemético y proquinético', 1, ['PIZ', 'DOP 30', 'DES c4', 'DES c27'], {
      confusiones: ['metoclopramida', 'haloperidol'], discrepancia: 'd-domperidona', clave: 'D2, no 5-HT3. La pizarra la agrupa con los 5-HT3.', selectividad: 'D2',
    }),
    f('tetrabenazina', 'Tetrabenazina', 'dop-dep', 'inhibidor', 'Vesícula', 'Impide almacenar dopamina en la vesícula', 'Depleción de dopamina', 3, ['DOP 31']),
  ],
  mnemotecnias: [
    mn('m-bromo', 'dop-ago', 'Bromo con la dopamina: la Bromocriptina la acompaña, no la bloquea', [['Bromo', 'Bromocriptina'], ['con', 'Agonista D2']],
      'Que bromocriptina es agonista.', 'El error de ponerla como antagonista.'),
    mn('m-perg', 'dop-ago', 'Pero Cabe más dopamina: Pergolida y Cabergolina', [['Pero', 'Pergolida'], ['Cabe', 'Cabergolina'], ['más dopamina', 'Agonistas: no selectivos']],
      'Los dos agonistas no selectivos que bajan prolactina.', 'Las grafías raras de la pizarra: carbegolina, pergolina.'),
    mn('m-cap', 'dop-enz', 'Capona captura a la COMT', [['Capona', 'Entacapona y tolcapona'], ['COMT', 'Inhiben COMT']],
      'Los dos inhibidores de COMT.', 'Confundirlos con selegilina, que inhibe MAO-B.'),
    mn('m-sele', 'dop-enz', 'Selegilina selecciona a la B de Bueno para el Parkinson', [['Selecciona', 'Selectiva'], ['B', 'MAO-B']],
      'Selegilina: selectiva de MAO-B.', 'Ponerla como inhibidor de MAO-A o de COMT.'),
    mn('m-ant', 'dop-ant', 'Haloperidol para las alucinaciones. Domperidona para no devolver', [['Halo, alucinaciones', 'Haloperidol: antipsicótico'], ['Domperidona, devolver', 'Antiemético']],
      'Los dos antagonistas D2 de la pizarra.', 'Efectos cruzados.'),
    mn('m-trio', 'dop-pre', 'Le Ama a la dopamina: Levodopa y Amantadina', [['Le', 'Levodopa, precursor'], ['Ama', 'Amantadina, libera']],
      'Los que aumentan dopamina sin ser agonistas.', 'Poner amantadina como agonista de receptor.'),
  ],
  parejas: [
    par('bromocriptina', 'haloperidol', 'Los dos actúan sobre D2 y en sentido contrario.', 'Agonista D2: antiparkinsoniano.', 'Antagonista D2: antipsicótico.', 'Mismo receptor, efecto opuesto: uno da, el otro quita.'),
    par('selegilina', 'entacapona', 'Los dos frenan la degradación de dopamina.', 'Inhibe MAO-B.', 'Inhibe COMT.', 'Capona, COMT.'),
    par('haloperidol', 'domperidona', 'Mismo receptor y distinto uso.', 'SNC: antipsicótico.', 'Periferia: antiemético.', 'Halo a la cabeza. Domperidona al estómago.'),
    par('levodopa', 'amantadina', 'Los dos aumentan dopamina.', 'Precursor: se transforma en dopamina.', 'Aumenta su liberación.', 'Levodopa fabrica, amantadina suelta.'),
    par('bromocriptina', 'cabergolina', 'Agonistas con distinta selectividad.', 'Selectiva D2.', 'No selectiva.', 'Bromo elige D2.'),
    par('cocaina', 'anfetamina', 'Las dos suben dopamina.', 'Inhibe la recaptación.', 'Libera dopamina y además bloquea DAT.', 'Cocaína tapa la salida. Anfetamina empuja afuera.'),
  ],
  escenas: [
    {
      tipo: 'sinapsis', id: 'dop-1', titulo: 'Dopamina: síntesis y terminación', nt: 'DA', precursor: 'Tirosina y L-DOPA', autor: 'D2', transportador: 'DAT',
      receptores: [{ n: 'D1', k: 'g' }, { n: 'D2', k: 'g' }], enzima: { n: 'MAO', en: 'terminal' },
      pasos: [
        { di: 'Misma ruta del capítulo anterior: tirosina, L-DOPA y dopamina. Solo que estas neuronas no tienen dopamina beta hidroxilasa, así que se quedan en dopamina.', liberar: false, nivel: 0, retener: ['Sin DβH'] },
        { di: 'La dopamina se libera y activa dos familias. La familia D1 incluye D1 y D5: activa la adenilato ciclasa y sube el AMP cíclico. La familia D2 incluye D2, D3 y D4: inhibe la adenilato ciclasa.', liberar: true, nivel: 0.6, activos: [0, 1], efecto: 'D1 y D5 suben AMPc. D2, D3 y D4 lo bajan', tono: 'neutro', retener: ['Familia D1: D1 y D5', 'Familia D2: D2, D3 y D4'] },
        { di: 'Hay un autorreceptor presináptico, y siempre es D2. Regula la propia vía. Postsinápticos hay de todos los tipos.', liberar: true, nivel: 0.5, activos: [0, 1], drogas: [{ n: 'DA', a: 'agonista', en: 'ar' }], efecto: 'Autorreceptor: siempre D2', tono: 'neutro', retener: ['Presináptico: D2'] },
        { di: 'Termina por recaptación con el transportador DAT, que depende de sodio y cloro, trabaja en las dos direcciones y se inhibe con cocaína y anfetaminas. Después la degradan la MAO y la COMT hasta ácido homovanílico.', nivel: 0.35, limpia: true, activos: [1], efecto: 'Metabolito final: ácido homovanílico', tono: 'neutro', retener: ['DAT: Na+ y Cl-', 'Ácido homovanílico'] },
      ],
    },
    {
      tipo: 'vias', id: 'dop-2', titulo: 'Las vías dopaminérgicas',
      vias: [
        { id: 'ni', n: 'Nigroestriada', d: 'M410 372 C400 320 410 280 470 250', a: 'precursor' },
        { id: 'li', n: 'Mesolímbica', d: 'M420 372 C440 330 500 330 540 350', a: 'antagonista' },
        { id: 'co', n: 'Mesocortical', d: 'M420 372 C480 280 620 180 700 170', a: 'agonista' },
        { id: 'tu', n: 'Tuberohipofisaria', d: 'M520 340 C520 370 524 390 530 410', a: 'modulador' },
      ],
      pasos: [
        { di: 'Las vías largas son tres: nigroestriada, mesolímbica y mesocortical. Mesopontina no es larga: es intermedia. El preguntero usa esa trampa.', luz: ['ni', 'li', 'co'], retener: ['Mesopontina: intermedia'] },
        { di: 'La nigroestriada va de la sustancia negra al caudado y putamen: controla el movimiento. En el Parkinson se pierde. Los síntomas no aparecen hasta que se perdió cerca del ochenta por ciento de las neuronas.', luz: ['ni'], tag: [{ id: 'ni', t: 'Falta dopamina: Parkinson' }], retener: ['Parkinson: pérdida nigroestriada, 80%'] },
        { di: 'La mesolímbica sale del área tegmental ventral. En la esquizofrenia hay hiperactividad dopaminérgica. Ahí bloqueamos con antipsicóticos.', luz: ['li', 'co'], tag: [{ id: 'li', t: 'Sobra dopamina: esquizofrenia' }], retener: ['Esquizofrenia: hiperactividad'] },
        { di: 'Y la tuberohipofisaria controla la prolactina: la dopamina la inhibe. Si bloqueo dopamina, sube la prolactina. Si la activo con bromocriptina o cabergolina, baja.', luz: ['tu'], tag: [{ id: 'tu', t: 'Dopamina frena la prolactina' }], retener: ['Dopamina ⊖ prolactina'] },
      ],
    },
    {
      tipo: 'sinapsis', id: 'dop-3', titulo: 'Tratar el Parkinson: subir la señal', nt: 'DA', autor: 'D2', transportador: 'DAT',
      receptores: [{ n: 'D1', k: 'g' }, { n: 'D2', k: 'g' }], enzima: { n: 'MAO', en: 'terminal' },
      pasos: [
        { di: 'Falta dopamina. Primera idea: dar materia prima. Levodopa es el precursor. La dopamina no atraviesa la barrera hematoencefálica, pero la levodopa sí, y adentro se transforma.', liberar: true, nivel: 0.3, activos: [1], drogas: [{ n: 'Levodopa', a: 'precursor', en: 'v' }], efecto: 'Precursor, atraviesa la BHE', tono: 'mas', retener: ['Levodopa'] },
        { di: 'Segunda: que salga más. Amantadina aumenta la liberación. Se usa en las primeras etapas.', liberar: true, nivel: 0.6, activos: [1], drogas: [{ n: 'Amantadina', a: 'liberador', en: 'lib' }], efecto: 'Aumenta la liberación', tono: 'mas', retener: ['Amantadina'] },
        { di: 'Tercera: saltar la dopamina y activar el receptor directo. Bromocriptina es agonista selectivo de D2. Pergolida y cabergolina son agonistas no selectivos.', liberar: true, nivel: 0.1, drogas: [{ n: 'Bromocriptina', a: 'agonista', en: 'r1' }], efecto: 'Agonista D2', tono: 'mas', retener: ['Bromocriptina', 'Pergolida', 'Cabergolina'] },
        { di: 'Cuarta: que no se degrade. Selegilina inhibe de forma irreversible y selectiva la MAO B.', liberar: true, nivel: 0.5, activos: [1], drogas: [{ n: 'Selegilina', a: 'inhibidor', en: 'e' }], efecto: 'Inhibe la MAO-B', tono: 'mas', retener: ['Selegilina'] },
        { di: 'Entacapona y tolcapona hacen lo mismo con la otra enzima: inhiben la COMT. Con eso, las cuatro ideas: precursor, liberación, agonismo e inhibir la degradación.', liberar: true, nivel: 0.6, activos: [1], drogas: [{ n: 'Entacapona', a: 'inhibidor', en: 'e' }], efecto: 'Inhibe la COMT', tono: 'mas', retener: ['Entacapona', 'Tolcapona'] },
      ],
    },
    {
      tipo: 'sinapsis', id: 'dop-4', titulo: 'Tratar la psicosis: bajar la señal', nt: 'DA',
      receptores: [{ n: 'D1', k: 'g' }, { n: 'D2', k: 'g' }],
      pasos: [
        { di: 'En la esquizofrenia hay hiperactividad dopaminérgica. Los antipsicóticos bloquean receptores dopaminérgicos en el cerebro.', liberar: true, nivel: 0.9, activos: [0, 1], efecto: 'Hiperactividad', tono: 'mas' },
        { di: 'Haloperidol y clorpromazina son antagonistas D2. Efecto: antipsicótico. Pero si bloqueo D2 también en la vía nigroestriada aparece parkinsonismo, y en la hipófisis sube la prolactina.', liberar: true, nivel: 0.9, activos: [0], drogas: [{ n: 'Haloperidol', a: 'antagonista', en: 'r1' }], efecto: 'Antipsicótico. Adverso: parkinsonismo', tono: 'menos', retener: ['Haloperidol', 'Clorpromazina', 'Parkinsonismo', 'Prolactina alta'] },
        { di: 'Domperidona bloquea el mismo D2, pero se la usa como antiemético y proquinético. Por eso en los cuadros va antagonista D2, antiemético.', liberar: true, nivel: 0.5, activos: [0], drogas: [{ n: 'Domperidona', a: 'antagonista', en: 'r1' }], efecto: 'Antiemético y proquinético', tono: 'menos', retener: ['Domperidona'] },
      ],
    },
    {
      tipo: 'pizarra', id: 'dop-5', titulo: 'La pizarra dopaminérgica',
      lineas: [
        { lista: ['Bromocriptina'], resultado: 'Agonista D2: antiparkinsoniano', a: 'agonista' },
        { lista: ['Pergolida', 'Cabergolina'], resultado: 'Agonistas no selectivos: ⊖ prolactina', a: 'agonista' },
        { lista: ['Haloperidol', 'Domperidona'], resultado: 'Antagonistas D2', a: 'antagonista' },
        { lista: ['Selegilina', 'Entacapona'], resultado: 'Inhiben MAO-B y COMT', a: 'inhibidor' },
        { lista: ['Levodopa', 'Amantadina'], resultado: 'Precursor y liberador', a: 'precursor' },
      ],
      pasos: [
        { di: 'Repetí conmigo. Bromocriptina: agonista D2.', hasta: 0 },
        { di: 'Pergolida y cabergolina: agonistas no selectivos, bajan la prolactina.', hasta: 1 },
        { di: 'Haloperidol y domperidona: antagonistas D2.', hasta: 2 },
        { di: 'Selegilina inhibe la MAO B. Entacapona inhibe la COMT.', hasta: 3 },
        { di: 'Levodopa, precursor. Amantadina, aumenta la liberación.', hasta: 4 },
      ],
    },
  ],
  preguntas: [
    mcReal('dop', 'PRE 4', 'Marque la incorrecta sobre el metabolismo de la dopamina:', ['Es metabolizada por acción de la MAO y COMT', 'El metabolito final es el ácido homovanílico', 'La enzima aldehído-deshidrogenasa actúa en las fases finales del metabolismo', 'La oxidación es exclusiva de la MAO-b'], [3], [
      'Es cierto.', 'Es cierto.', 'Es cierto.', 'Correcta: la dopamina es sustrato de MAO-A y MAO-B.',
    ]),
    mcReal('dop', 'PRE 7', 'Cuál de las siguientes drogas NO actúan sobre los receptores dopaminérgicos:', ['Bromocriptina', 'Domperidona', 'Amantadina', 'Haloperidol'], [2], [
      'Agonista D2.', 'Antagonista D2.', 'Correcta: aumenta la liberación, no toca el receptor.', 'Antagonista D2.',
    ], { farmacos: ['amantadina', 'bromocriptina', 'domperidona', 'haloperidol'] }),
    mcReal('dop', 'PRE 12', 'La correcta sobre la recaptación de dopamina:', ['El transportador permite el flujo de DA solo hacia el interior de la neurona', 'Es inhibido por cocaína y anfetamina', 'El transportador es una proteína dependiente de Na+/Ca+', 'Es exclusiva de neuronas del SNC y tubo digestivo'], [1], [
      'Transporta en ambas direcciones.', 'Correcta.', 'Depende de sodio y cloro.', 'Exclusivo de SNC y retina.',
    ], { farmacos: ['cocaina', 'anfetamina'] }),
    mcReal('dop', 'PRE 34', '¿Cuál NO es una vía dopaminérgica larga?', ['Mesolímbica', 'Mesopontina', 'Nigroestriada', 'Mesocortical'], [1], [
      'Larga.', 'Correcta: es intermedia.', 'Larga.', 'Larga.',
    ]),
    mcReal('dop', 'PRE 27', 'La correcta sobre la acción periférica de la dopamina:', ['Dosis altas actúa sobre la reabsorción renal de Na+, aumentando la diuresis', 'Dosis intermedia produce aumento de la contractilidad cardíaca dependiente de los receptores β1 adrenérgicos', 'Dosis bajas actúa sobre los vasos renales produciendo aumento de la tensión arterial', 'No tiene efectos periféricos a nivel cardíaco'], [1], [
      'Eso pasa a dosis bajas.', 'Correcta.', 'A dosis bajas vasodilata y baja la presión.', 'Sí los tiene.',
    ], { farmacos: ['dopamina'] }),
    vfReal('dop', 'PRE 36', 'La bromocriptina es un antagonista NO selectivo de los receptores dopaminérgicos utilizada en el tratamiento del Parkinson', false, 'Es agonista.', { farmacos: ['bromocriptina'] }),
    vfReal('dop', 'PRE 37', 'La selegilina es un inhibidor selectivo de la enzima MAO-A', false, 'Es de la MAO-B.', { farmacos: ['selegilina'] }),
    vfReal('dop', 'PRE 38', 'La selegilina inhibe el metabolismo de la DA ya que es un inhibidor reversible de la COMT', false, 'Inhibidor selectivo de MAO-B. Disminuye el metabolismo de la dopamina.', { farmacos: ['selegilina'] }),
    mcReal('dop', 'PRE 39', 'La correcta sobre la familia de receptores dopaminérgicos D1:', ['Actúan sobre la adenilatociclasa aumentando AMPc', 'Incluye los receptores D1, D3, D4', 'Aumenta Ca++ intracelular', 'Incluye a los receptores D1, D4, D5'], [0], [
      'Correcta.', 'D3 y D4 son familia D2.', 'No es lo característico.', 'D4 es familia D2.',
    ]),
    vfReal('dop', 'PRE 61', 'El haloperidol es un antagonista de los receptores D2 y se usa como antipsicótico', true, 'Exacto.', { farmacos: ['haloperidol'] }),
    mcGen('dop', '¿Cuál produciría aumento de prolactina?', ['Bromocriptina', 'Cabergolina', 'Haloperidol', 'Pergolida'], 2, [
      'Agonista: la baja.', 'Agonista: la baja.', 'Correcta: bloquea D2 y la dopamina deja de frenarla.', 'Agonista: la baja.',
    ], { farmacos: ['haloperidol', 'bromocriptina'] }),
    mcGen('dop', 'Un paciente con Parkinson inicial recibe un fármaco que aumenta la liberación de dopamina. ¿Cuál es?', ['Selegilina', 'Amantadina', 'Entacapona', 'Haloperidol'], 1, [
      'Inhibe MAO-B.', 'Correcta.', 'Inhibe COMT.', 'Empeoraría el cuadro.',
    ], { farmacos: ['amantadina'] }),
    mcGen('dop', '¿Por qué se da levodopa y no dopamina en el Parkinson?', ['La dopamina se absorbe mejor', 'La levodopa atraviesa la BHE y la dopamina no', 'La levodopa es agonista D2', 'La dopamina inhibe la MAO'], 1, [
      'No es la razón.', 'Correcta.', 'Es precursor.', 'No.',
    ], { farmacos: ['levodopa'] }),
    mcGen('dop', '¿Qué autorreceptor regula la vía dopaminérgica?', ['D1', 'D2', 'D4', 'D5'], 1, [
      'Es postsináptico.', 'Correcta: los presinápticos son D2.', 'Postsináptico.', 'Postsináptico.',
    ]),
    mcGen('dop', 'Inhibidor de COMT:', ['Selegilina', 'Tolcapona', 'Moclobemida', 'Clorgilina'], 1, [
      'MAO-B.', 'Correcta.', 'MAO-A.', 'MAO-A.',
    ], { farmacos: ['tolcapona'] }),
    vfGen('dop', 'Los síntomas parkinsonianos aparecen cuando la pérdida neuronal alcanza el 80%', true, 'Por eso el diagnóstico es tardío.'),
    vfGen('dop', 'La domperidona es agonista dopaminérgico', false, 'Es antagonista D2.', ['domperidona']),
    vfGen('dop', 'Las neuronas dopaminérgicas carecen de dopamina β-hidroxilasa', true, 'Por eso no llegan a noradrenalina.'),
  ],
  desarrollos: [
    dev('dop', 'EXA 6', 'Mencione 3 drogas que actúen sobre la neurotransmisión dopaminérgica e indique su mecanismo de acción', ['Haloperidol: antagonista D2, esquizofrenia', 'Bromocriptina: agonista selectivo D2, Parkinson', 'Selegilina: inhibidor de MAO-B, Parkinson'], 'También sirven levodopa como precursor, amantadina que libera dopamina y entacapona que inhibe COMT.', {
      encontrada: 'Bromocriptina: Inhibe selectivamente Rs D2', nota: 'Es agonista, no inhibidora del receptor.', farmacos: ['haloperidol', 'bromocriptina', 'selegilina'],
    }),
    dev('dop', 'PRE 86, EXA 38', 'Mencione el mecanismo de acción e indicaciones de la L-Dopa', ['Precursor de dopamina que atraviesa la BHE', 'Indicación: Parkinson'], 'La dopamina no cruza la barrera hematoencefálica. La levodopa sí, y en los ganglios basales se convierte en dopamina, compensando la pérdida de la vía nigroestriada.', {
      encontrada: 'Precursor de DOPAMINA, no atraviesa la barrera hematoencefálica', nota: 'Lo que no atraviesa es la dopamina. La levodopa sí.', farmacos: ['levodopa'],
    }),
    dev('dop', 'EXA 35', 'Mecanismo de acción del Haloperidol', ['Antagonista de receptores D2'], 'Bloquea D2 en la vía mesolímbica. Efecto antipsicótico. Adversos: parkinsonismo y aumento de prolactina.', { farmacos: ['haloperidol'] }),
    dev('dop', 'DES 24', 'Complete el cuadro sobre las Monoaminooxidasas: isoformas, sustratos e inhibidor', ['MAO-A: serotonina, adrenalina y noradrenalina. Inhibidores: clorgilina y moclobemida', 'MAO-B: feniletilamina. Inhibidor: selegilina'], 'Tiramina y dopamina son sustratos de ambas. Moclobemida es reversible; clorgilina y selegilina, irreversibles.', { farmacos: ['selegilina', 'clorgilina', 'moclobemida'] }),
  ],
};
