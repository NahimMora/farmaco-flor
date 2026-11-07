#!/usr/bin/env bash
# Uso: bash render.sh <cap> [<cap> ...]. Renderiza cada clase y actualiza la app.
set -uo pipefail
cd "$(dirname "$0")"
OUT="../public/videos"; mkdir -p "$OUT" out
for cap in "$@"; do
  echo "== $cap $(date +%H:%M)"
  npx remotion render src/index.ts "clase-$cap" "out/$cap.raw.mp4" --codec=h264 --crf=26 --concurrency=${CONC:-6} --log=error || { echo "FALLÓ $cap"; continue; }
  ffmpeg -v error -y -i "out/$cap.raw.mp4" -c:v copy -c:a aac -b:a 64k -ac 1 -movflags +faststart "$OUT/$cap.mp4"
  ffmpeg -v error -y -ss 40 -i "$OUT/$cap.mp4" -frames:v 1 -q:v 5 "$OUT/$cap.jpg"
  rm -f "out/$cap.raw.mp4"
  python publicar.py
done
echo "== fin $(date +%H:%M)"
