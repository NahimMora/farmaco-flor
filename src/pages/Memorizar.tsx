import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CAPITULOS, FARMACOS } from '../data';
import { Entrenador } from '../components/Entrenador';
import { sesionCapitulo, sesionGlobal, sesionGrupo, type Ejercicio } from '../lib/ejercicios';
import { esConfusion, urgencia } from '../lib/srs';
import { useEstado } from '../lib/store';

export function Memorizar() {
  const { modo } = useParams();
  const estado = useEstado();
  const [sel, setSel] = useState<{ t: string; gen: () => Ejercicio[] } | null>(modo === 'repaso' ? { t: 'Repaso recomendado', gen: () => repaso() } : null);
  const [clave, setClave] = useState(0);
  const ej = useMemo(() => sel?.gen() ?? [], [sel, clave]);
  const confusos = FARMACOS.filter(f => esConfusion(estado.memoria[f.id]));

  function repaso() {
    const ids = [...FARMACOS].filter(f => f.prioridad <= 2).sort((a, b) => urgencia(b.id, b.prioridad) - urgencia(a.id, a.prioridad)).slice(0, 24).map(f => f.id);
    return sesionGlobal(16, ids);
  }

  if (sel) {
    return (
      <main className="pagina">
        <button type="button" className="enlace" onClick={() => setSel(null)}>Elegir otra práctica</button>
        <h1 style={{ margin: '6px 0 16px' }}>{sel.t}</h1>
        <Entrenador key={clave} ejercicios={ej} tipo={sel.t} />
        <button type="button" className="enlace" onClick={() => setClave(k => k + 1)}>Empezar otra tanda</button>
      </main>
    );
  }
  return (
    <main className="pagina">
      <h1>Memorizar</h1>
      <p className="tenue" style={{ marginTop: 6 }}>Recuperar de memoria fija más que releer. Acá se mezclan los sistemas.</p>
      <div className="seccion" style={{ marginTop: 16 }}>
        <button type="button" className="boton ancho" onClick={() => setSel({ t: 'Repaso recomendado', gen: repaso })}>Repaso recomendado</button>
      </div>
      {confusos.length > 0 && <button type="button" className="boton sec ancho" style={{ marginTop: 8 }} onClick={() => setSel({ t: 'Mis confusiones', gen: () => sesionGlobal(12, confusos.map(f => f.id)) })}>Mis confusiones ({confusos.length})</button>}
      <section className="seccion">
        <h2>Por capítulo</h2>
        {CAPITULOS.map(c => (
          <button key={c.id} type="button" className="fila-cap" style={{ width: '100%', background: 'none', border: 0, borderBottom: '2px solid var(--linea)', textAlign: 'left' }} onClick={() => setSel({ t: c.titulo, gen: () => sesionCapitulo(c.id, 16) })}>
            <h3>{c.titulo}</h3>
          </button>
        ))}
      </section>
      <section className="seccion">
        <h2>Por familia</h2>
        {CAPITULOS.map(c => (
          <details key={c.id} style={{ padding: '6px 0' }}>
            <summary style={{ fontWeight: 700, minHeight: 34 }}>{c.titulo}</summary>
            {c.grupos.map(g => <button key={g.id} type="button" className="enlace" style={{ display: 'block', textAlign: 'left' }} onClick={() => setSel({ t: g.nombre, gen: () => sesionGrupo(g.id, 8) })}>{g.nombre}</button>)}
          </details>
        ))}
      </section>
      <p className="seccion"><Link className="enlace" to="/integracion">Comparar fármacos de distintos sistemas</Link></p>
    </main>
  );
}
