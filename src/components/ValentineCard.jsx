import { useEffect, useRef } from 'react';

const ValentineCard = ({ onNext }) => {
  const canvasContainerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Cargar CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'data:text/css;base64,' + btoa(`
      .valentine-container {
        width: 100vw;
        height: 100vh;
        background: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1000px;
        overflow: hidden;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        position: relative;
      }

      #canvas-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      .wrapper {
        position: relative;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
        background-repeat: no-repeat;
        background-size: cover;
      }

      .card {
        width: 400px;
        height: 200px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transform: rotateX(-20deg);
        transform-style: preserve-3d;
        transition: transform 0.5s ease;
        position: relative;
        z-index: 10;
      }

      .card.open {
        transform: rotateX(0deg);
      }

      .card-content {
        padding: 10px;
        opacity: 0;
        transition: opacity 0.3s;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
      }

      .card.open .card-content {
        opacity: 1;
      }

      .valentine-text h1 {
        color: white;
        margin-bottom: 20px;
        font-size: 24px;
      }

      .buttons {
        display: flex;
        gap: 20px;
        margin-top: 20px;
      }

      .buttons button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .yes {
        background: #4CAF50;
        color: white;
      }

      .no {
        background: #f44336;
        color: white;
      }

      .yes:hover {
        background: #45a049;
        transform: scale(1.05);
      }

      .no:hover {
        background: #da190b;
        transform: scale(1.05);
      }

      .valentine-congrats h1,
      .valentine-sad h1 {
        color: white;
        margin-bottom: 15px;
      }

      .valentine-congrats p,
      .valentine-sad p {
        color: #f0f0f0;
        margin-bottom: 20px;
      }

      .next-animation {
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s ease;
        margin-top: 20px;
      }

      .next-animation:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
      }

      .cord-wrapper {
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 15;
      }

      .cord {
        stroke: #8B4513;
        stroke-width: 3;
        fill: none;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      }

      .plug {
        width: 40px;
        height: 60px;
        fill: #D2691E;
        stroke: #8B4513;
        stroke-width: 2;
        cursor: pointer;
        transition: all 0.3s ease;
        transform-origin: center top;
      }

      .plug:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
      }

      img {
        max-width: 100%;
        width: auto;
        height: auto;
        max-height: 200px;
        object-fit: contain;
        border-radius: 8px;
      }
    `);
    document.head.appendChild(link);

    // Cargar scripts
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeAnimation = async () => {
      if (scriptLoadedRef.current) return;
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js');
        
        scriptLoadedRef.current = true;
        
        // Inicializar la animación
        setTimeout(() => {
          initValentineAnimation();
        }, 100);
        
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    initializeAnimation();

    return () => {
      // Cleanup
      const links = document.querySelectorAll('link[href*="data:text/css"]');
      links.forEach(link => link.remove());
    };
  }, []);

  const initValentineAnimation = () => {
    const card = document.querySelector('.valentine-card');
    const plug = document.querySelector('.plug');
    
    if (!card || !plug) return;

    let pulled = false;

    plug.addEventListener('click', () => {
      if (pulled) return;
      
      pulled = true;
      card.classList.add('open');
      
      setTimeout(() => {
        document.querySelector('.valentine-text').style.display = 'block';
        document.querySelector('.buttons').style.display = 'flex';
      }, 500);
    });

    // Botones
    const yesBtn = document.querySelector('.yes');
    const noBtn = document.querySelector('.no');

    if (yesBtn) {
      yesBtn.addEventListener('click', () => {
        document.querySelector('.valentine-text').style.display = 'none';
        document.querySelector('.buttons').style.display = 'none';
        document.querySelector('.valentine-congrats').style.display = 'block';
      });
    }

    if (noBtn) {
      noBtn.addEventListener('click', () => {
        document.querySelector('.valentine-text').style.display = 'none';
        document.querySelector('.buttons').style.display = 'none';
        document.querySelector('.valentine-sad').style.display = 'block';
      });
    }
  };

  return (
    <div className="valentine-container">
      <div id="canvas-container" ref={canvasContainerRef}></div>
      <div className="wrapper">
        <div className="card valentine-card">
          <p className="text-intro"></p>
          <div className="card-content">
            <div className="valentine-text" style={{display: 'none'}}>
              <h1>¿Quieres seguir amándome?</h1>
              <img 
                src="https://i.pinimg.com/originals/4d/67/84/4d6784bcad9589f99efd63f9474f841b.gif" 
                alt="please" 
                className="please"
              />
            </div>
            <div className="buttons" style={{display: 'none'}}>
              <button className="yes">Yes</button>
              <button className="no">No</button>
            </div>
            <div className="valentine-congrats" style={{display: 'none'}}>
              <h1>¡YEEEEEi!</h1>
              <p>¡Sabia que me amabas aún!</p>
              <img 
                src="https://i.pinimg.com/originals/1a/ff/72/1aff7269b6171da49a7b882887480120.gif" 
                alt="congrats" 
                className="congrats"
              />
              <button className="next-animation" onClick={onNext}>Continuar</button>
            </div>
            <div className="valentine-sad" style={{display: 'none'}}>
              <h1>porqueeeeee!!!!!</h1>
              <p>La vida es corta para no amar.</p>
              <img 
                src="https://i.pinimg.com/originals/39/8f/41/398f4144995f2eefd11efe1d9ac6c6b2.gif" 
                alt="sad" 
                className="sad"
              />
            </div>
          </div>
          <div className="cord-wrapper">
            <svg width="40" height="200" className="cord">
              <path className="cord-path" d="M20,0 C20,50 20,150 20,200" />
            </svg>
            <svg className="plug" y="140" viewBox="0 0 100 160">
              <path d="M30,0 L70,0 L90,40 L90,140 L10,140 L10,40 Z" />
              <circle cx="35" cy="20" r="5" fill="white" />
              <circle cx="65" cy="20" r="5" fill="white" />
            </svg>
            <div className="ribbon"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValentineCard;