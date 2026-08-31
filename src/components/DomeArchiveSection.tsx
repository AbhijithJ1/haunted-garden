import React, { useState } from 'react';
import { DomeGallery, DomeItem } from './DomeGallery';
import { DecryptedText } from './DecryptedText';
import { ArrowDown, Radio } from 'lucide-react';

interface DomeArchiveSectionProps {
  onScrollToWorlds?: () => void;
}

// 24 Authentic Paranormal Fragments: CRT Static, Dilated Eyes, Shadows & Relics from the Films
const FRAGMENTED_VOID_ITEMS: DomeItem[] = [
  // 01. The Conjuring: Bathsheba & Warren Relics
  {
    id: 'frag-conj-01',
    title: 'RELIC ARCHIVE // W-01',
    subtitle: 'The Wardrobe Threshold',
    category: 'ENTITY',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-conj-02',
    title: 'THE PARANORMAL CLAP',
    subtitle: 'Cellar Audio Anomaly',
    category: 'ECHO',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-conj-03',
    title: 'THE OCCULT MIRROR',
    subtitle: 'Spectral Reflection',
    category: 'OBJECT',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-conj-04',
    title: 'BATHSHEBA AT DUSK',
    subtitle: 'Tree Silhouette Event',
    category: 'ENTITY',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
  },

  // 02. Talk To Me: Embalmed Hand & Dilated Possession
  {
    id: 'frag-ttm-01',
    title: 'CERAMIC CONDUIT',
    subtitle: 'The 90-Second Embalmed Hand',
    category: 'CONDUIT',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-ttm-02',
    title: 'DILATED PUPIL INVASION',
    subtitle: 'Spectral Inhabitation',
    category: 'POSSESSION',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-ttm-03',
    title: 'CANDLE WAX SEANCE',
    subtitle: 'The Threshold Flame',
    category: 'RITUAL',
    image: 'https://images.unsplash.com/photo-1603052875302-d376b7c0638a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-ttm-04',
    title: 'THE DROWNED SPIRIT',
    subtitle: 'Terminal Entity Call',
    category: 'ENTITY',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },

  // 03. FROM: Looping Road & Nocturnal Faces
  {
    id: 'frag-from-01',
    title: 'THE FALLEN TREE',
    subtitle: 'Inescapable Road Anomaly',
    category: 'BOUNDARY',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-from-02',
    title: 'NOCTURNAL SMILE',
    subtitle: 'The Windowpane Witness',
    category: 'ENTITY',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-from-03',
    title: 'THE RUNIC TALISMAN',
    subtitle: 'Carved Protection Ward',
    category: 'WARD',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-from-04',
    title: 'PINE FOREST FOG',
    subtitle: 'Sundown Lockdown Phase',
    category: 'ENVIRONMENT',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
  },

  // 04. Hereditary: King Paimon & Coven Miniature
  {
    id: 'frag-here-01',
    title: 'THE MINIATURE CELL',
    subtitle: 'Dollhouse Pre-Determinism',
    category: 'MINIATURE',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-here-02',
    title: 'SIGIL OF PAIMON',
    subtitle: 'Coven Telepathic Seal',
    category: 'SIGIL',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-here-03',
    title: 'THE TREEHOUSE ALTAR',
    subtitle: 'Coronation Midnight Watch',
    category: 'RITUAL',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-here-04',
    title: 'ATTIC SUSPENSION',
    subtitle: 'Piano Wire Resonance',
    category: 'AFTERMATH',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
  },

  // 05. Sinister: Super 8mm Reels & Bughuul
  {
    id: 'frag-sin-01',
    title: '8MM CELLULOID BURNS',
    subtitle: 'Lawnmower Tape 1979',
    category: 'REEL',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-sin-02',
    title: 'BUGHUUL IN WATER',
    subtitle: 'Submerged Image Contagion',
    category: 'DEITY',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-sin-03',
    title: 'THE ATTIC BOX',
    subtitle: 'Scorpion Inscription',
    category: 'ARCHIVE',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-sin-04',
    title: 'FAMILY HANGING TREE',
    subtitle: 'Super 8 Silent Footage',
    category: 'REEL',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
  },

  // 06. Tarot: The Arcana Cards
  {
    id: 'frag-tarot-01',
    title: 'THE FOOL // UNSEALED',
    subtitle: 'Altar Curse Deal',
    category: 'ARCANA',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-tarot-02',
    title: 'THE HIGH PRIESTESS',
    subtitle: 'Elevator Shaft Manifestation',
    category: 'ARCANA',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-tarot-03',
    title: 'THE MAGICIAN // BOXED',
    subtitle: 'The Saw Table Revelation',
    category: 'ARCANA',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'frag-tarot-04',
    title: 'THE DEATH SPREAD',
    subtitle: 'Final Inevitable Deal',
    category: 'ARCANA',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
  },
];

export const DomeArchiveSection: React.FC<DomeArchiveSectionProps> = ({ onScrollToWorlds }) => {
  const [selectedItem, setSelectedItem] = useState<DomeItem | null>(null);

  const handleSelectItem = (item: DomeItem) => {
    setSelectedItem(item);
  };

  return (
    <section
      id="dome-archive-section"
      className="relative min-h-screen w-full bg-black text-[#E8E6DF] overflow-hidden select-none py-16 px-4 sm:px-8"
    >
      {/* Editorial Header */}
      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-4 mb-4">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] text-red-500 tracking-[0.4em] uppercase font-bold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <DecryptedText
            text="THE FRAGMENTED VOID // 24 PARANORMAL DISPATCHES"
            speed={35}
            maxIterations={10}
            animateOn="both"
          />
        </div>

        <h2 className="font-cinzel font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.9]">
          THE UNSTABLE HORROR SPHERE
        </h2>

        <p className="font-cinzel italic text-sm sm:text-lg text-white/70 max-w-xl mx-auto">
          "Fragments suspended in physical 3D space. Drag the sphere to uncover what lies hidden in the dark."
        </p>
      </div>

      {/* 3D WebGL Dome Interactive Stage (Border-free) */}
      <div className="relative z-10 w-full h-[650px] sm:h-[750px] max-w-7xl mx-auto flex items-center justify-center">
        <DomeGallery
          items={FRAGMENTED_VOID_ITEMS}
          fit={0.88}
          minRadius={550}
          maxRadius={850}
          padFactor={0.06}
          dragDamping={0.94}
          autoRotate={true}
          autoRotateSpeed={0.12}
          onSelectItem={handleSelectItem}
        />
      </div>

      {/* Selected Item Drawer / Telemetry */}
      {selectedItem && (
        <div className="relative z-30 max-w-xl mx-auto mt-4 p-4 rounded-xl bg-black/90 text-center space-y-2 backdrop-blur-md animate-fade-in">
          <div className="font-mono text-[10px] text-red-500 tracking-[0.3em] uppercase font-bold">
            {selectedItem.category} // {selectedItem.title}
          </div>
          <p className="font-cinzel text-white text-base sm:text-lg font-bold">
            "{selectedItem.subtitle}"
          </p>
        </div>
      )}

      {/* Action to Descend into the 12 Showcase Worlds */}
      <div className="relative z-20 flex justify-center mt-8">
        <button
          onClick={onScrollToWorlds}
          type="button"
          className="group cursor-pointer inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/5 hover:bg-red-600 text-white font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-300 shadow-xl"
        >
          <span>DESCEND INTO THE 12 SHOWCASE WORLDS</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
