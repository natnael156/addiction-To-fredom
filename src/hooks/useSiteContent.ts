import { useState, useEffect } from 'react';
import type { SiteContent } from '@/types/admin';
import { DEFAULT_CONTENT } from '@/utils/defaultContent';

let cachedContent: SiteContent | null = null;

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(cachedContent ?? DEFAULT_CONTENT);

  useEffect(() => {
    if (cachedContent) return;
    fetch('/api/public/content')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SiteContent | null) => {
        if (data) {
          cachedContent = data;
          setContent(data);
        }
      })
      .catch(() => {/* silently fall back to defaults */});
  }, []);

  return content;
}
