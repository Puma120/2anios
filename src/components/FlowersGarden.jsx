import { useEffect, useRef, useState } from 'react';

const FlowersGarden = ({ onNext }) => {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    // Cargar CSS inline
    const style = document.createElement('style');
    style.textContent = `
      .flowers-container {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
      }

      .flower-garden {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%);
      }

      .flower {
        position: absolute;
        animation: sway 3s ease-in-out infinite;
      }

      .flower-stem {
        width: 4px;
        height: 60px;
        background: #228B22;
        margin: 0 auto;
        border-radius: 2px;
      }

      .flower-head {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
        margin-bottom: 5px;
      }

      .flower-1 .flower-head { background: #FF69B4; }
      .flower-2 .flower-head { background: #FFD700; }
      .flower-3 .flower-head { background: #FF6347; }
      .flower-4 .flower-head { background: #DA70D6; }
      .flower-5 .flower-head { background: #FFA500; }

      .flower-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background: #FFD700;
        border-radius: 50%;
      }

      @keyframes sway {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(2deg); }
        75% { transform: rotate(-2deg); }
      }

      @keyframes flowerGrow {
        0% { 
          transform: scale(0) rotate(0deg);
          opacity: 0;
        }
        100% { 
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
      }

      .letter-button {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        text-align: center;
        cursor: pointer;
        transition: transform 0.3s ease;
      }

      .letter-button:hover {
        transform: translate(-50%, -50%) scale(1.1);
      }

      .envelope {
        width: 100px;
        height: 70px;
        position: relative;
        margin: 0 auto 15px;
      }

      .envelope-back {
        position: absolute;
        width: 100px;
        height: 70px;
        background: #f4f4f4;
        border: 2px solid #d4af37;
        border-radius: 5px;
      }

      .envelope-front {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 35px solid #f8f8f8;
        top: 0;
        left: 0;
        z-index: 2;
        animation: envelope-pulse 2s infinite ease-in-out;
      }

      .letter-inside {
        position: absolute;
        width: 80px;
        height: 50px;
        background: #fff;
        top: 10px;
        left: 10px;
        border-radius: 3px;
        opacity: 0.8;
      }

      .letter-button p {
        color: #d4af37;
        font-family: 'Georgia', serif;
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }

      @keyframes envelope-pulse {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      .love-letter {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        background: #f8f8f8;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        padding: 0;
        border: 3px solid #d4af37;
        display: none;
      }

      .letter-content {
        padding: 30px;
        font-family: 'Georgia', serif;
        color: #333;
      }

      .letter-header {
        text-align: center;
        margin-bottom: 25px;
        border-bottom: 2px solid #d4af37;
        padding-bottom: 15px;
      }

      .letter-header h2 {
        color: #d4af37;
        font-size: 24px;
        margin: 0;
        font-weight: bold;
      }

      .letter-body {
        line-height: 1.8;
        font-size: 16px;
        margin-bottom: 25px;
      }

      .letter-body p {
        margin-bottom: 15px;
        text-align: justify;
      }

      .signature {
        text-align: right;
        font-style: italic;
        color: #666;
        margin-top: 30px !important;
      }

      .close-letter {
        display: block;
        margin: 0 auto;
        padding: 12px 30px;
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s ease;
      }

      .close-letter:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
      }
    `;
    document.head.appendChild(style);

    // Cargar jQuery y GSAP
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeFlowers = async () => {
      if (scriptLoadedRef.current) return;
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js');
        
        scriptLoadedRef.current = true;
        
        setTimeout(() => {
          createFlowers();
        }, 100);
        
      } catch (error) {
        console.error('Error loading scripts:', error);
        // Fallback: crear flores sin animación
        createFlowers();
      }
    };

    initializeFlowers();

    return () => {
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent.includes('flowers-container')) {
          style.remove();
        }
      });
    };
  }, []);

  const createFlowers = () => {
    const container = containerRef.current;
    if (!container) return;

    const flowerTypes = ['flower-1', 'flower-2', 'flower-3', 'flower-4', 'flower-5'];
    
    for (let i = 0; i < 20; i++) {
      const flower = document.createElement('div');
      flower.className = `flower ${flowerTypes[Math.floor(Math.random() * flowerTypes.length)]}`;
      flower.style.left = Math.random() * 90 + '%';
      flower.style.bottom = Math.random() * 30 + '%';
      flower.style.animationDelay = Math.random() * 2 + 's';
      flower.style.animation = `flowerGrow 1s ease-out ${Math.random() * 2}s forwards, sway 3s ease-in-out infinite ${Math.random() * 2}s`;
      
      flower.innerHTML = `
        <div class="flower-head">
          <div class="flower-center"></div>
        </div>
        <div class="flower-stem"></div>
      `;
      
      const garden = container.querySelector('.flower-garden');
      if (garden) {
        garden.appendChild(flower);
      }
    }
  };

  const openLetter = () => {
    const letterButton = document.getElementById('letter-button');
    const loveLetter = document.getElementById('love-letter');
    
    if (letterButton && loveLetter) {
      letterButton.style.transform = 'translate(-50%, -50%) scale(0)';
      letterButton.style.opacity = '0';
      
      setTimeout(() => {
        letterButton.style.display = 'none';
        loveLetter.style.display = 'block';
        loveLetter.style.opacity = '0';
        loveLetter.style.transform = 'translate(-50%, -50%) scale(0.5)';
        
        setTimeout(() => {
          loveLetter.style.transition = 'all 0.5s ease';
          loveLetter.style.opacity = '1';
          loveLetter.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 50);
      }, 300);
    }
  };

  const closeLetter = () => {
    onNext();
  };

  return (
    <div className="flowers-container" ref={containerRef}>
      <div className="flower-garden"></div>
      
      <div id="letter-button" className="letter-button" onClick={openLetter}>
        <div className="envelope">
          <div className="envelope-back"></div>
          <div className="envelope-front"></div>
          <div className="letter-inside"></div>
        </div>
        <p>Tienes una carta de amor 💌</p>
      </div>

      <div id="love-letter" className="love-letter">
        <div className="letter-content">
          <div className="letter-header">
            <h2>Para mi amor ❤️</h2>
          </div>
          <div className="letter-body">
            <p>Han pasado 2 años increíbles juntos...</p>
            <p>Cada día a tu lado es una nueva aventura.</p>
            <p>Gracias por ser mi compañera de vida.</p>
            <p>Te amo más de lo que las palabras pueden expresar.</p>
            <p className="signature">Con todo mi amor,<br/>Tu pareja ❤️</p>
          </div>
          <button className="close-letter" onClick={closeLetter}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default FlowersGarden;