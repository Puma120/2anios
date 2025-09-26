import { useEffect, useRef } from 'react';

const FireworksShow = ({ onFinish }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Cargar CSS inline
    const style = document.createElement('style');
    style.textContent = `
      .fireworks-container {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(to bottom, #0f0f23 0%, #2d1b69 100%);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .fireworks-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: crosshair;
      }

      .fireworks-message {
        position: relative;
        z-index: 10;
        text-align: center;
        color: white;
        font-family: 'Great Vibes', cursive;
        animation: messageGlow 2s ease-in-out infinite alternate;
      }

      .main-message {
        font-size: 48px;
        margin-bottom: 20px;
        text-shadow: 0 0 20px rgba(255, 107, 107, 0.8);
      }

      .sub-message {
        font-size: 24px;
        margin-bottom: 40px;
        color: #ffb3d9;
        text-shadow: 0 0 10px rgba(255, 179, 217, 0.6);
      }

      @keyframes messageGlow {
        0% { 
          transform: scale(1);
          text-shadow: 0 0 20px rgba(255, 107, 107, 0.8),
                       0 0 40px rgba(255, 107, 107, 0.4);
        }
        100% { 
          transform: scale(1.02);
          text-shadow: 0 0 30px rgba(255, 107, 107, 1),
                       0 0 60px rgba(255, 107, 107, 0.6);
        }
      }

      .celebration-button {
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
        font-family: Arial, sans-serif;
        margin-top: 20px;
        z-index: 10;
        position: relative;
      }

      .celebration-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
      }

      .instructions {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255, 255, 255, 0.7);
        font-size: 16px;
        text-align: center;
        z-index: 10;
      }

      .star {
        position: absolute;
        color: white;
        animation: twinkle 2s ease-in-out infinite alternate;
        pointer-events: none;
      }

      @keyframes twinkle {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);

    // Cargar fuente de Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Inicializar canvas y fuegos artificiales
    const initializeFireworks = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      
      if (!canvas || !container) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const ctx = canvas.getContext('2d');
      const fireworks = [];
      const particles = [];

      // Crear estrellas de fondo
      createStars(container);

      // Clase Firework
      class Firework {
        constructor(x, y, targetX, targetY) {
          this.x = x;
          this.y = y;
          this.targetX = targetX;
          this.targetY = targetY;
          this.distanceToTarget = Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2);
          this.distanceTraveled = 0;
          this.coordinates = [];
          this.coordinateCount = 3;
          
          while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
          }
          
          this.angle = Math.atan2(targetY - y, targetX - x);
          this.speed = 8;
          this.acceleration = 1.05;
          this.brightness = Math.random() * 50 + 50;
          this.targetRadius = 1;
        }

        update(index) {
          this.coordinates.pop();
          this.coordinates.unshift([this.x, this.y]);
          
          if (this.targetRadius < 8) {
            this.targetRadius += 0.3;
          } else {
            this.targetRadius = 1;
          }
          
          this.speed *= this.acceleration;
          
          const vx = Math.cos(this.angle) * this.speed;
          const vy = Math.sin(this.angle) * this.speed;
          
          this.distanceTraveled = Math.sqrt((this.x + vx - this.x) ** 2 + (this.y + vy - this.y) ** 2);
          
          if (this.distanceTraveled >= this.distanceToTarget) {
            createParticles(this.targetX, this.targetY);
            fireworks.splice(index, 1);
          } else {
            this.x += vx;
            this.y += vy;
          }
        }

        draw() {
          ctx.beginPath();
          ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
          ctx.lineTo(this.x, this.y);
          ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, ${this.brightness}%)`;
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(this.targetX, this.targetY, this.targetRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Clase Particle
      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.coordinates = [];
          this.coordinateCount = 5;
          
          while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
          }
          
          this.angle = Math.random() * Math.PI * 2;
          this.speed = Math.random() * 10 + 1;
          this.friction = 0.95;
          this.gravity = 1;
          this.hue = Math.random() * 360;
          this.brightness = Math.random() * 80 + 50;
          this.alpha = 1;
          this.decay = Math.random() * 0.03 + 0.01;
        }

        update(index) {
          this.coordinates.pop();
          this.coordinates.unshift([this.x, this.y]);
          
          this.speed *= this.friction;
          this.x += Math.cos(this.angle) * this.speed;
          this.y += Math.sin(this.angle) * this.speed + this.gravity;
          this.alpha -= this.decay;
          
          if (this.alpha <= this.decay) {
            particles.splice(index, 1);
          }
        }

        draw() {
          ctx.beginPath();
          ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
          ctx.lineTo(this.x, this.y);
          ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
          ctx.stroke();
        }
      }

      // Crear partículas
      const createParticles = (x, y) => {
        let particleCount = 30;
        while (particleCount--) {
          particles.push(new Particle(x, y));
        }
      };

      // Loop de animación
      const loop = () => {
        requestAnimationFrame(loop);
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(15, 15, 35, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        
        // Actualizar y dibujar fuegos artificiales
        let i = fireworks.length;
        while (i--) {
          fireworks[i].update(i);
          fireworks[i].draw();
        }
        
        // Actualizar y dibujar partículas
        let j = particles.length;
        while (j--) {
          particles[j].update(j);
          particles[j].draw();
        }
      };

      // Evento de click
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        fireworks.push(new Firework(canvas.width / 2, canvas.height, x, y));
      });

      // Fuegos artificiales automáticos
      const autoFireworks = () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        fireworks.push(new Firework(canvas.width / 2, canvas.height, x, y));
      };

      // Iniciar loop y fuegos artificiales automáticos
      loop();
      const interval = setInterval(autoFireworks, 1000);

      // Cleanup
      return () => {
        clearInterval(interval);
      };
    };

    const createStars = (container) => {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = '✨';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.fontSize = Math.random() * 10 + 10 + 'px';
        container.appendChild(star);
      }
    };

    const cleanup = initializeFireworks();

    return () => {
      if (cleanup) cleanup();
      
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent.includes('fireworks-container')) {
          style.remove();
        }
      });
    };
  }, []);

  const handleCelebration = () => {
    // Crear una explosión especial
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Crear múltiples fuegos artificiales simultáneos
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const event = new MouseEvent('click', {
            clientX: centerX + (Math.random() - 0.5) * 200,
            clientY: centerY + (Math.random() - 0.5) * 200
          });
          canvas.dispatchEvent(event);
        }, i * 200);
      }
    }
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish();
    } else {
      alert('¡Gracias por vivir estos 2 años increíbles juntos! ❤️');
    }
  };

  return (
    <div className="fireworks-container" ref={containerRef}>
      <canvas ref={canvasRef} className="fireworks-canvas"></canvas>
      
      <div className="fireworks-message">
        <h1 className="main-message">Felices 2 años, mi vida</h1>
        <p className="sub-message">Que este sea el comienzo de muchos años más juntos</p>
        <button className="celebration-button" onClick={handleCelebration}>
          🎆 ¡Gran Final! 🎆
        </button>
        <button className="celebration-button" onClick={handleFinish} style={{marginLeft: '20px'}}>
          💕 Terminar 💕
        </button>
      </div>
      
      <div className="instructions">
        Haz click en cualquier parte de la pantalla para crear fuegos artificiales
      </div>
    </div>
  );
};

export default FireworksShow;