/**
 * Netflix External Link Utility
 * Maps CINEDREAD showcase films to their official Netflix title pages.
 * For films not on Netflix, falls back to a Netflix search.
 */

// Netflix title IDs for each showcase film (mapped by CINEDREAD slug id)
const NETFLIX_TITLE_IDS: Record<string, string> = {
  'the-conjuring': '70251894',
  'the-nun': '80230529',
  'talk-to-me': '81670764',
  'from': '81316999',
  'hereditary': '80231728',
  'tarot': '81734389',
  'it': '80178943',
  'it-welcome-to-derry': '81243992',
  'the-ring': '60024944',
  'smile': '81635058',
  'annabelle': '80013498',
  'the-black-phone': '81506055',
  // Additional media collection entries
  'alien-romulus': '81712560',
  'longlegs': '81738887',
  'late-night-with-the-devil': '81714498',
  'the-substance': '81760477',
  'the-fall-of-the-house-of-usher': '80228300',
};

/**
 * Returns the official Netflix URL for a film/show.
 * Falls back to Netflix search if no known title ID exists.
 */
export const getNetflixUrl = (slug: string, title?: string): string => {
  const netflixId = NETFLIX_TITLE_IDS[slug];
  if (netflixId) {
    return `https://www.netflix.com/title/${netflixId}`;
  }
  // Fallback: Netflix search for the title
  const searchQuery = encodeURIComponent(title || slug.replace(/-/g, ' '));
  return `https://www.netflix.com/search?q=${searchQuery}`;
};

/**
 * Opens the Netflix page for a film in a new browser tab.
 */
export const openOnNetflix = (slug: string, title?: string): void => {
  const url = getNetflixUrl(slug, title);
  window.open(url, '_blank', 'noopener,noreferrer');
};
