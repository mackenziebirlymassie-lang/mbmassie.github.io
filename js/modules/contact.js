/**
 * CONTACT FORM DISPATCH
 * Asynchronous form submission with loading, validation, and feedback states.
 * Directly routes client inquiries to kenziemassie13@gmail.com via FormSubmit AJAX.
 * Compliant with Indonesian Personal Data Protection Law (UU PDP No. 27/2022) & GDPR.
 */
export function initContactForm() {
    const form = document.getElementById('contact-form');
    const msg = document.getElementById('form-msg');
    if (!form || !msg) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.form-submit');
        if (!submitBtn) return;

        const consentCheck = form.querySelector('#consent-check');
        if (consentCheck && !consentCheck.checked) {
            msg.textContent = 'Compliance Requirement: Please acknowledge the Privacy Policy and Terms of Service to proceed.';
            msg.classList.add('show');
            return;
        }

        // Anti-spam honeypot verification
        const honeyField = form.querySelector('input[name="_honey"]');
        if (honeyField && honeyField.value) {
            // Silently drop bot submission
            msg.textContent = 'Message transmitted successfully.';
            msg.classList.add('show');
            form.reset();
            return;
        }

        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting...';

        try {
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());

            // Affirmative legal consent verification
            payload._legal_consent = 'Affirmative Consent Granted under Indonesian UU PDP No. 27/2022 & GDPR';

            // Target FormSubmit AJAX endpoint directly
            const endpoint = 'https://formsubmit.co/ajax/kenziemassie13@gmail.com';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json().catch(() => null);

            if (response.ok && (!data || data.success === 'true' || data.success === true || !data.error)) {
                if (data && data.message && data.message.toLowerCase().includes('activation')) {
                    msg.textContent = 'Message received! Note: FormSubmit has sent a one-time activation confirmation to kenziemassie13@gmail.com.';
                } else {
                    msg.textContent = 'Message transmitted successfully. It has been routed directly to kenziemassie13@gmail.com.';
                }
                msg.classList.add('show');
                form.reset();
            } else {
                const note = (data && data.message) ? data.message : 'Unable to complete transmission.';
                msg.textContent = `Transmission notice: ${note} You can also email directly to kenziemassie13@gmail.com`;
                msg.classList.add('show');
            }
        } catch (error) {
            msg.textContent = 'Network notice: Unable to complete transmission. You can email directly to kenziemassie13@gmail.com';
            msg.classList.add('show');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;

            setTimeout(() => {
                msg.classList.remove('show');
            }, 8000);
        }
    });
}
