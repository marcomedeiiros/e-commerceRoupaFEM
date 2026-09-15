import { useEffect } from 'react';
import { STORE_CONFIG } from '../config/store';

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${STORE_CONFIG.name}` : `${STORE_CONFIG.name} | Moda Feminina Sofisticada`;
    document.title = pageTitle;

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);
}
