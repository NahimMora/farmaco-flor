import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CAPITULOS, DESARROLLOS, PREGUNTAS, TEMA_CAP } from '../data';
import { CUADROS, filaCuadro } from '../data/cuadros';
import type { CapId } from '../data/tipos';
import { Cuestionario, TarjetaDesarrollo } from '../components/Cuestionario';
import { Cinta, Origen } from '../components/base';
import { useEstado } from '../lib/store';

const mezclar = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

function Banco() {
  const estado = useEstado();
  const [cap, setCap] = useState<CapId | 'todos'>('todos');
  const [orig, setOrig] = useState<'todas' | 'mc' | 'vf' | 'errores' | 'marcadas'>('todas');
  const [clave, setClave] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const lista = useMemo(() => {
    const base = PREGUNTAS.filter(p => cap === 'todos' || p.cap === cap);
    return base.filter(p => {
      const e = estado.preguntas[p.id];
      if (orig === 'mc' || orig === 'vf') return p.tipo === orig;
      if (orig === 'errores') return e?.ultimaBien === false;
      if (orig === 'marcadas') return e?.marcada;
      return true;
    });
  }, [cap, orig, clave, corriendo]);
  if (corriendo) return <div><button type="button" className="enlace" onClick={() => setCorriendo(false)}>Cambiar filtros</button><Cuestionario key={clave} preguntas={lista} tipo="Banco de preguntas" /></div>;
  return (
    <div>
      <p className="tenue">{lista.length} preguntas con estos filtros.</p>
      <div className="segmento" style={{ marginBottom: 8 }}>
        <button type="button" aria-pressed={cap === 'todos'} onClick={() => setCap('todos')}>Todos los temas</button>
        {CAPITULOS.filter(c => c.preguntas.length).map(c => <button key={c.id} type="button" aria-pressed={cap === c.id} onClick={() => setCap(c.id)}>{c.titulo}</button>)}
      </div>
      <div className="segmento" style={{ marginBottom: 14 }}>
        {([['todas', 'Todas'], ['mc', 'Choice'], ['vf', 'Verdadero o falso'], ['errores', 'Mis errores'], ['marcadas', 'Marcadas']] as const).map(([k, t]) =>
          <button key={k} type="button" aria-pressed={orig === k} onClick={() => setOrig(k)}>{t}</button>)}
      </div>
      <button type="button" className="boton ancho" disabled={!lista.length} onClick={() => { setClave(k => k + 1); setCorriendo(true); }}>Empezar</button>
    </div>
  );
}

function Desarrollos({ casos }: { casos: boolean }) {
  const [cap, setCap] = useState<CapId | 'todos'>('todos');
  const base = DESARROLLOS.filter(d => !!d.caso === casos);
  const lista = base.filter(d => cap === 'todos' || d.cap === cap);
  const caps = CAPITULOS.filter(c => base.some(d => d.cap === c.id));
  return (
    <div>
      {casos && <p className="tenue">Los casos que se mostraron en clase. Cada uno pide mecanismo, acción, efecto y diana.</p>}
      <div className="segmento">
        <button type="button" aria-pressed={cap === 'todos'} onClick={() => setCap('todos')}>Todos los temas</button>
        {caps.map(c => <button key={c.id} type="button" aria-pressed={cap === c.id} onClick={() => setCap(c.id)}>{c.titulo}</button>)}
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
      <p className="tenue chico">Decilo de memoria. Tocá cada franja para comprobar.</p>
      {q.filas.map((f, i) => {
        const r = filaCuadro(f);
        return (
          <div className="tarjeta-fila" key={i}>
            {r.inversa
              ? <><span style={{ fontWeight: 700 }}>{r.dado}</span><span className="rotulo">¿Qué fármaco es?</span><Cinta tapada>{r.nombre}</Cinta></>
              : <><span className="nom" style={{ color: 'inherit' }}>{r.nombre}</span>
                <span className="rotulo">Mecanismo</span><Cinta tapada>{r.mecanismo}</Cinta>
                <span className="rotulo">Efecto</span><Cinta tapada>{r.efecto}</Cinta></>}
          </div>
        );
      })}
    </article>
  );
}

/** Igual al parcial real: 4 a desarrollar y 40 choice. */
function Simulacro() {
  const estado = useEstado();
  const [n, setN] = useState(0);
  const [hecho, setHecho] = useState(false);
  const arma = useMemo(() => ({
    dev: mezclar(DESARROLLOS.filter(d => !d.caso && d.origen === 'real')).slice(0, 4),
    choice: PREGUNTAS.filter(p => p.tipo === 'mc'),
  }), [n]);
  if (!n) return (
    <div>
      <p>Igual al parcial: <b>4 preguntas a desarrollar</b>, de las que se requiere un mínimo de 3, y <b>40 choice</b>.</p>
      <button type="button" className="boton ancho" onClick={() => { setHecho(false); setN(1); }}>Empezar el simulacro</button>
    </div>
  );
  const flojos = (() => {
    const cuenta = new Map<CapId, number>();
    PREGUNTAS.filter(p => estado.preguntas[p.id]?.ultimaBien === false).forEach(p => cuenta.set(p.cap, (cuenta.get(p.cap) ?? 0) + 1));
    return [...cuenta.entries()].sort((a, b) => b[1] - a[1]);
  })();
  return (
    <div>
      <h2>Parte 1: a desarrollar</h2>
      <p className="tenue chico">Respondé por escrito antes de ver la respuesta.</p>
      {arma.dev.map(d => <TarjetaDesarrollo key={d.id} d={d} />)}
      <h2 className="seccion" style={{ marginBottom: 12 }}>Parte 2: 40 choice</h2>
      <Cuestionario key={n} preguntas={arma.choice} tipo="Simulacro" onFin={() => setHecho(true)} />
      {hecho && <section className="seccion">
        <h2>Temas más flojos</h2>
        {flojos.length ? flojos.map(([c, k]) => <Link key={c} className="fila-cap" to={`/c/${c}/mapa`}><h3>{TEMA_CAP[c]}</h3><span className="tenue chico">{k} para revisar</span></Link>) : <p>No quedaron errores registrados.</p>}
        <Link className="boton ancho" style={{ marginTop: 10 }} to="/memorizar/repaso">Repasar lo que falló</Link>
      </section>}
      <button type="button" className="boton sec ancho seccion" onClick={() => setN(k => k + 1)}>Otro simulacro</button>
    </div>
  );
}

export function Examen() {
  const { vista = 'banco' } = useParams();
  const mc = PREGUNTAS.filter(p => p.tipo === 'mc').length;
  const vf = PREGUNTAS.length - mc;
  const casos = DESARROLLOS.filter(d => d.caso).length;
  return (
    <main className="pagina">
      <h1>Examen</h1>
      <p className="tenue" style={{ marginTop: 6 }}>Todo sale de las fotos: {mc} choice, {vf} verdadero o falso, {DESARROLLOS.length - casos} desarrollos, {CUADROS.length} cuadros y {casos} casos de clase.</p>
      <div className="segmento" style={{ margin: '10px 0 16px' }}>
        {([['banco', 'Choice'], ['desarrollo', 'Desarrollo'], ['casos', 'Casos'], ['cuadros', 'Cuadros'], ['simulacro', 'Simulacro']] as const).map(([k, t]) =>
          <Link key={k} to={`/examen/${k}`} replace><button type="button" aria-pressed={vista === k}>{t}</button></Link>)}
      </div>
      {vista === 'banco' && <Banco />}
      {vista === 'desarrollo' && <Desarrollos casos={false} />}
      {vista === 'casos' && <Desarrollos casos />}
      {vista === 'cuadros' && CUADROS.map(c => <CuadroExamen key={c.id} id={c.id} />)}
      {vista === 'simulacro' && <Simulacro />}
    </main>
  );
}

