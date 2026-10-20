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
      "A collection of posters about Armenia: its Soviet modernist monuments and buildings, mountains, theatre, food and memory. " +
      "Each poster combines archival or personal photography with bold typography and hand-drawn Armenian lettering, " +
      "using a restrained palette of black, white and red.",
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
      "Social media design for brands from different industries: Lexus Yerevan and Burger King, " +
      "Manor Matrix (data and outsourcing), Rafael and iMachinery (construction machinery), " +
      "Meranjson (children’s clothing) and Innwork (coworking). " +
      "For each brand I built a recognizable feed with its own grid, typography and color system, " +
      "and designed posts, announcements and promotional campaigns in Armenian and English.",
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
    previewPack: 4,
    preview: [1, 2, 3, 4, 5, 6, 7, 8],
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
    media: [9, 2, 5, 7, 1, 10, 4, 8, 3, 6].map((n) => img(`art/${String(n).padStart(2, "0")}.jpg`)),
    // Композиция на главной — как в макете (центр x, y и ячейка w×h в пикселях макета 1050×900).
    // n — номер работы в media выше; порядок строк = кто лежит сверху (ниже по списку — выше).
    previewLayout: [
      { n: 5, x: 203, y: 221, w: 200, h: 298 },  // оранжевое лицо с каракулями
      { n: 8, x: 718, y: 195, w: 186, h: 246 },  // король червей
      { n: 7, x: 269, y: 473, w: 151, h: 210 },  // коллаж с глазами
      { n: 3, x: 425, y: 317, w: 184, h: 275 },  // красно-оранжевое лицо на жёлтом
      { n: 4, x: 592, y: 370, w: 151, h: 244 },  // лицо с зелёно-розовыми волосами
      // [TODO] здесь в макете большой журнальный коллаж («TOTAL: 8€») — пришли файл:
      // { src: "assets/art/collage.jpg", x: 770, y: 482, w: 212, h: 284 },
      { n: 1, x: 949, y: 556, w: 146, h: 220 },  // сине-красный набросок
      // [TODO] в макете — фото настоящего листа на мятой бумаге; пока стоит постер Tolma
      { src: "assets/posters/tolma.jpg", x: 426, y: 588, w: 179, h: 224 },
      { n: 6, x: 115, y: 633, w: 175, h: 247 },  // много лиц тушью
      { n: 9, x: 275, y: 740, w: 142, h: 212 },  // зелёное лицо на розовом
      { n: 10, x: 600, y: 691, w: 161, h: 242 }, // Мона Лиза на фоне домов
      { n: 2, x: 838, y: 764, w: 156, h: 232 },  // бумажный коллаж-лицо
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
    media: numbered("photo", 8),
    // Композиция на главной — как в макете (центр x, y и размер ячейки w×h в пикселях макета 1030×900).
    // Фото обрезается под свою ячейку.
    // [TODO] Ячейки 3 и 4 в макете — фото с грибами; их пока нет, стоят гранаты (5) и семена (7).
    previewLayout: [
      { n: 3, x: 132, y: 215, w: 211, h: 407 }, // изогнутое здание
      { n: 6, x: 433, y: 105, w: 368, h: 186 }, // машина у деревьев
      { n: 5, x: 432, y: 315, w: 371, h: 208 }, // [грибы оранжевые] — пока гранаты
      { n: 7, x: 821, y: 93, w: 358, h: 148 },  // [грибы белые] — пока семена
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
      "Two identity projects. Gym & Box — a fitness brand whose identity reflects strength and precision " +
      "through geometric patterns, applied consistently from apparel to accessories (work project, 4 weeks). " +
      "Yerevan Metro — a subway identity built on clarity and easy navigation: minimalist typography, " +
      "a bold primary color palette and geometric shapes for a modern, user-friendly system (university project, 4 weeks).",
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
      "Animated posters and short motion pieces for social media. Static Armenian imagery — a sculpture by the lake, " +
      "an ornamented manhole cover, the Zvartnots tower, a modernist facade, lavash and a game of nardi — " +
      "comes alive with hand-drawn lines, color accents and kinetic typography.",
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
      "Film poster and ticket design for “Ararat ’73”, a film dedicated to the football legend Nikita Simonyan. " +
      "The identity is built around a heavy gold 3D Armenian title set against stadium lights and the team in blue. " +
      "The design was featured at Kino Moskva in Yerevan — on the facade banners, posters and the cinema tickets.",
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
];
