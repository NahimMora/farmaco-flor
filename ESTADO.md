# Estado operativo

Última actualización: 2026-11-07.

## Publicado

- URL: https://nahimmora.github.io/farmaco-flor/
- Repositorio: NahimMora/farmaco-flor. Deploy automático con GitHub Actions al hacer push a `main`.
- 8 capítulos, guía de la 2ª ERA con plan de dos días, integración, simulacro igual al parcial y Lo esencial para aprobar.
- 8 clases en video con la voz Tomás.

## Alcance decidido por el usuario

- Fármacos: `Farmacos ERA 2.pdf` más la pizarra (120) y solo los que exigen las preguntas reales de las fotos (16). Total 136.
- Práctica: solo lo que sale de las fotos (`pdf24_convertido.pdf` e imágenes de WhatsApp). Sin preguntas inventadas.
- Presentaciones de Campregher: solo para corregir o agregar lo importante.
- De primera ERA, solo una pestaña mínima con lo que aparece en las hojas de examen. Rinde alrededor del 2026-11-09 y pidió reducir la extensión.

## Decisiones tomadas

- 12 marcas verdes del examen de 40 se corrigieron contra Campregher: ver `docs/perfil-docente.md`.
- Voz Tomás: `es-AR-TomasNeural` vía edge-tts. "QE" se interpretó como Edge.
- `CUADROS ... lulitoplay.pdf` se usa como consulta: sus 20 fármacos extra no se suman.

## Control

`npm test` y `npx playwright test` en verde. Cobertura en `docs/cobertura.md`.
