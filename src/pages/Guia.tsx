// Mapa general de la 2ª ERA: qué hay, de dónde sale cada cosa, en qué orden se estudia y para qué.
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { CAPITULOS, capitulo, ficha, grupoDe, miembros } from '../data';
import { BLOQUES, EJEMPLOS_FIN, INFO_CAP, LUGARES, ORIGENES, PASOS_CAPITULO, PLAN } from '../data/guia';
import type { CapId, Capitulo, Grupo } from '../data/tipos';
import { EnlaceFarmaco, estiloAccion, signo } from '../components/base';

const choice = (cap: CapId) => capitulo(cap)!.preguntas.filter(p => p.tipo === 'mc').length;

function Familia({ g, abierta, alternar }: { g: Grupo; abierta: boolean; alternar: () => void }) {
  const lista = miembros(g.id).filter(f => f.prioridad <= 2);
  return (
    <div className={'hoja' + (abierta ? ' abierta' : '')} style={estiloAccion(g.accion)}>
      <button type="button" className="hoja-boton" aria-expanded={abierta} onClick={alternar}>
        <span>{signo(g.accion)} {g.nombre}</span>
        <span className="hoja-n">{lista.length}</span>
      </button>
      <div className="hoja-cuerpo">
        <p className="chico" style={{ margin: '0 0 6px' }}>{g.resultado}</p>
        <div className="chips" style={{ margin: 0 }}>{lista.map(f => <EnlaceFarmaco key={f.id} f={f} />)}</div>
      </div>
    </div>
  );
}

function RamaCapitulo({ c, abiertos, alternar }: { c: Capitulo; abiertos: Set<string>; alternar: (id: string) => void }) {
  const i = INFO_CAP[c.id];
  return (
    <div className="rama-cap">
      <Link className="rama-titulo" to={`/c/${c.id}`}><span className="rama-n">{c.n}</span>{c.titulo}</Link>
      <p className="rama-datos"><b>{i.mensajero}.</b> {i.hace}</p>
      <p className="rama-datos tenue">Para: {i.sirve}.</p>
      <div className="hojas">{c.grupos.map(g => <Familia key={g.id} g={g} abierta={abiertos.has(g.id)} alternar={() => alternar(g.id)} />)}</div>
    </div>
  );
}

function SuperMapa() {
  const [abiertos, setAbiertos] = useState<Set<string>>(new Set());
  const todos = CAPITULOS.flatMap(c => c.grupos.map(g => g.id));
  const alternar = (id: string) => setAbiertos(a => { const n = new Set(a); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const llena = abiertos.size === todos.length;
  return (
    <div>
      <div className="leyenda-marcador" aria-label="Qué significa cada color">
        <span style={estiloAccion('agonista')}>⊕ Activa</span>
        <span style={estiloAccion('antagonista')}>⊖ Bloquea</span>
        <span style={estiloAccion('inhibidor')}>⊖ Frena una enzima o la recaptación</span>
        <span style={estiloAccion('modulador')}>Canales</span>
      </div>
      <div className="fila no-imprimir" style={{ margin: '12px 0' }}>
        <button type="button" className="boton sec" onClick={() => setAbiertos(llena ? new Set() : new Set(todos))}>{llena ? 'Cerrar todo' : 'Abrir todo'}</button>
        <button type="button" className="boton sec" onClick={() => window.print()}>Guardar en PDF</button>
      </div>
      <div className="tronco">2ª ERA de Farmacología</div>
      {BLOQUES.map(b => (
        <section className="rama-bloque" key={b.titulo}>
          <h3>{b.titulo}</h3>
          <p className="tenue chico" style={{ margin: '2px 0 8px' }}>{b.idea}</p>
          {b.caps.map(id => <RamaCapitulo key={id} c={capitulo(id)!} abiertos={abiertos} alternar={alternar} />)}
        </section>
      ))}
    </div>
  );
}

function Lugares() {
  const opciones: CapId[] = ['col', 'adr', 'dop', 'ser', 'gab'];
  const [cap, setCap] = useState<CapId>('dop');
  return (
    <div>
      <div className="segmento" style={{ margin: '10px 0' }}>
        {opciones.map(c => <button key={c} type="button" aria-pressed={cap === c} onClick={() => setCap(c)}>{capitulo(c)!.titulo}</button>)}
      </div>
      <ol className="lugares">
        {LUGARES.map(l => {
          const e = l.ejemplos[cap];
          const hay = (e?.activa?.length ?? 0) + (e?.frena?.length ?? 0) > 0 || e?.texto;
          return (
            <li key={l.lugar}>
              <b>{l.lugar}</b>
              <span className="chico tenue">{l.hace}</span>
              {e?.activa && <div className="chips" style={{ margin: '5px 0 0' }}>{e.activa.map(id => <EnlaceFarmaco key={id} f={ficha(id)!} />)}</div>}
              {e?.frena && <div className="chips" style={{ margin: '5px 0 0' }}>{e.frena.map(id => <EnlaceFarmaco key={id} f={ficha(id)!} />)}</div>}
              {e?.texto && <div className="chico">{e.texto}</div>}
              {!hay && <div className="chico tenue">En este sistema no tenés que memorizar nada acá.</div>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ElFin() {
  const [id, setId] = useState(EJEMPLOS_FIN[0].id);
  const ej = EJEMPLOS_FIN.find(e => e.id === id)!;
  const f = ficha(id)!; const g = grupoDe(f); const c = capitulo(f.cap)!;
  return (
    <div>
      <div className="segmento" style={{ margin: '10px 0' }}>
        {EJEMPLOS_FIN.map(e => <button key={e.id} type="button" aria-pressed={id === e.id} onClick={() => setId(e.id)}>{ficha(e.id)!.nombre}</button>)}
      </div>
      <div className="caja c1"><span>Bloque: {ej.bloque}</span>
        <div className="caja c2"><span>Capítulo: {c.titulo}</span>
          <div className="caja c3" style={estiloAccion(g.accion)}><span>Grupo: {g.nombre}</span>
            <div className="caja c4" style={estiloAccion(f.accion)}><span>Fármaco</span><b>{f.nombre}</b></div>
          </div>
        </div>
      </div>
      <p className="nota" style={{ marginTop: 12 }}><b>Por qué funciona.</b> {ej.logica} Actúa en: {ej.lugar.toLowerCase()}.</p>
      <p style={{ margin: '14px 0 6px', fontWeight: 700 }}>Y eso es lo que escribís en el examen:</p>
      <table className="tabla cuadro-fin">
        <thead><tr><th>Nombre</th><th>Mecanismo de acción</th><th>Efecto</th></tr></thead>
        <tbody><tr style={estiloAccion(f.accion)}><td style={{ color: 'var(--c)', fontWeight: 800 }}>{f.nombre}</td><td>{f.mecanismo}</td><td>{f.efecto}</td></tr></tbody>
      </table>
    </div>
  );
}

export function Guia() {
  return (
    <main className="pagina guia">
      <h1>El mapa de la 2ª ERA</h1>
      <p className="bajada-guia">Toda la materia es una sola idea: las células se hablan con mensajeros, y un fármaco sube o baja ese mensaje.</p>

      <section className="seccion">
        <h2>Qué significa «dopaminérgico»</h2>
        <p style={{ marginTop: 6 }}>No es un tipo de fármaco. Es un <b>sistema</b>: todo lo que funciona con dopamina. Lo mismo serotoninérgico con serotonina, colinérgico con acetilcolina y adrenérgico con adrenalina y noradrenalina.</p>
        <p>Por eso cada capítulo tiene adentro muchos fármacos: son todas las formas distintas de tocar ese mismo sistema. Se ordenan siempre igual:</p>
        <div className="niveles" aria-label="Niveles del mapa">
          <div><b>Sistema</b><span>Dopaminérgicos</span></div>
          <div><b>Grupo</b><span>Qué le hace al mensaje: antagonistas D2</span></div>
          <div><b>Fármaco</b><span>Haloperidol</span></div>
          <div><b>Efecto</b><span>Antipsicótico</span></div>
        </div>
      </section>

      <section className="seccion">
        <h2>Todo lo que vas a ver</h2>
        <p className="tenue" style={{ marginTop: 6 }}>Tocá un grupo para ver sus fármacos, o un capítulo para entrar.</p>
        <SuperMapa />
      </section>

      <section className="seccion">
        <h2>De dónde sale cada mensajero</h2>
        <p style={{ marginTop: 6 }}>Cada uno se fabrica desde una materia prima. Esto explica por qué algunos capítulos se parecen.</p>
        {ORIGENES.map(o => (
          <div className="cadena" key={o.pasos[0].t}>
            <div className="cadena-pasos">
              {o.pasos.map((p, i) => (
                <Fragment key={p.t}>
                  {i > 0 && <span className="flecha" aria-hidden>→</span>}
                  {p.cap ? <Link className="eslabon llave" to={`/c/${p.cap}`}>{p.t}</Link> : <span className="eslabon">{p.t}</span>}
                </Fragment>
              ))}
            </div>
            <p className="chico tenue" style={{ margin: '6px 0 0' }}>{o.nota}</p>
          </div>
        ))}
      </section>

      <section className="seccion">
        <h2>Dónde puede actuar un fármaco</h2>
        <p style={{ marginTop: 6 }}>En una sinapsis el mensajero pasa siempre por los mismos cinco lugares. Si te aprendés este camino una vez, te sirve para todos los sistemas.</p>
        <Lugares />
      </section>

      <section className="seccion">
        <h2>Cuál es el fin</h2>
        <p style={{ marginTop: 6 }}>Llegar al examen y poder completar esto para cualquier fármaco: <b>nombre, mecanismo y efecto</b>. Los exámenes lo piden en los dos sentidos: te dan el nombre, o te dan el mecanismo y ponés el nombre. Todo el mapa sirve para ubicar el nombre y deducir lo demás.</p>
        <ElFin />
      </section>

      <section className="seccion">
        <h2>Cómo es tu examen</h2>
        <p style={{ marginTop: 6 }}><b>4 preguntas a desarrollar</b>, obligatorias: se requiere un mínimo de 3 de las 4. Y <b>40 choice</b> que se marcan en una grilla A, B, C, D. Así están armados los parciales del 24/06/2025 y del 11/11/2025.</p>
        <h3 style={{ marginTop: 14 }}>Dónde están los 40 choice</h3>
        <div className="pesos">
          {[...CAPITULOS].filter(c => choice(c.id) > 0).sort((x, y) => choice(y.id) - choice(x.id)).map(c => (
            <div key={c.id}><span>{c.titulo}</span><i style={{ width: `${(choice(c.id) / 9) * 100}%` }} /><b>{choice(c.id)}</b></div>
          ))}
        </div>
        <p className="tenue chico" style={{ marginTop: 8 }}>Dopamina, serotonina y GABA son 26 de 40. Los casos y los desarrollos, en cambio, salen mucho de colinérgicos y adrenérgicos.</p>
      </section>

      <section className="seccion">
        <h2>Tus dos días</h2>
        <p style={{ marginTop: 6 }}>Seguí este orden: cada capítulo usa algo del anterior.</p>
        {PLAN.map((d, k) => (
          <div key={d.dia}>
            <h3 style={{ marginTop: 16 }}>{d.dia}</h3>
            <ol className="orden" style={{ counterReset: `paso ${k * 4}` }}>
              {d.caps.map(id => {
                const c = capitulo(id)!;
                return (
                  <li key={id}>
                    <Link className="orden-titulo" to={`/c/${id}`}>{c.titulo}</Link>
                    <span className="chico tenue">{c.farmacos.length} nombres, {choice(id)} de 40 choice. {INFO_CAP[id].porQue}</span>
                  </li>
                );
              })}
            </ol>
            <p className="nota">{d.cierre}</p>
          </div>
        ))}
        <h3 style={{ marginTop: 20 }}>Dentro de cada capítulo</h3>
        <ol className="orden compacto">{PASOS_CAPITULO.map(p => <li key={p.t}><b>{p.t}</b><span className="chico tenue">{p.d}</span></li>)}</ol>
        <Link className="boton ancho no-imprimir" to={`/c/${CAPITULOS[0].id}`}>Empezar por {CAPITULOS[0].titulo.toLowerCase()}</Link>
      </section>
    </main>
  );
}
