export type Place = {
  id: string;
  name: string;
  hint: string;
  lat: number;
  lon: number;
  photo: string;
  home?: boolean;
};

export const PLACES: Place[] = [
  {
    id: "cala-millor",
    name: "Cala Millor",
    hint: "baza · hotel",
    lat: 39.597,
    lon: 3.385,
    photo: "/photos/cala-millor-bay.jpg",
    home: true
  },
  { id: "cala-bona", name: "Cala Bona", hint: "port · 15 min pieszo", lat: 39.616, lon: 3.39, photo: "/photos/cala-bona.jpg" },
  { id: "sa-coma", name: "Sa Coma", hint: "płytka zatoka", lat: 39.585, lon: 3.385, photo: "/photos/sa-coma.jpg" },
  { id: "s-illot", name: "S’Illot", hint: "na południe", lat: 39.568, lon: 3.385, photo: "/photos/s-illot.jpg" },
  { id: "porto-cristo", name: "Porto Cristo", hint: "jaskinie · port", lat: 39.541, lon: 3.333, photo: "/photos/porto-cristo.jpg" },
  { id: "canyamel", name: "Canyamel", hint: "Coves d’Artà", lat: 39.655, lon: 3.434, photo: "/photos/canyamel-beach.jpg" },
  { id: "arta", name: "Artà", hint: "starówka · wtorek", lat: 39.693, lon: 3.351, photo: "/photos/arta-salvador.jpg" },
  { id: "cala-agulla", name: "Cala Agulla", hint: "rezerwat", lat: 39.721, lon: 3.455, photo: "/photos/cala-agulla.jpg" },
  { id: "cala-ratjada", name: "Cala Ratjada", hint: "port rybacki", lat: 39.712, lon: 3.463, photo: "/photos/cala-ratjada.jpg" },
  { id: "palma-lotnisko", name: "Palma / lotnisko", hint: "przylot · odlot", lat: 39.551, lon: 2.738, photo: "/photos/palma-airport.jpg" }
];

export function getPlace(id: string | null | undefined): Place {
  return PLACES.find((p) => p.id === id) ?? PLACES[0];
}
