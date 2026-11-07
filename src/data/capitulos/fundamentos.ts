import type { Capitulo, PreguntaOpciones } from '../tipos';
import { dev, g, hacerFicha, mcReal, mn, par, vfReal } from '../h';

const f = hacerFicha('fun');

const SIN = 'El preguntero no trae clave para esta parte. Respuesta razonada con el apunte.';
const era = (n: number, texto: string, opciones: string[], ok: number[], por: string[], ex: { nota?: string; dudosa?: boolean } = {}): PreguntaOpciones =>
  mcReal('fun', `ERA ${n}`, texto, opciones, ok, por, { nota: ex.nota ?? SIN, estado: ex.dudosa ? 'dudosa' : 'verificada' });

export const fundamentos: Capitulo = {
  id: 'fun',
  n: 9,
  titulo: 'Fundamentos',
  objetivo: 'Tener a mano definiciones y curvas de farmacocinética y farmacodinamia que aparecen en las preguntas.',
  avisos: [
    'Estos temas son de la primera evaluación, pero aparecen en el examen a desarrollar y en el preguntero.',
    'La grabación de clase es sobre farmacocinética: absorción, primer paso hepático y vías de administración.',
  ],
  mapa: [{ titulo: 'Citocromo P450', grupos: ['fun-ind', 'fun-inh'] }, { titulo: 'Ejemplos que piden', grupos: ['fun-tol', 'fun-pp'] }],
  grupos: [
    g('fun-ind', 'Inductores del citocromo P450', 'hormona', 'Aceleran el metabolismo', { regla: 'Aumentan la actividad enzimática: bajan el nivel de otras drogas.' }),
    g('fun-inh', 'Inhibidores del citocromo P450', 'inhibidor', 'Aumentan el nivel de otras drogas', { regla: 'Frenan el metabolismo y pueden subir las concentraciones de otras drogas.' }),
    g('fun-tol', 'Tolerancia', 'agonista', 'Disminución gradual de la respuesta', { regla: 'Respuesta menor con el uso prolongado.' }),
    g('fun-pp', 'Alto primer paso hepático', 'antagonista', 'Baja biodisponibilidad oral', { regla: 'Gran parte se metaboliza antes de llegar a la circulación sistémica.' }),
  ],
  farmacos: [
    f('rifampicina', 'Rifampicina', 'fun-ind', 'hormona', 'Citocromo P450', 'Inductor del citocromo P450', 'Acelera el metabolismo de otras drogas', 1, ['PRE 56', 'EXA 30'], { externo: true }),
    f('ketoconazol', 'Ketoconazol', 'fun-inh', 'inhibidor', 'Citocromo P450', 'Inhibidor del citocromo P450', 'Aumenta el nivel de otras drogas', 1, ['PRE 56', 'EXA 30'], { externo: true }),
    f('macrolidos', 'Macrólidos', 'fun-inh', 'inhibidor', 'Citocromo P450', 'Inhibidores del citocromo P450', 'Aumentan el nivel de otras drogas', 1, ['PRE 56', 'EXA 30'], { externo: true }),
    f('morfina', 'Morfina', 'fun-tol', 'agonista', 'Receptor opioide', 'Agonista opioide. Ejemplo de tolerancia', 'Analgésico', 2, ['PRE 48'], { externo: true }),
    f('meperidina', 'Meperidina', 'fun-pp', 'agonista', 'Receptor opioide', 'Ejemplo de alto primer paso hepático', 'Analgésico', 3, ['PRE 62'], { externo: true }),
  ],
  mnemotecnias: [
    mn('m-p450', 'fun-inh', 'Ci Ke Ma frena. Ri Carba acelera', [['Ci', 'Cimetidina'], ['Ke', 'Ketoconazol'], ['Ma', 'Macrólidos'], ['Ri', 'Rifampicina'], ['Carba', 'Carbamazepina']],
      'Inhibidores e inductores del citocromo P450.', 'Cruzarlos entre sí.'),
    mn('m-pk', 'fun-ind', 'ADME: entra, viaja, cambia, sale', [['Entra', 'Absorción'], ['Viaja', 'Distribución'], ['Cambia', 'Metabolismo'], ['Sale', 'Excreción']],
      'El orden de los procesos farmacocinéticos.', 'Decir tres procesos y olvidar que la eliminación suma metabolismo y excreción.'),
  ],
  parejas: [
    par('rifampicina', 'ketoconazol', 'Citocromo P450 en sentido opuesto.', 'Induce: baja el nivel de otras drogas.', 'Inhibe: sube el nivel de otras drogas.', 'Rifampicina Rápido metabolismo.'),
  ],
  escenas: [
    {
      tipo: 'flujo', id: 'fun-1', titulo: 'Qué hace el cuerpo con el fármaco',
      nodos: [
        { id: 'a', x: 150, y: 150, t: 'Absorción', w: 200, a: 'precursor' },
        { id: 'd', x: 480, y: 150, t: 'Distribución', w: 200, a: 'precursor' },
        { id: 'm', x: 810, y: 150, t: 'Metabolismo', w: 200, a: 'precursor' },
        { id: 'e', x: 810, y: 390, t: 'Excreción', w: 200, a: 'precursor' },
        { id: 'b', x: 480, y: 390, t: 'Biofase: efecto', w: 220, a: 'agonista' },
      ],
      lazos: [{ a: 'a', b: 'd' }, { a: 'd', b: 'm' }, { a: 'm', b: 'e' }, { a: 'd', b: 'b' }],
      pasos: [
        { di: 'Farmacocinética es lo que el cuerpo le hace al fármaco. Primero la absorción: el fármaco entra, incluyendo la liberación desde su forma farmacéutica.', ver: ['a'], retener: ['Absorción'] },
        { di: 'Después se distribuye. Depende del flujo sanguíneo, de la permeabilidad de las membranas y de la fijación a proteínas plasmáticas y tejidos.', ver: ['d'], retener: ['Distribución: flujo, permeabilidad, proteínas'] },
        { di: 'La idea es que llegue en buena concentración a la biofase, el lugar donde actúa.', ver: ['b'], luz: ['b'] },
        { di: 'Y por último se elimina: por metabolismo, transformándolo en moléculas más polares, y por excreción. Algunos libros cuentan tres procesos y otros cuatro: es la misma idea.', ver: ['m', 'e'], retener: ['Biotransformación: más polar'] },
      ],
    },
    {
      tipo: 'flujo', id: 'fun-2', titulo: 'Compartimiento presistémico',
      nodos: [
        { id: 'b', x: 140, y: 130, t: 'Sitio de absorción', w: 210 },
        { id: 'i', x: 140, y: 340, t: 'Intestino', w: 190 },
        { id: 'p', x: 420, y: 340, t: 'Vena porta', w: 180 },
        { id: 'h', x: 700, y: 340, t: 'Hígado: primer paso', w: 230, a: 'inhibidor' },
        { id: 'v', x: 700, y: 130, t: 'Venas pulmonares', w: 220 },
        { id: 's', x: 700, y: 520, t: 'Circulación sistémica', w: 230, a: 'agonista' },
      ],
      lazos: [{ a: 'b', b: 'i' }, { a: 'i', b: 'p' }, { a: 'p', b: 'h' }, { a: 'h', b: 'v' }, { a: 'h', b: 's' }],
      pasos: [
        { di: 'El compartimiento presistémico es el conjunto de elementos ubicados entre el sitio de absorción y las venas pulmonares. Esa definición la piden tal cual.', ver: ['b', 'v'], retener: ['Presistémico: sitio de absorción a venas pulmonares'] },
        { di: 'Por vía oral el fármaco pasa por el intestino y la vena porta, y entra al hígado antes de llegar a la circulación.', ver: ['i', 'p', 'h'], luz: ['h'] },
        { di: 'En ese primer paso hepático una parte se metaboliza. Lo que sobrevive llega a la circulación sistémica. La vía sublingual se salta ese paso, por eso usualmente requiere menores dosis.', ver: ['s'], luz: ['s'], retener: ['Sublingual evita el primer paso'] },
      ],
    },
    {
      tipo: 'curvas', id: 'fun-3', titulo: 'Curva concentración tiempo', ejes: ['Tiempo', 'Concentración plasmática'],
      series: [{ n: 'Cmáx', c: 'precursor', f: 'ct' }],
      pasos: [
        { di: 'Esta curva te la pueden pedir dibujada. Sube mientras la absorción le gana a la eliminación. En el pico está la concentración máxima, en el tiempo máximo. Después cae. El área bajo la curva representa la cantidad que llegó a circulación.', ver: [0], retener: ['Cmáx', 'Tmáx', 'ABC'] },
      ],
    },
    {
      tipo: 'curvas', id: 'fun-4', titulo: 'Antagonismo en la curva dosis respuesta', ejes: ['Log dosis', 'Efecto'],
      series: [
        { n: 'Agonista', c: 'agonista', f: 'hill', ec50: 0.3 },
        { n: 'Competitivo', c: 'modulador', f: 'hill', ec50: 0.55 },
        { n: 'Irreversible', c: 'antagonista', f: 'hill', ec50: 0.38, emax: 0.55 },
      ],
      pasos: [
        { di: 'El agonista solo da esta curva sigmoidea. La potencia se mide con la CE cincuenta: cuanto menor, más potente. La eficacia es el efecto máximo.', ver: [0], retener: ['Potencia: CE50', 'Eficacia: Emax'] },
        { di: 'Con un antagonista competitivo la curva se corre a la derecha y en paralelo, y llega al mismo máximo. Se pierde potencia, no eficacia.', ver: [0, 1], retener: ['Competitivo: derecha y mismo Emax'] },
        { di: 'Con un antagonista irreversible, unión covalente, baja el efecto máximo. Ese es el cambio que te tienen que ver en el dibujo.', ver: [0, 2], retener: ['Irreversible: baja el Emax'] },
      ],
    },
    {
      tipo: 'cadenas', id: 'fun-5', titulo: 'Fases del desarrollo de un fármaco',
      filas: [
        { chips: ['Preclínica', 'Animales', 'IT mayor a 10', 'Toxicología'], color: 'precursor' },
        { chips: ['Fase I', '20 a 50 sanos', 'Dosis máxima tolerada', 'Reacciones adversas'], color: 'agonista' },
        { chips: ['Fase II', 'Enfermos', 'Eficacia preliminar', 'Rango de dosis'], color: 'modulador' },
        { chips: ['Fase III', '2000 a 5000', 'Muchos países', 'Eficacia terapéutica'], color: 'antagonista' },
        { chips: ['Fase IV', 'Comercialización', 'Seguimiento', 'Farmacovigilancia'], color: 'inhibidor' },
      ],
      pasos: [
        { di: 'Preclínica o fase cero: en animales. Estima los índices terapéutico y de seguridad.', fila: 0 },
        { di: 'Fase uno: veinte a cincuenta voluntarios sanos. Dosis máxima tolerada y reacciones adversas.', fila: 1 },
        { di: 'Fase dos: pacientes enfermos. Establece la eficacia terapéutica preliminar.', fila: 2 },
        { di: 'Fase tres: de dos mil a cinco mil pacientes, en muchas instituciones y países, con la dosis ya seleccionada.', fila: 3 },
        { di: 'Fase cuatro: el fármaco ya se vende. Farmacovigilancia.', fila: 4 },
      ],
    },
  ],
  preguntas: [
    vfReal('fun', 'PRE 60', 'El índice terapéutico es la relación entre DL50/DE50 e idealmente debe ser mayor a 10', true, 'Es la definición.'),
    vfReal('fun', 'PRE 63', 'Tolerancia: es la rápida disminución de la sensibilidad a una droga por la exposición a dosis sucesivas separadas por intervalos cortos.', false, 'Eso es taquifilaxia. Tolerancia es gradual.'),
    vfReal('fun', 'PRE 67', 'Según su unión a proteínas y eficacia, los fármacos de clase 1 tienen una cantidad absoluta baja, presentan altísima afinidad por las proteínas y su fracción libre es escasa pero altamente eficaz.', true, 'Ejemplos: anticoagulantes e hipoglucemiantes orales.'),
    vfReal('fun', 'PRE 72', 'La potencia de una droga es inversamente proporcional a la CE50 y directamente proporcional al PD2', true, 'Cuanto menor CE50, más potente.'),
    vfReal('fun', 'PRE 73', 'Las diferencias farmacológicas entre animales y humanos son principalmente cualitativas.', false, 'Son cuantitativas.'),
    vfReal('fun', 'PRE 74', 'Cuando el pH de medio es superior al pKa del fármaco, predomina la fracción ionizada de las bases y la no ionizada de los ácidos.', false, 'pH mayor que pKa: se ionizan los ácidos y quedan sin ionizar las bases.'),
    vfReal('fun', 'PRE 76', 'La propiedad que le permite a una droga producir una respuesta se conoce como actividad intrínseca o eficacia o alfa.', true, 'Es la definición.'),
    era(1, 'Dentro de la curva dosis/respuesta para medir la potencia recurro al dato matemático:', ['Pendiente', 'No me sirve ninguno', 'CE50', 'Emax'], [2], ['No mide potencia.', 'No.', 'Correcta.', 'Mide eficacia.']),
    era(2, 'Para comparar potencias de las drogas antagonistas no competitivos:', ['Se utiliza el parámetro pA2', "Utilizamos el parámetro pD'2", 'Usamos la comparación de las pendientes de las curvas', 'Recurrimos a comparar el Emax'], [1], ['pA2 es para competitivos.', 'Correcta.', 'No.', 'No.']),
    era(3, 'Si el intervalo entre dosis...', ['...es igual a una vida media, luego de 8 dosis recién se llega al nivel estable', '...es menor que 1 vida media, no hay acumulación', '...es igual a una vida media, luego de cuatro dosis se llega al nivel estable o meseta', '...es mayor que 4 vidas medias, se acumula'], [2], ['Se llega antes.', 'Si es menor, se acumula.', 'Correcta: entre 4 y 5 vidas medias.', 'Si es mayor, no se acumula.']),
    era(4, 'Si se administran dos o más drogas simultáneas, ¿qué consecuencias tendría la inhibición de un citocromo P450 por una de ellas?', ['Se reducirían las conjugaciones', 'Podría aumentar las concentraciones de las otras drogas', 'Disminuiría la potencial toxicidad de las otras drogas', 'Aceleraría su propio metabolismo'], [1], ['No.', 'Correcta.', 'La aumentaría.', 'No.']),
    era(5, 'La toxicidad aguda:', ['Se realiza con dosis repetidas', 'Debe incluir una sola especie', 'No requiere estudio humoral y patológico de los animales', 'Establece la DE50'], [3], ['Es a dosis única.', 'Al menos tres especies.', 'Sí lo requiere.', 'Es lo que queda por descarte.'], { dudosa: true, nota: 'Lo que establece con exactitud es la DL50. La opción d parece tener un error de tipeo. No hay clave en el preguntero.' }),
    era(6, 'La tolerancia:', ['Supone una lenta disminución de la respuesta ante el uso prolongado', 'Implica el up regulation', 'Es sinónimo de resistencia', 'Supone exposición a dosis sucesivas durante períodos cortos'], [0], ['Correcta.', 'No.', 'No.', 'Eso es taquifilaxia.']),
    era(7, 'Si el pH del medio es menor al pK de una droga:', ['Se absorben peor las bases', 'Se absorben peor los ácidos', 'Predomina la fracción ionizada de ácidos', 'Predomina la fracción no ionizada de bases'], [0], ['Correcta: las bases se ionizan.', 'Quedan no ionizados.', 'Al revés.', 'Al revés.']),
    era(8, 'En el músculo liso el GMP cíclico aparece:', ['Debido a la presencia de óxido nítrico', 'Gracias a la proteinkinasa C', 'Por la intervención de la proteína Gs', 'Por el receptor beta adrenérgico'], [0], ['Correcta.', 'No.', 'Esa sube AMPc.', 'Sube AMPc.']),
    era(9, 'Se denomina fracción biodisponible:', ['A la relación entre la concentración de la droga en la sangre y en el tejido', 'A la relación entre la droga absorbida y la droga eliminada', 'A la relación entre la dosis administrada y la cantidad de droga que llega a la circulación sistémica', 'A la concentración de la droga en el órgano blanco'], [2], ['No.', 'No.', 'Correcta.', 'No.']),
    era(10, 'El nombre genérico de una droga:', ['Utiliza nomenclatura química estándar', 'Es el más apropiado para el uso del médico', 'Especifica su estructura química', 'Es la marca registrada del propietario'], [1], ['Ese es el nombre químico.', 'Correcta.', 'Nombre químico.', 'Nombre comercial.']),
    era(11, 'Clasificar receptores en familias y subfamilias supone utilizar un criterio:', ['Terapéutico', 'Estructural', 'Transduccional', 'Operacional'], [1], ['No.', 'Las familias agrupan secuencias de aminoácidos similares.', 'Clasifica por el sistema de señal.', 'Clasifica por respuesta a agonistas.'], { dudosa: true, nota: 'Sin clave. El apunte define las superfamilias por similitud de secuencia, lo que apoya la opción estructural.' }),
    era(12, 'La vía sublingual:', ['Presenta un importante primer paso hepático', 'Usualmente requiere menores dosis que la vía oral', 'No influida por variables farmacéuticas', 'Tiene absorción lenta'], [1], ['Lo evita.', 'Correcta.', 'No.', 'Es rápida.']),
    era(13, 'Para influir en la secreción tubular de una droga se puede:', ['Usar drogas con alta unión a proteínas', 'Modificar el pH intratubular', 'Inhibir competitivamente un transportador', 'Dar un diurético'], [2], ['No.', 'Afecta reabsorción.', 'Correcta.', 'No.']),
    era(14, 'La farmacogenética estudia...', ['...las influencias genéticas en la respuesta a los fármacos', '...cómo modificar genes para producir fármacos humanizados', '...el uso de información genética para elegir el fármaco adecuado', '...el uso de fármacos para corregir alteraciones genéticas'], [0], ['Correcta.', 'No.', 'Se acerca a farmacogenómica aplicada.', 'No.']),
    era(15, 'La rama citoplasmática de la señal intracelular de la insulina:', ['Permite inhibir la síntesis de proteínas', 'Utiliza un segundo mensajero', 'Induce la expresión de genes tempranos', 'Favorece la síntesis de glucógeno'], [3], ['La favorece.', 'No.', 'Es la rama nuclear.', 'Correcta.']),
    era(16, 'La Fase II tiene como objetivo:', ['Establecer la eficacia terapéutica preliminar de la droga', 'Evaluar la farmacocinética en voluntarios sanos', 'La farmacovigilancia', 'Determinar la DL50'], [0], ['Correcta.', 'Fase I.', 'Fase IV.', 'Preclínica.']),
    era(17, 'Las drogas de mecanismo de acción específico...', ['...actúan por la actividad termodinámica que presentan', '...no presentan el fenómeno de amplificación', '...ejercen su actividad en todas las células', '...actúan en bajas concentraciones'], [3], ['Eso es de las inespecíficas.', 'Sí lo presentan.', 'Actúan por receptores.', 'Correcta.']),
    era(18, 'Un antagonista no competitivo:', ['No produce efectos in vivo', 'Se une a un sitio alostérico', 'Afecta la potencia del agonista', 'Reduce el efecto máximo del agonista'], [1, 3], ['No.', 'También vale.', 'No es lo característico.', 'Correcta: es lo que define la curva.'], { dudosa: true, nota: 'Sin clave. La opción d es la característica de la curva, pero b también describe a muchos no competitivos.' }),
    era(19, 'La dosis letal 50, DL50, es:', ['La dosis que mata a la mitad de los animales de un lote', 'Se estudia, con cuidado, también en humanos', 'La mitad de la dosis tóxica máxima', 'El 50% de la dosis letal'], [0], ['Correcta.', 'No.', 'No.', 'No.']),
    era(20, 'En la cinética de orden 0:', ['La vida media no depende de la dosis', 'La vida media es proporcional a la concentración', 'La vida media es constante', 'La vida media no depende de la concentración'], [1], ['Eso es orden 1.', 'Correcta.', 'Orden 1.', 'Orden 1.']),
  ],
  desarrollos: [
    dev('fun', 'PRE 46, EXA 32', 'Mencione 5 mecanismos de acción de los fármacos de acción inespecífica', ['Extracelular: adsorción, modificación del medio interno, neutralización, fenómenos osmolares', 'Intracelular: precipitación de proteínas, modificación de radicales libres', 'Mixto: quelación'], 'Actúan a altas concentraciones y por su actividad termodinámica, sin receptor.'),
    dev('fun', 'PRE 47, EXA 31', 'Defina compartimento pre-sistémico', ['Conjunto de elementos ubicados entre el sitio de absorción y las venas pulmonares'], 'Incluye la pared intestinal, la vena porta y el hígado para la vía oral.'),
    dev('fun', 'PRE 48, EXA 17', 'Defina tolerancia y mencione una droga que la produzca', ['Disminución gradual de la respuesta a una droga administrada repetidamente por tiempo prolongado', 'Ejemplo: morfina'], 'El individuo deja de responder a dosis usuales. Si la caída es rápida, a intervalos cortos, se llama taquifilaxia.', { farmacos: ['morfina'] }),
    dev('fun', 'PRE 49, EXA Y7', 'Defina biotransformación de un fármaco y mencione su principal objetivo', ['Modificación química catalizada por enzimas', 'Objetivo: metabolitos más polares, hidrosolubles y fáciles de excretar'], 'Ocurre sobre todo en el hígado.'),
    dev('fun', 'PRE 54, EXA Y3', 'Defina antagonismo irreversible e indique cómo se comporta la curva D-R', ['Unión covalente del antagonista al receptor', 'Disminuye el efecto máximo a concentraciones mayores de antagonista'], 'Si hay reserva de receptores, primero se corre a la derecha. Sin reserva cae el Emax.', { diagrama: 'dr-irreversible' }),
    dev('fun', 'PRE 56, EXA 30', 'Mencione un inductor y un inhibidor del citocromo P450', ['Inductor: rifampicina, carbamazepina', 'Inhibidor: cimetidina, ketoconazol, macrólidos'], 'Inhibir el citocromo puede aumentar las concentraciones de las otras drogas.', { farmacos: ['rifampicina', 'ketoconazol', 'cimetidina', 'carbamazepina'] }),
    dev('fun', 'PRE 57, EXA Y6', 'Mencione 3 características de la fase 3 de la farmacología clínica', ['Se hace en muchas instituciones de varios países', 'Se emplean 2000 a 5000 pacientes', 'Evalúa la eficacia terapéutica con la dosis seleccionada'], 'También detecta reacciones adversas.'),
    dev('fun', 'PRE 58, EXA Y5', 'Defina pKa de una droga', ['Es el pH en el que la mitad de las moléculas están ionizadas y la mitad no ionizadas'], 'Sirve para predecir la absorción según el pH del medio.'),
    dev('fun', 'PRE 59, PRE 81, EXA 33, EXA Y4', 'Mencione 3 factores que influyen en la distribución de un fármaco', ['Flujo sanguíneo', 'Permeabilidad de las biomembranas', 'Fijación a proteínas plasmáticas y tejidos'], 'También liposolubilidad y grado de ionización.'),
    dev('fun', 'PRE 62', 'Se administra un fármaco activado en su primer paso hepático, y en el siguiente paso inicia su metabolización. ¿A qué tipo de fármaco hacemos referencia? Mencione algún ejemplo.', ['Es un profármaco: se activa por el metabolismo'], 'El profármaco es inactivo hasta su transformación.', {
      encontrada: 'Un bloqueante no selectivo de los receptores beta adrenérgicos. Ej: propanolol y meperidina', nota: 'Propranolol y meperidina tienen alto primer paso, pero no se activan en él. La descripción corresponde a un profármaco.', estado: 'dudosa',
    }),
    dev('fun', 'PRE 64, EXA 15', 'Defina antagonismo competitivo y describa cómo se comporta la curva D-R', ['Compite por el mismo sitio activo sin producir efecto', 'La curva se desplaza a la derecha en paralelo y alcanza el mismo máximo'], 'Baja la potencia del agonista, no su eficacia.', { diagrama: 'dr-competitivo' }),
    dev('fun', 'PRE 68', 'Si un fármaco presenta un intervalo de administración de 4 horas, ¿qué parámetro farmacocinético es aproximadamente de 4 horas?', ['La vida media de eliminación'], 'El intervalo suele acercarse a la vida media.', { encontrada: 'Distribución', nota: 'La clave no parece correcta: el intervalo se relaciona con la vida media.', estado: 'dudosa' }),
    dev('fun', 'PRE 77', 'Describa 3 características de farmacología pre-clínica', ['Estima los índices terapéuticos y de seguridad', 'Estudia efectos bioquímicos y moleculares', 'Analiza toxicidad aguda, subaguda y crónica'], 'Se hace en animales de experimentación.'),
    dev('fun', 'PRE 78', 'Describa 3 características de farmacología clínica fase 1', ['20 a 50 voluntarios sanos', 'Determina la máxima dosis tolerada', 'Detecta reacciones adversas'], 'Evalúa además la farmacocinética.'),
    dev('fun', 'PRE 79', 'Defina efecto idiosincrático', ['Reacción anormal a un fármaco, genética o idiopática', 'Ejemplo: apnea prolongada con succinilcolina por colinesterasa atípica'], 'No depende de la dosis habitual.', { farmacos: ['succinilcolina'] }),
    dev('fun', 'PRE 80', 'Cite 4 características de la absorción en difusión simple', ['Liposolubilidad', 'Tamaño molecular', 'pKa', 'Grado de ionización'], 'Sigue el gradiente de concentración y no necesita energía.'),
    dev('fun', 'PRE 82, EXA 10, EXA 29', 'Defina vida media de eliminación y cómo es en la cinética de orden 1', ['Tiempo en que la concentración en un compartimiento se reduce a la mitad', 'En orden 1 es constante'], 'En orden 0 es proporcional a la concentración.'),
    dev('fun', 'PRE 83, EXA 11', 'Defina biodisponibilidad', ['Fracción del fármaco administrado que llega a la circulación sistémica y la velocidad con que llega'], 'Por vía intravenosa es 100%.'),
    dev('fun', 'PRE 84, EXA 14', 'Dibuje la curva concentración-tiempo e indique cada uno de sus componentes', ['Eje X: tiempo. Eje Y: concentración', 'Cmáx, Tmáx y área bajo la curva'], 'La rama ascendente depende sobre todo de la absorción y la descendente de la eliminación.', { diagrama: 'curva-ct' }),
    dev('fun', 'EXA 12', 'En un modelo farmacocinético unicompartimental, ¿qué requisito debe cumplirse para que exista acumulación?', ['Que se administre otra dosis antes de eliminar la anterior: intervalo menor que el tiempo de eliminación'], 'Por eso con un intervalo igual a una vida media se llega a meseta en 4 a 5 dosis.', {
      encontrada: 'Que la cantidad eliminada del fármaco sea igual a la cantidad administrada', nota: 'Eso describe el estado estacionario, no la condición para acumular.',
    }),
    dev('fun', 'EXA 13', '¿De qué depende la Kelim de un fármaco en la cinética de eliminación de orden 1 o lineal?', ['Es constante: no depende de la dosis', 'Lo eliminado por unidad de tiempo es una fracción de la concentración'], 'Se elimina un porcentaje fijo por unidad de tiempo.', {
      encontrada: 'Depende de la concentración de la dosis en el compartimiento', nota: 'Lo que depende de la concentración es la cantidad eliminada, no la constante.',
    }),
    dev('fun', 'EXA 16', 'En el sinergismo de potenciación, ¿cuál es el resultado de la suma de 2 drogas?', ['El efecto es mayor que la suma de cada droga por separado', 'La curva se desplaza a la izquierda'], 'Aumentan el Emax y la potencia.', { diagrama: 'dr-potenciacion' }),
    dev('fun', 'EXA 18', '¿En qué consiste la fase IV de la farmacología clínica?', ['Comercialización con seguimiento permanente: farmacovigilancia'], 'Evalúa dosis, administración y efectos adversos.'),
    dev('fun', 'DES 16, EXA 27', 'Mencione 3 mecanismos por los cuales un neurotransmisor termina su efecto', ['Recaptación', 'Degradación enzimática', 'Difusión'], 'Es la lógica común a todos los sistemas.', { nota: 'EXA 27 pone acumulación en vesículas: conviene decir difusión, como en la presentación adrenérgica.' }),
    dev('fun', 'EXA 28', 'Mencione 3 características de la fase 0', ['Se estudia el fármaco en animales de experimentación', 'Establece la relación entre toxicidad y eficacia: IT mayor a 10', 'Las diferencias farmacocinéticas entre humanos y otros mamíferos son cuantitativas'], 'También llamada preclínica.'),
  ],
};
