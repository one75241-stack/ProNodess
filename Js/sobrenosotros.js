// Animaciones para la página Sobre Nosotros
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar menú móvil
    initMobileMenu();
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
    
    // Inicializar contadores animados
    initCounters();

    function initMobileMenu() {
        const navBtn = document.querySelector('.menu-btn');
        const navList = document.querySelector('.nav-list');

        if (navBtn && navList) {
            navBtn.addEventListener('click', function(){
                navList.classList.toggle("active");
                document.body.classList.toggle("no-scroll");
            });

            document.querySelectorAll('.nav-list a').forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove("active");
                    document.body.classList.remove("no-scroll");
                });
            });
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
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
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