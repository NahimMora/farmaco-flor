import type { Capitulo } from '../tipos';
import { g, hacerFicha, mn, par } from '../h';

const f = hacerFicha('acm');

export const anticuerpos: Capitulo = {
  id: 'acm',
  n: 8,
  titulo: 'Anticuerpos monoclonales',
  objetivo: 'Leer el nombre de un anticuerpo y decir su origen, su blanco y su indicación.',
  avisos: ['Los exámenes piden rituximab, infliximab y tocilizumab: origen, blanco e indicación.'],
  mapa: [
    { titulo: 'Quiméricos: -ximab', grupos: ['acm-qui'] },
    { titulo: 'Humanizados: -zumab', grupos: ['acm-hum'] },
    { titulo: 'Humanos: -umab', grupos: ['acm-hu'] },
  ],
  grupos: [
    g('acm-qui', 'Quiméricos', 'anticuerpo', '75% humanos', { regla: 'Región variable murina y constante humana.', patron: 'Terminan en -ximab.' }),
    g('acm-hum', 'Humanizados', 'anticuerpo', '95% de proteína humana', { regla: 'Solo las regiones que reconocen al antígeno son murinas.', patron: 'Terminan en -zumab.' }),
    g('acm-hu', 'Humanos', 'anticuerpo', 'Secuencias enteramente humanas', { regla: 'Provienen de secuencias de ADN humanas.', patron: 'Terminan en -umab.', excepcion: 'Daratumumab figura como humanizado en la presentación, pero su sufijo es -umab.' }),
  ],
  farmacos: [
    f('rituximab', 'Rituximab', 'acm-qui', 'anticuerpo', 'CD20', 'Anticuerpo monoclonal quimérico anti-CD20', 'LNH B, LLC, artritis reumatoide, PTI, AHAI', 1, ['ACM 17', 'ACM 20', 'DES c17'], { confusiones: ['infliximab', 'brentuximab'], clave: 'CD20. Tuxi: tumor y quimérico.' }),
    f('infliximab', 'Infliximab', 'acm-qui', 'anticuerpo', 'TNF-α', 'Anticuerpo monoclonal quimérico anti TNF-α', 'Artritis reumatoide, artritis psoriásica, Crohn, colitis ulcerosa', 1, ['ACM 20', 'DES c17'], { confusiones: ['rituximab'], clave: 'Antiartrítico en los cuadros.' }),
    f('brentuximab', 'Brentuximab', 'acm-qui', 'anticuerpo', 'CD30', 'Anticuerpo monoclonal quimérico anti-CD30', 'Linfoma de Hodgkin', 1, ['ACM 20']),
    f('alemtuzumab', 'Alemtuzumab', 'acm-hum', 'anticuerpo', 'CD52', 'Anticuerpo monoclonal humanizado anti-CD52', 'Leucemia linfática crónica', 1, ['ACM 17', 'ACM 20'], { variantes: ['Alentuzumab'], discrepancia: 'd-acm' }),
    f('ibalizumab', 'Ibalizumab', 'acm-hum', 'anticuerpo', 'CD4', 'Anticuerpo monoclonal humanizado anti-CD4', 'HIV multirresistente', 1, ['ACM 20'], { variantes: ['Idalizumab'], discrepancia: 'd-acm' }),
    f('tocilizumab', 'Tocilizumab', 'acm-hum', 'anticuerpo', 'Receptor IL-6', 'Anticuerpo monoclonal humanizado anti receptor de IL-6', 'Artritis reumatoide', 1, ['ACM 20']),
    f('daratumumab', 'Daratumumab', 'acm-hu', 'anticuerpo', 'CD38', 'Anticuerpo monoclonal anti-CD38', 'Mieloma múltiple', 1, ['ACM 20'], { discrepancia: 'd-acm' }),
  ],
  mnemotecnias: [
    mn('m-suf', 'acm-qui', 'O, Xi, Zu, U: del ratón al humano', [['-omab', 'Murino'], ['-ximab', 'Quimérico'], ['-zumab', 'Humanizado'], ['-umab', 'Humano']],
      'Leer el origen de cualquier anticuerpo por su nombre.', 'Confundir -ximab con -zumab.'),
    mn('m-r20', 'acm-qui', 'Rituximab 20, Brentuximab 30, Infliximab inflama menos', [['Ritu', 'CD20'], ['Bren', 'CD30, Hodgkin'], ['Infli', 'Anti TNF-α']],
      'Los tres quiméricos con su blanco.', 'Asignar CD20 a todos.'),
    mn('m-dara', 'acm-hu', 'Dara 38 al mieloma', [['Dara', 'Daratumumab'], ['38', 'CD38'], ['mieloma', 'Mieloma múltiple']],
      'Daratumumab y su indicación.', 'Confundir CD38 con CD30.'),
    mn('m-toc', 'acm-hum', 'Toci toca IL-6. Alem es 52. Iba al CD4', [['Toci', 'Receptor de IL-6'], ['Alem', 'CD52'], ['Iba', 'CD4']],
      'Los tres humanizados con su blanco.', 'Mezclar blancos.'),
  ],
  parejas: [
    par('rituximab', 'infliximab', 'Los dos quiméricos, usados en artritis reumatoide.', 'Anti-CD20.', 'Anti TNF-α.', 'Rituximab mata linfocitos B.'),
    par('rituximab', 'brentuximab', 'Dos quiméricos para linfomas.', 'CD20: LNH B.', 'CD30: Hodgkin.', 'Bren va a Hodgkin.'),
    par('alemtuzumab', 'daratumumab', 'Blancos hematológicos con sufijo distinto.', 'CD52: LLC.', 'CD38: mieloma.', 'Dara, mieloma.'),
  ],
  escenas: [
    {
      tipo: 'anticuerpo', id: 'acm-1', titulo: 'Estructura del anticuerpo',
      pasos: [
        { di: 'Un anticuerpo tiene cuatro cadenas: dos livianas y dos pesadas. Tiene dos partes que importan.', luz: 'todo' },
        { di: 'Fab es la fracción que une antígeno: la porción variable, la que le da la especificidad.', luz: 'fab', retener: ['Fab: especificidad'] },
        { di: 'Fc es la fracción constante, que se une a los receptores de células efectoras. Con eso activa citotoxicidad dependiente de anticuerpos, opsonización y complemento.', luz: 'fc', retener: ['Fc: función efectora, ADCC'] },
      ],
    },
    {
      tipo: 'flujo', id: 'acm-2', titulo: 'Cómo se obtienen',
      nodos: [
        { id: 'a', x: 170, y: 120, t: 'Linfocito B productor', w: 220, a: 'anticuerpo' },
        { id: 'm', x: 170, y: 340, t: 'Célula de mieloma', w: 220 },
        { id: 'h', x: 500, y: 230, t: 'Hibridoma', w: 200, a: 'anticuerpo' },
        { id: 'c', x: 800, y: 230, t: 'Anticuerpo monoclonal', w: 240, a: 'agonista' },
      ],
      lazos: [{ a: 'a', b: 'h' }, { a: 'm', b: 'h' }, { a: 'h', b: 'c' }],
      pasos: [
        { di: 'En mil novecientos setenta y cinco, Köhler y el argentino César Milstein desarrollaron los hibridomas. Premio Nobel en mil novecientos ochenta y cuatro.', ver: ['a', 'm'] },
        { di: 'Fusionan un linfocito B que produce el anticuerpo buscado con una célula de mieloma, que es inmortal y no produce inmunoglobulina propia.', ver: ['h'], retener: ['Hibridoma: linfocito B + mieloma'] },
        { di: 'El resultado es una línea celular inmortal que produce un único anticuerpo.', ver: ['c'], luz: ['c'] },
      ],
    },
    {
      tipo: 'anticuerpo', id: 'acm-3', titulo: 'Cómo leer el nombre',
      pasos: [
        { di: 'Todos terminan en mab, de monoclonal antibody. La letra de antes te dice el origen. O: murino.', luz: 'todo', partes: [{ t: '-mab', n: 'monoclonal' }, { t: '-omab', n: 'murino' }], humano: 0 },
        { di: 'Xi: quimérico. Setenta y cinco por ciento humano. Rituximab, infliximab, brentuximab.', luz: 'todo', partes: [{ t: '-ximab', n: 'quimérico' }], humano: 75, retener: ['-ximab: 75%'] },
        { di: 'Zu: humanizado. Noventa y cinco por ciento de proteína humana. Alemtuzumab, tocilizumab.', luz: 'todo', partes: [{ t: '-zumab', n: 'humanizado' }], humano: 95, retener: ['-zumab: 95%'] },
        { di: 'U: secuencias enteramente humanas. Y si fue diseñado contra un blanco tumoral, se antepone tu, como en rituximab.', luz: 'todo', partes: [{ t: '-umab', n: 'humano' }, { t: 'tu', n: 'blanco tumoral' }], humano: 100 },
      ],
    },
    {
      tipo: 'pizarra', id: 'acm-4', titulo: 'Blancos e indicaciones',
      lineas: [
        { lista: ['Rituximab'], resultado: 'CD20: LNH B, LLC, AR', a: 'anticuerpo' },
        { lista: ['Alemtuzumab'], resultado: 'CD52: LLC', a: 'anticuerpo' },
        { lista: ['Brentuximab'], resultado: 'CD30: Hodgkin', a: 'anticuerpo' },
        { lista: ['Daratumumab'], resultado: 'CD38: mieloma múltiple', a: 'anticuerpo' },
        { lista: ['Ibalizumab'], resultado: 'CD4: HIV multirresistente', a: 'anticuerpo' },
        { lista: ['Tocilizumab'], resultado: 'Receptor IL-6: AR', a: 'anticuerpo' },
        { lista: ['Infliximab'], resultado: 'TNF-α: AR, Crohn, colitis', a: 'anticuerpo' },
      ],
      pasos: [
        { di: 'Rituximab: quimérico, CD veinte. Linfoma no Hodgkin B, leucemia linfática crónica y artritis reumatoide.', hasta: 0 },
        { di: 'Alemtuzumab: humanizado, CD cincuenta y dos. Leucemia linfática crónica.', hasta: 1 },
        { di: 'Brentuximab: quimérico, CD treinta. Linfoma de Hodgkin.', hasta: 2 },
        { di: 'Daratumumab: CD treinta y ocho. Mieloma múltiple.', hasta: 3 },
        { di: 'Ibalizumab: humanizado, CD cuatro. HIV multirresistente.', hasta: 4 },
        { di: 'Tocilizumab: humanizado, receptor de interleuquina seis. Artritis reumatoide.', hasta: 5 },
        { di: 'Infliximab: quimérico, TNF alfa. Artritis reumatoide, Crohn y colitis ulcerosa.', hasta: 6 },
      ],
    },
  ],
  preguntas: [],
  desarrollos: [],
};
