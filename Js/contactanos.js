// Funcionalidades para la página de Contacto
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar menú móvil
    initMobileMenu();
    
    // Inicializar FAQ acordeón
    initFAQ();
    
    // Inicializar formulario de contacto
    initContactForm();
    
    // Inicializar mapa interactivo
    initInteractiveMap();
    
    // Inicializar animaciones
    initAnimations();

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

    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Cerrar otros items abiertos
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar el item actual
                item.classList.toggle('active');
            });
        });
    }

    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validación básica
                if (validateForm()) {
                    // Simular envío
                    simulateFormSubmission();
                }
            });
            
            // Efectos de focus en los inputs
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (this.value === '') {
                        this.parentElement.classList.remove('focused');
                    }
                });
            });
        }
    }

    function initInteractiveMap() {
        // Verificar si el elemento del mapa existe
        const mapElement = document.getElementById('interactiveMap');
        if (!mapElement) {
            console.error('Elemento del mapa no encontrado');
            return;
        }

        // Estas coordenadas están en el área central de Atlautla
        const upaCoordinates = [19.03337676718483, -98.78830090393758];
        const zoomLevel = 15;
        
        try {
            // Inicializar el mapa
            const map = L.map('interactiveMap').setView(upaCoordinates, zoomLevel);
            
            // Capas de mapa
            const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            });
            
            const satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                attribution: '© Google Maps'
            });
            
            // Añadir capa por defecto
            streetLayer.addTo(map);
            
            // Marcador personalizado para la UPA
            const customIcon = L.divIcon({
                html: '<div class="custom-marker"><i class="fas fa-map-marker-alt"></i></div>',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
                className: 'custom-marker-container'
            });
            
            // Añadir marcador de la UPA
            const marker = L.marker(upaCoordinates, { icon: customIcon }).addTo(map);
            
            // Popup personalizado para la UPA
            marker.bindPopup(`
                <div class="custom-popup">
                    <h3>Universidad Politécnica de Altamira</h3>
                    <p><strong>Dirección:</strong> Av. de las Américas, Parque Industrial Altamira</p>
                    <p><strong>Teléfono:</strong> +52 (833) 260-1030</p>
                    <p><strong>Horario:</strong> Lunes - Viernes: 7:00 - 22:00</p>
                    <div style="margin-top: 10px;">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=22.3924,-97.9335" 
                           target="_blank" 
                           style="background: var(--secondary); color: white; padding: 5px 10px; border-radius: 3px; text-decoration: none;">
                            Cómo llegar
                        </a>
                    </div>
                </div>
            `);
            
            // Controles de vista del mapa
            const satelliteViewBtn = document.getElementById('satelliteView');
            const streetViewBtn = document.getElementById('streetView');
            
            let currentLayer = streetLayer;
            
            if (satelliteViewBtn && streetViewBtn) {
                satelliteViewBtn.addEventListener('click', function() {
                    map.removeLayer(currentLayer);
                    satelliteLayer.addTo(map);
                    currentLayer = satelliteLayer;
                    updateActiveButton(this, streetViewBtn);
                });
                
                streetViewBtn.addEventListener('click', function() {
                    map.removeLayer(currentLayer);
                    streetLayer.addTo(map);
                    currentLayer = streetLayer;
                    updateActiveButton(this, satelliteViewBtn);
                });
            }
            
            // Función para actualizar botones activos
            function updateActiveButton(activeBtn, inactiveBtn) {
                activeBtn.style.background = 'var(--secondary)';
                activeBtn.style.color = 'var(--white)';
                inactiveBtn.style.background = 'var(--white)';
                inactiveBtn.style.color = 'var(--primary)';
            }
            
            // Geolocalización del usuario
            if (navigator.geolocation) {
                const geolocationBtn = document.createElement('button');
                geolocationBtn.className = 'map-btn';
                geolocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Mi ubicación';
                geolocationBtn.style.marginBottom = '10px';
                
                geolocationBtn.addEventListener('click', function() {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const userCoords = [position.coords.latitude, position.coords.longitude];
                        
                        // Añadir marcador de ubicación del usuario
                        const userIcon = L.divIcon({
                            html: '<div class="custom-marker" style="background: #3498db;"><i class="fas fa-user"></i></div>',
                            iconSize: [30, 30],
                            iconAnchor: [15, 30],
                            className: 'user-marker-container'
                        });
                        
                        // Remover marcador anterior si existe
                        if (window.userMarker) {
                            map.removeLayer(window.userMarker);
                        }
                        
                        window.userMarker = L.marker(userCoords, { icon: userIcon })
                            .addTo(map)
                            .bindPopup('Tu ubicación actual')
                            .openPopup();
                        
                        // Añadir línea de ruta (simulada)
                        if (window.routeLine) {
                            map.removeLayer(window.routeLine);
                        }
                        
                        window.routeLine = L.polyline([userCoords, upaCoordinates], {
                            color: '#9F2241',
                            weight: 4,
                            opacity: 0.7,
                            dashArray: '10, 10'
                        }).addTo(map);
                        
                        // Ajustar vista para mostrar ambos puntos
                        const bounds = L.latLngBounds(userCoords, upaCoordinates);
                        map.fitBounds(bounds, { padding: [50, 50] });
                        
                    }, function(error) {
                        console.log('Error obteniendo la ubicación:', error);
                        alert('No se pudo obtener tu ubicación. Asegúrate de que la geolocalización esté activada.');
                    });
                });
                
                // Añadir botón de geolocalización a los controles
                const mapControls = document.querySelector('.map-controls');
                if (mapControls) {
                    mapControls.appendChild(geolocationBtn);
                }
            }
            
            // Controles de zoom personalizados
            const zoomControl = L.control.zoom({
                position: 'topright'
            });
            zoomControl.addTo(map);
            
            // Escala del mapa
            L.control.scale({
                imperial: false,
                metric: true
            }).addTo(map);
            
            // Ajustar el mapa al redimensionar la ventana
            window.addEventListener('resize', function() {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            });
            
            // Prevenir errores de carga de tiles
            map.on('tileerror', function(error) {
                console.warn('Error cargando tile:', error);
            });
            
            console.log('Mapa inicializado correctamente');
            
        } catch (error) {
            console.error('Error al inicializar el mapa:', error);
            // Mostrar mensaje de error en el contenedor del mapa
            mapElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #6c757d; flex-direction: column; gap: 10px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem;"></i>
                    <p>Error al cargar el mapa</p>
                    <button onclick="location.reload()" style="background: var(--secondary); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        Reintentar
                    </button>
                </div>
            `;
        }
    }

    function validateForm() {
        const requiredFields = document.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'Este campo es obligatorio');
                isValid = false;
            } else {
                clearError(field);
                
                // Validación específica por tipo de campo
                if (field.type === 'email') {
                    if (!isValidEmail(field.value)) {
                        showError(field, 'Ingresa un correo electrónico válido');
                        isValid = false;
                    }
                }
                
                if (field.id === 'phone' && field.value.trim() !== '') {
                    if (!isValidPhone(field.value)) {
                        showError(field, 'Ingresa un número de teléfono válido');
                        isValid = false;
                    }
                }
            }
        });
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        return phoneRegex.test(phone);
    }

    function showError(field, message) {
        clearError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        
        field.parentElement.appendChild(errorDiv);
        field.style.borderColor = '#e74c3c';
    }

    function clearError(field) {
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    function simulateFormSubmission() {
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular delay de envío
        setTimeout(() => {
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            
            // Resetear formulario
            document.getElementById('contactForm').reset();
            
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    function showNotification(message, type) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Botón de cerrar
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    function initAnimations() {
        // Animación al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Elementos a observar
        const animatedElements = document.querySelectorAll(
            '.info-card, .form-container, .faq-item'
        );

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Efecto hover mejorado para las tarjetas de información
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Añadir estilos CSS para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .faq-answer {
            transition: all 0.3s ease;
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        /* Estilos para los marcadores del mapa */
        .custom-marker {
            background: var(--secondary);
            border: 3px solid var(--white);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            color: white;
            font-size: 1rem;
        }
        
        .leaflet-popup-content-wrapper {
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .leaflet-popup-content {
            margin: 15px;
            font-size: 0.9rem;
            min-width: 200px;
        }
        
        .custom-popup h3 {
            margin: 0 0 10px 0;
            color: var(--primary);
            font-size: 1.1rem;
        }
        
        .custom-popup p {
            margin: 5px 0;
            line-height: 1.4;
        }
    `;
    document.head.appendChild(style);
});