// Qué se usó y para qué. Los archivos quedan fuera del repositorio público.
export interface ArchivoFuente { sigla: string; archivo: string; tipo: string; rol: string }

export const ARCHIVOS: ArchivoFuente[] = [
  { sigla: 'CUA', archivo: 'Farmacos ERA 2.pdf', tipo: 'Cuadro de fármacos', rol: 'Define qué fármacos entran' },
  { sigla: 'PIZ', archivo: 'Foto.pdf', tipo: 'Pizarra', rol: 'Define qué fármacos entran y cómo se agrupan' },
  { sigla: 'FOT', archivo: 'pdf24_convertido.pdf e imágenes de WhatsApp', tipo: 'Fotos de clase y exámenes', rol: 'Toda la práctica: choice, verdadero o falso, desarrollos, cuadros y casos' },
  { sigla: 'CAM', archivo: 'Presentaciones de Campregher', tipo: 'NT Colinérgica, Adrenérgica, Dopaminérgica, Serotonina, GABA, Histamina, Antineoplásicos, Anticuerpos', rol: 'Control de calidad: corrige errores y agrega lo importante' },
  { sigla: 'LUL', archivo: 'CUADROS FARMACO ERA 2 modificada by lulitoplay.pdf', tipo: 'Cuadro ampliado', rol: 'Consulta: sus fármacos extra no se suman a la lista' },
];
