/**
 * ═══════════════════════════════════════════════════════════
 * MUSIC PLAYER SYSTEM (AUDIO ONLY)
 * ═══════════════════════════════════════════════════════════
 * Background audio player. No floating UI controls.
 * User-initiated playback on entering the experience.
 */

import { el } from '../utils/dom.js';
import { content } from '../content/birthdayContent.js';

let audio = null;
let isPlaying = false;

export function createMusicPlayer() {
  audio = el('audio', {
    attrs: { loop: '', preload: 'auto' },
  });
  const source = el('source', {
    attrs: { src: content.music.src, type: 'audio/mpeg' },
  });
  audio.appendChild(source);
  document.body.appendChild(audio);
  audio.volume = content.music.volume;

  audio.addEventListener('error', () => {
    // Graceful fallback if no audio file present
  });
}

export function showMusicToggle() {
  // UI button removed
}

export function hideMusicToggle() {
  // UI button removed
}

export function playMusic() {
  if (!audio) return;

  const promise = audio.play();
  if (promise !== undefined) {
    promise.then(() => {
      isPlaying = true;
    }).catch(() => {
      isPlaying = false;
    });
  }
}

export function pauseMusic() {
  if (!audio) return;
  audio.pause();
  isPlaying = false;
}

export function isMusicPlaying() {
  return isPlaying;
}
