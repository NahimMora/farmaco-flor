import { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Sequence, cancelRender, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/fonts';
import { CAPITULOS } from '../../src/data';
import { Lienzo } from '../../src/vis/Vis';
import { TIEMPOS } from './tiempos';

const VARS = {
  '--pizarra': '#f8faf9', '--celula': '#ffffff', '--tinta': '#16191c', '--tinta-2': '#55606a', '--linea': '#d5dbdc', '--receptor': '#cfd6d8', '--nt': '#e0a100',
  '--m-ago': '#b8116a', '--m-ant': '#cc1f2e', '--m-inh': '#3c7a0c', '--m-mod': '#bd5008', '--m-pre': '#0d6c8a', '--m-cit': '#6a3ea1', '--m-bio': '#1d5cbd', '--sobre-marcador': '#ffffff',
} as React.CSSProperties;

const TIT = "'Big Shoulders Display Variable', sans-serif";
const TXT = "'Atkinson Hyperlegible Next Variable', sans-serif";

function useFuentes() {
  const [h] = useState(() => delayRender('fuentes'));
  useEffect(() => {
    Promise.all([
      loadFont({ family: 'Atkinson Hyperlegible Next Variable', url: staticFile('fonts/atkinson.woff2'), weight: '200 800' }),
      loadFont({ family: 'Big Shoulders Display Variable', url: staticFile('fonts/shoulders.woff2'), weight: '100 900' }),
    ]).then(() => continueRender(h)).catch(cancelRender);
  }, [h]);
}

export function Clase({ cap }: { cap: string }) {
  useFuentes();
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const T = TIEMPOS[cap];
  const c = CAPITULOS.find(x => x.id === cap)!;
  const beats = T.beats;
  const primero = beats[0].inicio;
  const fin = beats[beats.length - 1].inicio + beats[beats.length - 1].frames;
  let idx = 0;
  for (let i = 0; i < beats.length; i++) if (frame >= beats[i].inicio) idx = i;
  const b = beats[idx];
  const e = c.escenas[b.escena];
  const t = (frame - b.inicio) / fps;
  const cue = b.cues.find(q => t >= q[0] && t < q[1] + 0.2)?.[2];
  // Lo que queda anotado se acumula por escena, como en una pizarra.
  const notas = beats.slice(0, idx + 1).filter(x => x.escena === b.escena).flatMap(x => x.retener).slice(-7);
  const portada = frame < primero;
  const cierre = frame >= fin;
  return (
    <AbsoluteFill style={{ ...VARS, background: 'var(--pizarra)', color: 'var(--tinta)', fontFamily: TXT }}>
      {beats.map(x => (
        <Sequence key={x.id} from={x.inicio} durationInFrames={Math.ceil(x.audio * fps) + 4}>
          <Audio src={staticFile(`audio/${cap}/${x.archivo}`)} />
        </Sequence>
      ))}
      {portada && (
        <AbsoluteFill style={{ justifyContent: 'center', padding: '0 90px', opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: 'var(--tinta-2)' }}>Fármaco</div>
          <div style={{ fontFamily: TIT, fontWeight: 800, fontSize: 124, lineHeight: 0.96 }}>{T.titulo}</div>
          <div style={{ fontSize: 32, marginTop: 18, maxWidth: 980 }}>{c.objetivo}</div>
          <div style={{ marginTop: 26, height: 10, width: 300, background: 'var(--m-ago)', borderRadius: 5 }} />
        </AbsoluteFill>
      )}
      {!portada && !cierre && <>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', borderBottom: '4px solid #c4cbce' }}>
          <div style={{ fontFamily: TIT, fontWeight: 800, fontSize: 40 }}>{e.titulo}</div>
          <div style={{ fontSize: 22, color: 'var(--tinta-2)', fontWeight: 700 }}>{T.titulo}</div>
        </div>
        <div style={{ position: 'absolute', top: 72, left: 14, width: 884 }}>
          <Lienzo e={e} i={b.paso} t={t} />
        </div>
        <div style={{ position: 'absolute', top: 82, left: 914, right: 20, bottom: 118, display: 'flex', flexDirection: 'column', gap: 9, justifyContent: 'flex-start' }}>
          {notas.length > 0 && <div style={{ fontFamily: TIT, fontWeight: 800, fontSize: 32 }}>Retené esto</div>}
          {notas.map((n, i) => (
            <div key={n + i} style={{ fontSize: 25, fontWeight: 700, lineHeight: 1.16, borderLeft: '6px solid var(--m-ago)', paddingLeft: 11 }}>{n}</div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 96, background: '#16191c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 46px', textAlign: 'center', fontSize: 34, fontWeight: 600, lineHeight: 1.16 }}>
          {cue}
        </div>
      </>}
      {cierre && (
        <AbsoluteFill style={{ justifyContent: 'center', padding: '0 90px', opacity: interpolate(frame, [fin, fin + 8], [0, 1], { extrapolateRight: 'clamp' }) }}>
          <div style={{ fontFamily: TIT, fontWeight: 800, fontSize: 92, lineHeight: 1 }}>Ahora cerrá el video y escribí los nombres de memoria</div>
          <div style={{ fontSize: 30, marginTop: 16 }}>{durationInFrames > 0 ? 'Recordar sin pistas es lo que los fija.' : ''}</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}
