// capacitaciones.js - Sistema de Filtrado CORREGIDO
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando sistema de filtros...');
    
    // Elementos
    const levelFilter = document.getElementById('level-filter');
    const modalityFilter = document.getElementById('modality-filter');
    const durationFilter = document.getElementById('duration-filter');
    const priceFilter = document.getElementById('price-filter');
    const applyBtn = document.getElementById('apply-filters');
    const clearBtn = document.getElementById('clear-filters');
    const resultsCount = document.getElementById('results-count');
    const courseCards = document.querySelectorAll('.course-card');
    const activeFiltersContainer = document.getElementById('active-filters');
    
    // Verificar que todos los elementos existen
    if (!levelFilter || !courseCards.length) {
        console.log('No es página de capacitaciones o elementos no encontrados');
        return;
    }
    
    console.log('Elementos encontrados:', courseCards.length, 'cursos');
    
    // Función para aplicar filtros
    function applyFilters() {
        console.log('Aplicando filtros...');
        
        const filters = {
            level: levelFilter.value,
            modality: modalityFilter.value,
            duration: durationFilter.value,
            price: priceFilter.value
        };
        
        console.log('Filtros activos:', filters);
        
        let visibleCount = 0;
        
        courseCards.forEach(card => {
            const cardData = {
                level: card.dataset.level,
                modality: card.dataset.modality,
                duration: card.dataset.duration,
                price: card.dataset.price
            };
            
            console.log('Datos del curso:', cardData);
            
            const shouldShow = 
                (filters.level === 'all' || cardData.level === filters.level) &&
                (filters.modality === 'all' || cardData.modality === filters.modality) &&
                (filters.duration === 'all' || cardData.duration === filters.duration) &&
                (filters.price === 'all' || cardData.price === filters.price);
            
            console.log('Mostrar curso:', shouldShow);
            
            if (shouldShow) {
                card.style.display = 'block';
                card.classList.remove('hidden', 'fade-out');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.classList.add('fade-out');
                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }, 300);
            }
        });
        
        // Actualizar contador
        if (resultsCount) {
            resultsCount.textContent = `Mostrando ${visibleCount} de ${courseCards.length} capacitaciones`;
            resultsCount.style.animation = 'none';
            setTimeout(() => {
                resultsCount.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        }
        
        // Actualizar filtros activos
        updateActiveFiltersDisplay(filters);
        
        console.log('Filtros aplicados. Visibles:', visibleCount);
    }
    
    // Función para actualizar filtros activos
    function updateActiveFiltersDisplay(filters) {
        if (!activeFiltersContainer) return;
        
        activeFiltersContainer.innerHTML = '';
        
        Object.entries(filters).forEach(([type, value]) => {
            if (value !== 'all') {
                const filterChip = createFilterChip(type, value);
                activeFiltersContainer.appendChild(filterChip);
            }
        });
        
        attachRemoveFilterListeners();
    }
    
    // Crear chip de filtro activo
    function createFilterChip(filterType, filterValue) {
        const chip = document.createElement('div');
        chip.className = 'active-filter';
        
        chip.innerHTML = `
            ${getFilterDisplayName(filterType, filterValue)}
            <button class="remove-filter" data-type="${filterType}" aria-label="Remover filtro">×</button>
        `;
        
        return chip;
    }
    
    // Obtener nombre display del filtro
    function getFilterDisplayName(filterType, filterValue) {
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
    
    // Attach event listeners para remover filtros
    function attachRemoveFilterListeners() {
        document.querySelectorAll('.remove-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.closest('.remove-filter').dataset.type;
                removeFilter(filterType);
            });
        });
    }
    
    // Remover filtro específico
    function removeFilter(filterType) {
        console.log('Removiendo filtro:', filterType);
        const select = document.getElementById(`${filterType}-filter`);
        if (select) {
            select.value = 'all';
            applyFilters();
        }
    }
    
    // Función para limpiar todos los filtros
    function clearFilters() {
        console.log('Limpiando filtros...');
        
        levelFilter.value = 'all';
        modalityFilter.value = 'all';
        durationFilter.value = 'all';
        priceFilter.value = 'all';
        
        applyFilters();
        
        // Feedback visual
        if (clearBtn) {
            const originalHTML = clearBtn.innerHTML;
            const originalBg = clearBtn.style.background;
            
            clearBtn.innerHTML = '<i class="fas fa-check"></i> Limpiado';
            clearBtn.style.background = '#3498db';
            
            setTimeout(() => {
                clearBtn.innerHTML = originalHTML;
                clearBtn.style.background = originalBg;
            }, 1500);
        }
    }
    
    // Feedback visual para aplicar filtros
    function showApplyFeedback() {
        if (applyBtn) {
            const originalHTML = applyBtn.innerHTML;
            const originalBg = applyBtn.style.background;
            
            applyBtn.innerHTML = '<i class="fas fa-check"></i> Aplicado';
            applyBtn.style.background = '#27ae60';
            
            setTimeout(() => {
                applyBtn.innerHTML = originalHTML;
                applyBtn.style.background = originalBg;
            }, 1500);
        }
    }
    
    // Inicializar paginación
    function initPagination() {
        const pageBtns = document.querySelectorAll('.page-btn');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                pageBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                console.log('Cambiando a página:', e.target.textContent);
            });
        });
    }
    
    // Event listeners
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyFilters();
            showApplyFeedback();
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
    
    // Aplicar filtros automáticamente al cambiar selects
    [levelFilter, modalityFilter, durationFilter, priceFilter].forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    // Inicializar paginación
    initPagination();
    
    // Aplicar filtros iniciales
    applyFilters();
    console.log('Sistema de filtros inicializado correctamente');
});