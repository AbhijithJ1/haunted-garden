import React from 'react';
import { SHOWCASE_FILMS, ShowcaseFilm } from '../data/showcaseFilms';
import { FilmWorldChapter } from './FilmWorldChapter';

interface CinematicJourneyProps {
  onOpenTrailer: (film: ShowcaseFilm) => void;
}

export const CinematicJourney: React.FC<CinematicJourneyProps> = ({
  onOpenTrailer,
}) => {
  return (
    <main id="cinematic-showcase-journey" className="relative w-full bg-black">
      {SHOWCASE_FILMS.map((film) => (
        <FilmWorldChapter
          key={film.id}
          film={film}
          onOpenTrailer={onOpenTrailer}
        />
      ))}
    </main>
  );
};
