import en from '../i18n/english/translation.json';
import fr from '../i18n/french/translation.json';
import de from '../i18n/german/translation.json';
import it from '../i18n/italian/translation.json';

type TranslationObject = Record<string, any>;

function getAllKeys(obj: TranslationObject, prefix = ''): string[] {
  const keys: string[] = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

function getValueByPath(obj: TranslationObject, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

export function validateTranslations() {
  const languages = { en, fr, de, it };
  const referenceKeys = getAllKeys(en);
  const issues: Array<{ language: string; missingKeys: string[]; extraKeys: string[] }> = [];

  for (const [langCode, langData] of Object.entries(languages)) {
    if (langCode === 'en') continue; // Skip reference language

    const langKeys = getAllKeys(langData);
    const missingKeys: string[] = [];
    const extraKeys: string[] = [];

    // Check for missing keys
    for (const key of referenceKeys) {
      if (!getValueByPath(langData, key)) {
        missingKeys.push(key);
      }
    }

    // Check for extra keys
    for (const key of langKeys) {
      if (!getValueByPath(en, key)) {
        extraKeys.push(key);
      }
    }

    if (missingKeys.length > 0 || extraKeys.length > 0) {
      issues.push({
        language: langCode,
        missingKeys,
        extraKeys
      });
    }
  }

  return {
    totalKeys: referenceKeys.length,
    issues,
    isValid: issues.length === 0
  };
}

export function logTranslationStatus() {
  const validation = validateTranslations();
  
  console.log('🌍 Translation Validation Report');
  console.log('================================');
  console.log(`Total keys in reference (English): ${validation.totalKeys}`);
  console.log(`Overall status: ${validation.isValid ? '✅ Valid' : '❌ Issues found'}`);
  
  if (validation.issues.length > 0) {
    console.log('\nIssues found:');
    validation.issues.forEach(issue => {
      console.log(`\n${issue.language.toUpperCase()}:`);
      
      if (issue.missingKeys.length > 0) {
        console.log(`  Missing keys (${issue.missingKeys.length}):`);
        issue.missingKeys.forEach(key => console.log(`    - ${key}`));
      }
      
      if (issue.extraKeys.length > 0) {
        console.log(`  Extra keys (${issue.extraKeys.length}):`);
        issue.extraKeys.forEach(key => console.log(`    - ${key}`));
      }
    });
  } else {
    console.log('\n🎉 All translations are complete and consistent!');
  }
  
  return validation;
}

// Auto-run validation in development
if (process.env.NODE_ENV === 'development') {
  // Run validation after a short delay to ensure all modules are loaded
  setTimeout(() => {
    logTranslationStatus();
  }, 1000);
}
