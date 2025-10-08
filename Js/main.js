// Funcionalidades para la página principal
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar menú móvil MEJORADO
    initMobileMenu();
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
    
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

// Funciones globales para redirección
function redirectTo(page) {
    window.location.href = page;
}

// Función para el botón "Conoce más"
document.addEventListener('DOMContentLoaded', function() {
    const knowMoreBtn = document.querySelector('.btn-primary');
    if (knowMoreBtn && knowMoreBtn.textContent.includes('Conoce más')) {
        knowMoreBtn.addEventListener('click', function() {
            window.location.href = 'sobrenosotros.html';
        });
    }
});