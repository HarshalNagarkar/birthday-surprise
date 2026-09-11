/**
 * ═══════════════════════════════════════════════════════════
 * BIRTHDAY CONTENT CONFIGURATION
 * ═══════════════════════════════════════════════════════════
 *
 * Edit THIS FILE to personalize the entire experience.
 * You should not need to touch any other file.
 *
 * After editing, just refresh the browser.
 */

export const content = {

  // ─── OPENING SCREEN ───
  hero: {
    greeting: 'Hey, Birthday Girl',
    subtitle: 'I have made something for you hope you like it.',
    enterText: 'ENTER',
    hint: 'Move your cursor & touch to explore',
  },

  // ─── "THINGS THAT MAKE YOU, YOU" SECTION ───
  // Asymmetric spatial arrangement: 1 central featured trait + 4 floating satellite traits
  traits: [
    {
      id: 'smile',
      featured: true,
      title: 'That genuine smile.',
      description: 'The one that shows up completely unscripted and instantly makes everything in the room feel lighter, warmer, and infinitely better.',
    },
    {
      id: 'energy',
      featured: false,
      title: 'Your chaotic energy.',
      description: 'You turn the most ordinary Tuesday into something worth laughing about for weeks.',
    },
    {
      id: 'presence',
      featured: false,
      title: 'Making everyday fun.',
      description: 'Grocery runs, stuck in traffic, doing absolutely nothing — it\'s never dull when you\'re around.',
    },
    {
      id: 'heart',
      featured: false,
      title: 'How you care so quietly.',
      description: 'You never make a performance out of your kindness, but everyone around you feels it deeply.',
    },
    {
      id: 'laugh',
      featured: false,
      title: 'Your infectious laugh.',
      description: 'Genuinely one of the single best sounds in the universe. That is not even an exaggeration.',
    },
  ],

  // ─── PHOTO GALLERY ───
  // Editorial collage layout with curated moments
  photos: [
    {
      id: 'main',
      src: 'assets/images/photo-main.png',
      alt: 'Favorite Portrait',
      role: 'hero',
      span: 'tall',
    },
    {
      id: 'float-1',
      src: 'assets/images/photo-float-1.jpg',
      alt: 'Candid Moment',
      role: 'accent',
      span: 'standard',
    },
    {
      id: 'float-2',
      src: 'assets/images/photo-float-2.png',
      alt: 'Adventures Together',
      role: 'accent',
      span: 'standard',
    },
    {
      id: 'memory-1',
      src: 'assets/images/memory-1.jpg',
      alt: 'The Day It All Started',
      role: 'satellite',
      span: 'wide',
    },
    {
      id: 'memory-2',
      src: 'assets/images/memory-2.jpg',
      alt: 'Unplanned Roadtrip',
      role: 'satellite',
      span: 'standard',
    }

  ],

  // ─── VIDEO SECTION ───
  video: {
    title: 'A Small Edit For You',
    subtitle: 'Some moments deserve to be replayed in full motion.',
    src: 'assets/videos/birthday-video.mp4',
    poster: 'assets/images/hero.jpg',
    fallbackText: 'A special video snippet is reserved here.',
  },

  // ─── "DON'T CLICK THIS" SECRET ───
  secret: {
    triggerLine: "Whatever you do, don't click this.",
    buttonText: 'Seriously, do not touch.',
    revealTitle: 'Curiosity looks good on you.',
    revealMessage: 'This part only exists because you couldn\'t resist finding out what was behind the door. That fearless, playful curiosity is one of the thousand reasons you are so deeply loved.',
    revealExtra: 'Happy Birthday to my favorite troublemaker. ❤️',
  },

  // ─── PERSONAL LETTER ───
  letter: {
    heading: 'A Letter For You',
    paragraphs: [
      'Dear birthday girl,',
      'If I had to put into words what you mean to everyone who knows you, a website wouldn’t be nearly enough. But this is a small corner of the world built just to celebrate your existence.',
      'Thank you for being someone who brings so much natural warmth, effortless humor, and genuine kindness everywhere you go.',
      'May this upcoming year be overflowing with unexpected adventures, dreams falling effortlessly into place, and reasons to laugh until your stomach hurts.',
      'Never lose the spark that makes you so uniquely, undeniably you.',
    ],
    signoff: 'With all my heart & love,',
    senderName: 'Always Yours',
  },

  // ─── FINAL REVEAL ───
  finale: {
    line1: 'You made it this far.',
    birthdayText: 'HAPPY BIRTHDAY',
    closingLine: 'May today be as wonderfully radiant as you are.',
    replayText: 'Experience Again',
  },

  // ─── MUSIC ───
  music: {
    src: 'assets/music/background.mp3',
    volume: 0.35,
  },
};
