/**
 * CLI COMMAND SNIPPET UTILITIES
 * One-click clipboard copy with animated visual feedback
 */
export function initCliBox() {
    const cliBox = document.getElementById('cli-copy');
    const badge = document.getElementById('cli-badge');

    if (!cliBox || !badge) return;

    cliBox.addEventListener('click', async () => {
        const cmd = cliBox.getAttribute('data-command') || 'npx massie --dossier';

        try {
            await navigator.clipboard.writeText(cmd);
            badge.textContent = 'COPIED!';
            badge.style.borderColor = 'var(--ink)';
            badge.style.color = 'var(--ink)';

            setTimeout(() => {
                badge.textContent = 'COPY';
                badge.style.borderColor = '';
                badge.style.color = '';
            }, 2500);
        } catch (err) {
            console.error('Failed to copy CLI command:', err);
        }
    });
}

