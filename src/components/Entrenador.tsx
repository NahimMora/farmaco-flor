// Sesión de memoria: opciones para reconocer, listas en blanco para recuperar sin pistas.
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Accion } from '../data/tipos';
import { ficha, grupo, miembros } from '../data';
import { coincide, type Ejercicio } from '../lib/ejercicios';
import { registrar } from '../lib/srs';
import { actualizar } from '../lib/store';
import { Barra, estiloAccion, signo } from './base';

const color = (a: Accion) => estiloAccion(a);

function Opcion({ e, onFin }: { e: Extract<Ejercicio, { k: 'opcion' }>; onFin: (ok: boolean) => void }) {
  const [el, setEl] = useState<number | null>(null);
  const responder = (i: number) => {
    if (el !== null) return;
    setEl(i);
    const ok = i === e.ok;
    registrar(e.objetivo, { modo: 'reconocer', ok, confundidoCon: ok ? undefined : e.opciones[i].farmaco, deAccion: e.deAccion });
  };
  const nombreLargo = e.enunciado.length < 22;
  return (
    <div className="ej">
      <h3>{e.titulo}</h3>
      <p className={'enunciado' + (nombreLargo ? ' grande' : '')}>{e.enunciado}</p>
      <div className="opciones">
        {e.opciones.map((o, i) => (
          <button key={o.t} type="button" disabled={el !== null} onClick={() => responder(i)}
            className={'opcion' + (el !== null && i === e.ok ? ' bien' : '') + (el === i && i !== e.ok ? ' mal' : '')}>{o.t}</button>
        ))}
      </div>
      {el !== null && <>
        <p className="nota" style={{ marginTop: 12 }}>{e.explica}</p>
        <button type="button" className="boton ancho" onClick={() => onFin(el === e.ok)}>Seguir</button>
      </>}
    </div>
  );
}

function Clasificar({ e, onFin }: { e: Extract<Ejercicio, { k: 'clasificar' }>; onFin: (ok: boolean) => void }) {
  const f = ficha(e.farmaco)!;
  const [el, setEl] = useState<Accion | null>(null);
  return (
    <div className="ej">
      <h3>¿Qué es?</h3>
      <p className="enunciado grande">{f.nombre}</p>
      <div className="dos">
        {e.opciones.map(o => (
          <button key={o.a} type="button" disabled={el !== null} style={{ textAlign: 'center' }}
            className={'opcion' + (el !== null && o.a === e.ok ? ' bien' : '') + (el === o.a && o.a !== e.ok ? ' mal' : '')}
            onClick={() => { setEl(o.a); registrar(f.id, { modo: 'reconocer', ok: o.a === e.ok, deAccion: true }); }}>{o.t}</button>
        ))}
      </div>
      {el && <>
        <p className="nota" style={{ marginTop: 12 }}>{e.explica}</p>
        <button type="button" className="boton ancho" onClick={() => onFin(el === e.ok)}>Seguir</button>
      </>}
    </div>
  );
}

function Lista({ e, onFin }: { e: Extract<Ejercicio, { k: 'lista' }>; onFin: (ok: boolean) => void }) {
  const g = grupo(e.grupo)!;
  const [valor, setValor] = useState('');
  const [hallados, setHallados] = useState<string[]>([]);
  const [revelar, setRevelar] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const fichas = e.respuestas.map(id => ficha(id)!);
  const probar = (texto: string) => {
    const f = fichas.find(x => !hallados.includes(x.id) && coincide(texto, x));
    if (f) { setHallados(h => [...h, f.id]); setValor(''); registrar(f.id, { modo: 'recordar', nota: 'bien' }); return true; }
    return false;
  };
  const faltan = fichas.filter(f => !hallados.includes(f.id));
  const terminar = () => { if (!revelar) { faltan.forEach(f => registrar(f.id, { modo: 'recordar', nota: 'mal' })); setRevelar(true); } };
  const todos = faltan.length === 0;
  return (
    <div className="ej">
      <h3>Lista en blanco, sin pistas</h3>
      <p className="enunciado" style={color(g.accion)}>Escribí los {e.cuantos} de: {e.titulo}</p>
      {!revelar && !todos && (
        <form onSubmit={ev => { ev.preventDefault(); probar(valor); ref.current?.focus(); }}>
          <input ref={ref} className="campo" value={valor} autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="Escribí un nombre" aria-label="Nombre del fármaco"
            onChange={ev => { const v = ev.target.value; if (!probar(v)) setValor(v); }} />
        </form>
      )}
      <div className="chips" style={color(g.accion)}>
        {hallados.map(id => <span key={id} className="chip lleno">{ficha(id)!.nombre}</span>)}
        {revelar && faltan.map(f => <span key={f.id} className="chip falta">{f.nombre}</span>)}
      </div>
      <p className="tenue chico">{hallados.length} de {e.cuantos}. Los errores de tipeo chicos se aceptan.</p>
      {!revelar && !todos && <button type="button" className="boton sec ancho" onClick={terminar}>No recuerdo más, mostrar</button>}
      {(revelar || todos) && <button type="button" className="boton ancho" onClick={() => onFin(todos)}>Seguir</button>}
    </div>
  );
}

function Hueco({ e, onFin }: { e: Extract<Ejercicio, { k: 'hueco' }>; onFin: (ok: boolean) => void }) {
  const g = grupo(e.grupo)!;
  const [ver, setVer] = useState(false);
  const fin = (nota: 'bien' | 'casi' | 'mal') => { e.ocultos.forEach(id => registrar(id, { modo: 'recordar', nota })); onFin(nota === 'bien'); };
  return (
    <div className="ej">
      <h3>Completá la familia</h3>
      <p className="enunciado" style={color(g.accion)}>{g.nombre}: faltan {e.ocultos.length}</p>
      <div className="chips" style={color(g.accion)}>
        {e.visibles.map(id => <span key={id} className="chip">{ficha(id)!.nombre}</span>)}
        {e.ocultos.map(id => <span key={id} className={ver ? 'chip lleno' : 'chip falta'}>{ver ? ficha(id)!.nombre : '¿?'}</span>)}
      </div>
      {!ver && <button type="button" className="boton ancho" onClick={() => setVer(true)}>Ya lo pensé, mostrar</button>}
      {ver && <div className="autoeval">
        <button type="button" style={color('antagonista')} onClick={() => fin('mal')}>No lo sabía</button>
        <button type="button" style={color('modulador')} onClick={() => fin('casi')}>A medias</button>
        <button type="button" style={color('inhibidor')} onClick={() => fin('bien')}>Lo sabía</button>
      </div>}
    </div>
  );
}

function ParejaEj({ e, onFin }: { e: Extract<Ejercicio, { k: 'pareja' }>; onFin: (ok: boolean) => void }) {
  const a = ficha(e.pareja.a)!, b = ficha(e.pareja.b)!;
  return (
    <div className="ej">
      <h3>Pareja peligrosa</h3>
      <p className="enunciado">{a.nombre} y {b.nombre}</p>
      <p>{e.pareja.porQue}</p>
      <div className="dos">
        <div className="lado" style={{ color: 'inherit' }}><b style={color(a.accion)}>{a.nombre}</b>{e.pareja.aEs}</div>
        <div className="lado"><b style={color(b.accion)}>{b.nombre}</b>{e.pareja.bEs}</div>
      </div>
      <p className="nota">{e.pareja.truco}</p>
      <button type="button" className="boton ancho" onClick={() => onFin(true)}>Entendido</button>
    </div>
  );
}

export function Entrenador({ ejercicios, tipo, onFin }: { ejercicios: Ejercicio[]; tipo: string; onFin?: (ok: number, total: number) => void }) {
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(0);
  const [fallados] = useState(() => new Set<string>());
  const total = ejercicios.length;
  const e = ejercicios[i];
  const sig = (bien: boolean) => {
    if (e.k === 'opcion' && !bien) fallados.add(e.objetivo);
    if (e.k === 'clasificar' && !bien) fallados.add(e.farmaco);
    if (e.k === 'lista' && !bien) e.respuestas.forEach(id => fallados.add(id));
    if (e.k === 'hueco' && !bien) e.ocultos.forEach(id => fallados.add(id));
    const n = ok + (bien ? 1 : 0);
    setOk(n);
    if (i + 1 >= total) {
      actualizar(s => ({ ...s, sesiones: [...s.sesiones, { fecha: Date.now(), tipo, ok: n, total }].slice(-300) }));
      onFin?.(n, total);
    }
    setI(i + 1);
  };
  const lista = useMemo(() => [...fallados], [fallados, i]);
  if (total === 0) return <p className="tenue">No hay ejercicios para esta selección.</p>;
  if (i >= total) {
    return (
      <div>
        <p className="resumen-num">{ok}/{total}</p>
        {lista.length > 0 ? <>
          <p>Para volver a practicar:</p>
          <div className="chips">{lista.map(id => { const f = ficha(id); return f && <Link key={id} className="chip" style={color(f.accion)} to={`/f/${f.id}`}>{f.nombre}</Link>; })}</div>
        </> : <p>Sin errores en esta tanda.</p>}
      </div>
    );
  }
  return (
    <div>
      <Barra valor={i} total={total} />
      {e.k === 'opcion' && <Opcion key={e.id + i} e={e} onFin={sig} />}
      {e.k === 'clasificar' && <Clasificar key={e.id + i} e={e} onFin={sig} />}
      {e.k === 'lista' && <Lista key={e.id + i} e={e} onFin={sig} />}
      {e.k === 'hueco' && <Hueco key={e.id + i} e={e} onFin={sig} />}
      {e.k === 'pareja' && <ParejaEj key={e.id + i} e={e} onFin={sig} />}
    </div>
  );
}

export { miembros, signo };
