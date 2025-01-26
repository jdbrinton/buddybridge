#!/bin/bash
outfile="${@: -1}"
> "$outfile"
inputs=("${@:1:$#-1}")
find "${inputs[@]}" -type f -print0 | while IFS= read -r -d '' filepath; do
  echo "\`$filepath\`:" >> "$outfile"
  echo '```' >> "$outfile"
  cat "$filepath" >> "$outfile"
  echo "" >> "$outfile"
  echo '```' >> "$outfile"
done
