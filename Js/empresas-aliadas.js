// Funcionalidades para la página de Empresas Aliadas
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar menú móvil MEJORADO
    initMobileMenu();
    
    // Inicializar carrusel de logos
    initLogosCarousel();
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
    
    // Inicializar interactividad de las tarjetas
    initCardsInteractivity();
    
    // Inicializar contador de estadísticas
    initStatsCounter();

    function initMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const navList = document.querySelector('.nav-list');
        const body = document.body;

        if (menuBtn && navList) {
            menuBtn.addEventListener('click', function(e){
                e.stopPropagation();
                
                const isActive = navList.classList.contains("active");
                
                if (isActive) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            // Cerrar menú al hacer clic en enlaces
            document.querySelectorAll('.nav-list a, .nav-list button').forEach(element => {
                element.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', function(e) {
                if (navList.classList.contains("active") && 
                    !menuBtn.contains(e.target) && 
                    !navList.contains(e.target)) {
                    closeMobileMenu();
                }
            });

            // Cerrar menú con tecla ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navList.classList.contains("active")) {
                    closeMobileMenu();
                }
            });
        }

        function openMobileMenu() {
            navList.classList.add("active");
            body.classList.add("no-scroll");
            menuBtn.querySelector('i').classList.remove('fa-bars');
            menuBtn.querySelector('i').classList.add('fa-times');
            menuBtn.setAttribute('aria-expanded', 'true');
            createOverlay();
        }

        function closeMobileMenu() {
            navList.classList.remove("active");
            body.classList.remove("no-scroll");
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.setAttribute('aria-expanded', 'false');
            removeOverlay();
        }

        function createOverlay() {
            let overlay = document.querySelector('.nav-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'nav-overlay';
                document.body.appendChild(overlay);
                
                overlay.addEventListener('click', () => {
                    closeMobileMenu();
                });
            }
            overlay.classList.add('active');
        }

        function removeOverlay() {
            const overlay = document.querySelector('.nav-overlay');
            if (overlay) {
                overlay.classList.remove('active');
                setTimeout(() => {
                    if (overlay && !overlay.classList.contains('active')) {
                        overlay.remove();
                    }
                }, 300);
            }
        }
    }

    function initLogosCarousel() {
        const logosTrack = document.getElementById('logosTrack');
        if (!logosTrack) return;

        // Pausar animación al hacer hover
        logosTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        logosTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });

        // Click en logos para mostrar información
        const logoItems = document.querySelectorAll('.logo-item');
        logoItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const altText = img.alt;
                showCompanyInfo(altText);
            });
        });
        
        // Ajustar velocidad en móviles
        if (window.innerWidth <= 768) {
            logosTrack.style.animationDuration = '40s';
        }
        
        if (window.innerWidth <= 480) {
            logosTrack.style.animationDuration = '50s';
        }
    }

    function initScrollAnimations() {
        // Intersection Observer para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observar elementos que necesitan animación
        const animatedElements = document.querySelectorAll(
            '.stat-item, .category-card, .company-card, .benefit-item, .testimonial-card'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.transitionDelay = `${index * 0.1}s`;
            
            observer.observe(el);
        });
    }

    function initCardsInteractivity() {
        // Efectos hover para tarjetas de categorías
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Efectos para tarjetas de empresas
        const companyCards = document.querySelectorAll('.company-card');
        companyCards.forEach(card => {
            const link = card.querySelector('.company-link');
            
            card.addEventListener('mouseenter', function() {
                link.style.background = 'var(--secondary)';
                link.style.color = 'var(--white)';
            });
            
            card.addEventListener('mouseleave', function() {
                link.style.background = 'var(--light-gray)';
                link.style.color = 'var(--primary)';
            });
        });

        // Efectos para tarjetas de beneficios
        const benefitCards = document.querySelectorAll('.benefit-item');
        benefitCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.benefit-icon');
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.benefit-icon');
                icon.style.transform = 'scale(1) rotate(0)';
            });
        });
    }

    function initStatsCounter() {
        const statItems = document.querySelectorAll('.stat-item h3');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetValue = parseInt(statElement.textContent);
                    animateCounter(statElement, targetValue);
                    statsObserver.unobserve(statElement);
                }
            });
        }, observerOptions);

        statItems.forEach(stat => statsObserver.observe(stat));

        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + (target === 85 ? '%' : '+');
            }, 30);
        }
    }

    function showCompanyInfo(companyName) {
        // Crear modal de información de la empresa
        const existingModal = document.querySelector('.company-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'company-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                transform: scale(0.8);
                animation: scaleIn 0.3s ease 0.1s forwards;
            ">
                <h3 style="color: var(--primary); margin-bottom: 15px;">${companyName}</h3>
                <p style="color: var(--medium-gray); margin-bottom: 20px;">
                    Información detallada de ${companyName} estará disponible próximamente.
                </p>
                <button class="btn btn-primary" onclick="this.closest('.company-modal').remove()">
                    Cerrar
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeModal);
            }
        });
    }

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
    // Cerrar menú móvil si está abierto y se cambia a desktop
    if (window.innerWidth > 768) {
        const navList = document.querySelector('.nav-list');
        const menuBtn = document.querySelector('.menu-btn');
        const body = document.body;
        
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove("active");
            body.classList.remove("no-scroll");
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.setAttribute('aria-expanded', 'false');
            
            // Remover overlay
            const overlay = document.querySelector('.nav-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    }
});

// Función global para filtrar empresas por categoría
function filterCompanies(category) {
    console.log(`Filtrando empresas por categoría: ${category}`);
    
    // Mostrar notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = `Mostrando empresas de: ${category}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}