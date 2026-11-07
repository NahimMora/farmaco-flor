// Generado por video/publicar.py al terminar cada render.
import type { CapId } from './tipos';

export interface VideoCap { src: string; poster: string; duracion: string; marcas: { t: number; titulo: string }[] }

export const VIDEOS: Partial<Record<CapId, VideoCap>> = {};
