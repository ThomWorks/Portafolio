// animations.js - Animaciones avanzadas para el portafolio

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Inicializar animaciones
    initTextAnimations();
    initScrollReveal();
    initParticles();
    initTypingEffect();
    addRevealClassToElements();

    // Animaciones de texto
    function initTextAnimations() {
        // Seleccionar elementos para animar
        const titleElements = document.querySelectorAll('h1, h2, h3:not(.timeline h3)');
        const paragraphElements = document.querySelectorAll('p:not(.timeline p)');
        const listElements = document.querySelectorAll('li');
        const badgeElements = document.querySelectorAll('.badge');
        
        // Aplicar clases de animación con retrasos escalonados
        titleElements.forEach((element, index) => {
            element.classList.add('slide-up');
            element.style.animationDelay = `${0.2 + (index * 0.1)}s`;
        });
        
        paragraphElements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.animationDelay = `${0.3 + (index * 0.05)}s`;
        });
        
        listElements.forEach((element, index) => {
            element.classList.add('slide-in-left');
            element.style.animationDelay = `${0.2 + (index * 0.05)}s`;
        });
        
        badgeElements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.animationDelay = `${0.1 + (index * 0.05)}s`;
        });
    }

    // Animación de aparición en scroll
    function initScrollReveal() {
        const options = {
            distance: '50px',
            duration: 1000,
            easing: 'ease',
            origin: 'bottom',
            scale: 1,
            viewFactor: 0.2,
        };
        
        // Revelar elementos con clases específicas
        function revealOnScroll() {
            const revealElements = document.querySelectorAll('.reveal:not(.active)');
            
            revealElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect();
                const elementTop = elementPosition.top;
                const elementHeight = elementPosition.height;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - (elementHeight / 4)) {
                    element.classList.add('active');
                    
                    // Aplicar efectos adicionales según el tipo de elemento
                    if (element.classList.contains('project-card')) {
                        element.style.transitionDelay = '0.2s';
                    }
                    
                    if (element.classList.contains('timeline-item')) {
                        element.style.transitionDelay = '0.3s';
                    }
                    
                    if (element.classList.contains('skill-item')) {
                        element.style.transitionDelay = '0.1s';
                    }
                }
            });
        }
        
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('resize', revealOnScroll);
        
        // Iniciar al cargar
        setTimeout(revealOnScroll, 100);
    }

    // Efecto de partículas para el fondo
    function initParticles() {
        // Solo añadiremos partículas en la sección hero
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Crear contenedor de partículas
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        heroSection.appendChild(particlesContainer);
        
        // Número de partículas
        const particleCount = 50;
        
        // Crear partículas
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
        
        // Función para crear una partícula
        function createParticle(container) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Propiedades aleatorias
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 10;
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Aplicar estilos
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animation = `float ${animationDuration}s infinite ease-in-out`;
            particle.style.opacity = opacity;
            particle.style.backgroundColor = '#7e57c2';
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.zIndex = '1';
            
            // Añadir al contenedor
            container.appendChild(particle);
        }
        
        // Añadir estilos CSS para la animación
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerHTML = `
            @keyframes float {
                0% { transform: translateY(0) translateX(0) rotate(0); }
                25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
                50% { transform: translateY(0) translateX(20px) rotate(180deg); }
                75% { transform: translateY(20px) translateX(10px) rotate(270deg); }
                100% { transform: translateY(0) translateX(0) rotate(360deg); }
            }
            
            .particles-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: 1;
            }
            
            .hero-section .container {
                position: relative;
                z-index: 2;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // Efecto de escritura para textos
    function initTypingEffect() {
        const typedElements = document.querySelectorAll('.typed-text');
        
        typedElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let charIndex = 0;
            const typingSpeed = 50; // ms por carácter
            
            function typeChar() {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, typingSpeed);
                } else {
                    element.classList.add('typed-complete');
                }
            }
            
            // Iniciar la animación cuando el elemento es visible
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeChar, 500);
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // Añadir clases de reveal a elementos para la animación en scroll
    function addRevealClassToElements() {
        // Añadir a las tarjetas de proyectos
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => card.classList.add('reveal'));
        
        // Añadir a las tarjetas de habilidades
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => item.classList.add('reveal'));
        
        // Añadir a los elementos de la línea de tiempo
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => item.classList.add('reveal'));
        
        // Añadir a las tarjetas de educación
        const eduCards = document.querySelectorAll('.edu-card');
        eduCards.forEach(card => card.classList.add('reveal'));
    }
    
    // Animación de números contando
    function initCounterAnimation() {
        const counterElements = document.querySelectorAll('.counter');
        
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // ms
            const framesPerSecond = 60;
            const frameDuration = 1000 / framesPerSecond;
            const totalFrames = duration / frameDuration;
            let frame = 0;
            let currentCount = 0;
            
            function updateCount() {
                frame++;
                const progress = frame / totalFrames;
                
                // Función de ease-out para un efecto más natural
                const easeOutQuad = t => t * (2 - t);
                
                currentCount = Math.floor(easeOutQuad(progress) * target);
                
                if (frame === totalFrames) {
                    currentCount = target;
                    counter.textContent = target;
                    return;
                }
                
                counter.textContent = currentCount;
                requestAnimationFrame(updateCount);
            }
            
            // Iniciar la animación cuando el elemento es visible
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(updateCount, 500);
                        observer.unobserve(counter);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
});