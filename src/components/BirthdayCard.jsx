import { useEffect, useRef } from 'react';

const BirthdayCard = ({ onNext }) => {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Cargar CSS inline
    const style = document.createElement('style');
    style.textContent = `
      .birthday-container {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Playfair Display', serif;
        overflow: hidden;
        position: relative;
      }

      .birthday-button {
        text-align: center;
        position: relative;
        z-index: 10;
      }

      .birthday-button__button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 30px;
        border-radius: 20px;
        transition: all 0.3s ease;
        position: relative;
      }

      .birthday-button__button:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.1);
      }

      .birthday-cake {
        width: 200px;
        height: 150px;
        background: #f4a261;
        border-radius: 10px 10px 20px 20px;
        position: relative;
        margin: 0 auto 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      .birthday-cake::before {
        content: '';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 180px;
        height: 40px;
        background: #2a9d8f;
        border-radius: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .candle {
        position: absolute;
        width: 8px;
        height: 30px;
        background: #e76f51;
        border-radius: 4px;
        top: -50px;
      }

      .candle:nth-child(1) { left: 70px; }
      .candle:nth-child(2) { left: 95px; }
      .candle:nth-child(3) { left: 120px; }

      .flame {
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 15px;
        background: radial-gradient(circle, #ff6b35 0%, #f7931e 100%);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        animation: flicker 1s ease-in-out infinite alternate;
      }

      @keyframes flicker {
        0% { transform: translateX(-50%) rotate(-2deg) scale(1); }
        100% { transform: translateX(-50%) rotate(2deg) scale(1.1); }
      }

      .birthday-button__text {
        color: white;
        font-size: 32px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        display: block;
        margin-top: 20px;
        letter-spacing: 2px;
      }

      .celebration-text {
        color: white;
        font-size: 48px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
        animation: celebrationPulse 2s ease-in-out infinite;
      }

      @keyframes celebrationPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      .next-surprise-btn {
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
        border: none;
        padding: 15px 40px;
        border-radius: 30px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        margin-top: 30px;
      }

      .next-surprise-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
      }

      .birthday-animation {
        opacity: 0;
        transition: opacity 1s ease;
      }

      .birthday-animation.show {
        opacity: 1;
      }

      .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #ff6b35;
        animation: confettiFall 3s linear infinite;
      }

      .confetti:nth-child(odd) { background: #f7931e; }
      .confetti:nth-child(3n) { background: #2a9d8f; }

      @keyframes confettiFall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }

      .volume-control {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        color: white;
        font-size: 20px;
      }
    `;
    document.head.appendChild(style);

    // Cargar scripts necesarios
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeBirthday = async () => {
      if (scriptLoadedRef.current) return;
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js');
        scriptLoadedRef.current = true;
        
        setTimeout(() => {
          initBirthdayAnimation();
        }, 100);
        
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    initializeBirthday();

    return () => {
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent.includes('birthday-container')) {
          style.remove();
        }
      });
    };
  }, []);

  const initBirthdayAnimation = () => {
    const button = document.querySelector('.birthday-button__button');
    const celebrationDiv = document.querySelector('.birthday-celebration');
    
    if (!button || !celebrationDiv) return;

    button.addEventListener('click', () => {
      // Ocultar botón y mostrar celebración
      button.style.display = 'none';
      celebrationDiv.classList.add('show');
      
      // Crear confetti
      createConfetti();
      
      // Reproducir sonido (opcional)
      try {
        const audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/cheer.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Ignore if audio fails
      } catch (error) {
        console.log('Audio not available');
      }
      
      // Mostrar botón de siguiente después de 3 segundos
      setTimeout(() => {
        document.querySelector('.next-surprise-btn').style.display = 'block';
      }, 3000);
    });
  };

  const createConfetti = () => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      container.appendChild(confetti);
      
      // Remover después de la animación
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };

  const toggleSound = () => {
    // Toggle sound logic here
    console.log('Sound toggled');
  };

  return (
    <div className="birthday-container" ref={containerRef}>
      <div className="birthday-button">
        <button className="birthday-button__button">
          <div className="birthday-cake">
            <div className="candle">
              <div className="flame"></div>
            </div>
            <div className="candle">
              <div className="flame"></div>
            </div>
            <div className="candle">
              <div className="flame"></div>
            </div>
          </div>
          <span className="birthday-button__text">¡Felices 2 Años!</span>
        </button>
      </div>
      
      <div className="birthday-animation birthday-celebration">
        <div className="celebration-text">🎉 ¡FELICES 2 AÑOS! 🎉</div>
        <p style={{color: 'white', fontSize: '20px', textAlign: 'center', marginBottom: '20px'}}>
          ¡Que sigan siendo muchos años más de amor y felicidad juntos!
        </p>
        <button 
          className="next-surprise-btn" 
          style={{display: 'none'}}
          onClick={onNext}
        >
          Próxima Sorpresa
        </button>
      </div>
      
      <button className="volume-control" onClick={toggleSound}>
        🔊
      </button>
    </div>
  );
};

export default BirthdayCard;