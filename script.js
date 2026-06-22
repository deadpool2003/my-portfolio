/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — PANEL SYSTEM SCRIPT
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── DOM REFERENCES ─────────────────────────────────
  const panelContainer = document.getElementById('panelContainer');
  const panels = document.querySelectorAll('.panel');
  const sidebarLinks = document.querySelectorAll('.sidebar .menu .list');
  const pageLoader = document.getElementById('pageLoader');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // ─── PAGE LOADER ────────────────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      setTimeout(initPanelObserver, 200);
      setTimeout(initProjectSlider, 300);
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

  // ─── SIDEBAR NAVIGATION ────────────────────────────
  sidebarLinks.forEach((item) => {
    const link = item.querySelector('.link');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  // Hero CTA → scroll to contact
  const heroCta = document.getElementById('heroCta');
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ─── PANEL INTERSECTION OBSERVER ───────────────────
  function initPanelObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add in-view class for animations
            entry.target.classList.add('in-view');

            // Update sidebar active state
            const panelId = entry.target.getAttribute('id');
            sidebarLinks.forEach((item) => {
              const section = item.getAttribute('data-section');
              if (section === panelId) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });

            // Trigger counter animation for about panel
            if (panelId === 'about') {
              const statNumbers = entry.target.querySelectorAll('.stat-number');
              statNumbers.forEach((num) => {
                if (!num.dataset.animated) {
                  animateCounter(num);
                  num.dataset.animated = 'true';
                }
              });
            }

            // Trigger education timeline animation
            if (panelId === 'education') {
              const timeline = document.getElementById('eduTimeline');
              if (timeline && !timeline.classList.contains('animated')) {
                setTimeout(() => {
                  timeline.classList.add('animated');
                }, 300);
              }
            }
          }
        });
      },
      {
        root: panelContainer,
        threshold: 0.5,
      }
    );

    panels.forEach((panel) => observer.observe(panel));
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


  // ─── PROJECT SLIDER ────────────────────────────────
  function initProjectSlider() {
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');

    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('aria-label', `Go to project ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function goToSlide(index) {
      if (index < 0 || index >= totalSlides) return;
      currentSlide = index;

      // Calculate offset: slide width + gap (1.5rem ≈ 24px)
      const slideWidth = slides[0].offsetWidth;
      const gap = 24;
      const offset = currentSlide * (slideWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      // Update dots and slides
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === currentSlide);
      });

      // Update arrows
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
    }, { passive: true });

    // Initialize state
    goToSlide(0);

    // Recalculate on resize
    window.addEventListener('resize', () => goToSlide(currentSlide));
  }

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

  // ─── CONTACT FORM HANDLING ─────────────────────────
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const mailInput = document.getElementById('mail');
    const msgInput = document.getElementById('message');

    // Prevent typing invalid characters
    if (nameInput) {
      nameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
      });
    }

    if (mailInput) {
      mailInput.addEventListener('input', function () {
        let val = this.value.replace(/[^a-zA-Z0-9.@]/g, '');
        const parts = val.split('@');
        if (parts.length > 1) {
          let beforeAt = parts[0];
          let afterAt = parts.slice(1).join('').replace(/[^a-zA-Z.]/g, '');
          if (afterAt.startsWith('.')) {
            afterAt = afterAt.substring(1);
          }
          const afterAtParts = afterAt.split('.');
          if (afterAtParts.length > 2) {
            afterAt = afterAtParts[0] + '.' + afterAtParts.slice(1).join('').replace(/\./g, '');
          }
          val = beforeAt + '@' + afterAt;
        }
        this.value = val;
        if (typeof checkFormValidity === 'function') checkFormValidity();
      });
    }

    if (msgInput) {
      msgInput.addEventListener('input', function () {
        this.value = this.value.replace(/[<>]/g, '');
      });
    }

    const submitBtn = document.getElementById('submitBtn');
    
    function checkFormValidity() {
      if (!nameInput || !mailInput || !msgInput) return;
      const nameFilled = nameInput.value.trim().length > 0;
      const mailFilled = mailInput.value.trim().length > 0;
      const msgFilled = msgInput.value.trim().length > 0;
      submitBtn.disabled = !(nameFilled && mailFilled && msgFilled);
    }

    if (nameInput) nameInput.addEventListener('input', checkFormValidity);
    if (mailInput) mailInput.addEventListener('input', checkFormValidity);
    if (msgInput) msgInput.addEventListener('input', checkFormValidity);

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameVal = document.getElementById('name').value;
      const mailVal = document.getElementById('mail').value;
      const msgVal = document.getElementById('message').value;

      // Validate Name
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(nameVal)) {
        formStatus.textContent = 'Name must contain only alphabets.';
        formStatus.className = 'form-status error';
        return;
      }

      // Validate Email
      // Must contain at least one alphabet before @, and only allow alphabets, numbers, dots
      // After @ must allow only alphabets and exactly one dot
      const emailFullRegex = /^(?=[^@]*[a-zA-Z])[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]+$/;
      if (!emailFullRegex.test(mailVal)) {
        formStatus.textContent = 'Invalid email. Must have an alphabet before @, and only alphabets/one dot after @.';
        formStatus.className = 'form-status error';
        return;
      }

      // Validate Message
      if (/[<>]/.test(msgVal)) {
        formStatus.textContent = 'Message cannot contain < or > characters.';
        formStatus.className = 'form-status error';
        return;
      }

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

  // ─── KEYBOARD NAVIGATION ──────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      // Let scroll-snap handle it naturally
    }
  });

})();
