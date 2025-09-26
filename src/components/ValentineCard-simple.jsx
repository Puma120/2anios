const ValentineCard = ({ onNext }) => {
  return (
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
      <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>💕 San Valentín 💕</h1>
      <p style={{ fontSize: '1.5em', marginBottom: '30px', textAlign: 'center' }}>
        Eres el amor de mi vida
      </p>
      <button 
        onClick={onNext}
        style={{
          background: '#f8b500',
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

export default ValentineCard