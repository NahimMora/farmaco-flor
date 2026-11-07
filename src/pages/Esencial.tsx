// Lo esencial para aprobar e integración: la síntesis para los últimos días.
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CAPITULOS, DESARROLLOS, FARMACOS, PAREJAS, ficha, grupoDe, miembros } from '../data';
import { ARCHIVOS } from '../data/fuentes';
import { DISCREPANCIAS } from '../data/discrepancias';
import type { Accion, Farmaco } from '../data/tipos';
import { Cinta, EnlaceFarmaco, estiloAccion, signo } from '../components/base';
import { Entrenador } from '../components/Entrenador';
import { TarjetaDesarrollo } from '../components/Cuestionario';
import { FamiliaMapa } from '../components/Mapa';
import { sesionGlobal, TEXTO_ACCION } from '../lib/ejercicios';
import { esConfusion, urgencia } from '../lib/srs';
import { actualizar, useEstado } from '../lib/store';
import { PERFIL } from '../data/perfil';

const VISTAS = [['cuadro', 'Cuadro maestro'], ['mapa', 'Mapa maestro'], ['lista', 'Lista de nombres'], ['errores', 'Errores que cuestan'], ['minimo', 'Desarrollo mínimo'], ['ultima', 'Última hora'], ['calidad', 'Control de calidad']] as const;

function CuadroMaestro() {
  const [ocultar, setOcultar] = useState(false);
  const [cap, setCap] = useState(CAPITULOS[0].id as string);
  const lista = FARMACOS.filter(f => f.prioridad === 1 && (cap === 'todos' || f.cap === cap));
  return (
    <div>
      <div className="segmento no-imprimir">
        {CAPITULOS.map(c => <button key={c.id} type="button" aria-pressed={cap === c.id} onClick={() => setCap(c.id)}>{c.titulo}</button>)}
        <button type="button" aria-pressed={cap === 'todos'} onClick={() => setCap('todos')}>Todos</button>
      </div>
      <div className="fila no-imprimir" style={{ margin: '10px 0' }}>
        <button type="button" className="boton sec" onClick={() => setOcultar(o => !o)}>{ocultar ? 'Mostrar respuestas' : 'Tapar para practicar'}</button>
        <button type="button" className="boton sec" onClick={() => window.print()}>Guardar en PDF</button>
      </div>
      <table className="tabla">
        <thead><tr><th>Fármaco</th><th>Grupo</th><th>Mecanismo de acción</th><th>Efecto</th></tr></thead>
        <tbody>{lista.map(f => (
          <tr key={f.id + String(ocultar)} style={estiloAccion(f.accion)}>
            <td style={{ color: 'var(--c)', fontWeight: 800 }}>{f.nombre}</td>
            <td>{grupoDe(f).nombre}</td>
            <td><Cinta tapada={ocultar}>{f.mecanismo}</Cinta></td>
            <td><Cinta tapada={ocultar}>{f.efecto}</Cinta></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function MapaMaestro() {
  const [oculto, setOculto] = useState(false);
  return (
    <div>
      <div className="segmento">
        <button type="button" aria-pressed={!oculto} onClick={() => setOculto(false)}>Con nombres</button>
        <button type="button" aria-pressed={oculto} onClick={() => setOculto(true)}>Nombres ocultos</button>
      </div>
      {CAPITULOS.map(c => (
        <details key={c.id} className="bloque" open={c.n === 1}>
          <summary><h3 style={{ display: 'inline' }}>{c.titulo}</h3></summary>
          {c.grupos.map(g => <FamiliaMapa key={g.id + String(oculto)} g={g} oculto={oculto} />)}
        </details>
      ))}
    </div>
  );
}

function ListaNombres() {
  const { checklist } = useEstado();
  const poner = (id: string, v: boolean) => actualizar(e => ({ ...e, checklist: { ...e.checklist, [id]: v } }));
  const total = CAPITULOS.flatMap(c => c.grupos).length;
  const hechos = CAPITULOS.flatMap(c => c.grupos).filter(g => checklist[g.id]).length;
  return (
    <div>
      <p className="tenue">Marcá la familia cuando puedas decir todos sus nombres sin mirar. Llevás {hechos} de {total}.</p>
      {CAPITULOS.map(c => (
        <section key={c.id} className="bloque">
          <h3>{c.titulo}</h3>
          {c.grupos.map(g => (
            <label className="check" key={g.id}>
              <input type="checkbox" checked={!!checklist[g.id]} onChange={e => poner(g.id, e.target.checked)} />
              <span><b style={{ color: 'var(--c)', ...estiloAccion(g.accion) }}>{g.nombre}</b><br /><span className="chico tenue">{miembros(g.id).filter(f => f.prioridad <= 2).map(f => f.nombre).join(', ')}</span></span>
            </label>
          ))}
        </section>
      ))}
    </div>
  );
}

function Errores() {
  return (
    <div>
      {PERFIL.errores.map(e => <p key={e.t} className="aviso"><b>{e.t}</b> {e.d}</p>)}
      <h2 className="seccion">Parejas peligrosas</h2>
      {PAREJAS.map(p => {
        const a = ficha(p.a)!, b = ficha(p.b)!;
        return (
          <div className="pareja" key={p.a + p.b}>
            <div className="dos">
              <div className="lado"><b style={{ color: 'var(--c)', ...estiloAccion(a.accion) }}>{a.nombre}</b>{p.aEs}</div>
              <div className="lado"><b style={{ color: 'var(--c)', ...estiloAccion(b.accion) }}>{b.nombre}</b>{p.bEs}</div>
            </div>
            <p className="nota">{p.truco}</p>
          </div>
        );
      })}
    </div>
  );
}

function UltimaHora() {
  const estado = useEstado();
  const [empezar, setEmpezar] = useState(0);
  const orden = useMemo(() => [...FARMACOS].filter(f => f.prioridad === 1).sort((a, b) => urgencia(b.id, b.prioridad) - urgencia(a.id, a.prioridad)), [empezar]);
  const ej = useMemo(() => sesionGlobal(15, orden.slice(0, 22).map(f => f.id)), [empezar]);
  const confus = FARMACOS.filter(f => esConfusion(estado.memoria[f.id]));
  const pend = FARMACOS.filter(f => f.prioridad === 1 && estado.memoria[f.id]?.nivel !== 'consolidado');
  if (empezar) return <div><Entrenador key={empezar} ejercicios={ej} tipo="Última hora" /><button type="button" className="enlace" onClick={() => setEmpezar(k => k + 1)}>Otra tanda</button></div>;
  return (
    <div>
      <p>Un recorrido corto: primero lo que venís confundiendo, después lo imprescindible sin consolidar, al final los cuadros.</p>
      <ol>
        <li>Tanda de 15 ejercicios con tus nombres más débiles.</li>
        <li><Link to="/esencial/errores">Errores que cuestan el examen</Link></li>
        <li><Link to="/examen/cuadros">Cuadros reales de nombre, mecanismo y efecto</Link></li>
        <li><Link to="/esencial/minimo">Desarrollo mínimo</Link></li>
      </ol>
      <button type="button" className="boton ancho" onClick={() => setEmpezar(1)}>Empezar la tanda</button>
      {confus.length > 0 && <section className="seccion"><h3>Confusiones</h3><div className="chips">{confus.map(f => <EnlaceFarmaco key={f.id} f={f} />)}</div></section>}
      <section className="seccion"><h3>Imprescindibles sin consolidar: {pend.length}</h3><div className="chips">{pend.slice(0, 40).map(f => <EnlaceFarmaco key={f.id} f={f} />)}</div></section>
    </div>
  );
}

function Calidad() {
  return (
    <div>
      <p>Cuando el material se contradice, acá está qué decía cada fuente y qué conviene responder.</p>
      {DISCREPANCIAS.map(d => (
        <article key={d.id} className="tarjeta-fila">
          <h3>{d.tema}</h3>
          <span className="etiqueta" style={{ margin: '4px 0' }}>{d.tipo}</span>
          <ul style={{ margin: '6px 0', paddingLeft: 20 }}>{d.dice.map(x => <li key={x.fuente + x.texto} className="chico">{x.fuente}: «{x.texto}»</li>)}</ul>
          <p style={{ margin: '6px 0' }}><b>Respondé:</b> {d.respuesta}</p>
          <p className="chico tenue" style={{ margin: 0 }}>{d.porQue}</p>
          {d.externo && <p className="chico tenue" style={{ margin: 0 }}>Fuente externa: {d.externo}</p>}
        </article>
      ))}
      <h2 className="seccion">Fuentes usadas</h2>
      {ARCHIVOS.map(a => <div key={a.sigla} className="tarjeta-fila"><b>{a.sigla}</b> {a.archivo}<div className="chico tenue">{a.tipo}{a.nota ? `. ${a.nota}` : ''}</div></div>)}
    </div>
  );
}

export function Esencial() {
  const { vista = 'cuadro' } = useParams();
  return (
    <main className="pagina">
      <h1>Lo esencial para aprobar</h1>
      <div className="segmento no-imprimir" style={{ margin: '12px 0 16px' }}>
        {VISTAS.map(([k, t]) => <Link key={k} to={`/esencial/${k}`} replace><button type="button" aria-pressed={vista === k}>{t}</button></Link>)}
      </div>
      {vista === 'cuadro' && <CuadroMaestro />}
      {vista === 'mapa' && <MapaMaestro />}
      {vista === 'lista' && <ListaNombres />}
      {vista === 'errores' && <Errores />}
      {vista === 'minimo' && DESARROLLOS.filter(d => d.origen === 'real').slice(0, 40).map(d => <TarjetaDesarrollo key={d.id} d={d} />)}
      {vista === 'ultima' && <UltimaHora />}
      {vista === 'calidad' && <Calidad />}
    </main>
  );
}

const ACCIONES: Accion[] = ['agonista', 'antagonista', 'inhibidor', 'modulador', 'bloqueante'];

export function Integracion() {
  const [a, setA] = useState<Accion>('agonista');
  const [ef, setEf] = useState('');
  const porEfecto = useMemo(() => {
    const m = new Map<string, Farmaco[]>();
    FARMACOS.filter(f => f.prioridad <= 2).forEach(f => { const k = f.efecto.split(/[.,]/)[0]; m.set(k, [...(m.get(k) ?? []), f]); });
    return [...m.entries()].filter(([, l]) => new Set(l.map(f => f.grupo)).size > 1).sort((x, y) => x[0].localeCompare(y[0]));
  }, []);
  return (
    <main className="pagina">
      <h1>Integración</h1>
      <p className="tenue" style={{ marginTop: 6 }}>Mezclar sistemas evita aprender cada familia aislada.</p>
      <section className="seccion">
        <h2>Por tipo de acción</h2>
        <div className="segmento" style={{ margin: '8px 0' }}>
          {ACCIONES.map(x => <button key={x} type="button" aria-pressed={a === x} onClick={() => setA(x)}>{signo(x)} {TEXTO_ACCION[x]}</button>)}
        </div>
        {CAPITULOS.map(c => {
          const l = c.farmacos.filter(f => f.accion === a && f.prioridad <= 2);
          return l.length ? <div key={c.id} style={{ marginTop: 10 }}><b>{c.titulo}</b><div className="chips">{l.map(f => <EnlaceFarmaco key={f.id} f={f} />)}</div></div> : null;
        })}
      </section>
      <section className="seccion">
        <h2>Mismo efecto, distinto mecanismo</h2>
        <select className="campo" value={ef} onChange={e => setEf(e.target.value)} aria-label="Efecto" style={{ marginTop: 8 }}>
          <option value="">Elegí un efecto</option>
          {porEfecto.map(([k]) => <option key={k} value={k}>{k}</option>)}
        </select>
        {porEfecto.filter(([k]) => k === ef).flatMap(([, l]) => l).map(f => (
          <div key={f.id} className="tarjeta-fila" style={estiloAccion(f.accion)}>
            <Link className="nom" to={`/f/${f.id}`}>{f.nombre}</Link>
            <div className="chico">{f.mecanismo}</div>
          </div>
        ))}
      </section>
      <section className="seccion">
        <h2>Mapa maestro</h2>
        <MapaMaestro />
      </section>
      <section className="seccion">
        <h2>Motor intercapítulos</h2>
        <p>Una tanda que mezcla todos los sistemas, priorizando tus nombres más débiles.</p>
        <Link className="boton ancho" to="/memorizar/repaso">Empezar</Link>
      </section>
    </main>
  );
}
