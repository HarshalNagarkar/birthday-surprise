/**
 * ═══════════════════════════════════════════════════════════
 * SCROLL REVEAL SYSTEM
 * ═══════════════════════════════════════════════════════════
 * IntersectionObserver-based scroll animations.
 * Pauses animations when off-screen for performance.
 */

import { prefersReducedMotion } from '../utils/dom.js';

/**
 * Observe elements with [data-reveal] and add 'is-revealed' class
 * when they enter the viewport.
 */
export function initScrollReveals() {
  if (prefersReducedMotion()) {
    // Show everything immediately
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('is-revealed');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Staggered reveal for children of a container.
 * Each child gets a progressive delay.
 */
export function initStaggerReveal(containerSelector, childSelector, staggerMs = 120) {
  if (prefersReducedMotion()) {
    document.querySelectorAll(`${containerSelector} ${childSelector}`).forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = container.querySelectorAll(childSelector);
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('is-revealed');
            }, i * staggerMs);
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px',
    });

    observer.observe(container);
  });
}

/**
 * Observe elements for the finale staged reveal.
 * Triggers callbacks in sequence with delays.
 */
export function initFinaleReveal(containerEl, steps) {
  if (prefersReducedMotion()) {
    steps.forEach(step => step());
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let cumDelay = 0;
        steps.forEach((step, i) => {
          setTimeout(step, cumDelay);
          cumDelay += (i === 0 ? 800 : i === steps.length - 1 ? 600 : 1200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
  });

  observer.observe(containerEl);
}
