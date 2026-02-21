document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar and FAB on Scroll
    const navbar = document.getElementById('navbar');
    const fab = document.querySelector('.fab');

    window.addEventListener('scroll', () => {
        // Navbar glass effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // FAB visibility (reveal after hero)
        if (window.scrollY > 300) {
            fab.classList.remove('hidden');
        } else {
            fab.classList.add('hidden');
        }
    });

    // 2. Intersection Observer for Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 5. Parallax Effect on Hero
    const heroVideo = document.querySelector('.video-container');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrollValue * 0.4}px)`;
        }
    });

    // 6. Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });

    // 7. Lightbox Gallery
    const lightbox     = document.getElementById('lightbox');
    const lightboxImg  = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.lightbox-trigger').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});
