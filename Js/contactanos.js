// Funcionalidades para la página de Contacto
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initFAQ();
    initContactForm();
    initGoogleMap();
    initAnimations();
    initContactCards();
    initRealTimeValidation();

    function initMobileMenu() {
        const navBtn = document.querySelector('.menu-btn');
        const navList = document.querySelector('.nav-list');

        if (navBtn && navList) {
            navBtn.addEventListener('click', function(e){
                e.stopPropagation();
                navList.classList.toggle("active");
                document.body.classList.toggle("no-scroll");
            });

            // Cerrar menú al hacer clic en enlaces
            document.querySelectorAll('.nav-list a').forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove("active");
                    document.body.classList.remove("no-scroll");
                });
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', function(e) {
                if (!navBtn.contains(e.target) && !navList.contains(e.target)) {
                    navList.classList.remove("active");
                    document.body.classList.remove("no-scroll");
                }
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
                        // Remover clases focused
                        const formGroups = contactForm.querySelectorAll('.form-group');
                        formGroups.forEach(group => group.classList.remove('focused'));
                    }, 100);
                });
            }
            
            // Efectos de focus en los inputs
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Establecer estado inicial basado en el valor
                if (input.value !== '') {
                    input.parentElement.classList.add('focused');
                }
                
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

    function initGoogleMap() {
        const mapElement = document.getElementById('googleMap');
        if (!mapElement) return;

        // Esperar a que Google Maps esté cargado
        if (typeof google === 'undefined') {
            console.warn('Google Maps no está cargado. Reintentando...');
            setTimeout(initGoogleMap, 1000);
            return;
        }

        // Coordenadas de la Universidad Politécnica de Atlautla
        const upaCoordinates = { lat: 19.03337676718483, lng: -98.78830090393758 };
        
        // Nuevo diseño más moderno para el mapa
        const mapOptions = {
            zoom: 16,
            center: upaCoordinates,
            mapTypeControl: false,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
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
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{ "color": "#f8f9fa" }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{ "color": "#e9ecef" }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{ "color": "#ced4da" }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#e9ecef" }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#dfe6e9" }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#9e9e9e" }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#c8e6c9" }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#ffffff" }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{ "color": "#dee2e6" }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#f8f9fa" }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{ "color": "#ced4da" }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#9F2241" }]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#6c757d" }]
                }
            ]
        };

        // Crear el mapa
        const map = new google.maps.Map(mapElement, mapOptions);

        // Marcador personalizado más moderno
        const marker = new google.maps.Marker({
            position: upaCoordinates,
            map: map,
            title: 'Universidad Politécnica de Atlautla',
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="50" height="60" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#9F2241;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#7a1a33;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.3"/>
                            </filter>
                        </defs>
                        <g filter="url(#shadow)">
                            <path d="M25 0 C30 0, 45 15, 45 25 C45 35, 25 60, 25 60 C25 60, 5 35, 5 25 C5 15, 20 0, 25 0 Z" fill="url(#grad)"/>
                            <circle cx="25" cy="25" r="12" fill="white" opacity="0.9"/>
                            <text x="25" y="30" text-anchor="middle" fill="#9F2241" font-family="Arial" font-weight="bold" font-size="14">UPA</text>
                        </g>
                    </svg>
                `),
                scaledSize: new google.maps.Size(50, 60),
                anchor: new google.maps.Point(25, 60)
            }
        });

        // Ventana de información mejorada
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="custom-info-window" style="
                    min-width: 280px;
                    padding: 0;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                ">
                    <div style="
                        background: linear-gradient(135deg, #9F2241, #7a1a33);
                        padding: 20px;
                        color: white;
                    ">
                        <h3 style="margin: 0 0 10px 0; font-size: 1.3rem;">Universidad Politécnica de Atlautla</h3>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                            <i class="fas fa-map-marker-alt" style="font-size: 12px;"></i>
                            <span style="font-size: 0.9rem;">Manzana 002, Zona Conurbada, Atlautla</span>
                        </div>
                    </div>
                    <div style="padding: 20px; background: white;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                            <div style="width: 40px; height: 40px; background: #f8f9fa; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-phone" style="color: #9F2241;"></i>
                            </div>
                            <div>
                                <strong style="color: #495057;">Teléfono</strong>
                                <p style="margin: 5px 0; color: #6c757d;">+52 (833) 260-1030</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                            <div style="width: 40px; height: 40px; background: #f8f9fa; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-clock" style="color: #9F2241;"></i>
                            </div>
                            <div>
                                <strong style="color: #495057;">Horario</strong>
                                <p style="margin: 5px 0; color: #6c757d;">Lun-Vie: 7:00 - 22:00</p>
                            </div>
                        </div>
                        <a href="https://maps.app.goo.gl/J6VZHhG3LbJKSdTC6" target="_blank" 
                           style="display: block; text-align: center; background: #9F2241; color: white; padding: 12px; 
                                  border-radius: 6px; text-decoration: none; font-weight: 600; transition: background 0.3s;">
                            <i class="fas fa-directions"></i> Cómo llegar
                        </a>
                    </div>
                </div>
            `
        });

        // Efectos de interacción con el marcador
        marker.addListener('mouseover', () => {
            marker.setIcon({
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="55" height="65" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradHover" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#b3264d;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#8c1f3c;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadowHover" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000" flood-opacity="0.4"/>
                            </filter>
                        </defs>
                        <g filter="url(#shadowHover)">
                            <path d="M27.5 0 C33 0, 49 16, 49 27.5 C49 39, 27.5 65, 27.5 65 C27.5 65, 6 39, 6 27.5 C6 16, 22 0, 27.5 0 Z" fill="url(#gradHover)"/>
                            <circle cx="27.5" cy="27.5" r="13" fill="white" opacity="0.9"/>
                            <text x="27.5" y="32" text-anchor="middle" fill="#b3264d" font-family="Arial" font-weight="bold" font-size="15">UPA</text>
                        </g>
                    </svg>
                `),
                scaledSize: new google.maps.Size(55, 65),
                anchor: new google.maps.Point(27.5, 65)
            });
        });

        marker.addListener('mouseout', () => {
            marker.setIcon({
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="50" height="60" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#9F2241;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#7a1a33;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.3"/>
                            </filter>
                        </defs>
                        <g filter="url(#shadow)">
                            <path d="M25 0 C30 0, 45 15, 45 25 C45 35, 25 60, 25 60 C25 60, 5 35, 5 25 C5 15, 20 0, 25 0 Z" fill="url(#grad)"/>
                            <circle cx="25" cy="25" r="12" fill="white" opacity="0.9"/>
                            <text x="25" y="30" text-anchor="middle" fill="#9F2241" font-family="Arial" font-weight="bold" font-size="14">UPA</text>
                        </g>
                    </svg>
                `),
                scaledSize: new google.maps.Size(50, 60),
                anchor: new google.maps.Point(25, 60)
            });
        });

        // Abrir ventana de información al hacer clic
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 1500);
        });

        // Abrir ventana automáticamente después de 2 segundos
        setTimeout(() => {
            infoWindow.open(map, marker);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 1500);
        }, 2000);

        // Crear botones de control del mapa
        function createMapControl(icon, text, onClick, isActive = false) {
            const button = document.createElement('button');
            button.className = `map-control-btn ${isActive ? 'active' : ''}`;
            button.innerHTML = `<i class="fas ${icon}"></i> ${text}`;
            
            button.addEventListener('click', onClick);
            return button;
        }

        // Panel de controles
        const mapControls = document.querySelector('.map-controls');
        if (mapControls) {
            // Limpiar controles existentes
            mapControls.innerHTML = '';

            // Botón Vista Satélite
            const satelliteBtn = createMapControl('fa-satellite', 'Satélite', () => {
                map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                satelliteBtn.classList.add('active');
                mapBtn.classList.remove('active');
            });

            // Botón Vista Mapa
            const mapBtn = createMapControl('fa-road', 'Mapa', () => {
                map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                mapBtn.classList.add('active');
                satelliteBtn.classList.remove('active');
            }, true);

            // Botón Cómo Llegar
            const directionsBtn = createMapControl('fa-directions', 'Cómo Llegar', () => {
                window.open('https://maps.app.goo.gl/J6VZHhG3LbJKSdTC6', '_blank');
            });

            // Botón Mi Ubicación (solo si está disponible)
            if (navigator.geolocation) {
                const locationBtn = createMapControl('fa-location-arrow', 'Mi Ubicación', function() {
                    const originalHtml = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
                    this.disabled = true;
                    
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const userCoords = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        
                        // Marcador de ubicación del usuario
                        const userMarker = new google.maps.Marker({
                            position: userCoords,
                            map: map,
                            title: 'Tu ubicación actual',
                            icon: {
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="userGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:#2980b9;stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M20 0 C25 0, 35 10, 35 20 C35 30, 20 50, 20 50 C20 50, 5 30, 5 20 C5 10, 15 0, 20 0 Z" fill="url(#userGrad)"/>
                                        <circle cx="20" cy="20" r="8" fill="white"/>
                                        <circle cx="20" cy="20" r="4" fill="#3498db"/>
                                    </svg>
                                `),
                                scaledSize: new google.maps.Size(40, 50),
                                anchor: new google.maps.Point(20, 50)
                            }
                        });
                        
                        // Línea de ruta
                        const routeLine = new google.maps.Polyline({
                            path: [userCoords, upaCoordinates],
                            geodesic: true,
                            strokeColor: '#9F2241',
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                            strokeDashArray: [5, 5]
                        });
                        
                        routeLine.setMap(map);
                        
                        // Ajustar vista
                        const bounds = new google.maps.LatLngBounds();
                        bounds.extend(userCoords);
                        bounds.extend(upaCoordinates);
                        map.fitBounds(bounds, { padding: 100 });
                        
                        // Restaurar botón
                        locationBtn.innerHTML = originalHtml;
                        locationBtn.disabled = false;
                        
                    }, function(error) {
                        console.log('Error obteniendo la ubicación:', error);
                        showNotification('No se pudo obtener tu ubicación. Asegúrate de permitir el acceso a la ubicación.', 'error');
                        
                        // Restaurar botón
                        locationBtn.innerHTML = originalHtml;
                        locationBtn.disabled = false;
                    });
                });
                
                mapControls.appendChild(locationBtn);
            }

            mapControls.appendChild(satelliteBtn);
            mapControls.appendChild(mapBtn);
            mapControls.appendChild(directionsBtn);
        }

        // Efecto de carga del mapa
        mapElement.style.opacity = '0';
        mapElement.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            mapElement.style.opacity = '1';
        }, 500);

        // Ajustar el mapa al redimensionar
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(upaCoordinates);
            }, 250);
        });
    }

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
                        showError(field, 'Ingresa un número de teléfono válido (mínimo 10 dígitos)');
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
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        return phoneRegex.test(cleanPhone);
    }

    function showError(field, message) {
        clearError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        field.style.borderColor = '#e74c3c';
        field.parentNode.appendChild(errorDiv);
        
        // Scroll suave al campo con error
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        
        // Simular envío al servidor
        setTimeout(() => {
            showNotification('¡Mensaje enviado con éxito! Te contactaremos en menos de 24 horas.', 'success');
            
            // Resetear formulario
            document.getElementById('contactForm').reset();
            
            // Remover clases focused
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('focused'));
            
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
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
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observar elementos que necesitan animación
        const animatedElements = document.querySelectorAll('.info-card, .form-container, .faq-item');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.transitionDelay = `${index * 0.1}s`;
            
            observer.observe(el);
        });
    }

    function initContactCards() {
        const contactCards = document.querySelectorAll('.info-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            });
        });
    }

    function initRealTimeValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea, select');
        
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
                            showError(this, 'Ingresa un número de teléfono válido (mínimo 10 dígitos)');
                        } else {
                            clearError(this);
                        }
                    }
                } else {
                    clearError(this);
                }
            });
            
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && this.value.trim() === '') {
                    showError(this, 'Este campo es obligatorio');
                }
            });
        });
    }
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
});

// Función global para mostrar notificaciones
function showNotification(message, type = 'success') {
    const event = new CustomEvent('showNotification', {
        detail: { message, type }
    });
    document.dispatchEvent(event);
}