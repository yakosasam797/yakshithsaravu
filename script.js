/* ============================================
   YAKSHITH — PORTFOLIO
   JavaScript: Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Page Loader ──
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('loaded');
    }, 800);
  });

  // Fallback: force hide loader after 3s
  setTimeout(() => {
    pageLoader.classList.add('loaded');
  }, 3000);


  // ── Custom Cursor ──
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  // Check if device has fine pointer (no touch)
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (hasFinePointer && cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('[data-cursor-hover], a, button');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hover');
      });
    });
  }


  // ── Navigation Scroll Effect ──
  const nav = document.getElementById('nav');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });


  // ── Mobile Menu ──
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('active', menuOpen);
      document.body.style.overflow = menuOpen ? 'hidden' : '';

      // Animate hamburger to X
      const spans = mobileToggle.querySelectorAll('span');
      if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translateY(5.5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-5.5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }


  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });


  // ── Parallax on Hero Photo ──
  const heroPhoto = document.querySelector('.hero__photo-container');

  if (heroPhoto && hasFinePointer) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;

      if (scrolled < heroHeight) {
        const parallaxOffset = scrolled * 0.15;
        heroPhoto.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px))`;
      }
    }, { passive: true });
  }


  // ── Tilt effect on project cards ──
  if (hasFinePointer) {
    const cards = document.querySelectorAll('.work__project');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / centerY * -2;
        const rotateY = (x - centerX) / centerX * 2;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }


  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--text-primary)';
      }
    });
  }, { passive: true });


  // ── Stat Counter Animation ──
  const statNumbers = document.querySelectorAll('.about__stat-number');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.textContent;
        const numMatch = target.match(/(\d+)/);

        if (numMatch) {
          const num = parseInt(numMatch[1]);
          const suffix = target.replace(numMatch[0], '');
          let count = 0;
          const step = Math.ceil(num / 40);
          const duration = 1200;
          const interval = duration / (num / step);

          const counter = setInterval(() => {
            count += step;
            if (count >= num) {
              count = num;
              clearInterval(counter);
            }
            el.textContent = count + suffix;
          }, interval);
        }

        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => {
    statObserver.observe(el);
  });

});
