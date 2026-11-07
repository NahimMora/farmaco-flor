// Punto único de acceso al contenido.
import type { CapId, Capitulo, Desarrollo, Farmaco, Grupo, Pareja, Pregunta } from './tipos';
import { colinergico } from './capitulos/colinergico';
import { adrenergico } from './capitulos/adrenergico';
import { dopaminergico } from './capitulos/dopaminergico';
import { serotoninergico } from './capitulos/serotoninergico';
import { gaba } from './capitulos/gaba';
import { histamina } from './capitulos/histamina';
import { antineoplasicos } from './capitulos/antineoplasicos';
import { anticuerpos } from './capitulos/anticuerpos';
import { CHOICE, DESARROLLOS_REALES } from './examen';

const base: Capitulo[] = [colinergico, adrenergico, dopaminergico, serotoninergico, gaba, histamina, antineoplasicos, anticuerpos];
const ids = new Set(base.flatMap(c => c.farmacos.map(f => f.id)));

// La práctica vive en un solo banco, sacado de las fotos de clase y de exámenes.
export const CAPITULOS: Capitulo[] = base.map(c => ({
  ...c,
  farmacos: c.farmacos.map(f => ({ ...f, confusiones: f.confusiones?.filter(x => ids.has(x)) })),
  preguntas: CHOICE.filter(p => p.cap === c.id),
  desarrollos: DESARROLLOS_REALES.filter(d => d.cap === c.id),
}));

export const FARMACOS: Farmaco[] = CAPITULOS.flatMap(c => c.farmacos);
export const GRUPOS: Grupo[] = CAPITULOS.flatMap(c => c.grupos);
export const PAREJAS: Pareja[] = CAPITULOS.flatMap(c => c.parejas);
export const PREGUNTAS: Pregunta[] = CAPITULOS.flatMap(c => c.preguntas);
export const DESARROLLOS: Desarrollo[] = CAPITULOS.flatMap(c => c.desarrollos);

const porId = new Map(FARMACOS.map(f => [f.id, f]));
export const ficha = (id: string): Farmaco | undefined => porId.get(id);
export const capitulo = (id: string): Capitulo | undefined => CAPITULOS.find(c => c.id === id);
export const grupoDe = (f: Farmaco): Grupo => GRUPOS.find(g => g.id === f.grupo)!;
export const grupo = (id: string): Grupo | undefined => GRUPOS.find(g => g.id === id);
export const miembros = (grupoId: string): Farmaco[] => FARMACOS.filter(f => f.grupo === grupoId);

export const TEMA_CAP: Record<CapId, string> = {
  col: 'Colinérgicos', adr: 'Adrenérgicos', dop: 'Dopaminérgicos', ser: 'Serotoninérgicos', gab: 'GABA y glutamato',
  his: 'Histamina, hierro y EPO', neo: 'Antineoplásicos', acm: 'Anticuerpos monoclonales',
};
