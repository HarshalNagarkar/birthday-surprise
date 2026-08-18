/**
 * ═══════════════════════════════════════════════════════════
 * PERSONAL LETTER — PHYSICAL STATIONERY OBJECT
 * ═══════════════════════════════════════════════════════════
 * Elegant luxury stationery paper with folded corner,
 * wax seal, and staggered ink-flow line reveals.
 */

import { el, prefersReducedMotion } from '../utils/dom.js';
import { content } from '../content/birthdayContent.js';

export function createLetter() {
  const section = el('section', {
    className: 'section letter-section',
    id: 'letter',
  });

  const heading = el('h2', {
    className: 'letter-heading',
    html: content.letter.heading,
  });

  // Letter body paragraphs
  const body = el('div', { className: 'letter-body' });
  content.letter.paragraphs.forEach((text, i) => {
    const p = el('p', { text, attrs: { 'data-letter-line': String(i) } });
    body.appendChild(p);
  });

  // Signoff
  const signoff = el('p', {
    className: 'letter-signoff',
    html: `${content.letter.signoff}<br><span class="letter-sender">— ${content.letter.senderName}</span>`,
    attrs: { 'data-letter-line': String(content.letter.paragraphs.length) },
  });
  body.appendChild(signoff);

  // Paper container
  const paper = el('div', { className: 'letter-paper', attrs: { 'data-reveal': '' }, children: [
    el('div', { className: 'letter-fold' }),
    heading,
    body,
    el('div', { className: 'letter-seal', text: '❤️' }),
  ]});

  const container = el('div', { className: 'letter-container', children: [paper] });
  section.appendChild(container);

  // ─── Staggered paragraph reveal ───
  if (!prefersReducedMotion()) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lines = body.querySelectorAll('[data-letter-line]');
          lines.forEach((line, i) => {
            setTimeout(() => {
              line.classList.add('is-revealed');
            }, i * 220);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    requestAnimationFrame(() => {
      observer.observe(paper);
    });
  } else {
    requestAnimationFrame(() => {
      body.querySelectorAll('[data-letter-line]').forEach(line => {
        line.classList.add('is-revealed');
      });
    });
  }

  return section;
}
