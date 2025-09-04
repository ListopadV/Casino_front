# 🌍 Система локализации для Casino Project

Этот проект поддерживает многоязычность с использованием **i18next** и **react-i18next** для Next.js.

## 🚀 Поддерживаемые языки

- 🇺🇸 **English** (en) - основной язык
- 🇫🇷 **Français** (fr) - французский
- 🇩🇪 **Deutsch** (de) - немецкий  
- 🇮🇹 **Italiano** (it) - итальянский

## 📁 Структура файлов

```
src/
├── i18n/
│   ├── i18n.ts                 # Основная конфигурация i18next
│   ├── LanguageProvider.tsx    # Провайдер для React
│   ├── english/
│   │   └── translation.json    # Английские переводы
│   ├── french/
│   │   └── translation.json    # Французские переводы
│   ├── german/
│   │   └── translation.json    # Немецкие переводы
│   └── italian/
│       └── translation.json    # Итальянские переводы
├── components/
│   ├── LanguageSwitcher.tsx    # Компонент переключения языков
│   └── ExampleLocalizedComponent.tsx # Пример использования
└── hooks/
    └── useLocalization.ts      # Хук для работы с локализацией
```

## 🛠️ Установка и настройка

### 1. Установка зависимостей

```bash
npm install i18next react-i18next i18next-browser-languagedetector i18next-http-backend i18next-icu js-cookie @types/js-cookie
```

### 2. Подключение в layout.tsx

```tsx
import LanguageProvider from './i18n/LanguageProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

## 📖 Использование

### 1. Базовое использование с хуком useTranslation

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('auth.login')}</p>
    </div>
  );
}
```

### 2. Использование с кастомным хуком useLocalization

```tsx
import { useLocalization } from '../hooks/useLocalization';

function MyComponent() {
  const { t, currentLanguage, switchLanguage } = useLocalization();
  
  return (
    <div>
      <h1>{t('casino.welcome')}</h1>
      <p>Текущий язык: {currentLanguage}</p>
      <button onClick={() => switchLanguage('fr')}>
        Переключить на французский
      </button>
    </div>
  );
}
```

### 3. Компонент переключателя языков

```tsx
import LanguageSwitcher from '../components/LanguageSwitcher';

function Header() {
  return (
    <header>
      <h1>Casino</h1>
      <LanguageSwitcher />
    </header>
  );
}
```

## 🔧 Добавление новых переводов

### 1. Добавление нового ключа

Добавьте новый ключ во все языковые файлы:

**english/translation.json:**
```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "This is a new section"
  }
}
```

**french/translation.json:**
```json
{
  "newSection": {
    "title": "Titre de la nouvelle section",
    "description": "Ceci est une nouvelle section"
  }
}
```

### 2. Переводы для хедера

В проекте уже добавлены переводы для хедера в разделе `navigation.header`:

```json
{
  "navigation": {
    "header": {
      "newCasinos": "NEW CASINOS",
      "casinoBonuses": "CASINO BONUSES",
      "onlineCasinos": "ONLINE CASINOS",
      "promocodes": "PROMOCODES",
      "aboutUs": "ABOUT US",
      "registration": "REGISTRATION",
      "login": "LOGIN",
      "logout": "LOGOUT",
      "account": "Account",
      "menuItems": {
        "newCasinos": { /* подменю новых казино */ },
        "casinoBonuses": { /* подменю бонусов */ }
      }
    }
  }
}
```

**Доступные языки для хедера:**
- 🇺🇸 English: `/header-test` - NEW CASINOS, CASINO BONUSES, etc.
- 🇫🇷 Français: `/header-test` - NOUVEAUX CASINOS, BONUS DE CASINO, etc.
- 🇩🇪 Deutsch: `/header-test` - NEUE CASINOS, CASINO-BONUSSE, etc.
- 🇮🇹 Italiano: `/header-test` - NUOVI CASINÒ, BONUS CASINÒ, etc.

### 2. Использование в компоненте

```tsx
const { t } = useTranslation();

return (
  <div>
    <h2>{t('newSection.title')}</h2>
    <p>{t('newSection.description')}</p>
  </div>
);
```

## 🌐 Добавление нового языка

### 1. Создание папки и файла переводов

```bash
mkdir src/i18n/spanish
touch src/i18n/spanish/translation.json
```

### 2. Добавление в конфигурацию i18n.ts

```tsx
// Добавить импорт
import translationES from './spanish/translation.json';

// Добавить в languages
export const languages = {
  en: { nativeName: 'English', flag: '🇺🇸' },
  fr: { nativeName: 'Français', flag: '🇫🇷' },
  de: { nativeName: 'Deutsch', flag: '🇩🇪' },
  it: { nativeName: 'Italiano', flag: '🇮🇹' },
  es: { nativeName: 'Español', flag: '🇪🇸' }, // Новый язык
};

// Добавить в resources
const resources = {
  // ... существующие языки
  es: {
    translation: translationES
  },
};
```

## 📱 Особенности

### 1. Автоопределение языка
- Система автоматически определяет язык браузера
- Сохраняет выбранный язык в cookies
- Fallback на английский при отсутствии перевода

### 2. Плюрализация
```tsx
// В переводе
"items": "{{count}} item || {{count}} items"

// В компоненте
{t('items', { count: 5 })} // "5 items"
{t('items', { count: 1 })} // "1 item"
```

### 3. Интерполяция
```tsx
// В переводе
"welcome": "Добро пожаловать, {{name}}!"

// В компоненте
{t('welcome', { name: 'John' })} // "Добро пожаловать, John!"
```

## 🎨 Стилизация

Компонент `LanguageSwitcher` использует Tailwind CSS с:
- Полупрозрачный фон с backdrop-blur
- Hover эффекты
- Плавные анимации
- Адаптивный дизайн

## 🔍 Отладка

### 1. Проверка текущего языка
```tsx
const { currentLanguage } = useLocalization();
console.log('Current language:', currentLanguage);
```

### 2. Проверка доступных переводов
```tsx
const { t } = useTranslation();
console.log('Translation:', t('auth.login'));
```

### 3. Проверка отсутствующих ключей
В консоли браузера будут видны предупреждения о missing keys.

## 📚 Полезные ссылки

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [ICU Message Format](https://formatjs.io/docs/intl-messageformat/)

## 📱 Тестирование

Запустите проект и перейдите на следующие страницы для тестирования локализации:

### 🎯 Основная локализация
- **`/localization-test`** - Демонстрация основных переводов (casino, games, auth, etc.)

### 🎰 Переводы хедера
- **`/header-test`** - Демонстрация переводов хедера и навигации

На этих страницах вы сможете:
- Переключаться между языками в реальном времени
- Видеть, как все тексты меняются на выбранный язык
- Тестировать работу мегаменю и подменю
- Проверять корректность переводов для всех элементов

## 🤝 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь, что все языковые файлы имеют одинаковую структуру
3. Проверьте правильность импортов в i18n.ts
4. Убедитесь, что LanguageProvider обернут вокруг приложения
