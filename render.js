// Shared project renderer: used by project.html (one project per page) and onepage.html (all projects on one page).
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const pad = n => String(n).padStart(2, '0');
  window.esc = esc; window.pad = pad;

  // opts.oneP: true -> each project is a <section> with an h2 title and ids (one-page site)
  window.renderProject = function (P, idx, opts) {
    opts = opts || {};
    const p = P.projects[idx];
    const a = f => `assets/${p.slug}/${f}`;
    const views = p.views || [], drawings = p.drawings || [], groups = p.analysis || [];
    const hero = a(p.cover || (views[0] && views[0][0]));
    const id = s => `${p.slug}-${s}`;
    const fig = (f, cap, label) => `<figure><div class="im"><img src="${a(f)}" alt="${esc(cap)}" loading="lazy"></div><figcaption><b>${label}</b><span>${esc(cap)}</span></figcaption></figure>`;
    const tb = (p.specs || []).map(s => `<div><dt>${esc(s[0])}</dt><dd>${esc(s[1])}</dd></div>`).join('');
    let sec = 0;
    const head = (t, r) => `<h2 class="h"><span>${pad(++sec)} ${t}</span><span>${r || ''}</span></h2>`;
    const title = opts.oneP ? `<h2 class="ptitle">${esc(p.title)}</h2>` : `<h1>${esc(p.title)}</h1>`;
    const back = opts.oneP ? '' : '<a class="back" href="index.html">&larr; All work</a>';
    return `
  <article class="proj" id="${p.slug}">
  <div class="ph">${back}
    <span class="no">PROJECT ${pad(idx + 1)}</span>
    ${title}<p class="lead">${esc(p.tagline)}</p></div>
  <div class="hero"><img src="${hero}" alt="${esc(p.title)}"></div>
  <dl class="tb">${tb}</dl>

  ${head('Overview')}
  <div class="text2"><p>${esc(p.summary)}</p><ul class="act">${(p.highlights || []).map(h => `<li>${esc(h)}</li>`).join('')}</ul></div>
  <p class="toolline">${esc((p.tools || []).join('  /  '))}</p>

  ${views.length ? head('Views', views.length + ' views') + `<div class="figs">${views.map((v, i) => fig(v[0], v[1], 'V' + pad(i + 1))).join('')}</div>` : ''}
  ${drawings.length ? head('Drawings', drawings.length + ' sheets') + `<div class="sheets">${drawings.map((v, i) => fig(v[0], v[1], 'D' + pad(i + 1))).join('')}</div>` : ''}
  ${groups.length ? head('Analysis and tests', 'simulated unless stated') + groups.map((g, gi) => `<h3 class="g">${esc(g.title)}</h3><div class="figs ${g.items.length >= 3 ? 'three' : ''}">${g.items.map((v, i) => fig(v[0], v[1], 'A' + (gi + 1) + '.' + (i + 1))).join('')}</div>`).join('') : ''}

  ${(p.results || []).length ? head('Results') + `<div class="tablewrap"><table><thead><tr><th>Check</th><th>Result</th><th>Margin / status</th></tr></thead><tbody>${p.results.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div>` : ''}

  ${head('Files')}
  <ul class="files">${(p.downloads || []).map(d => { const ext = d[1].split('.').pop().toUpperCase(); return `<li><a href="${a(d[1])}">${esc(d[0].replace(/\s*\([^)]*\)\s*$/, ''))}</a><span class="ext">${ext}</span></li>`; }).join('')}</ul>

  ${p.notes ? head('Limits and assumptions') + `<p class="note">${esc(p.notes)}</p>` : ''}
  </article>`;
  };

  // click an image to open it full size; click again or Esc to close
  window.initLightbox = function () {
    const lb = document.getElementById('lb'), lbi = lb.querySelector('img');
    document.addEventListener('click', e => {
      if (e.target.matches('figure img, .hero img')) { lbi.src = e.target.src; lb.classList.add('on'); lb.scrollTop = 0; }
      else if (lb.classList.contains('on')) lb.classList.remove('on');
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });
  };
})();
