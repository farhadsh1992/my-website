(function () {
  var LANGS = ['en', 'pt', 'nl', 'de', 'fr', 'it', 'es'];

  var COMING_SOON = {
    en: "🚧 Hi, I'm T-801, Farhad's AI twin. I'm coming soon! I'm not connected to a live AI just yet, but check back soon!",
    pt: '🚧 Olá, sou o T-801, o gémeo de IA do Farhad. Estou a chegar em breve! Ainda não estou ligado a uma IA em tempo real, mas volte em breve!',
    nl: '🚧 Hoi, ik ben T-801, de AI-tweeling van Farhad. Ik kom binnenkort! Ik ben nog niet verbonden met een live AI, maar kom snel terug!',
    de: '🚧 Hallo, ich bin T-801, Farhads KI-Zwilling. Ich komme bald! Ich bin noch nicht mit einer echten KI verbunden, aber schau bald wieder vorbei!',
    fr: "🚧 Bonjour, je suis T-801, le jumeau IA de Farhad. J'arrive bientôt ! Je ne suis pas encore connecté à une IA en direct, mais revenez bientôt !",
    it: "🚧 Ciao, sono T-801, il gemello IA di Farhad. Arrivo presto! Non sono ancora collegato a un'IA dal vivo, ma ricontrolla presto!",
    es: '🚧 Hola, soy T-801, el gemelo de IA de Farhad. ¡Llegaré pronto! Todavía no estoy conectado a una IA en vivo, pero vuelve pronto.',
  };

  var LIVE_GREETING = {
    en: "Hi, I'm T-801, Farhad's AI twin. Ask me anything about Farhad!",
    pt: 'Olá, sou o T-801, o gémeo de IA do Farhad. Pergunte-me o que quiser sobre o Farhad!',
    nl: 'Hoi, ik ben T-801, de AI-tweeling van Farhad. Vraag me alles over Farhad!',
    de: 'Hallo, ich bin T-801, Farhads KI-Zwilling. Frag mich alles über Farhad!',
    fr: 'Bonjour, je suis T-801, le jumeau IA de Farhad. Demandez-moi tout sur Farhad !',
    it: 'Ciao, sono T-801, il gemello IA di Farhad. Chiedimi qualsiasi cosa su Farhad!',
    es: 'Hola, soy T-801, el gemelo de IA de Farhad. ¡Pregúntame lo que quieras sobre Farhad!',
  };

  var THINKING = {
    en: 'Thinking…',
    pt: 'A pensar…',
    nl: 'Aan het denken…',
    de: 'Denke nach…',
    fr: 'Je réfléchis…',
    it: 'Sto pensando…',
    es: 'Pensando…',
  };

  // Only set for local dev preview — production has no public backend deployed yet,
  // so it falls back to the COMING_SOON placeholder below.
  var API_URL = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? 'http://127.0.0.1:8799/chat'
    : null;

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
    return bubble;
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
    var modelSelect = document.getElementById('model-select');
    if (!log || !form || !input) return;

    var history = [];
    var lang = storedLang();
    updatePlaceholder(input, lang);

    if (API_URL) {
      addMessage(log, LIVE_GREETING[lang] || LIVE_GREETING.en, 'assistant');
    } else {
      addMessage(log, COMING_SOON[lang] || COMING_SOON.en, 'assistant');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      addMessage(log, text, 'user');
      input.value = '';

      var currentLang = storedLang();

      if (!API_URL) {
        setTimeout(function () {
          addMessage(log, COMING_SOON[currentLang] || COMING_SOON.en, 'assistant');
        }, 400);
        return;
      }

      var thinkingBubble = addMessage(log, THINKING[currentLang] || THINKING.en, 'assistant');

      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history,
          model: modelSelect ? modelSelect.value : undefined,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (data.error) {
            thinkingBubble.textContent = data.error;
            return;
          }
          thinkingBubble.textContent = data.answer;
          log.scrollTop = log.scrollHeight;
          history.push({ role: 'user', content: text });
          history.push({ role: 'assistant', content: data.answer });
        })
        .catch(function () {
          thinkingBubble.textContent = COMING_SOON[currentLang] || COMING_SOON.en;
        });
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
