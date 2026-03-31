/* ============================================
   RAINTEX - Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Sticky Nav Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- Scroll Animations (IntersectionObserver) ---
  const fadeElements = document.querySelectorAll('.fade-up');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Gallery Lightbox ---
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  const lightboxImg = lightboxOverlay ? lightboxOverlay.querySelector('img') : null;
  const lightboxClose = lightboxOverlay ? lightboxOverlay.querySelector('.lightbox-close') : null;
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightboxOverlay && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --- Animate stat numbers ---
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.max(1, Math.floor(target / 50));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current + suffix;
          }, 30);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));
  }

});

  // --- Category box ---

function showCategory(categoryId, el) {

  document.addEventListener("DOMContentLoaded", () => {
  const first = document.querySelector('.category-box li');
  if (first) first.click();
});

  document.querySelectorAll('.product-category').forEach(cat => {
    cat.classList.remove('active');
  });

  document.getElementById(categoryId).classList.add('active');

  document.querySelectorAll('.category-box li').forEach(li => {
    li.classList.remove('active');
  });

  el.classList.add('active');
}

const filterToggle = document.querySelector('.filter-toggle');
const categoryBox = document.querySelector('.category-box');
const filterClose = document.querySelector('.filter-close');

if (filterClose) {
  filterClose.addEventListener('click', () => {
    categoryBox.classList.remove('open');
  });
}


if (filterToggle && categoryBox) {

  // toggle open
  filterToggle.addEventListener('click', () => {
    categoryBox.classList.toggle('open');
  });

  // ✅ close when clicking a category
  document.querySelectorAll('.category-box li').forEach(item => {
    item.addEventListener('click', () => {
      categoryBox.classList.remove('open');
    });
  });

  // ✅ close when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInside = categoryBox.contains(e.target);
    const isButton = filterToggle.contains(e.target);

    if (!isClickInside && !isButton) {
      categoryBox.classList.remove('open');
    }
  });

}


document.querySelectorAll('.copy-phone').forEach(el => {
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(el.dataset.phone);
    const originalText = el.textContent;
    el.textContent = "Копирано!";
    setTimeout(() => { el.textContent = originalText; }, 1500);
  });
});