/**
 * Генерирует populate-параметры для Strapi-запросов.
 *
 * @param paths массив путей для populate. 
 *   Пример: ['similar_casinos.Logo', 'similar_casinos.Languages', 'similar_casinos.Payment_info']
 *
 * @returns объект URLSearchParams с готовыми populate-полями
 */
export function buildStrapiPopulateParams(paths: string[]): URLSearchParams {
    const params = new URLSearchParams();
  
    // Пример: "similar_casinos.Logo" -> populate[similar_casinos][populate]=Logo
    paths.forEach((path) => {
      const parts = path.split('.');
      let key = 'populate';
  
      parts.forEach((p, i) => {
        if (i < parts.length - 1) {
          key += `[${p}][populate]`;
        } else {
          key += `=${p}`;
        }
      });
  
      params.append(key.split('=')[0], key.split('=')[1]);
    });
  
    return params;
  }
  