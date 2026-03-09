/* ============================================================
   ONG J'AIME ISRAËL — app.js partagé 2026
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- NAVBAR SCROLL --- */
    const nav = document.querySelector('.site-nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* --- MENU MOBILE --- */
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = toggle.querySelector('i');
            icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
        });
        // Ferme au clic sur un lien
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = toggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    /* --- REVEAL AU SCROLL --- */
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const ro = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    ro.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => ro.observe(el));
    }

    /* --- COMPTEURS --- */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        const co = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const el = e.target;
                    const end = parseInt(el.dataset.count);
                    const suffix = el.dataset.suffix || '';
                    const duration = 1800;
                    let start = null;
                    const step = ts => {
                        if (!start) start = ts;
                        const p = Math.min((ts - start) / duration, 1);
                        const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
                        el.textContent = Math.round(ease * end) + suffix;
                        if (p < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                    co.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(el => co.observe(el));
    }

    /* --- LIGHTBOX MAISON --- */
    initLightbox();

    /* --- PARALLAX LÉGER HERO --- */
    const heroBg = document.querySelector('.hero-photo .bg-img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            heroBg.style.transform = `translateY(${y * 0.3}px)`;
        }, { passive: true });
    }
});

/* ---- LIGHTBOX ---- */
function initLightbox() {
    const items = document.querySelectorAll('[data-lb]');
    if (!items.length) return;

    // Créer l'overlay
    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.innerHTML = `
        <div class="lb-content">
            <button class="lb-close" aria-label="Fermer">&#10005;</button>
            <button class="lb-nav lb-prev" aria-label="Précédent">&#8249;</button>
            <img src="" alt="" id="lb-img">
            <button class="lb-nav lb-next" aria-label="Suivant">&#8250;</button>
            <div class="lb-caption" id="lb-cap"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector('#lb-img');
    const lbCap = overlay.querySelector('#lb-cap');
    const allItems = Array.from(items);
    let current = 0;

    function show(idx) {
        current = (idx + allItems.length) % allItems.length;
        const el = allItems[current];
        lbImg.src = el.dataset.lb;
        lbCap.textContent = el.dataset.caption || '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        lbImg.src = '';
    }

    items.forEach((el, i) => el.addEventListener('click', () => show(i)));
    overlay.querySelector('.lb-close').addEventListener('click', close);
    overlay.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
    overlay.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
}
