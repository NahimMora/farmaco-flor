import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Desarrollo, Pregunta } from '../data/tipos';
import { ficha } from '../data';
import { registrar } from '../lib/srs';
import { actualizar, useEstado, type Autoeval } from '../lib/store';
import { Barra, EnlaceFarmaco, Origen, estiloAccion } from './base';
import { DiagramaCurva } from './Curva';

function guardar(id: string, ok: boolean) {
  actualizar(e => {
    const p = e.preguntas[id] ?? { ok: 0, mal: 0, ultimo: 0 };
    return { ...e, preguntas: { ...e.preguntas, [id]: { ...p, ok: p.ok + (ok ? 1 : 0), mal: p.mal + (ok ? 0 : 1), ultimo: Date.now(), ultimaBien: ok } } };
  });
}

function aplicarFarmacos(p: Pregunta, ok: boolean) {
  p.farmacos?.forEach(id => { if (ficha(id)) registrar(id, { modo: 'reconocer', ok, deAccion: true }); });
}

export function TarjetaPregunta({ p, onFin }: { p: Pregunta; onFin: (ok: boolean) => void }) {
  const [el, setEl] = useState<number | null>(null);
  const estado = useEstado();
  const marcada = estado.preguntas[p.id]?.marcada;
  const marcar = () => actualizar(e => ({ ...e, preguntas: { ...e.preguntas, [p.id]: { ...(e.preguntas[p.id] ?? { ok: 0, mal: 0, ultimo: 0 }), marcada: !marcada } } }));
  const opciones = p.tipo === 'mc' ? p.opciones : ['Verdadero', 'Falso'];
  const correcta = (i: number) => p.tipo === 'mc' ? p.correctas.includes(i) : (i === 0) === p.verdadero;
  const responder = (i: number) => {
    if (el !== null) return;
    setEl(i);
    const ok = correcta(i);
    guardar(p.id, ok);
    aplicarFarmacos(p, ok);
  };
  const fichas = (p.farmacos ?? []).map(ficha).filter(f => !!f);
  return (
    <div className="ej">
      <Origen real={p.origen === 'real'} fuente={p.fuente} estado={p.estado} />
      <p className="enunciado">{p.texto}</p>
      <div className="opciones">
        {opciones.map((o, i) => (
          <button key={o} type="button" disabled={el !== null} onClick={() => responder(i)}
            className={'opcion' + (el !== null && correcta(i) ? ' bien' : '') + (el === i && !correcta(i) ? ' mal' : '')}>
            {o}
            {el !== null && p.tipo === 'mc' && <span className="porque">{p.por[i]}</span>}
          </button>
        ))}
      </div>
      {el !== null && <div style={{ marginTop: 12 }}>
        {p.tipo === 'vf' && <p className="nota">{p.explica}</p>}
        {p.nota && <p className="nota mal">{p.nota}</p>}
        {fichas.length > 0 && <div className="chips">{fichas.map(f => <EnlaceFarmaco key={f!.id} f={f!} />)}</div>}
        <button type="button" className="boton ancho" onClick={() => onFin(correcta(el))}>Seguir</button>
        <div className="entre"><button type="button" className="enlace" onClick={marcar}>{marcada ? 'Quitar de marcadas' : 'Marcar para repasar'}</button><IrAlMapa cap={p.cap} /></div>
      </div>}
    </div>
  );
}

export function Cuestionario({ preguntas, tipo, onFin }: { preguntas: Pregunta[]; tipo: string; onFin?: (ok: number, total: number) => void }) {
  const [i, setI] = useState(0);
  const [mal, setMal] = useState<Pregunta[]>([]);
  const total = preguntas.length;
  if (!total) return <p className="tenue">No hay preguntas con ese filtro.</p>;
  if (i >= total) {
    return (
      <div>
        <p className="resumen-num">{total - mal.length}/{total}</p>
        {mal.length > 0 ? <>
          <p>Para revisar:</p>
          <ul>{mal.map(p => <li key={p.id}>{p.texto}</li>)}</ul>
        </> : <p>Todas bien.</p>}
      </div>
    );
  }
  return (
    <div>
      <Barra valor={i} total={total} />
      <TarjetaPregunta key={preguntas[i].id + i} p={preguntas[i]} onFin={ok => {
        const nuevos = ok ? mal : [...mal, preguntas[i]];
        setMal(nuevos);
        if (i + 1 >= total) {
          actualizar(e => ({ ...e, sesiones: [...e.sesiones, { fecha: Date.now(), tipo, ok: total - nuevos.length, total }].slice(-300) }));
          onFin?.(total - nuevos.length, total);
        }
        setI(i + 1);
      }} />
    </div>
  );
}

export function TarjetaDesarrollo({ d }: { d: Desarrollo }) {
  const [nivel, setNivel] = useState(0);
  const estado = useEstado();
  const ev = estado.desarrollos[d.id];
  const poner = (v: Autoeval) => actualizar(e => ({ ...e, desarrollos: { ...e.desarrollos, [d.id]: v } }));
  const fichas = (d.farmacos ?? []).map(ficha).filter(f => !!f);
  return (
    <article style={{ padding: '16px 0', borderBottom: '2px solid var(--linea)' }}>
      <Origen real={d.origen === 'real'} fuente={d.fuente} estado={d.estado} />
      <p className="enunciado" style={{ marginBottom: 10 }}>{d.texto}</p>
      {nivel === 0 && <button type="button" className="boton sec ancho" onClick={() => setNivel(1)}>Ver respuesta mínima</button>}
      {nivel >= 1 && <>
        <h3 style={{ fontSize: 21, marginTop: 6 }}>Respuesta mínima para aprobar</h3>
        <ul style={{ margin: '6px 0', paddingLeft: 20 }}>{d.minima.map(m => <li key={m}>{m}</li>)}</ul>
        {d.diagrama && <DiagramaCurva id={d.diagrama} />}
        {nivel === 1 && <button type="button" className="enlace" onClick={() => setNivel(2)}>Ver explicación completa</button>}
      </>}
      {nivel >= 2 && <>
        <h3 style={{ fontSize: 21, marginTop: 10 }}>Explicación completa</h3>
        <p>{d.completa}</p>
      </>}
      {nivel >= 1 && d.encontrada && <p className="nota mal">El material decía: «{d.encontrada}». {d.nota}</p>}
      {nivel >= 1 && !d.encontrada && d.nota && <p className="nota">{d.nota}</p>}
      {nivel >= 1 && fichas.length > 0 && <div className="chips">{fichas.map(f => <EnlaceFarmaco key={f!.id} f={f!} />)}</div>}
      {nivel >= 1 && <div className="autoeval">
        <button type="button" aria-pressed={ev === 'no'} style={{ ...estiloAccion('antagonista'), background: ev === 'no' ? 'var(--mal-fondo)' : undefined }} onClick={() => poner('no')}>No la sabía</button>
        <button type="button" aria-pressed={ev === 'parcial'} style={{ ...estiloAccion('modulador'), background: ev === 'parcial' ? 'var(--papel)' : undefined }} onClick={() => poner('parcial')}>La sabía a medias</button>
        <button type="button" aria-pressed={ev === 'si'} style={{ ...estiloAccion('inhibidor'), background: ev === 'si' ? 'var(--bien-fondo)' : undefined }} onClick={() => poner('si')}>La sabía</button>
      </div>}
    </article>
  );
}

export function IrAlMapa({ cap }: { cap: string }) {
  return <Link className="enlace" to={`/c/${cap}/mapa`}>Ver el mapa</Link>;
}
