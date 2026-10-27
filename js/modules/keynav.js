/**
 * VIM / SECTION HOTKEY NAVIGATION
 * Enables 'J' and 'K' keys to cycle forward and backward through document sections
 */
export function initKeyNav() {
    const sections = Array.from(document.querySelectorAll('section'));
    if (!sections.length) return;

    window.addEventListener('keydown', (e) => {
        // Disallow when typing in form inputs or modals
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

        if (e.key === 'j' || e.key === 'J') {
            e.preventDefault();
            const scrollY = window.scrollY + 80;
            for (let i = 0; i < sections.length; i++) {
                const top = sections[i].offsetTop;
                if (top > scrollY) {
                    sections[i].scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        } else if (e.key === 'k' || e.key === 'K') {
            e.preventDefault();
            const scrollY = window.scrollY - 80;
            for (let i = sections.length - 1; i >= 0; i--) {
                const top = sections[i].offsetTop;
                if (top < scrollY) {
                    sections[i].scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        }
    });
}

