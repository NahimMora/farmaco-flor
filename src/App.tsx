import { Component, Suspense, lazy, type ReactNode } from 'react';
import { HashRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { Capitulos, Inicio } from './pages/Inicio';

const Capitulo = lazy(() => import('./pages/Capitulo').then(m => ({ default: m.Capitulo })));
const Memorizar = lazy(() => import('./pages/Memorizar').then(m => ({ default: m.Memorizar })));
const Examen = lazy(() => import('./pages/Examen').then(m => ({ default: m.Examen })));
const Farmacoteca = lazy(() => import('./pages/Farmacoteca').then(m => ({ default: m.Farmacoteca })));
const Ficha = lazy(() => import('./pages/Farmacoteca').then(m => ({ default: m.Ficha })));
const Esencial = lazy(() => import('./pages/Esencial').then(m => ({ default: m.Esencial })));
const Integracion = lazy(() => import('./pages/Esencial').then(m => ({ default: m.Integracion })));
const Guia = lazy(() => import('./pages/Guia').then(m => ({ default: m.Guia })));
const Ajustes = lazy(() => import('./pages/Ajustes').then(m => ({ default: m.Ajustes })));

function Icono({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;
}

const NAV: [string, string, ReactNode][] = [
  ['/', 'Inicio', <Icono><path d="M4 11 12 4l8 7v9H4z" /></Icono>],
  ['/capitulos', 'Capítulos', <Icono><path d="M5 5h9M5 12h9M5 19h9M17 4l3 3-3 3M17 14l3 3-3 3" /></Icono>],
  ['/memorizar', 'Memorizar', <Icono><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V6a2 2 0 0 0-3-2zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1" /></Icono>],
  ['/examen', 'Examen', <Icono><path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h3" /></Icono>],
  ['/farmacoteca', 'Fármacos', <Icono><rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-35 12 12)" /><path d="m9 6.5 6 8.5" /></Icono>],
];

class Atajo extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="pagina">
        <h1>Esta pantalla falló</h1>
        <p>Tu progreso sigue guardado. Volvé al inicio; si se repite, recargá la página.</p>
        <a className="boton" href="#/" onClick={() => this.setState({ error: false })}>Ir al inicio</a>
      </main>
    );
  }
}

export function App() {
  return (
    <HashRouter>
      <Atajo><Suspense fallback={<main className="pagina"><p className="tenue">Abriendo…</p></main>}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/guia" element={<Guia />} />
          <Route path="/capitulos" element={<Capitulos />} />
          <Route path="/c/:id" element={<Capitulo />} />
          <Route path="/c/:id/:paso" element={<Capitulo />} />
          <Route path="/memorizar" element={<Memorizar />} />
          <Route path="/memorizar/:modo" element={<Memorizar />} />
          <Route path="/examen" element={<Examen />} />
          <Route path="/examen/:vista" element={<Examen />} />
          <Route path="/farmacoteca" element={<Farmacoteca />} />
          <Route path="/f/:id" element={<Ficha />} />
          <Route path="/esencial" element={<Esencial />} />
          <Route path="/esencial/:vista" element={<Esencial />} />
          <Route path="/integracion" element={<Integracion />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense></Atajo>
      <div className="bandeja">
        <nav aria-label="Principal">
          {NAV.map(([to, t, ic]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'activo' : '')}>{ic}{t}</NavLink>)}
        </nav>
      </div>
    </HashRouter>
  );
}
