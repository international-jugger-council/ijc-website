#!/bin/bash

set -euo pipefail

IMAGE_DIR="$1"

for IMAGE_FILE in ${IMAGE_DIR}/*.jpg; do
  mogrify -resize 1600 "${IMAGE_FILE}"
  npx imagemin --plugin.mozjpeg.quality=50 "$IMAGE_FILE" --out-dir="$IMAGE_DIR"
done
