// Sistema de Filtrado Optimizado para Capacitaciones
class CourseFilter {
    constructor() {
        this.init();
    }

    init() {
        this.elements = {
            levelFilter: document.getElementById('level-filter'),
            modalityFilter: document.getElementById('modality-filter'),
            durationFilter: document.getElementById('duration-filter'),
            priceFilter: document.getElementById('price-filter'),
            applyFiltersBtn: document.getElementById('apply-filters'),
            clearFiltersBtn: document.getElementById('clear-filters'),
            activeFiltersContainer: document.getElementById('active-filters'),
            resultsCount: document.getElementById('results-count'),
            courseCards: document.querySelectorAll('.course-card')
        };

        this.currentFilters = {
            level: 'all',
            modality: 'all',
            duration: 'all',
            price: 'all'
        };

        this.bindEvents();
        this.initMobileMenu();
        this.applyFilters(); // Aplicar filtros iniciales
    }

    bindEvents() {
        // Aplicar filtros
        this.elements.applyFiltersBtn.addEventListener('click', () => this.applyFilters());

        // Limpiar filtros
        this.elements.clearFiltersBtn.addEventListener('click', () => this.clearFilters());

        // Aplicar filtros automáticamente al cambiar selección
        [
            this.elements.levelFilter,
            this.elements.modalityFilter,
            this.elements.durationFilter,
            this.elements.priceFilter
        ].forEach(select => {
            select.addEventListener('change', () => this.applyFilters());
        });

        // Paginación
        this.initPagination();
        
        // Cerrar menú al hacer clic fuera
        this.initClickOutside();
    }

    applyFilters() {
        this.updateCurrentFilters();
        const visibleCount = this.filterCourses();
        this.updateUI(visibleCount);
        this.showFeedback('apply');
    }

    updateCurrentFilters() {
        this.currentFilters = {
            level: this.elements.levelFilter.value,
            modality: this.elements.modalityFilter.value,
            duration: this.elements.durationFilter.value,
            price: this.elements.priceFilter.value
        };
    }

    filterCourses() {
        let visibleCount = 0;

        this.elements.courseCards.forEach(card => {
            const shouldShow = this.shouldDisplayCourse(card);
            
            if (shouldShow) {
                this.showCourseCard(card);
                visibleCount++;
            } else {
                this.hideCourseCard(card);
            }
        });

        return visibleCount;
    }

    shouldDisplayCourse(card) {
        const cardData = {
            level: card.dataset.level,
            modality: card.dataset.modality,
            duration: card.dataset.duration,
            price: card.dataset.price
        };

        return Object.entries(this.currentFilters).every(([key, value]) => 
            value === 'all' || cardData[key] === value
        );
    }

    showCourseCard(card) {
        card.classList.remove('fade-out', 'hidden');
        card.style.display = 'block';
        
        // Usar requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    hideCourseCard(card) {
        card.classList.add('fade-out');
        
        setTimeout(() => {
            card.classList.add('hidden');
            card.style.display = 'none';
        }, 300);
    }

    updateUI(visibleCount) {
        this.updateActiveFiltersDisplay();
        this.updateResultsCount(visibleCount);
    }

    updateActiveFiltersDisplay() {
        this.elements.activeFiltersContainer.innerHTML = '';

        Object.entries(this.currentFilters).forEach(([type, value]) => {
            if (value !== 'all') {
                const filterChip = this.createFilterChip(type, value);
                this.elements.activeFiltersContainer.appendChild(filterChip);
            }
        });

        this.attachRemoveFilterListeners();
    }

    createFilterChip(filterType, filterValue) {
        const chip = document.createElement('div');
        chip.className = 'active-filter';
        
        chip.innerHTML = `
            ${this.getFilterDisplayName(filterType, filterValue)}
            <button class="remove-filter" data-type="${filterType}" aria-label="Remover filtro">×</button>
        `;
        
        return chip;
    }

    getFilterDisplayName(filterType, filterValue) {
        const names = {
            level: { 
                basico: 'Básico', 
                intermedio: 'Intermedio', 
                avanzado: 'Avanzado' 
            },
            modality: { 
                presencial: 'Presencial', 
                virtual: 'Virtual', 
                hibrido: 'Híbrido' 
            },
            duration: { 
                corto: 'Corto', 
                medio: 'Medio', 
                largo: 'Largo' 
            },
            price: { 
                gratuito: 'Gratuito', 
                pago: 'De pago' 
            }
        };
        
        return names[filterType]?.[filterValue] || filterValue;
    }

    attachRemoveFilterListeners() {
        document.querySelectorAll('.remove-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.closest('.remove-filter').dataset.type;
                this.removeFilter(filterType);
            });
        });
    }

    removeFilter(filterType) {
        const select = this.elements[`${filterType}Filter`];
        if (select) {
            select.value = 'all';
            this.applyFilters();
        }
    }

    updateResultsCount(visibleCount) {
        const totalCards = this.elements.courseCards.length;
        
        this.elements.resultsCount.textContent = `Mostrando ${visibleCount} de ${totalCards} capacitaciones`;
        
        // Reiniciar animación
        this.elements.resultsCount.style.animation = 'none';
        setTimeout(() => {
            this.elements.resultsCount.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }

    clearFilters() {
        // Resetear todos los selects
        Object.keys(this.currentFilters).forEach(key => {
            const select = this.elements[`${key}Filter`];
            if (select) select.value = 'all';
        });

        this.applyFilters();
        this.showFeedback('clear');
    }

    showFeedback(type) {
        const btn = type === 'apply' ? this.elements.applyFiltersBtn : this.elements.clearFiltersBtn;
        const originalHTML = btn.innerHTML;
        const originalBg = btn.style.background;
        
        if (type === 'apply') {
            btn.innerHTML = '<i class="fas fa-check"></i> Aplicado';
            btn.style.background = '#27ae60';
        } else {
            btn.innerHTML = '<i class="fas fa-check"></i> Limpiado';
            btn.style.background = '#3498db';
        }
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = originalBg;
        }, 1500);
    }

    initPagination() {
        const pageBtns = document.querySelectorAll('.page-btn');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                pageBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                // Aquí iría la lógica de paginación real con AJAX
                console.log('Cambiando a página:', e.target.textContent);
            });
        });
    }

    initMobileMenu() {
        const navBtn = document.querySelector('.menu-btn');
        const navList = document.querySelector('.nav-list');
        const body = document.body;

        if (navBtn && navList) {
            navBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navList.classList.toggle("active");
                body.classList.toggle("no-scroll");
                
                // Crear overlay si no existe
                this.createOverlay();
            });

            // Cerrar menú al hacer clic en enlaces
            document.querySelectorAll('.nav-list a, .nav-list button').forEach(element => {
                element.addEventListener('click', () => {
                    navList.classList.remove("active");
                    body.classList.remove("no-scroll");
                    this.removeOverlay();
                });
            });
        }
    }

    createOverlay() {
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                this.closeMobileMenu();
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

    closeMobileMenu() {
        const navList = document.querySelector('.nav-list');
        const body = document.body;
        
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove("active");
            body.classList.remove("no-scroll");
            this.removeOverlay();
        }
    }

    initClickOutside() {
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            const navList = document.querySelector('.nav-list');
            const menuBtn = document.querySelector('.menu-btn');
            
            if (navList && navList.classList.contains('active') && 
                !navList.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CourseFilter();
});

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
    // Cerrar menú móvil si está abierto y se cambia a desktop
    if (window.innerWidth > 768) {
        const courseFilter = new CourseFilter();
        courseFilter.closeMobileMenu();
    }
});