/**
 * FAQ ACCORDION MODULE
 * Accessible keyboard navigation and state management
 */
export function initFaqAccordion() {
    const faqButtons = document.querySelectorAll('.faq-btn');
    if (!faqButtons.length) return;

    faqButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            if (!item) return;

            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            
            // Optionally close other items for clean single-item focus
            faqButtons.forEach((otherBtn) => {
                const otherItem = otherBtn.closest('.faq-item');
                if (otherItem && otherItem !== item) {
                    otherItem.classList.remove('is-open');
                    otherBtn.setAttribute('aria-expanded', 'false');
                }
            });

            if (isExpanded) {
                item.classList.remove('is-open');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
}
