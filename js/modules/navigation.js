/**
 * NAVIGATION & RESPONSIVE DRAWER
 * Header backdrop threshold, mobile drawer, and HUD scroll spy
 */
export function initNavigation() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const sheet  = document.getElementById('sheet');
    const hudTicks = document.querySelectorAll('.hud-tick');
    const sections = Array.from(document.querySelectorAll('section'));

    if (navbar) {
        const updateNav = () => {
            navbar.classList.toggle('solid', window.scrollY > 40);

            // Scroll spy for HUD ticks
            if (hudTicks.length && sections.length) {
                const scrollPos = window.scrollY + window.innerHeight * 0.35;
                let activeId = sections[0].id;
                for (let i = 0; i < sections.length; i++) {
                    if (sections[i].offsetTop <= scrollPos) {
                        activeId = sections[i].id;
                    }
                }
                hudTicks.forEach((tick) => {
                    const href = tick.getAttribute('href');
                    tick.classList.toggle('active', href === `#${activeId}`);
                });
            }
        };

        window.addEventListener('scroll', updateNav, { passive: true });
        updateNav();
    }

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
