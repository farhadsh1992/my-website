(function () {
  function storedLang() {
    return localStorage.getItem('lang') || 'en';
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

  function updateLangToggle(btn, lang) {
    if (!btn) return;
    btn.textContent = lang === 'en' ? 'PT' : 'EN';
    btn.setAttribute('aria-label', 'Switch language to ' + (lang === 'en' ? 'Portuguese' : 'English'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var themeBtn = document.getElementById('theme-toggle');
    var langBtn = document.getElementById('lang-toggle');

    var theme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeToggle(themeBtn, theme);

    var lang = storedLang();
    applyLanguage(lang);
    updateLangToggle(langBtn, lang);

    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeToggle(themeBtn, next);
      });
    }

    if (langBtn) {
      langBtn.addEventListener('click', function () {
        var next = storedLang() === 'en' ? 'pt' : 'en';
        localStorage.setItem('lang', next);
        applyLanguage(next);
        updateLangToggle(langBtn, next);
      });
    }
  });
})();
