(function () {
  function parsePost(raw) {
    var lines = raw.replace(/\r\n/g, '\n').split('\n');
    var title = (lines[0] || '').trim();
    var date = (lines[1] || '').trim();
    var bodyLines = lines.slice(2);
    while (bodyLines.length && bodyLines[0].trim() === '') {
      bodyLines.shift();
    }
    var text = bodyLines.join('\n').trim();
    var paragraphs = text
      .split(/\n\s*\n/)
      .map(function (p) { return p.replace(/\s*\n\s*/g, ' ').trim(); })
      .filter(Boolean);
    return { title: title, date: date, paragraphs: paragraphs };
  }

  var MEDIA_CANDIDATES = [
    { ext: 'jpg', kind: 'image' },
    { ext: 'jpeg', kind: 'image' },
    { ext: 'png', kind: 'image' },
    { ext: 'gif', kind: 'image' },
    { ext: 'webp', kind: 'image' },
    { ext: 'mp4', kind: 'video' },
    { ext: 'webm', kind: 'video' },
  ];

  function findMedia(num, callback) {
    var i = 0;
    function tryNext() {
      if (i >= MEDIA_CANDIDATES.length) {
        callback(null);
        return;
      }
      var candidate = MEDIA_CANDIDATES[i];
      var url = 'blog/post-' + num + '.' + candidate.ext;
      fetch(url, { method: 'HEAD', cache: 'no-store' })
        .then(function (res) {
          if (res.ok) {
            callback({ url: url, kind: candidate.kind });
          } else {
            i++;
            tryNext();
          }
        })
        .catch(function () {
          i++;
          tryNext();
        });
    }
    tryNext();
  }

  function buildTile(post) {
    var li = document.createElement('li');
    li.className = 'blog-post';

    var a = document.createElement('a');
    a.className = 'blog-tile';
    a.href = '#';

    var imgWrap = document.createElement('div');
    imgWrap.className = 'blog-tile-img';
    imgWrap.style.display = 'none';
    findMedia(post.num, function (media) {
      if (!media) return;
      var el;
      if (media.kind === 'video') {
        el = document.createElement('video');
        el.autoplay = true;
        el.muted = true;
        el.loop = true;
        el.playsInline = true;
        el.src = media.url;
      } else {
        el = document.createElement('img');
        el.src = media.url;
        el.alt = '';
      }
      imgWrap.appendChild(el);
      imgWrap.style.display = '';
    });

    var body = document.createElement('div');
    body.className = 'blog-tile-body';

    if (post.date) {
      var dateEl = document.createElement('span');
      dateEl.className = 'blog-post-date';
      dateEl.textContent = post.date;
      body.appendChild(dateEl);
    }

    var h2 = document.createElement('h2');
    h2.textContent = post.title;
    body.appendChild(h2);

    post.paragraphs.forEach(function (para) {
      var p = document.createElement('p');
      p.textContent = para;
      body.appendChild(p);
    });

    a.appendChild(imgWrap);
    a.appendChild(body);
    li.appendChild(a);
    return li;
  }

  function loadPosts() {
    var list = document.getElementById('blog-list');
    if (!list) return;
    var note = document.getElementById('blog-note');
    var found = [];

    function tryNext(num) {
      fetch('blog/post-' + num + '.txt', { cache: 'no-store' })
        .then(function (res) {
          if (!res.ok) throw new Error('missing');
          return res.text();
        })
        .then(function (raw) {
          var post = parsePost(raw);
          post.num = num;
          found.push(post);
          tryNext(num + 1);
        })
        .catch(function () {
          render();
        });
    }

    function render() {
      list.innerHTML = '';
      if (found.length === 0) {
        if (note) note.style.display = '';
        return;
      }
      if (note) note.style.display = 'none';
      found
        .slice()
        .reverse()
        .forEach(function (post) {
          list.appendChild(buildTile(post));
        });
    }

    tryNext(1);
  }

  document.addEventListener('DOMContentLoaded', loadPosts);
})();
