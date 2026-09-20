export const ISLAND_HERO = {
  kicker: "Llevant · wschodnia Majorka",
  title: "Cala Millor znaczy „lepsza zatoka”",
  lead: "Dwa kilometry złotego piasku, płytkie wejście do morza i promenada bez samochodów. Stąd, z hotelu Hipocampo Palace, cały wschód wyspy jest w oknie 10:00–15:00 — z zapasem na drzemkę."
};

export const FESTIVAL = {
  title: "Festes del Turista 2026",
  dates: "19 września – 3 października",
  overlap: "Wasze daty (22.09–1.10) pokrywają się z całym festiwalem.",
  fireworks: "Niedziela 27 września, 22:30 — zamek ogniowy z Moll de Cala Millor (Carrer de Son Comparet), nad zatoką.",
  extra: "Nit de Foc i correfoc z Dimonis de Son Ganxo ok. 20:30–21:00, Parc de la Mar. Większość wydarzeń jest bezpłatna; Noc Win w porcie Cala Bona bywa biletowana.",
  source: "Ocio Mallorca, Bravo Baleares, Consorcio Cala Millor / visitcalamillor.com"
};

export const BEACHES = [
  {
    name: "Cala Bona",
    tag: "15 min pieszo",
    photo: "/photos/cala-millor-bay.jpg",
    text: "Ciszej niż Millor. Trzy zatoczki rozdzielone falochronami i prawdziwy port rybacki. Połączone promenadą — bez samochodu."
  },
  {
    name: "Sa Coma",
    tag: "przez Punta de n’Amer",
    photo: "/photos/sa-coma.jpg",
    text: "Szeroka, osłonięta zatoka, bardzo płytka — klasyka z małym dzieckiem. Dojście spacerem przez 200 ha ANEI Punta de n’Amer (1985)."
  },
  {
    name: "Cala Agulla",
    tag: "wycieczka 03",
    photo: "/photos/cala-agulla.jpg",
    text: "Rezerwat, wydmy, jedna z ładniejszych zatok wschodu. Płytszy brzeg po prawej. 4,5/5 w przewodnikach rodzinnych."
  },
  {
    name: "Cala Torta",
    tag: "dzika · Artà",
    photo: "/photos/cap-vermell.jpg",
    text: "Biały piasek i turkus w Parku Naturalnym Llevant. Bez zaplecza kurortu — tylko jeśli dzień jest spokojny i dziecko wyspane."
  }
];

export const TOWNS = [
  {
    name: "Artà",
    meta: "targ wtorek rano · Plaça del Conqueridor",
    text: "Wzgórze, nazwa od arabskiego „ogród”. Bruk, Sant Salvador, regionalne muzeum. Wtorkowy targ: ser, miód, rękodzieło."
  },
  {
    name: "Capdepera",
    meta: "targ środa 8:00–13:00 · Plaça de l’Orient",
    text: "Zamek z ok. 1300 r. przeciw piratom. Z wieży widać wschód i Minorkę. Sobrasada, sery, lokalne słodycze na targu."
  },
  {
    name: "Son Servera",
    meta: "w głębi lądu · carril bici z wybrzeża",
    text: "Wciąż majorkańska wioska. Targ i rękodzieło. Ścieżka rowerowa łączy wybrzeże Costa dels Pins–S’Illot z miasteczkiem."
  },
  {
    name: "Sant Llorenç",
    meta: "gmina południowej części plaży",
    text: "Cala Millor leży na styku dwóch gmin: Son Servera i Sant Llorenç des Cardassar. Stąd wspólny Consorcio de Turisme."
  }
];

export const PRACTICAL = [
  { k: "Lotnisko PMI", v: "ok. 60–65 km · ok. 1 h autem (Ma-15)" },
  { k: "Palma", v: "ok. 70–75 km" },
  { k: "Taxi Cala Millor", v: "971 58 69 69 / 971 56 25 56" },
  { k: "Autobusy TIB", v: "tib.org · 971 177 777" },
  { k: "Info turystyczne", v: "Plaça Eureka, Cala Millor · 971 585 864" },
  { k: "We wrześniu", v: "powietrze ~25°C, woda ~24°C — w przewodnikach ocena Excellent" }
];

export const PACK = ["Nosidełko", "Woda", "Krem z filtrem", "Buty do wody", "Przekąski", "Bluza do jaskiń"];

export type Nearby = {
  km: string;
  drive: string;
  name: string;
  tag: string;
  text: string;
  photo: string;
  kids: boolean;
};

export const NEARBY: Nearby[] = [
  {
    km: "0–2",
    drive: "pieszo",
    name: "Promenada i łódź z przezroczystym dnem",
    tag: "z hotelu",
    text: "Deptak bez aut, mini-kolejka, rejs 2–3 h w stronę Porto Cristo z przystankiem w zatoce niedostępnej z lądu.",
    photo: "/photos/cala-millor.jpg",
    kids: true
  },
  {
    km: "~3",
    drive: "pieszo / 10 min",
    name: "Punta de n’Amer",
    tag: "wózek da radę",
    text: "200 ha ANEI. Wieża XVII w. z mostem zwodzonym, małe muzeum, bar przy wieży, widok na całą zatokę.",
    photo: "/photos/punta-tower.jpg",
    kids: true
  },
  {
    km: "~2",
    drive: "10–15 min",
    name: "Safari Zoo",
    tag: "wypad 02",
    text: "Pociąg przez wybiegi. Pawiany skaczą na dach — szyby i szyberdach zamknąć.",
    photo: "/photos/safari.jpg",
    kids: true
  },
  {
    km: "~5",
    drive: "10 min",
    name: "S’Illot — talajot i plaża",
    tag: "prehistoria",
    text: "Osada talajocka z centrum dla zwiedzających, plaża tuż obok. Po drodze rowerowej do Porto Cristo.",
    photo: "/photos/s-illot.jpg",
    kids: true
  },
  {
    km: "8–12",
    drive: "15–20 min",
    name: "Porto Cristo: Drach, Hams, Dinosaurland",
    tag: "jedna jaskinia na dzień",
    text: "Drach = jezioro Martel i koncert. Hams obok parku dinozaurów — osobny półdzień, nie łączyć z Drachem.",
    photo: "/photos/hams.jpg",
    kids: true
  },
  {
    km: "~15",
    drive: "20 min",
    name: "Cala Domingos",
    tag: "wypad 02",
    text: "Płytka turkusowa zatoczka. Obuwie do wody — kamienie przy brzegu.",
    photo: "/photos/cala-domingos.jpg",
    kids: true
  },
  {
    km: "~20",
    drive: "25 min",
    name: "Manacor — perły Majorica",
    tag: "deszczowy plan",
    text: "Fabryka i sklep pereł, kościół Nostra Senyora dels Dolors. Krótki przystanek, nie cały dzień.",
    photo: "/photos/majorica.jpg",
    kids: false
  },
  {
    km: "20–25",
    drive: "25–30 min",
    name: "Torre de Canyamel",
    tag: "XIII w.",
    text: "Dawniej Torre de Montsó; nazwa od trzciny cukrowej z XV w. Kwadratowa, trzy kondygnacje, blanki.",
    photo: "/photos/canyamel-torre.jpg",
    kids: false
  },
  {
    km: "25–30",
    drive: "30 min",
    name: "Artà i Ses Païsses",
    tag: "targ we wtorek",
    text: "Starówka, Sant Salvador (180 schodów). Za miastem wioska talajocka sprzed Rzymu.",
    photo: "/photos/ses-paisses.jpg",
    kids: true
  },
  {
    km: "30–35",
    drive: "30–35 min",
    name: "Far de Capdepera",
    tag: "najdalej na wschód",
    text: "Latarnia z 1861, światło 76 m n.p.m. Najbardziej wysunięty punkt Majorki. Zamek i Cala Agulla obok.",
    photo: "/photos/far.jpg",
    kids: false
  },
  {
    km: "~29",
    drive: "trasa",
    name: "Vía Verde Manacor–Artà",
    tag: "stary tor",
    text: "29 km po dawnym torze kolejowym. Płasko, rodzinnie, rower lub spacer na odcinku.",
    photo: "/photos/via-verde.jpg",
    kids: true
  },
  {
    km: "~35",
    drive: "40 min",
    name: "Portocolom",
    tag: "skraj 40 km",
    text: "Cichy port na południu wschodu. Tylko gdy dzień jest spokojny i dziecko wyspane.",
    photo: "/photos/portocolom.jpg",
    kids: true
  }
];

export const FACTS = [
  {
    t: "Lepsza zatoka",
    d: "Cala Millor po katalońsku znaczy właśnie „lepsza zatoka”."
  },
  {
    t: "Jezioro Martel",
    d: "W Drachu ma ok. 177 × 40 × 9 m — jedno z największych podziemnych jezior w Europie. Koncert jest na łódkach."
  },
  {
    t: "Trzy jaskinie",
    d: "Drach, Hams i Artà. W sezonie jedna na dzień, nie dwie — kolejki i chłód w środku."
  },
  {
    t: "Dwie gminy",
    d: "Kurort leży na styku Son Servera i Sant Llorenç des Cardassar. Stąd wspólny Consorcio de Turisme."
  },
  {
    t: "Wieże pirackie",
    d: "Punta de n’Amer (XVII w.) i Torre de Canyamel (XIII w.) — linia obrony przed rajdami z morza."
  },
  {
    t: "27 września, 22:30",
    d: "Fajerwerki z molo Cala Millor. Jesteście w środku Festes del Turista (19.09–3.10)."
  }
];

export const GUIDES = [
  { group: "Oficjalne", name: "East Mallorca / Consorcio Cala Millor", href: "https://eastmallorca.com/en/", note: "plaże, targi, adresy wschodu" },
  { group: "Oficjalne", name: "Visit Cala Millor", href: "https://visitcalamillor.com/en/", note: "festiwal, wydarzenia kurortu" },
  { group: "Oficjalne", name: "Mapas East Mallorca", href: "https://maps.eastmallorca.com/en/", note: "mapy plaż, rower, szlaki" },
  { group: "Oficjalne", name: "Illes Balears Travel", href: "https://www.illesbalears.travel/en/mallorca", note: "oficjalna turystyka Balearów" },
  { group: "Przewodniki", name: "SeeMallorca — Cala Millor", href: "https://www.seemallorca.com/cala-millor", note: "duży angielski przewodnik" },
  { group: "Przewodniki", name: "ABC Mallorca", href: "https://www.abc-mallorca.com/", note: "magazyn, jedzenie, wschód wyspy" },
  { group: "Przewodniki", name: "mallorca.com", href: "https://www.mallorca.com/en/", note: "Capdepera, Canyamel, plaże" },
  { group: "Przewodniki", name: "Palma Weekly", href: "https://www.palmaweekly.com/cala-millor-beach-mallorca/", note: "plaża Millor, sezon" },
  { group: "Przewodniki", name: "Lonely Planet — plaże", href: "https://www.lonelyplanet.com/articles/mallorca-best-beaches", note: "16 plaż wyspy" },
  { group: "Rodzina", name: "Mallorca für Kinder", href: "https://www.mallorcafuerkinder.de/cala-millor-straende/", note: "z dzieckiem, plaże, atrakcje" },
  { group: "Rodzina", name: "AllMallorca — Cala Millor", href: "https://www.allmallorca.com/en/see-do/what-to-see-and-do-in-cala-millor/", note: "dojazd, Punta de n’Amer" },
  { group: "Praktyczne", name: "TIB — autobusy", href: "https://www.tib.org/", note: "rozklady, 971 177 777" },
  { group: "Praktyczne", name: "Taxi Cala Millor", href: "https://teletaxicalamillor.com/", note: "971 58 69 69" },
  { group: "Wydarzenia", name: "Fiestas del Turista 2026", href: "https://ociomallorca.com/fiestas-turista-cala-millor/", note: "19.09–3.10, fajerwerki 27.09" }
];

export const SOURCES = [
  { name: "East Mallorca / Consorcio Cala Millor", href: "https://eastmallorca.com/en/" },
  { name: "Mapas East Mallorca — plaże 2026", href: "https://maps.eastmallorca.com/en/our-beaches/resource/r/cala-millor-beach" },
  { name: "Palma Weekly — Cala Millor beach", href: "https://www.palmaweekly.com/cala-millor-beach-mallorca/" },
  { name: "Global Beach Guide — sezon i temperatura wody", href: "https://globalbeachguide.com/beaches/spain/cala-millor" },
  { name: "Ocio Mallorca — Fiestas del Turista 2026", href: "https://ociomallorca.com/fiestas-turista-cala-millor/" },
  { name: "AllMallorca — dojazd i Punta de n’Amer", href: "https://www.allmallorca.com/en/see-do/what-to-see-and-do-in-cala-millor/" },
  { name: "East Mallorca — adresy (taxi, TIB, infopunkt)", href: "https://eastmallorca.com/en/information-of-interest/addresses-of-interest/" },
  { name: "ABC Mallorca — wschodnie wybrzeże", href: "https://www.abc-mallorca.com/life-on-the-east-coast-of-mallorca/" },
  { name: "SeeMallorca — Cala Millor", href: "https://www.seemallorca.com/cala-millor" },
  { name: "Visit Cala Millor", href: "https://visitcalamillor.com" },
  { name: "mallorca.com — Capdepera", href: "https://www.mallorca.com/en/guide/places/capdepera" },
  { name: "Mallorca für Kinder", href: "https://www.mallorcafuerkinder.de/en/100-things-to-do-in-mallorca-with-kids/" }
];
