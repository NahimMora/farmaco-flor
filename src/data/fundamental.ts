// Lo mínimo de la 1ª ERA: solo lo que aparece en las hojas de examen de las fotos.
export const CONCEPTOS: { t: string; d: string }[] = [
  { t: 'Mecanismo de acción', d: 'Proceso íntimo por el que la droga ejerce su acción: la interacción droga-receptor.' },
  { t: 'Acción', d: 'Modificación de una función que ya existía en el organismo.' },
  { t: 'Efecto', d: 'Respuesta a la droga que se puede observar o cuantificar.' },
  { t: 'Vida media de eliminación', d: 'Tiempo en que la concentración de un fármaco en un compartimiento se reduce a la mitad.' },
  { t: 'Biodisponibilidad', d: 'Fracción del fármaco que llega intacta a la circulación sistémica, y la velocidad con que llega.' },
  { t: 'Absorción', d: 'Pasaje del fármaco desde un compartimiento en contacto con el exterior al compartimiento presistémico.' },
  { t: 'Compartimiento presistémico', d: 'Conjunto de elementos entre el sitio de absorción y las venas pulmonares.' },
  { t: 'Agonista completo', d: 'Tiene afinidad y eficacia: llega al efecto máximo.' },
  { t: 'Antagonista competitivo', d: 'Compite por el sitio del agonista. Tiene afinidad pero no eficacia. La curva se corre a la derecha y llega al mismo máximo.' },
  { t: 'Antagonista no competitivo', d: 'Reduce el efecto máximo del agonista.' },
  { t: 'Tolerancia', d: 'Disminución gradual de la respuesta con el uso repetido por tiempo prolongado.' },
];

export const FARMACOS_ERA1: { t: string; d: string }[] = [
  { t: 'Inductores del citocromo P450', d: 'Rifampicina, carbamazepina' },
  { t: 'Inhibidores del citocromo P450', d: 'Cimetidina, ketoconazol, macrólidos' },
  { t: 'Ejemplo de tolerancia', d: 'Morfina' },
];
