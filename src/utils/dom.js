/**
 * DOM Utility helpers
 */

/** Create an element with optional classes and attributes */
export function el(tag, opts = {}) {
  const elem = document.createElement(tag);
  if (opts.className) elem.className = opts.className;
  if (opts.id) elem.id = opts.id;
  if (opts.text) elem.textContent = opts.text;
  if (opts.html) elem.innerHTML = opts.html;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) {
      elem.setAttribute(k, v);
    }
  }
  if (opts.style) Object.assign(elem.style, opts.style);
  if (opts.children) {
    for (const child of opts.children) {
      if (child) elem.appendChild(child);
    }
  }
  return elem;
}

/** Query shorthand */
export const qs = (sel, parent = document) => parent.querySelector(sel);
export const qsa = (sel, parent = document) => [...parent.querySelectorAll(sel)];

/** Check if user prefers reduced motion */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Check if device is touch-primary */
export function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches;
}
