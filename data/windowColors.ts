export type WindowColor = {
  key: string;
  name: {
    uk: string;
    ru: string;
  };
  texture: string;
  frame: string;
  type: 'standard' | 'nonstandard';
};

export const WINDOW_COLORS: WindowColor[] = [
  {
    key: "alpin_sheffild_oak",
    name: { uk: "Альпійський шеффілд", ru: "Альпийский шеффилд" },
    texture: "/windowsection/texture/dubshefild.png",
    frame: "/windowsection/frame/alpin_sheffild_oak.png",
    type: "nonstandard",
  },
  {
    key: "anthracit_grey_sand",
    name: { uk: "Антрацит піщаний", ru: "Антрацит песчаный" },
    texture: "/windowsection/texture/antracit.png",
    frame: "/windowsection/frame/anthracit_grey_sand.png",
    type: "standard",
  },
  {
    key: "antrasit_dark_wood",
    name: { uk: "Антрацит дерево", ru: "Антрацит дерево" },
    texture: "/windowsection/texture/antracittemniy.png",
    frame: "/windowsection/frame/antratsit_dark_wood.png",
    type: "nonstandard",
  },
  {
    key: "birch_tree",
    name: { uk: "Береза", ru: "Берёза" },
    texture: "/windowsection/texture/bereza.png",
    frame: "/windowsection/frame/birch_tree.png",
    type: "nonstandard",
  },
  {
    key: "cloudy_grey",
    name: { uk: "Хмарно-сірий", ru: "Облачно-серый" },
    texture: "/windowsection/texture/greysky.png",
    frame: "/windowsection/frame/cloudy_grey.png",
    type: "nonstandard",
  },
  {
    key: "dark_cherry",
    name: { uk: "Темна вишня", ru: "Тёмная вишня" },
    texture: "/windowsection/texture/temnavishya.png",
    frame: "/windowsection/frame/dark_cherry.png",
    type: "nonstandard",
  },
  {
    key: "dark_oak",
    name: { uk: "Темний дуб", ru: "Тёмный дуб" },
    texture: "/windowsection/texture/temniydub.png",
    frame: "/windowsection/frame/dark_oak.png",
    type: "nonstandard",
  },
  {
    key: "golden_oak",
    name: { uk: "Золотий дуб", ru: "Золотой дуб" },
    texture: "/windowsection/texture/golddub.png",
    frame: "/windowsection/frame/golden_oak.png",
    type: "standard",
  },
  {
    key: "light_oak",
    name: { uk: "Світлий дуб", ru: "Светлый дуб" },
    texture: "/windowsection/texture/dubsvitliy.png",
    frame: "/windowsection/frame/light_oak.png",
    type: "nonstandard",
  },
  {
    key: "mahogany",
    name: { uk: "Махагон", ru: "Махагон" },
    texture: "/windowsection/texture/mahagoni.png",
    frame: "/windowsection/frame/mahogany.png",
    type: "nonstandard",
  },
  {
    key: "montana_oak",
    name: { uk: "Дуб Монтана", ru: "Дуб Монтана" },
    texture: "/windowsection/texture/dubmontana.png",
    frame: "/windowsection/frame/montana_oak.png",
    type: "standard",
  },
  {
    key: "natural_oak",
    name: { uk: "Натуральний дуб", ru: "Натуральный дуб" },
    texture: "/windowsection/texture/naturedub.png",
    frame: "/windowsection/frame/natural_oak.png",
    type: "nonstandard",
  },
  {
    key: "oak_terner",
    name: { uk: "Дуб Тернер", ru: "Дуб Тернер" },
    texture: "/windowsection/texture/dubterner.png",
    frame: "/windowsection/frame/oak_terner.png",
    type: "nonstandard",
  },
  {
    key: "pearl_white",
    name: { uk: "Перловий білий", ru: "Перламутровый белый" },
    texture: "/windowsection/texture/whiteperl.png",
    frame: "/windowsection/frame/pearl_white.png",
    type: "nonstandard",
  },
  {
    key: "pine_tree",
    name: { uk: "Сосна", ru: "Сосна" },
    texture: "/windowsection/texture/sosna.png",
    frame: "/windowsection/frame/pine_tree.png",
    type: "nonstandard",
  },
  {
    key: "sea_blue",
    name: { uk: "Морський синій", ru: "Морской синий" },
    texture: "/windowsection/texture/bluesea.png",
    frame: "/windowsection/frame/sea_blue.png",
    type: "nonstandard",
  },
  {
    key: "sheffild_oak",
    name: { uk: "Шеффілд дуб", ru: "Шеффилд дуб" },
    texture: "/windowsection/texture/dubshevild.png",
    frame: "/windowsection/frame/sheffield_oak.png",
    type: "nonstandard",
  },
  {
    key: "sheffild_oak_grey",
    name: { uk: "Шеффілд сірий", ru: "Шеффилд серый" },
    texture: "/windowsection/texture/greyslanc.png",
    frame: "/windowsection/frame/sheffild_oak_grey.png",
    type: "nonstandard",
  },
  {
    key: "slate_grey",
    name: { uk: "Графітовий сірий", ru: "Графитовый серый" },
    texture: "/windowsection/texture/greyslanc.png",
    frame: "/windowsection/frame/slate_grey.png",
    type: "nonstandard",
  },
  {
    key: "soolblack",
    name: { uk: "Глибокий чорний", ru: "Глубокий чёрный" },
    texture: "/windowsection/texture/blackcold.png",
    frame: "/windowsection/frame/soolblack.png",
    type: "nonstandard",
  },
  {
    key: "walnut",
    name: { uk: "Горіх", ru: "Орех" },
    texture: "/windowsection/texture/nut.png",
    frame: "/windowsection/frame/walnut.png",
    type: "standard",
  },
];
