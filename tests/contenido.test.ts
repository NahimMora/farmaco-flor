// Control de cobertura y exactitud: si algo falla acá, no se publica (lo corre el deploy).
import { describe, expect, it } from 'vitest';
import { CAPITULOS, DESARROLLOS, FARMACOS, GRUPOS, PAREJAS, PREGUNTAS, ficha, miembros } from '../src/data';
import { CUADROS, filaCuadro } from '../src/data/cuadros';
import { DISCREPANCIAS } from '../src/data/discrepancias';
import { CUADRO, PIZARRA } from '../src/data/pizarra';
import { BLOQUES, EJEMPLOS_FIN, LUGARES } from '../src/data/guia';
import { coincide, normal } from '../src/lib/ejercicios';

describe('cobertura', () => {
  it('la lista base está completa y no se infló', () => {
    expect(CUADRO.filter(n => !FARMACOS.some(f => coincide(n, f)))).toEqual([]);
    expect(PIZARRA.filter(n => !FARMACOS.some(f => coincide(n, f)))).toEqual([]);
    expect(FARMACOS.length).toBeLessThanOrEqual(140);
  });
  it('están las 40 de choice y las 17 de verdadero o falso', () => {
    expect(PREGUNTAS.filter(p => p.tipo === 'mc').length).toBe(40);
    expect(PREGUNTAS.filter(p => p.tipo === 'vf').length).toBe(17);
    expect(PREGUNTAS.every(p => p.origen === 'real')).toBe(true);
  });
  it('los 40 choice mantienen 4 opciones', () => {
    for (const p of PREGUNTAS) if (p.tipo === 'mc') expect(p.opciones.length, p.id).toBe(4);
  });
  it('si la app corrige una marca de la hoja, lo aclara', () => {
    for (const p of PREGUNTAS) if (p.tipo === 'mc' && p.claveMaterial !== undefined) {
      expect(p.nota, p.id).toBeTruthy();
      expect(p.correctas, p.id).not.toContain(p.claveMaterial);
    }
  });
  it('cada grupo aparece en el mapa de su capítulo y tiene integrantes', () => {
    for (const c of CAPITULOS) {
      const enMapa = c.mapa.flatMap(b => b.grupos);
      for (const b of c.mapa) for (const id of b.tambien ?? []) expect(ficha(id), id).toBeTruthy();
      for (const g of c.grupos) {
        expect(enMapa, g.id).toContain(g.id);
        expect(miembros(g.id).length, g.id).toBeGreaterThan(0);
      }
      for (const id of enMapa) expect(c.grupos.some(g => g.id === id), id).toBe(true);
    }
  });
  it('cada grupo tiene mnemotecnia', () => {
    const falta = CAPITULOS.flatMap(c => c.grupos.filter(g => !c.mnemotecnias.some(m => m.grupo === g.id)).map(g => g.id));
    expect(falta).toEqual([]);
  });
  it('cada capítulo tiene contenido', () => {
    for (const c of CAPITULOS) {
      expect(c.mnemotecnias.length, c.id).toBeGreaterThan(0);
      expect(c.parejas.length, c.id).toBeGreaterThan(0);
      expect(c.escenas.length, c.id).toBeGreaterThan(2);
      expect(c.desarrollos.length, c.id).toBeGreaterThan(0);
    }
  });
  it('las mnemotecnias y escenas no nombran fármacos que salieron de la lista', () => {
    const fuera = /tiagabina|felbamato|nedocromilo|yohimbina|ifosfamida|citarabina|mitoxantrona|vinorelbine|tositumomab|reserpina|tetrabenazina/i;
    for (const c of CAPITULOS) {
      for (const m of c.mnemotecnias) expect(m.frase + m.reconstruye + JSON.stringify(m.partes), m.id).not.toMatch(fuera);
      for (const e of c.escenas) expect(JSON.stringify(e), e.id).not.toMatch(fuera);
    }
  });
});

describe('guía', () => {
  it('cada capítulo está una sola vez en el mapa general', () => {
    const caps = BLOQUES.flatMap(b => b.caps);
    expect([...caps].sort()).toEqual(CAPITULOS.map(c => c.id).sort());
  });
  it('los fármacos citados existen y actúan como dice la guía', () => {
    const malos: string[] = [];
    for (const l of LUGARES) for (const e of Object.values(l.ejemplos)) {
      for (const id of [...(e.activa ?? []), ...(e.frena ?? [])]) if (!ficha(id)) malos.push(id);
      for (const id of e.activa ?? []) { const a = ficha(id)?.accion; if (a === 'antagonista' || a === 'bloqueante') malos.push(`${id} no activa`); }
      for (const id of e.frena ?? []) { const a = ficha(id)?.accion; if (a === 'agonista') malos.push(`${id} no frena`); }
    }
    EJEMPLOS_FIN.forEach(e => { if (!ficha(e.id)) malos.push(e.id); });
    expect(malos).toEqual([]);
  });
});

describe('integridad', () => {
  it('ids únicos', () => {
    const ids = FARMACOS.map(f => f.id);
    expect(ids.filter((x, i) => ids.indexOf(x) !== i)).toEqual([]);
    const pid = PREGUNTAS.map(p => p.id);
    expect(pid.filter((x, i) => pid.indexOf(x) !== i)).toEqual([]);
    const did = DESARROLLOS.map(d => d.id);
    expect(did.filter((x, i) => did.indexOf(x) !== i)).toEqual([]);
  });
  it('sin nombres duplicados por grafía', () => {
    const vistos = new Map<string, string>();
    for (const f of FARMACOS) {
      for (const n of [f.nombre, ...(f.variantes ?? []), ...(f.sinonimos ?? [])]) {
        const k = normal(n);
        expect(vistos.has(k) && vistos.get(k) !== f.id ? `${n}: ${vistos.get(k)} y ${f.id}` : '').toBe('');
        vistos.set(k, f.id);
      }
    }
  });
  it('referencias a fármacos válidas', () => {
    const malos: string[] = [];
    FARMACOS.forEach(f => (f.confusiones ?? []).forEach(c => { if (!ficha(c)) malos.push(`${f.id}->${c}`); }));
    PAREJAS.forEach(p => [p.a, p.b].forEach(c => { if (!ficha(c)) malos.push(`pareja ${c}`); }));
    [...PREGUNTAS, ...DESARROLLOS].forEach(p => (p.farmacos ?? []).forEach(c => { if (!ficha(c)) malos.push(`${p.id}->${c}`); }));
    expect(malos).toEqual([]);
  });
  it('los grupos existen y las discrepancias citadas están documentadas', () => {
    const g = new Set(GRUPOS.map(x => x.id));
    expect(FARMACOS.filter(f => !g.has(f.grupo)).map(f => f.id)).toEqual([]);
    const d = new Set(DISCREPANCIAS.map(x => x.id));
    expect(FARMACOS.filter(f => f.discrepancia && !d.has(f.discrepancia)).map(f => f.id)).toEqual([]);
  });
  it('los cuadros se pueden armar', () => {
    for (const c of CUADROS) c.filas.forEach(id => expect(() => filaCuadro(id)).not.toThrow());
  });
  it('las opciones tienen una explicación cada una y clave válida', () => {
    for (const p of PREGUNTAS) {
      if (p.tipo !== 'mc') continue;
      expect(p.por.length, p.id).toBe(p.opciones.length);
      expect(new Set(p.opciones).size, p.id).toBe(p.opciones.length);
      p.correctas.forEach(k => expect(k, p.id).toBeLessThan(p.opciones.length));
      if (p.correctas.length > 1) expect(p.nota, p.id).toBeTruthy();
    }
  });
  it('sin preguntas duplicadas', () => {
    const t = PREGUNTAS.map(p => normal(p.texto + (p.tipo === 'mc' ? p.opciones.join() : '')));
    const rep = PREGUNTAS.filter((_, i) => t.indexOf(t[i]) !== i).map(p => p.id);
    expect(rep).toEqual([]);
  });
  it('desarrollos completos', () => {
    for (const d of DESARROLLOS) {
      expect(d.minima.length, d.id).toBeGreaterThan(0);
      expect(d.completa.length, d.id).toBeGreaterThan(10);
    }
  });
  it('las escenas no nombran fármacos con una acción contraria a su ficha', () => {
    const acciones: Record<string, 'bloquea' | 'activa'> = {};
    for (const f of FARMACOS) {
      if (f.accion === 'agonista') acciones[normal(f.nombre)] = 'activa';
      if (f.accion === 'antagonista' || f.accion === 'bloqueante') acciones[normal(f.nombre)] = 'bloquea';
    }
    const malos: string[] = [];
    for (const c of CAPITULOS) for (const e of c.escenas) {
      if (e.tipo !== 'sinapsis') continue;
      for (const p of e.pasos) for (const d of p.drogas ?? []) {
        const esperado = acciones[normal(d.n)];
        const hace = d.a === 'agonista' ? 'activa' : d.a === 'antagonista' || d.a === 'bloqueante' ? 'bloquea' : undefined;
        if (esperado && hace && esperado !== hace) malos.push(`${e.id}: ${d.n}`);
      }
    }
    expect(malos).toEqual([]);
  });
});
