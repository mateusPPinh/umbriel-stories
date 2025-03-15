import { Article } from '../types';

export const generateArticleUrl = (article: Article): string => {
  if (!article.editorial?.slug || !article.slug) {
    return '#';
  }

  return `${article.editorial.slug}/${article.slug}`;
}; 