#!/bin/bash

if [ $# -eq 0 ] || [ "$1" == "help" ]; then
  echo "Usage: $0 [svelte|electron|svelte-config|svelte-electron] or [files/dirs...] [outfile]"
  exit 1
fi

if [ $# -eq 1 ]; then
  case "$1" in
    "svelte")
      inputs=(jsconfig.json types/global.d.ts src/routes/ src/app.css src/app.html package.json svelte.config.js tailwind.config.js vite.config.js postcss.config.js)
      outfile="ai.txt"
      ;;
    "electron")
      inputs=(electron/src electron/capacitor.config.json electron/electron-builder.config.json electron/live-runner.js electron/package.json electron/tsconfig.json electron/resources)
      outfile="ai.txt"
      ;;
    "electron-code")
      inputs=(electron/src electron/resources)
      outfile="ai.txt"
      ;;
    "svelte-config")
      inputs=(types/global.d.ts package.json svelte.config.js tailwind.config.js vite.config.js postcss.config.js)
      outfile="ai.txt"
      ;;
    "svelte-electron")
      inputs=(jsconfig.json types/global.d.ts src/routes/ src/app.css src/app.html package.json svelte.config.js tailwind.config.js vite.config.js postcss.config.js electron/src electron/capacitor.config.json electron/electron-builder.config.json electron/live-runner.js electron/package.json electron/tsconfig.json electron/resources)
      outfile="ai.txt"
      ;;
    "svelte-electron-code")
      inputs=(types/global.d.ts src/routes/bridge electron/src electron/resources)
      outfile="ai.txt"
      ;;
    *)
      echo "Unknown preset: $1"
      exit 1
      ;;
  esac
else
  outfile="${@: -1}"
  inputs=("${@:1:$#-1}")
fi

> "$outfile"

echo -e "I'm writing a mobile and web app using Svelte, CapacitorJS, and ElectronJS. You are a principal software engineer and you're helping me debug and code. The app is called BuddyBridge and it logs into a users Facebook account, scrapes their friends list, and tries to match them on Bluesky. Note, Svelte does not have typescript enabled (its only javascript). Any files you change provide me with the full file code (no snippets) without comments. Do not provide me any files that don't have a code change.\n\n\n" >> "$outfile"

echo "## Files" >> "$outfile"

find "${inputs[@]}" -type f -print0 | while IFS= read -r -d '' filepath; do
  echo "\`$filepath\`:" >> "$outfile"
  echo '```' >> "$outfile"
  cat "$filepath" >> "$outfile"
  echo "" >> "$outfile"
  echo '```' >> "$outfile"
done
