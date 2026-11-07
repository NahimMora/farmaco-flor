// Generado por video/publicar.py al terminar cada render.
import type { CapId } from './tipos';

export interface VideoCap { src: string; poster: string; duracion: string; marcas: { t: number; titulo: string }[] }

export const VIDEOS: Partial<Record<CapId, VideoCap>> = {
  adr: { src: 'videos/adr.mp4', poster: 'videos/adr.jpg', duracion: '5 min 22 s', marcas: [{"t": 3.7, "titulo": "Síntesis de catecolaminas"}, {"t": 49.9, "titulo": "La sinapsis adrenérgica"}, {"t": 87.8, "titulo": "Qué proteína G usa cada receptor"}, {"t": 121.8, "titulo": "Qué hace cada receptor en el cuerpo"}, {"t": 160.7, "titulo": "Agonistas: elegir el receptor"}, {"t": 186.1, "titulo": "Dopamina según la dosis"}, {"t": 221.3, "titulo": "Antagonistas: α y β"}, {"t": 267.2, "titulo": "β-bloqueantes: adversos para el examen"}, {"t": 288.1, "titulo": "La pizarra adrenérgica"}] },
  col: { src: 'videos/col.mp4', poster: 'videos/col.jpg', duracion: '5 min 28 s', marcas: [{"t": 3.7, "titulo": "Cómo funciona la sinapsis colinérgica"}, {"t": 58.1, "titulo": "Receptores: quién hace qué"}, {"t": 99.7, "titulo": "Efectos de la acetilcolina en el cuerpo"}, {"t": 139.1, "titulo": "Anticolinesterásicos: más acetilcolina"}, {"t": 178.9, "titulo": "Antimuscarínicos: bloquear el receptor M"}, {"t": 210.0, "titulo": "Efectos anticolinérgicos"}, {"t": 259.6, "titulo": "Bloqueantes neuromusculares"}, {"t": 286.0, "titulo": "La pizarra colinérgica"}] },
  dop: { src: 'videos/dop.mp4', poster: 'videos/dop.jpg', duracion: '3 min 34 s', marcas: [{"t": 3.7, "titulo": "Dopamina: síntesis y terminación"}, {"t": 53.8, "titulo": "Las vías dopaminérgicas"}, {"t": 101.4, "titulo": "Tratar el Parkinson: subir la señal"}, {"t": 154.4, "titulo": "Tratar la psicosis: bajar la señal"}, {"t": 186.7, "titulo": "La pizarra dopaminérgica"}] },
};
