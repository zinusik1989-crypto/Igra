export type Prize = {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  color: string;
  textColor: string;
  icon: string;
  codePrefix: string;
};

export const PRIZES: Prize[] = [
  {
    id: "discount",
    label: "Скидка 15%",
    title: "Скидка 15%",
    description:
      "Получите скидку на первую нейрофотосессию и создайте образы, которые продают вас без слов.",
    cta: "Получить скидку",
    color: "#7c3aed",
    textColor: "#ffffff",
    icon: "💎",
    codePrefix: "NEURO15",
  },
  {
    id: "bonus",
    label: "Бонусный образ",
    title: "Бонусный образ",
    description:
      "Добавим один дополнительный AI-образ к вашей фотосессии.",
    cta: "Получить бонус",
    color: "#db2777",
    textColor: "#ffffff",
    icon: "✨",
    codePrefix: "BONUS",
  },
  {
    id: "gift",
    label: "Подарок",
    title: "Подарок",
    description:
      "Мини-гайд по подготовке к нейрофотосессии в подарок.",
    cta: "Забрать подарок",
    color: "#0891b2",
    textColor: "#ffffff",
    icon: "🎁",
    codePrefix: "GIFT",
  },
  {
    id: "idea",
    label: "Идея образа",
    title: "Идея образа",
    description:
      "Получите персональную идею образа для вашего бренда или соцсетей.",
    cta: "Получить идею",
    color: "#ca8a04",
    textColor: "#1a1030",
    icon: "💡",
    codePrefix: "IDEA",
  },
  {
    id: "special",
    label: "Спецпредложение",
    title: "Спецпредложение",
    description:
      'Пакет «Личный бренд» на особых условиях только сегодня.',
    cta: "Записаться на нейрофотосессию",
    color: "#059669",
    textColor: "#ffffff",
    icon: "👑",
    codePrefix: "BRAND",
  },
  {
    id: "material",
    label: "Полезный материал",
    title: "Полезный материал",
    description:
      "Чек-лист: как выбрать стиль для нейрофотосессии.",
    cta: "Скачать чек-лист",
    color: "#6366f1",
    textColor: "#ffffff",
    icon: "📋",
    codePrefix: "CHECK",
  },
];

export const SECTOR_COUNT = PRIZES.length;
export const SECTOR_ANGLE = 360 / SECTOR_COUNT;

export function generatePromoCode(prefix: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${suffix}`;
}
