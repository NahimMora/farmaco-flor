import { describe, expect, it } from 'vitest';
import { calcular, esConfusion, memoriaVacia } from '../src/lib/srs';
import { migrar } from '../src/lib/store';
import { coincide, deFarmacoAGrupo, deMecanismoANombre, deNombreAEfecto, deNombreAMecanismo, type Ejercicio } from '../src/lib/ejercicios';
import { FARMACOS, ficha } from '../src/data';

const DIA = 864e5;
const t0 = Date.UTC(2026, 10, 7, 12);

describe('repetición espaciada', () => {
  it('acertar con opciones nunca llega a recordado', () => {
    let m = memoriaVacia();
    for (let i = 0; i < 10; i++) m = calcular(m, { modo: 'reconocer', ok: true }, t0 + i * DIA);
    expect(m.nivel).toBe('reconocido');
  });
  it('recordar sin pistas en un solo día no consolida', () => {
    let m = memoriaVacia();
    m = calcular(m, { modo: 'recordar', nota: 'bien' }, t0);
    m = calcular(m, { modo: 'recordar', nota: 'bien' }, t0 + 1000);
    expect(m.nivel).toBe('recordado');
  });
  it('recordar en dos días distintos consolida', () => {
    let m = calcular(memoriaVacia(), { modo: 'recordar', nota: 'bien' }, t0);
    m = calcular(m, { modo: 'recordar', nota: 'bien' }, t0 + 2 * DIA);
    expect(m.nivel).toBe('consolidado');
    expect(m.proximo).toBeGreaterThan(t0 + 2 * DIA);
  });
  it('un error baja de nivel y vuelve a aparecer pronto', () => {
    let m = calcular(memoriaVacia(), { modo: 'recordar', nota: 'bien' }, t0);
    m = calcular(m, { modo: 'recordar', nota: 'bien' }, t0 + 2 * DIA);
    m = calcular(m, { modo: 'recordar', nota: 'mal' }, t0 + 3 * DIA);
    expect(m.nivel).toBe('recordado');
    expect(m.proximo - (t0 + 3 * DIA)).toBeLessThan(3600e3);
  });
  it('detecta confusiones repetidas entre dos fármacos', () => {
    let m = memoriaVacia();
    m = calcular(m, { modo: 'reconocer', ok: false, confundidoCon: 'haloperidol' }, t0);
    expect(esConfusion(m)).toBe(false);
    m = calcular(m, { modo: 'reconocer', ok: false, confundidoCon: 'haloperidol' }, t0 + 1);
    expect(esConfusion(m)).toBe(true);
  });
});

describe('persistencia', () => {
  it('migra datos viejos sin perder el avance', () => {
    const e = migrar({ v: 0, memoria: { atropina: { nivel: 'recordado' } } });
    expect(e.memoria.atropina.nivel).toBe('recordado');
    expect(e.ajustes.tema).toBe('auto');
    expect(e.v).toBe(1);
  });
  it('tolera datos corruptos', () => expect(migrar('basura').memoria).toEqual({}));
});

describe('nombres escritos a mano', () => {
  it('tolera errores chicos y acepta sinónimos', () => {
    expect(coincide('tubocurarna', ficha('tubocurarina')!)).toBe(true);
    expect(coincide('escopolamina', ficha('hioscina')!)).toBe(true);
    expect(coincide('Propanolol', ficha('propranolol')!)).toBe(true);
  });
  it('no confunde nombres parecidos', () => {
    expect(coincide('prazosin', ficha('propranolol')!)).toBe(false);
    expect(coincide('atropina', ficha('atracurio')!)).toBe(false);
  });
});

describe('ejercicios generados', () => {
  const opciones = (e: Ejercicio) => (e.k === 'opcion' ? e : null)!;
  it('siempre tienen la respuesta entre las opciones y sin repetir', () => {
    for (const f of FARMACOS.filter(x => x.prioridad <= 2)) {
      for (const gen of [deFarmacoAGrupo, deMecanismoANombre, deNombreAMecanismo, deNombreAEfecto]) {
        const e = opciones(gen(f));
        expect(e.ok, `${e.id}`).toBeGreaterThanOrEqual(0);
        expect(new Set(e.opciones.map(o => o.t)).size, e.id).toBe(e.opciones.length);
        expect(e.opciones.length, e.id).toBeGreaterThanOrEqual(3);
      }
    }
  });
  it('un distractor no puede ser otra respuesta válida', () => {
    for (const f of FARMACOS.filter(x => x.prioridad <= 2)) {
      const e = opciones(deMecanismoANombre(f));
      for (const o of e.opciones) {
        const x = o.farmaco ? ficha(o.farmaco) : undefined;
        if (x && x.id !== f.id) expect(x.diana === f.diana && x.accion === f.accion, `${f.id} y ${x.id}`).toBe(false);
      }
    }
  });
});
