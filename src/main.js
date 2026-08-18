/**
 * ═══════════════════════════════════════════════════════════
 * MAIN ENTRY POINT
 * ═══════════════════════════════════════════════════════════
 * Orchestrates the entire birthday experience.
 * CSS is loaded via <link> tags in index.html.
 */

// Systems
import { initCursor } from './systems/Cursor.js';
import { initTouchFeedback } from './systems/TouchFeedback.js';
import { createMusicPlayer } from './systems/MusicPlayer.js';
import { initScrollReveals } from './systems/ScrollReveal.js';

// Sections
import { createOpening } from './sections/Opening.js';
import { createTraits } from './sections/Traits.js';
import { createGallery } from './sections/Gallery.js';
import { createVideo } from './sections/Video.js';
import { createSecret } from './sections/Secret.js';
import { createLetter } from './sections/Letter.js';
import { createFinale } from './sections/Finale.js';

import { qs } from './utils/dom.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize systems
  initCursor();
  initTouchFeedback();
  createMusicPlayer();

  const mainContent = qs('#mainContent');

  // Build main content sections
  function buildMainContent() {
    mainContent.innerHTML = '';
    mainContent.appendChild(createTraits());
    mainContent.appendChild(createGallery());
    mainContent.appendChild(createVideo());
    mainContent.appendChild(createSecret());
    mainContent.appendChild(createLetter());
    mainContent.appendChild(createFinale(handleReplay));
  }

  // Build the main experience content
  buildMainContent();

  // Create and show opening
  function showOpening() {
    const opening = createOpening(() => {
      // Callback when ENTER is clicked
      mainContent.classList.add('is-visible');
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Initialize scroll reveals after content is visible
      requestAnimationFrame(() => {
        initScrollReveals();
      });
    });
    document.body.appendChild(opening);
  }

  // Replay handler
  function handleReplay() {
    // Fade out main content
    mainContent.style.transition = 'opacity 0.8s var(--ease-out)';
    mainContent.style.opacity = '0';

    setTimeout(() => {
      mainContent.classList.remove('is-visible');
      mainContent.style.opacity = '';
      mainContent.style.transition = '';

      // Reset video
      const video = qs('#mainVideo');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      // Rebuild sections (reset all states)
      buildMainContent();

      window.scrollTo({ top: 0, behavior: 'instant' });

      // Show opening again
      showOpening();
    }, 800);
  }

  // Start the experience
  showOpening();
});
