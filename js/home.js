(function () {
  const site = window.SITE;
  const projects = window.PROJECTS;

  const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

  // Простой генератор псевдослучайных чисел от строки,
  // чтобы «хаотичная» раскладка не менялась при каждой загрузке
  function seeded(str) {
    let h = 2166136261;
    for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return () => {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  }

  function mediaEl(src) {
    const el = document.createElement(isVideo(src) ? "video" : "img");
    el.src = src;
    if (el.tagName === "VIDEO") {
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.preload = "metadata";
    } else {
      el.alt = "";
      el.decoding = "async";
    }
    return el;
  }

  // Приветствие
  const intro = document.getElementById("intro");
  // Первая строка: «Hi, I'm» — серым, имя — тёмным
  const [hello, ...about] = site.intro;
  const helloHtml = hello.replace(site.name, `<span class="intro-name">${site.name}</span>`);
  const lines = [
    `<p class="intro-hello">${helloHtml}</p>`,
    ...about.map((line) => `<p>${line}</p>`),
    `<p class="intro-contact">E-mail: <a class="intro-link" href="mailto:${site.email}">${site.email}</a></p>`,
    // Instagram: показываем ник из ссылки (@bzbz.design), открывается в новой вкладке
    ...(site.instagram
      ? [`<p>Instagram: <a class="intro-link" href="${site.instagram}" target="_blank" rel="noopener">@${site.instagram.replace(/\/+$/, "").split("/").pop()}</a></p>`]
      : []),
    `<p><a class="intro-link" href="${site.cvUrl}" download="${site.cvFileName}">Download CV</a></p>`,
  ];
  // --i — номер строки, чтобы строки появлялись по очереди
  intro.innerHTML = lines.map((l, i) => l.replace("<p", `<p style="--i:${i}"`)).join("");

  const list = document.getElementById("projects");
  const preview = document.getElementById("preview");

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // Раскладка миниатюр — свободный коллаж.
  // 1) Делим панель на ячейки так, чтобы картинки были как можно крупнее.
  // 2) В каждой ячейке картинка получает свой размер, поворот и сдвиг
  //    (тем сильнее, чем больше chaos у проекта).
  // 3) Повёрнутая картинка всегда зажимается внутри панели — ничего не обрезается.
  function layout(grid) {
    if (grid.isVideo) return; // видео-заставка раскладывается одним CSS
    const items = [...grid.children];
    const n = items.length;
    if (!n || !grid.clientWidth) return;
    const pad = parseFloat(getComputedStyle(grid).paddingTop) || 0;
    const W = grid.clientWidth - pad * 2;
    const H = grid.clientHeight - pad * 2;
    const chaos = grid.chaos;

    const ratios = items.map((t) => {
      const m = t.firstElementChild;
      const w = m.naturalWidth || m.videoWidth, h = m.naturalHeight || m.videoHeight;
      return w && h ? w / h : 0.8;
    });
    const a = ratios.reduce((s, r) => s + r, 0) / n;

    // «Своя композиция»: каждая картинка стоит там, где задано в data.js
    // (координаты центра и ширина в пикселях макета; если задана и высота h —
    // картинка обрезается под эту ячейку). Композиция целиком
    // масштабируется под панель и встаёт по центру.
    if (grid.free) {
      const spots = grid.free.map((s, i) => ({ ...s, h: s.h || s.w / ratios[i] }));
      items.forEach((t, i) => t.classList.toggle("is-crop", !!grid.free[i].h));
      const minX = Math.min(...spots.map((s) => s.x - s.w / 2));
      const maxX = Math.max(...spots.map((s) => s.x + s.w / 2));
      const minY = Math.min(...spots.map((s) => s.y - s.h / 2));
      const maxY = Math.max(...spots.map((s) => s.y + s.h / 2));
      // previewScale в data.js — какую часть панели занимает композиция (по умолчанию 0.92)
      const k = Math.min(W / (maxX - minX), H / (maxY - minY)) * (grid.freeScale || 0.92);
      const x0 = pad + (W - (maxX - minX) * k) / 2;
      const y0 = pad + (H - (maxY - minY) * k) / 2;
      items.forEach((t, i) => {
        const s = spots[i];
        t.style.width = `${s.w * k}px`;
        t.style.height = `${s.h * k}px`;
        t.style.left = `${x0 + (s.x - s.w / 2 - minX) * k}px`;
        t.style.top = `${y0 + (s.y - s.h / 2 - minY) * k}px`;
        t.style.setProperty("--rot", `${s.r || 0}deg`);
        t.style.zIndex = "1";
      });
      return;
    }

    // «Пак»: плотная сетка без зазоров, как лента в Instagram, по центру панели
    if (grid.pack) {
      const cols = grid.pack, rows = Math.ceil(n / cols);
      const tileW = Math.min(W / cols, (H / rows) * a);
      const tileH = tileW / a;
      const x0 = pad + (W - cols * tileW) / 2;
      const y0 = pad + (H - rows * tileH) / 2;
      items.forEach((t, i) => {
        t.style.width = `${tileW}px`;
        t.style.height = `${tileH}px`;
        t.style.left = `${x0 + (i % cols) * tileW}px`;
        t.style.top = `${y0 + Math.floor(i / cols) * tileH}px`;
        t.style.setProperty("--rot", "0deg");
        t.style.zIndex = "1";
      });
      return;
    }

    let best = null;
    for (let cols = 1; cols <= n; cols++) {
      const rows = Math.ceil(n / cols);
      const cw = W / cols, ch = H / rows;
      const shown = Math.min(cw, ch * a) * Math.min(ch, cw / a);
      if (!best || shown > best.shown) best = { cols, rows, cw, ch, shown };
    }
    const { cols, rows, cw, ch } = best;

    items.forEach((t, i) => {
      const [r1, r2, r3, r4, r5] = t.rnd;
      const row = Math.floor(i / cols), col = i % cols;
      const inRow = row === rows - 1 ? n - cols * (rows - 1) : cols;
      const rowShift = ((cols - inRow) * cw) / 2; // неполный последний ряд — по центру

      // размер: вписываем в ячейку и немного уменьшаем, у каждой картинки по-своему
      const ar = ratios[i];
      const fit = Math.min(cw, ch * ar);
      const s = 0.9 - chaos * 0.22 * r1;
      const w = fit * s, h = (fit / ar) * s;

      // поворот и габарит повёрнутой картинки
      const rot = (r2 * 2 - 1) * 8 * chaos;
      const rad = (Math.abs(rot) * Math.PI) / 180;
      const bw = w * Math.cos(rad) + h * Math.sin(rad);
      const bh = w * Math.sin(rad) + h * Math.cos(rad);

      // центр: в своей ячейке + случайный сдвиг, может немного заходить на соседей
      let cx = pad + rowShift + col * cw + cw / 2 + (r3 * 2 - 1) * (Math.max(0, cw - bw) / 2 + chaos * 0.18 * cw);
      let cy = pad + row * ch + ch / 2 + (r4 * 2 - 1) * (Math.max(0, ch - bh) / 2 + chaos * 0.18 * ch);
      cx = clamp(cx, pad + bw / 2, pad + W - bw / 2);
      cy = clamp(cy, pad + bh / 2, pad + H - bh / 2);

      t.style.width = `${w}px`;
      t.style.height = `${h}px`;
      t.style.left = `${cx - w / 2}px`;
      t.style.top = `${cy - h / 2}px`;
      t.style.setProperty("--rot", `${rot.toFixed(2)}deg`);
      t.style.zIndex = String(1 + Math.floor(r5 * 10));
    });
  }

  // Активная строка/сетка + скрытие с небольшой задержкой,
  // чтобы курсор успел перейти со строки на миниатюры.
  let active = null;
  let hideTimer = null;

  function show(grid) {
    clearTimeout(hideTimer);
    if (active === grid) return;
    if (active) {
      active.classList.remove("is-active");
      active.querySelectorAll("video").forEach((v) => v.pause());
      active.row.classList.remove("is-active");
    }
    active = grid;
    // Пока видны миниатюры — светлый фон, иначе панель снова чёрная
    preview.style.backgroundColor = grid ? grid.bg : "";
    if (grid) {
      layout(grid);
      grid.classList.add("is-active");
      grid.querySelectorAll("video").forEach((v) => {
        if (grid.isVideo) v.currentTime = 0; // заставка каждый раз начинается сначала
        v.play().catch(() => {});
      });
      grid.row.classList.add("is-active");
    }
  }
  // Проект с featured: true виден сразу при входе; когда курсор уходит — возвращаемся к нему
  let featuredGrid = null;
  const scheduleHide = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => show(featuredGrid), 350);
  };

  projects.forEach((p) => {
    const href = `project.html?id=${encodeURIComponent(p.id)}`;

    // Сетка миниатюр проекта в левой панели
    const grid = document.createElement("div");
    grid.className = p.previewPack ? "preview-grid is-pack" : "preview-grid";
    grid.pack = p.previewPack || 0; // число колонок в «паке» или 0 — обычный коллаж
    grid.free = p.previewLayout || null; // своя композиция: [{ n, x, y, w, h?, r? }]
    if (grid.free) grid.classList.add("is-free");
    grid.freeScale = p.previewScale || 0;
    grid.bg = p.background || site.previewBackground || "#fff";
    grid.chaos = p.chaos ?? site.previewChaos ?? 0.6;

    // p.previewVideo — вместо миниатюр при наведении играет видео-заставка
    if (p.previewVideo) {
      grid.isVideo = true;
      grid.classList.add("is-video");
      const link = document.createElement("a");
      link.className = "preview-video";
      link.href = href;
      link.tabIndex = -1;
      const v = document.createElement("video");
      v.src = p.previewVideo;
      if (p.previewPoster) v.poster = p.previewPoster;
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = "auto";
      v.setAttribute("muted", "");
      link.appendChild(v);
      grid.appendChild(link);
    }

    // p.preview — номера работ (с 1), которые показывать при наведении; иначе все.
    // В previewLayout вместо номера можно указать src — картинку, которой нет в проекте.
    const picks = p.previewVideo ? []
      : p.previewLayout ? p.previewLayout.map((s) => (s.src ? { src: s.src } : s.n))
      : p.preview || p.media.map((_, i) => i + 1);
    if (grid.free) grid.free = grid.free.filter((s) => s.src || p.media[s.n - 1]);
    const rand = seeded(p.id);
    picks.forEach((pick) => {
      const n = typeof pick === "number" ? pick : 0;
      const m = n ? p.media[n - 1] : pick;
      if (!m) return;
      const thumb = document.createElement("a");
      thumb.className = "thumb";
      thumb.href = n ? `${href}#m-${n}` : href;
      thumb.tabIndex = -1;
      // свои случайные числа у каждой картинки — раскладка одна и та же при каждом заходе
      thumb.rnd = [rand(), rand(), rand(), rand(), rand()];
      const el = mediaEl(m.src);
      el.addEventListener(el.tagName === "VIDEO" ? "loadedmetadata" : "load", () => {
        if (active === grid) layout(grid);
      });
      thumb.appendChild(el);
      grid.appendChild(thumb);
    });
    preview.appendChild(grid);

    // Строка в таблице
    const li = document.createElement("li");
    li.innerHTML =
      `<a href="${href}">` +
      `<span class="cat">${p.category}</span>` +
      `<span class="title">${p.title}</span>` +
      `<span class="year">${p.year}</span></a>`;
    const row = li.firstElementChild;
    grid.row = row;
    row.addEventListener("mouseenter", () => show(grid));
    row.addEventListener("focus", () => show(grid));
    list.appendChild(li);

    if (p.featured && !featuredGrid) {
      featuredGrid = grid;
      addMobileFeatured(p, href);
    }
  });

  // На телефоне левой панели нет — показываем избранный проект лентой под приветствием
  function addMobileFeatured(p, href) {
    const box = document.createElement("section");
    box.className = "featured-mobile";
    const picks = p.preview || p.media.map((_, i) => i + 1);
    box.innerHTML =
      `<a class="featured-mobile-head" href="${href}"><span>${p.title}</span><span>${p.year}</span></a>` +
      `<div class="featured-mobile-strip">` +
      picks
        .filter((n) => p.media[n - 1])
        .map((n) => `<a href="${href}#m-${n}"><img src="${p.media[n - 1].src}" alt="${p.title}" loading="lazy" decoding="async"></a>`)
        .join("") +
      `</div>`;
    list.before(box);
  }

  if (featuredGrid) show(featuredGrid);

  list.addEventListener("mouseleave", scheduleHide);
  preview.addEventListener("mouseleave", scheduleHide);
  preview.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  window.addEventListener("resize", () => active && layout(active));
})();
