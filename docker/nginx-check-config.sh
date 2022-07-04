#!/bin/sh

if [ ! -e /usr/share/nginx/html/config.js ]; then
  echo ""
  echo "!!! MESHVIEWER CONFIG NOT FOUND: /usr/share/nginx/html/config.js"
  echo ""
  exit 1
fi
