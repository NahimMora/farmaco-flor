import { Link } from 'react-router-dom';
import { CAPITULOS, FARMACOS, capitulo } from '../data';
import { BLOQUES } from '../data/guia';
import type { Capitulo } from '../data/tipos';
import { esConfusion } from '../lib/srs';
import { useEstado, type NivelNombre } from '../lib/store';

const NIVELES: { n: NivelNombre; t: string; c: string }[] = [
  { n: 'consolidado', t: 'Consolidado', c: 'var(--m-inh)' },
  { n: 'recordado', t: 'Recordado sin ayuda', c: 'var(--m-pre)' },
  { n: 'reconocido', t: 'Reconocido', c: 'var(--m-mod)' },
  { n: 'aprendiendo', t: 'En aprendizaje', c: 'var(--m-ago)' },
];

export function Medidor({ ids }: { ids: string[] }) {
  const { memoria } = useEstado();
  return (
    <div className="medidor" aria-hidden>
      {NIVELES.map(({ n }) => {
        const k = ids.filter(id => memoria[id]?.nivel === n).length;
        return k ? <i key={n} className={`lv-${n}`} style={{ width: `${(k / ids.length) * 100}%` }} /> : null;
      })}
    </div>
  );
}

export function FilaCapitulo({ c }: { c: Capitulo }) {
  const { memoria } = useEstado();
  const ids = c.farmacos.filter(f => f.prioridad <= 2).map(f => f.id);
  const hechos = ids.filter(id => memoria[id]?.nivel === 'consolidado').length;
  return (
    <Link className="fila-cap" to={`/c/${c.id}`}>
      <h3>{c.titulo}</h3>
      <span className="tenue chico">{hechos} de {ids.length}</span>
      <Medidor ids={ids} />
    </Link>
  );
}

export function Inicio() {
  const { memoria, ultimoCap, sesiones } = useEstado();
  const ahora = Date.now();
  const base = FARMACOS.filter(f => f.prioridad <= 2);
  const vencidos = base.filter(f => memoria[f.id] && memoria[f.id].proximo <= ahora);
  const confusos = base.filter(f => esConfusion(memoria[f.id]));
  const consolidados = base.filter(f => memoria[f.id]?.nivel === 'consolidado').length;
  const primera = sesiones.length === 0 && !ultimoCap;
  const sigCap = CAPITULOS.find(c => c.id === ultimoCap) ?? CAPITULOS[0];
  return (
    <main className="pagina">
      <header className="portada">
        <h1>Fármaco</h1>
        <p className="bajada">Primero los nombres, después los grupos, los mecanismos y los efectos. Flor, {consolidados} de {base.length} nombres ya están consolidados.</p>
      </header>
      <section className="plan">
        {primera ? <>
          <h2>Antes de arrancar, mirá el mapa</h2>
          <p>Qué vas a ver, de dónde sale cada tema, en qué orden estudiarlo y para qué.</p>
          <Link className="boton" to="/guia">Ver el mapa de la 2ª ERA</Link>
        </> : vencidos.length > 0 ? <>
          <h2>{vencidos.length} nombres para repasar hoy</h2>
          <p>{confusos.length ? `Incluye ${confusos.length} que venís confundiendo.` : 'Te toca recordarlos antes de que se vayan.'}</p>
          <Link className="boton" to="/memorizar/repaso">Repasar ahora</Link>
        </> : <>
          <h2>Seguí con {sigCap.titulo.toLowerCase()}</h2>
          <p>No tenés repasos vencidos.</p>
          <Link className="boton" to={`/c/${sigCap.id}`}>Seguir estudiando</Link>
        </>}
      </section>
      {!primera && <Link className="fila-cap" to="/guia"><h3>El mapa de la 2ª ERA</h3><span className="tenue chico">Qué sale de qué</span></Link>}
      <section className="seccion">
        <h2>Tus capítulos</h2>
        {CAPITULOS.map(c => <FilaCapitulo key={c.id} c={c} />)}
        <div className="leyenda">{NIVELES.map(n => <span key={n.n} style={{ '--c': n.c } as React.CSSProperties}>{n.t}</span>)}</div>
      </section>
      <section className="seccion">
        <Link className="fila-cap" to="/esencial"><h3>Lo esencial para aprobar</h3><span className="tenue chico">Para el final</span></Link>
        <Link className="fila-cap" to="/examen/simulacro"><h3>Simulacro</h3><span className="tenue chico">Todo mezclado</span></Link>
        <Link className="fila-cap" to="/ajustes"><h3>Mi progreso y ajustes</h3><span className="tenue chico">Pasar al celu o tablet</span></Link>
      </section>
    </main>
  );
}

export function Capitulos() {
  return (
    <main className="pagina">
      <h1>Capítulos</h1>
      <p className="tenue" style={{ marginTop: 6 }}>Cada uno sigue el mismo camino: mapa, nombres, teoría, video, cuadro, choice, desarrollo y examen.</p>
      <Link className="fila-cap" to="/guia"><h3>El mapa de la 2ª ERA</h3><span className="tenue chico">Empezá acá</span></Link>
      {BLOQUES.map(b => (
        <section key={b.titulo} className="seccion" style={{ marginTop: 22 }}>
          <p className="chico tenue" style={{ margin: 0, fontWeight: 700 }}>{b.titulo}</p>
          {b.caps.map(id => <FilaCapitulo key={id} c={capitulo(id)!} />)}
        </section>
      ))}
      <Link className="fila-cap" to="/integracion"><h3>Integración</h3><span className="tenue chico">Mapa maestro y comparador</span></Link>
      <Link className="fila-cap" to="/esencial"><h3>Lo esencial para aprobar</h3><span className="tenue chico">Último repaso</span></Link>
    </main>
  );
}
