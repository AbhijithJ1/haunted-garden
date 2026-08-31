// Types for Cinedread Horror Cinema Archive — 3D Spatial Exhibition

export type MediaType = 'movie' | 'tv';

export interface MediaItem {
  id: string; // slug identifier (e.g. 'the-conjuring', 'from')
  title: string;
  type: MediaType;
  tmdbId: string | number;
  imdbId?: string;
  year: string | number;
  director?: string;
  runtime?: string;
  rating?: string;
  category: string;
  fearMechanism: string;
  tagline?: string;
  editorialQuote: string;
  psychologicalBreakdown: string;
  dreadLevel?: 'MODERATE' | 'SEVERE' | 'CRITICAL' | 'LETHAL';
  posterImage: string;
  backdropImage?: string;
  trailerYoutubeId: string;
  atmosphereColor?: string;
  tags?: string[];
  fearEvent?: {
    telemetryHint: string;
    quoteOrSignal: string;
    ambientSoundType: string;
  };
}

export interface UniverseInfo {
  id: string;
  index?: string;
  title: string;
  subTitle?: string;
  year: string | number;
  category?: string;
  dreadLevel?: string;
  description?: string;
  loreQuote?: string;
  synopsis?: string;
  posterImage?: string;
  trailerYoutubeId: string;
  trailerTitle?: string;
  tags?: string[];
  fearMechanism?: string;
  director?: string;
  runtime?: string;
  rating?: string;
  tagline?: string;
  themeColor?: string;
  accentColor?: string;
  whatMakesItTerrifying?: string[];
  type?: MediaType;
  tmdbId?: string | number;
}
