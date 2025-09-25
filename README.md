# 🌹 Nuestros 2 Años Juntos ❤️

Una experiencia web interactiva y romántica para celebrar 2 años de amor, con múltiples animaciones secuenciales.

## ✨ Características

- 🎨 **Página Principal**: Animación de partículas de corazón con Three.js
- 💌 **Tarjeta de San Valentín**: Animación interactiva con respuesta romántica
- 🎂 **Pastel de Cumpleaños**: Celebración animada con música romántica
- 🌺 **Jardín de Flores**: Carta de amor con sobre interactivo
- 🎆 **Fuegos Artificiales**: Final espectacular con mensaje personalizado

## 🚀 Deploy en Vercel

### Opción 1: Conectar con GitHub
1. Sube el proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) e inicia sesión
3. Clica "New Project" e importa tu repositorio
4. Vercel detectará automáticamente que es un proyecto Vite
5. ¡Deploy automático!

### Opción 2: Deploy directo
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy desde la carpeta del proyecto
vercel

# Sigue las instrucciones en pantalla
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
├── index.html                    # Página principal con partículas
├── public/
│   ├── valentine_animation_card_tcw/  # Tarjeta de San Valentín
│   ├── Birthday_Animation_CSS_tcw/    # Pastel animado
│   ├── flowers_garden/               # Carta en jardín de flores
│   └── Fireworks_launcher_tcw/       # Fuegos artificiales finales
└── vercel.json                   # Configuración de Vercel
```

## 🎯 Flujo de la Experiencia

1. **Inicio**: Partículas de corazón + botón "Comenzar el Viaje"
2. **San Valentín**: "¿Quieres seguir amándome?"
3. **Cumpleaños**: "¡Felices 2 Años!" con pastel animado
4. **Flores**: Carta de amor en jardín animado
5. **Final**: Fuegos artificiales con "Felices 2 años, mi vida"

## 💝 Tecnologías Utilizadas

- **Three.js**: Animaciones 3D de partículas
- **GSAP**: Animaciones suaves y profesionales
- **Matter.js**: Físicas realistas
- **Vite**: Build tool moderno y rápido
- **Vercel**: Hosting optimizado para frontend

## ⚡ Optimizado para Producción

- ✅ Rutas relativas para compatibilidad con Vercel
- ✅ CDN confiables para librerías externas
- ✅ Archivos minificados y optimizados
- ✅ Configuración de Vercel incluida
- ✅ Assets y recursos correctamente referenciados+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
