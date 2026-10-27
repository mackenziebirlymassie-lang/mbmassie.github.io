/**
 * MAIN JAVASCRIPT ENTRYPOINT
 * Modular architectural orchestrator
 */
import { initScrollReveal } from './modules/reveal.js';
import { initNavigation }   from './modules/navigation.js';
import { initContactForm }  from './modules/contact.js';
import { initCliBox }       from './modules/cli.js';
import { initKeyNav }       from './modules/keynav.js';

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavigation();
    initContactForm();
    initCliBox();
    initKeyNav();
});

