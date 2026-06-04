document.addEventListener('DOMContentLoaded', () => {

    // --- Typewriter Effect ---
    const textElement = document.querySelector('.typewriter');
    const phrases = ['fast, clean interfaces.', 'real-world solutions.', 'seamless web apps.'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    }

    // --- Back to Top ---
    const backToTop = document.getElementById('backToTop');

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function handleBackToTop() {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    function setActiveNav() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                navAnchors.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }

    // --- Combined Scroll Handler ---
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        handleNavbarScroll();
        handleBackToTop();
        setActiveNav();
    }, { passive: true });

    handleNavbarScroll();
    setActiveNav();

    // --- Scroll Reveal with IntersectionObserver ---
    const fadeEls = document.querySelectorAll('.fade-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => revealObserver.observe(el));

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const hamburgerIcon = document.getElementById('hamburgerIcon');

    function closeMenu() {
        navLinks.classList.remove('nav-open');
        hamburgerIcon.className = 'fas fa-bars';
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('nav-open');
        hamburgerIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) closeMenu();
    });

    // Close on nav link click and smooth scroll
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            closeMenu();
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#') || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 10);
            }
        });
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
});
