/**
 * ═══════════════════════════════════════════════════════════
 * CINEMATIC VIDEO SECTION
 * ═══════════════════════════════════════════════════════════
 * Wide theater container with letterbox bars, ambient glow,
 * custom play/pause overlay, and fullscreen toggle.
 */

import { el } from '../utils/dom.js';
import { content } from '../content/birthdayContent.js';

export function createVideo() {
  const section = el('section', {
    className: 'section video-section',
    id: 'video',
  });

  // Header
  const header = el('div', { className: 'section-header', attrs: { 'data-reveal': '' }, children: [
    el('span', { className: 'section-tag', text: '✦ Cinema' }),
    el('h2', { className: 'section-title', text: content.video.title || 'Press Play' }),
    el('p', { className: 'section-subtitle', text: content.video.subtitle || 'Some moments deserve to be replayed in full motion.' }),
  ]});

  // Video element
  const video = el('video', {
    id: 'mainVideo',
    attrs: {
      preload: 'metadata',
      playsinline: '',
      poster: content.video.poster,
    },
  });

  const source = el('source', {
    attrs: { src: content.video.src, type: 'video/mp4' },
  });
  video.appendChild(source);

  // Custom Play Overlay
  const playBtnSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
  const playBtn = el('button', {
    className: 'video-play-btn',
    attrs: { 'aria-label': 'Play video' },
    html: playBtnSvg,
  });

  const playLabel = el('div', { className: 'video-play-label', text: 'PRESS PLAY' });

  const playOverlay = el('div', {
    className: 'video-play-overlay',
    children: [playBtn, playLabel],
  });

  // Fullscreen button
  const fsSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
  const fsBtn = el('button', {
    className: 'video-fullscreen-btn',
    attrs: { 'aria-label': 'Fullscreen' },
    html: fsSvg,
  });

  // Cinema Frame
  const frame = el('div', { className: 'video-frame', attrs: { 'data-reveal': '' }, children: [
    el('div', { className: 'video-letterbox top' }),
    video,
    el('div', { className: 'video-letterbox bot' }),
    playOverlay,
    fsBtn,
  ]});

  const container = el('div', { className: 'video-container', children: [frame] });

  section.appendChild(header);
  section.appendChild(container);
  section.appendChild(el('div', { className: 'section-divider', style: { marginTop: 'clamp(4rem, 8vh, 6rem)' } }));

  // ─── Interaction logic ───
  function tryPlay() {
    video.play().then(() => {
      playOverlay.classList.add('is-hidden');
    }).catch(() => {
      playLabel.textContent = content.video.fallbackText;
    });
  }

  playBtn.addEventListener('click', tryPlay);

  video.addEventListener('click', () => {
    if (video.paused) {
      tryPlay();
    } else {
      video.pause();
    }
  });

  video.addEventListener('ended', () => {
    playOverlay.classList.remove('is-hidden');
    playLabel.textContent = 'REPLAY';
  });

  video.addEventListener('pause', () => {
    setTimeout(() => {
      if (video.paused && !video.ended) {
        playOverlay.classList.remove('is-hidden');
        playLabel.textContent = 'CONTINUE';
      }
    }, 1200);
  });

  // Fullscreen
  fsBtn.addEventListener('click', () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen(); // iOS
    }
  });

  // Handle video errors gracefully
  video.addEventListener('error', () => {
    playLabel.textContent = content.video.fallbackText;
  });

  return section;
}
