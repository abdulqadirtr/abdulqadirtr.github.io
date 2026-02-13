/**
 * =====================================================
 * Abdul Qadir — PhD Portfolio Website
 * Main JavaScript Module
 * =====================================================
 */

(function () {
    'use strict';

    // ===================== DOM ELEMENTS =====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const scrollTopBtn = document.getElementById('scrollTop');
    const yearSpan = document.getElementById('currentYear');
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const fadeElements = document.querySelectorAll('.fade-in');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');


    // ===================== MOBILE NAV TOGGLE =====================
    function initMobileNav() {
        if (!navToggle || !navLinks) return;

        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile nav when a link is clicked
        navAnchors.forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function (e) {
            if (!navbar.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }


    // ===================== NAVBAR SCROLL EFFECT =====================
    function handleNavbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }


    // ===================== ACTIVE NAV LINK HIGHLIGHTING =====================
    function updateActiveNavLink() {
        let current = '';

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(function (anchor) {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === '#' + current) {
                anchor.classList.add('active');
            }
        });
    }


    // ===================== SCROLL TO TOP BUTTON =====================
    function handleScrollTopButton() {
        if (!scrollTopBtn) return;

        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    function initScrollTopButton() {
        if (!scrollTopBtn) return;

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ===================== SCROLL ANIMATIONS (INTERSECTION OBSERVER) =====================
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            fadeElements.forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after animation to save resources
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    }


    // ===================== ANIMATED STAT COUNTERS =====================
    function initStatCounters() {
        if (statNumbers.length === 0) return;

        const counterObserverOptions = {
            root: null,
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, counterObserverOptions);

        statNumbers.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }


    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-target'), 10);
        var duration = 1500;
        var startTime = null;
        var suffix = '+';

        // Special case for 500K
        if (target >= 100) {
            suffix = 'K+';
        } else {
            suffix = '+';
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easedProgress = 1 - Math.pow(1 - progress, 3);
            var currentValue = Math.floor(easedProgress * target);

            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

   

    // ===================== DYNAMIC YEAR IN FOOTER =====================
    function setCurrentYear() {
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }


    // ===================== SMOOTH SCROLL FOR ANCHOR LINKS =====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }


    // ===================== SCROLL EVENT HANDLER (THROTTLED) =====================
    var scrollTimeout;
    function onScroll() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(function () {
            handleNavbarScroll();
            updateActiveNavLink();
            handleScrollTopButton();
        });
    }


    // ===================== KEYBOARD ACCESSIBILITY =====================
    function initKeyboardAccessibility() {
        document.addEventListener('keydown', function (e) {
            // Close mobile nav on Escape
            if (e.key === 'Escape') {
                navLinks.classList.remove('active');
                var icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }


    // ===================== TYPEWRITER EFFECT =====================
    function initTypewriter() {
        var element = document.getElementById('typewriter');
        if (!element) return;

        var phrases = [
            'build AI systems for aquaculture research 🐟',
            'develop Android apps with 500K+ downloads 📱',
            'apply Computer Vision to biological systems 🔬',
            'create apps with Kotlin & Jetpack Compose 🚀',
            'track fish behavior using Deep Learning 🧠',
            'publish research at international conferences 📄',
            'build scalable mobile apps for millions of users 💡',
            'bridge the gap between AI and marine biology 🌊'
        ];

        var phraseIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typeSpeed = 50;
        var deleteSpeed = 30;
        var pauseTime = 2000;

        function type() {
            var currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            var speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 300;
            }

            setTimeout(type, speed);
        }

        // Start after a short delay
        setTimeout(type, 500);
    }


    // ===================== INITIALIZE EVERYTHING =====================
    function init() {
        initMobileNav();
        initScrollTopButton();
        initScrollAnimations();
        initStatCounters();
        initSmoothScroll();
        initKeyboardAccessibility();
        setCurrentYear();
        initGalleryFilter();    // ← ADD THIS
        initLightbox();         // ← ADD THIS
        initTypewriter();        // ← ADD THIS LINE

        // Initial calls
        handleNavbarScroll();
        updateActiveNavLink();
        handleScrollTopButton();

        // Scroll listener
        window.addEventListener('scroll', onScroll, { passive: true });

        // Handle resize (recalculate section positions)
        window.addEventListener('resize', function () {
            updateActiveNavLink();
        }, { passive: true });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }


    // ===================== GALLERY FILTER =====================
    function initGalleryFilter() {
        var filterBtns = document.querySelectorAll('.filter-btn');
        var galleryItems = document.querySelectorAll('.gallery-item');

        if (filterBtns.length === 0) return;

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Update active button
                filterBtns.forEach(function (b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');

                // Filter items
                var filter = btn.getAttribute('data-filter');

                galleryItems.forEach(function (item) {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                        item.style.display = '';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                });
            });
        });
    }


    // ===================== LIGHTBOX =====================
    function initLightbox() {
        var lightbox = document.getElementById('lightbox');
        var lightboxImg = document.getElementById('lightboxImg');
        var lightboxCaption = document.getElementById('lightboxCaption');
        var lightboxClose = document.getElementById('lightboxClose');
        var lightboxPrev = document.getElementById('lightboxPrev');
        var lightboxNext = document.getElementById('lightboxNext');
        var galleryItems = document.querySelectorAll('.gallery-item');

        if (!lightbox || galleryItems.length === 0) return;

        var currentIndex = 0;
        var images = [];

        // Collect all images
        galleryItems.forEach(function (item, index) {
            var img = item.querySelector('.gallery-img-wrapper img');
            var caption = item.querySelector('.gallery-caption h4');
            var subcaption = item.querySelector('.gallery-caption p');

            images.push({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt'),
                caption: (caption ? caption.textContent : '') +
                    (subcaption ? ' — ' + subcaption.textContent : '')
            });

            // Click to open
            item.addEventListener('click', function () {
                currentIndex = index;
                openLightbox();
            });
        });

        function openLightbox() {
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
            lightboxCaption.textContent = images[currentIndex].caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            openLightbox();
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            openLightbox();
        }

        // Event listeners
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxNext.addEventListener('click', nextImage);
        lightboxPrev.addEventListener('click', prevImage);

        // Close on background click
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

})();