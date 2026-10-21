/* video2gifapp.com — page behaviour (no dependencies) */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero GIF player: an 8-frame pixel sprite stepped at the chosen FPS.
  // The size is an illustration: a 3-second, 480 px clip at ~56 KB per encoded frame.
  var sprite = document.getElementById('gifSprite');
  var fpsButtons = document.querySelectorAll('.fps-option');
  if (sprite && fpsButtons.length) {
    var FRAMES = 8;
    var SECONDS = 3;
    var KB_PER_FRAME = 56;
    var frameOut = document.getElementById('gifFrame');
    var sizeOut = document.getElementById('gifSize');
    var track = document.getElementById('gifTimeline');
    var sizeBox = sizeOut && sizeOut.parentNode;
    var frame = 0;
    var fps = 12;
    var timer = null;
    var draw = function () {
      var x = (frame / (FRAMES - 1)) * 100;
      sprite.style.backgroundPosition = x + '% 0';
      if (frameOut) frameOut.textContent = (frame + 1) + ' / ' + FRAMES;
      if (track) track.style.setProperty('--frame', frame);
    };
    var stop = function () {
      if (timer) window.clearInterval(timer);
      timer = null;
    };
    var play = function () {
      stop();
      if (reduce || document.hidden) return;
      timer = window.setInterval(function () {
        frame = (frame + 1) % FRAMES;
        draw();
      }, 1000 / fps);
    };
    var setFps = function (value) {
      fps = value;
      fpsButtons.forEach(function (btn) {
        btn.setAttribute('aria-checked', String(Number(btn.getAttribute('data-fps')) === fps));
      });
      if (sizeOut) sizeOut.textContent = ((SECONDS * fps * KB_PER_FRAME) / 1024).toFixed(1) + ' MB';
      play();
    };
    fpsButtons.forEach(function (btn, i) {
      btn.addEventListener('click', function () { setFps(Number(btn.getAttribute('data-fps'))); });
      btn.addEventListener('keydown', function (e) {
        var step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        var next = fpsButtons[(i + step + fpsButtons.length) % fpsButtons.length];
        next.focus();
        next.click();
      });
    });
    draw();
    setFps(Number((sizeBox && sizeBox.getAttribute('data-default-fps')) || fpsButtons[0].getAttribute('data-fps')));
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else play();
    });
  }

  // Mobile menu: the header nav collapses behind a toggle on small screens.
  var header = document.querySelector('.site-header');
  var toggle = header && header.querySelector('.nav-toggle');
  if (toggle) {
    var setMenu = function (open) {
      header.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setMenu(!header.classList.contains('is-open'));
    });
    header.querySelectorAll('.site-nav a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (header.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
    });
  }

  // Small screens: FAQ answers stay in the HTML (SEO) but collapse behind a button.
  if (!window.matchMedia) return;
  var mq = window.matchMedia('(max-width: 760px)');
  var items = document.querySelectorAll('.faq-list .faq-item');
  var done = false;
  function enhance() {
    if (done || !mq.matches || !items.length) return;
    done = true;
    Array.prototype.forEach.call(items, function (item, i) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;
      a.id = a.id || 'faq-answer-' + (i + 1);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'faq-toggle';
      btn.setAttribute('aria-controls', a.id);
      while (q.firstChild) btn.appendChild(q.firstChild);
      q.appendChild(btn);
      item.classList.add('is-collapsible');
      var set = function (open) {
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      };
      set(i === 0);
      btn.addEventListener('click', function () { set(!item.classList.contains('is-open')); });
    });
  }
  enhance();
  if (mq.addEventListener) mq.addEventListener('change', enhance);
})();
