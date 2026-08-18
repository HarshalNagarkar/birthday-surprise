/**
 * ═══════════════════════════════════════════════════════════
 * PHOTO GALLERY — EDITORIAL COLLAGE
 * ═══════════════════════════════════════════════════════════
 * Cinematic spatial layout with 3D perspective tilt,
 * photo date/title tags, and full-featured lightbox viewer.
 */

import { el, isTouchDevice, prefersReducedMotion } from '../utils/dom.js';
import { content } from '../content/birthdayContent.js';

let lightboxEl = null;
let lightboxImg = null;
let lightboxTitle = null;
let lightboxDate = null;
let lightboxCounter = null;
let currentPhotoIndex = 0;

/** Create a gallery photo item with error handling & tilt */
function createGalleryItem(photo, index) {
  const isHero = photo.role === 'hero';
  const item = el('div', {
    className: `gallery-item ${isHero ? 'is-hero' : ''}`,
    attrs: {
      tabindex: '0',
      role: 'button',
      'aria-label': `View ${photo.title || photo.alt}`,
      'data-reveal': '',
      'data-reveal-delay': String(index * 80),
    },
  });

  const imgWrap = el('div', { className: 'gallery-img-wrap' });
  const img = el('img', {
    attrs: {
      src: photo.src,
      alt: photo.alt,
      loading: isHero ? 'eager' : 'lazy',
    },
  });

  img.addEventListener('error', () => {
    img.style.display = 'none';
    const placeholder = el('div', {
      className: 'img-placeholder',
      children: [
        el('span', { style: { fontSize: '1.8rem' }, text: '📷' }),
        el('span', { text: photo.title || 'Photo Moment' }),
      ],
    });
    imgWrap.appendChild(placeholder);
  });

  imgWrap.appendChild(img);

  // Info Bar with Title & Date
  const infoBar = el('div', { className: 'gallery-info-bar', children: [
    el('span', { className: 'gallery-title', text: photo.title || 'Memory' }),
    el('span', { className: 'gallery-date', text: photo.date || '' }),
  ]});

  item.appendChild(imgWrap);
  item.appendChild(infoBar);

  // 3D Perspective Tilt on Desktop
  if (!isTouchDevice() && !prefersReducedMotion()) {
    item.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * 7;
      const rotateX = -y * 7;
      item.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    item.addEventListener('pointerleave', () => {
      item.style.transition = 'transform 0.5s var(--ease-out)';
      item.style.transform = '';
      setTimeout(() => { item.style.transition = ''; }, 500);
    });
  }

  // Lightbox click trigger
  item.addEventListener('click', () => openLightbox(index));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });

  return item;
}

/** Initialize global lightbox with prev/next controls */
function ensureLightbox() {
  if (lightboxEl) return;

  lightboxImg = el('img', { className: 'lightbox-img', attrs: { alt: '' } });
  const imgWrap = el('div', { className: 'lightbox-img-wrap', children: [lightboxImg] });

  lightboxTitle = el('span', { className: 'lightbox-title' });
  lightboxDate = el('span', { className: 'lightbox-date' });
  lightboxCounter = el('span', { className: 'lightbox-counter' });

  const captionWrap = el('div', { className: 'lightbox-caption-wrap', children: [
    el('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.2rem' }, children: [lightboxTitle, lightboxDate] }),
    lightboxCounter,
  ]});

  const contentWrap = el('div', { className: 'lightbox-content', children: [imgWrap, captionWrap] });

  // Close Button
  const closeBtn = el('button', {
    className: 'lightbox-close',
    attrs: { 'aria-label': 'Close image viewer' },
    html: '✕',
  });

  // Prev / Next Buttons
  const prevBtn = el('button', {
    className: 'lightbox-nav-btn lightbox-prev',
    attrs: { 'aria-label': 'Previous photo' },
    html: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>`,
  });

  const nextBtn = el('button', {
    className: 'lightbox-nav-btn lightbox-next',
    attrs: { 'aria-label': 'Next photo' },
    html: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`,
  });

  lightboxEl = el('div', {
    className: 'lightbox',
    id: 'lightbox',
    attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Photo Gallery Viewer' },
    children: [contentWrap, prevBtn, nextBtn, closeBtn],
  });

  // Handlers
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxEl.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  document.body.appendChild(lightboxEl);
}

function updateLightboxDisplay() {
  const photo = content.photos[currentPhotoIndex];
  if (!photo) return;

  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.alt;
  lightboxTitle.textContent = photo.title || photo.alt;
  lightboxDate.textContent = photo.date || '';
  lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${content.photos.length}`;
}

function openLightbox(index) {
  ensureLightbox();
  currentPhotoIndex = index;
  updateLightboxDisplay();

  requestAnimationFrame(() => {
    lightboxEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
}

function navigateLightbox(delta) {
  currentPhotoIndex = (currentPhotoIndex + delta + content.photos.length) % content.photos.length;
  updateLightboxDisplay();
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.classList.remove('is-open');
  document.body.style.overflow = '';
}

export function createGallery() {
  const section = el('section', {
    className: 'section gallery-section',
    id: 'gallery',
  });

  // Header
  const header = el('div', { className: 'section-header', attrs: { 'data-reveal': '' }, children: [
    el('span', { className: 'section-tag', text: '✦ Gallery' }),
    el('h2', { className: 'section-title', text: 'You, Through My Eyes' }),
    el('p', { className: 'section-subtitle', text: 'Frames of unscripted joy and quiet moments.' }),
  ]});

  const layout = el('div', { className: 'gallery-layout' });

  content.photos.forEach((photo, index) => {
    layout.appendChild(createGalleryItem(photo, index));
  });

  section.appendChild(header);
  section.appendChild(layout);
  section.appendChild(el('div', { className: 'section-divider', style: { marginTop: 'clamp(4rem, 8vh, 6rem)' } }));

  return section;
}
