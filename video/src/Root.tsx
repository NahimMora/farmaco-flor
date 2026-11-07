import { Composition } from 'remotion';
import { Clase } from './Clase';
import { TIEMPOS } from './tiempos';

export function Root() {
  return <>{Object.keys(TIEMPOS).map(cap => (
    <Composition key={cap} id={`clase-${cap}`} component={Clase} defaultProps={{ cap }} width={1280} height={720} fps={TIEMPOS[cap].fps} durationInFrames={TIEMPOS[cap].total} />
  ))}</>;
}
