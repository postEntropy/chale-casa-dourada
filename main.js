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

    // 7. Lightbox Gallery with Video Support and Navigation
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentGalleryItems = [];
    let currentIndex = 0;

    function updateGalleryItems() {
        currentGalleryItems = Array.from(document.querySelectorAll('.lightbox-trigger'));
    }

    function showMedia(index) {
        if (index < 0) index = currentGalleryItems.length - 1;
        if (index >= currentGalleryItems.length) index = 0;
        currentIndex = index;

        const item = currentGalleryItems[currentIndex];
        const isVideo = item.tagName.toLowerCase() === 'video' || item.querySelector('source');

        // Reset
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();

        if (isVideo) {
            const videoSrc = item.querySelector('source') ? item.querySelector('source').src : item.src;
            lightboxVideo.src = videoSrc;
            lightboxVideo.style.display = 'block';
        } else {
            lightboxImg.src = item.src;
            lightboxImg.style.display = 'block';
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    // Initial event listeners for triggers
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.lightbox-trigger');
        if (trigger) {
            updateGalleryItems();
            const index = currentGalleryItems.indexOf(trigger);
            if (index !== -1) showMedia(index);
        }
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showMedia(currentIndex - 1); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showMedia(currentIndex + 1); });

    // Close when clicking outside the content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showMedia(currentIndex - 1);
        if (e.key === 'ArrowRight') showMedia(currentIndex + 1);
    });
});
