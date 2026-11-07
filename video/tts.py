"""Narración con la voz Tomás (es-AR-TomasNeural, edge-tts), la misma de los otros proyectos.

Lee video/guion/<cap>.json y deja:
  public/audio/<cap>/<beat>-<hash>.mp3   un audio por paso. Si el texto no cambió, no se regenera.
  src/tiempos/<cap>.json                 frames de cada paso y subtítulos.
Uso: python tts.py [cap ...]    (sin argumentos: todos). Se puede cortar y volver a lanzar.
"""
import asyncio, hashlib, json, re, subprocess, sys
from pathlib import Path

import edge_tts

R = Path(__file__).resolve().parent
VOZ, RITMO = 'es-AR-TomasNeural', '+4%'
FPS = 15
PAUSA = 0.55

# Lo que el motor de voz lee mal escrito como sigla.
DICCION = [
    (r'5-HT(\d)([A-Z]?)', r'cinco hache te \1 \2'), (r'5-HT', 'cinco hache te'), (r'5-HIAA', 'ácido cinco hidroxi indolacético'),
    (r'GABA-A', 'gaba tipo a'), (r'GABA-B', 'gaba tipo be'), (r'GABA-C', 'gaba tipo ce'), (r'AMP cíclico', 'a eme pe cíclico'), (r'\bHIV\b', 'hache i ve'), (r'\bLSD\b', 'ele ese de'), (r'GABA', 'gaba'), (r'L-DOPA', 'ele dopa'),
    (r'\bMAO-A\b', 'mao a'), (r'\bMAO-B\b', 'mao be'), (r'\bMAO\b', 'mao'), (r'\bCOMT\b', 'comt'), (r'\bDAT\b', 'dat'),
    (r'\bAMPA\b', 'ampa'), (r'\bNMDA\b', 'ene eme de a'), (r'\bIP3\b', 'i pe tres'), (r'\bDAG\b', 'dag'), (r'\bTNF\b', 'te ene efe'),
    (r'\bD1\b', 'de uno'), (r'\bD2\b', 'de dos'), (r'\bD3\b', 'de tres'), (r'\bD4\b', 'de cuatro'), (r'\bD5\b', 'de cinco'),
    (r'\bM1\b', 'eme uno'), (r'\bM2\b', 'eme dos'), (r'\bM3\b', 'eme tres'), (r'\bM4\b', 'eme cuatro'), (r'\bM5\b', 'eme cinco'),
    (r'\bH1\b', 'hache uno'), (r'\bH2\b', 'hache dos'), (r'\bH3\b', 'hache tres'), (r'\bH4\b', 'hache cuatro'),
    (r'\bG uno\b', 'ge uno'), (r'\bG dos\b', 'ge dos'), (r'\bGi\b', 'ge i'), (r'\bGq\b', 'ge cu'), (r'\bGs\b', 'ge ese'),
    (r'Epo-R', 'receptor de eritropoyetina'), (r'\bCE cincuenta\b', 'ce e cincuenta'),
]


def dicha(t):
    for a, b in DICCION:
        t = re.sub(a, b, t)
    return t


def dur(p):
    o = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)], capture_output=True, text=True, check=True)
    return float(o.stdout.strip())


def cortar(t0, t1, texto, maxc=84):
    trozos, cur = [], ''
    for w in texto.split():
        if cur and len(cur) + len(w) + 1 > maxc:
            trozos.append(cur)
            cur = w
        else:
            cur = (cur + ' ' + w).strip()
    if cur:
        trozos.append(cur)
    tot = sum(len(c) for c in trozos)
    out, t = [], t0
    for c in trozos:
        d = (t1 - t0) * len(c) / tot
        out.append([round(t, 2), round(t + d, 2), c])
        t += d
    return out


async def sintetizar(texto, destino, sem):
    meta = destino.with_suffix('.json')
    if destino.exists() and meta.exists():
        return json.loads(meta.read_text(encoding='utf-8'))
    async with sem:
        for intento in range(6):
            try:
                com = edge_tts.Communicate(dicha(texto), VOZ, rate=RITMO, boundary='SentenceBoundary')
                audio, frases = bytearray(), []
                async for ch in com.stream():
                    if ch['type'] == 'audio':
                        audio += ch['data']
                    elif ch['type'] in ('SentenceBoundary', 'WordBoundary'):
                        s = ch['offset'] / 1e7
                        frases.append([s, s + ch['duration'] / 1e7])
                if not audio:
                    raise RuntimeError('sin audio')
                destino.write_bytes(audio)
                d = dur(destino)
                m = {'dur': d, 'bordes': frases}
                meta.write_text(json.dumps(m), encoding='utf-8')
                return m
            except Exception as e:
                print('reintento', destino.name, e, flush=True)
                await asyncio.sleep(2 + intento * 3)
        raise RuntimeError('Falló la voz para: ' + texto[:60])


async def capitulo(cap):
    g = json.loads((R / 'guion' / f'{cap}.json').read_text(encoding='utf-8'))
    adir = R / 'public' / 'audio' / cap
    adir.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(4)
    trabajos = []
    for b in g['beats']:
        h = hashlib.sha1(f"{VOZ}|{RITMO}|{dicha(b['text'])}".encode()).hexdigest()[:10]
        b['archivo'] = f"{b['id']}-{h}.mp3"
        trabajos.append(sintetizar(b['text'], adir / b['archivo'], sem))
    metas = await asyncio.gather(*trabajos)
    t = 3.2  # placa inicial
    salida, marcas, ultima = [], [], -1
    for b, m in zip(g['beats'], metas):
        if b['escena'] != ultima:
            ultima = b['escena']
            t += 0.5
            marcas.append({'t': round(t, 1), 'titulo': g['escenas'][ultima]})
        # Subtítulos: reparte el texto por frases y corta en renglones.
        frases = re.split(r'(?<=[.:?])\s+', b['text'])
        tot = sum(len(x) for x in frases) or 1
        pos, cues = 0.0, []
        for fr in frases:
            d = m['dur'] * len(fr) / tot
            cues += cortar(pos, pos + d, fr)
            pos += d
        salida.append({**b, 'inicio': round(t * FPS), 'frames': round((m['dur'] + PAUSA) * FPS), 'audio': m['dur'], 'cues': cues})
        t += m['dur'] + PAUSA
    (R / 'src' / 'tiempos').mkdir(exist_ok=True)
    (R / 'src' / 'tiempos' / f'{cap}.json').write_text(json.dumps({'cap': cap, 'titulo': g['titulo'], 'fps': FPS, 'total': round((t + 2.5) * FPS), 'marcas': marcas, 'beats': salida}, ensure_ascii=False), encoding='utf-8')
    print(f"{cap}: {len(salida)} pasos, {t / 60:.1f} min", flush=True)


async def main():
    caps = sys.argv[1:] or [p.stem for p in sorted((R / 'guion').glob('*.json'))]
    for c in caps:
        await capitulo(c)


asyncio.run(main())
