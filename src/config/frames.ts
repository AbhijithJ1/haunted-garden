export interface Frame {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  location: string;
  historicalIncident: string;
  sensoryNotes: string[];
  fieldObservation: string;
  colorAccent: string;
  videoSrc: string;
}

export const frames: Frame[] = [
  {
    id: "entry",
    chapterNumber: "00",
    title: "The Iron Threshold",
    subtitle: "A forgotten estate beneath bruised skies. Follow the stone path. Descend into what should have remained undisturbed.",
    location: "Estate Entrance Gatehouse",
    historicalIncident: "In the autumn of 1894, the iron gates locked from the outside while forty guests were still on the grounds. When the perimeter was breached three weeks later, the table settings were intact, but no living occupant remained.",
    sensoryNotes: ["Rusted iron", "Wet cemetery moss", "Decaying oak leaves"],
    fieldObservation: "The path continues downhill even when walking in reverse.",
    colorAccent: "#8B0E1A",
    videoSrc: "/videos/feature-2.mp4",
  },
  {
    id: "maheshwari",
    chapterNumber: "01",
    title: "The White Widow",
    subtitle: "Stillness before death. White sand, black stagnant water, and a lotus blooming where no living root could take hold.",
    location: "The Sunken Lotus Basin",
    historicalIncident: "Witnesses describe a tall silhouette standing motionless over the black pond at dusk. Those who approached reported the sensation of freezing water filling their lungs before physical contact was ever made.",
    sensoryNotes: ["Ghost lotus", "Cold pond water", "Grave stone dust"],
    fieldObservation: "Her reflection in the black water faces in the opposite direction.",
    colorAccent: "#E5E0DA",
    videoSrc: "/videos/feature-3.mp4",
  },
  {
    id: "mahalakshmi",
    chapterNumber: "02",
    title: "The Crimson Offering",
    subtitle: "Abundance in bloom. Velvet rose petals steeped in consecrated wine and crimson gold light.",
    location: "The Ruined Glass Conservatory",
    historicalIncident: "The stone altar within the glasshouse remains saturated with dark crimson residue. Local soil samples reveal high concentrations of iron, dried marrow, and crushed black rose petals that do not decay.",
    sensoryNotes: ["Black rose", "Blood pear", "Funeral amber"],
    fieldObservation: "The scent of sweet fermented wine precedes a rapid drop in ambient pressure.",
    colorAccent: "#8B0E1A",
    videoSrc: "/videos/feature-4.mp4",
  },
  {
    id: "mahakali",
    chapterNumber: "03",
    title: "She Who Waits in Darkness",
    subtitle: "Black stone, dying embers, and a presence watching from just outside the reach of the lantern.",
    location: "The Subterranean Root Tunnels",
    historicalIncident: "An exploration team of four descended into the stone root cellars in 1922. Only one emerged, having scratched the same phrase into the stone walls three hundred times: 'She only moves when you blink.'",
    sensoryNotes: ["Burnt oud", "Ash pepper", "Obsidian resin"],
    fieldObservation: "Lantern flames turn a cold violet hue within twelve paces of her presence.",
    colorAccent: "#241926",
    videoSrc: "/videos/feature-5.mp4",
  },
  {
    id: "mahashakti",
    chapterNumber: "04",
    title: "The Burning Goddess",
    subtitle: "A column of unnatural fire; something ancient stirring beneath the charred crust of the world.",
    location: "The Scorched Pyre Clearing",
    historicalIncident: "A localized fire in 1908 consumed seven acres of dense woodland within six minutes, yet left the surrounding dry grass entirely unburned. The soil at the epicenter has remained heated to 42°C for over a century.",
    sensoryNotes: ["Burnt saffron", "Charred vanilla", "Blackened cedar"],
    fieldObservation: "The heat emits no smoke, only a faint vibration in the inner ear.",
    colorAccent: "#D9621E",
    videoSrc: "/videos/feature-2.mp4",
  },
  {
    id: "jungle-essence",
    chapterNumber: "05",
    title: "The Forest That Breathes",
    subtitle: "Wet earth, green thunder, and a primordial canopy that inhales deeply whenever you stop moving.",
    location: "The Deep Ancient Grove",
    historicalIncident: "Cartographers surveying the deep northern ravine noted that the boundaries of the woodland expanded by approximately fourteen meters every lunar cycle, silently absorbing stone boundary markers.",
    sensoryNotes: ["Crushed ferns", "Damp earth", "Stormwater accord"],
    fieldObservation: "When all wind ceases, the canopy sways in rhythm with human respiration.",
    colorAccent: "#1B3B2B",
    videoSrc: "/videos/feature-3.mp4",
  },
  {
    id: "himalaya-essence",
    chapterNumber: "06",
    title: "The Frozen Silence",
    subtitle: "Alpine darkness, crystallized breath, and a silence that answers in murmurs when you whisper.",
    location: "The High Glacial Ridge",
    historicalIncident: "A high-altitude meteorological post recorded complete acoustic cancellation across a three-kilometer perimeter. Voices spoken aloud produced no sound, but were later heard played back on magnetic wire recorders.",
    sensoryNotes: ["Frozen citrus", "Black juniper", "Pale musk"],
    fieldObservation: "Sub-zero frost forms on the inside of sealed glass lenses.",
    colorAccent: "#6B8FA3",
    videoSrc: "/videos/feature-4.mp4",
  },
  {
    id: "loop-complete",
    chapterNumber: "07",
    title: "You Were Never Alone",
    subtitle: "The path has ended. But the garden does not conclude at the perimeter. It followed you home.",
    location: "The Severed Exit",
    historicalIncident: "Every recorded survivor of the estate grounds reported hearing the sound of soil shifting beneath their floorboards months after returning to urban residences.",
    sensoryNotes: ["Obsidian dust", "Cold linen", "Lingering smoke"],
    fieldObservation: "Leaving the estate was an illusion. The boundary now encompasses you.",
    colorAccent: "#8B0E1A",
    videoSrc: "/videos/feature-5.mp4",
  },
];
