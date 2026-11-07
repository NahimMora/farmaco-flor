// Manifiesto de fuentes. Los archivos quedan fuera del repositorio público.
export interface ArchivoFuente {
  sigla: string;
  archivo: string;
  tipo: string;
  paginas: number;
  fiabilidad: 'docente' | 'apoyo' | 'estudiantil';
  prioridad: string;
  nota?: string;
}

export const ARCHIVOS: ArchivoFuente[] = [
  { sigla: 'PIZ', archivo: 'Foto.pdf', tipo: 'Foto de pizarra (2)', paginas: 2, fiabilidad: 'estudiantil', prioridad: 'Define qué memorizar', nota: 'Leída nombre por nombre. El borde izquierdo de la foto 1 corta los primeros nombres colinérgicos.' },
  { sigla: 'DES', archivo: 'FARMACO A DESARROL_250624_091543.pdf', tipo: '30 preguntas y cuadros de ERA 2', paginas: 9, fiabilidad: 'estudiantil', prioridad: 'Preguntas reales' },
  { sigla: 'EXA', archivo: 'fármaco a desarrollar.pdf', tipo: 'Examen a desarrollar', paginas: 5, fiabilidad: 'estudiantil', prioridad: 'Preguntas reales' },
  { sigla: 'PRE', archivo: 'Preguntero Farmaco.pdf', tipo: 'Preguntero (86) y ERA 1 (20)', paginas: 12, fiabilidad: 'estudiantil', prioridad: 'Preguntas reales', nota: 'Las claves están resaltadas en verde en la imagen, no en el texto. Las 20 de ERA 1 no traen clave.' },
  { sigla: 'AUD', archivo: 'Farmaco 31.m4a', tipo: 'Grabación de clase, 70 min', paginas: 0, fiabilidad: 'docente', prioridad: 'Advertencias del docente' },
  { sigla: 'COL', archivo: 'NT Colinergica.pdf', tipo: 'Presentación de Campregher', paginas: 18, fiabilidad: 'docente', prioridad: 'Autoridad' },
  { sigla: 'ADR', archivo: 'NT Adrenergica.pdf', tipo: 'Presentación de Campregher', paginas: 24, fiabilidad: 'docente', prioridad: 'Autoridad' },
  { sigla: 'DOP', archivo: 'NT Dopaminergica.pdf', tipo: 'Presentación de Campregher', paginas: 31, fiabilidad: 'docente', prioridad: 'Autoridad' },
  { sigla: 'SER', archivo: 'NT Serotonina.pdf', tipo: 'Presentación de Campregher', paginas: 22, fiabilidad: 'docente', prioridad: 'Autoridad' },
  { sigla: 'GAB', archivo: 'GABA y Glutamato.pdf', tipo: 'Presentación de Campregher', paginas: 32, fiabilidad: 'docente', prioridad: 'Autoridad', nota: '«GABA y Glutamat 1o.pdf» es el mismo archivo: hash idéntico.' },
  { sigla: 'HIS', archivo: 'Histamina, Hierro y EPO.pdf', tipo: 'Presentación de la cátedra', paginas: 31, fiabilidad: 'docente', prioridad: 'Autoridad' },
  { sigla: 'NEO', archivo: 'Antineoplasicos.pdf', tipo: 'Presentación de la cátedra', paginas: 15, fiabilidad: 'docente', prioridad: 'Autoridad' },
  { sigla: 'ACM', archivo: 'Anticuerpos monoclonales.pdf', tipo: 'Presentación de la cátedra', paginas: 20, fiabilidad: 'docente', prioridad: 'Autoridad' },
  { sigla: 'REC', archivo: 'Farmacologia 2ERA.pdf', tipo: 'Recopilación de las presentaciones', paginas: 34, fiabilidad: 'apoyo', prioridad: 'Respaldo' },
  { sigla: 'APU', archivo: 'farmacologia.pdf', tipo: 'Apunte escaneado con notas de clase', paginas: 66, fiabilidad: 'estudiantil', prioridad: 'Complementario', nota: 'Tiene anotaciones agregadas durante la clase.' },
];
