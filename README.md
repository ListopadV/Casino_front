# 🎰 Casino Project - Документация разработчика

## 📖 Обзор проекта

Проект состоит из двух частей:
- **Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **Backend**: Strapi 5.20.0 + TypeScript + SQLite

## 🏗️ Архитектура и структура проекта

### Frontend (Casino_front)

```
src/
├── app/                    # Next.js App Router
│   ├── casino-bonus/      # Динамические страницы бонусов
│   ├── login/             # Страница авторизации
│   ├── register/          # Страница регистрации
│   └── layout.tsx         # Корневой layout
├── features/              # Feature-based модули
│   ├── auth/              # Авторизация
│   ├── casinos/           # Казино
│   └── main/              # Главная страница
├── shared/                # Переиспользуемый код
│   ├── api/               # API клиенты
│   ├── hooks/             # Кастомные хуки
│   ├── ui/                # UI компоненты
│   └── lib/               # Утилиты и store
├── components/            # Глобальные компоненты
├── i18n/                  # Интернационализация
└── assets/                # Статические ресурсы
```

### Backend (Casino_back)

```
src/
├── api/                   # Strapi API endpoints
│   ├── casino-bonus/      # Бонусы казино
│   ├── casino-review/     # Отзывы о казино
│   ├── online-casino/     # Онлайн казино
│   ├── translation/       # Переводы
│   └── custom/            # Кастомные endpoints
├── middlewares/           # Middleware (геолокация)
└── components/            # Strapi компоненты
```

## 🎯 Принципы разработки

### 1. DRY (Don't Repeat Yourself)
**❌ НЕ ДЕЛАТЬ:**
```tsx
// Дублирование логики авторизации
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ... повторяющаяся логика
}

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ... та же логика
}
```

**✅ ПРАВИЛЬНО:**
```tsx
// Вынести в кастомный хук
const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ... переиспользуемая логика
  return { email, password, /* ... */ };
}
```

### 2. Структура импортов/экспортов

**В app/**: Импортировать и экспортировать только pages
```tsx
// app/casino-bonus/[slug]/page.tsx
import { CasinoBonusPage } from '@/features/casinos/pages/CasinoBonusPage';

export default function Page({ params }: { params: { slug: string } }) {
  return <CasinoBonusPage slug={params.slug} />;
}
```

**В features/components/**: Создавать компоненты
```tsx
// features/main/components/HeroSection.tsx
export const HeroSection = () => {
  // Логика компонента
}
```

**В features/pages/**: Соединять компоненты
```tsx
// features/main/pages/MainPage.tsx
import { HeroSection } from '../components/HeroSection';
import { CasinosSection } from '../components/CasinosSection';

export const MainPage = () => (
  <>
    <HeroSection />
    <CasinosSection />
  </>
);
```

### 3. API и хуки для данных

**Единый источник правды - apiClient**
```tsx
// shared/api/apiClient.ts - НЕ МОДИФИЦИРОВАТЬ, ТОЛЬКО РАСШИРЯТЬ
export const apiClient = new ApiClient();

// shared/api/casinosApi.ts - расширения
export const casinosApi = {
  getCasinos: (language: string) => apiClient.get<OnlineCasino[]>(`/api/online-casinos?locale=${language}`),
  getCasinoById: (id: string) => apiClient.get<OnlineCasino>(`/api/online-casinos/${id}`)
};
```

**Логика fetch в хуках**
```tsx
// shared/hooks/useCasinos.ts
export const useCasinos = (language: string): UseCasinosReturn => {
  const [casinos, setCasinos] = useState<OnlineCasino[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchCasinos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await casinosApi.getCasinos(language);
      setCasinos(data);
    } catch (error) {
      // Обработка ошибок
    } finally {
      setLoading(false);
    }
  }, [language]);

  return { casinos, loading, refetch: fetchCasinos };
};
```

### 4. Интернационализация

**current.json - НЕ МОДИФИЦИРОВАТЬ, ТОЛЬКО ДОБАВЛЯТЬ по семантике**
```json
// i18n/current.json
{
  "auth": {
    "login": "Login",
    "register": "Register"
  },
  "casino": {
    "rating": "Rating",
    "bonus": "Bonus"
  }
}
```

**Использование переводов**
```tsx
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  
  return (
    <form>
      <button>{t('auth.login')}</button>
    </form>
  );
};
```

### 5. Стили и размеры

**❌ НЕ использовать фиксированные размеры:**
```css
.hero {
  width: 1200px;
  height: 800px;
  margin-top: 50px;
}
```

**✅ ПРАВИЛЬНО - использовать относительные единицы:**
```tsx
<div className="w-screen h-screen">
  <div className="w-full max-w-7xl mx-auto">
    <div className="h-96 gap-4 p-6">
      {/* Контент */}
    </div>
  </div>
</div>
```

**Viewport единицы:**
- `w-screen` (100vw) для полной ширины
- `h-screen` (100vh) для полной высоты  
- `gap-4`, `p-6` для отступов (Tailwind значения)

### 6. Переиспользуемые цвета

**globals.css - источник правды для цветов**
```css
:root {
  --color-brand-accentRed: #D82E30;
  --color-brand-darkGray: #1a1a1a;
  --color-brand-mediumGray: #212121;
}

.bg-brand-accent-red { background-color: #D82E30; }
.text-brand-accent-red { color: #D82E30; }
```

**Использование в компонентах**
```tsx
<button className="bg-brand-accent-red text-white hover:bg-red-700">
  Кнопка
</button>
```

**Добавление новых цветов:**
```css
/* globals.css */
--color-brand-newColor: #123456;

.bg-brand-new-color { background-color: #123456; }
.text-brand-new-color { color: #123456; }
```

### 7. Скрипты

**scripts/ - переиспользуемые скрипты**
```bash
# Примеры скриптов:
scripts/
├── generate-components.js    # Генерация компонентов
├── optimize-images.js        # Оптимизация изображений
└── build-styles.js          # Сборка стилей
```

## 🛠️ Техническое API

### Основные хуки

```tsx
// Аутентификация
const { isAuthenticated, user, setAuth, logout } = useAuthStore();

// Данные казино
const { casinos, loading, error, refetch } = useCasinos(language);

// Бонусы
const { bonuses, loading } = useBonuses(language);

// Интернационализация
const { t, i18n } = useTranslation();
```

### API Endpoints (Backend)

```typescript
// Казино
GET /api/online-casinos?locale={lang}
GET /api/online-casinos/{id}

// Бонусы
GET /api/casino-bonuses?locale={lang}
GET /api/casino-bonuses/{id}

// Отзывы
POST /api/casino-reviews
GET /api/casino-reviews?filters[casino]={casinoId}

// Переводы
GET /api/translations?filters[localeKey]={lang}

// Геолокация
GET /api/geo-location
```

### Состояние приложения (Zustand)

```tsx
// shared/lib/store.ts
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      setAuth: (user: User) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: 'auth-storage' }
  )
);
```

## 🚀 Быстрый старт

### Frontend
```bash
cd Casino_front
npm install
npm run dev          # Разработка
npm run build        # Сборка
npm run start        # Продакшн
```

### Backend
```bash
cd Casino_back
npm install
npm run dev      # Разработка
npm run build        # Сборка
npm run start        # Продакшн
```

## 📝 Соглашения по коду

### Именование файлов
- Компоненты: `PascalCase.tsx` (HeroSection.tsx)
- Хуки: `camelCase.ts` (useCasinos.ts)  
- API: `camelCase.ts` (casinosApi.ts)
- Страницы: `page.tsx` (Next.js convention)

### Структура компонентов
```tsx
// 1. Импорты
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// 2. Типы/интерфейсы
interface Props {
  title: string;
}

// 3. Компонент
export const MyComponent = ({ title }: Props) => {
  // 4. Хуки
  const { t } = useTranslation();
  const [state, setState] = useState('');

  // 5. Обработчики
  const handleClick = () => {
    // логика
  };

  // 6. JSX
  return (
    <div className="w-full h-auto gap-4">
      <h1>{t('title')}</h1>
    </div>
  );
};
```

## 🔧 Инструменты разработки

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Redux
- **Backend**: Strapi 5, TypeScript
- **Линтинг**: ESLint
- **Интернационализация**: i18next + react-i18next
- **HTTP клиент**: Axios (в apiClient)

## 📚 Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand State Management](https://zustand-demo.pmnd.rs/)
- [React i18next](https://react.i18next.com/)

---

**Помните**: Следование этим принципам обеспечивает maintainability, scalability и консистентность кода! 🎯
