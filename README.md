# Колесо удачи — нейрофотосессия

Интерактивный React-компонент «Колесо удачи» для промо-лендинга.

## Запуск

**Требуется Node.js 18+** ([скачать](https://nodejs.org/)). Без Node.js проект не запустится.

### Windows (проще всего)

Дважды кликните **`ZAPUSTIT.bat`** или **`start.bat`** (окно терминала должно остаться открытым).

Или в терминале:

```bat
start.bat
```

### Вручную

```bash
npm install
npm run dev
```

Откройте в браузере: **http://localhost:5173/**

### Если «ничего не запускается»

1. Проверьте Node: `node -v` и `npm -v` — должны показать версии, не ошибку.
2. Если команды не найдены — установите Node.js и **перезапустите терминал** (или Cursor).
3. В папке проекта выполните `npm install` (создаётся папка `node_modules`).
4. Затем `npm run dev` — в консоли появится адрес `http://localhost:5173/`.

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
