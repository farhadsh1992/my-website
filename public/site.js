(function () {
  var LANGS = ['en', 'pt', 'nl', 'de', 'fr', 'it', 'es'];

  function storedLang() {
    var stored = localStorage.getItem('lang');
    return LANGS.indexOf(stored) !== -1 ? stored : 'en';
  }

  function applyLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    });
    document.documentElement.setAttribute('lang', lang);
  }

  function updateThemeToggle(btn, theme) {
    if (!btn) return;
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var themeBtn = document.getElementById('theme-toggle');
    var langSelect = document.getElementById('lang-select');

    var theme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeToggle(themeBtn, theme);

    var lang = storedLang();
    applyLanguage(lang);
    if (langSelect) {
      langSelect.value = lang;
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeToggle(themeBtn, next);
      });
    }

    if (langSelect) {
      langSelect.addEventListener('change', function () {
        var next = LANGS.indexOf(langSelect.value) !== -1 ? langSelect.value : 'en';
        localStorage.setItem('lang', next);
        applyLanguage(next);
      });
    }

    var videoLink = document.getElementById('video-link');
    if (videoLink) {
      var goToCv = function () {
        window.location.href = 'cv.html';
      };

      videoLink.querySelectorAll('.lang-pick').forEach(function (pick) {
        pick.addEventListener('click', function (e) {
          e.stopPropagation();
          var picked = pick.getAttribute('data-lang');
          localStorage.setItem('lang', LANGS.indexOf(picked) !== -1 ? picked : 'en');
        });
      });

      videoLink.addEventListener('click', function (e) {
        if (e.target.closest('.lang-pick')) return;
        localStorage.setItem('lang', 'en');
        goToCv();
      });

      videoLink.addEventListener('keydown', function (e) {
        if (e.target !== videoLink) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          localStorage.setItem('lang', 'en');
          goToCv();
        }
      });
    }

    var sectionNav = document.querySelector('.section-nav');
    if (sectionNav) {
      var navLinks = Array.prototype.slice.call(sectionNav.querySelectorAll('a[href^="#"]'));
      var sections = navLinks
        .map(function (link) {
          return document.getElementById(link.getAttribute('href').slice(1));
        })
        .filter(Boolean);

      var setActive = function (id) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      };

      var navHeight = sectionNav.getBoundingClientRect().height;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          });
        },
        { rootMargin: '-' + (navHeight + 1) + 'px 0px -70% 0px', threshold: 0 }
      );

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }
  });
})();
