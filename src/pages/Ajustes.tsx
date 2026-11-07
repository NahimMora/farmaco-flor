import { useRef, useState } from 'react';
import { FARMACOS } from '../data';
import { NIVEL_TEXTO } from '../lib/srs';
import { actualizar, aplicarTema, borrarTodo, exportar, importar, useEstado, type NivelNombre } from '../lib/store';

export function Ajustes() {
  const e = useEstado();
  const [msg, setMsg] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const descargar = () => {
    const b = new Blob([exportar()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = `farmaco-progreso-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setMsg('Progreso exportado. Abrí este archivo desde el otro dispositivo.');
  };
  const cargar = async (f?: File) => {
    if (!f) return;
    try {
      const r = importar(await f.text());
      setMsg(`Progreso importado: ${r.nombres} nombres.`);
    } catch (err) {
      setMsg((err as Error).message);
    }
  };
  const niveles: NivelNombre[] = ['nuevo', 'aprendiendo', 'reconocido', 'recordado', 'consolidado'];
  const base = FARMACOS.filter(f => f.prioridad <= 2);
  return (
    <main className="pagina">
      <h1>Mi progreso</h1>
      <section className="seccion">
        {niveles.map(n => <div key={n} className="entre tarjeta-fila"><span>{NIVEL_TEXTO[n]}</span><b>{base.filter(f => (e.memoria[f.id]?.nivel ?? 'nuevo') === n).length}</b></div>)}
      </section>
      <section className="seccion">
        <h2>Pasar a otro dispositivo</h2>
        <p>El progreso se guarda en este dispositivo. Para seguir en la tablet o el celular, exportalo acá y abrilo allá.</p>
        <div className="dos">
          <button type="button" className="boton" onClick={descargar}>Exportar</button>
          <button type="button" className="boton sec" onClick={() => ref.current?.click()}>Importar</button>
        </div>
        <input ref={ref} type="file" accept="application/json,.json" hidden onChange={ev => void cargar(ev.target.files?.[0])} />
        {msg && <p className="nota" role="status">{msg}</p>}
      </section>
      <section className="seccion">
        <h2>Tema</h2>
        <div className="segmento" style={{ marginTop: 8 }}>
          {(['auto', 'claro', 'oscuro'] as const).map(t => <button key={t} type="button" aria-pressed={e.ajustes.tema === t} onClick={() => { actualizar(s => ({ ...s, ajustes: { ...s.ajustes, tema: t } })); aplicarTema(t); }}>{t === 'auto' ? 'Automático' : t === 'claro' ? 'Pizarra blanca' : 'Pizarra oscura'}</button>)}
        </div>
      </section>
      <section className="seccion">
        <button type="button" className="enlace" style={{ color: 'var(--m-ant)' }} onClick={() => { if (window.confirm('Se borra todo el progreso de este dispositivo.')) borrarTodo(); }}>Borrar mi progreso</button>
      </section>
    </main>
  );
}
