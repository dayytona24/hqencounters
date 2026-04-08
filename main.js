/* ============================================================
   HQ Ranch Encounters — main.js
   Handles: mobile nav toggle, sticky nav shadow, lightbox
   ============================================================ */

// ── MOBILE NAV TOGGLE ──
// When the hamburger button is clicked, we add/remove the
// "open" class on the nav links list. CSS then shows or hides it.
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when any link is clicked (good for same-page anchors)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── STICKY NAV SHADOW ──
// Adds a slightly stronger shadow when the user has scrolled down.
// This gives a subtle "lifted" look so the nav feels layered.
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 3px 16px rgba(0,0,0,0.35)';
    } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.28)';
    }
  });
}

// ── LIGHTBOX ──
// Clicking any image inside .gallery-grid opens a fullscreen overlay.
// Clicking the overlay or the X button closes it.
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

if (lightbox && lightboxImg) {
  // Attach click listeners to every gallery image
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    });
  });

  // Close on X button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close when clicking outside the image (on the dark overlay)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }
}

// ── CONTACT FORM SUBMISSION ──
// A simple client-side handler. In production you'd replace
// the console.log with a real fetch() call to your backend or
// a service like Formspree / EmailJS.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the page from reloading
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sent! We\'ll be in touch.';
    btn.disabled = true;
    btn.style.background = '#4a6741';
    // In a real site: fetch('/api/contact', { method: 'POST', body: new FormData(contactForm) })
  });
}

// ── BOOKING FORM SUBMISSION ──
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    btn.textContent = 'Request Received! We\'ll confirm shortly.';
    btn.disabled = true;
    btn.style.background = '#4a6741';
  });
}
