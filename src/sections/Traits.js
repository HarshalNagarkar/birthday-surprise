/**
 * ═══════════════════════════════════════════════════════════
 * TRAITS — "Things that make you, you"
 * ═══════════════════════════════════════════════════════════
 * Asymmetric spatial layout with 1 featured central anchor card
 * and offset floating satellite cards.
 */

import { el } from '../utils/dom.js';
import { content } from '../content/birthdayContent.js';

export function createTraits() {
  const section = el('section', {
    className: 'section traits-section',
    id: 'traits',
  });

  // Header
  const header = el('div', { className: 'section-header', attrs: { 'data-reveal': '' }, children: [
    el('span', { className: 'section-tag', text: '✦ Essence' }),
    el('h2', { className: 'section-title', text: 'Things That Make You, You' }),
    el('p', { className: 'section-subtitle', text: 'A few unmistakable things noticed along the way.' }),
  ]});

  // Spatial Grid
  const spatialWrap = el('div', { className: 'traits-spatial-wrap' });
  const grid = el('div', { className: 'traits-grid' });

  content.traits.forEach((trait, i) => {
    const isFeatured = !!trait.featured;
    const card = el('div', {
      className: `trait-card ${isFeatured ? 'is-featured' : ''}`,
      attrs: {
        'data-reveal': '',
        'data-reveal-delay': String(i * 100),
        tabindex: '0',
      },
      children: [
        el('span', { className: 'trait-tag', text: trait.tag || `0${i + 1} / Trait` }),
        el('h3', { className: 'trait-title', text: trait.title }),
        el('p', { className: 'trait-desc', text: trait.description }),
      ],
    });
    grid.appendChild(card);
  });

  spatialWrap.appendChild(grid);
  section.appendChild(header);
  section.appendChild(spatialWrap);
  section.appendChild(el('div', { className: 'section-divider', style: { marginTop: 'clamp(4rem, 8vh, 6rem)' } }));

  return section;
}
