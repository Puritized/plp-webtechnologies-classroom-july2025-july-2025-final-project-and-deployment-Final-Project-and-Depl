/* main.js - Atlas Studio */
// DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Close nav when a link clicked (mobile)
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
  }));

  // Simple scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

  // Contact form validation (client-side)
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      // simple email regex
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let ok = true;
      [name, email, message].forEach(i => i.classList.remove('err'));
      if (!name.value.trim()) { ok = false; name.classList.add('err'); }
      if (!emailRe.test(email.value.trim())) { ok = false; email.classList.add('err'); }
      if (!message.value.trim() || message.value.trim().length < 10) { ok = false; message.classList.add('err'); }

      if (!ok) {
        alert('Please complete the form correctly. Ensure message ≥ 10 characters and email is valid.');
        return;
      }

      // For a static site, you would send to an API or Netlify Forms. Here we'll simulate success.
      form.querySelector('button[type="submit"]').disabled = true;
      form.querySelector('button[type="submit"]').textContent = 'Sending...';

      // Simulate network delay
      setTimeout(() => {
        form.reset();
        form.querySelector('button[type="submit"]').disabled = false;
        form.querySelector('button[type="submit"]').textContent = 'Send Message';
        alert('Thanks — your message has been sent (simulated).');
      }, 900);
    });
  }
});
