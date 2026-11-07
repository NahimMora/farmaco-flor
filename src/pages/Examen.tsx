import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CAPITULOS, DESARROLLOS, FARMACOS, PREGUNTAS, TEMA_CAP, grupo as grupoPorId } from '../data';
import { CUADROS, filaCuadro } from '../data/cuadros';
import type { CapId, Pregunta } from '../data/tipos';
import { Cuestionario, TarjetaDesarrollo } from '../components/Cuestionario';
import { Cinta, Origen } from '../components/base';
import { useEstado } from '../lib/store';

const mezclar = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

function Banco() {
  const estado = useEstado();
  const [cap, setCap] = useState<CapId | 'todos'>('todos');
  const [orig, setOrig] = useState<'todas' | 'real' | 'generada' | 'errores' | 'marcadas'>('todas');
  const [clave, setClave] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const lista = useMemo(() => {
    const base = PREGUNTAS.filter(p => cap === 'todos' || p.cap === cap);
    const fil = base.filter(p => {
      const e = estado.preguntas[p.id];
      if (orig === 'real' || orig === 'generada') return p.origen === orig;
      if (orig === 'errores') return e?.ultimaBien === false;
      if (orig === 'marcadas') return e?.marcada;
      return true;
    });
    return mezclar(fil);
  }, [cap, orig, clave, corriendo]);
  if (corriendo) return <div><button type="button" className="enlace" onClick={() => setCorriendo(false)}>Cambiar filtros</button><Cuestionario key={clave} preguntas={lista} tipo="Banco de preguntas" /></div>;
  return (
    <div>
      <p className="tenue">{lista.length} preguntas con estos filtros.</p>
      <div className="segmento" style={{ marginBottom: 8 }}>
        <button type="button" aria-pressed={cap === 'todos'} onClick={() => setCap('todos')}>Todos los temas</button>
        {CAPITULOS.map(c => <button key={c.id} type="button" aria-pressed={cap === c.id} onClick={() => setCap(c.id)}>{c.titulo}</button>)}
      </div>
      <div className="segmento" style={{ marginBottom: 14 }}>
        {([['todas', 'Todas'], ['real', 'Reales'], ['generada', 'De práctica'], ['errores', 'Mis errores'], ['marcadas', 'Marcadas']] as const).map(([k, t]) =>
          <button key={k} type="button" aria-pressed={orig === k} onClick={() => setOrig(k)}>{t}</button>)}
      </div>
      <button type="button" className="boton ancho" disabled={!lista.length} onClick={() => { setClave(k => k + 1); setCorriendo(true); }}>Empezar</button>
    </div>
  );
}

function Desarrollos() {
  const [cap, setCap] = useState<CapId | 'todos'>('todos');
  const lista = DESARROLLOS.filter(d => cap === 'todos' || d.cap === cap);
  return (
    <div>
      <div className="segmento">
        <button type="button" aria-pressed={cap === 'todos'} onClick={() => setCap('todos')}>Todos los temas</button>
        {CAPITULOS.map(c => <button key={c.id} type="button" aria-pressed={cap === c.id} onClick={() => setCap(c.id)}>{c.titulo}</button>)}
      </div>
      {lista.map(d => <TarjetaDesarrollo key={d.id} d={d} />)}
    </div>
  );
}

function CuadroExamen({ id }: { id: string }) {
  const q = CUADROS.find(c => c.id === id)!;
  return (
    <article style={{ padding: '16px 0', borderBottom: '2px solid var(--linea)' }}>
      <Origen real fuente={q.fuente} />
      <p className="enunciado" style={{ marginBottom: 6 }}>{q.titulo}</p>
      <p className="tenue chico">Decí mecanismo y efecto. Tocá cada franja para comprobar.</p>
      {q.filas.map(f => {
        const r = filaCuadro(f);
        return (
          <div className="tarjeta-fila" key={f}>
            <span className="nom" style={{ color: 'inherit' }}>{r.nombre}</span>
            <span className="rotulo">Mecanismo</span><Cinta tapada>{r.mecanismo}</Cinta>
            <span className="rotulo">Efecto</span><Cinta tapada>{r.efecto}</Cinta>
          </div>
        );
      })}
    </article>
  );
}

/** Simulacro con el formato de los exámenes reales: cuadros, desarrollo y algo de choice. */
function Simulacro() {
  const estado = useEstado();
  const [n, setN] = useState(0);
  const [hecho, setHecho] = useState(false);
  const arma = useMemo(() => {
    const prio = (p: Pregunta) => (estado.preguntas[p.id]?.ultimaBien === false ? 0 : 1) + Math.random();
    const choice = [...PREGUNTAS].sort((a, b) => prio(a) - prio(b)).slice(0, 10);
    return { cuadro: mezclar(CUADROS).slice(0, 2).map(c => c.id), dev: mezclar(DESARROLLOS).slice(0, 8), choice };
  }, [n]);
  if (!n) return (
    <div>
      <p>Mezcla los formatos que aparecen en los exámenes reales: completar cuadros, mencionar fármacos y explicar mecanismos, más un choice corto como entrenamiento.</p>
      <p className="tenue chico">El puntaje real del docente no está documentado: acá se usa solo para que veas qué falta.</p>
      <button type="button" className="boton ancho" onClick={() => { setHecho(false); setN(1); }}>Armar un simulacro</button>
    </div>
  );
  const flojos = (() => {
    const cuenta = new Map<CapId, number>();
    PREGUNTAS.filter(p => estado.preguntas[p.id]?.ultimaBien === false).forEach(p => cuenta.set(p.cap, (cuenta.get(p.cap) ?? 0) + 1));
    return [...cuenta.entries()].sort((a, b) => b[1] - a[1]);
  })();
  return (
    <div>
      <h2>Parte 1: cuadros</h2>
      {arma.cuadro.map(id => <CuadroExamen key={id} id={id} />)}
      <h2 className="seccion">Parte 2: desarrollo</h2>
      {arma.dev.map(d => <TarjetaDesarrollo key={d.id} d={d} />)}
      <h2 className="seccion" style={{ marginBottom: 12 }}>Parte 3: choice</h2>
      <Cuestionario key={n} preguntas={arma.choice} tipo="Simulacro" onFin={() => setHecho(true)} />
      {hecho && <section className="seccion">
        <h2>Temas más flojos</h2>
        {flojos.length ? flojos.map(([c, k]) => <Link key={c} className="fila-cap" to={`/c/${c}/mapa`}><h3>{TEMA_CAP[c]}</h3><span className="tenue chico">{k} para revisar</span></Link>) : <p>No quedaron errores registrados.</p>}
        <Link className="boton ancho" style={{ marginTop: 10 }} to="/memorizar/repaso">Hacer el repaso específico</Link>
      </section>}
      <button type="button" className="boton sec ancho seccion" onClick={() => setN(k => k + 1)}>Armar otro simulacro</button>
    </div>
  );
}

export function Examen() {
  const { vista = 'banco' } = useParams();
  const reales = PREGUNTAS.filter(p => p.origen === 'real').length;
  return (
    <main className="pagina">
      <h1>Examen</h1>
      <p className="tenue" style={{ marginTop: 6 }}>{reales} preguntas reales, {PREGUNTAS.length - reales} de práctica y {DESARROLLOS.length} desarrollos sobre {FARMACOS.length} fármacos.</p>
      <div className="segmento" style={{ margin: '10px 0 16px' }}>
        <Link to="/examen/banco" replace><button type="button" aria-pressed={vista === 'banco'}>Choice</button></Link>
        <Link to="/examen/desarrollo" replace><button type="button" aria-pressed={vista === 'desarrollo'}>Desarrollo</button></Link>
        <Link to="/examen/cuadros" replace><button type="button" aria-pressed={vista === 'cuadros'}>Cuadros</button></Link>
        <Link to="/examen/simulacro" replace><button type="button" aria-pressed={vista === 'simulacro'}>Simulacro</button></Link>
      </div>
      {vista === 'banco' && <Banco />}
      {vista === 'desarrollo' && <Desarrollos />}
      {vista === 'cuadros' && CUADROS.map(c => <CuadroExamen key={c.id} id={c.id} />)}
      {vista === 'simulacro' && <Simulacro />}
    </main>
  );
}

export { grupoPorId };
