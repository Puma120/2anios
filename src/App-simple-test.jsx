import { useState } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  console.log('App rendered with page:', currentPage)

  const handlePageChange = (newPage) => {
    console.log('Changing page from', currentPage, 'to', newPage)
    setCurrentPage(newPage)
  }

  const HomePage = () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Página de Inicio</h1>
      <p>Estado actual: {currentPage}</p>
      <button 
        onClick={() => handlePageChange('valentine')}
        style={{
          background: '#ff6b9d',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          fontSize: '18px',
          borderRadius: '25px',
          cursor: 'pointer'
        }}
      >
        Ir a Valentine
      </button>
    </div>
  )

  const ValentinePage = () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Página de San Valentín</h1>
      <p>Estado actual: {currentPage}</p>
      <div>
        <button 
          onClick={() => handlePageChange('home')}
          style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '20px',
            cursor: 'pointer',
            margin: '5px'
          }}
        >
          Volver a Home
        </button>
        <button 
          onClick={() => handlePageChange('birthday')}
          style={{
            background: '#f8b500',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '20px',
            cursor: 'pointer',
            margin: '5px'
          }}
        >
          Ir a Birthday
        </button>
      </div>
    </div>
  )

  const BirthdayPage = () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #f8b500 0%, #ffa726 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Página de Cumpleaños</h1>
      <p>Estado actual: {currentPage}</p>
      <button 
        onClick={() => handlePageChange('valentine')}
        style={{
          background: '#ff6b9d',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '20px',
          cursor: 'pointer'
        }}
      >
        Volver a Valentine
      </button>
    </div>
  )

  const renderCurrentPage = () => {
    console.log('Rendering page:', currentPage)
    
    switch (currentPage) {
      case 'valentine':
        return <ValentinePage />
      case 'birthday':
        return <BirthdayPage />
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