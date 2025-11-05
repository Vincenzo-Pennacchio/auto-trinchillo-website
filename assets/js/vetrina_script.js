/* ===================================
   Vetrina Auto - JavaScript
   ================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FILTRI FUNCTIONALITY =====
    const marcaSelect = document.getElementById('marca');
    const prezzoSelect = document.getElementById('prezzo');
    const annoSelect = document.getElementById('anno');
    const resetBtn = document.querySelector('.reset-filtri-btn');
    const autoCards = document.querySelectorAll('.auto-card');
    const autoGrid = document.getElementById('autoGrid');
    
    // Applica filtri
    function applicaFiltri() {
        const marcaFiltro = marcaSelect.value.toLowerCase();
        const prezzoFiltro = parseInt(prezzoSelect.value) || Infinity;
        const annoFiltro = parseInt(annoSelect.value) || 0;
        
        let visibleCount = 0;
        
        autoCards.forEach(card => {
            const marca = card.dataset.marca.toLowerCase();
            const prezzo = parseInt(card.dataset.prezzo);
            const anno = parseInt(card.dataset.anno);
            
            const marcaMatch = !marcaFiltro || marca === marcaFiltro;
            const prezzoMatch = prezzo <= prezzoFiltro;
            const annoMatch = !annoFiltro || (annoFiltro === 2018 ? anno <= 2018 : anno >= annoFiltro);
            
            if (marcaMatch && prezzoMatch && annoMatch) {
                card.classList.remove('hidden');
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
        
        // Mostra messaggio se nessun risultato
        showNoResults(visibleCount === 0);
    }
    
    // Mostra/nascondi messaggio nessun risultato
    function showNoResults(show) {
        let noResultsMsg = document.querySelector('.no-results');
        
        if (show && !noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <h3>Nessun risultato trovato</h3>
                <p>Prova a modificare i filtri di ricerca o contattaci per informazioni su altri veicoli disponibili.</p>
            `;
            autoGrid.appendChild(noResultsMsg);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    // Event listeners per i filtri
    if (marcaSelect) marcaSelect.addEventListener('change', applicaFiltri);
    if (prezzoSelect) prezzoSelect.addEventListener('change', applicaFiltri);
    if (annoSelect) annoSelect.addEventListener('change', applicaFiltri);
    
    // Reset filtri
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            marcaSelect.value = '';
            prezzoSelect.value = '';
            annoSelect.value = '';
            applicaFiltri();
            
            // Effetto visuale sul reset
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // ===== AUTO CARD INTERACTIONS =====
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    const contactButtons = document.querySelectorAll('.contact-btn');
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    // ===== MODAL CAROUSEL FUNCTIONALITY =====
    const modal = document.getElementById('autoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');
    const carouselSlides = document.getElementById('carouselSlides');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    const modalHeaderDetails = document.getElementById('modalHeaderDetails');
    const modalWhatsApp = document.getElementById('modalWhatsApp');

    
    let currentSlideIndex = 0;
    let totalSlides = 0;
    let currentCarImages = [];
    let currentAutoData = null;

    // Dati delle auto per il modale
    const autoData = {
        1: {
            title: 'Fiat Panda 1.2 Easy',
            price: '€12.500',
            year: '2020',
            km: '45.000 km',
            fuel: 'Benzina',
            transmission: 'Manuale',
            description: 'Fiat Panda in ottime condizioni, perfetta per la città. Climatizzatore, sistema multimediale, cerchi in lega. Veicolo revisionato e con tagliandi regolari. Ideale per chi cerca un\'auto affidabile e economica per gli spostamenti urbani.'
        },
        2: {
            title: 'Volkswagen Golf 1.6 TDI',
            price: '€18.500',
            year: '2021',
            km: '32.000 km',
            fuel: 'Diesel',
            transmission: 'Manuale',
            description: 'Volkswagen Golf diesel, ottimi consumi e prestazioni. Full optional, navigatore, sensori parcheggio. Interni in tessuto di qualità, sistema di infotainment avanzato. Perfetta per viaggi lunghi grazie ai bassi consumi.'
        },
        3: {
            title: 'BMW Serie 3 320d',
            price: '€25.000',
            year: '2022',
            km: '28.000 km',
            fuel: 'Diesel',
            transmission: 'Automatico',
            description: 'BMW Serie 3 in condizioni eccellenti. Interni in pelle, sistema di infotainment BMW, assistenti di guida. Cambio automatico, cerchi in lega, fari LED. Un concentrato di tecnologia e comfort per chi non scende a compromessi.'
        }
    };

    // Dettagli auto (apri modale carousel)
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const autoId = this.dataset.auto;
            const autoCard = this.closest('.auto-card');
            const carouselImages = autoCard.dataset.carouselImages;
            
            if (carouselImages && autoData[autoId]) {
                openModal(autoId, carouselImages.split(','));
            } else {
                showMessage('Immagini non disponibili per questo veicolo. Contattaci per maggiori informazioni.', 'info');
            }
        });
    });

    // Apri modale
    function openModal(autoId, images) {
        currentAutoData = autoData[autoId];
        currentCarImages = images;
        currentSlideIndex = 0;
        totalSlides = images.length;
        
        // Aggiorna contenuto modale
        modalTitle.textContent = currentAutoData.title;
        
        // Aggiorna dettagli nell'header
        modalHeaderDetails.innerHTML = `
            <div class="detail-header-item">
                <span class="label">Anno</span>
                <div class="value">
                    <i class="fas fa-calendar"></i>
                    ${currentAutoData.year}
                </div>
            </div>
            <div class="detail-header-item">
                <span class="label">Km</span>
                <div class="value">
                    <i class="fas fa-road"></i>
                    ${currentAutoData.km}
                </div>
            </div>
            <div class="detail-header-item">
                <span class="label">Carburante</span>
                <div class="value">
                    <i class="fas fa-gas-pump"></i>
                    ${currentAutoData.fuel}
                </div>
            </div>
            <div class="detail-header-item">
                <span class="label">Cambio</span>
                <div class="value">
                    <i class="fas fa-cogs"></i>
                    ${currentAutoData.transmission}
                </div>
            </div>
            <div class="detail-header-item">
                <span class="label">Prezzo</span>
                <div class="value">
                    <i class="fas fa-euro-sign"></i>
                    ${currentAutoData.price}
                </div>
            </div>
        `;
        
        // Crea slides
        createSlides();
        
        // Crea indicatori
        createIndicators();
        
        // Aggiorna contatori
        updateSlideCounter();
        
        // Mostra modale
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Previeni scroll del body
        
        // Focus management per accessibilità
        modalClose.focus();
    }

    // Crea slides del carousel
    function createSlides() {
        carouselSlides.innerHTML = '';
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.classList.remove('loaded');
        
        let loadedImages = 0;
        const totalImages = currentCarImages.length;
        
        currentCarImages.forEach((imageNum, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            
            const img = document.createElement('img');
            img.src = `assets/img/carousel-img/carousel-img-${imageNum}.jpeg`;
            img.alt = `${currentAutoData.title} - Immagine ${parseInt(imageNum)}`;
            img.loading = 'lazy';
            
            img.onload = function() {
                // Rileva automaticamente l'orientamento dell'immagine
                const aspectRatio = this.naturalWidth / this.naturalHeight;
                
                if (aspectRatio > 1.2) {
                    // Immagine orizzontale (landscape)
                    this.setAttribute('data-orientation', 'landscape');
                } else if (aspectRatio < 0.8) {
                    // Immagine verticale (portrait)
                    this.setAttribute('data-orientation', 'portrait');
                } else {
                    // Immagine quadrata o quasi
                    this.setAttribute('data-orientation', 'square');
                }
                
                // Marca l'immagine come caricata
                this.setAttribute('data-loaded', 'true');
                
                loadedImages++;
                if (loadedImages === totalImages) {
                    carouselContainer.classList.add('loaded');
                }
            };
            
            img.onerror = function() {
                console.warn(`Impossibile caricare l'immagine: carousel-img-${imageNum}.jpeg`);
                loadedImages++;
                if (loadedImages === totalImages) {
                    carouselContainer.classList.add('loaded');
                }
            };
            
            slide.appendChild(img);
            carouselSlides.appendChild(slide);
        });
    }

    // Crea indicatori del carousel
    function createIndicators() {
        carouselIndicators.innerHTML = '';
        
        currentCarImages.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(index));
            carouselIndicators.appendChild(indicator);
        });
    }

    // Vai a slide specifica
    function goToSlide(index) {
        // Rimuovi classe active dalla slide corrente
        const currentSlide = carouselSlides.querySelector('.carousel-slide.active');
        const currentIndicator = carouselIndicators.querySelector('.carousel-indicator.active');
        
        if (currentSlide) currentSlide.classList.remove('active');
        if (currentIndicator) currentIndicator.classList.remove('active');
        
        // Aggiorna indice
        currentSlideIndex = index;
        
        // Aggiungi classe active alla nuova slide
        const newSlide = carouselSlides.children[currentSlideIndex];
        const newIndicator = carouselIndicators.children[currentSlideIndex];
        
        if (newSlide) newSlide.classList.add('active');
        if (newIndicator) newIndicator.classList.add('active');
        
        // Aggiorna contatore
        updateSlideCounter();
    }

    // Slide precedente
    function prevSlideFunc() {
        const newIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : totalSlides - 1;
        goToSlide(newIndex);
    }

    // Slide successiva
    function nextSlideFunc() {
        const newIndex = currentSlideIndex < totalSlides - 1 ? currentSlideIndex + 1 : 0;
        goToSlide(newIndex);
    }

    // Aggiorna contatore slide
    function updateSlideCounter() {
        currentSlideSpan.textContent = currentSlideIndex + 1;
        totalSlidesSpan.textContent = totalSlides;
    }

    // Chiudi modale
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = ''; // Ripristina scroll del body
        currentSlideIndex = 0;
        currentCarImages = [];
        currentAutoData = null;
    }

    // Event listeners per il modale
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (prevSlide) {
        prevSlide.addEventListener('click', prevSlideFunc);
    }

    if (nextSlide) {
        nextSlide.addEventListener('click', nextSlideFunc);
    }

    // Chiudi modale cliccando fuori
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Controlli da tastiera
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('open')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    prevSlideFunc();
                    break;
                case 'ArrowRight':
                    nextSlideFunc();
                    break;
            }
        }
    });


    
    // Bottoni contatto
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'tel:+393486928732';
        });
    });
    
    // Bottoni WhatsApp
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const autoCard = this.closest('.auto-card');
            const autoTitle = autoCard.querySelector('.auto-title').textContent;
            const autoPrice = autoCard.querySelector('.auto-price').textContent;
            
            const message = `Ciao! Sono interessato a: ${autoTitle} - ${autoPrice}. Potreste darmi maggiori informazioni?`;
            const whatsappUrl = `https://wa.me/393486928732?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // ===== SCROLL ANIMATIONS =====
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
    
    // Osserva le card per animazioni
    autoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // ===== UTILITY FUNCTIONS =====
    function showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            max-width: 300px;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateX(100px)';
            setTimeout(() => messageDiv.remove(), 300);
        }, 4000);
    }
    
    // ===== CARD HOVER EFFECTS ENHANCEMENT =====
    autoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Leggero effetto parallax sull'immagine
            const image = this.querySelector('.auto-image');
            if (image) {
                image.style.transform = 'scale(1.1) translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.auto-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
        
        // Effetto ripple sui bottoni
        const buttons = card.querySelectorAll('.contact-btn, .whatsapp-btn, .view-details-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.height, rect.width);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
    });
    
    // ===== LAZY LOADING PER IMMAGINI =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATION =====
    
    // Debounce per filtri
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Applica debounce ai filtri se necessario
    const debouncedFilter = debounce(applicaFiltri, 300);
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Keyboard navigation per filtri
    [marcaSelect, prezzoSelect, annoSelect].forEach(select => {
        if (select) {
            select.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    applicaFiltri();
                }
            });
        }
    });
    
    // Focus management per modali (per implementazioni future)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Chiudi eventuali modali aperti
            const openModals = document.querySelectorAll('.modal.open');
            openModals.forEach(modal => {
                modal.classList.remove('open');
            });
        }
    });
    
    // ===== STATISTICHE (opzionale) =====
    
    // Conta auto per categoria
    function updateStatistics() {
        const totalAuto = autoCards.length;
        const visibleAuto = document.querySelectorAll('.auto-card:not(.hidden)').length;
        
        // Aggiorna eventuali contatori se presenti
        const counter = document.querySelector('.auto-counter');
        if (counter) {
            counter.textContent = `${visibleAuto} di ${totalAuto} auto`;
        }
    }
    
    // ===== INIZIALIZZAZIONE =====
    
    // Inizializza filtri
    applicaFiltri();
    
    // Mostra messaggio di benvenuto (opzionale)
    setTimeout(() => {
        showMessage('Benvenuto nella nostra vetrina! Usa i filtri per trovare l\'auto perfetta.', 'info');
    }, 1000);
    
    // ===== AUTO-SLIDE CAROUSEL (OPZIONALE) =====
    let autoSlideInterval = null;
    const AUTO_SLIDE_DELAY = 4000; // 4 secondi

    function startAutoSlide() {
        if (totalSlides > 1) {
            autoSlideInterval = setInterval(() => {
                nextSlideFunc();
            }, AUTO_SLIDE_DELAY);
        }
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Avvia auto-slide quando si apre il modale
    const originalOpenModal = openModal;
    openModal = function(autoId, images) {
        originalOpenModal(autoId, images);
        setTimeout(startAutoSlide, 1000); // Inizia dopo 1 secondo
    };

    // Ferma auto-slide quando si chiude il modale
    const originalCloseModal = closeModal;
    closeModal = function() {
        stopAutoSlide();
        originalCloseModal();
    };

    // Pausa auto-slide al hover del carousel
    if (modal) {
        const carouselContainer = modal.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }

    // ===== TOUCH SUPPORT PER MOBILE =====
    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlideFunc();
            } else {
                // Swipe right - prev slide
                prevSlideFunc();
            }
        }
    }

    // Aggiungi touch listeners al carousel
    if (modal) {
        const carouselContainer = modal.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
            carouselContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
    }

    // ===== PRELOAD IMMAGINI =====
    function preloadCarouselImages(images) {
        images.forEach(imageNum => {
            const img = new Image();
            img.src = `assets/img/carousel-img/carousel-img-${imageNum}.jpeg`;
        });
    }

    // Preload immagini al caricamento della pagina per le prime 3 auto
    const preloadImages = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'];
    preloadCarouselImages(preloadImages);

    // WhatsApp dal modale
    if (modalWhatsApp) {
        modalWhatsApp.addEventListener('click', function() {
            if (currentAutoData) {
                const message = `Ciao! Sono interessato a: ${currentAutoData.title} - ${currentAutoData.price}. Potreste darmi maggiori informazioni?`;
                const whatsappUrl = `https://wa.me/393486928732?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    }

    console.log('Vetrina Auto Trinchillo con Modal Carousel XXL caricata con successo!');
});