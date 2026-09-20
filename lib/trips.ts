export type Trip = {
  id: string;
  n: string;
  title: string;
  sub: string;
  drive: string;
  chips: string[];
  photo: string;
  attrib: string;
  story: string;
  legend: string;
  timeline: { time: string; title: string; note: string }[];
  kids: string[];
  mapsEmbed: string;
  mapsLink: string;
};

export const TRIPS: Trip[] = [
  {
    id: "t1",
    n: "01",
    title: "Coves del Drach i Porto Cristo",
    sub: "Jaskinie Smoka · port rybacki",
    drive: "15–20 min",
    chips: ["czynne 10:00–17:00", "w środku ~20°C", "4,3 / 5"],
    photo: "/photos/coves-drach.jpg",
    attrib: "Cuevas del Drach — Wikimedia Commons",
    story:
      "Wejścia do jaskiń znali okoliczni mieszkańcy na długo przed turystami — pierwsza możliwa pisemna wzmianka pochodzi z 1338 roku. Nazwa „Drach” (kataloński smok) pojawia się w 1632. System liczy dziś ponad 7500 metrów korytarzy.",
    legend:
      "Legenda głosi, że w korytarzach mieszkał smok strzegący skarbu — stąd Jaskinie Smoka. Koncert na jeziorze Martel odbywa się na łódkach.",
    timeline: [
      { time: "10:00", title: "Wyjazd z hotelu", note: "Krótki dojazd wzdłuż wybrzeża." },
      { time: "10:20–11:30", title: "Coves del Drach", note: "Zwiedzanie + koncert na jeziorze." },
      { time: "11:30–12:30", title: "Porto Cristo", note: "Port, lody, obiad przy łodziach." },
      { time: "12:30", title: "Powrót", note: "Czas na drzemkę." }
    ],
    kids: [
      "Bilety online — w sezonie kolejki na słońcu.",
      "W jaskini chłodno (~20°C) — lekka bluza.",
      "Koncert bywa głośny i ciemny.",
      "Schody przy wyjściu — nosidełko, nie wózek."
    ],
    mapsEmbed:
      "https://maps.google.com/maps?saddr=Hipotels+Hipocampo+Palace,+Cala+Millor&daddr=Coves+del+Drach,+Porto+Cristo+to:Porto+Cristo+to:Hipotels+Hipocampo+Palace,+Cala+Millor&output=embed",
    mapsLink:
      "https://www.google.com/maps/dir/Hipotels+Hipocampo+Palace,+Cala+Millor/Coves+del+Drach,+Porto+Cristo/Porto+Cristo/Hipotels+Hipocampo+Palace,+Cala+Millor"
  },
  {
    id: "t2",
    n: "02",
    title: "Safari Mallorca i Cala Domingos",
    sub: "Mini-safari · turkusowa zatoka",
    drive: "10–15 min",
    chips: ["czynne 9:00–18:00", "pociąg ~30 min", "3,8 / 5"],
    photo: "/photos/safari.jpg",
    attrib: "Safari Zoo — pawian przy aucie, Wikimedia Commons",
    story:
      "Kameralny park safari przy drodze Cala Millor – Porto Cristo. Pociąg przejeżdża przez wybiegi z makakami, pawianami, strusiami, zebrami i lamami. Kilkanaście minut dalej: Cala Domingos, piaszczysta zatoczka z płytką wodą.",
    legend: "Pawiany potrafią wskoczyć na dach samochodu — szyby i szyberdach zamknąć.",
    timeline: [
      { time: "10:00", title: "Wyjazd z hotelu", note: "Safari leży niemal po drodze do Porto Cristo." },
      { time: "10:15–12:00", title: "Safari Mallorca", note: "Pociąg + spacer po wybiegach." },
      { time: "12:20–14:00", title: "Cala Domingos", note: "Kąpiel, lunch w chiringuito." },
      { time: "14:00", title: "Powrót", note: "Czas na odpoczynek." }
    ],
    kids: [
      "Zwierząt nie wolno dokarmiać.",
      "Przejazd pociągiem to ok. 30 minut dla 2-latka.",
      "Na plaży obuwie do wody — kamienie przy brzegu."
    ],
    mapsEmbed:
      "https://maps.google.com/maps?saddr=Hipotels+Hipocampo+Palace,+Cala+Millor&daddr=Safari+Mallorca+to:Cala+Domingos,+Cales+de+Mallorca+to:Hipotels+Hipocampo+Palace,+Cala+Millor&output=embed",
    mapsLink:
      "https://www.google.com/maps/dir/Hipotels+Hipocampo+Palace,+Cala+Millor/Safari+Mallorca/Cala+Domingos,+Cales+de+Mallorca/Hipotels+Hipocampo+Palace,+Cala+Millor"
  },
  {
    id: "t3",
    n: "03",
    title: "Zamek Capdepera, Cala Agulla, port",
    sub: "Twierdza XIV w. · plaża · port",
    drive: "30–35 min",
    chips: ["zamek 10:00–20:00", "najdłuższa trasa", "4,5 / 5"],
    photo: "/photos/castell.jpg",
    attrib: "Castell de Capdepera — Wikimedia Commons",
    story:
      "Castell de Capdepera to ufortyfikowana wioska z XIV wieku — schronienie i punkt obserwacyjny nad cieśniną do Minorki. U stóp: Cala Ratjada, osada rybacka z XVII w., dziś drugi port rybacki wyspy. Cala Agulla leży w rezerwacie.",
    legend: "Płytszy brzeg na Cala Agulla jest po prawej stronie zatoki.",
    timeline: [
      { time: "10:00", title: "Wyjazd z hotelu", note: "Najdłuższy odcinek." },
      { time: "10:35–11:20", title: "Castell de Capdepera", note: "Mury i widoki na zatokę." },
      { time: "11:30–13:00", title: "Cala Agulla", note: "Kąpiel w rezerwacie." },
      { time: "13:00–14:15", title: "Port Cala Ratjada", note: "Obiad przy łodziach." },
      { time: "14:15", title: "Powrót", note: "Warto wyjechać punktualnie." }
    ],
    kids: [
      "Zamek: wzniesienia i schody — nosidełko.",
      "Jeśli dziecko się zmęczy, port można pominąć."
    ],
    mapsEmbed:
      "https://maps.google.com/maps?saddr=Hipotels+Hipocampo+Palace,+Cala+Millor&daddr=Castell+de+Capdepera+to:Cala+Agulla+to:Port+de+Cala+Ratjada+to:Hipotels+Hipocampo+Palace,+Cala+Millor&output=embed",
    mapsLink:
      "https://www.google.com/maps/dir/Hipotels+Hipocampo+Palace,+Cala+Millor/Castell+de+Capdepera/Cala+Agulla/Port+de+Cala+Ratjada/Hipotels+Hipocampo+Palace,+Cala+Millor"
  },
  {
    id: "t4",
    n: "04",
    title: "Coves d’Artà i starówka Artà",
    sub: "Najstarsze jaskinie · Sant Salvador",
    drive: "25–30 min",
    chips: ["czynne 10:00–18:00", "z przewodnikiem", "4,7 / 5"],
    photo: "/photos/cap-vermell.jpg",
    attrib: "Cap Vermell / Coves d’Artà — Wikimedia Commons",
    story:
      "Prawdopodobnie najstarszy dostępny turystycznie system jaskiń na Majorce. Służyły jako schronienie podczas najazdów; później kryli się tu piraci i przemytnicy. Wizyta Édouarda Martela w 1876 mogła zainspirować Verne’a. Stalagmit „Królowa Kolumn” ma 22 metry.",
    legend: "W nawigacji wpisz „Coves d’Artà”, nie samo „Artà” — jaskinie leżą przy Canyamel.",
    timeline: [
      { time: "10:00", title: "Wyjazd z hotelu", note: "W stronę Canyamel." },
      { time: "10:35–11:45", title: "Coves d’Artà", note: "Zwiedzanie z przewodnikiem, ~45 min." },
      { time: "12:00–13:30", title: "Starówka Artà", note: "Sant Salvador, obiad." },
      { time: "13:30", title: "Powrót", note: "Spokojny zjazd na wybrzeże." }
    ],
    kids: [
      "Grupy co 30 minut — poczekalnia w cieniu.",
      "180 schodów na Sant Salvador — nosidełko."
    ],
    mapsEmbed:
      "https://maps.google.com/maps?saddr=Hipotels+Hipocampo+Palace,+Cala+Millor&daddr=Coves+d%27Arta,+Canyamel+to:Arta+to:Hipotels+Hipocampo+Palace,+Cala+Millor&output=embed",
    mapsLink:
      "https://www.google.com/maps/dir/Hipotels+Hipocampo+Palace,+Cala+Millor/Coves+d'Arta,+Canyamel/Arta/Hipotels+Hipocampo+Palace,+Cala+Millor"
  }
];
