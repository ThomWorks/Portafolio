// main.js - Funcionalidad principal del portafolio

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Elementos DOM
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('nav ul');
    const sections = document.querySelectorAll('section');
    const progressBar = document.querySelector('.progress-bar');
    const skillBars = document.querySelectorAll('.skill-bar .progress');
    const languageBars = document.querySelectorAll('.progress-container .progress-bar');
    const formGroups = document.querySelectorAll('.form-group');
    const contactForm = document.getElementById('contactForm');
    const cursor = document.querySelector('.cursor');

    // Inicializar cursor personalizado
    initCustomCursor();

    // Inicializar barra de progreso de scroll
    initScrollProgressBar();

    // Inicializar animación al desplazarse
    initScrollAnimation();

    // Inicializar navegación
    initNavigation();

    // Inicializar formulario
    initForm();

    // Inicializar efecto parallax
    initParallax();

    // Funciones de inicialización
    function initCustomCursor() {
        if (!cursor) return;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Efecto hover en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-toggle, .project-card, .skill-item, .filter-btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'rgba(126, 87, 194, 0.1)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'rgba(126, 87, 194, 0.3)';
            });
        });
    }

    function initScrollProgressBar() {
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const fullHeight = document.body.clientHeight - windowHeight;
            const scrolled = window.scrollY;
            const percentScrolled = (scrolled / fullHeight) * 100;
            
            progressBar.style.width = `${percentScrolled}%`;
            
            // También ajustar posición del header al hacer scroll
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    function initScrollAnimation() {
        // Animación de aparición en scroll
        const revealElements = document.querySelectorAll('.reveal');
        
        const reveal = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', reveal);
        reveal(); // Llamar al cargar la página
        
        // Animar barras de progreso cuando son visibles
        const animateSkills = () => {
            const skillsSection = document.querySelector('.skills-section');
            if (!skillsSection) return;
            
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                skillBars.forEach(bar => {
                    const parentWidth = bar.parentElement.offsetWidth;
                    const targetWidth = bar.getAttribute('style') ? 
                                       bar.getAttribute('style').replace('width: ', '').replace('%;', '') : '0';
                    
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                });
                
                languageBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    let width = '0%';
                    
                    if (level === 'B1') {
                        width = '60%';
                    } else if (level === 'Nativo') {
                        width = '100%';
                    }
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        };
        
        window.addEventListener('scroll', animateSkills);
        animateSkills(); // Llamar al cargar la página
    }

    function initNavigation() {
        // Cambiar estilo del header al hacer scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Active link al hacer scroll
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
        
        // Menú móvil toggle
        if (navToggle) {
            const nav = document.querySelector('nav');
            const authButtons = document.querySelector('.auth-buttons');
            
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                nav.classList.toggle('active');
                authButtons.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
            
            // Cerrar menú al hacer clic en un enlace
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    nav.classList.remove('active');
                    authButtons.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            });
        }
        
        // Scroll suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function initForm() {
        // Efecto de focus en los campos del formulario
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            
            if (input) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (input.value === '') {
                        group.classList.remove('focused');
                    }
                });
                
                // Verificar si el campo ya tiene valor al cargar
                if (input.value !== '') {
                    group.classList.add('focused');
                }
            }
        });
        
        // Manejar envío del formulario
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Aquí se añadiría la lógica para enviar el formulario
                // Por ahora, simulamos el envío
                this.reset();
                
                // Mostrar mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                    <p>Mensaje enviado con éxito. ¡Me pondré en contacto pronto!</p>
                `;
                
                this.appendChild(successMessage);
                
                // Remover el mensaje después de unos segundos
                setTimeout(() => {
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 3000);
            });
        }
    }

    function initParallax() {
        // Efecto parallax en secciones
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            parallaxElements.forEach(element => {
                const strength = element.getAttribute('data-strength') || 20;
                const moveX = mouseX * strength;
                const moveY = mouseY * strength;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
});
