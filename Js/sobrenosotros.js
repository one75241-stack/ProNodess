// sobrenosotros.js - Funcionalidades específicas para Sobre Nosotros
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando página Sobre Nosotros...');
    
    // Inicializar contadores animados
    initCounters();
    
    // Inicializar efectos hover mejorados
    initHoverEffects();

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

        statItems.forEach(stat => {
            if (stat.textContent) {
                observer.observe(stat);
            }
        });
    }

    function animateCounter(element) {
        const targetText = element.textContent;
        const isPercentage = targetText.includes('%');
        const target = parseInt(targetText);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (isPercentage ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
            }
        }, 16);
    }

    function initHoverEffects() {
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

        // Efecto hover para stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(stat => {
            stat.addEventListener('mouseenter', function() {
                const number = this.querySelector('h3');
                if (number) {
                    number.style.transform = 'scale(1.1)';
                }
            });
            
            stat.addEventListener('mouseleave', function() {
                const number = this.querySelector('h3');
                if (number) {
                    number.style.transform = 'scale(1)';
                }
            });
        });
    }

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

    console.log('Página Sobre Nosotros inicializada correctamente');
});