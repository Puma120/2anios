import { useState, useEffect, useRef } from 'react'
import ValentineCard from './components/ValentineCard'
import BirthdayCard from './components/BirthdayCard'
import FlowersGarden from './components/FlowersGarden'
import FireworksShow from './components/FireworksShow'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const canvasRef = useRef(null)

  // Página principal con partículas de corazón
  const HomePage = () => {
    useEffect(() => {
      // Cargar Three.js y crear animación de partículas
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = src
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      const initHeartParticles = async () => {
        try {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r136/three.min.js')
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js')
          
          // Inicializar Three.js
          if (window.THREE && canvasRef.current) {
            const scene = new window.THREE.Scene()
            const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            const renderer = new window.THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })
            
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setClearColor(0x000000, 0)
            
            // Crear partículas de corazón
            const heartShape = new window.THREE.Shape()
            heartShape.moveTo(25, 25)
            heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0)
            heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35)
            heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95)
            heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35)
            heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0)
            heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25)
            
            const heartGeometry = new window.THREE.ShapeGeometry(heartShape)
            const heartMaterial = new window.THREE.MeshBasicMaterial({ 
              color: 0xff69b4,
              transparent: true,
              opacity: 0.8
            })
            
            const hearts = []
            for (let i = 0; i < 50; i++) {
              const heart = new window.THREE.Mesh(heartGeometry, heartMaterial)
              heart.position.x = (Math.random() - 0.5) * 2000
              heart.position.y = (Math.random() - 0.5) * 2000
              heart.position.z = (Math.random() - 0.5) * 2000
              heart.scale.setScalar(Math.random() * 2 + 0.5)
              hearts.push(heart)
              scene.add(heart)
            }
            
            camera.position.z = 1000
            
            const animate = () => {
              requestAnimationFrame(animate)
              
              hearts.forEach(heart => {
                heart.rotation.z += 0.01
                heart.position.y += Math.sin(Date.now() * 0.001 + heart.position.x * 0.01) * 0.5
              })
              
              renderer.render(scene, camera)
            }
            
            animate()
            
            // Responsive
            const handleResize = () => {
              camera.aspect = window.innerWidth / window.innerHeight
              camera.updateProjectionMatrix()
              renderer.setSize(window.innerWidth, window.innerHeight)
            }
            
            window.addEventListener('resize', handleResize)
            
            return () => {
              window.removeEventListener('resize', handleResize)
            }
          }
        } catch (error) {
          console.error('Error loading Three.js:', error)
        }
      }

      initHeartParticles()
    }, [])

    return (
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Playfair Display', serif",
        overflow: 'hidden'
      }}>
        <canvas 
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '700px',
          padding: '60px 40px'
        }}>
          <h1 style={{
            fontSize: '4em',
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #ff6b9d, #c44569, #f8b500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(255, 105, 180, 0.8)',
            fontWeight: 'bold',
            letterSpacing: '3px'
          }}>
            Nuestros 2 Años Juntos
          </h1>
          
          <p style={{
            fontSize: '1.4em',
            marginBottom: '40px',
            color: 'rgba(255, 182, 193, 0.9)',
            fontWeight: 400,
            letterSpacing: '1px',
            textShadow: '0 0 20px rgba(255, 105, 180, 0.6)'
          }}>
            Una celebración del amor que hemos construido
          </p>
          
          <button 
            onClick={() => setCurrentPage('valentine')}
            style={{
              background: 'linear-gradient(45deg, #ff6b9d, #c44569)',
              color: 'white',
              border: 'none',
              padding: '18px 45px',
              fontSize: '20px',
              fontWeight: 'bold',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(255, 107, 157, 0.4)',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 157, 0.6)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.4)'
            }}
          >
            ✨ Comenzar el Viaje ✨
          </button>
        </div>
      </div>
    )
  }

  const goToNext = (nextPage) => {
    setCurrentPage(nextPage)
  }

  // Renderizar la página actual
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'valentine':
        return <ValentineCard onNext={() => goToNext('birthday')} />
      case 'birthday':  
        return <BirthdayCard onNext={() => goToNext('flowers')} />
      case 'flowers':
        return <FlowersGarden onNext={() => goToNext('fireworks')} />
      case 'fireworks':
        return <FireworksShow onFinish={() => goToNext('home')} />
      default:
        return <HomePage />
    }
  }

  return (
    <div>
      {renderCurrentPage()}
    </div>
  )
}

export default App
