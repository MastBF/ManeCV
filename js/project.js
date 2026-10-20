(function () {
  const projects = window.PROJECTS;
  const id = new URLSearchParams(location.search).get("id");
  const index = projects.findIndex((p) => p.id === id);
  const p = projects[index];

  if (!p) {
    document.querySelector(".project-layout").innerHTML =
      '<p class="not-found">Project not found. <a href="index.html">Back home</a></p>';
    return;
  }

  document.title = `${window.SITE.name} — ${p.title}`;
  document.getElementById("title").textContent = p.title;
  document.getElementById("year").textContent = p.year;
  document.getElementById("desc").textContent = p.description;

  const credits = document.getElementById("credits");
  if (p.credits && p.credits.length) {
    credits.innerHTML = p.credits.map((c) => `<p>${c}</p>`).join("");
  } else {
    credits.remove();
  }

  const pad2 = (n) => String(n).padStart(2, "0");
  const total = p.media.length;

  // ---------- Лента работ ----------
  const media = document.getElementById("media");
  const SIZES = window.IMAGE_SIZES || {};

  // Каждая работа — <figure> с картинкой и номером
  const figures = p.media.map((m, i) => {
    const fig = document.createElement("figure");
    fig.className = "item reveal";
    fig.id = `m-${i + 1}`;
    fig.dataset.index = i;

    let el;
    if (m.type === "video") {
      el = document.createElement("video");
      el.src = m.src;
      el.muted = true;
      el.loop = true;
      el.autoplay = true;
      el.playsInline = true;
      el.setAttribute("muted", "");
      el.setAttribute("playsinline", "");
      if (m.poster) el.poster = m.poster;
      // размеры берём у кадра-обложки — место под видео резервируется заранее
      if (m.poster && SIZES[m.poster]) [el.width, el.height] = SIZES[m.poster];
      // некоторые браузеры не запускают autoplay сами — запускаем явно
      el.addEventListener("loadeddata", () => el.play().catch(() => {}));
    } else {
      el = document.createElement("img");
      el.src = m.src;
      el.alt = m.alt || `${p.title} — ${i + 1}`;
      el.decoding = "async";
      // размеры заранее — место под картинку резервируется, страница не прыгает
      if (SIZES[m.src]) [el.width, el.height] = SIZES[m.src];
    }
    fig.appendChild(el);

    const num = document.createElement("figcaption");
    num.className = "item-num";
    num.textContent = pad2(i + 1);
    fig.appendChild(num);
    return fig;
  });

  // Раскладка «каменной кладкой» (pageLayout: "masonry" в data.js):
  // каждая следующая работа встаёт в самую короткую колонку — без дыр между рядами.
  // Подходит проектам, где работы очень разной формы.
  if (p.pageLayout === "masonry") {
    const wall = document.createElement("div");
    wall.className = "media-masonry";
    media.appendChild(wall);

    // пропорция высота/ширина каждой работы — из sizes.js (для видео — по кадру-обложке)
    const ratio = (m) => {
      const s = SIZES[m.src] || (m.poster && SIZES[m.poster]);
      return s ? s[1] / s[0] : 1;
    };
    let current = 0;
    function build() {
      const W = wall.clientWidth || media.clientWidth;
      const gap = parseFloat(getComputedStyle(wall).columnGap) || 16;
      const min = Math.min(220, W * 0.4);
      const cols = Math.max(1, Math.floor((W + gap) / (min + gap)));
      if (cols === current) return;
      current = cols;
      wall.innerHTML = "";
      const columns = Array.from({ length: cols }, (_, c) => {
        const col = document.createElement("div");
        col.className = "masonry-col";
        col.style.setProperty("--d", `${(c * 0.08).toFixed(2)}s`); // волна при появлении
        wall.appendChild(col);
        return col;
      });
      const heights = new Array(cols).fill(0);
      figures.forEach((f, i) => {
        const c = heights.indexOf(Math.min(...heights));
        columns[c].appendChild(f);
        heights[c] += ratio(p.media[i]) + gap / ((W - gap * (cols - 1)) / cols);
      });
    }
    build();
    window.addEventListener("resize", build);
  }

  // Все работы проекта — в одной ступенчатой сетке, по несколько в ряд.
  // Полный размер — по клику, в просмотре на весь экран.
  const grid = document.createElement("div");
  grid.className = "media-grid";
  const useGrid = p.pageLayout !== "masonry";
  // Работы с одинаковым stack в data.js лежат в одной ячейке, одна под другой
  // (например, два невысоких ролика занимают место одного вертикального)
  const stacks = {};
  if (useGrid) figures.forEach((f, i) => {
    const key = p.media[i].stack;
    if (!key) return grid.appendChild(f);
    if (!stacks[key]) {
      stacks[key] = document.createElement("div");
      stacks[key].className = "item-stack";
      grid.appendChild(stacks[key]);
    }
    stacks[key].appendChild(f);
  });
  if (useGrid) media.appendChild(grid);

  // Ступеньки: каждая вторая колонка сетки опущена вниз
  function stagger() {
    if (!useGrid) return;
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    [...grid.children].forEach((f, i) => {
      const col = i % cols;
      f.style.setProperty("--shift", cols > 1 && col % 2 === 1 ? "18%" : "0%");
      f.style.setProperty("--d", `${(col * 0.08).toFixed(2)}s`); // волна при появлении
    });
    grid.classList.toggle("is-staggered", cols > 1);
  }
  stagger();
  window.addEventListener("resize", stagger);

  // ---------- Плавное появление при прокрутке ----------
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    figures.forEach((f) => io.observe(f));
  } else {
    figures.forEach((f) => f.classList.add("is-in"));
  }
  // Подстраховка: всё, что уже на экране или выше, показываем в любом случае
  function revealVisible() {
    const h = window.innerHeight;
    figures.forEach((f) => {
      if (!f.classList.contains("is-in") && f.getBoundingClientRect().top < h) f.classList.add("is-in");
    });
  }
  window.addEventListener("scroll", revealVisible, { passive: true });
  window.addEventListener("load", revealVisible);
  setTimeout(revealVisible, 1200);

  // ---------- Просмотр на весь экран ----------
  const lb = document.getElementById("lightbox");
  const lbStage = lb.querySelector(".lb-stage");
  const lbCount = lb.querySelector(".lb-count");
  let open = -1;

  function show(i) {
    open = (i + total) % total;
    const m = p.media[open];
    lbStage.innerHTML = "";
    const el = document.createElement(m.type === "video" ? "video" : "img");
    el.src = m.src;
    if (m.type === "video") {
      // на весь экран — со звуком и кнопками управления
      el.loop = true;
      el.autoplay = true;
      el.playsInline = true;
      el.controls = true;
      if (m.poster) el.poster = m.poster;
    } else el.alt = m.alt || p.title;
    // маленькие работы не раздуваем больше чем в 1.6 раза
    const s = SIZES[m.src] || (m.poster && SIZES[m.poster]);
    if (s) {
      el.style.maxWidth = `min(92vw, ${Math.round(s[0] * 1.6)}px)`;
      el.style.maxHeight = `min(88vh, ${Math.round(s[1] * 1.6)}px)`;
    }
    lbStage.appendChild(el);
    lbCount.textContent = `${pad2(open + 1)} / ${pad2(total)}`;
  }
  function openLb(i) {
    show(i);
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { lb.hidden = true; lbStage.innerHTML = ""; }, 250);
    const f = figures[open];
    open = -1;
    if (f) f.scrollIntoView({ block: "center" });
  }

  figures.forEach((f, i) => f.addEventListener("click", () => openLb(i)));
  lb.querySelector(".lb-prev").addEventListener("click", (e) => { e.stopPropagation(); show(open - 1); });
  lb.querySelector(".lb-next").addEventListener("click", (e) => { e.stopPropagation(); show(open + 1); });
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target === lbStage) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (open < 0) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") show(open - 1);
    else if (e.key === "ArrowRight") show(open + 1);
  });
  if (total < 2) lb.classList.add("is-single");

  // ---------- Пришли с миниатюры на главной — прокручиваем к нужной работе ----------
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      target.classList.add("is-in");
      const jump = () => target.scrollIntoView({ block: "center" });
      jump();
      window.addEventListener("load", jump);
    }
  }

  // Ссылка на следующий проект
  const next = projects[(index + 1) % projects.length];
  const nextLink = document.getElementById("next");
  nextLink.href = `project.html?id=${encodeURIComponent(next.id)}`;
  nextLink.textContent = `Next: ${next.title} →`;
})();
