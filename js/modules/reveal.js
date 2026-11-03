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
            // Immediate reveal if already in initial viewport
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
                el.classList.add('is-revealed');
            } else {
                revealObserver.observe(el);
            }
        });

        // Fail-safe timeout for headless snapshots or slow render contexts
        setTimeout(() => {
            revealElements.forEach((el) => {
                if (!el.classList.contains('is-revealed')) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 1.2) {
                        el.classList.add('is-revealed');
                    }
                }
            });
        }, 1200);
    } else {
        revealElements.forEach((el) => {
            el.classList.add('is-revealed');
        });
    }
}

