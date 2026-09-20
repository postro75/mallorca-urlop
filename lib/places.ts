export type Place = {
  id: string;
  name: string;
  hint: string;
  lat: number;
  lon: number;
  home?: boolean;
};

export const PLACES: Place[] = [
  {
    id: "cala-millor",
    name: "Cala Millor",
    hint: "baza · hotel",
    lat: 39.597,
    lon: 3.385,
    home: true
  },
  { id: "cala-bona", name: "Cala Bona", hint: "port · 15 min pieszo", lat: 39.616, lon: 3.39 },
  { id: "sa-coma", name: "Sa Coma", hint: "płytka zatoka", lat: 39.585, lon: 3.385 },
  { id: "s-illot", name: "S’Illot", hint: "na południe", lat: 39.568, lon: 3.385 },
  { id: "porto-cristo", name: "Porto Cristo", hint: "jaskinie · port", lat: 39.541, lon: 3.333 },
  { id: "canyamel", name: "Canyamel", hint: "Coves d’Artà", lat: 39.655, lon: 3.434 },
  { id: "arta", name: "Artà", hint: "starówka · wtorek", lat: 39.693, lon: 3.351 },
  { id: "cala-agulla", name: "Cala Agulla", hint: "rezerwat", lat: 39.721, lon: 3.455 },
  { id: "cala-ratjada", name: "Cala Ratjada", hint: "port rybacki", lat: 39.712, lon: 3.463 },
  { id: "palma-lotnisko", name: "Palma / lotnisko", hint: "przylot · odlot", lat: 39.551, lon: 2.738 }
];

export function getPlace(id: string | null | undefined): Place {
  return PLACES.find((p) => p.id === id) ?? PLACES[0];
}
