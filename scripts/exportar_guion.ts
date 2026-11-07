// Pasa las escenas de cada capítulo a un guion por beats para la narración.
import { mkdirSync, writeFileSync } from 'node:fs';
import { CAPITULOS } from '../src/data';

mkdirSync('video/guion', { recursive: true });
let total = 0;
for (const c of CAPITULOS) {
  const beats = c.escenas.flatMap((e, ei) => e.pasos.map((p, pi) => ({ id: `${c.id}-${ei}-${pi}`, escena: ei, paso: pi, text: p.di, retener: p.retener ?? [] })));
  const pal = beats.reduce((n, b) => n + b.text.split(/\s+/).length, 0);
  total += pal;
  writeFileSync(`video/guion/${c.id}.json`, JSON.stringify({ cap: c.id, titulo: c.titulo, escenas: c.escenas.map(e => e.titulo), beats }, null, 1));
  console.log(c.id, beats.length, 'beats', pal, 'palabras', (pal / 155).toFixed(1), 'min');
}
console.log('total', total, (total / 155).toFixed(0), 'min');
