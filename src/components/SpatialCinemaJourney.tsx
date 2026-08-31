import React from 'react';
import { FEATURED_FILMS, FilmData } from '../data/films';
import { SpatialWorldChapter } from './SpatialWorldChapter';
import { UniverseInfo } from '../types';

interface SpatialCinemaJourneyProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const SpatialCinemaJourney: React.FC<SpatialCinemaJourneyProps> = ({
  onOpenTrailer,
}) => {
  return (
    <div id="spatial-cinema-journey" className="relative w-full bg-black">
      {FEATURED_FILMS.map((film, index) => {
        // Map FilmData to UniverseInfo for backwards compatibility with trailer modal
        const universe: UniverseInfo = {
          id: film.id,
          title: film.title,
          year: film.year.toString(),
          category: film.category,
          dreadLevel: 'CRITICAL',
          description: film.psychologicalBreakdown,
          loreQuote: film.editorialQuote,
          posterImage: film.posterMedia,
          trailerYoutubeId: film.trailerYoutubeId,
          tags: [film.category, film.fearMechanism],
          fearMechanism: film.fearMechanism,
        };

        return (
          <SpatialWorldChapter
            key={film.id}
            universe={universe}
            chapterIndex={index + 1}
            fearMechanism={film.fearMechanism}
            editorialQuote={film.editorialQuote}
            onOpenTrailer={onOpenTrailer}
          />
        );
      })}
    </div>
  );
};
