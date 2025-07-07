// projects.js - Gestión y visualización de proyectos en el portafolio

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log("Script projects.js cargado correctamente");

    // Proyectos de ejemplo (en un proyecto real, esto podría venir de una API o CMS)
    const projects = [
        {
            id: 1,
            title: 'Proyecto Colibrí',
            category: 'design',
            image: './assets/images/proyectocolibri.png',
            tech: 'HTML / CSS / JavaScript / Canva',
            tags: ['HTML', 'CSS', 'JavaScript', 'Canva'],
            description: 'Proyecto colibrí es una iniciativa que busca unir fuerzas para combatir los problemas medioambientales.',
            demoLink: 'https://proyectocolibri.com.ar/'
        },
        {
            id: 2,
            title: 'Plataforma Educativa',
            category: 'web',
            image: './assets/images/plataformaeducativa.png',
            tech: 'HTML / PHP / CSS / JavaScript / SQL',
            tags: ['HTML', 'PHP', 'CSS', 'JavaScript', 'SQL'],
            description: 'Sistema LMS (Learning Management System) con cursos interactivos, evaluaciones y seguimiento de progreso del estudiante.',
            demoLink: 'https://thomiworks.com.ar/colegiosanjuan/dashboard/login.php',
        },
        {
            id: 3,
            title: 'Barrio Gestión',
            category: 'web',
            image: './assets/images/barriogestion.png',
            tech: 'HTML / JavaScript / CSS / PHP / SQL',
            tags: ['HTML', 'JavaScript', 'CSS', 'PHP', 'SQL'],
            description: 'Aplicación para gestión de finanzas personales con dashboards interactivos, seguimiento de gastos y planificación de metas.',
            demoLink: 'https://panchosrv.bringfeel.com.ar/tesis/'
        },
        {
            id: 4,
            title: 'EduControl',
            category: 'web',
            image: './assets/images/educontrol.png',
            tech: 'HTML / JavaScript / CSS / PHP / SQL',
            tags: ['HTML', 'JavaScript', 'CSS'],
            description: 'Una landing page para una aplicación que se encarga de administrar un colegio secundario. Controla las asistencias, notas, horarios, etc',
            demoLink: 'https://thomworks.github.io/ThomWorks/'
        },
        {
            id: 5,
            title: 'Travel+',
            category: 'web',
            image: './assets/images/travelplus.png',
            tech: 'HTML / JavaScript / CSS / PHP / SQL',
            tags: ['HTML', 'JavaScript', 'CSS'],
            description: 'Es una herramienta web que permite a los usuarios planificar y organizar sus viajes de manera sencilla y gratuita, sin necesidad de registro ni instalación de software.',
            demoLink: 'https://thomworks.github.io/Travel-/'
        },
    ];

    // Elementos DOM
    const projectsGrid = document.querySelector('.projects-grid');
    console.log("Elemento projects-grid encontrado:", projectsGrid);

    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log("Botones de filtro encontrados:", filterButtons.length);

    // Alternativa: añadir proyectos directamente al HTML como fallback
    function addFallbackProjects() {
        console.log("Intentando agregar proyectos como fallback");
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="project-card">
                    <div class="project-image">
                        <img src="./assets/images/proyectocolibri.png" alt="Proyecto Colibrí">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="https://proyectocolibri.com.ar/" target="_blank" title="Ver Demo">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3>Proyecto Colibrí</h3>
                        <div class="project-tech">HTML / CSS / JavaScript / Canva</div>
                        <div class="project-tags">
                            <span class="project-tag">HTML</span>
                            <span class="project-tag">CSS</span>
                            <span class="project-tag">JavaScript</span>
                            <span class="project-tag">Canva</span>
                        </div>
                        <p class="project-description">Proyecto colibrí es una iniciativa que busca unir fuerzas para combatir los problemas medioambientales.</p>
                        <a href="https://proyectocolibri.com.ar/" class="btn primary btn-sm">Ver detalles</a>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image">
                        <img src="./assets/images/plataformaeducativa.png" alt="Plataforma Educativa">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="https://thomiworks.com.ar/colegiosanjuan/dashboard/login.php" target="_blank" title="Ver Demo">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3>Plataforma Educativa</h3>
                        <div class="project-tech">HTML / PHP / CSS / JavaScript / SQL</div>
                        <div class="project-tags">
                            <span class="project-tag">HTML</span>
                            <span class="project-tag">PHP</span>
                            <span class="project-tag">CSS</span>
                            <span class="project-tag">JavaScript</span>
                            <span class="project-tag">SQL</span>
                        </div>
                        <p class="project-description">Sistema LMS (Learning Management System) con cursos interactivos, evaluaciones y seguimiento de progreso del estudiante.</p>
                        <a href="https://thomiworks.com.ar/colegiosanjuan/dashboard/login.php" class="btn primary btn-sm">Ver detalles</a>
                    </div>
                </div>
            `;
            console.log("Fallback aplicado.");
        } else {
            console.error("No se pudo aplicar el fallback - elemento projects-grid no encontrado");
        }
    }

    // Cargar los proyectos inmediatamente cuando se carga la página
    try {
        console.log("Intentando cargar proyectos...");
        loadProjects('all');
        setupFilters();
    } catch (error) {
        console.error("Error al cargar proyectos:", error);
        addFallbackProjects();
    }

    // Función para cargar proyectos según la categoría seleccionada
    function loadProjects(category) {
        console.log("Cargando proyectos de categoría:", category);
        
        // Verificar si el elemento existe
        if (!projectsGrid) {
            console.error("No se encontró el elemento .projects-grid");
            return;
        }
        
        // Limpiar contenedor
        projectsGrid.innerHTML = '';
        
        // Filtrar proyectos
        const filteredProjects = category === 'all' ? 
            projects : 
            projects.filter(project => project.category === category);
        
        console.log("Proyectos filtrados:", filteredProjects.length);
        
        // Verificar si hay proyectos
        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <p>No hay proyectos en esta categoría.</p>
                </div>
            `;
            return;
        }
        
        // Crear elementos de proyectos
        filteredProjects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card';
            projectElement.setAttribute('data-category', project.category);
            
            // Crear HTML del proyecto con la nueva estructura mejorada
            projectElement.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.demoLink}" target="_blank" title="Ver Demo">
                                <i class="fas fa-eye"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-tech">${project.tech}</div>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <p class="project-description">${project.description}</p>
                    <a href="${project.demoLink}" class="btn primary btn-sm">Ver detalles</a>
                </div>
            `;
            
            // Añadir a la grilla de proyectos
            projectsGrid.appendChild(projectElement);
            console.log(`Proyecto ${project.title} añadido`);
        });
        
        console.log("Proyectos cargados con éxito");
    }

    // Configurar botones de filtro
    function setupFilters() {
        if (!filterButtons.length) {
            console.error("No se encontraron los botones de filtro");
            return;
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log("Filtro seleccionado:", this.getAttribute('data-filter'));
                
                // Remover clase activa de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Añadir clase activa al botón seleccionado
                this.classList.add('active');
                
                // Obtener categoría seleccionada
                const category = this.getAttribute('data-filter');
                
                // Cargar proyectos filtrados
                loadProjects(category);
            });
        });
    }

    // Función para verificar si las imágenes existen
    function checkImages() {
        projects.forEach(project => {
            const img = new Image();
            img.onload = function() {
                console.log(`Imagen ${project.image} cargada correctamente`);
            };
            img.onerror = function() {
                console.error(`Error al cargar la imagen ${project.image}`);
            };
            img.src = project.image;
        });
    }

    // Verificar las imágenes
    checkImages();

    // Exportar funciones para uso externo
    window.projectsModule = {
        loadProjects,
        projects,
        addFallbackProjects
    };

    // Verificación final
    setTimeout(() => {
        if (projectsGrid && projectsGrid.children.length === 0) {
            console.log("No se detectaron proyectos después de 2 segundos, aplicando fallback...");
            addFallbackProjects();
        }
    }, 2000);
});