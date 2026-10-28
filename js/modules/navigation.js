/**
 * NAVIGATION, RESPONSIVE DRAWER & SCROLL SPY
 */
export function initNavigation() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const sheet  = document.getElementById('sheet');
    const navLinks = document.querySelectorAll('.hdr-link');
    const sections = document.querySelectorAll('section[id]');

    if (!navbar) return;

    // Navbar background & ScrollSpy on scroll
    const onScroll = () => {
        navbar.classList.toggle('solid', window.scrollY > 40);

        // ScrollSpy
        let currentSectionId = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach((sec) => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.style.color = 'var(--ink)';
            } else {
                link.style.color = '';
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!burger || !sheet) return;

    // Mobile menu toggle
    burger.addEventListener('click', () => {
        const isOpen = burger.classList.toggle('open');
        sheet.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    const sheetLinks = sheet.querySelectorAll('.sheet-link');
    sheetLinks.forEach((link) => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            sheet.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
        });
    });
}
