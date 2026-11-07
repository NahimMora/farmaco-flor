import type { Capitulo } from '../tipos';
import { dev, g, hacerFicha, mcGen, mcReal, mn, par, vfGen, vfReal } from '../h';

const f = hacerFicha('adr');

export const adrenergico: Capitulo = {
  id: 'adr',
  n: 2,
  titulo: 'Adrenérgicos',
  objetivo: 'Ubicar cada fármaco en su receptor α o β y decir si lo activa o lo bloquea.',
  avisos: [
    'Lo más repetido en los exámenes reales: β-bloqueantes selectivos y no selectivos, 4 indicaciones y 4 efectos adversos.',
    'Los cuadros piden salbutamol, prazosin, carvedilol, clonidina y dopamina según la dosis.',
  ],
  mapa: [
    { titulo: 'Agonistas', grupos: ['adr-cate', 'adr-alfa', 'adr-beta', 'adr-ind'] },
    { titulo: 'Antagonistas', grupos: ['adr-balfa', 'adr-bns', 'adr-bsel', 'adr-mix'] },
  ],
  grupos: [
    g('adr-cate', 'Catecolaminas', 'agonista', 'Efecto según receptor y dosis', { regla: 'Tienen anillo catecol y activan varios receptores adrenérgicos a la vez.' }),
    g('adr-alfa', 'Agonistas α', 'agonista', 'α1 contrae vasos. α2 frena la liberación', { regla: 'α1 está en el vaso y contrae. α2 es presináptico y frena la liberación de noradrenalina.' }),
    g('adr-beta', 'Agonistas β', 'agonista', 'β1 corazón. β2 bronquio', { regla: 'Activan proteína Gs, que aumenta el AMPc.' }),
    g('adr-ind', 'Actúan sin tocar el receptor', 'liberador', 'Cambian cuánta noradrenalina hay', { regla: 'Desplazan noradrenalina de la vesícula o vacían sus depósitos.' }),
    g('adr-balfa', 'Bloqueantes α', 'antagonista', 'Vasodilatación, antihipertensivos', { regla: 'Bloquean α1 en el vaso. Prazosin baja la presión y tamsulosina se usa en próstata.' }),
    g('adr-bns', 'β-bloqueantes no selectivos', 'antagonista', 'β1 y β2. Bajan la FC', { regla: 'Bloquean β1 y β2.', patron: 'La terminación -olol marca a los β-bloqueantes.', excepcion: 'Labetalol y carvedilol bloquean además α.' }),
    g('adr-bsel', 'β-bloqueantes cardioselectivos', 'antagonista', 'β1. Bajan la FC', { regla: 'Bloquean β1, el receptor del corazón.', patron: 'También terminan en -olol.' }),
    g('adr-mix', 'Bloqueantes α y β', 'antagonista', 'α vasodilata. β baja la FC. Antihipertensivos', { regla: 'Bloquean los dos. El efecto β es 10 veces mayor que el α.' }),
  ],
  farmacos: [
    f('adrenalina', 'Adrenalina', 'adr-cate', 'agonista', 'α1, α2, β1, β2', 'Agonista de receptores α1, α2, β1 y β2', 'Dosis bajas: vasodilatación por β2. Dosis altas: vasoconstricción por α', 1, ['PIZ', 'ADR 17', 'ADR 18'], { sinonimos: ['Epinefrina'], clave: 'Acción dual: efecto Dale.', indicaciones: 'Shock anafiláctico', confusiones: ['noradrenalina'] }),
    f('noradrenalina', 'Noradrenalina', 'adr-cate', 'agonista', 'α1, α2, β1', 'Agonista de receptores α1, α2 y β1', 'Vasoconstricción periférica', 1, ['PIZ', 'ADR 17', 'ADR 18'], { sinonimos: ['Norepinefrina', 'NA'], clave: 'No actúa sobre β2. Baja la FC por descarga vagal refleja.', confusiones: ['adrenalina'] }),
    f('dopamina', 'Dopamina', 'adr-cate', 'agonista', 'D1, β1, α1', 'Dosis bajas D1. Dosis medias β1. Dosis altas α1', 'Bajas: vasodilatación y diuresis. Medias: ↑ contractilidad y FC. Altas: vasoconstricción', 1, ['PIZ', 'ADR 17', 'DOP 19', 'DOP 20', 'DES 11', 'EXA 22'], { sinonimos: ['DA'], clave: 'Pregunta fija: efecto según la dosis.', confusiones: ['dobutamina'] }),
    f('fenilefrina', 'Fenilefrina', 'adr-alfa', 'agonista', 'α1', 'Agonista selectivo de receptores α1', 'Vasoconstricción', 1, ['PIZ', 'ADR 8', 'ADR 18', 'PRE 33', 'EXA 8'], { selectividad: 'α1', confusiones: ['clonidina'] }),
    f('clonidina', 'Clonidina', 'adr-alfa', 'agonista', 'α2', 'Agonista selectivo α2', 'Antihipertensivo central', 1, ['PIZ', 'ADR 8', 'DES c30'], { selectividad: 'α2', clave: 'Es agonista y aun así baja la presión, porque α2 frena la liberación.', confusiones: ['clozapina', 'fenilefrina'] }),
    f('isoproterenol', 'Isoproterenol', 'adr-beta', 'agonista', 'β', 'Agonista β no selectivo', 'Vasodilatación y broncodilatación', 1, ['PIZ', 'ADR 9', 'ADR 17'], { variantes: ['Isoprenalina'] }),
    f('dobutamina', 'Dobutamina', 'adr-beta', 'agonista', 'β1', 'Agonista β1', 'Inotrópico positivo cardíaco', 1, ['PIZ', 'ADR 9'], { confusiones: ['dopamina'], selectividad: 'β1' }),
    f('salbutamol', 'Salbutamol', 'adr-beta', 'agonista', 'β2', 'Agonista β2 adrenérgico', 'Broncodilatador', 1, ['PIZ', 'ADR 9', 'DES c1', 'DES c18', 'DES c25'], { sinonimos: ['Albuterol'], confusiones: ['sotalol', 'ipratropio'], selectividad: 'β2', clave: 'Aparece en casi todos los cuadros reales.' }),
    f('procaterol', 'Procaterol', 'adr-beta', 'agonista', 'β', 'Agonista β', 'Broncodilatador', 3, ['ADR 9'], { discrepancia: 'd-procaterol' }),
    f('tiramina', 'Tiramina', 'adr-ind', 'liberador', 'Vesícula', 'Amina simpaticomimética: desplaza noradrenalina de la vesícula', 'Libera noradrenalina sin calcio', 3, ['ADR 5']),
    f('efedrina', 'Efedrina', 'adr-ind', 'liberador', 'Vesícula', 'Amina simpaticomimética: desplaza noradrenalina de la vesícula', 'Libera noradrenalina sin calcio', 3, ['ADR 5']),
    f('reserpina', 'Reserpina', 'adr-ind', 'inhibidor', 'Transportador vesicular', 'Bloquea el transportador vesicular y deja la noradrenalina expuesta a la MAO', 'Vacía los depósitos', 2, ['ADR 5', 'SER 6']),

    f('prazosin', 'Prazosin', 'adr-balfa', 'antagonista', 'α1', 'Antagonista selectivo α1', 'Antihipertensivo por vasodilatación', 1, ['PIZ', 'ADR 8', 'ADR 21', 'DES c17', 'DES c18', 'DES c25', 'DES c26', 'DES c28'], {
      variantes: ['Prazosina', 'Prazocin'], selectividad: 'α1', discrepancia: 'd-prazosin', confusiones: ['propranolol', 'tamsulosina'], clave: 'Vasodilata. Un cuadro dice vasoconstricción y está mal.',
    }),
    f('tamsulosina', 'Tamsulosina', 'adr-balfa', 'antagonista', 'α1', 'Bloqueante α1 reversible', 'Hiperplasia prostática benigna: favorece la micción', 1, ['PIZ', 'ADR 21', 'PRE 31'], { confusiones: ['prazosin'], discrepancia: 'd-tamsulosina' }),
    f('yohimbina', 'Yohimbina', 'adr-balfa', 'antagonista', 'α2', 'Antagonista α2', 'Bloquea el freno presináptico', 2, ['ADR 8', 'ADR 21']),
    f('fentolamina', 'Fentolamina', 'adr-balfa', 'antagonista', 'α', 'Bloqueante α reversible', 'Feocromocitoma', 2, ['ADR 21', 'APU 52']),
    f('fenoxibenzamina', 'Fenoxibenzamina', 'adr-balfa', 'antagonista', 'α', 'Bloqueante α irreversible', 'Vasodilatación', 2, ['ADR 21']),
    f('beta-cloretilamina', 'β-cloretilamina', 'adr-balfa', 'antagonista', 'α', 'Bloqueante α irreversible', 'Vasodilatación', 4, ['ADR 21']),
    f('ergotamina', 'Ergotamina', 'adr-balfa', 'antagonista', 'α y 5-HT', 'Actúa sobre receptores α y 5-HT', 'Migraña', 3, ['ADR 21']),
    f('lsd', 'LSD', 'adr-balfa', 'antagonista', 'α y 5-HT2', 'Bloqueante α reversible. Agonista 5-HT2', 'Alucinaciones', 3, ['ADR 21', 'SER 16']),

    f('propranolol', 'Propranolol', 'adr-bns', 'antagonista', 'β1 y β2', 'Antagonista no selectivo de los receptores β adrenérgicos', 'Antihipertensivo', 1, ['PIZ', 'ADR 9', 'ADR 22', 'DES c17', 'DES c29', 'PRE 43', 'PRE 85', 'EXA 21'], {
      variantes: ['Propanolol'], selectividad: 'No selectivo', confusiones: ['atenolol', 'prazosin', 'propinoxato'], adversos: 'Broncoconstricción, bradicardia, fatiga, trastornos del sueño', indicaciones: 'HTA, cardiopatía isquémica, ICC, hipertensión portal, migraña, temblor',
    }),
    f('timolol', 'Timolol', 'adr-bns', 'antagonista', 'β1 y β2', 'Antagonista no selectivo de los receptores β', 'Baja la FC', 1, ['PIZ', 'ADR 22', 'PRE 43']),
    f('sotalol', 'Sotalol', 'adr-bns', 'antagonista', 'β1 y β2', 'Antagonista no selectivo de los receptores β', 'Baja la FC', 1, ['PIZ', 'ADR 22', 'PRE 43', 'EXA 36'], { confusiones: ['salbutamol'] }),
    f('butoxamina', 'Butoxamina', 'adr-bns', 'antagonista', 'β2', 'Antagonista β2', 'Uso experimental', 4, ['ADR 9']),
    f('atenolol', 'Atenolol', 'adr-bsel', 'antagonista', 'β1', 'Antagonista selectivo β1', 'Disminuye la FC y la fuerza de contracción', 1, ['PIZ', 'ADR 9', 'ADR 22', 'DES c28', 'PRE 44', 'PRE 85', 'EXA 21'], { selectividad: 'β1', confusiones: ['propranolol', 'betanecol'], clave: 'No tiene acción α: el preguntero lo usa como trampa.' }),
    f('metoprolol', 'Metoprolol', 'adr-bsel', 'antagonista', 'β1', 'Antagonista selectivo β1', 'Disminuye la FC', 1, ['PIZ', 'ADR 9', 'ADR 22', 'PRE 44'], { selectividad: 'β1' }),
    f('esmolol', 'Esmolol', 'adr-bsel', 'antagonista', 'β1', 'Antagonista selectivo β1', 'Disminuye la FC', 2, ['ADR 22', 'PRE 44', 'DES 20'], { selectividad: 'β1' }),
    f('acebutolol', 'Acebutolol', 'adr-bsel', 'antagonista', 'β1', 'Antagonista selectivo β1', 'Disminuye la FC', 2, ['ADR 22', 'PRE 44'], { selectividad: 'β1' }),
    f('carvedilol', 'Carvedilol', 'adr-mix', 'antagonista', 'α y β', 'Antagonista de receptores β y α adrenérgicos', 'Antihipertensivo', 1, ['PIZ', 'ADR 24', 'DES c17', 'DES c30'], { confusiones: ['labetalol'] }),
    f('labetalol', 'Labetalol', 'adr-mix', 'antagonista', 'α y β', 'Antagonista de receptores β y α adrenérgicos', 'Antihipertensivo', 1, ['PIZ', 'ADR 24', 'DES c28'], { discrepancia: 'd-labetalol', confusiones: ['carvedilol', 'haloperidol'], clave: 'Un cuadro le puso antipsicótico: está mal.' }),
  ],
  mnemotecnias: [
    mn('m-b12', 'adr-beta', 'Tenés 1 corazón y 2 pulmones', [['1 corazón', 'β1 está en el corazón'], ['2 pulmones', 'β2 está en el bronquio']],
      'Qué órgano domina cada receptor β, y por qué dobutamina va al corazón y salbutamol al bronquio.', 'Cruzar β1 con β2 al explicar efectos.'),
    mn('m-sal', 'adr-beta', 'Salbutamol salva al asmático. Dobutamina dobla la fuerza del corazón', [['Salva', 'Salbutamol: β2, broncodilatador'], ['Dobla', 'Dobutamina: β1, inotrópico positivo']],
      'Los dos agonistas β que más se preguntan.', 'Confundir dobutamina con dopamina.'),
    mn('m-bns', 'adr-bns', 'El profe timbró solo, sin elegir a nadie', [['profe', 'Propranolol'], ['timbró', 'Timolol'], ['solo', 'Sotalol'], ['sin elegir', 'No selectivos']],
      'Los tres β-bloqueantes no selectivos y que no eligen entre β1 y β2.', 'Mezclarlos con los cardioselectivos.'),
    mn('m-bsel', 'adr-bsel', 'AMÉ A un solo corazón', [['A', 'Atenolol'], ['M', 'Metoprolol'], ['É', 'Esmolol'], ['A', 'Acebutolol'], ['un solo corazón', 'Selectivos β1']],
      'Los cuatro β-bloqueantes cardioselectivos.', 'Poner atenolol como no selectivo.'),
    mn('m-mix', 'adr-mix', 'CARLA tiene los dos', [['CAR', 'Carvedilol'], ['LA', 'Labetalol'], ['los dos', 'Bloquean α y β']],
      'Los dos bloqueantes mixtos.', 'Creer que todo -olol es solo β.'),
    mn('m-alfa', 'adr-balfa', 'Prazosin para la presión. Tamsulosina para la próstata', [['Pra, presión', 'Prazosin: antihipertensivo'], ['Tam, próstata', 'Tamsulosina: hiperplasia prostática']],
      'Los dos bloqueantes α1 de la pizarra y su uso.', 'Prazosin con propranolol, que empiezan parecido.'),
  ],
  parejas: [
    par('propranolol', 'atenolol', 'Pregunta fija: el no selectivo y el selectivo.', 'Bloquea β1 y β2: puede dar broncoconstricción.', 'Bloquea β1: cardioselectivo.', 'Propranolol es para todos. Atenolol va al corazón.'),
    par('salbutamol', 'sotalol', 'Parecen primos y hacen lo contrario.', 'Agonista β2: broncodilata.', 'Bloquea β1 y β2: baja la FC.', 'Termina en -olol con T de Timolol: Sotalol bloquea.'),
    par('clonidina', 'clozapina', 'Empiezan igual y no tienen nada que ver.', 'Agonista α2: antihipertensivo.', 'Antagonista 5-HT2: antipsicótico atípico.', 'Clonidina baja la presión. Clozapina va a psiquiatría.'),
    par('dopamina', 'dobutamina', 'Do, do. Las dos en el corazón.', 'Actúa según la dosis: D1, β1 y α1.', 'Agonista β1 directo.', 'Dobutamina no cambia con la dosis: siempre β1.'),
    par('adrenalina', 'noradrenalina', 'La diferencia es β2.', 'Activa β2: broncodilata y puede vasodilatar.', 'Sin β2: vasoconstricción.', 'A de Asma: adrenalina tiene β2.'),
    par('prazosin', 'propranolol', 'Los dos empiezan con Pr y bajan la presión.', 'Bloquea α1 en el vaso.', 'Bloquea β en el corazón.', 'Prazosin no baja la frecuencia cardíaca.'),
    par('fenilefrina', 'clonidina', 'Los dos son agonistas α y hacen lo contrario con la presión.', 'α1 en el vaso: sube.', 'α2 presináptico: baja.', 'α1 aprieta el vaso. α2 frena la liberación.'),
    par('carvedilol', 'labetalol', 'Hermanos mixtos.', 'Bloquea α y β.', 'Bloquea α y β.', 'Sirven los dos: CARLA.'),
  ],
  escenas: [
    {
      tipo: 'ruta', id: 'adr-1', titulo: 'Síntesis de catecolaminas',
      nodos: ['Tirosina', 'L-DOPA', 'Dopamina', 'Noradrenalina', 'Adrenalina'],
      enzimas: ['Tirosina hidroxilasa', 'L-AAD', 'DA β-hidroxilasa', 'Feniletanolamina N-metil transferasa'],
      pasos: [
        { di: 'Todo empieza con un aminoácido: la tirosina, captada desde la circulación por un transporte dependiente de sodio.', hasta: 0, luz: 0 },
        { di: 'La tirosina hidroxilasa la convierte en L-DOPA. Este es el paso limitante, el que regula toda la cadena.', hasta: 1, luz: 1, retener: ['Tirosina hidroxilasa: paso limitante'] },
        { di: 'La L-aminoácido aromático decarboxilasa, una enzima poco específica, forma dopamina.', hasta: 2, luz: 2 },
        { di: 'Dentro de la vesícula, la dopamina beta hidroxilasa forma noradrenalina. Las neuronas dopaminérgicas no tienen esta enzima: por eso se quedan en dopamina.', hasta: 3, luz: 3, retener: ['DβH: intravesicular'] },
        { di: 'Y en la médula suprarrenal se agrega un metilo y queda adrenalina. Mirá la ventaja: L-DOPA, dopamina y noradrenalina son la misma ruta. Lo vas a volver a usar en el capítulo que sigue.', hasta: 4, luz: 4 },
      ],
    },
    {
      tipo: 'sinapsis', id: 'adr-2', titulo: 'La sinapsis adrenérgica', nt: 'NA', autor: 'α2', transportador: 'Recaptación',
      receptores: [{ n: 'α1', k: 'g' }, { n: 'β', k: 'g' }], enzima: { n: 'MAO', en: 'terminal' },
      pasos: [
        { di: 'La noradrenalina se guarda en vesículas y se libera por exocitosis dependiente de calcio.', liberar: true, nivel: 0.3 },
        { di: 'Afuera activa los receptores alfa uno y beta de la célula siguiente. Ahí aparece el efecto.', liberar: true, nivel: 0.65, activos: [0, 1], efecto: 'Efecto simpático', tono: 'mas' },
        { di: 'Pero también toca un receptor en su propia terminal: el alfa dos. Es un autorreceptor, un freno. Cuando se activa, baja el calcio y se libera menos noradrenalina.', liberar: true, nivel: 0.5, activos: [0, 1], drogas: [{ n: 'NA', a: 'agonista', en: 'ar' }], efecto: 'α2: freno presináptico', tono: 'neutro', retener: ['α2 presináptico: freno'] },
        { di: 'Termina por difusión y recaptación. La cocaína inhibe esa recaptación. Después la noradrenalina es metabolizada por la MAO, en la mitocondria, y por la COMT, en el citoplasma.', nivel: 0.45, limpia: true, activos: [0, 1], drogas: [{ n: 'Cocaína', a: 'inhibidor', en: 't' }], efecto: 'Termina por recaptación, MAO y COMT', tono: 'neutro', retener: ['Recaptación', 'MAO: mitocondria', 'COMT: citoplasma'] },
      ],
    },
    {
      tipo: 'cadenas', id: 'adr-3', titulo: 'Qué proteína G usa cada receptor',
      filas: [
        { chips: ['α1', 'Gq', '↑ IP3 y DAG', 'Contrae'], color: 'agonista', nota: 'Vaso: vasoconstricción' },
        { chips: ['α2', 'Gi', 'Inhibe AC', 'Frena'], color: 'antagonista', nota: 'Pre y postsináptico' },
        { chips: ['β', 'Gs', 'Activa AC', '↑ AMPc'], color: 'precursor', nota: 'β1 corazón, β2 bronquio, β3 tejido adiposo' },
      ],
      pasos: [
        { di: 'Alfa uno va con proteína Gq: aumenta IP3 y DAG, y contrae. Es postsináptico. Agonista: fenilefrina. Antagonista: prazosin.', fila: 0, retener: ['α1: Gq', 'Fenilefrina', 'Prazosin'] },
        { di: 'Alfa dos va con proteína Gi: inhibe la adenilato ciclasa. Agonista: clonidina. Antagonista: yohimbina.', fila: 1, retener: ['α2: Gi', 'Clonidina', 'Yohimbina'] },
        { di: 'Beta va con proteína Gs: activa la adenilato ciclasa y aumenta el AMP cíclico. Agonista general: isoproterenol. Antagonista general: propranolol.', fila: 2, retener: ['β: Gs', 'Isoproterenol', 'Propranolol'] },
      ],
    },
    {
      tipo: 'organos', id: 'adr-4', titulo: 'Qué hace cada receptor en el cuerpo',
      pasos: [
        { di: 'Tenés un corazón y dos pulmones. Beta uno en el corazón: más frecuencia y más fuerza.', organos: [{ o: 'corazon', t: 'β1: ↑ FC y fuerza', c: 'agonista' }], retener: ['1 corazón: β1'] },
        { di: 'Beta dos en los bronquios: broncodilatación. Ahí actúa el salbutamol.', organos: [{ o: 'bronquio', t: 'β2: broncodilatación', c: 'agonista' }], retener: ['2 pulmones: β2'] },
        { di: 'Alfa uno en el vaso: vasoconstricción. Ahí actúa la fenilefrina.', organos: [{ o: 'vaso', t: 'α1: vasoconstricción', c: 'antagonista' }] },
        { di: 'En el ojo, midriasis por receptores alfa.', organos: [{ o: 'ojo', t: 'α: midriasis', c: 'antagonista' }] },
        { di: 'En el tubo digestivo baja el tono y el peristaltismo.', organos: [{ o: 'intestino', t: 'β: ↓ peristaltismo', c: 'agonista' }] },
        { di: 'En la vejiga contrae el trígono y el esfínter por alfa uno, y relaja el detrusor por beta dos.', organos: [{ o: 'vejiga', t: 'α1 esfínter, β2 detrusor', c: 'modulador' }] },
        { di: 'Y en el músculo esquelético aparece temblor fino.', organos: [{ o: 'musculo', t: 'Temblor fino', c: 'modulador' }] },
      ],
    },
    {
      tipo: 'sinapsis', id: 'adr-5', titulo: 'Agonistas: elegir el receptor', nt: 'NA', autor: 'α2', transportador: 'Recaptación',
      receptores: [{ n: 'α1', k: 'g' }, { n: 'β2', k: 'g' }],
      pasos: [
        { di: 'Fenilefrina activa solo alfa uno: vasoconstricción.', nivel: 0.1, drogas: [{ n: 'Fenilefrina', a: 'agonista', en: 'r0' }], efecto: 'Vasoconstricción', tono: 'mas' },
        { di: 'Salbutamol activa beta dos: broncodilatación. Es el agonista que más aparece en los cuadros reales.', nivel: 0.1, drogas: [{ n: 'Salbutamol', a: 'agonista', en: 'r1' }], efecto: 'Broncodilatación', tono: 'mas' },
        { di: 'Clonidina activa alfa dos. Fijate la trampa: es agonista, pero baja la presión, porque aprieta el freno y sale menos noradrenalina. Por eso se llama antihipertensivo central.', nivel: 0.12, drogas: [{ n: 'Clonidina', a: 'agonista', en: 'ar' }], efecto: 'Agonista que baja la presión', tono: 'menos', retener: ['Clonidina: agonista α2, antihipertensivo'] },
      ],
    },
    {
      tipo: 'escalera', id: 'adr-6', titulo: 'Dopamina según la dosis', eje: 'Dosis creciente, μg/kg/min',
      zonas: [
        { t: 'Baja (0,5)', r: 'D1 y D2', e: 'Vasodilatación renal y mesentérica, más diuresis', c: 'agonista' },
        { t: 'Media (2 a 4)', r: 'β1', e: 'Más contractilidad y taquicardia', c: 'precursor' },
        { t: 'Alta (4 a 5)', r: 'α1', e: 'Vasoconstricción', c: 'antagonista' },
      ],
      pasos: [
        { di: 'Esta pregunta sale siempre: el efecto cardiovascular de la dopamina según la dosis. A dosis bajas actúa en receptores D1: vasodilatación renal, mesentérica, cerebral y coronaria. En el túbulo inhibe la reabsorción de sodio y aumenta la diuresis.', zona: 0, retener: ['Bajas: D1, vasodilatación'] },
        { di: 'A dosis medias estimula beta uno: aumenta la contractilidad y da taquicardia.', zona: 1, retener: ['Medias: β1'] },
        { di: 'A dosis altas estimula receptores alfa: vasoconstricción. Bajas, vasodilata. Medias, corazón. Altas, vasoconstricción.', zona: 2, retener: ['Altas: α1, vasoconstricción'] },
      ],
    },
    {
      tipo: 'sinapsis', id: 'adr-7', titulo: 'Antagonistas: α y β', nt: 'NA', autor: 'α2',
      receptores: [{ n: 'α1', k: 'g' }, { n: 'β1', k: 'g' }, { n: 'β2', k: 'g' }],
      pasos: [
        { di: 'Prazosin bloquea alfa uno. El vaso se relaja, baja la presión. Es antihipertensivo y vasodilata. Tamsulosina usa el mismo receptor para la hiperplasia prostática benigna.', liberar: true, nivel: 0.5, activos: [1, 2], drogas: [{ n: 'Prazosin', a: 'antagonista', en: 'r0' }], efecto: 'Vasodilatación, antihipertensivo', tono: 'menos', retener: ['Prazosin', 'Tamsulosina'] },
        { di: 'Propranolol, timolol y sotalol bloquean beta uno y beta dos. Son no selectivos. Como también bloquean el bronquio, pueden dar broncoconstricción.', liberar: true, nivel: 0.5, activos: [0], drogas: [{ n: 'Propranolol', a: 'antagonista', en: 'r1' }, { n: 'Propranolol ', a: 'antagonista', en: 'r2' }], efecto: 'No selectivos: β1 y β2', tono: 'menos', retener: ['Propranolol', 'Timolol', 'Sotalol'] },
        { di: 'Atenolol, metoprolol, esmolol y acebutolol bloquean solo beta uno. Son cardioselectivos: bajan la frecuencia y dejan tranquilo al bronquio.', liberar: true, nivel: 0.5, activos: [0, 2], drogas: [{ n: 'Atenolol', a: 'antagonista', en: 'r1' }], efecto: 'Cardioselectivos: β1', tono: 'menos', retener: ['Atenolol', 'Metoprolol', 'Esmolol', 'Acebutolol'] },
        { di: 'Y carvedilol y labetalol bloquean alfa y beta. El bloqueo alfa vasodilata y el beta baja la frecuencia. Su efecto beta es diez veces mayor que el alfa.', liberar: true, nivel: 0.5, drogas: [{ n: 'Carvedilol', a: 'antagonista', en: 'r0' }, { n: 'Labetalol', a: 'antagonista', en: 'r1' }], efecto: 'Mixtos: α y β', tono: 'menos', retener: ['Carvedilol', 'Labetalol'] },
      ],
    },
    {
      tipo: 'organos', id: 'adr-8', titulo: 'β-bloqueantes: adversos para el examen',
      pasos: [
        { di: 'Te piden cuatro efectos adversos de los betabloqueantes. Bradicardia.', organos: [{ o: 'corazon', t: 'Bradicardia', c: 'antagonista' }] },
        { di: 'Broncoconstricción.', organos: [{ o: 'bronquio', t: 'Broncoconstricción', c: 'antagonista' }] },
        { di: 'Fatiga.', organos: [{ o: 'musculo', t: 'Fatiga', c: 'antagonista' }] },
        { di: 'Constipación.', organos: [{ o: 'intestino', t: 'Constipación', c: 'antagonista' }] },
        { di: 'Y trastornos del sueño. Además: retención de sodio, Raynaud e impotencia.', organos: [{ o: 'cerebro', t: 'Trastornos del sueño', c: 'antagonista' }], retener: ['Indicaciones: HTA, ICC, cardiopatía isquémica, hipertensión portal, migraña, temblor'] },
      ],
    },
    {
      tipo: 'pizarra', id: 'adr-9', titulo: 'La pizarra adrenérgica',
      lineas: [
        { lista: ['Adrenalina', 'Noradrenalina', 'Dopamina'], resultado: 'Catecolaminas', a: 'agonista' },
        { lista: ['Fenilefrina', 'Clonidina'], resultado: 'Agonistas α1 y α2', a: 'agonista' },
        { lista: ['Isoproterenol', 'Dobutamina', 'Salbutamol'], resultado: 'Agonistas β', a: 'agonista' },
        { lista: ['Prazosin', 'Tamsulosina'], resultado: 'Bloquean α1', a: 'antagonista' },
        { lista: ['Propranolol', 'Timolol', 'Sotalol'], resultado: 'Bloquean β1 y β2', a: 'antagonista' },
        { lista: ['Atenolol', 'Metoprolol'], resultado: 'Bloquean β1', a: 'antagonista' },
        { lista: ['Carvedilol', 'Labetalol'], resultado: 'Bloquean α y β', a: 'antagonista' },
      ],
      pasos: [
        { di: 'Repetí conmigo. Catecolaminas: adrenalina, noradrenalina y dopamina.', hasta: 0 },
        { di: 'Agonistas alfa: fenilefrina y clonidina.', hasta: 1 },
        { di: 'Agonistas beta: isoproterenol, dobutamina y salbutamol.', hasta: 2 },
        { di: 'Bloqueantes alfa: prazosin y tamsulosina.', hasta: 3 },
        { di: 'Beta no selectivos: propranolol, timolol y sotalol.', hasta: 4 },
        { di: 'Beta selectivos: atenolol y metoprolol.', hasta: 5 },
        { di: 'Y mixtos, Carla: carvedilol y labetalol.', hasta: 6 },
      ],
    },
  ],
  preguntas: [
    vfReal('adr', 'PRE 5', 'El atenolol es un bloqueante α y β adrenérgico con actividad hipertensiva.', false, 'Es β1 selectivo y antihipertensivo. El preguntero marca el error en la palabra α.', { farmacos: ['atenolol'] }),
    mcReal('adr', 'PRE 13', 'Todos son bloqueantes adrenérgicos excepto:', ['Propanolol', 'Biperideno', 'Atenolol', 'Carvedilol'], [1], [
      'β-bloqueante no selectivo.', 'Correcta: es un antimuscarínico, no adrenérgico.', 'β1 selectivo.', 'Bloquea α y β.',
    ], { farmacos: ['propranolol', 'atenolol', 'carvedilol'] }),
    mcReal('adr', 'PRE 29', 'Los β-bloqueantes NO producen uno de los siguientes efectos o acciones:', ['Aumento de la resistencia periférica', 'Bradicardia', 'Glucogenólisis', 'Broncoconstricción'], [0, 2], [
      'Es la clave del preguntero.', 'Sí la producen.', 'También vale: la glucogenólisis es un efecto β, y el bloqueo la frena.', 'Sí la producen.',
    ], { estado: 'dudosa', claveMaterial: 0, nota: 'El preguntero marca la opción a. Farmacológicamente la c también es defendible, porque bloquear β frena la glucogenólisis. Se aceptan las dos.' }),
    vfReal('adr', 'PRE 31', 'La tamsulosina es un bloqueante α-adrenérgico reversible', true, 'Figura entre los reversibles en la presentación.', { farmacos: ['tamsulosina'] }),
    vfReal('adr', 'PRE 33', 'La fenilefrina provoca vasoconstricción por estimular al receptor α-1', true, 'Agonista α1.', { farmacos: ['fenilefrina'] }),
    mcGen('adr', '¿Cuál es el mecanismo por el que la clonidina baja la presión?', ['Bloquea α1 en el vaso', 'Activa α2 y disminuye la liberación de noradrenalina', 'Bloquea β1 en el corazón', 'Inhibe la MAO'], 1, [
      'Eso hace prazosin.', 'Correcta: α2 es el freno presináptico.', 'Eso hace atenolol.', 'No actúa sobre la MAO.',
    ], { farmacos: ['clonidina'] }),
    mcGen('adr', 'Un paciente asmático necesita un β-bloqueante. ¿Cuál conviene más?', ['Propranolol', 'Timolol', 'Atenolol', 'Sotalol'], 2, [
      'No selectivo: bloquea β2 bronquial.', 'No selectivo.', 'Correcta: cardioselectivo.', 'No selectivo.',
    ], { farmacos: ['atenolol', 'propranolol'] }),
    mcGen('adr', 'La dopamina a dosis altas produce:', ['Vasodilatación renal', 'Vasoconstricción por receptores α', 'Broncodilatación por β2', 'Hipotensión por D2'], 1, [
      'Eso es a dosis bajas.', 'Correcta.', 'No es su acción principal.', 'Eso es a dosis bajas.',
    ], { farmacos: ['dopamina'] }),
    mcGen('adr', '¿Qué receptor usa proteína Gq?', ['α1', 'α2', 'β1', 'β2'], 0, [
      'Correcta: aumenta IP3 y DAG.', 'Gi.', 'Gs.', 'Gs.',
    ]),
    mcGen('adr', 'Señalá la INCORRECTA sobre noradrenalina:', ['Produce vasoconstricción periférica', 'Actúa sobre β2 produciendo broncodilatación', 'Activa α1, α2 y β1', 'Puede bajar la FC por descarga vagal'], 1, [
      'Es cierto.', 'Correcta: no se la lista sobre β2.', 'Es cierto.', 'Es cierto.',
    ], { farmacos: ['noradrenalina'] }),
    mcGen('adr', 'Fármaco, grupo y efecto bien relacionados:', ['Prazosin, α1 bloqueante, vasoconstricción', 'Labetalol, bloqueante α y β, antipsicótico', 'Salbutamol, agonista β2, broncodilatador', 'Atenolol, α y β, broncodilatador'], 2, [
      'Prazosin vasodilata: error de un cuadro real.', 'Es antihipertensivo: error de otro cuadro real.', 'Correcta.', 'Atenolol es β1.',
    ], { farmacos: ['salbutamol', 'prazosin', 'labetalol'] }),
    mcGen('adr', 'La tiramina y la efedrina liberan noradrenalina:', ['Por un proceso dependiente de calcio', 'Desplazándola de la vesícula, sin calcio', 'Bloqueando α2', 'Activando β1'], 1, [
      'Justo al revés.', 'Correcta: la desplazan mol a mol.', 'No.', 'No.',
    ], { farmacos: ['tiramina', 'efedrina'] }),
    vfGen('adr', 'La yohimbina es antagonista α2', true, 'Slide de receptores: agonista clonidina, antagonista yohimbina.', ['yohimbina']),
    vfGen('adr', 'Carvedilol bloquea únicamente receptores β', false, 'Bloquea α y β.', ['carvedilol']),
    vfGen('adr', 'La COMT se localiza en la mitocondria', false, 'La mitocondria es de la MAO. La COMT es citoplasmática.'),
  ],
  desarrollos: [
    dev('adr', 'PRE 43, PRE 44, EXA 21, DES 9', 'Mencione un bloqueante no selectivo de los receptores β adrenérgicos y uno selectivo β1', ['No selectivo: propranolol', 'Selectivo β1: atenolol'], 'Otros no selectivos: timolol, sotalol. Otros selectivos: metoprolol, esmolol, acebutolol.', { farmacos: ['propranolol', 'atenolol'] }),
    dev('adr', 'DES 5', 'Mencione 3 fármacos ANTAGONISTAS BETA ADRENÉRGICOS y 4 indicaciones', ['Propranolol, atenolol, metoprolol', 'Hipertensión, IAM, migraña, temblores'], 'La presentación lista: cardiopatía isquémica, taquiarritmias supraventriculares, HTA, ICC, hipertensión portal, tirotoxicosis, prevención de migraña y temblor intencional.'),
    dev('adr', 'DES 20, EXA 36, PRE 85', 'Clasifique los antagonistas β adrenérgicos, dé ejemplos y 4 indicaciones', ['No selectivos: propranolol, sotalol, timolol', 'Selectivos: atenolol, metoprolol, esmolol', 'Indicaciones: HTA, ICC, cardiopatía isquémica, hipertensión portal'], 'Los no selectivos bloquean β1 y β2. Los cardioselectivos bloquean β1. Los mixtos, carvedilol y labetalol, bloquean además α.'),
    dev('adr', 'PRE 45', 'Cuatro indicaciones de los betabloqueantes', ['Cardiopatía isquémica', 'Taquiarritmias supraventriculares', 'HTA', 'Insuficiencia cardíaca'], 'También: hipertensión portal, tirotoxicosis, prevención de migraña, temblor intencional.'),
    dev('adr', 'DES 10, EXA 37, PRE 50, EXA Y1', 'Mencione 4 efectos adversos de los BETA BLOQUEANTES', ['Bradicardia', 'Fatiga', 'Broncoconstricción', 'Constipación'], 'También: retención de sodio, Raynaud, disminución de la libido, trastornos del sueño.', { nota: 'El preguntero lista "asma" como efecto adverso. Es más preciso decir broncoconstricción.' }),
    dev('adr', 'EXA 8', 'Mencione 3 drogas que actúen sobre la neurotransmisión adrenérgica e indique su mecanismo de acción', ['Atenolol: bloqueante selectivo β1', 'Propranolol: bloqueante β no selectivo', 'Fenilefrina: agonista α1, vasoconstricción'], 'Podés usar también salbutamol, agonista β2, o prazosin, antagonista α1.', { farmacos: ['atenolol', 'propranolol', 'fenilefrina'] }),
    dev('adr', 'DES 11, EXA 22', 'Mencione el efecto principal cardiovascular de la dopamina según se encuentre en concentraciones bajas, medias y altas', ['Bajas: vasodilatación renal, mesentérica, cerebral y coronaria', 'Medias: aumenta la contractilidad y da taquicardia', 'Altas: vasoconstricción'], 'A dosis bajas actúa sobre D1 y aumenta la diuresis, con hipotensión y bradicardia por D2. A dosis medias estimula β1. A dosis altas estimula receptores α.', { farmacos: ['dopamina'] }),
    dev('adr', 'DES 19', 'Mencione 5 efectos de la DOPAMINA sobre diferentes tejidos', ['Vasodilatación renal y mesentérica', 'Aumento de la diuresis', 'Aumento de la contractilidad cardíaca', 'Vasoconstricción a dosis altas', 'Disminuye la motilidad digestiva y participa en la emesis'], 'En el túbulo renal inhibe la reabsorción de sodio. En el tubo digestivo inhibe la motilidad y actúa en el centro del vómito. En SNC controla el movimiento.', {
      encontrada: 'Vasodilatación alveolar, midriasis pupilar, broncodilatación en shock', nota: 'Esos efectos no aparecen en la presentación de dopamina. Usá esta lista.', farmacos: ['dopamina'],
    }),
    dev('adr', 'PRE 66', 'Paciente en guardia con euforia, hipertensión arterial, taquicardia y midriasis. Su familiar refiere consumo de sustancias ilícitas. ¿A qué sistema de neurotransmisión corresponden estos efectos? ¿Sobre qué sitio de acción podría actuar esta sustancia?', ['Sistema adrenérgico y dopaminérgico: efecto simpaticomimético', 'Sitio: transportador de recaptación, como cocaína y anfetamina'], 'La euforia con hipertensión orienta a cocaína o anfetaminas: inhiben la recaptación y aumentan la noradrenalina y la dopamina en la sinapsis. Un cuadro anticolinérgico daría piel seca y caliente, boca seca y alucinaciones, sin hipertensión marcada.', {
      encontrada: 'Efectos anticolinérgicos', nota: 'El preguntero responde anticolinérgico. La euforia y la hipertensión encajan mejor con un simpaticomimético. Si te la toman, mencioná el mecanismo y compará con los anticolinérgicos.',
    }),
  ],
};
