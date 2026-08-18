/**
 * ═══════════════════════════════════════════════════════════
 * FINAL REVEAL — EMOTIONAL GRAND CLIMAX
 * ═══════════════════════════════════════════════════════════
 * Staged cinematic reveal ending with massive typography,
 * background aura metamorphosis, and replay flow.
 */

import { el, prefersReducedMotion } from '../utils/dom.js';
import { content } from '../content/birthdayContent.js';
import { initFinaleReveal } from '../systems/ScrollReveal.js';

export function createFinale(onReplay) {
  const section = el('section', {
    className: 'section finale-section',
    id: 'finale',
  });

  const bg = el('div', { className: 'finale-bg' });

  // Staged text elements
  const line1 = el('p', { className: 'finale-line', text: content.finale.line1 });
  const line2 = el('p', { className: 'finale-line', text: content.finale.line2 });
  const birthday = el('h2', {
    className: 'finale-birthday',
    html: `${content.finale.birthdayText} <em class="heart-icon">❤️</em>`,
  });
  const closing = el('p', { className: 'finale-closing', text: content.finale.closingLine });

  // Replay button
  const replaySvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`;
  const replayBtn = el('button', {
    className: 'finale-replay',
    html: `${replaySvg}<span>${content.finale.replayText}</span>`,
  });

  const contentWrap = el('div', { className: 'finale-content', children: [
    line1, line2, birthday, closing, replayBtn,
  ]});

  section.appendChild(bg);
  section.appendChild(contentWrap);

  // ─── Staged reveal sequence ───
  requestAnimationFrame(() => {
    initFinaleReveal(section, [
      () => line1.classList.add('is-revealed'),
      () => line2.classList.add('is-revealed'),
      () => birthday.classList.add('is-revealed'),
      () => {
        closing.classList.add('is-revealed');
        replayBtn.classList.add('is-revealed');
      },
    ]);
  });

  // ─── Replay handler ───
  replayBtn.addEventListener('click', () => {
    if (onReplay) onReplay();
  });

  return section;
}
