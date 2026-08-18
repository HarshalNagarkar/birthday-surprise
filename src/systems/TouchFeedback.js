/**
 * ═══════════════════════════════════════════════════════════
 * TOUCH FEEDBACK — Mobile interactions
 * ═══════════════════════════════════════════════════════════
 * Touch ripple and press feedback for mobile devices.
 */

import { el } from '../utils/dom.js';

export function initTouchFeedback() {
  const interactiveSelector = 'button, a, [role="button"], .trait-card, .gallery-hero, .gallery-float';

  // Touch ripple on interactive elements
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;

    const target = e.target.closest(interactiveSelector);
    if (!target) return;

    // Add press feedback
    target.style.transition = 'transform 0.15s ease-out';
    target.style.transform = (target.style.transform || '') + ' scale(0.97)';

    // Create ripple
    const rect = target.getBoundingClientRect();
    const ripple = el('div', { className: 'touch-ripple' });
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

    // Need relative positioning on parent
    const currentPos = getComputedStyle(target).position;
    if (currentPos === 'static') {
      target.style.position = 'relative';
    }
    target.style.overflow = 'hidden';
    target.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });

  // Release press feedback
  document.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'touch') return;

    const target = e.target.closest(interactiveSelector);
    if (!target) return;

    target.style.transform = target.style.transform.replace(' scale(0.97)', '');
  });

  document.addEventListener('pointercancel', (e) => {
    if (e.pointerType !== 'touch') return;
    const target = e.target.closest(interactiveSelector);
    if (target) {
      target.style.transform = target.style.transform.replace(' scale(0.97)', '');
    }
  });
}
