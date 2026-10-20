/*
  ВСЕ ДАННЫЕ САЙТА — В ЭТОМ ФАЙЛЕ.
  Чтобы поправить проект: поменяй текст, год, категорию или пути к картинкам/видео.
  Свои файлы клади в папку assets/ и указывай путь вида "assets/my-photo.jpg".
  Видео: { type: "video", src: "assets/clip.mp4" } — играет без звука по кругу.
  Порядок картинок на странице проекта = порядок в списке media.

  [TODO] — временный текст, который нужно заменить на свой.
*/

window.SITE = {
  name: "Mane Sahradyan",
  intro: [
    "Hi, I'm Mane Sahradyan",
    "A graphic designer currently based in Yerevan",
    "Interested in Branding, Motion, Posters, SMM, AI Visuals, Illustration and Photography"
  ],
  // Фон левой панели по умолчанию, когда видны миниатюры.
  // У каждого проекта ниже задан свой цвет в поле background.
  previewBackground: "#d9d6d0",
  // Насколько хаотично лежат миниатюры: 0 — ровная сетка, 1 — максимум поворотов и сдвигов.
  // У проекта можно задать своё значение в поле chaos.
  previewChaos: 0.6,
  // В самом резюме (PDF) почта написана как mane.sahradian.y@gmail.com — проверить, какая верная
  email: "mane.sahradyan.y@gmail.com",
  instagram: "https://www.instagram.com/bzbz.design/",
  // Резюме: чтобы обновить, замени файл assets/cv.pdf новым (с тем же именем).
  cvUrl: "assets/cv.pdf",
  cvFileName: "Mane-Sahradyan-CV.pdf", // под этим именем файл сохранится у посетителя
};

const img = (src) => ({ type: "image", src: `assets/${src}` });
const numbered = (folder, count) =>
  Array.from({ length: count }, (_, i) => img(`${folder}/${String(i + 1).padStart(2, "0")}.jpg`));

const SMM_ORDER = [
  1, 2, 3, 4,                         // ленты целиком
  8, 11, 12, 13,                      // Manor Matrix — крупные
  5, 6, 7, 9, 10, 14, 15,             // Manor Matrix — маленькие
  16, 17, 18, 19, 20, 21,             // Rafael и iMachinery — маленькие
  22, 23, 24, 25, 26, 27, 28, 29, 30, // Meranjson — крупные
  34, 38,                             // Innwork — крупные
  31, 32, 33, 35, 36, 37, 39,         // Innwork — маленькие
];

// [TODO] Годы и описания ниже — черновики. Поправь их под реальные факты.
window.PROJECTS = [
  {
    id: "posters", category: "Poster", title: "Posters", year: "2026",
    cover: "assets/posters/arshaluys.jpg",
    background: "#2d2c2c", // тёмный графит — красно-чёрно-белые постеры на нём звучат сильнее
    description:
      "A poster series inspired by Armenian culture, art, and heritage, reinterpreted through a contemporary visual language.",
    credits: [],
    media: [
      "arshaluys", "rossia-cinema", "gyumri", "zvartnots", "lernayin-par",
      "mer-sarere", "remember", "ararat", "tolma", "uno-cards",
      "polytech", // кадр из анимации «Политех» (assets/anim/04.mp4)
    ].map((name) => img(`posters/${name}.jpg`)),
    // На главной при наведении — лента 5×2 (номера работ в media выше, слева направо, сверху вниз)
    previewPack: 5,
    preview: [
      2, 9, 3, 7, 11, // Rossia Cinema · Make Tolma Not War · Gyumri · Remember · Политех
      8, 1, 6, 4, 5,  // Ararat · Arshaluys · Мер сарере · [TODO: постер «ՋՈՒՐ» — пока Zvartnots] · Лернайин пар
    ],
  },
  {
    id: "smm", category: "Social Media", title: "SMM", year: "2026",
    cover: "assets/ads/01.jpg",
    background: "#2d2c2c", // тёмный графит — синий Lexus и красно-оранжевый Burger King на нём особенно яркие
    description:
      "Social media design for diverse brands, including major companies like Lexus Yerevan and Burger King, " +
      "as well as businesses in technology, construction, fashion, and coworking. " +
      "Each project features a distinctive visual identity, consistent feed design, " +
      "and engaging promotional content in Armenian and English.",
    credits: [],
    // Порядок на странице проекта: сначала Lexus и Burger King (assets/ads/),
    // дальше остальные бренды (номера файлов из assets/smm/ — см. SMM_ORDER выше).
    media: [
      img("ads/01.jpg"), // Lexus — CASCO
      img("ads/02.jpg"), // Lexus — технологии безопасности
      img("ads/03.jpg"), // Lexus — скидка 10% на тормозные детали
      img("ads/04.jpg"), // Burger King — The Best Burger
      img("ads/05.jpg"), // Burger King — доставка
      img("ads/06.jpg"), // Burger King — Appetizing
      img("ads/07.jpg"), // Burger King — Whopper
      img("ads/08.jpg"), // Burger King — Shrimps
      ...SMM_ORDER.map((n) => img(`smm/${String(n).padStart(2, "0")}.jpg`)),
    ],
    // На главной при наведении — лента 4×2 из постов Lexus и Burger King (первые 8 работ выше).
    // Порядок перемешан, чтобы цвета не собирались в кучу: холодные Lexus стоят «в шахматку»
    // между тёплыми Burger King, красные и оранжевые посты не соседствуют.
    previewPack: 4,
    preview: [
      1, 6, 2, 4, // CASCO · Appetizing · технологии · The Best Burger
      5, 3, 8, 7, // доставка · скидка 10% · Shrimps · Whopper
    ],
  },
  {
    id: "ai-models", category: "AI, Product", title: "AI Models", year: "2026",
    cover: "assets/ai/01.jpg",
    background: "#ffffff", // белый — как студийный фон самих снимков
    chaos: 0.8,
    description:
      "A series of AI-generated product visuals: everyday objects reimagined as collectible studio shots. " +
      "Branded keychains, a safety-vest bag, a keyboard grenade, a chrome key and a weathered traffic light — " +
      "each one built through prompting and refinement to look like a real photographed object.",
    credits: [],
    media: numbered("ai", 6),
  },
  {
    id: "art", category: "Illustration, Collage", title: "Art", year: "2026",
    cover: "assets/art/01.jpg",
    background: "#ffffff", // белый — как чистый лист под скетчбуком
    chaos: 1, // самый «живой» коллаж — как листы скетчбука, брошенные на стол
    description:
      "A selection of pages from my sketchbook: expressive oil-pastel portraits, ink drawings and paper collages. " +
      "This is where I experiment freely with color, faces and found imagery before bringing ideas into digital work.",
    credits: [],
    // Порядок работ: номера файлов из assets/art/
    media: [
      ...[9, 2, 5, 7, 1, 10, 4, 8, 3, 6].map((n) => img(`art/${String(n).padStart(2, "0")}.jpg`)),
      img("art/collage.png"), // 11 — большой журнальный коллаж («TOTAL: 0€»), PNG с прозрачными краями
    ],
    // Композиция на главной — как в макете (центр x, y и ячейка w×h в пикселях макета 918×554).
    // n — номер работы в media выше; порядок строк = кто лежит сверху (ниже по списку — выше).
    previewLayout: [
      { n: 5, x: 151, y: 166, w: 132, h: 197 },  // оранжевое лицо с каракулями
      { n: 2, x: 320, y: 130, w: 136, h: 200 },  // бумажный коллаж-лицо
      { n: 3, x: 535, y: 125, w: 126, h: 190 },  // красно-оранжевое лицо на жёлтом
      { n: 4, x: 650, y: 160, w: 104, h: 168 },  // лицо с зелёно-розовыми волосами
      { n: 7, x: 428, y: 220, w: 104, h: 166 },  // коллаж с глазами
      { n: 1, x: 249, y: 304, w: 112, h: 168 },  // сине-красный набросок
      { n: 8, x: 128, y: 382, w: 129, h: 170 },  // король червей
      { n: 6, x: 346, y: 363, w: 85, h: 127 },   // много лиц тушью
      { n: 9, x: 430, y: 416, w: 96, h: 146 },   // зелёное лицо на розовом
      // [TODO] в макете — фото настоящего листа на мятой бумаге; пока стоит постер Tolma
      { src: "assets/posters/tolma.jpg", x: 536, y: 310, w: 124, h: 155 },
      { n: 10, x: 656, y: 381, w: 112, h: 169 }, // Мона Лиза на фоне домов
      { n: 11, x: 776, y: 238, w: 152 },         // большой коллаж (без обрезки — края рваные)
    ],
  },
  {
    id: "photos", category: "Photography", title: "Photos", year: "2026",
    cover: "assets/photo/01.jpg",
    background: "#33424a", // тёмный графитово-синий — подчёркивает чёрно-белые кадры
    description:
      "Everyday observations from Armenia: architecture, landscapes, markets and people. " +
      "Black-and-white frames sit next to bright food still lifes — a personal archive that often feeds my poster work.",
    credits: [],
    // 1–8 — первые фото; 9, 10 — триптихи (ягоды, горы, гриб / грибы); 11 — белые грибы; 12 — оранжевые грибы
    media: numbered("photo", 12),
    // Композиция на главной — как в макете (центр x, y и размер ячейки w×h в пикселях макета 1030×900).
    // Фото обрезается под свою ячейку.
    previewLayout: [
      { n: 3, x: 132, y: 215, w: 211, h: 407 }, // изогнутое здание
      { n: 6, x: 433, y: 105, w: 368, h: 186 }, // машина у деревьев
      { n: 12, x: 432, y: 315, w: 371, h: 208 }, // оранжевые грибы на бревне
      { n: 11, x: 821, y: 93, w: 358, h: 148 },  // белые грибы на камне
      { n: 1, x: 821, y: 291, w: 358, h: 229 }, // волейбол
      { n: 8, x: 321, y: 525, w: 588, h: 182 }, // скульптура
      { n: 2, x: 321, y: 763, w: 588, h: 255 }, // перцы и базилик
      { n: 4, x: 821, y: 655, w: 358, h: 471 }, // здание с острыми крышами
    ],
  },
  {
    id: "branding", category: "Branding, Identity", title: "Branding", year: "2026",
    cover: "assets/branding/metro-logo-poster.jpg",
    background: "#ffffff", // белый — как фон самой анимации логотипа
    // При наведении на главной вместо миниатюр играет это видео (по кругу, без звука)
    previewVideo: "assets/branding/metro-logo.mp4",
    previewPoster: "assets/branding/metro-logo-poster.jpg",
    description:
      "Two identity projects: Gym & Box, a fitness brand built around strength and precision, " +
      "with geometric patterns applied across apparel and accessories. " +
      "Yerevan Metro, a university project focused on making public transport more accessible " +
      "through clear typography, bold colors, and simple geometric elements.",
    credits: [],
    media: [
      // Gym & Box
      img("branding/01.jpg"), img("branding/02.jpg"), img("branding/03.jpg"), img("branding/04.jpg"),
      // Yerevan Metro
      { type: "video", src: "assets/branding/metro-logo.mp4", poster: "assets/branding/metro-logo-poster.jpg" },
      img("branding/05.jpg"), img("branding/06.jpg"), img("branding/07.jpg"),
      img("branding/08.jpg"), img("branding/09.jpg"), img("branding/10.jpg"),
    ],
  },
  {
    id: "animations", category: "Motion", title: "Animations", year: "2026",
    cover: "assets/anim/01-poster.jpg",
    background: "#2d2c2c", // тёмный графит — чёрно-белое видео на нём смотрится кинематографично
    // При наведении на главной играет это видео (по кругу, без звука)
    previewVideo: "assets/anim/01.mp4",
    previewPoster: "assets/anim/01-poster.jpg",
    description:
      "A series of motion design experiments inspired by Armenian culture and art, combining traditional visual elements, " +
      "mixed media, and animation techniques using After Effects.",
    credits: [],
    // Порядок роликов (номера файлов из assets/anim/).
    // 1 и 7 — невысокие, поэтому лежат в одной ячейке (stack): белое видео 7 — под первым роликом.
    // 8 — вертикальный, стоит в конце рядом с остальными роликами формата Reels.
    media: [1, 7, 2, 3, 4, 5, 6, 8].map((n) => ({
      type: "video",
      src: `assets/anim/${String(n).padStart(2, "0")}.mp4`,
      poster: `assets/anim/${String(n).padStart(2, "0")}-poster.jpg`,
      ...(n === 1 || n === 7 ? { stack: "top" } : {}),
    })),
  },
  {
    id: "ararat-73", category: "Film Poster, Tickets", title: "Ararat ’73", year: "2026",
    cover: "assets/ararat73/intro-poster.jpg",
    background: "#2d2b2c", // ровно цвет фона самого видео — заставка сливается с панелью
    // При наведении на главной играет это видео (по кругу, без звука)
    previewVideo: "assets/ararat73/intro.mp4",
    previewPoster: "assets/ararat73/intro-poster.jpg",
    description:
      "Film poster and ticket design for Ararat ’73, dedicated to football legend Nikita Simonyan. " +
      "The design features a bold 3D gold Armenian title, stadium lights, and the team in blue. " +
      "The artwork was displayed on banners and posters at Kino Moscow, one of Yerevan’s largest cinemas, " +
      "and featured on cinema tickets.",
    credits: [],
    media: [
      { type: "video", src: "assets/ararat73/intro.mp4", poster: "assets/ararat73/intro-poster.jpg" },
      img("ararat73/01.jpg"), // золотой заголовок
      img("ararat73/02.jpg"), // афиша и баннер
      img("ararat73/03.jpg"), // билеты
      img("ararat73/04.jpg"), // фасад кинотеатра «Москва»
    ],
  },
  {
    id: "stamps", category: "Illustration, Print", title: "Stamps", year: "2026",
    cover: "assets/stamps/ararat.png",
    background: "#2d2c2c", // тёмный графит — как в макете, марки на нём светятся
    description:
      "A series of postage stamps dedicated to the mountains of Armenia: Khustup, Azhdahak, Aragats, Ararat and Dimats. " +
      "Each peak is rendered as a grainy monochrome blue landscape that rises over a bold orange condensed headline, " +
      "framed by the classic perforated edge of a stamp.",
    credits: [],
    media: ["khustup", "azhdahak", "aragats", "ararat", "dimats"].map((name) => img(`stamps/${name}.png`)),
    // Композиция на главной — как в макете: n — номер марки в media,
    // x, y — центр, w — ширина (в пикселях макета 1050×920)
    previewLayout: [
      { n: 1, x: 335, y: 338, w: 240 }, // Khustup
      { n: 2, x: 727, y: 340, w: 248 }, // Azhdahak
      { n: 3, x: 202, y: 593, w: 250 }, // Aragats
      { n: 4, x: 539, y: 580, w: 342 }, // Ararat
      { n: 5, x: 871, y: 602, w: 243 }, // Dimats
    ],
  },
  {
    id: "coffee-postcard", category: "Illustration, Print", title: "Coffee Postcard", year: "2026",
    cover: "assets/coffee/04-postcard.png",
    background: "#ffffff", // белый — как скатерть на фотографиях
    // На странице проекта — «каменная кладка»: работы очень разной формы, так меньше пустых мест
    pageLayout: "masonry",
    description:
      "Illustration inspired by Armenian coffee culture, celebrating the tradition of sharing coffee and connecting with others. " +
      "The project includes a postcard series and a promotional video, combining illustration and visual storytelling " +
      "to bring this everyday ritual to life.",
    credits: [],
    media: [
      img("coffee/01.jpg"),               // стол сверху: фрукты, выпечка, две чашки
      img("coffee/02.jpg"),               // вертикальный кадр
      img("coffee/03.jpg"),               // крупно: чашка и открытка
      // видео: открытка в руках — стол с нардами, скамейка, парк
      { type: "video", src: "assets/coffee/08.mp4", poster: "assets/coffee/08-poster.jpg" },
      img("coffee/04-postcard.png"),      // сама открытка
      img("coffee/05-sheet.png"),         // лист: надписи синим и розовым, открытка, чашки на синем
    ],
    // На главной — только сама открытка (5-я работа в media), по центру панели.
    previewLayout: [{ n: 5, x: 0, y: 0, w: 100 }],
    previewScale: 0.72, // открытка занимает ~72% панели, вокруг остаётся воздух
  },
];
