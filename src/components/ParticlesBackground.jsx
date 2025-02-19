import React, { useEffect, useRef } from 'react';

const SETTINGS = {
    // Base particle count for a 1920x1080 screen
    // This will be adjusted based on screen size
    BASE_PARTICLE_COUNT: 250,

    // Particles per thousand pixels squared
    // Helps maintain consistent density across screen sizes
    DENSITY_FACTOR: 0.12,

    PARTICLE_SIZE: {
        MIN: 1,
        MAX: 2
    },
    SPEED: {
        MIN: -0.5,
        MAX: 0.5
    },
    CONNECTION_RADIUS: 100,
    PARTICLE_OPACITY: 1,
    LINE_OPACITY: 0.5,
    PARTICLE_COLOR: '255, 255, 255',
    DIRECTION_CHANGE_FREQUENCY: 0.02
};

const ParticlesBackground = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);

    // Calculate particle count based on screen size
    const calculateParticleCount = (width, height) => {
        const screenArea = width * height;
        const baseArea = 1920 * 1080; // Base screen size
        const scaleFactor = screenArea / baseArea;

        // Calculate count based on screen area and density factor
        const count = Math.floor(SETTINGS.BASE_PARTICLE_COUNT * scaleFactor);

        // Set minimum and maximum limits
        return Math.min(Math.max(count, 100), 500); // Min 100, Max 500 particles
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Recalculate particle count and reinitialize particles
            const newCount = calculateParticleCount(canvas.width, canvas.height);
            particlesRef.current = Array.from({ length: newCount }, () => new Particle());
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * (SETTINGS.SPEED.MAX - SETTINGS.SPEED.MIN) + SETTINGS.SPEED.MIN;
                this.radius = Math.random() * (SETTINGS.PARTICLE_SIZE.MAX - SETTINGS.PARTICLE_SIZE.MIN) + SETTINGS.PARTICLE_SIZE.MIN;
            }

            updateDirection() {
                if (Math.random() < SETTINGS.DIRECTION_CHANGE_FREQUENCY) {
                    this.angle += (Math.random() - 0.5) * Math.PI / 2;
                }
            }

            update() {
                this.updateDirection();
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                if (this.x < 0) {
                    this.x = 0;
                    this.angle = Math.PI - this.angle;
                }
                if (this.x > canvas.width) {
                    this.x = canvas.width;
                    this.angle = Math.PI - this.angle;
                }
                if (this.y < 0) {
                    this.y = 0;
                    this.angle = -this.angle;
                }
                if (this.y > canvas.height) {
                    this.y = canvas.height;
                    this.angle = -this.angle;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${SETTINGS.PARTICLE_COLOR}, ${SETTINGS.PARTICLE_OPACITY})`;
                ctx.fill();
            }
        }

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            particlesRef.current.forEach((particle, i) => {
                particlesRef.current.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < SETTINGS.CONNECTION_RADIUS) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(${SETTINGS.PARTICLE_COLOR}, ${SETTINGS.LINE_OPACITY * (1 - distance / SETTINGS.CONNECTION_RADIUS)})`;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 -z-5 w-full h-screen"
            style={{ pointerEvents: 'none' }}
        />
    );
};

export default ParticlesBackground;
