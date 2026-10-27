/**
 * SCROLL REVEAL OBSERVER
 * Graceful progressive enhancement for animated entry points
 */
export function initScrollReveal() {
    document.documentElement.classList.add('js-ready');

    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.08
        });

        revealElements.forEach((el) => {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach((el) => {
            el.classList.add('is-revealed');
        });
    }
}

