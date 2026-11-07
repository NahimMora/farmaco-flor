import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate, useParams } from 'react-router-dom';
import type { Capitulo as Cap } from '../data/tipos';
import { capitulo, ficha, miembros } from '../data';
import { VIDEOS } from '../data/videos';
import { Cinta, EnlaceFarmaco, estiloAccion } from '../components/base';
import { Cuestionario, TarjetaDesarrollo } from '../components/Cuestionario';
import { Entrenador } from '../components/Entrenador';
import { FamiliaMapa, MapaCapitulo } from '../components/Mapa';
import { Teoria } from '../components/Teoria';
import { completarFamilia, listaEnBlanco, sesionCapitulo } from '../lib/ejercicios';
import { actualizar, useEstado } from '../lib/store';
import { esConfusion } from '../lib/srs';

const PASOS = [
  ['mapa', 'Sabete esto'], ['nombres', 'Nombres'], ['teoria', 'Teoría'], ['video', 'Video'],
  ['cuadro', 'Cuadro'], ['choice', 'Choice'], ['desarrollo', 'Desarrollo'], ['examen', 'Examen'],
] as const;

const mezclar = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

function marcar(cap: string, paso: string) {
  actualizar(e => {
    const ya = e.pasos[cap] ?? [];
    return ya.includes(paso) ? { ...e, ultimoCap: cap } : { ...e, ultimoCap: cap, pasos: { ...e.pasos, [cap]: [...ya, paso] } };
  });
}

function Nombres({ c }: { c: Cap }) {
  const [modo, setModo] = useState<'estudiar' | 'practicar' | 'vacio'>('estudiar');
  const [clave, setClave] = useState(0);
  const ej = useMemo(() => sesionCapitulo(c.id, 14), [c.id, clave]);
  return (
    <div>
      <div className="segmento" role="group">
        <button type="button" aria-pressed={modo === 'estudiar'} onClick={() => setModo('estudiar')}>Familias y trucos</button>
        <button type="button" aria-pressed={modo === 'practicar'} onClick={() => { setClave(k => k + 1); setModo('practicar'); }}>Practicar nombres</button>
        <button type="button" aria-pressed={modo === 'vacio'} onClick={() => setModo('vacio')}>Mapa vacío</button>
      </div>
      {modo === 'vacio' && <div className="seccion" style={{ marginTop: 14 }}>
        <p>Reconstruí cada grupo en voz alta o en papel. Después tocá las franjas para corregirte.</p>
        {c.grupos.map(g => <FamiliaMapa key={g.id} g={g} oculto />)}
      </div>}
      {modo === 'estudiar' && <>
        {c.grupos.map(g => {
          const m = miembros(g.id).filter(f => f.prioridad <= 2);
          const nem = c.mnemotecnias.filter(x => x.grupo === g.id);
          return (
            <section key={g.id} className="seccion" style={estiloAccion(g.accion)}>
              <h2 style={{ color: 'var(--c)' }}>{g.nombre}</h2>
              {g.regla && <p style={{ marginTop: 6 }}>{g.regla}</p>}
              {g.patron && <p className="nota">{g.patron}{g.excepcion ? ` Excepción: ${g.excepcion}` : ''}</p>}
              <div className="chips">{m.map(f => <EnlaceFarmaco key={f.id} f={f} />)}</div>
              {nem.map(n => (
                <div className="mnemo" key={n.id}>
                  <p className="frase">{n.frase}</p>
                  <ul>{n.partes.map(p => <li key={p.trozo}><b>{p.trozo}</b>: {p.es}</li>)}</ul>
                  <p className="chico tenue" style={{ margin: 0 }}>Te da: {n.reconstruye}</p>
                  <p className="chico tenue" style={{ margin: 0 }}>Te evita: {n.evita}</p>
                </div>
              ))}
            </section>
          );
        })}
        <section className="seccion">
          <h2>Parejas peligrosas</h2>
          {c.parejas.map(p => {
            const a = ficha(p.a)!, b = ficha(p.b)!;
            return (
              <div className="pareja" key={p.a + p.b}>
                <p style={{ fontWeight: 600 }}>{p.porQue}</p>
                <div className="dos">
                  <div className="lado"><b style={{ color: 'var(--c)', ...estiloAccion(a.accion) }}>{a.nombre}</b>{p.aEs}</div>
                  <div className="lado"><b style={{ color: 'var(--c)', ...estiloAccion(b.accion) }}>{b.nombre}</b>{p.bEs}</div>
                </div>
                <p className="nota">{p.truco}</p>
              </div>
            );
          })}
        </section>
        <button type="button" className="boton ancho seccion" onClick={() => { setClave(k => k + 1); setModo('practicar'); }}>Practicar estos nombres</button>
      </>}
      {modo === 'practicar' && <div className="seccion" style={{ marginTop: 16 }}>
        <Entrenador key={clave} ejercicios={ej} tipo={`Nombres: ${c.titulo}`} onFin={() => marcar(c.id, 'nombres')} />
        <button type="button" className="enlace" onClick={() => setClave(k => k + 1)}>Empezar otra tanda</button>
      </div>}
    </div>
  );
}

function Cuadro({ c }: { c: Cap }) {
  const [filtro, setFiltro] = useState('todos');
  const [ocultas, setOcultas] = useState({ mec: false, efe: false });
  const lista = c.farmacos.filter(f => f.prioridad <= 2 && (filtro === 'todos' || f.grupo === filtro));
  const claveCinta = `${ocultas.mec}${ocultas.efe}`;
  return (
    <div>
      <div className="segmento" aria-label="Filtrar por grupo">
        <button type="button" aria-pressed={filtro === 'todos'} onClick={() => setFiltro('todos')}>Todos</button>
        {c.grupos.map(g => <button key={g.id} type="button" aria-pressed={filtro === g.id} onClick={() => setFiltro(g.id)}>{g.nombre}</button>)}
      </div>
      <div className="fila" style={{ margin: '10px 0' }}>
        <span className="tenue chico">Ocultar para practicar:</span>
        <div className="segmento">
          <button type="button" aria-pressed={ocultas.mec} onClick={() => setOcultas(o => ({ ...o, mec: !o.mec }))}>Mecanismo</button>
          <button type="button" aria-pressed={ocultas.efe} onClick={() => setOcultas(o => ({ ...o, efe: !o.efe }))}>Efecto</button>
        </div>
      </div>
      <div className="solo-angosto">
        {lista.map(f => (
          <div className="tarjeta-fila" key={f.id + claveCinta} style={estiloAccion(f.accion)}>
            <Link className="nom" to={`/f/${f.id}`}>{f.nombre}</Link>
            <span className="rotulo">Mecanismo</span><Cinta tapada={ocultas.mec}>{f.mecanismo}</Cinta>
            <span className="rotulo">Efecto</span><Cinta tapada={ocultas.efe}>{f.efecto}</Cinta>
            {f.clave && <><span className="rotulo">Clave de examen</span><span style={{ fontSize: 16 }}>{f.clave}</span></>}
          </div>
        ))}
      </div>
      <table className="tabla solo-ancho">
        <thead><tr><th>Fármaco</th><th>Diana</th><th>Mecanismo</th><th>Efecto</th><th>Clave de examen</th></tr></thead>
        <tbody>{lista.map(f => (
          <tr key={f.id + claveCinta} style={estiloAccion(f.accion)}>
            <td><Link className="nom" style={{ color: 'var(--c)', fontWeight: 800 }} to={`/f/${f.id}`}>{f.nombre}</Link></td>
            <td>{f.diana}</td>
            <td><Cinta tapada={ocultas.mec}>{f.mecanismo}</Cinta></td>
            <td><Cinta tapada={ocultas.efe}>{f.efecto}</Cinta></td>
            <td>{f.clave}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function ExamenCap({ c }: { c: Cap }) {
  const [fase, setFase] = useState(0);
  const estado = useEstado();
  const nombres = useMemo(() => {
    const gr = mezclar(c.grupos).map(listaEnBlanco).filter(e => !!e).slice(0, 2);
    const hu = mezclar(c.grupos).map(completarFamilia).filter(e => !!e).slice(0, 1);
    return [...sesionCapitulo(c.id, 6), ...gr, ...hu];
  }, [c.id]);
  const preg = useMemo(() => {
    const fallidas = c.preguntas.filter(p => estado.preguntas[p.id]?.ultimaBien === false);
    const otras = mezclar(c.preguntas.filter(p => !fallidas.includes(p)));
    return [...fallidas, ...otras].slice(0, 8);
  }, [c.id]);
  const dev = useMemo(() => mezclar(c.desarrollos).slice(0, 3), [c.id]);
  if (fase === 0) return <div><h2 style={{ marginBottom: 12 }}>Nombres sin pistas</h2><Entrenador ejercicios={nombres} tipo={`Examen nombres: ${c.titulo}`} onFin={() => setTimeout(() => setFase(1), 700)} /></div>;
  if (fase === 1) return <div><h2 style={{ marginBottom: 12 }}>Mecanismos y efectos</h2><Cuestionario preguntas={preg} tipo={`Examen: ${c.titulo}`} onFin={() => setTimeout(() => setFase(2), 700)} /></div>;
  const pendientes = c.farmacos.filter(f => f.prioridad <= 2 && (estado.memoria[f.id]?.nivel ?? 'nuevo') !== 'consolidado');
  const confus = c.farmacos.filter(f => esConfusion(estado.memoria[f.id]));
  return (
    <div>
      <h2>Desarrollo</h2>
      {dev.map(d => <TarjetaDesarrollo key={d.id} d={d} />)}
      <section className="seccion">
        <h2>Lo que todavía no está consolidado</h2>
        <p className="tenue">Consolidar exige recordar el nombre sin pistas en días distintos.</p>
        <div className="chips">{pendientes.map(f => <EnlaceFarmaco key={f.id} f={f} />)}</div>
        {confus.length > 0 && <><h3>Confusiones frecuentes</h3><div className="chips">{confus.map(f => <EnlaceFarmaco key={f.id} f={f} />)}</div></>}
        <Link className="boton ancho" style={{ marginTop: 10 }} to={`/c/${c.id}/mapa`}>Volver al mapa</Link>
      </section>
    </div>
  );
}

export function Capitulo() {
  const { id, paso } = useParams();
  const nav = useNavigate();
  const c = capitulo(id ?? '');
  const estado = useEstado();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (c && paso) marcar(c.id, paso === 'nombres' ? 'mapa' : paso);
    document.querySelector('.riel a.activo')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [c, paso]);
  if (!c) return <Navigate to="/capitulos" replace />;
  if (!paso) return <Navigate to={`/c/${c.id}/mapa`} replace />;
  const hechos = estado.pasos[c.id] ?? [];
  const v = VIDEOS[c.id];
  const i = PASOS.findIndex(p => p[0] === paso);
  const sig = PASOS[i + 1];
  return (
    <div>
      <header className="cabeza-cap">
        <Link className="volver" to="/capitulos">Capítulos</Link>
        <h1 style={{ marginTop: 2 }}>{c.titulo}</h1>
      </header>
      <nav className="riel" aria-label="Pasos del capítulo" style={{ marginTop: 10 }}>
        <ol>{PASOS.map(([p, t]) => (
          <li key={p}><NavLink to={`/c/${c.id}/${p}`} replace className={({ isActive }) => (isActive ? 'activo ' : '') + (hechos.includes(p) ? 'hecho' : '')}>{t}</NavLink></li>
        ))}</ol>
      </nav>
      <main className="pagina">
        {paso === 'mapa' && <MapaCapitulo c={c} />}
        {paso === 'nombres' && <Nombres c={c} />}
        {paso === 'teoria' && <Teoria escenas={c.escenas} onFin={() => nav(`/c/${c.id}/video`)} />}
        {paso === 'video' && (v
          ? <div>
              <video className="video" controls preload="none" playsInline poster={import.meta.env.BASE_URL + v.poster} src={import.meta.env.BASE_URL + v.src} onPlay={() => marcar(c.id, 'video')} id="clase" />
              <p className="tenue chico" style={{ marginTop: 8 }}>{v.duracion} con la voz de Tomás. Tocá un tema para saltar.</p>
              {v.marcas.map(m => <button key={m.t} type="button" className="enlace" style={{ display: 'block' }} onClick={() => { const el = document.getElementById('clase') as HTMLVideoElement; el.currentTime = m.t; void el.play(); }}>{m.titulo}</button>)}
            </div>
          : <p className="nota">La clase en video de este capítulo todavía no está publicada. La misma explicación, paso a paso, está en Teoría.</p>)}
        {paso === 'cuadro' && <Cuadro c={c} />}
        {paso === 'choice' && <Cuestionario preguntas={c.preguntas} tipo={`Choice: ${c.titulo}`} onFin={() => setTimeout(() => nav(`/c/${c.id}/desarrollo`), 1800)} />}
        {paso === 'desarrollo' && <div>{c.desarrollos.map(d => <TarjetaDesarrollo key={d.id} d={d} />)}</div>}
        {paso === 'examen' && <ExamenCap c={c} />}
        {sig && paso !== 'examen' && paso !== 'choice' && <Link className="boton sec ancho seccion" to={`/c/${c.id}/${sig[0]}`} onClick={() => marcar(c.id, paso)}>Seguir con {sig[1].toLowerCase()}</Link>}
      </main>
    </div>
  );
}
