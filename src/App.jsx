import { useState, useEffect, useRef } from 'react'
import ValentineCard from './components/ValentineCard'
import BirthdayCard from './components/BirthdayCard'
import FlowersGarden from './components/FlowersGarden'
import FireworksShow from './components/FireworksShow'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const canvasRef = useRef(null)

  // Debug: agregar console.log para ver el estado
  console.log('App rendered with page:', currentPage)

  // Handler simple para cambiar de página
  const handlePageChange = (newPage) => {
    console.log('Changing page from', currentPage, 'to', newPage)
    setCurrentPage(newPage)
  }

  // Página principal simplificada
  const HomePage = () => {
    return (
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Playfair Display', serif",
        overflow: 'hidden'
      }}>
        
        <div style={{
          textAlign: 'center',
          maxWidth: '700px',
          padding: '60px 40px'
        }}>
          <h1 style={{
            fontSize: '4em',
            marginBottom: '20px',
            color: 'white',
            textShadow: '0 0 30px rgba(255, 105, 180, 0.8)',
            fontWeight: 'bold',
            letterSpacing: '3px'
          }}>
            Nuestros 2 Años Juntos
          </h1>
          
          <p style={{
            fontSize: '1.4em',
            marginBottom: '40px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 400,
            letterSpacing: '1px'
          }}>
            Una celebración del amor que hemos construido
          </p>
          
          <button 
            onClick={() => {
              console.log('Button clicked! Changing to valentine')
              handlePageChange('valentine')
            }}
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
          
          <div style={{ marginTop: '20px', color: 'white', fontSize: '14px' }}>
            Página actual: {currentPage}
          </div>
        </div>
      </div>
    )
  }

  // Renderizar la página actual
  const renderCurrentPage = () => {
    console.log('Rendering page:', currentPage)
    
    switch (currentPage) {
      case 'valentine':
        return <ValentineCard onNext={() => handlePageChange('birthday')} />
      case 'birthday':  
        return <BirthdayCard onNext={() => handlePageChange('flowers')} />
      case 'flowers':
        return <FlowersGarden onNext={() => handlePageChange('fireworks')} />
      case 'fireworks':
        return <FireworksShow onFinish={() => handlePageChange('home')} />
      default:
        return <HomePage />
    }
  }

  return (
    <div>
      {/* Debug info */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 9999,
        fontSize: '12px'
      }}>
        Current Page: {currentPage}
      </div>
      
      {renderCurrentPage()}
    </div>
  )
}

export default App
