# Колесо удачи — нейрофотосессия

Интерактивный React-компонент «Колесо удачи» для промо-лендинга.

## Запуск

```bash
npm install
npm run dev
```

## Использование компонента

```tsx
import { WheelOfFortune } from "./components/WheelOfFortune";

<WheelOfFortune
  onCtaClick={(prizeId) => {
    // переход на форму записи, скачивание файла и т.д.
    console.log("Выбран приз:", prizeId);
  }}
/>
```

## Структура

- `src/components/WheelOfFortune/WheelOfFortune.tsx` — основной блок
- `Wheel.tsx` — колесо с 6 секторами и указателем
- `ResultCard.tsx` — карточка результата
- `useWheelSpin.ts` — логика вращения и выбора приза
- `prizes.ts` — контент секторов (легко редактировать)
