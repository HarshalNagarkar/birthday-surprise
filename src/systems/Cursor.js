/**
 * ═══════════════════════════════════════════════════════════
 * CUSTOM CURSOR SYSTEM — Desktop only
 * ═══════════════════════════════════════════════════════════
 * Smooth lerp-based cursor with spring physics, button hovers,
 * gallery image "VIEW" morphing badge, and click ripples.
 * Automatically disabled on touch devices.
 */

import { lerp } from '../utils/math.js';
import { el, isTouchDevice, prefersReducedMotion } from '../utils/dom.js';

export function initCursor() {
  if (isTouchDevice()) return () => {};

  const dot = el('div', { className: 'cursor-dot' });
  const ring = el('div', { className: 'cursor-ring' });
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX;
  let dotY = mouseY;
  let ringX = mouseX;
  let ringY = mouseY;
  let isVisible = false;
  let raf;

  const dotSpeed = prefersReducedMotion() ? 1 : 0.28;
  const ringSpeed = prefersReducedMotion() ? 1 : 0.14;

  // Track pointer position
  document.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });

  // Hide when pointer leaves window
  document.addEventListener('pointerleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  // Click feedback
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    dot.classList.add('is-clicking');

    const ripple = el('div', { className: 'cursor-ripple' });
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  document.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'touch') return;
    dot.classList.remove('is-clicking');
  });

  // Hover detection
  const interactiveSelector = 'button, a, [role="button"], .gallery-item, .opening-enter, .secret-btn, .finale-replay, .lightbox-close, .lightbox-nav-btn, .video-play-btn, .video-fullscreen-btn';
  const imageSelector = '.gallery-item, .lightbox-img-wrap';

  document.addEventListener('pointerover', (e) => {
    if (e.pointerType === 'touch') return;
    const target = e.target.closest(interactiveSelector);
    if (target) {
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');

      if (target.closest(imageSelector)) {
        ring.classList.add('is-image');
        dot.classList.add('is-image');
      }
    }
  });

  document.addEventListener('pointerout', (e) => {
    if (e.pointerType === 'touch') return;
    const target = e.target.closest(interactiveSelector);
    if (target) {
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
      ring.classList.remove('is-image');
      dot.classList.remove('is-image');
    }
  });

  // Animation loop
  function tick() {
    dotX = lerp(dotX, mouseX, dotSpeed);
    dotY = lerp(dotY, mouseY, dotSpeed);
    ringX = lerp(ringX, mouseX, ringSpeed);
    ringY = lerp(ringY, mouseY, ringSpeed);

    dot.style.transform = `translate3d(${dotX - 3}px, ${dotY - 3}px, 0)`;
    ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;

    raf = requestAnimationFrame(tick);
  }

  tick();

  return () => {
    cancelAnimationFrame(raf);
    dot.remove();
    ring.remove();
  };
}
