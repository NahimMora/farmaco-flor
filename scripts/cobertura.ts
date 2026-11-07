// Genera docs/matriz-temario.md y docs/cobertura.md desde el contenido real.
import { writeFileSync } from 'node:fs';
import { CAPITULOS, DESARROLLOS, FARMACOS, PREGUNTAS } from '../src/data';
import { CUADROS, frecuencias } from '../src/data/cuadros';
import { DISCREPANCIAS } from '../src/data/discrepancias';
import { cobertura } from '../src/data/inventario';
import { VIDEOS } from '../src/data/videos';

const f = frecuencias();
const filas = CAPITULOS.map(c => {
  const imp = c.farmacos.filter(x => x.prioridad <= 2);
  const piz = c.farmacos.filter(x => x.pizarra).length;
  const real = c.preguntas.filter(p => p.origen === 'real').length + c.desarrollos.filter(d => d.origen === 'real').length;
  const salidas = c.farmacos.reduce((n, x) => n + (f.get(x.id) ?? 0), 0);
  const dif = imp.length >= 20 ? 'Alta' : imp.length >= 12 ? 'Media' : 'Baja';
  return `| ${c.n}. ${c.titulo} | ${c.farmacos.length} (${imp.length} prioritarios) | ${piz} | ${real} | ${salidas} | ${dif} | ${c.escenas.length} escenas |`;
});
writeFileSync('docs/matriz-temario.md', `# Matriz de temario

Generada por \`scripts/cobertura.ts\`. Ningún tema confirmado queda sin capítulo.

| Tema | Fármacos | En pizarra | Preguntas reales | Apariciones en cuadros y desarrollos | Carga de memoria | Material visual |
|---|---|---|---|---|---|---|
${filas.join('\n')}

Orden elegido: colinérgicos primero porque dan el molde de la sinapsis y los efectos autonómicos; después adrenérgicos, que se entienden por contraste. Dopamina y serotonina reutilizan esa ruta y esos receptores. GABA, histamina, antineoplásicos y anticuerpos no dependen del resto.
`);

const cob = cobertura().map(c => `| ${c.t} | ${c.hay} | ${c.total} | ${Math.round((c.hay / c.total) * 100)}% |`).join('\n');
const vid = CAPITULOS.map(c => `| ${c.titulo} | ${VIDEOS[c.id]?.duracion ?? 'pendiente'} |`).join('\n');
writeFileSync('docs/cobertura.md', `# Cobertura

Generada por \`scripts/cobertura.ts\` contra el inventario de cada archivo.

| Fuente | Incorporado | Total | Cobertura |
|---|---|---|---|
${cob}

## Contenido publicado

- ${FARMACOS.length} fichas de fármacos, ${FARMACOS.filter(x => x.prioridad === 1).length} de prioridad 1.
- ${PREGUNTAS.length} preguntas reales de opciones y verdadero o falso.
- ${DESARROLLOS.length} desarrollos con respuesta mínima y completa.
- ${CUADROS.length} cuadros reales.
- ${DISCREPANCIAS.length} contradicciones documentadas.

## Videos

| Capítulo | Duración |
|---|---|
${vid}
`);
console.log(cob);
for (const c of CAPITULOS) console.log(c.id, c.farmacos.length, 'fármacos', c.grupos.length, 'grupos', c.preguntas.filter(p => p.tipo === 'mc').length, 'choice', c.preguntas.filter(p => p.tipo === 'vf').length, 'vf', c.desarrollos.length, 'dev');
console.log(FARMACOS.length, 'fármacos', PREGUNTAS.length, 'preguntas', DESARROLLOS.length, 'desarrollos', DISCREPANCIAS.length, 'discrepancias');
