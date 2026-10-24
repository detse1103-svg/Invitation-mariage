/* Don Veral & Leslie — invitation de mariage
   Les textes se modifient dans config.js, pas ici. */
(function () {
  'use strict';

  var C = window.CONFIG;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------- Date ---------- */
  var target = new Date(C.dateISO);
  function fmt(opts) {
    try {
      var o = Object.assign({ timeZone: C.fuseau || 'Africa/Brazzaville' }, opts);
      return new Intl.DateTimeFormat('fr-FR', o).format(target);
    } catch (e) { return ''; }
  }
  var dateLongue = fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  var heure = fmt({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).replace(':', 'h');
  var jourMois = fmt({ day: 'numeric', month: 'long' });
  var dateAffichee = dateLongue ? (dateLongue.charAt(0).toUpperCase() + dateLongue.slice(1) + ' à ' + heure) : '';

  /* ---------- Rendu du site ---------- */
  function render() {
    document.title = C.titrePage;

    // Enveloppe
    $('#cardHaut').textContent = C.ouverture.carteHaut;
    $('#cardNoms').textContent = C.prenom1 + ' & ' + C.prenom2;
    $('#cardDate').textContent = jourMois;
    $('#cardBas').textContent = C.ouverture.carteBas;
    $('#cachet').textContent = C.initiales;
    $('#openBtn').textContent = C.ouverture.bouton;

    var A = C.accueil, H = C.histoire, G = C.galerie, P = C.programme,
        L = C.lieu, T = C.tenue, R = C.rsvp, F = C.pied;

    var mapSrc = 'https://www.google.com/maps?q=' + encodeURIComponent(L.recherche) + '&output=embed';
    var routeHref = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(L.recherche);

    var html = '';

    // 1. Accueil
    html += '<header class="hero" id="accueil">' +
      '<div class="hero__photo"><img src="' + A.photo + '" alt="' + A.photoAlt + '" decoding="async"></div>' +
      '<div class="hero__veil"></div>' +
      '<div class="hero__content">' +
        '<p class="hero__kicker reveal" style="--d:.2s">' + A.surtitre + '</p>' +
        '<h1 class="names">' +
          '<span class="names__l" data-words data-d=".5">' + C.prenom1 + '</span>' +
          '<span class="names__l names__amp" data-words data-d="1.2">&amp;</span>' +
          '<span class="names__l" data-words data-d="1.5">' + C.prenom2 + '</span>' +
        '</h1>' +
        '<p class="hero__lead reveal" style="--d:2.2s">' + A.phrase + '</p>' +
        '<p class="hero__when reveal" style="--d:2.5s">' + dateAffichee + '</p>' +
        '<div class="countdown reveal" style="--d:2.8s" id="countdown" role="timer" aria-label="Compte à rebours">' +
          cd('j', A.jours) + cd('h', A.heures) + cd('m', A.minutes) + cd('s', A.secondes) +
        '</div>' +
      '</div>' +
    '</header>';

    // 2. Histoire
    html += '<section class="sec sec--creme" id="histoire"><div class="wrap">' +
      '<h2 class="title" data-words>' + H.titre + '</h2>' +
      '<div class="orn reveal"></div>' +
      '<p class="intro-txt reveal">' + H.intro + '</p>' +
      '<div class="timeline" id="timeline"><div class="timeline__fill"></div>' +
      H.etapes.map(function (e) {
        return '<div class="step reveal"><span class="step__dot"></span>' +
          '<p class="step__quand">' + e.quand + '</p>' +
          '<h3 class="step__titre">' + e.titre + '</h3>' +
          '<p>' + e.texte + '</p></div>';
      }).join('') +
      '</div></div></section>';

    // 3. Galerie
    html += '<section class="sec sec--brun" id="galerie"><div class="wrap" style="max-width:40rem">' +
      '<h2 class="title" data-words>' + G.titre + '</h2>' +
      '<div class="orn reveal"></div>' +
      '<div class="gal" style="margin-top:3rem">' +
      G.photos.map(function (p) {
        return '<figure class="gal__item reveal"><img src="' + p.src + '" alt="' + p.alt + '" loading="lazy" decoding="async"></figure>';
      }).join('') +
      '</div></div></section>';

    // 4. Programme
    html += '<section class="sec sec--creme" id="programme"><div class="wrap">' +
      '<h2 class="title" data-words>' + P.titre + '</h2>' +
      '<div class="orn reveal"></div>' +
      '<ul class="prog" style="margin-top:2.4rem">' +
      P.moments.map(function (m, i) {
        return '<li class="reveal" style="--d:' + (i * 0.08) + 's">' +
          '<span class="prog__heure">' + m.heure + '</span>' +
          '<div><h3 class="prog__titre">' + m.titre + '</h3><p>' + m.texte + '</p></div></li>';
      }).join('') +
      '</ul></div></section>';

    // 5. Lieu
    html += '<section class="sec sec--sable" id="lieu"><div class="wrap lieu">' +
      '<h2 class="title" data-words>' + L.titre + '</h2>' +
      '<div class="orn reveal"></div>' +
      '<p class="lieu__nom reveal">' + L.nom + '</p>' +
      '<p class="lieu__adr reveal">' + L.adresse.join('<br>') + '</p>' +
      '<p class="reveal">' + L.note + '</p>' +
      '<div class="map reveal"><iframe title="Carte Google Maps" src="' + mapSrc + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>' +
      '<a class="btn reveal" href="' + routeHref + '" target="_blank" rel="noopener">' + L.bouton + '</a>' +
      '</div></section>';

    // 6. Tenue
    html += '<section class="sec sec--creme" id="tenue"><div class="wrap tenue">' +
      '<h2 class="title" data-words>' + T.titre + '</h2>' +
      '<div class="orn reveal"></div>' +
      '<p class="intro-txt reveal" style="margin-bottom:0">' + T.texte + '</p>' +
      '<div class="swatches">' +
      T.couleurs.map(function (c, i) {
        return '<div class="sw reveal" style="--d:' + (i * 0.15) + 's"><i style="background:' + c.hex + '"></i><span>' + c.nom + '</span></div>';
      }).join('') +
      '</div></div></section>';

    // 7. RSVP
    html += '<section class="sec sec--terra" id="rsvp"><div class="wrap rsvp">' +
      '<h2 class="title" data-words>' + R.titre + '</h2>' +
      '<div class="orn reveal"></div>' +
      '<p class="intro-txt reveal" style="margin-bottom:0">' + R.texte + '</p>' +
      '<p class="rsvp__limite reveal">' + R.dateLimite + '</p>' +
      '<a class="btn btn--clair reveal" href="' + R.url + '" target="_blank" rel="noopener">' + R.bouton + '</a>' +
      '</div></section>';

    // 8. Pied de page
    html += '<footer class="pied">' +
      '<p class="pied__phrase reveal">' + F.phrase + '</p>' +
      '<p class="pied__init reveal" style="--d:.2s">' + C.initialesPied + '</p>' +
      '<p class="pied__tag reveal" style="--d:.4s">' + F.hashtag + '</p>' +
      '</footer>';

    $('#site').innerHTML = html;
  }

  function cd(k, label) {
    return '<div class="cd"><b data-k="' + k + '">0</b><span>' + label + '</span></div>';
  }

  /* ---------- Titres mot par mot ---------- */
  function splitWords() {
    $$('[data-words]').forEach(function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.setAttribute('aria-label', el.textContent.trim());
      el.innerHTML = words.map(function (w, i) {
        return '<span class="w" aria-hidden="true" style="--i:' + i + '">' + w + '</span>';
      }).join(' ');
      if (el.dataset.d) el.style.setProperty('--d', el.dataset.d + 's');
    });
  }

  /* ---------- Apparition au défilement ---------- */
  var io = null;
  function startReveal() {
    var items = $$('.reveal, [data-words]');
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Compte à rebours ---------- */
  var timer = null;
  function tick() {
    var box = $('#countdown');
    if (!box) return;
    var diff = target.getTime() - Date.now();
    if (diff <= 0) {
      box.innerHTML = '<p class="cd__done">' + C.accueil.jourJ + '</p>';
      clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    var vals = {
      j: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60
    };
    Object.keys(vals).forEach(function (k) {
      var n = $('b[data-k="' + k + '"]', box);
      if (!n) return;
      var v = k === 'j' ? String(vals[k]) : String(vals[k]).padStart(2, '0');
      if (n.textContent !== v) n.textContent = v;
    });
  }

  /* ---------- Frise + profondeur de la galerie ---------- */
  var ticking = false;
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  function update() {
    ticking = false;
    var vh = window.innerHeight;

    var tl = $('#timeline');
    if (tl) {
      var r = tl.getBoundingClientRect();
      var p = reduced ? 1 : clamp((vh * 0.62 - r.top) / r.height, 0, 1);
      tl.style.setProperty('--p', p.toFixed(4));
      $$('.step', tl).forEach(function (st) {
        var y = st.querySelector('.step__dot').getBoundingClientRect().top;
        st.classList.toggle('is-on', reduced || y < vh * 0.62);
      });
    }

    if (!reduced) {
      $$('.gal__item').forEach(function (it) {
        var b = it.getBoundingClientRect();
        if (b.bottom < -150 || b.top > vh + 150) return;
        var c = (b.top + b.height / 2 - vh / 2) / (vh / 2 + b.height / 2);
        var y = -clamp(c, -1, 1) * b.height * 0.09;
        it.firstElementChild.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
      });
    }
  }

  /* ---------- Ouverture ---------- */
  function showSite() {
    var site = $('#site');
    document.body.classList.remove('is-locked');
    site.removeAttribute('inert');
    window.scrollTo(0, 0);
    site.classList.add('is-on');
    startReveal();
    update();
  }

  function setupIntro() {
    var intro = $('#intro');
    var btn = $('#openBtn');
    btn.addEventListener('click', function () {
      btn.disabled = true;
      if (reduced) {
        intro.parentNode.removeChild(intro);
        showSite();
        return;
      }
      intro.classList.add('is-open');                              // cachet, rabat, carte
      setTimeout(function () { intro.classList.add('is-leaving'); }, 3200);
      setTimeout(showSite, 3400);                                  // le site apparaît en fondu
      setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, 5000);
    });
    btn.focus({ preventScroll: true });
  }

  /* ---------- Démarrage ---------- */
  render();
  splitWords();
  tick();
  timer = setInterval(tick, 1000);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  setupIntro();
})();
