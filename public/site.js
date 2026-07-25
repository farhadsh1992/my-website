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
  });
})();
