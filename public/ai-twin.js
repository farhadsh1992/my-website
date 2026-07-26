(function () {
  var LANGS = ['en', 'pt', 'nl', 'de', 'fr', 'it', 'es'];

  var COMING_SOON = {
    en: "🚧 Hi, I'm Farshad, Farhad's AI twin. I'm coming soon! I'm not connected to a live AI just yet, but check back soon!",
    pt: '🚧 Olá, sou o Farshad, o gémeo de IA do Farhad. Estou a chegar em breve! Ainda não estou ligado a uma IA em tempo real, mas volte em breve!',
    nl: '🚧 Hoi, ik ben Farshad, de AI-tweeling van Farhad. Ik kom binnenkort! Ik ben nog niet verbonden met een live AI, maar kom snel terug!',
    de: '🚧 Hallo, ich bin Farshad, Farhads KI-Zwilling. Ich komme bald! Ich bin noch nicht mit einer echten KI verbunden, aber schau bald wieder vorbei!',
    fr: "🚧 Bonjour, je suis Farshad, le jumeau IA de Farhad. J'arrive bientôt ! Je ne suis pas encore connecté à une IA en direct, mais revenez bientôt !",
    it: "🚧 Ciao, sono Farshad, il gemello IA di Farhad. Arrivo presto! Non sono ancora collegato a un'IA dal vivo, ma ricontrolla presto!",
    es: '🚧 Hola, soy Farshad, el gemelo de IA de Farhad. ¡Llegaré pronto! Todavía no estoy conectado a una IA en vivo, pero vuelve pronto.',
  };

  function storedLang() {
    var stored = localStorage.getItem('lang');
    return LANGS.indexOf(stored) !== -1 ? stored : 'en';
  }

  function addMessage(log, text, who) {
    var wrap = document.createElement('div');
    wrap.className = 'chat-message chat-message--' + who;
    if (who === 'assistant') {
      var avatar = document.createElement('img');
      avatar.src = 'assets/images/AI_agent.png';
      avatar.alt = '';
      avatar.className = 'chat-avatar';
      wrap.appendChild(avatar);
    }
    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);
    log.appendChild(wrap);
    log.scrollTop = log.scrollHeight;
  }

  var MOBILE_BREAKPOINT = '(max-width: 640px)';

  function updatePlaceholder(input, lang) {
    var isMobile = window.matchMedia && window.matchMedia(MOBILE_BREAKPOINT).matches;
    var placeholder = isMobile
      ? input.getAttribute('data-' + lang + '-placeholder-mobile') || input.getAttribute('data-en-placeholder-mobile')
      : null;
    placeholder = placeholder || input.getAttribute('data-' + lang + '-placeholder') || input.getAttribute('data-en-placeholder');
    if (placeholder) input.placeholder = placeholder;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var log = document.getElementById('chat-log');
    var form = document.getElementById('chat-form');
    var input = document.getElementById('chat-input');
    if (!log || !form || !input) return;

    var lang = storedLang();
    updatePlaceholder(input, lang);

    addMessage(log, COMING_SOON[lang] || COMING_SOON.en, 'assistant');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      addMessage(log, text, 'user');
      input.value = '';
      setTimeout(function () {
        var currentLang = storedLang();
        addMessage(log, COMING_SOON[currentLang] || COMING_SOON.en, 'assistant');
      }, 400);
    });

    var langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', function () {
        var next = LANGS.indexOf(langSelect.value) !== -1 ? langSelect.value : 'en';
        updatePlaceholder(input, next);
      });
    }

    window.addEventListener('resize', function () {
      updatePlaceholder(input, storedLang());
    });
  });
})();
