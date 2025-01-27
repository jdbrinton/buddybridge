#!/bin/bash
# This script is used to generate an AI prompt from a set of files.
# It takes a list of files as input and outputs a single file with the prompt.
# Individdual files or directories can be passed as arguments.
# The last argument is the output file.

# Get the output file
outfile="${@: -1}"
> "$outfile"

# Get the input files
inputs=("${@:1:$#-1}")

# Find all files in the input directories and add them to the prompt
find "${inputs[@]}" -type f -print0 | while IFS= read -r -d '' filepath; do
  echo "\`$filepath\`:" >> "$outfile"
  echo '```' >> "$outfile"
  cat "$filepath" >> "$outfile"
  echo "" >> "$outfile"
  echo '```' >> "$outfile"
done
