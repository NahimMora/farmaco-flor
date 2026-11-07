"""Escribe src/data/videos.ts con los videos ya renderizados."""
import json
from pathlib import Path
R = Path(__file__).resolve().parent
items = []
for t in sorted((R / 'src' / 'tiempos').glob('*.json')):
    d = json.loads(t.read_text(encoding='utf-8'))
    cap = d['cap']
    if (R.parent / 'public' / 'videos' / f'{cap}.mp4').exists():
        s = d['total'] / d['fps']
        dur = f"{int(s // 60)} min {int(s % 60)} s"
        items.append(f"  {cap}: {{ src: 'videos/{cap}.mp4', poster: 'videos/{cap}.jpg', duracion: '{dur}', marcas: {json.dumps(d['marcas'], ensure_ascii=False)} }},")
head = "// Generado por video/publicar.py al terminar cada render.\nimport type { CapId } from './tipos';\n\nexport interface VideoCap { src: string; poster: string; duracion: string; marcas: { t: number; titulo: string }[] }\n\n"
(R.parent / 'src' / 'data' / 'videos.ts').write_text(head + "export const VIDEOS: Partial<Record<CapId, VideoCap>> = {\n" + "\n".join(items) + "\n};\n", encoding='utf-8')
print(len(items), 'videos publicados')
