/* -------------------------------------------------------------
   MAIN SHELL INTERACTIVE SCRIPTS (Tharun R Portfolio)
   Controls shell elements, navigation active states & mobile overlays
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  
  if (hamburger && mobileNavOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNavOverlay.classList.toggle('open');
      
      // Prevent scrolling when mobile nav is open
      if (mobileNavOverlay.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking navigation items
    const mobileLinks = mobileNavOverlay.querySelectorAll('nav a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNavOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Highlight Active Link based on Pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Update sidebar links
  const sidebarLinks = document.querySelectorAll('.sidebar-links .nav-item');
  sidebarLinks.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update mobile navigation links
  const mobileOverlayLinks = document.querySelectorAll('.mobile-nav a');
  mobileOverlayLinks.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Add subtle scroll header backdrop blurring
  const mobileHeader = document.querySelector('.mobile-header');
  if (mobileHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        mobileHeader.classList.add('scrolled');
      } else {
        mobileHeader.classList.remove('scrolled');
      }
    });
  }

  // Handle Fade animations on viewport entry
  const animElements = document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right');
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Elements keep their animation in CSS via active class if needed, or simply trigger by class
        entry.target.style.animationPlayState = 'running';
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animElements.forEach(el => {
    el.style.animationPlayState = 'paused'; // pause initially so it plays when in view
    scrollObserver.observe(el);
  });

  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  
  // Apply saved theme state: default to light if not explicitly set to 'dark'
  const isDark = localStorage.getItem('theme') === 'dark';
                 
  if (isDark) {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
  }

  const toggleTheme = () => {
    const wasDark = document.body.classList.contains('dark-mode');
    if (wasDark) {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
});
