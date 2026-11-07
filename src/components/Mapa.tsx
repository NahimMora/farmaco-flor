import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Capitulo, Farmaco, Grupo } from '../data/tipos';
import { miembros } from '../data';
import { estiloAccion, signo } from './base';

function Nombre({ f, oculto, pista }: { f: Farmaco; oculto: boolean; pista?: boolean }) {
  const [visto, setVisto] = useState(false);
  const tapado = oculto && !visto;
  const alias = f.sinonimos?.[0];
  if (!oculto) {
    return <Link className="nombre" to={`/f/${f.id}`}><span>{f.nombre}</span>{alias && pista && <small> {alias}</small>}</Link>;
  }
  return (
    <button type="button" className={'nombre' + (tapado ? ' tapado' : '')} onClick={() => setVisto(v => !v)} aria-label={tapado ? 'Mostrar nombre' : f.nombre}>
      <span>{f.nombre}</span>
    </button>
  );
}

export function FamiliaMapa({ g, oculto }: { g: Grupo; oculto: boolean }) {
  const m = miembros(g.id);
  const base = m.filter(f => f.prioridad <= 2);
  const resto = m.filter(f => f.prioridad > 2);
  return (
    <div className="familia" style={estiloAccion(g.accion)}>
      <div className="titulo-fam">{signo(g.accion)} {g.nombre}</div>
      <div className="nombres">{base.map(f => <Nombre key={f.id} f={f} oculto={oculto} pista />)}</div>
      <div className="res">{g.resultado}</div>
      {resto.length > 0 && !oculto && <div className="mas-nombres">Solo si te sobra tiempo: {resto.map(f => f.nombre).join(', ')}</div>}
    </div>
  );
}

export function MapaCapitulo({ c }: { c: Capitulo }) {
  const [oculto, setOculto] = useState(false);
  const total = c.farmacos.filter(f => f.prioridad <= 2).length;
  return (
    <div>
      <p className="grito">Flor, esto tenés que sabértelo sí o sí</p>
      <p className="tenue" style={{ marginTop: 8 }}>{total} nombres en {c.grupos.length} grupos. {c.objetivo}</p>
      {c.avisos?.map(a => <p key={a} className="aviso">{a}</p>)}
      <div className="segmento" role="group" aria-label="Modo del mapa">
        <button type="button" aria-pressed={!oculto} onClick={() => setOculto(false)}>Mapa limpio</button>
        <button type="button" aria-pressed={oculto} onClick={() => setOculto(true)}>Mapa oculto</button>
      </div>
      {oculto && <p className="tenue chico" style={{ marginTop: 8 }}>Decí cada nombre de memoria y tocá la franja para comprobar.</p>}
      {c.mapa.map(b => (
        <section className="bloque" key={b.titulo}>
          <h3>{b.titulo}</h3>
          {b.grupos.map(id => { const g = c.grupos.find(x => x.id === id)!; return <FamiliaMapa key={id + String(oculto)} g={g} oculto={oculto} />; })}
        </section>
      ))}
    </div>
  );
}
