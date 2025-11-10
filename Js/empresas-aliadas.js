// empresas-aliadas.js - Funcionalidades específicas para empresas aliadas
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando página de empresas aliadas...');
    
    // Inicializar carrusel de logos
    initLogosCarousel();
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
    
    // Inicializar interactividad de las tarjetas
    initCardsInteractivity();
    
    // Inicializar contador de estadísticas
    initStatsCounter();

    function initLogosCarousel() {
        const logosTrack = document.getElementById('logosTrack');
        if (!logosTrack) return;

        console.log('Inicializando carrusel de logos...');

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
                if (link) {
                    link.style.background = 'var(--secondary)';
                    link.style.color = 'var(--white)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (link) {
                    link.style.background = 'var(--light-gray)';
                    link.style.color = 'var(--primary)';
                }
            });
        });

        // Efectos para tarjetas de beneficios
        const benefitCards = document.querySelectorAll('.benefit-item');
        benefitCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.benefit-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.benefit-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0)';
                }
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

        statItems.forEach(stat => {
            if (stat.textContent) {
                statsObserver.observe(stat);
            }
        });

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
        console.log('Mostrando información de:', companyName);
        
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
        const closeModal = function(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeModal);
            }
        };
        document.addEventListener('keydown', closeModal);
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

    console.log('Página de empresas aliadas inicializada correctamente');
});

// Función global para filtrar empresas por categoría
function filterCompanies(category) {
    console.log(`Filtrando empresas por categoría: ${category}`);
    
    // Mostrar notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `Mostrando empresas de: ${category}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
    const logosTrack = document.getElementById('logosTrack');
    if (logosTrack) {
        if (window.innerWidth <= 768) {
            logosTrack.style.animationDuration = '40s';
        } else if (window.innerWidth <= 480) {
            logosTrack.style.animationDuration = '50s';
        } else {
            logosTrack.style.animationDuration = '30s';
        }
    }
});