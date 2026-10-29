// Page behaviour: source preview rendering, lightbox, scroll-spy, local-file links. No dependencies.
(function () {
  const d = document, body = d.body;

  // Source preview: the built pages arrive prerendered; the source pages render themselves from projects.js.
  if (!d.getElementById('main') && window.PR && window.PORTFOLIO) {
    const P = window.PORTFOLIO, kind = body.dataset.page, ctx = { root: '', mode: kind === '1p' ? '1p' : 'dev', parts: window.PARTS };
    let idx = -1;
    if (kind === 'project') {
      idx = P.projects.findIndex(x => x.slug === new URLSearchParams(location.search).get('p') && x.status === 'complete');
      if (idx >= 0) d.title = P.projects[idx].title + ' | ' + P.owner;
    }
    d.getElementById('app').innerHTML = PR.page(kind === 'project' && idx < 0 ? '404' : kind, P, ctx, idx);
    if (location.hash) { const t = d.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  }

  // Opened from disk (file://): folder links need an explicit index.html.
  if (location.protocol === 'file:') d.querySelectorAll('a[href]').forEach(a => {
    const h = a.getAttribute('href');
    if (/^(\.\.?\/|[\w-]+\/)([\w-]+\/)?(#.*)?$/.test(h)) a.setAttribute('href', h.replace(/\/(#.*)?$/, '/index.html$1'));
  });

  // Lightbox: click a figure to open it; Esc closes; arrow keys step through the figures of the same project.
  const lb = d.getElementById('lb');
  if (lb && lb.showModal) {
    const img = lb.querySelector('img'), cap = lb.querySelector('.lbcap'), cnt = lb.querySelector('.lbn'), open = lb.querySelector('.lbopen');
    let set = [], i = 0;
    const show = k => {
      i = (k + set.length) % set.length;
      const a = set[i], t = a.querySelector('img');
      img.removeAttribute('src');
      img.src = a.getAttribute('href'); img.alt = t ? t.alt : '';
      cap.textContent = a.dataset.cap || img.alt;
      cnt.textContent = (i + 1) + ' / ' + set.length;
      open.href = a.getAttribute('href');
      lb.classList.toggle('single', set.length < 2);
    };
    d.addEventListener('click', e => {
      const a = e.target.closest && e.target.closest('a.zoom');
      if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
      e.preventDefault();
      set = [...(a.closest('article') || d).querySelectorAll('a.zoom')];
      show(set.indexOf(a));
      lb.showModal();
      d.documentElement.classList.add('lb-on');
    });
    lb.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (b) { b.dataset.go === 'close' ? lb.close() : show(i + +b.dataset.go); return; }
      if (e.target === lb || e.target.classList.contains('lbstage')) lb.close();
    });
    lb.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    });
    lb.addEventListener('close', () => { d.documentElement.classList.remove('lb-on'); img.removeAttribute('src'); });
  }

  // Scroll-spy: highlight the nav link of the section in view.
  d.querySelectorAll('nav[data-spy]').forEach(nav => {
    const links = [...nav.querySelectorAll('a[href^="#"]')], map = new Map();
    links.forEach(a => { const t = d.getElementById(a.getAttribute('href').slice(1)); if (t) map.set(t, a); });
    if (!map.size || !('IntersectionObserver' in window)) return;
    const vis = new Set();
    const io = new IntersectionObserver(es => {
      es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target));
      const top = [...map.keys()].filter(t => vis.has(t)).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
      links.forEach(a => a.removeAttribute('aria-current'));
      if (top) {
        const a = map.get(top); a.setAttribute('aria-current', 'true');
        const box = nav.querySelector('.tocin') || nav;
        if (box.scrollWidth > box.clientWidth) box.scrollTo({ left: a.offsetLeft - 24, behavior: 'auto' });
      }
    }, { rootMargin: '-20% 0px -70% 0px' });
    map.forEach((a, t) => io.observe(t));
  });
})();
