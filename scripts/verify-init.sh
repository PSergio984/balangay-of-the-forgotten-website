#!/bin/bash
if [ ! -f "package.json" ]; then echo "package.json missing"; exit 1; fi
if ! git lfs ls-files > /dev/null 2>&1; then echo "Git LFS not initialized"; exit 1; fi
if ! grep -q "*.png filter=lfs" .gitattributes; then echo "LFS not tracking PNGs"; exit 1; fi
echo "Init verified"
