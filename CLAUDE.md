# Fármaco | Flor

Web app de estudio de Farmacología para Flor, 3.º año de Medicina, Fundación Barceló, sede La Rioja. Se estudia en celular y tablet. Publicada en https://nahimmora.github.io/farmaco-flor/.

**Prioridad absoluta: nombres → grupos → mecanismos → efectos → preguntas de examen.** No es una biblioteca: es un entrenamiento de memoria.

## Dónde está cada cosa

- `src/data/capitulos/*.ts`: contenido por capítulo. Fichas, grupos, mapa, mnemotecnias, parejas, escenas, preguntas y desarrollos.
- `src/data/discrepancias.ts`: contradicciones del material y qué responder.
- `src/data/cuadros.ts`: cuadros reales. Las filas apuntan a la farmacoteca.
- `src/data/inventario.ts` y `pizarra.ts`: inventario de las fuentes. La cobertura se calcula contra esto.
- `src/vis/`: motor de diagramas. Función pura de (escena, paso, t), compartido por web y video.
- `src/lib/`: progreso (`store`), repetición espaciada (`srs`), ejercicios (`ejercicios`).
- `video/`: Remotion, voz y render. Ver abajo.
- `docs/`: perfil docente, matriz de temario.
- Fuentes originales: `C:\Claude\farrmaco\`, **fuera del repo**. No publicarlas. Texto extraído en `trabajo/`, transcripción en `transcripcion/`.

## Reglas de contenido

- Una sola ficha por fármaco. Nunca repetir mecanismos en otro lado: todo se deriva de la ficha.
- Autoridad: presentaciones de Campregher, después concordancia entre fuentes, después apoyo, respuestas de estudiantes siempre bajo revisión, fuentes externas solo para discrepancias y marcadas `externo`.
- Pregunta real es la que está en el material. Las creadas van con `origen: 'generada'`.
- Si una clave del material está mal, se conserva y se aclara (`claveMaterial`, `nota`, `encontrada`). No se corrige en silencio.
- Reconocer con opciones no consolida. Consolidar exige recordar sin pistas en días distintos.

## Comandos

```
npm run dev            desarrollo
npm test               control de cobertura y exactitud (lo corre el deploy)
npm run build          compila
npx playwright test    recorrido en el celular
```

Publicar: `git push` a `main`. GitHub Actions compila, prueba y despliega.

## Videos

Voz: `es-AR-TomasNeural` vía edge-tts, la misma de `pye-video` y del hub de Facultad.

```
npx vite-node scripts/exportar_guion.ts     pasa las escenas a video/guion
cd video
python tts.py [cap]                         narra. Si el texto no cambió, no regenera
sh render.sh col adr ...                    renderiza y actualiza src/data/videos.ts
```

`video/public/audio` y `video/out` no se versionan. Los MP4 quedan en `public/videos`.
Cambiar una escena de un capítulo obliga a renderizar ese capítulo.
