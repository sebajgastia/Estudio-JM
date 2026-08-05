

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll ---- */
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Hamburger móvil ---- */
  const toggle = document.getElementById('navToggle');
  const navUl  = document.querySelector('header ul');
  if (toggle && navUl) {
    toggle.addEventListener('click', () => {
      navUl.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navUl.classList.contains('open'));
    });
    navUl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navUl.classList.remove('open')));
  }

  /* ---- Active nav link ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header ul li a').forEach(a => {
    const linkFile = a.getAttribute('href').split('/').pop();
    if (linkFile === currentPath) a.classList.add('active');
  });

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---- Formulario de contacto ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const status = document.getElementById('formStatus');

    const rules = {
      nombre:   v => v.trim().length >= 2   || 'Ingresá tu nombre.',
      email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email inválido.',
      telefono: v => v.trim().length >= 6   || 'Ingresá un teléfono.',
      mensaje:  v => v.trim().length >= 15  || 'El mensaje es muy corto.',
    };

    function validate(field) {
      const r = rules[field.name]?.(field.value);
      const err = contactForm.querySelector(`[data-err="${field.name}"]`);
      const ok  = r === true;
      if (err) err.textContent = ok ? '' : r;
      field.style.borderColor = ok ? '' : '#b91c1c';
      return ok;
    }

    contactForm.querySelectorAll('input,textarea').forEach(f => {
      f.addEventListener('blur', () => validate(f));
    });

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const fields = [...contactForm.querySelectorAll('input,textarea,select')].filter(f => rules[f.name]);
      const valid  = fields.map(validate).every(Boolean);
      if (!valid) { status.textContent = 'Revisá los campos marcados.'; status.className = 'form-status err'; return; }

      status.textContent = '¡Mensaje enviado! Nos ponemos en contacto a la brevedad.';
      status.className   = 'form-status ok';
      contactForm.reset();
    });
  }

  /* ---- Año en el footer ---- */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
