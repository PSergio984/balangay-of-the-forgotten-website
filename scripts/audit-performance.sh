#!/bin/bash

echo "Running performance audit..."

# Check for integer-ratio scaling utility in globals.css
if grep -q "image-rendering: pixelated" app/globals.css; then
    echo "PASS: Pixelated rendering utility found."
else
    echo "FAIL: Pixelated rendering utility missing."
    exit 1
fi

# Check for pixel-crispness goals (D-13)
if grep -q "rendering-pixelated" app/globals.css; then
    echo "PASS: rendering-pixelated utility found."
else
    echo "FAIL: rendering-pixelated utility missing."
    exit 1
fi

echo "Performance audit complete."
