// Animaciones para la página Sobre Nosotros
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar menú móvil MEJORADO
    initMobileMenu();
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
    
    // Inicializar contadores animados
    initCounters();

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
        // Observador para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animación específica para las tarjetas de valores
                    if (entry.target.classList.contains('value-card')) {
                        entry.target.style.transitionDelay = '0.1s';
                    }
                    
                    // Animación específica para los miembros del equipo
                    if (entry.target.classList.contains('team-member')) {
                        entry.target.style.transitionDelay = '0.2s';
                    }
                }
            });
        }, observerOptions);

        // Elementos a observar
        const animatedElements = document.querySelectorAll(
            '.intro-content, .timeline-item, .mv-card, .value-card, .team-member'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    function initCounters() {
        const statItems = document.querySelectorAll('.stat-item h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statItems.forEach(stat => observer.observe(stat));
    }

    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // Efecto hover mejorado para las tarjetas
    const cards = document.querySelectorAll('.mv-card, .value-card, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
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