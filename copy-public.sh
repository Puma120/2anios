#!/bin/bash
# Script para copiar archivos public al dist para GitHub Pages

# Crear directorio dist si no existe
mkdir -p dist

# Copiar archivos public al directorio raíz del dist
cp -r public/* dist/

# Copiar index.html principal
cp index.html dist/

echo "Archivos copiados para GitHub Pages!"