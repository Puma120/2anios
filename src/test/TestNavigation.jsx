import { useState } from 'react'

function TestNavigation() {
  const [currentPage, setCurrentPage] = useState('home')

  const handlePageChange = (newPage) => {
    console.log('Test: Changing page from', currentPage, 'to', newPage)
    setCurrentPage(newPage)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test de Navegación</h1>
      <p>Página actual: <strong>{currentPage}</strong></p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => handlePageChange('home')}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
        >
          Home
        </button>
        <button 
          onClick={() => handlePageChange('valentine')}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
        >
          Valentine
        </button>
        <button 
          onClick={() => handlePageChange('birthday')}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
        >
          Birthday
        </button>
        <button 
          onClick={() => handlePageChange('flowers')}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
        >
          Flowers
        </button>
        <button 
          onClick={() => handlePageChange('fireworks')}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
        >
          Fireworks
        </button>
      </div>

      <div style={{ 
        border: '2px solid #ccc', 
        padding: '20px', 
        minHeight: '200px',
        backgroundColor: currentPage === 'home' ? '#e6f3ff' : 
                         currentPage === 'valentine' ? '#ffe6f0' :
                         currentPage === 'birthday' ? '#fff2e6' :
                         currentPage === 'flowers' ? '#e6ffe6' :
                         currentPage === 'fireworks' ? '#f0e6ff' : '#f9f9f9'
      }}>
        <h2>Contenido de la página: {currentPage}</h2>
        {currentPage === 'home' && <p>Estás en la página de inicio</p>}
        {currentPage === 'valentine' && <p>Estás en la página de San Valentín</p>}
        {currentPage === 'birthday' && <p>Estás en la página de cumpleaños</p>}
        {currentPage === 'flowers' && <p>Estás en la página de flores</p>}
        {currentPage === 'fireworks' && <p>Estás en la página de fuegos artificiales</p>}
      </div>
    </div>
  )
}

export default TestNavigation