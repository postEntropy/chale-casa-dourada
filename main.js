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

    // 7. Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbVideo = document.getElementById('lightbox-video');
    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');
    const lbCounter = document.getElementById('lb-counter');
    const lbBackdrop = lightbox.querySelector('.lb-backdrop');

    const items = Array.from(document.querySelectorAll('.gallery-item[data-src]'));
    let current = 0;

    function openLightbox(index) {
        current = ((index % items.length) + items.length) % items.length;
        const item = items[current];
        const type = item.dataset.type;
        const src = item.dataset.src;

        // Reset both elements
        lbImg.style.display = 'none';
        lbVideo.style.display = 'none';
        lbVideo.pause();

        if (type === 'video') {
            lbVideo.src = src;
            lbVideo.style.display = 'block';
            lbVideo.play();
        } else {
            lbImg.src = src;
            lbImg.style.display = 'block';
        }

        lbCounter.textContent = `${current + 1} / ${items.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lbVideo.pause();
        lbVideo.src = '';
        lbImg.src = '';
        document.body.style.overflow = '';
    }

    // Clicks on gallery items (works for both img and video children)
    items.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbBackdrop.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => openLightbox(current - 1));
    lbNext.addEventListener('click', () => openLightbox(current + 1));

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') openLightbox(current - 1);
        if (e.key === 'ArrowRight') openLightbox(current + 1);
    });
});
