// contactanos.js - VERSIÓN SIMPLIFICADA SIN VISTA CALLEJERA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando página Contáctanos...');
    
    // Variables globales para el mapa
    let map;
    let marker;
    
    // Inicializar FAQ
    initFAQ();
    
    // Inicializar formulario de contacto
    initContactForm();
    
    // Inicializar Google Maps
    initGoogleMap();
    
    // Inicializar animaciones
    initAnimations();
    
    // Inicializar efectos hover
    initHoverEffects();

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
                
                if (validateForm()) {
                    simulateFormSubmission();
                }
            });
            
            // Botón de limpiar formulario
            const resetBtn = contactForm.querySelector('button[type="reset"]');
            if (resetBtn) {
                resetBtn.addEventListener('click', function() {
                    setTimeout(() => {
                        clearAllErrors();
                    }, 100);
                });
            }
            
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

            // Validación en tiempo real
            initRealTimeValidation();
        }
    }

    function initGoogleMap() {
        const mapElement = document.getElementById('googleMap');
        
        if (!mapElement) {
            console.log('Elemento del mapa no encontrado');
            return;
        }

        // Esperar a que Google Maps esté cargado
        if (typeof google === 'undefined') {
            console.warn('Google Maps no está cargado. Reintentando...');
            setTimeout(initGoogleMap, 1000);
            return;
        }

        // Coordenadas de la Universidad Politécnica de Atlautla
        const upaCoordinates = { lat: 19.03337676718483, lng: -98.78830090393758 };
        
        // Opciones del mapa - SIMPLIFICADAS
        const mapOptions = {
            zoom: 16,
            center: upaCoordinates,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#f8f9fa" }]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#6c757d" }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{ "color": "#e9ecef" }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#e9ecef" }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#ffffff" }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#9F2241" }]
                }
            ]
        };

        // Crear el mapa
        map = new google.maps.Map(mapElement, mapOptions);

        // Marcador personalizado
        marker = new google.maps.Marker({
            position: upaCoordinates,
            map: map,
            title: 'Universidad Politécnica de Atlautla',
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDBDMTMuMzcgMCA4IDUuMzcgOCAxMkM4IDIwLjUgMjAgNDAgMjAgNDBDMjAgNDAgMzIgMjAuNSAzMiAxMkMzMiA1LjM3IDI2LjYzIDAgMjAgMFoiIGZpbGw9IiM5RjIyNDEiLz4KPHBhdGggZD0iTTIwIDZDMjIuMjEgNiAyNCA3Ljc5IDI0IDEwQzI0IDEyLjIxIDIyLjIxIDE0IDIwIDE0QzE3Ljc5IDE0IDE2IDEyLjIxIDE2IDEwQzE2IDcuNzkgMTcuNzkgNiAyMCA2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 40)
            }
        });

        // Ventana de información
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="min-width: 250px; padding: 15px;">
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 1.1rem;">Universidad Politécnica de Atlautla</h3>
                    <p style="margin: 5px 0; color: #7f8c8d; font-size: 0.9rem;">
                        <i class="fas fa-map-marker-alt"></i> 
                        Carretera Atlautla-Ozumba, Barrio San Jacinto
                    </p>
                    <p style="margin: 5px 0; color: #7f8c8d; font-size: 0.9rem;">
                        <i class="fas fa-phone"></i> 
                        (597) 97-3-39-86
                    </p>
                </div>
            `
        });

        // Abrir ventana automáticamente
        setTimeout(() => {
            infoWindow.open(map, marker);
        }, 2000);

        // Abrir ventana al hacer clic en el marcador
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        // Inicializar controles personalizados
        initMapControls();

        // Efecto de carga del mapa
        mapElement.style.opacity = '0';
        mapElement.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            mapElement.style.opacity = '1';
        }, 500);
    }

    function initMapControls() {
        // Botón de vista satélite
        const satelliteBtn = document.getElementById('satelliteView');
        if (satelliteBtn) {
            satelliteBtn.addEventListener('click', function() {
                toggleSatelliteView();
            });
        }

        console.log('Controles del mapa inicializados correctamente');
    }

    function toggleSatelliteView() {
        const currentMapType = map.getMapTypeId();
        const satelliteBtn = document.getElementById('satelliteView');
        
        if (currentMapType === google.maps.MapTypeId.HYBRID) {
            // Cambiar a vista de mapa normal
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            satelliteBtn.innerHTML = '<i class="fas fa-satellite"></i> Vista Satélite';
            showNotification('Vista de mapa activada', 'success');
        } else {
            // Cambiar a vista satélite
            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            satelliteBtn.innerHTML = '<i class="fas fa-map"></i> Vista Mapa';
            showNotification('Vista satélite activada', 'success');
        }
    }

    // ... (resto de funciones se mantienen igual)
    function validateForm() {
        const form = document.getElementById('contactForm');
        if (!form) return false;
        
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        // Limpiar errores previos
        clearAllErrors();
        
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
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    function showError(field, message) {
        clearError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        field.style.borderColor = '#e74c3c';
        field.parentNode.appendChild(errorDiv);
    }

    function clearError(field) {
        field.style.borderColor = '';
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    function clearAllErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
        formInputs.forEach(input => {
            input.style.borderColor = '';
        });
    }

    function simulateFormSubmission() {
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');
        
        // Simular envío al servidor
        setTimeout(() => {
            showNotification('¡Mensaje enviado con éxito! Te contactaremos en menos de 24 horas.', 'success');
            
            // Resetear formulario
            document.getElementById('contactForm').reset();
            
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
            
        }, 2000);
    }

    function showNotification(message, type) {
        // Remover notificaciones existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    function initAnimations() {
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
        const animatedElements = document.querySelectorAll('.info-card, .map-container, .form-container, .faq-item');
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    function initHoverEffects() {
        const contactCards = document.querySelectorAll('.info-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('animate-in')) {
                    this.style.transform = 'translateX(-20px)';
                } else {
                    this.style.transform = 'translateX(0)';
                }
            });
        });
    }

    function initRealTimeValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    clearError(this);
                    
                    if (this.type === 'email' && this.value.trim() !== '') {
                        if (!isValidEmail(this.value)) {
                            showError(this, 'Ingresa un correo electrónico válido');
                        } else {
                            clearError(this);
                        }
                    }
                    
                    if (this.id === 'phone' && this.value.trim() !== '') {
                        if (!isValidPhone(this.value)) {
                            showError(this, 'Ingresa un número de teléfono válido');
                        } else {
                            clearError(this);
                        }
                    }
                } else {
                    clearError(this);
                }
            });
        });
    }

    console.log('Página Contáctanos inicializada correctamente');
});