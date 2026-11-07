# Estado operativo

Última actualización: 2026-11-07.

## Publicado

- URL: https://nahimmora.github.io/farmaco-flor/
- Repositorio: NahimMora/farmaco-flor. Deploy automático con GitHub Actions al hacer push a `main`.
- 9 capítulos con los 8 pasos, integración, simulacros y Lo esencial para aprobar.
- 9 clases en video con la voz Tomás (`public/videos`).
- Guía general en `/guia`: mapa de la 2ª ERA, origen de cada mensajero, orden de estudio y fin. Es lo primero que ve quien recién entra.

## Archivos procesados

Los 15 archivos únicos de `C:\Claude\farrmaco`. `GABA y Glutamat 1o.pdf` es duplicado por hash. Inventario en `src/data/fuentes.ts`, texto extraído en `trabajo/texto`, transcripción en `transcripcion/`.

## Decisiones tomadas

- La app del intento anterior no existía en ningún lado: estaba en un sandbox en la nube. Se reconstruyó de cero.
- Voz Tomás: `es-AR-TomasNeural` vía edge-tts, confirmada en `pye-video/tools/tts.py`. Lo de "QE" del pedido se interpretó como Edge.
- Fundamentos entra como capítulo 9 porque aparece en preguntas reales, aunque sea de la primera evaluación.
- Persistencia en `localStorage` con migraciones y `navigator.storage.persist()`. Equivale a IndexedDB para este volumen.
- HashRouter: evita errores de recarga en GitHub Pages.
- La grabación es de farmacocinética y de baja calidad: ver `docs/perfil-docente.md`.

## Control

`npm test` y `npx playwright test` en verde. Cobertura en `docs/cobertura.md`. Temario en `docs/matriz-temario.md`.

## Pendiente, solo si hace falta

- Si el docente entrega otra grabación de dopamina o serotonina, transcribirla y actualizar los avisos de esos capítulos.
- Cambios de escena obligan a renderizar ese capítulo: ver `CLAUDE.md`.

## Próxima tarea

Ninguna obligatoria. Integrar el feedback de Flor.
