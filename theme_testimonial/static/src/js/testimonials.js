/**
 * Testimonials Variety Pack - Interactive Features
 * JavaScript for carousel, accordion, and other interactive testimonials
 */

odoo.define('theme_testimonial.testimonials', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.TestimonialInteractions = publicWidget.Widget.extend({
        selector: '.testimonials-hero, .testimonial-carousel-container, .testimonial-netflix-container, .testimonial-scale-carousel, .accordion-testimonial',

        start: function () {
            this._super.apply(this, arguments);
            this._initCarousels();
            this._initAccordions();
            this._initNetflixSlider();
            this._initScaleCarousel();
            this._initScrollReveal();
            return this._super.apply(this, arguments);
        },

        /**
         * Initialize all carousel sliders
         */
        _initCarousels: function () {
            const carousels = document.querySelectorAll('.testimonial-carousel');

            carousels.forEach((carousel) => {
                const id = carousel.id;
                if (!id) return;

                const slides = carousel.querySelectorAll('.testimonial-slide');
                const dots = document.querySelectorAll(`[data-carousel="${id}"] .dot`);
                let currentSlide = 0;
                let intervalId;

                // Auto-rotate carousel
                const rotateSlides = () => {
                    slides[currentSlide].classList.remove('active');
                    dots[currentSlide].classList.remove('active');

                    currentSlide = (currentSlide + 1) % slides.length;

                    slides[currentSlide].classList.add('active');
                    dots[currentSlide].classList.add('active');
                };

                // Start auto-rotation
                const startRotation = () => {
                    if (intervalId) clearInterval(intervalId);
                    intervalId = setInterval(rotateSlides, 5000);
                };

                startRotation();

                // Click handlers for dots
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        clearInterval(intervalId);

                        slides[currentSlide].classList.remove('active');
                        dots[currentSlide].classList.remove('active');

                        currentSlide = index;

                        slides[currentSlide].classList.add('active');
                        dots[currentSlide].classList.add('active');

                        // Restart rotation after manual interaction
                        startRotation();
                    });
                });
            });
        },

        /**
         * Initialize accordion functionality
         */
        _initAccordions: function () {
            const accordions = document.querySelectorAll('.accordion-testimonial');

            accordions.forEach((accordion) => {
                const header = accordion.querySelector('.accordion-header');
                const content = accordion.querySelector('.accordion-content');

                if (!header || !content) return;

                // Remove existing listeners to prevent duplicates
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);

                newHeader.addEventListener('click', () => {
                    // Toggle active state
                    const isActive = accordion.classList.contains('active');

                    // Close all other accordions
                    document.querySelectorAll('.accordion-testimonial').forEach((item) => {
                        item.classList.remove('active');
                        const itemContent = item.querySelector('.accordion-content');
                        if (itemContent) {
                            itemContent.style.maxHeight = '0';
                        }
                    });

                    // Open clicked accordion if it wasn't active
                    if (!isActive) {
                        accordion.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            });
        },

        /**
         * Initialize Netflix-Style Slider (Layout 28)
         */
        _initNetflixSlider: function () {
            const netflixSlider = document.getElementById('netflixSlider');
            if (netflixSlider) {
                // Scope to the container to ensure we get the correct buttons
                const container = netflixSlider.parentElement;
                const prevBtn = container.querySelector('.netflix-prev');
                const nextBtn = container.querySelector('.netflix-next');

                if (prevBtn && nextBtn) {
                    // Clone to remove old listeners
                    const newPrevBtn = prevBtn.cloneNode(true);
                    const newNextBtn = nextBtn.cloneNode(true);
                    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
                    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

                    newPrevBtn.addEventListener('click', () => {
                        netflixSlider.scrollBy({
                            left: -300,
                            behavior: 'smooth'
                        });
                    });

                    newNextBtn.addEventListener('click', () => {
                        netflixSlider.scrollBy({
                            left: 300,
                            behavior: 'smooth'
                        });
                    });
                }
            }
        },

        /**
         * Initialize Scale Effect Carousel (Layout 33)
         */
        _initScaleCarousel: function () {
            const scaleCarousel = document.getElementById('scaleCarousel');
            if (scaleCarousel) {
                const scaleCards = scaleCarousel.querySelectorAll('.scale-card');
                // Scope to the container (parent of the track)
                const container = scaleCarousel.parentElement;
                const prevBtn = container.querySelector('.scale-prev');
                const nextBtn = container.querySelector('.scale-next');
                let currentIndex = 0;
                let intervalId;

                function updateScaleCards() {
                    scaleCards.forEach((card, index) => {
                        card.classList.remove('active');
                        if (index === currentIndex) {
                            card.classList.add('active');
                        }
                    });
                }

                if (prevBtn && nextBtn) {
                    // Clone to remove old listeners
                    const newPrevBtn = prevBtn.cloneNode(true);
                    const newNextBtn = nextBtn.cloneNode(true);
                    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
                    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

                    newPrevBtn.addEventListener('click', () => {
                        if (intervalId) clearInterval(intervalId);
                        currentIndex = (currentIndex - 1 + scaleCards.length) % scaleCards.length;
                        updateScaleCards();
                        startAutoRotate();
                    });

                    newNextBtn.addEventListener('click', () => {
                        if (intervalId) clearInterval(intervalId);
                        currentIndex = (currentIndex + 1) % scaleCards.length;
                        updateScaleCards();
                        startAutoRotate();
                    });
                }

                // Auto-rotate scale carousel
                function startAutoRotate() {
                    if (intervalId) clearInterval(intervalId);
                    intervalId = setInterval(() => {
                        currentIndex = (currentIndex + 1) % scaleCards.length;
                        updateScaleCards();
                    }, 6000);
                }

                startAutoRotate();
            }
        },

        /**
         * Initialize Scroll Reveal Animations
         */
        _initScrollReveal: function () {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all testimonial cards
            const cards = document.querySelectorAll(
                '.testimonial-card, .testimonial-masonry-item, .bento-item, ' +
                '.gradient-card, .neon-card, .badge-item, .flip-card, ' +
                '.diagonal-card, .radial-item, .netflix-card, .loop-item, ' +
                '.video-testimonial-card, .spotlight-card, .ticker-item'
            );

            cards.forEach((card, index) => {
                // Only set initial state if not already visible
                if (card.style.opacity !== '1') {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = `opacity 0.6s ease ${index % 3 * 0.1}s, transform 0.6s ease ${index % 3 * 0.1}s`;
                    observer.observe(card);
                }
            });
        }
    });

    return publicWidget.registry.TestimonialInteractions;
});

// Standalone vanilla JS initialization (fallback for non-Odoo environments or preview)
document.addEventListener('DOMContentLoaded', function () {
    // Check if we are in Odoo environment (simple check for odoo object)
    if (typeof odoo !== 'undefined' && odoo.define) {
        // In Odoo, let the widget handle it to avoid double binding
        // But if the widget fails or isn't loaded, this might be needed.
        // For now, we'll allow it to run if it's just a preview page.
        if (document.querySelector('body.o_connected_user')) {
            // Likely Odoo backend/frontend with widget support, maybe skip?
            // But to be safe for preview.html which might not have odoo defined:
        }
    }

    // Initialize Carousels
    const carousels = document.querySelectorAll('.testimonial-carousel');

    carousels.forEach((carousel) => {
        const id = carousel.id;
        if (!id) return;

        const slides = carousel.querySelectorAll('.testimonial-slide');
        const dotsContainer = document.querySelector(`[data-carousel="${id}"]`);
        if (!dotsContainer) return;

        const dots = dotsContainer.querySelectorAll('.dot');
        let currentSlide = 0;
        let intervalId;

        const rotateSlides = () => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = (currentSlide + 1) % slides.length;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const startRotation = () => {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(rotateSlides, 5000);
        };

        startRotation();

        dots.forEach((dot, index) => {
            // Clone to ensure no duplicate listeners if this runs multiple times
            const newDot = dot.cloneNode(true);
            dot.parentNode.replaceChild(newDot, dot);

            newDot.addEventListener('click', () => {
                clearInterval(intervalId);

                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');

                currentSlide = index;

                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');

                startRotation();
            });
        });
    });

    // Initialize Accordions
    const accordions = document.querySelectorAll('.accordion-testimonial');

    accordions.forEach((accordion) => {
        const header = accordion.querySelector('.accordion-header');
        const content = accordion.querySelector('.accordion-content');

        if (!header || !content) return;

        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);

        newHeader.addEventListener('click', () => {
            const isActive = accordion.classList.contains('active');

            document.querySelectorAll('.accordion-testimonial').forEach((item) => {
                item.classList.remove('active');
                const itemContent = item.querySelector('.accordion-content');
                if (itemContent) {
                    itemContent.style.maxHeight = '0';
                }
            });

            if (!isActive) {
                accordion.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Initialize Netflix-Style Slider (Layout 28)
    const netflixSlider = document.getElementById('netflixSlider');
    if (netflixSlider) {
        const container = netflixSlider.parentElement;
        const prevBtn = container.querySelector('.netflix-prev');
        const nextBtn = container.querySelector('.netflix-next');

        if (prevBtn && nextBtn) {
            const newPrevBtn = prevBtn.cloneNode(true);
            const newNextBtn = nextBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

            newPrevBtn.addEventListener('click', () => {
                netflixSlider.scrollBy({
                    left: -300,
                    behavior: 'smooth'
                });
            });

            newNextBtn.addEventListener('click', () => {
                netflixSlider.scrollBy({
                    left: 300,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Initialize Scale Effect Carousel (Layout 33)
    const scaleCarousel = document.getElementById('scaleCarousel');
    if (scaleCarousel) {
        const scaleCards = scaleCarousel.querySelectorAll('.scale-card');
        const container = scaleCarousel.parentElement;
        const prevBtn = container.querySelector('.scale-prev');
        const nextBtn = container.querySelector('.scale-next');
        let currentIndex = 0;
        let intervalId;

        function updateScaleCards() {
            scaleCards.forEach((card, index) => {
                card.classList.remove('active');
                if (index === currentIndex) {
                    card.classList.add('active');
                }
            });
        }

        if (prevBtn && nextBtn) {
            const newPrevBtn = prevBtn.cloneNode(true);
            const newNextBtn = nextBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

            newPrevBtn.addEventListener('click', () => {
                if (intervalId) clearInterval(intervalId);
                currentIndex = (currentIndex - 1 + scaleCards.length) % scaleCards.length;
                updateScaleCards();
                startAutoRotate();
            });

            newNextBtn.addEventListener('click', () => {
                if (intervalId) clearInterval(intervalId);
                currentIndex = (currentIndex + 1) % scaleCards.length;
                updateScaleCards();
                startAutoRotate();
            });
        }

        function startAutoRotate() {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % scaleCards.length;
                updateScaleCards();
            }, 6000);
        }

        startAutoRotate();
    }

    // Scroll Reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll(
        '.testimonial-card, .testimonial-masonry-item, .bento-item, ' +
        '.gradient-card, .neon-card, .badge-item, .flip-card, ' +
        '.diagonal-card, .radial-item, .netflix-card, .loop-item, ' +
        '.video-testimonial-card, .spotlight-card, .ticker-item'
    );

    cards.forEach((card, index) => {
        if (card.style.opacity !== '1') {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index % 3 * 0.1}s, transform 0.6s ease ${index % 3 * 0.1}s`;
            observer.observe(card);
        }
    });
});
