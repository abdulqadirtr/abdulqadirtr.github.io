(function () {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const scrollTopBtn = document.getElementById('scrollTop');
    const yearSpan = document.getElementById('currentYear');
    const fadeElements = document.querySelectorAll('.fade-in');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    // Auto highlight active nav
    function highlightActiveNav() {
        const current = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) link.classList.add('active');
        });
    }

    // Mobile Nav
    function initMobileNav() {
        if (!navToggle || !navLinks) return;
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Navbar Scroll
    function handleNavbarScroll() {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Typewriter
    function initTypewriter() {
        const el = document.getElementById('typewriter');
        if (!el) return;

        const phrases = [
            'build Kotlin apps with 500K+ downloads 📱',
            'architect scalable Android solutions 🏗️',
            'apply Computer Vision to aquaculture research 🐟',
            'develop production apps with Jetpack Compose 🚀',
            'optimize apps to 99.5% crash-free rate ⚡'
        ];

        let i = 0, j = 0, isDeleting = false;
        function type() {
            const text = phrases[i];
            if (isDeleting) {
                el.textContent = text.substring(0, j - 1);
                j--;
            } else {
                el.textContent = text.substring(0, j + 1);
                j++;
            }
            let speed = isDeleting ? 30 : 50;
            if (!isDeleting && j === text.length) { speed = 1800; isDeleting = true; }
            else if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % phrases.length; speed = 400; }
            setTimeout(type, speed);
        }
        setTimeout(type, 500);
    }

    // Stats Counter
    function initStatCounters() {
        if (!statNumbers.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(counter => observer.observe(counter));
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const inc = target / 50;
        const timer = setInterval(() => {
            count += inc;
            if (count >= target) {
                el.textContent = target + (target >= 100 ? 'K+' : '+');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(count) + (target >= 100 ? 'K+' : '+');
            }
        }, 30);
    }

    // Scroll Top
    function initScrollTop() {
        if (!scrollTopBtn) return;
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function handleScrollTop() {
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }

    // Fade In
    function initFadeIn() {
        if (!('IntersectionObserver' in window)) {
            fadeElements.forEach(el => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        fadeElements.forEach(el => observer.observe(el));
    }

    function setYear() {
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    // Init
    function init() {
        initMobileNav();
        initTypewriter();
        initStatCounters();
        initScrollTop();
        initFadeIn();
        setYear();
        highlightActiveNav();

        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            handleScrollTop();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();