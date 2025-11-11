// main.js - Menú Hamburguesa para TODAS las páginas
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        this.menuBtn = document.querySelector('.menu-btn');
        this.navList = document.querySelector('.nav-list');
        this.body = document.body;
        
        if (this.menuBtn && this.navList) {
            this.bindEvents();
        }
    }

    bindEvents() {
        // Evento para abrir/cerrar menú
        this.menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Cerrar menú al hacer clic en enlaces
        document.querySelectorAll('.nav-list a, .nav-list .btn').forEach(element => {
            element.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.navList.classList.contains('active') && 
                !this.navList.contains(e.target) && 
                !this.menuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Cerrar menú con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navList.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const isOpening = !this.navList.classList.contains('active');
        
        if (isOpening) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
    }

    openMenu() {
        this.navList.classList.add('active');
        this.menuBtn.setAttribute('aria-expanded', 'true');
        this.body.classList.add('no-scroll');
        this.createOverlay();
        
        // Cambiar ícono
        const icon = this.menuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    }

    closeMenu() {
        this.navList.classList.remove('active');
        this.menuBtn.setAttribute('aria-expanded', 'false');
        this.body.classList.remove('no-scroll');
        this.removeOverlay();
        
        // Cambiar ícono
        const icon = this.menuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    createOverlay() {
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }
        overlay.classList.add('active');
    }

    removeOverlay() {
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

// Funcionalidades específicas para la página principal
function initPageSpecificFeatures() {
    // Solo ejecutar en la página principal (index.html)
    if (!document.getElementById('level-filter')) {
        initScrollAnimations();
        initStatsCounter();
        initKnowMoreButton();
    }
}

function initScrollAnimations() {
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
    
    const animatedElements = document.querySelectorAll(
        '.service, .stat, .about-content, .about-image, .section-title'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(el);
    });
}

function initStatsCounter() {
    const statItems = document.querySelectorAll('.stat h2');
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
            element.textContent = Math.floor(current) + (target === 95 ? '%' : '+');
        }, 30);
    }
}

function initKnowMoreButton() {
    const knowMoreBtn = document.querySelector('.btn-primary');
    if (knowMoreBtn && knowMoreBtn.textContent.includes('Conoce más')) {
        knowMoreBtn.addEventListener('click', function() {
            window.location.href = 'sobrenosotros.html';
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    initPageSpecificFeatures();
});

// Cerrar menú al redimensionar si se cambia a desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navList = document.querySelector('.nav-list');
        const body = document.body;
        const menuBtn = document.querySelector('.menu-btn');
        
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            body.classList.remove('no-scroll');
            if (menuBtn) {
                menuBtn.setAttribute('aria-expanded', 'false');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Remover overlay
            const overlay = document.querySelector('.nav-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    }
});