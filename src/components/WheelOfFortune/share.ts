/** Текст для шаринга в соцсети / мессенджер */
export function buildShareText(
  prizeTitle: string,
  promoCode: string,
  pageUrl?: string,
): string {
  const url =
    pageUrl ||
    (typeof window !== "undefined"
      ? window.location.href.split("#")[0].split("?")[0]
      : "");

  return [
    `🎁 Я выиграл(а) «${prizeTitle}» в колесе удачи нейрофотосессии!`,
    "",
    `Промокод: ${promoCode}`,
    "",
    url ? `Крути и ты: ${url}` : "Крути колесо удачи и получи свой приз!",
  ].join("\n");
}

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

/** Web Share API или копирование текста в буфер */
export async function sharePrize(
  prizeTitle: string,
  promoCode: string,
  pageUrl?: string,
): Promise<ShareResult> {
  const text = buildShareText(prizeTitle, promoCode, pageUrl);
  const url =
    pageUrl ||
    (typeof window !== "undefined"
      ? window.location.href.split("#")[0].split("?")[0]
      : "");

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Колесо удачи — нейрофотосессия",
        text,
        url: url || undefined,
      });
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return "cancelled";
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}
