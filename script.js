/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — MAIN SCRIPT (Premium Redesign)
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
      setTimeout(initRevealSystem, 200);
      setTimeout(initWaveTimeline, 400);
    }, 800);
  });

  // ─── DYNAMIC GREETING ──────────────────────────────
  const greetingEl = document.getElementById('dynamicGreeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let greetText = 'Good Evening';
    let greetEmoji = '🌙';
    if (hour >= 5 && hour < 12) {
      greetText = 'Good Morning';
      greetEmoji = '☀️';
    } else if (hour >= 12 && hour < 17) {
      greetText = 'Good Afternoon';
      greetEmoji = '🌤️';
    }
    greetingEl.textContent = `${greetEmoji} ${greetText}, I'm`;
  }

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
      setTimeout(() => ripple.remove(), 700);
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
      typeSpeed = 35;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 350;
    }

    setTimeout(typewrite, typeSpeed);
  }

  setTimeout(typewrite, 1200);

  // ─── SCROLL REVEAL SYSTEM (IntersectionObserver) ───
  function initRevealSystem() {
    const reveals = document.querySelectorAll('.reveal');

    // Add directional classes for wave cards
    document.querySelectorAll('.wave-left.reveal').forEach(el => {
      el.classList.add('slide-left');
    });
    document.querySelectorAll('.wave-right.reveal').forEach(el => {
      el.classList.add('slide-right');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate skill bars
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach((fill) => {
              const width = fill.getAttribute('data-width');
              setTimeout(() => {
                fill.style.width = width + '%';
              }, 150);
            });

            // Animate stat numbers
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((num) => {
              animateCounter(num);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // ─── COUNTER ANIMATION ────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
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

  // ─── WAVE TIMELINE ─────────────────────────────────
  function initWaveTimeline() {
    const svg = document.getElementById('waveSvg');
    const path = document.getElementById('wavePath');
    const timeline = document.getElementById('waveTimeline');
    if (!svg || !path || !timeline) return;

    // Only draw SVG path on desktop (> 1024px)
    if (window.innerWidth <= 1024) return;

    const cards = timeline.querySelectorAll('.wave-card');
    if (cards.length === 0) return;

    // Get positions of nodes to draw the curve through
    const timelineRect = timeline.getBoundingClientRect();
    const points = [];

    cards.forEach((card) => {
      const node = card.querySelector('.wave-node');
      if (!node) return;
      const nodeRect = node.getBoundingClientRect();
      points.push({
        x: nodeRect.left + nodeRect.width / 2 - timelineRect.left,
        y: nodeRect.top + nodeRect.height / 2 - timelineRect.top,
      });
    });

    if (points.length < 2) return;

    // Build an SVG path (smooth cubic bezier through points)
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midY = (p0.y + p1.y) / 2;
      d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
    }

    path.setAttribute('d', d);

    // Set SVG dimensions
    svg.style.width = timelineRect.width + 'px';
    svg.style.height = timelineRect.height + 'px';
    svg.style.left = '0';
    svg.style.transform = 'none';

    // Animate the path drawing on scroll
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const waveObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            path.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)';
            path.style.strokeDashoffset = '0';
            waveObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    waveObserver.observe(timeline);
  }

  // Re-draw wave on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initWaveTimeline, 300);
  });

  // ─── CONTACT FORM HANDLING ─────────────────────────
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');

      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

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
    let mouseX = -1;
    let mouseY = -1;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 30000), 45);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.8 + 0.5,
          opacity: Math.random() * 0.35 + 0.08,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction: gently repel
        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            p.vx += (dx / dist) * 0.03;
            p.vy += (dy / dist) * 0.03;
          }
        }

        // Dampen velocity
        p.vx *= 0.999;
        p.vy *= 0.999;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(234, 88, 12, ${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    }

    // Track mouse for interactive particles
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      mouseX = -1;
      mouseY = -1;
    });

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

  // ─── VIEW PROJECTS BUTTON ──────────────────────────
  const viewProjectsBtn = document.getElementById('viewProjectsBtn');
  if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
  }

})();
