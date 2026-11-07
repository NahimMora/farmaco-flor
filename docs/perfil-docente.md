# Perfil de evaluación

Basado solo en evidencia. Lo que no se pudo comprobar queda dicho.

## Sobre la grabación `Farmaco 31.m4a`

El pedido inicial suponía que la grabación era especialmente importante para dopamina y serotonina. **No lo es.** Son 70 minutos de una clase de farmacocinética. Se transcribió localmente con Whisper (modelos `small` y `medium`). La búsqueda de dopamina, serotonina, bromocriptina, haloperidol y receptores en la transcripción no encontró desarrollo de esos temas.

Temas identificados por minuto, según la transcripción:

| Minuto | Tema |
|---|---|
| 01 a 05 | Definición de farmacocinética. Procesos: absorción, distribución, eliminación (tres en la diapositiva, cuatro en libros, separando metabolismo y excreción) |
| 05 a 10 | Fármaco libre y unido a proteínas: el complejo unido queda atrapado y no difunde. Metabolitos |
| 11 a 24 | Sin transcripción utilizable: el modelo repite frases |
| 24 a 45 | Compartimiento presistémico y primer paso hepático, vena porta, vía rectal |
| 45 a 67 | Formas farmacéuticas y vías de administración: comprimidos, cápsulas, jarabes, sublingual, rectal, intramuscular, intravenosa |

**Limitación.** El audio tiene voz lejana y ruido. La transcripción deforma términos médicos y repite frases que no se dijeron. Por eso:

- No se atribuyen citas textuales al docente.
- No se registran advertencias de examen pronunciadas. La búsqueda de "examen", "parcial", "pregunta", "ojo" y "desaprueba" no dio ninguna frase confiable.
- La transcripción queda en `transcripcion/`, fuera del repositorio público.

Efecto en la app: el capítulo Fundamentos se apoya en esos temas, en especial el compartimiento presistémico y el primer paso hepático.

## Lo que muestran los exámenes reales

Fuentes: `FARMACO A DESARROL`, `fármaco a desarrollar`, `Preguntero`.

- **Formato dominante: cuadro de nombre, mecanismo y efecto.** 14 cuadros en los archivos.
- **Cantidad de ejemplos.** Casi siempre 1 a 3 fármacos, 4 indicaciones, 4 o 5 efectos.
- **Mecanismo y efecto van separados.** En los cuadros son dos columnas.
- **Se repiten** ácido valproico (tres mecanismos), metoclopramida, bromocriptina, salbutamol, fluoxetina, prazosin, haloperidol y succinilcolina.
- **Preguntas fijas:** dopamina según la dosis, β-bloqueantes (clasificación, indicaciones y adversos), efectos anticolinérgicos, efectos de la acetilcolina.
- **Trampas del preguntero:** agonista contra antagonista, frecuencia contra tiempo, MAO-A contra MAO-B, vías dopaminérgicas largas e intermedias.

## Cómo modifica el estudio

1. `src/data/cuadros.ts` cuenta las apariciones reales de cada fármaco y `urgencia()` en `src/lib/srs.ts` las suma al ordenar el repaso. Lo que más salió aparece antes.
2. Cada capítulo abre con los avisos del material.
3. El simulacro imita el formato real: cuadros, desarrollo y un choice corto.
4. `Lo esencial` tiene la vista Lo que más toman, con el ranking real.
5. No se inventa una distribución de puntos: no está documentada.
