/* ===================================
   Auto Trinchillo - JavaScript
   ================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR FUNCTIONALITY =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== STICKY NAVBAR ON SCROLL =====
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ensure navbar is always visible
        header.style.transform = 'translateY(0)';
    });
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this.getAttribute('href'));
            }
        });
    });
    
    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    function updateActiveNavLink(targetHref) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetHref) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink(`#${sectionId}`);
            }
        });
    });
    
    // ===== CARD HOVER EFFECTS =====
    const cards = document.querySelectorAll('.servizio-card, .recensione-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== LAZY LOADING IMAGES =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== GAMMA BANNER ANIMATIONS =====
    const gammaBanner = document.querySelector('.gamma-banner');
    const gammaImage = document.querySelector('.gamma-image-wrapper');
    const gammaText = document.querySelector('.gamma-text');
    const gammaFeatures = document.querySelectorAll('.gamma-feature');
    const gammaButtons = document.querySelectorAll('.gamma-btn');
    
    // Parallax effect for gamma banner
    if (gammaBanner) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const bannerRect = gammaBanner.getBoundingClientRect();
            const bannerTop = bannerRect.top + scrolled;
            const bannerHeight = bannerRect.height;
            
            // Only apply parallax when banner is in viewport
            if (scrolled + window.innerHeight > bannerTop && scrolled < bannerTop + bannerHeight) {
                const speed = 0.5;
                const yPos = -(scrolled - bannerTop) * speed;
                gammaBanner.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    // Staggered animation for gamma features
    const gammaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('gamma-text')) {
                    // Animate gamma features with stagger
                    gammaFeatures.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateX(0)';
                        }, index * 200);
                    });
                    
                    // Animate buttons with delay
                    setTimeout(() => {
                        gammaButtons.forEach((button, index) => {
                            setTimeout(() => {
                                button.style.opacity = '1';
                                button.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }, gammaFeatures.length * 200 + 300);
                }
                
                // 3D hover effect for gamma image
                if (entry.target.classList.contains('gamma-image-wrapper')) {
                    entry.target.addEventListener('mousemove', function(e) {
                        const rect = this.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = (y - centerY) / 10;
                        const rotateY = (centerX - x) / 10;
                        
                        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                    });
                    
                    entry.target.addEventListener('mouseleave', function() {
                        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                    });
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Initialize gamma features as hidden
    gammaFeatures.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    gammaButtons.forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Observe gamma elements
    if (gammaText) gammaObserver.observe(gammaText);
    if (gammaImage) gammaObserver.observe(gammaImage);
    
    // ===== LOGO SHOWCASE ANIMATIONS =====
    const logoShowcase = document.querySelector('.logo-showcase');
    const showcaseLogo = document.querySelector('.showcase-logo');
    const logoWrapper = document.querySelector('.logo-wrapper');
    
    if (logoShowcase && showcaseLogo) {
        // Logo parallax effect
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const logoRect = logoShowcase.getBoundingClientRect();
            const logoTop = logoRect.top + scrolled;
            const logoHeight = logoRect.height;
            
            // Apply parallax only when logo section is in viewport
            if (scrolled + window.innerHeight > logoTop && scrolled < logoTop + logoHeight) {
                const speed = 0.3;
                const yPos = -(scrolled - logoTop) * speed;
                if (logoWrapper) {
                    logoWrapper.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
        
        // Logo hover interaction enhancement
        if (logoWrapper) {
            logoWrapper.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                this.style.transform = 'scale(1.05) translateY(-10px)';
            });
            
            logoWrapper.addEventListener('mouseleave', function() {
                this.style.animation = 'logoFloat 6s ease-in-out infinite';
                this.style.transform = 'scale(1) translateY(0px)';
            });
        }
        
        // Scroll-triggered logo animation
        const logoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const logo = entry.target.querySelector('.showcase-logo');
                    const text = entry.target.querySelector('.logo-text');
                    
                    if (logo) {
                        logo.style.opacity = '1';
                        logo.style.transform = 'scale(1) rotate(0deg)';
                    }
                    
                    if (text) {
                        setTimeout(() => {
                            text.style.opacity = '1';
                            text.style.transform = 'translateY(0)';
                        }, 500);
                    }
                }
            });
        }, {
            threshold: 0.3
        });
        
        // Initialize logo as hidden for animation
        if (showcaseLogo) {
            showcaseLogo.style.opacity = '0';
            showcaseLogo.style.transform = 'scale(0.8) rotate(-10deg)';
            showcaseLogo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        const logoText = document.querySelector('.logo-text');
        if (logoText) {
            logoText.style.opacity = '0';
            logoText.style.transform = 'translateY(30px)';
            logoText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        logoObserver.observe(logoShowcase);
    }

    // ===== CONCESSIONARIA SHOWCASE ANIMATIONS =====
    const concessionariaShowcase = document.querySelector('.concessionaria-showcase');
    const concessionariaImage = document.querySelector('.concessionaria-image');
    const imageWrapper = document.querySelector('.image-wrapper');
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    if (concessionariaShowcase) {
        // Image hover with 3D effect
        if (imageWrapper) {
            imageWrapper.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });
            
            imageWrapper.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
            });
            
            // Click effect for image
            imageWrapper.addEventListener('click', function() {
                // Create pulse effect
                const pulse = document.createElement('div');
                pulse.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(40, 125, 255, 0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: pulseExpand 0.6s ease-out;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                this.appendChild(pulse);
                
                setTimeout(() => {
                    pulse.remove();
                }, 600);
            });
        }
        
        // Staggered animation for feature boxes
        const concessionariaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    featureBoxes.forEach((box, index) => {
                        setTimeout(() => {
                            box.style.opacity = '1';
                            box.style.transform = 'translateX(0)';
                        }, index * 150);
                    });
                }
            });
        }, {
            threshold: 0.3
        });
        
        // Initialize feature boxes as hidden
        featureBoxes.forEach(box => {
            box.style.opacity = '0';
            box.style.transform = 'translateX(30px)';
            box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        concessionariaObserver.observe(concessionariaShowcase);
        
        // Parallax effect for floating circles
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const concessionariaRect = concessionariaShowcase.getBoundingClientRect();
            const concessionariaTop = concessionariaRect.top + scrolled;
            const concessionariaHeight = concessionariaRect.height;
            
            if (scrolled + window.innerHeight > concessionariaTop && scrolled < concessionariaTop + concessionariaHeight) {
                const floatingCircles = document.querySelectorAll('.floating-circle');
                floatingCircles.forEach((circle, index) => {
                    const speed = 0.3 + (index * 0.1);
                    const yPos = -(scrolled - concessionariaTop) * speed;
                    circle.style.transform = `translateY(${yPos}px)`;
                });
            }
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const animateOnScroll = document.querySelectorAll('.servizio-card, .recensione-card, .section-header, .banner-content, .gamma-content, .logo-showcase-content, .concessionaria-container');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for banner content
                if (entry.target.classList.contains('banner-content')) {
                    const bannerText = entry.target.querySelector('.banner-text');
                    const bannerImage = entry.target.querySelector('.banner-image');
                    
                    setTimeout(() => {
                        bannerText.style.opacity = '1';
                        bannerText.style.transform = 'translateX(0)';
                    }, 200);
                    
                    setTimeout(() => {
                        bannerImage.style.opacity = '1';
                        bannerImage.style.transform = 'translateX(0)';
                    }, 400);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
    
    // ===== GAMMA BANNER ADVANCED EFFECTS =====
    const gammaTitle = document.querySelector('.gamma-title');
    
    // Typing effect for gamma title
    if (gammaTitle) {
        const originalText = gammaTitle.textContent;
        let isTypingStarted = false;
        
        const gammaTypingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isTypingStarted) {
                    isTypingStarted = true;
                    typeWriter(gammaTitle, originalText, 100);
                }
            });
        }, { threshold: 0.5 });
        
        gammaTypingObserver.observe(gammaTitle);
    }
    
    function typeWriter(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Enhanced particle effect for gamma banner
    function createGammaParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'gamma-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        if (gammaBanner) {
            gammaBanner.appendChild(particleContainer);
            
            for (let i = 0; i < 20; i++) {
                createParticle(particleContainer);
            }
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, var(--primary-blue), var(--dark-blue));
            border-radius: 50%;
            opacity: 0.6;
            animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
            box-shadow: 0 0 10px rgba(40, 125, 255, 0.5);
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }
    
    // Initialize gamma particles
    createGammaParticles();
    
    // Refresh particles periodically
    setInterval(() => {
        const particleContainer = document.querySelector('.gamma-particles');
        if (particleContainer && particleContainer.children.length < 15) {
            createParticle(particleContainer);
        }
    }, 1000);
    
    // ===== BUTTON CLICK EFFECTS =====
    const buttons = document.querySelectorAll('.cta-btn, .card-btn, .gamma-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
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
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== FORM VALIDATION (if contact form exists) =====
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showMessage('Tutti i campi sono obbligatori', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Inserisci un indirizzo email valido', 'error');
                return;
            }
            
            // Simulate form submission
            showMessage('Messaggio inviato con successo! Ti contatteremo presto.', 'success');
            this.reset();
        });
    }
    
    // ===== UTILITY FUNCTIONS =====
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
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
        }, 3000);
    }
    
    // ===== PRELOADER (optional) =====
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        });
    }
    
    // ===== PERFORMANCE OPTIMIZATION =====
    
    // Debounce scroll events
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
    
    // Apply debounce to scroll handler
    const debouncedScrollHandler = debounce(() => {
        // Your scroll logic here
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Keyboard navigation for hamburger menu
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Focus management for mobile menu
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.focus();
        }
    });
    
    // ===== GOOGLE PLACES API INTEGRATION (optional) =====
    
    // Uncomment and configure if you want to use Google Places API for reviews
    /*
    function initGoogleReviews() {
        // Replace 'YOUR_PLACE_ID' with your actual Google Place ID
        const placeId = 'YOUR_PLACE_ID';
        const apiKey = 'YOUR_API_KEY';
        
        // Note: This requires a backend proxy due to CORS restrictions
        fetch(`/api/google-reviews?placeId=${placeId}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.result && data.result.reviews) {
                    displayGoogleReviews(data.result.reviews);
                }
            })
            .catch(error => {
                console.error('Error fetching Google reviews:', error);
            });
    }
    
    function displayGoogleReviews(reviews) {
        const reviewsContainer = document.querySelector('.recensioni-grid');
        reviewsContainer.innerHTML = '';
        
        reviews.slice(0, 3).forEach(review => {
            const reviewCard = createReviewCard(review);
            reviewsContainer.appendChild(reviewCard);
        });
    }
    
    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'recensione-card';
        
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        card.innerHTML = `
            <div class="card-header">
                <div class="customer-info">
                    <h4>${review.author_name}</h4>
                    <div class="stars">${stars}</div>
                </div>
            </div>
            <div class="card-content">
                <p>"${review.text}"</p>
            </div>
        `;
        
        return card;
    }
    
    // Initialize Google Reviews
    // initGoogleReviews();
    */
    
    // ===== MAPPA SECTION ANIMATIONS =====
    const mappaSection = document.querySelector('.mappa-section');
    const infoCards = document.querySelectorAll('.info-card');
    const mappaFrame = document.querySelector('.mappa-frame');
    
    if (mappaSection) {
        // Staggered animation for info cards
        const mappaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    infoCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateX(0)';
                        }, index * 200);
                    });
                    
                    // Animate mappa frame
                    if (mappaFrame) {
                        setTimeout(() => {
                            mappaFrame.style.opacity = '1';
                            mappaFrame.style.transform = 'translateY(0)';
                        }, infoCards.length * 200 + 300);
                    }
                    
                    mappaObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        // Initialize info cards as hidden
        infoCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Initialize mappa frame as hidden
        if (mappaFrame) {
            mappaFrame.style.opacity = '0';
            mappaFrame.style.transform = 'translateY(30px)';
            mappaFrame.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        mappaObserver.observe(mappaSection);
        
        // Enhanced hover effects for info cards
        infoCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(10px) scale(1)';
            });
        });
        
        // Google Maps interaction
        const googleMapIframe = document.querySelector('.google-map iframe');
        if (googleMapIframe) {
            googleMapIframe.addEventListener('load', function() {
                console.log('Google Maps loaded successfully');
            });
            
            // Add click tracking for directions button
            const directionsBtn = document.querySelector('.directions-btn');
            if (directionsBtn) {
                directionsBtn.addEventListener('click', function(e) {
                    console.log('Directions button clicked');
                    // You can add analytics tracking here
                });
            }
        }
        
        // Parallax effect for decorative elements
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const mappaRect = mappaSection.getBoundingClientRect();
            const mappaTop = mappaRect.top + scrolled;
            const mappaHeight = mappaRect.height;
            
            if (scrolled + window.innerHeight > mappaTop && scrolled < mappaTop + mappaHeight) {
                const decorationElements = document.querySelectorAll('.decoration-element');
                decorationElements.forEach((element, index) => {
                    const speed = 0.3 + (index * 0.1);
                    const yPos = -(scrolled - mappaTop) * speed;
                    element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
                });
            }
        });
    }
    
    // ===== CAROSELLO RECENSIONI =====
    const recensioniCarousel = document.querySelector('.recensioni-carousel');
    const carouselTrack = document.querySelector('.carousel-track');
    const recensioniCards = document.querySelectorAll('.recensione-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (recensioniCarousel && carouselTrack && recensioniCards.length > 0) {
        let currentSlide = 0;
        const totalSlides = recensioniCards.length; // 6 recensioni individuali
        const cardsPerSlide = 1; // Una recensione alla volta
        let autoplayInterval;
        let isTransitioning = false;
        
        // Calcola la larghezza di una carta più il gap
        function getCardWidth() {
            const cardStyle = window.getComputedStyle(recensioniCards[0]);
            const cardWidth = recensioniCards[0].offsetWidth;
            const marginRight = parseInt(cardStyle.marginRight) || 0;
            return cardWidth + marginRight;
        }
        
        // Aggiorna la posizione del carosello
        function updateCarouselPosition(animated = true) {
            if (isTransitioning) return;
            
            const cardWidth = getCardWidth();
            const offset = currentSlide * cardWidth; // Una carta alla volta
            
            if (!animated) {
                carouselTrack.classList.add('no-transition');
            } else {
                carouselTrack.classList.remove('no-transition');
                isTransitioning = true;
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
            
            carouselTrack.style.transform = `translateX(-${offset}px)`;
            
            if (!animated) {
                setTimeout(() => {
                    carouselTrack.classList.remove('no-transition');
                }, 50);
            }
        }
        
        // Funzioni per indicatori e bottoni rimosse poiché nascosti
        
        // Vai al slide successivo
        function nextSlide() {
            if (isTransitioning) return;
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarouselPosition();
        }
        
        // Vai al slide precedente
        function prevSlide() {
            if (isTransitioning) return;
            currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            updateCarouselPosition();
        }
        
        // Vai a uno slide specifico
        function goToSlide(slideIndex) {
            if (isTransitioning || slideIndex === currentSlide) return;
            currentSlide = slideIndex;
            updateCarouselPosition();
        }
        
        // Avvia l'autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                nextSlide();
            }, 3000); // Cambia slide ogni 3 secondi (più veloce per singole recensioni)
        }
        
        // Ferma l'autoplay
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }
        
        // Event listeners per i controlli rimossi (controlli nascosti)
        
        // Pausa autoplay al hover
        recensioniCarousel.addEventListener('mouseenter', stopAutoplay);
        recensioniCarousel.addEventListener('mouseleave', startAutoplay);
        
        // Touch/swipe support per dispositivi mobili
        let startX = 0;
        let endX = 0;
        const minSwipeDistance = 50;
        
        recensioniCarousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        recensioniCarousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeDistance = startX - endX;
            
            if (Math.abs(swipeDistance) > minSwipeDistance) {
                stopAutoplay();
                
                if (swipeDistance > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
                
                startAutoplay();
            }
        }
        
        // Navigazione da tastiera rimossa per un'esperienza più pulita
        
        // Gestione del resize della finestra
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarouselPosition(false);
            }, 250);
        });
        
        // Inizializzazione
        updateCarouselPosition(false);
        startAutoplay();
        
        // Observer per visibilità (pausa autoplay quando non visibile)
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            });
        }, {
            threshold: 0.5
        });
        
        carouselObserver.observe(recensioniCarousel);
        
        // Cleanup al cambio di pagina
        window.addEventListener('beforeunload', () => {
            stopAutoplay();
            carouselObserver.disconnect();
        });
    }
    
    console.log('Auto Trinchillo website loaded successfully!');
});

// ===== CSS FOR RIPPLE EFFECT =====
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .message {
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        backdrop-filter: blur(20px) !important;
    }
    
    @keyframes pulseExpand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .gamma-particles {
        overflow: hidden;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);