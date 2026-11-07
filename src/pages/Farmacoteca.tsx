import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { CAPITULOS, DESARROLLOS, FARMACOS, PREGUNTAS, TEMA_CAP, capitulo, ficha, grupoDe } from '../data';
import { DISCREPANCIAS } from '../data/discrepancias';
import type { Farmaco } from '../data/tipos';
import { EnlaceFarmaco, estiloAccion } from '../components/base';
import { normal } from '../lib/ejercicios';
import { NIVEL_TEXTO, esConfusion } from '../lib/srs';
import { useEstado } from '../lib/store';

function texto(f: Farmaco) {
  return normal([f.nombre, ...(f.variantes ?? []), ...(f.sinonimos ?? []), f.diana, f.mecanismo, f.efecto, grupoDe(f).nombre, f.indicaciones ?? ''].join(' '));
}

export function Farmacoteca() {
  const [q, setQ] = useState('');
  const [cap, setCap] = useState('todos');
  const nav = useNavigate();
  const indice = useMemo(() => FARMACOS.map(f => ({ f, t: texto(f) })), []);
  const res = useMemo(() => {
    const nq = normal(q);
    const lista = indice.filter(x => (cap === 'todos' || x.f.cap === cap) && (!nq || x.t.includes(nq))).map(x => x.f);
    if (!nq) return lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return lista.sort((a, b) => Number(!normal(a.nombre).startsWith(nq)) - Number(!normal(b.nombre).startsWith(nq)) || a.prioridad - b.prioridad);
  }, [q, cap, indice]);
  const dianas = useMemo(() => [...new Set(FARMACOS.filter(f => f.prioridad === 1).map(f => f.diana))].sort(), []);
  return (
    <main className="pagina">
      <h1>Farmacoteca</h1>
      <form style={{ marginTop: 12 }} onSubmit={e => { e.preventDefault(); if (res[0]) nav(`/f/${res[0].id}`); }}>
        <input className="campo" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Nombre, receptor, mecanismo o efecto" aria-label="Buscar" />
      </form>
      <div className="segmento" style={{ marginTop: 10 }}>
        <button type="button" aria-pressed={cap === 'todos'} onClick={() => setCap('todos')}>Todos</button>
        {CAPITULOS.map(c => <button key={c.id} type="button" aria-pressed={cap === c.id} onClick={() => setCap(c.id)}>{c.titulo}</button>)}
      </div>
      {!q && <details style={{ marginTop: 12 }}>
        <summary style={{ fontWeight: 700 }}>Buscar por receptor o diana</summary>
        <div className="chips">{dianas.map(d => <button key={d} type="button" className="chip" onClick={() => setQ(d)}>{d}</button>)}</div>
      </details>}
      <p className="tenue chico" style={{ marginTop: 10 }}>{res.length} fármacos</p>
      {res.slice(0, 80).map(f => (
        <Link className="resultado" key={f.id} to={`/f/${f.id}`} style={estiloAccion(f.accion)}>
          <b>{f.nombre}</b>
          <div className="chico">{grupoDe(f).nombre}</div>
          <div className="chico tenue">{f.mecanismo}. {f.efecto}.</div>
        </Link>
      ))}
      {res.length > 80 && <p className="tenue">Escribí algo más para ver el resto.</p>}
      {res.length === 0 && <p>No hay fármacos con esa búsqueda. Probá con el receptor, por ejemplo D2.</p>}
    </main>
  );
}

export function Ficha() {
  const { id } = useParams();
  const f = ficha(id ?? '');
  const { memoria } = useEstado();
  if (!f) return <Navigate to="/farmacoteca" replace />;
  const g = grupoDe(f); const c = capitulo(f.cap)!; const m = memoria[f.id];
  const parecidos = (f.confusiones ?? []).map(ficha).filter((x): x is Farmaco => !!x);
  const hermanos = FARMACOS.filter(x => x.grupo === f.grupo && x.id !== f.id && x.prioridad <= 2);
  const mismaDiana = FARMACOS.filter(x => x.diana === f.diana && x.grupo !== f.grupo && x.prioridad <= 2);
  const dis = DISCREPANCIAS.find(d => d.id === f.discrepancia);
  const enPreg = PREGUNTAS.filter(p => p.farmacos?.includes(f.id)).length + DESARROLLOS.filter(d => d.farmacos?.includes(f.id)).length;
  return (
    <main className="pagina" style={estiloAccion(f.accion)}>
      <Link className="volver" to="/farmacoteca">Farmacoteca</Link>
      <h1 style={{ color: 'var(--c)', marginTop: 4 }}>{f.nombre}</h1>
      {f.sinonimos && <p className="tenue">También: {f.sinonimos.join(', ')}</p>}
      <dl className="dl">
        <dt>Grupo</dt><dd><Link to={`/c/${c.id}/mapa`}>{g.nombre}</Link></dd>
        <dt>Diana</dt><dd>{f.diana}</dd>
        <dt>Mecanismo</dt><dd>{f.mecanismo}</dd>
        <dt>Efecto</dt><dd>{f.efecto}</dd>
        {f.indicaciones && <><dt>Indicaciones</dt><dd>{f.indicaciones}</dd></>}
        {f.adversos && <><dt>Efectos adversos</dt><dd>{f.adversos}</dd></>}
        {f.clave && <><dt>Clave de examen</dt><dd style={{ fontWeight: 700 }}>{f.clave}</dd></>}
      </dl>
      {dis && <div className="nota mal" style={{ marginTop: 14 }}><b>Ojo con el material.</b> {dis.respuesta}<div className="chico" style={{ marginTop: 4 }}><Link to="/esencial/calidad">Ver el detalle</Link></div></div>}
      {parecidos.length > 0 && <section className="seccion"><h3>Se confunde con</h3><div className="chips">{parecidos.map(x => <EnlaceFarmaco key={x.id} f={x} />)}</div></section>}
      {hermanos.length > 0 && <section className="seccion"><h3>Su familia</h3><div className="chips">{hermanos.map(x => <EnlaceFarmaco key={x.id} f={x} />)}</div></section>}
      {mismaDiana.length > 0 && <section className="seccion"><h3>Misma diana, otro grupo</h3><div className="chips">{mismaDiana.map(x => <EnlaceFarmaco key={x.id} f={x} />)}</div></section>}
      <section className="seccion chico tenue">
        <p>Tu estado: {NIVEL_TEXTO[m?.nivel ?? 'nuevo']}{esConfusion(m) ? ', confusión frecuente' : ''}.</p>
        <p>{TEMA_CAP[f.cap]}. Prioridad {f.prioridad}. {f.pizarra ? 'Está en la pizarra. ' : ''}{enPreg ? `Aparece en ${enPreg} preguntas. ` : ''}Fuente: {f.fuentes.join(', ')}{f.externo ? ' (dato externo al material docente)' : ''}.</p>
      </section>
    </main>
  );
}
