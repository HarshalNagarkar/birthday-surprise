/**
 * ═══════════════════════════════════════════════════════════
 * SECRET — "Don't click this"
 * ═══════════════════════════════════════════════════════════
 * Playful hidden interaction. Metamorphoses into a deep romantic
 * dusk ambiance with full-bleed luminous canvas bloom.
 */

import { el, prefersReducedMotion } from '../utils/dom.js';
import { content } from '../content/birthdayContent.js';

export function createSecret() {
  const section = el('section', {
    className: 'section secret-section',
    id: 'secret',
  });

  // Particles canvas mounted directly to section (spans full background)
  const canvas = el('canvas', { className: 'secret-particles' });

  const wrap = el('div', { className: 'secret-content' });

  // Trigger
  const triggerText = el('p', { className: 'secret-trigger-text', text: content.secret.triggerLine });
  const triggerBtn = el('button', { className: 'secret-btn', text: content.secret.buttonText });
  const trigger = el('div', { className: 'secret-trigger', children: [triggerText, triggerBtn] });

  // Reveal content
  const reveal = el('div', { className: 'secret-reveal', children: [
    el('h3', { className: 'secret-reveal-title', text: content.secret.revealTitle }),
    el('p', { className: 'secret-reveal-message', text: content.secret.revealMessage }),
    el('p', { className: 'secret-reveal-extra', text: content.secret.revealExtra }),
  ]});

  wrap.appendChild(trigger);
  wrap.appendChild(reveal);

  section.appendChild(canvas);
  section.appendChild(wrap);

  // ─── Click handler ───
  triggerBtn.addEventListener('click', () => {
    trigger.classList.add('is-hidden');
    section.classList.add('is-revealed');

    // Launch luminous bloom
    if (!prefersReducedMotion()) {
      launchBloom(canvas, section);
    }

    setTimeout(() => {
      reveal.classList.add('is-visible');
    }, 450);
  });

  return section;
}

/**
 * Soft luminous particle bloom — expanding glowing orbs with dusk tone.
 */
function launchBloom(canvas, container) {
  const ctx = canvas.getContext('2d');
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const particles = [];
  const colors = [
    'rgba(253, 164, 184, ',  // rose-300
    'rgba(214, 183, 230, ',  // lavender
    'rgba(255, 235, 240, ',  // soft blush
    'rgba(251, 224, 208, ',  // peach
    'rgba(254, 205, 214, ',  // rose-200
  ];

  // Create 60 soft glowing orbs
  for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.8 + Math.random() * 2.8;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.4,
      size: 3 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: 0.004 + Math.random() * 0.007,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    for (const p of particles) {
      if (p.life <= 0) continue;
      alive = true;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.012; // gentle float gravity
      p.vx *= 0.992;
      p.life -= p.decay;

      const alpha = Math.max(0, p.life * 0.75);

      // Glow halo
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
      gradient.addColorStop(0, p.color + alpha + ')');
      gradient.addColorStop(1, p.color + '0)');

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Soft core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (alpha * 0.9) + ')';
      ctx.fill();
    }

    if (alive) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}
