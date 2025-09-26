const FlowersGarden = ({ onNext }) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>🌸 Jardín de Flores 🌸</h1>
      <p style={{ fontSize: '1.5em', marginBottom: '30px', textAlign: 'center' }}>
        Como las flores, nuestro amor florece cada día
      </p>
      <button 
        onClick={onNext}
        style={{
          background: '#9c27b0',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          fontSize: '18px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Siguiente ➡️
      </button>
    </div>
  )
}

export default FlowersGarden