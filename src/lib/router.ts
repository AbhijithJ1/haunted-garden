import { AppRoute } from '../types';

export const parseCurrentRoute = (): AppRoute => {
  // Support both standard browser path and hash routing fallback
  const pathname = window.location.pathname;
  const hash = window.location.hash.replace(/^#/, '');

  const effectivePath = hash.startsWith('/watch') ? hash : pathname;

  if (effectivePath.startsWith('/watch')) {
    // Expected patterns:
    // /watch
    // /watch/:slug
    // /watch/:slug/s:season/e:episode
    // /watch/:slug/:season/:episode
    // /watch/:slug/season/:season/episode/:episode
    const segments = effectivePath
      .replace(/^\/watch\/?/, '')
      .split('/')
      .filter(Boolean);

    if (segments.length === 0) {
      return { name: 'watch', slug: 'the-conjuring', season: 1, episode: 1 };
    }

    const slug = segments[0];
    let season = 1;
    let episode = 1;

    // Check if segment 1 is s1/s01 or season/1 or number
    if (segments.length >= 2) {
      const s1 = segments[1];
      if (/^s(\d+)$/i.test(s1)) {
        season = parseInt(s1.replace(/^s/i, ''), 10) || 1;
      } else if (s1 === 'season' && segments[2]) {
        season = parseInt(segments[2], 10) || 1;
      } else if (/^\d+$/.test(s1)) {
        season = parseInt(s1, 10) || 1;
      }
    }

    if (segments.length >= 3) {
      const s2 = segments[segments.length - 1];
      if (/^e(\d+)$/i.test(s2)) {
        episode = parseInt(s2.replace(/^e/i, ''), 10) || 1;
      } else if (segments.includes('episode')) {
        const epIdx = segments.indexOf('episode');
        if (segments[epIdx + 1]) {
          episode = parseInt(segments[epIdx + 1], 10) || 1;
        }
      } else if (/^\d+$/.test(s2) && segments.length >= 3) {
        episode = parseInt(s2, 10) || 1;
      }
    }

    return {
      name: 'watch',
      slug,
      season: Math.max(1, season),
      episode: Math.max(1, episode),
    };
  }

  return { name: 'home' };
};

export const buildWatchUrl = (slug: string, season?: number, episode?: number, isSeries = false): string => {
  if (!slug) return '/watch/the-conjuring';
  if (isSeries && season && episode) {
    return `/watch/${slug}/s${season}/e${episode}`;
  }
  return `/watch/${slug}`;
};

export const navigateTo = (url: string) => {
  if (window.location.pathname + window.location.search === url) return;

  // Use history pushState
  try {
    window.history.pushState({}, '', url);
  } catch {
    window.location.hash = url;
  }

  // Dispatch custom navigation event
  window.dispatchEvent(new CustomEvent('cinedread-navigation', { detail: { url } }));
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
};
