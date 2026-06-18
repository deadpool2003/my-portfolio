/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — MAIN SCRIPT
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── DOM REFERENCES ─────────────────────────────────
  const links = document.querySelectorAll('.list .link');
  const sections = document.querySelectorAll('section[id]');
  const pageLoader = document.getElementById('pageLoader');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // ─── PAGE LOADER ────────────────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      // Trigger initial reveals after loader hides
      setTimeout(revealOnScroll, 300);
    }, 600);
  });

  // ─── SMOOTH SCROLL NAVIGATION ───────────────────────
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── ACTIVE SECTION TRACKING ────────────────────────
  function updateActiveLink() {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 200;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.list a[href*="${sectionId}"]`);
      if (navLink) {
        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.parentElement.classList.add('active');
        } else {
          navLink.parentElement.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ─── BUTTON RIPPLE EFFECT ──────────────────────────
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
    });
  });

  // ─── TYPEWRITER EFFECT ─────────────────────────────
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'Full Stack Developer',
    'Java Enthusiast',
    'React Developer',
    'Problem Solver',
    'UI/UX Explorer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typewrite() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before next word
    }

    setTimeout(typewrite, typeSpeed);
  }

  // Start typewriter after loader
  setTimeout(typewrite, 1200);

  // ─── SCROLL REVEAL (IntersectionObserver) ──────────
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate skill bars if inside skills section
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach((fill) => {
              const width = fill.getAttribute('data-width');
              setTimeout(() => {
                fill.style.width = width + '%';
              }, 200);
            });

            // Animate stat numbers if inside about section
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((num) => {
              animateCounter(num);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // ─── COUNTER ANIMATION ────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // ─── CONTACT FORM HANDLING ─────────────────────────
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');

      // Show loading state
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      // Collect form data
      const formData = new FormData(contactForm);

      // Attempt Formspree submission
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
        .then((response) => {
          if (response.ok) {
            formStatus.textContent = '✓ Message sent successfully!';
            formStatus.className = 'form-status success';
            contactForm.reset();
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(() => {
          // Fallback: show a friendly message since Formspree ID needs to be configured
          formStatus.textContent =
            '✓ Thanks! Please configure Formspree ID to enable email delivery.';
          formStatus.className = 'form-status success';
          contactForm.reset();
        })
        .finally(() => {
          btnText.style.display = 'inline-flex';
          btnLoading.style.display = 'none';
          submitBtn.disabled = false;

          setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
          }, 5000);
        });
    });
  }

  // ─── AMBIENT BACKGROUND CANVAS ─────────────────────
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 60);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(234, 88, 12, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    }

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReducedMotion.matches) {
      resizeCanvas();
      createParticles();
      drawParticles();

      window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
      });
    }

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else if (!prefersReducedMotion.matches) {
        drawParticles();
      }
    });
  }

  // ─── HIRE ME BUTTON → SCROLL TO CONTACT ────────────
  const hireMeBtn = document.getElementById('hireMeBtn');
  if (hireMeBtn) {
    hireMeBtn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

})();
