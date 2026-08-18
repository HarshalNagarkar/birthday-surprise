/**
 * ═══════════════════════════════════════════════════════════
 * OPENING EXPERIENCE
 * ═══════════════════════════════════════════════════════════
 * Cinematic entry with a layered, luminous glass-pearl centerpiece,
 * pointer tracking with specular reflection shifts, and
 * seamless transition into the main experience.
 */

import { el, prefersReducedMotion, isTouchDevice } from '../utils/dom.js';
import { lerp } from '../utils/math.js';
import { content } from '../content/birthdayContent.js';
import { showMusicToggle, playMusic } from '../systems/MusicPlayer.js';

export function createOpening(onEnter) {
  const section = el('section', { id: 'opening' });

  // Ambient background blobs
  const ambient = el('div', { className: 'opening-ambient', children: [
    el('div', { className: 'opening-ambient-orb' }),
    el('div', { className: 'opening-ambient-orb' }),
    el('div', { className: 'opening-ambient-orb' }),
  ]});

  // Centerpiece: Luminous Pearl/Glass Orb with Specular Highlight
  const specular = el('div', { className: 'opening-orb-specular' });
  const orb = el('div', { className: 'opening-orb', children: [specular] });
  const ring1 = el('div', { className: 'opening-orb-ring' });
  const ring2 = el('div', { className: 'opening-orb-ring-2' });

  const orbWrap = el('div', { className: 'opening-orb-wrap', children: [
    ring2, ring1, orb,
  ]});

  // Content
  const greeting = el('h1', {
    className: 'opening-greeting',
    html: `${content.hero.greeting} <em class="heart-icon">❤️</em>`,
  });

  const subtitle = el('p', {
    className: 'opening-subtitle',
    text: content.hero.subtitle,
  });

  const enterBtn = el('button', {
    className: 'opening-enter',
    attrs: { 'aria-label': 'Enter the experience' },
    children: [
      el('span', { text: content.hero.enterText }),
      el('div', { className: 'opening-enter-pulse' }),
    ],
  });

  const contentWrap = el('div', { className: 'opening-content', children: [
    greeting, subtitle, enterBtn,
  ]});

  section.appendChild(ambient);
  section.appendChild(orbWrap);
  section.appendChild(contentWrap);

  // ─── Pointer tracking on orb & specular reflection ───
  let pointerX = 0;
  let pointerY = 0;
  let orbOffsetX = 0;
  let orbOffsetY = 0;
  let specOffsetX = 0;
  let specOffsetY = 0;

  if (!isTouchDevice() && !prefersReducedMotion()) {
    const handlePointer = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      pointerX = (e.clientX - cx) / cx; // -1 to 1
      pointerY = (e.clientY - cy) / cy;
    };

    window.addEventListener('pointermove', handlePointer);

    let raf;
    function trackPointer() {
      orbOffsetX = lerp(orbOffsetX, pointerX * 22, 0.05);
      orbOffsetY = lerp(orbOffsetY, pointerY * 16, 0.05);
      specOffsetX = lerp(specOffsetX, pointerX * 18, 0.08);
      specOffsetY = lerp(specOffsetY, pointerY * 14, 0.08);

      orbWrap.style.transform = `translate(calc(-50% + ${orbOffsetX}px), calc(-50% + ${orbOffsetY}px))`;
      specular.style.transform = `translate(${specOffsetX}px, ${specOffsetY}px) rotate(-30deg)`;
      ring1.style.transform = `translate(calc(-50% + ${-orbOffsetX * 0.5}px), calc(-50% + ${-orbOffsetY * 0.5}px))`;

      raf = requestAnimationFrame(trackPointer);
    }
    trackPointer();

    section._cleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', handlePointer);
    };
  }

  // ─── Intro animation ───
  requestAnimationFrame(() => {
    if (window.gsap) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(greeting, { opacity: 1, y: 0, duration: 1.1, delay: 0.25 })
        .to(subtitle, { opacity: 1, y: 0, duration: 0.85 }, '-=0.6')
        .to(enterBtn, { opacity: 1, y: 0, duration: 0.85 }, '-=0.5');
    } else {
      setTimeout(() => {
        greeting.style.transition = 'opacity 1s var(--ease-out), transform 1s var(--ease-out)';
        greeting.style.opacity = '1';
        greeting.style.transform = 'translateY(0)';
      }, 300);
      setTimeout(() => {
        subtitle.style.transition = 'opacity 0.85s var(--ease-out), transform 0.85s var(--ease-out)';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
      }, 650);
      setTimeout(() => {
        enterBtn.style.transition = 'opacity 0.85s var(--ease-out), transform 0.85s var(--ease-out)';
        enterBtn.style.opacity = '1';
        enterBtn.style.transform = 'translateY(0)';
      }, 950);
    }
  });

  // ─── Enter handler ───
  enterBtn.addEventListener('click', () => {
    playMusic();

    if (window.gsap) {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          section.remove();
          if (section._cleanup) section._cleanup();
          onEnter();
        },
      });

      tl.to(enterBtn, { scale: 0.85, opacity: 0, duration: 0.35 })
        .to(subtitle, { opacity: 0, y: -12, duration: 0.4 }, '-=0.15')
        .to(greeting, { opacity: 0, y: -18, duration: 0.5 }, '-=0.25')
        .to(orbWrap, { scale: 2.2, opacity: 0, filter: 'blur(20px)', duration: 0.9 }, '-=0.35')
        .to(section, { opacity: 0, duration: 0.6 }, '-=0.4');
    } else {
      section.style.transition = 'opacity 0.8s var(--ease-out)';
      section.style.opacity = '0';
      setTimeout(() => {
        section.remove();
        if (section._cleanup) section._cleanup();
        onEnter();
      }, 800);
    }
  });

  return section;
}
