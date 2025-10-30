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
    
    // Dettagli auto (placeholder per modale futuro)
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const autoId = this.dataset.auto;
            // Per ora mostra un alert, in futuro si può aprire un modale
            showMessage('Funzionalità dettagli in arrivo! Contattaci per maggiori informazioni.', 'info');
        });
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
    
    console.log('Vetrina Auto Trinchillo caricata con successo!');
});