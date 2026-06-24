/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — SPLIT-SCREEN INTERACTIVE SCRIPT
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── PROJECT DATA ──────────────────────────────────
  const projectsData = [
    {
      title: 'HRMS — Human Resource Management',
      desc: 'Full-featured HRMS with role-based access, leave management, attendance tracking, and employee dashboards.',
      tags: ['Next.js', 'Spring Boot', 'PostgreSQL', 'REST API'],
      icon: 'fa-solid fa-users-gear',
      demo: '#',
      code: '#'
    },
    {
      title: 'E-Commerce Web Application',
      desc: 'Online shopping platform with product catalog, cart system, user authentication, and payment integration.',
      tags: ['React JS', 'Java', 'Spring Boot', 'PostgreSQL'],
      icon: 'fa-solid fa-cart-shopping',
      demo: '#',
      code: '#'
    },
    {
      title: 'Portfolio Website',
      desc: 'Modern personal portfolio with smooth animations, responsive design, and interactive UI components.',
      tags: ['HTML5', 'CSS3', 'JavaScript'],
      icon: 'fa-solid fa-newspaper',
      demo: '#',
      code: '#'
    },
    {
      title: 'Task Management App',
      desc: 'Productivity tool for managing daily tasks with drag-and-drop, priority levels, and deadline tracking.',
      tags: ['React JS', 'Node.js', 'MongoDB'],
      icon: 'fa-solid fa-list-check',
      demo: '#',
      code: '#'
    }
  ];

  // ─── DOM REFERENCES ─────────────────────────────────
  const pageLoader = document.getElementById('pageLoader');
  const contentPanel = document.getElementById('contentPanel');
  const sidebar = document.getElementById('sidebar');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavIcon = document.getElementById('mobileNavIcon');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const navItems = document.querySelectorAll('.nav-item[data-section]');
  const sections = document.querySelectorAll('.section');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // ─── PAGE LOADER ────────────────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      setTimeout(() => {
        initScrollObservers();
        initProjectShowcase();
      }, 300);
    }, 900);
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

  // ─── MOBILE NAVIGATION ────────────────────────────
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      mobileNavToggle.classList.toggle('active', isOpen);
      sidebarOverlay.classList.toggle('visible', isOpen);
      mobileNavIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    sidebarOverlay.addEventListener('click', closeMobileNav);
  }

  function closeMobileNav() {
    sidebar.classList.remove('open');
    mobileNavToggle.classList.remove('active');
    sidebarOverlay.classList.remove('visible');
    mobileNavIcon.className = 'fa-solid fa-bars';
  }

  // ─── SIDEBAR NAVIGATION ────────────────────────────
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-section');
      const target = document.getElementById(sectionId);
      if (!target) return;

      // Determine scroll container
      const isMobile = window.innerWidth <= 1024;
      if (isMobile) {
        target.scrollIntoView({ behavior: 'smooth' });
        closeMobileNav();
      } else {
        // Scroll within content panel
        contentPanel.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // CTA buttons
  const ctaProjects = document.getElementById('ctaProjects');
  const ctaContact = document.getElementById('ctaContact');

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      contentPanel.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  if (ctaProjects) ctaProjects.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('projects'); });
  if (ctaContact) ctaContact.addEventListener('click', (e) => { e.preventDefault(); scrollToSection('contact'); });

  // ─── SCROLL OBSERVERS ─────────────────────────────
  function initScrollObservers() {
    const isMobile = window.innerWidth <= 1024;
    const observerRoot = isMobile ? null : contentPanel;

    // 1. Active nav state observer
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navItems.forEach((item) => {
              item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
            });
          }
        });
      },
      {
        root: observerRoot,
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    sections.forEach((section) => navObserver.observe(section));

    // 2. Reveal animation observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');

            // Reveal .reveal-up elements
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });

            // Reveal stat cards
            if (entry.target.id === 'about') {
              entry.target.querySelectorAll('.stat-card').forEach((card, i) => {
                setTimeout(() => {
                  card.classList.add('revealed');
                }, 300 + i * 150);
              });

              // Counter animation
              entry.target.querySelectorAll('.stat-number').forEach((num) => {
                if (!num.dataset.animated) {
                  animateCounter(num);
                  num.dataset.animated = 'true';
                }
              });

              // About word reveal
              revealAboutWords();
            }

            // Reveal skill cards
            if (entry.target.id === 'skills') {
              entry.target.querySelectorAll('.skill-card').forEach((card, i) => {
                setTimeout(() => {
                  card.classList.add('revealed');
                }, i * 60);
              });
            }

            // Reveal project list items
            if (entry.target.id === 'projects') {
              entry.target.querySelectorAll('.project-list-item').forEach((item, i) => {
                setTimeout(() => {
                  item.classList.add('revealed');
                }, i * 120);
              });
            }

            // Reveal timeline items
            if (entry.target.id === 'education') {
              entry.target.querySelectorAll('.timeline-item').forEach((item, i) => {
                setTimeout(() => {
                  item.classList.add('revealed');
                }, 200 + i * 200);
              });
            }
          }
        });
      },
      {
        root: observerRoot,
        threshold: 0.15
      }
    );

    sections.forEach((section) => revealObserver.observe(section));
  }

  // ─── ABOUT WORD REVEAL ────────────────────────────
  function revealAboutWords() {
    const aboutText = document.getElementById('aboutText');
    if (!aboutText || aboutText.dataset.wordsRevealed) return;
    aboutText.dataset.wordsRevealed = 'true';

    // We'll keep the text but animate highlight underlines
    const highlights = aboutText.querySelectorAll('.highlight');
    highlights.forEach((hl, i) => {
      hl.style.transitionDelay = `${i * 0.15}s`;
    });
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

  // ─── PROJECT SHOWCASE SYSTEM ──────────────────────
  function initProjectShowcase() {
    const listItems = document.querySelectorAll('.project-list-item');
    const preview = document.getElementById('projectPreview');
    const previewIcon = document.getElementById('previewIcon');
    const previewTitle = document.getElementById('previewTitle');
    const previewDesc = document.getElementById('previewDesc');
    const previewTags = document.getElementById('previewTags');
    const previewDemo = document.getElementById('previewDemo');
    const previewCode = document.getElementById('previewCode');

    if (!preview || listItems.length === 0) return;

    let currentProject = 0;

    function switchProject(index) {
      if (index === currentProject && listItems[index].classList.contains('active')) return;
      currentProject = index;

      // Update active state
      listItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });

      // Crossfade effect
      preview.classList.add('switching');

      setTimeout(() => {
        const project = projectsData[index];
        if (!project) return;

        previewIcon.className = project.icon + ' project-preview-icon';
        previewTitle.textContent = project.title;
        previewDesc.textContent = project.desc;

        // Update tags
        previewTags.innerHTML = '';
        project.tags.forEach((tag) => {
          const span = document.createElement('span');
          span.className = 'project-tag';
          span.textContent = tag;
          previewTags.appendChild(span);
        });

        previewDemo.href = project.demo;
        previewCode.href = project.code;

        preview.classList.remove('switching');
      }, 300);
    }

    // Click handlers
    listItems.forEach((item) => {
      item.addEventListener('click', () => {
        const index = parseInt(item.getAttribute('data-project'), 10);
        switchProject(index);
      });
    });

    // Scroll-based project switching (for desktop)
    const isMobile = window.innerWidth <= 1024;
    if (!isMobile) {
      const projectObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-project'), 10);
              switchProject(index);
            }
          });
        },
        {
          root: contentPanel,
          threshold: 0.7,
          rootMargin: '-20% 0px -20% 0px'
        }
      );

      listItems.forEach((item) => projectObserver.observe(item));
    }
  }

  // ─── BUTTON RIPPLE EFFECT ──────────────────────────
  document.querySelectorAll('.btn, .btn-primary, .btn-secondary').forEach((btn) => {
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
    const submitBtn = document.getElementById('submitBtn');

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
        checkFormValidity();
      });
    }

    if (msgInput) {
      msgInput.addEventListener('input', function () {
        this.value = this.value.replace(/[<>]/g, '');
      });
    }

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

      const nameVal = nameInput.value;
      const mailVal = mailInput.value;
      const msgVal = msgInput.value;

      // Validate Name
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(nameVal)) {
        formStatus.textContent = 'Name must contain only alphabets.';
        formStatus.className = 'form-status error';
        return;
      }

      // Validate Email
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

      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');

      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nameVal, email: mailVal, message: msgVal })
      })
        .then((response) => {
          if (response.ok) {
            formStatus.textContent = '✓ Message sent successfully!';
            formStatus.className = 'form-status success';
            const formCard = document.querySelector('.contact-form-card');
            if (formCard) formCard.classList.add('submit-success');
            setTimeout(() => formCard && formCard.classList.remove('submit-success'), 600);
            contactForm.reset();
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(() => {
          formStatus.textContent = '❌ Error sending message. Please try again later.';
          formStatus.className = 'form-status error';
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

  // ─── HANDLE RESIZE ─────────────────────────────────
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Re-init observers on layout change
      initScrollObservers();
    }, 250);
  });

})();
