import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ParticlesBackground = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const starFormationRef = useRef(null);
    const [highlightMode, setHighlightMode] = useState(false);
    const { theme } = useTheme();

    const keyPressCountRef = useRef(0);
    const lastKeyPressTimeRef = useRef(0);
    const KEY_PRESS_TIMEOUT = 1000;

    const highlightTimerRef = useRef(null);
    const HIGHLIGHT_DURATION = 5000;

    const transitionStartRef = useRef(0);
    const inTransitionRef = useRef(false);

    const getSettings = (isHighlighted, currentTheme) => {
        return {
            BASE_PARTICLE_COUNT: 250,
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
            LINE_OPACITY: currentTheme === 'dark' ? 0.5 : 0.2,
            PARTICLE_COLOR: currentTheme === 'dark' ? '255, 255, 255' : '0, 0, 100',
            CONSTELLATION_COLOR: isHighlighted
                ? '255, 215, 0'
                : (currentTheme === 'dark' ? '255, 255, 255' : '0, 0, 100'),
            CONSTELLATION_OPACITY: isHighlighted ? 0.8 : (currentTheme === 'dark' ? 0.3 : 0.15),
            DIRECTION_CHANGE_FREQUENCY: 0.02,
            CONSTELLATION_SPEED: 0.3,
            PARTICLE_CLEARANCE: 20,
            TRANSITION_DURATION: 300
        };
    };

    const calculateParticleCount = (width, height) => {
        const SETTINGS = getSettings(highlightMode, theme);
        const screenArea = width * height;
        const baseArea = 1920 * 1080;
        const scaleFactor = screenArea / baseArea;
        const count = Math.floor(SETTINGS.BASE_PARTICLE_COUNT * scaleFactor);
        return Math.min(Math.max(count, 100), 500);
    };

    useEffect(() => {
        if (highlightMode) {
            if (highlightTimerRef.current) {
                clearTimeout(highlightTimerRef.current);
            }

            highlightTimerRef.current = setTimeout(() => {
                setHighlightMode(false);

                transitionStartRef.current = Date.now();
                inTransitionRef.current = true;
            }, HIGHLIGHT_DURATION);
        }

        return () => {
            if (highlightTimerRef.current) {
                clearTimeout(highlightTimerRef.current);
            }
        };
    }, [highlightMode]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const SETTINGS = getSettings(highlightMode, theme);
        
        const activationKey = import.meta.env.VITE_ACTIVATION_KEY;
        const requiredKeyPressCount = import.meta.env.VITE_ACTIVATION_KEY_PRESS_COUNT ? 
            parseInt(import.meta.env.VITE_ACTIVATION_KEY_PRESS_COUNT, 10) : undefined;

        const handleKeyDown = (e) => {
            if (activationKey && e.key && e.key.toLowerCase() === activationKey.toLowerCase()) {
                const currentTime = Date.now();
                if (currentTime - lastKeyPressTimeRef.current > KEY_PRESS_TIMEOUT) {
                    keyPressCountRef.current = 0;
                }
                lastKeyPressTimeRef.current = currentTime;
                keyPressCountRef.current += 1;

                if (requiredKeyPressCount && keyPressCountRef.current === requiredKeyPressCount) {
                    setHighlightMode(true);
                    keyPressCountRef.current = 0;
                    transitionStartRef.current = currentTime;
                    inTransitionRef.current = true;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        class Constellation {
            constructor(canvasWidth, canvasHeight) {
                this.relativeStars = [];
                this.connections = [];

                const middleThirdStart = canvasWidth * 0.33;
                const middleThirdEnd = canvasWidth * 0.67;

                const useLeftSide = Math.random() > 0.5;

                if (useLeftSide) {
                    this.centerX = canvasWidth * (Math.random() * 0.3);
                    this.side = 'left';
                } else {
                    this.centerX = canvasWidth * (0.7 + Math.random() * 0.3);
                    this.side = 'right';
                }

                this.centerY = canvasHeight * (0.2 + Math.random() * 0.6);
                this.size = Math.min(canvasWidth, canvasHeight) * 0.2;

                this.angle = Math.random() * Math.PI * 2;

                const initialSettings = getSettings(highlightMode, theme);
                this.speed = (Math.random() * (initialSettings.SPEED.MAX - initialSettings.SPEED.MIN) + initialSettings.SPEED.MIN) * initialSettings.CONSTELLATION_SPEED;
                this.rotationAngle = Math.random() * Math.PI * 2;
                this.rotationSpeed = 0.0003;

                this.setupStarFormation();
            }

            setupStarFormation() {
                this.relativeStars = [
                    { x: -0.35, y: -0.1, size: 1.3 },
                    { x: -0.25, y: -0.05, size: 1.0 },
                    { x: -0.15, y: -0.12, size: 1.1 },
                    { x: -0.05, y: -0.07, size: 0.9 },
                    { x: 0.08, y: -0.13, size: 1.2 },
                    { x: 0.15, y: 0.0, size: 0.9 },
                    { x: 0.25, y: 0.08, size: 1.0 },
                    { x: 0.33, y: 0.15, size: 1.1 },
                    { x: 0.2, y: 0.22, size: 0.9 },
                    { x: 0.06, y: 0.18, size: 1.0 },
                    { x: -0.08, y: 0.1, size: 0.8 }
                ];
                this.connections = [
                    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
                    [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 2]
                ];
            }

            updateDirection(currentSettings) {
                if (Math.random() < currentSettings.DIRECTION_CHANGE_FREQUENCY / 3) {
                    this.angle += (Math.random() - 0.5) * Math.PI / 6;
                }
            }

            distanceToPoint(x, y) {
                const dx = this.centerX - x;
                const dy = this.centerY - y;
                return Math.sqrt(dx * dx + dy * dy);
            }

            containsPoint(x, y, currentSettings) {
                if (this.distanceToPoint(x, y) > this.size * 1.5) {
                    return false;
                }
                const stars = this.getStars();
                for (const star of stars) {
                    const dx = x - star.x;
                    const dy = y - star.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < currentSettings.PARTICLE_SIZE.MAX * star.size * 3 + currentSettings.PARTICLE_CLEARANCE) {
                        return true;
                    }
                }
                return false;
            }

            update(canvasWidth, canvasHeight, isHighlighted, currentSettings) {
                const speedMultiplier = 1.0;

                this.updateDirection(currentSettings);

                const prevX = this.centerX;
                const prevY = this.centerY;

                this.centerX += Math.cos(this.angle) * this.speed * speedMultiplier;
                this.centerY += Math.sin(this.angle) * this.speed * speedMultiplier;
                this.rotationAngle += this.rotationSpeed * speedMultiplier;

                let bounced = false;

                if (this.centerY - this.size < 0) {
                    this.centerY = this.size;
                    this.angle = -this.angle;
                    bounced = true;
                }
                if (this.centerY + this.size > canvasHeight) {
                    this.centerY = canvasHeight - this.size;
                    this.angle = -this.angle;
                    bounced = true;
                }

                const middleThirdStart = canvasWidth * 0.33;
                const middleThirdEnd = canvasWidth * 0.67;

                if (this.side === 'left') {
                    if (this.centerX - this.size < 0) {
                        this.centerX = this.size;
                        this.angle = Math.PI - this.angle;
                        bounced = true;
                    }
                    if (this.centerX + this.size > middleThirdStart) {
                        this.centerX = middleThirdStart - this.size;
                        this.angle = Math.PI - this.angle;
                        bounced = true;
                    }
                } else {
                    if (this.centerX + this.size > canvasWidth) {
                        this.centerX = canvasWidth - this.size;
                        this.angle = Math.PI - this.angle;
                        bounced = true;
                    }
                    if (this.centerX - this.size < middleThirdEnd) {
                        this.centerX = middleThirdEnd + this.size;
                        this.angle = Math.PI - this.angle;
                        bounced = true;
                    }
                }
            }

            getStars() {
                if (!this.relativeStars || !this.relativeStars.length) {
                    return [];
                }

                return this.relativeStars.map(star => {
                    const rotatedX = star.x * Math.cos(this.rotationAngle) - star.y * Math.sin(this.rotationAngle);
                    const rotatedY = star.x * Math.sin(this.rotationAngle) + star.y * Math.cos(this.rotationAngle);

                    return {
                        x: this.centerX + rotatedX * this.size,
                        y: this.centerY + rotatedY * this.size,
                        size: star.size
                    };
                });
            }

            draw(ctx, isHighlighted, currentSettings, transitionProgress = 1, isInTransition) {
                const stars = this.getStars();

                const starSizeMultiplier = isHighlighted ? 1.5 : 1.0;
                const baseStarOpacity = isHighlighted ? 1.0 : (currentSettings.PARTICLE_OPACITY * 1.2);

                const currentStarOpacity = isInTransition
                    ? (isHighlighted
                        ? (currentSettings.PARTICLE_OPACITY * 1.2 + (transitionProgress * (1.0 - currentSettings.PARTICLE_OPACITY * 1.2)))
                        : (baseStarOpacity * (1 - transitionProgress)))
                    : baseStarOpacity;

                this.connections.forEach(connection => {
                    const star1 = stars[connection[0]];
                    const star2 = stars[connection[1]];
                    ctx.beginPath();
                    ctx.moveTo(star1.x, star1.y);
                    ctx.lineTo(star2.x, star2.y);

                    const connectionOpacity = isInTransition
                        ? (isHighlighted
                            ? currentSettings.CONSTELLATION_OPACITY * transitionProgress
                            : currentSettings.CONSTELLATION_OPACITY * (1.0 - transitionProgress))
                        : currentSettings.CONSTELLATION_OPACITY;

                    ctx.strokeStyle = `rgba(${currentSettings.CONSTELLATION_COLOR}, ${connectionOpacity})`;
                    ctx.stroke();
                });

                stars.forEach(star => {
                    ctx.beginPath();
                    let currentStarSize = isInTransition
                        ? (isHighlighted
                            ? currentSettings.PARTICLE_SIZE.MAX * star.size * (1 + transitionProgress * 0.5)
                            : currentSettings.PARTICLE_SIZE.MAX * star.size * (1.5 - transitionProgress * 0.5))
                        : (isHighlighted ? currentSettings.PARTICLE_SIZE.MAX * star.size * 1.5 : currentSettings.PARTICLE_SIZE.MAX * star.size);

                    ctx.arc(star.x, star.y, currentStarSize, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${currentSettings.CONSTELLATION_COLOR}, ${currentStarOpacity})`;
                    ctx.fill();

                    if (isHighlighted || (isInTransition && isHighlighted)) {
                        const glowSize = currentStarSize * 2;
                        const gradient = ctx.createRadialGradient(
                            star.x, star.y, currentStarSize * 0.5,
                            star.x, star.y, glowSize
                        );

                        const glowOpacity = 0.5 * (isInTransition ? transitionProgress : 1.0);

                        gradient.addColorStop(0, `rgba(255, 215, 0, ${glowOpacity})`);
                        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

                        ctx.beginPath();
                        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
                        ctx.fillStyle = gradient;
                        ctx.fill();
                    }
                });
            }
        }

        class Particle {
            constructor(canvasW, canvasH, currentSettings) {
                this.x = Math.random() * canvasW;
                this.y = Math.random() * canvasH;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * (currentSettings.SPEED.MAX - currentSettings.SPEED.MIN) + currentSettings.SPEED.MIN;
                this.radius = Math.random() * (currentSettings.PARTICLE_SIZE.MAX - currentSettings.PARTICLE_SIZE.MIN) + currentSettings.PARTICLE_SIZE.MIN;
                this.opacity = currentSettings.PARTICLE_OPACITY;
                this.baseOpacity = currentSettings.PARTICLE_OPACITY;
            }

            updateDirection(currentSettings) {
                if (Math.random() < currentSettings.DIRECTION_CHANGE_FREQUENCY) {
                    this.angle += (Math.random() - 0.5) * Math.PI / 2;
                }
            }

            update(starFormation, isHighlighted, currentSettings, canvasW, canvasH) {
                this.updateDirection(currentSettings);

                const prevX = this.x;
                const prevY = this.y;

                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                if (this.x < 0) { this.x = 0; this.angle = Math.PI - this.angle; }
                if (this.x > canvasW) { this.x = canvasW; this.angle = Math.PI - this.angle; }
                if (this.y < 0) { this.y = 0; this.angle = -this.angle; }
                if (this.y > canvasH) { this.y = canvasH; this.angle = -this.angle; }

                const wouldOverlap = starFormation && starFormation.containsPoint(this.x, this.y, currentSettings);

                if (wouldOverlap) {
                    this.x = prevX;
                    this.y = prevY;
                    this.angle = this.angle + Math.PI + (Math.random() - 0.5) * 0.5;
                }
            }

            draw(ctx, currentSettings) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${currentSettings.PARTICLE_COLOR}, ${this.opacity})`;
                ctx.fill();
            }
        }

        const setCanvasSize = () => {
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;
            canvas.width = currentWidth;
            canvas.height = currentHeight;

            const currentSettings = getSettings(highlightMode, theme);

            starFormationRef.current = new Constellation(currentWidth, currentHeight);

            const newCount = calculateParticleCount(currentWidth, currentHeight);
            particlesRef.current = Array.from({ length: newCount }, () => new Particle(currentWidth, currentHeight, currentSettings));

            particlesRef.current = particlesRef.current.filter(particle =>
                !starFormationRef.current.containsPoint(particle.x, particle.y, currentSettings)
            );
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const animate = () => {
            const currentSettings = getSettings(highlightMode, theme);
            const currentWidth = canvas.width;
            const currentHeight = canvas.height;

            ctx.clearRect(0, 0, currentWidth, currentHeight);

            let currentTransitionProgress = 1.0;
            if (inTransitionRef.current) {
                const elapsed = Date.now() - transitionStartRef.current;
                currentTransitionProgress = Math.min(elapsed / currentSettings.TRANSITION_DURATION, 1);
                if (currentTransitionProgress >= 1) {
                    inTransitionRef.current = false;
                }
            }

            starFormationRef.current?.update(currentWidth, currentHeight, highlightMode, currentSettings);
            starFormationRef.current?.draw(ctx, highlightMode, currentSettings, currentTransitionProgress, inTransitionRef.current);

            particlesRef.current.forEach(particle => {
                particle.update(starFormationRef.current, highlightMode, currentSettings, currentWidth, currentHeight);
                particle.draw(ctx, currentSettings);
            });

            particlesRef.current.forEach((particle, i) => {
                particlesRef.current.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < currentSettings.CONNECTION_RADIUS) {
                        let drawConnection = true;

                        if (starFormationRef.current && (
                            starFormationRef.current.containsPoint(particle.x, particle.y, currentSettings) ||
                            starFormationRef.current.containsPoint(otherParticle.x, otherParticle.y, currentSettings)
                        )) {
                            drawConnection = false;
                        }

                        if (drawConnection) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            const lineOpacity = currentSettings.LINE_OPACITY * (1 - distance / currentSettings.CONNECTION_RADIUS);
                            ctx.strokeStyle = `rgba(${currentSettings.PARTICLE_COLOR}, ${lineOpacity})`;
                            ctx.stroke();
                        }
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', setCanvasSize);
            clearTimeout(highlightTimerRef.current);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme, highlightMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-screen"
            style={{ pointerEvents: 'none', zIndex: -10 }}
            aria-hidden="true"
        />
    );
};

export default ParticlesBackground;