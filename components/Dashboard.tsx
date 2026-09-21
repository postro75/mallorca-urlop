"use client";

import { useEffect, useState } from "react";
import { MiniMetricIcon, NavIcon } from "@/components/Icons";
import { ForecastHighlight, HoursStrip, WeekStrip, WxMeteo } from "@/components/WeatherCharts";
import { BEACHES, FACTS, FESTIVAL, GUIDES, ISLAND_HERO, NEARBY, PACK, PRACTICAL, SOURCES, TOWNS } from "@/lib/island";
import { PLACES, type Place } from "@/lib/places";
import { TRIPS, type Trip } from "@/lib/trips";
import type { WeatherCard } from "@/lib/weather";


type Tab = "today" | "weather" | "trips" | "island";

function fmtTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const t = iso.includes("T") ? iso.split("T")[1] : iso;
  return t.slice(0, 5);
}

function fmtNum(v: number | null | undefined, digits = 0, suffix = ""): string {
  if (v == null || Number.isNaN(v)) return "—";
  return `${v.toFixed(digits)}${suffix}`;
}



function isDaytime(wx: WeatherCard): boolean {
  const t = wx.timestamp;
  if (!wx.sun.sunrise || !wx.sun.sunset) return (wx.atmosphere.uv ?? 0) > 0;
  return t >= wx.sun.sunrise && t < wx.sun.sunset;
}

export function Dashboard() {
  const [tab, setTab] = useState<Tab>("today");
  const [place, setPlace] = useState<Place>(PLACES[0]);
  const [wx, setWx] = useState<WeatherCard | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    fetch(`/api/weather?id=${place.id}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Pogoda niedostępna");
        return data as WeatherCard;
      })
      .then((data) => {
        if (!cancelled) setWx(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setErr(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [place.id]);

  function openTab(next: Tab) {
    setTab(next);
    if (next !== "trips") setTrip(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="kicker">Mallorca · rodzina</div>
          <h1>Cala Millor</h1>
        </div>
        <div className="dates">22.09 – 01.10</div>
      </header>

      <WeatherStrip
        wx={wx}
        place={place}
        loading={loading}
        onOpen={() => openTab("weather")}
      />
      {err && <p className="status err">{err}</p>}

      {tab === "today" && (
        <>
          <Hero wx={wx} place={place} />
          <PlacePicker place={place} onPick={setPlace} />
          {wx && <Metrics wx={wx} />}
          <section className="fest" style={{ marginTop: 16 }}>
            <div className="when">{FESTIVAL.dates}</div>
            <h3>{FESTIVAL.title}</h3>
            <p>{FESTIVAL.overlap}</p>
            <p>{FESTIVAL.fireworks}</p>
          </section>
          <h3 style={{ margin: "22px 0 10px", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
            Cztery wypady z hotelu
          </h3>
          <div className="ov">
            {TRIPS.map((t) => (
              <button
                key={t.id}
                className="ov-card"
                onClick={() => {
                  setTrip(t);
                  setTab("trips");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="crystal">
                  <img src={t.photo} alt="" />
                </div>
                <div className="body">
                  <div className="n">WYCIECZKA {t.n} · {t.drive}</div>
                  <h4>{t.title}</h4>
                  <p>{t.sub}</p>
                </div>
              </button>
            ))}
          </div>
          <h3 className="sec-label">W okolicy ≤ 40 km</h3>
          <div className="nearby">
            {NEARBY.slice(0, 6).map((n) => (
              <article className="nearby-card" key={n.name}>
                <div className="crystal">
                  <img src={n.photo} alt="" />
                </div>
                <div className="body">
                  <div className="n">{n.km} km · {n.drive}{n.kids ? " · z dzieckiem" : ""}</div>
                  <h4>{n.name}</h4>
                  <p>{n.text}</p>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {tab === "weather" && (
        <>
          <Hero wx={wx} place={place} />
          <PlacePicker place={place} onPick={setPlace} />
          {wx && (
            <>
              <ForecastHighlight wx={wx} />
              <Metrics wx={wx} />
              <HoursStrip hours={wx.hours} sunrise={wx.sun.sunrise} sunset={wx.sun.sunset} />
              <WeekStrip days={wx.days} nowC={wx.temperature.current_c} />
              <p className="status">
                Źródło: {wx.source.provider}
                {wx.source.marine ? ` · woda: ${wx.source.marine}` : ""} · ikony Meteocons · strefa Europe/Madrid · 10 min
              </p>
            </>
          )}
        </>
      )}

      {tab === "trips" && !trip && (
        <>
          <p className="status" style={{ marginTop: 0 }}>
            Hipotels Hipocampo Palace · auto · wyjazd 10:00, powrót ok. 15:00
          </p>
          <div className="ov">
            {TRIPS.map((t) => (
              <button key={t.id} className="ov-card" onClick={() => setTrip(t)}>
                <div className="crystal">
                  <img src={t.photo} alt="" />
                </div>
                <div className="body">
                  <div className="n">WYCIECZKA {t.n} · {t.drive}</div>
                  <h4>{t.title}</h4>
                  <p>{t.sub}</p>
                </div>
              </button>
            ))}
          </div>
          <h3 className="sec-label">W bagażniku</h3>
          <div className="pack">
            {PACK.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </>
      )}

      {tab === "trips" && trip && (
        <article>
          <button className="chip" onClick={() => setTrip(null)} style={{ border: 0, cursor: "pointer", marginBottom: 12 }}>
            ← Wszystkie wycieczki
          </button>
          <div className="crystal trip-crystal">
            <img src={trip.photo} alt="" />
          </div>
          <p className="status">{trip.attrib}</p>
          <h2 style={{ letterSpacing: "-0.03em", margin: "8px 0 4px" }}>{trip.title}</h2>
          <p className="status" style={{ marginTop: 0 }}>{trip.sub}</p>
          <div className="chips">
            <span className="chip">{trip.drive} dojazdu</span>
            {trip.chips.map((c) => (
              <span className="chip" key={c}>{c}</span>
            ))}
          </div>
          <section className="panel-card">
            <h3>Historia</h3>
            <p style={{ margin: 0, lineHeight: 1.55 }}>{trip.story}</p>
            <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.5 }}>{trip.legend}</p>
          </section>
          <section className="panel-card">
            <h3>Plan dnia</h3>
            <ul className="timeline">
              {trip.timeline.map((row) => (
                <li key={row.time}>
                  <span className="time">{row.time}</span>
                  <span>
                    <b>{row.title}</b>
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>{row.note}</div>
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <div className="kids">
            <strong>Z dzieckiem</strong>
            <ul>
              {trip.kids.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
          <div className="map-wrap">
            <iframe title="Mapa" loading="lazy" src={trip.mapsEmbed} />
          </div>
          <a className="btn" href={trip.mapsLink} target="_blank" rel="noreferrer">
            Otwórz trasę w Mapach
          </a>
        </article>
      )}

      {tab === "island" && (
        <>
          <section className="island-hero crystal">
            <img src="/photos/cala-millor.jpg" alt="Plaża Cala Millor" />
            <div className="veil" />
            <div className="copy">
              <div className="kicker">{ISLAND_HERO.kicker}</div>
              <h2>{ISLAND_HERO.title}</h2>
              <p>{ISLAND_HERO.lead}</p>
            </div>
          </section>

          <section className="fest">
            <div className="when">{FESTIVAL.dates}</div>
            <h3>{FESTIVAL.title}</h3>
            <p>{FESTIVAL.overlap}</p>
            <p>{FESTIVAL.fireworks}</p>
            <p>{FESTIVAL.extra}</p>
            <p>{FESTIVAL.source}</p>
          </section>

          <h3 className="sec-label">Ciekawostki</h3>
          <div className="facts">
            {FACTS.map((f) => (
              <article className="fact" key={f.t}>
                <h4>{f.t}</h4>
                <p>{f.d}</p>
              </article>
            ))}
          </div>

          <h3 className="sec-label">W okolicy ≤ 40 km</h3>
          <div className="nearby">
            {NEARBY.map((n) => (
              <article className="nearby-card" key={n.name}>
                <div className="crystal">
                  <img src={n.photo} alt="" />
                </div>
                <div className="body">
                  <div className="n">{n.tag} · {n.km} km · {n.drive}</div>
                  <h4>{n.name}</h4>
                  <p>{n.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mosaic">
            {BEACHES.slice(0, 3).map((b) => (
              <article className="tile crystal" key={b.name}>
                <img src={b.photo} alt={b.name} />
                    <div className="cap">
                  <div className="tag">{b.tag}</div>
                  <h4>{b.name}</h4>
                  <p>{b.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="ov" style={{ marginTop: 12 }}>
            {BEACHES.slice(3).map((b) => (
              <article className="ov-card" key={b.name} style={{ cursor: "default" }}>
                <div className="crystal">
                  <img src={b.photo} alt={b.name} />
                </div>
                <div className="body">
                  <div className="n">{b.tag}</div>
                  <h4>{b.name}</h4>
                  <p>{b.text}</p>
                </div>
              </article>
            ))}
          </div>

          <h3 className="sec-label">Wioski wschodu</h3>
          <div className="towns">
            {TOWNS.map((t) => (
              <article className="town" key={t.name}>
                <h4>{t.name}</h4>
                <div className="meta">{t.meta}</div>
                <p>{t.text}</p>
              </article>
            ))}
          </div>

          <h3 className="sec-label">Praktyczne</h3>
          <div className="pract">
            {PRACTICAL.map((p) => (
              <div key={p.k}>
                <b>{p.k}</b>
                {p.v}
              </div>
            ))}
          </div>

          <h3 className="sec-label">Przewodniki i strony</h3>
          <div className="guides">
            {GUIDES.map((g) => (
              <a className="guide" key={g.href} href={g.href} target="_blank" rel="noreferrer">
                <span className="guide-g">{g.group}</span>
                <strong>{g.name}</strong>
                <span>{g.note}</span>
              </a>
            ))}
          </div>

          <div className="sources">
            Zdjęcia: Wikimedia Commons (Cala Millor, Capdepera, Cap Vermell, Cala Agulla, Punta de n’Amer).
            Przewodniki:{" "}
            {SOURCES.map((s, i) => (
              <span key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer">{s.name}</a>
                {i < SOURCES.length - 1 ? " · " : ""}
              </span>
            ))}
          </div>
        </>
      )}

      <nav className="nav">
        {(
          [
            ["today", "Dziś"],
            ["weather", "Pogoda"],
            ["trips", "Wypady"],
            ["island", "Wyspa"]
          ] as const
        ).map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => openTab(id)}>
            <NavIcon name={id} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function WeatherStrip({
  wx,
  place,
  loading,
  onOpen
}: {
  wx: WeatherCard | null;
  place: Place;
  loading: boolean;
  onOpen: () => void;
}) {
  return (
    <button className="wx-strip glass" type="button" onClick={onOpen} aria-label="Otwórz pogodę">
      <WxMeteo code={wx?.weather.code} size={40} />
      <span className="wx-main">
        <span className="wx-place">Pogoda · {place.name}</span>
        <span className="wx-cond">
          {loading && !wx ? "Pobieram…" : wx?.weather.condition ?? "—"}
        </span>
      </span>
      <span className="wx-temp">{wx ? fmtNum(wx.temperature.current_c, 0) : "—"}°</span>
      {wx && (
        <span className="wx-bits">
          <span className="bit">morze {fmtNum(wx.sea.temperature_c, 1)}°</span>
          <span className="bit">↑ {fmtTime(wx.sun.sunrise)}</span>
          <span className="bit">↓ {fmtTime(wx.sun.sunset)}</span>
        </span>
      )}
    </button>
  );
}

function PlacePicker({ place, onPick }: { place: Place; onPick: (p: Place) => void }) {
  return (
    <div className="places">
      {PLACES.map((p) => (
        <button key={p.id} className={p.id === place.id ? "on" : ""} onClick={() => onPick(p)}>
          {p.name}
        </button>
      ))}
    </div>
  );
}

function Hero({
  wx,
  place
}: {
  wx: WeatherCard | null;
  place: Place;
}) {
  return (
    <section className="hero-wx crystal">
      <img className="hero-photo" src={place.photo} alt={place.name} />
      <div className="veil" />
      <div className="glyph">
        <WxMeteo code={wx?.weather.code} night={Boolean(wx && !isDaytime(wx))} size={96} />
      </div>
      <div className="inner">
        <div className="place">{place.name}{place.home ? " · baza" : ` · ${place.hint}`}</div>
        <div className="temp">{wx ? fmtNum(wx.temperature.current_c, 0) : "—"}°</div>
        <div className="cond">{wx?.weather.condition ?? "Pogoda"}</div>
        <div className="range">
          Max {fmtNum(wx?.temperature.max_c, 0)}° · min {fmtNum(wx?.temperature.min_c, 0)}° · odczuwalna{" "}
          {fmtNum(wx?.temperature.feels_like_c, 0)}°
        </div>
      </div>
      {wx && (
        <div className="glass-cap">
          <span>Morze {fmtNum(wx.sea.temperature_c, 1)}°</span>
          <span>Wschód {fmtTime(wx.sun.sunrise)}</span>
          <span>Zachód {fmtTime(wx.sun.sunset)}</span>
          <span>{fmtNum(wx.atmosphere.pressure_hpa, 0)} hPa</span>
        </div>
      )}
    </section>
  );
}

function Metrics({ wx }: { wx: WeatherCard }) {
  const items = [
    { lab: "Wschód", val: fmtTime(wx.sun.sunrise), sub: "lokalnie", ico: "sunup" as const },
    { lab: "Zachód", val: fmtTime(wx.sun.sunset), sub: "lokalnie", ico: "sundown" as const },
    { lab: "Morze", val: fmtNum(wx.sea.temperature_c, 1, "°"), sub: "powierzchnia", ico: "sea" as const },
    { lab: "Fala", val: fmtNum(wx.sea.wave_height_m, 1, " m"), sub: `${fmtNum(wx.sea.wave_period_s, 0)} s`, ico: "wave" as const },
    { lab: "Ciśnienie", val: fmtNum(wx.atmosphere.pressure_hpa, 0, " hPa"), sub: "poziom morza", ico: "pressure" as const },
    { lab: "Wiatr", val: fmtNum(wx.wind.speed_kmh, 0, " km/h"), sub: wx.wind.direction, ico: "wind" as const },
    ...(isDaytime(wx)
      ? [{ lab: "UV", val: fmtNum(wx.atmosphere.uv, 1), sub: "indeks", ico: "uv" as const }]
      : []),
    { lab: "Wilgotność", val: fmtNum(wx.atmosphere.humidity_percent, 0, "%"), sub: "powietrze", ico: "hum" as const }
  ];
  return (
    <div className="metrics">
      {items.map((m) => (
        <div className="metric" key={m.lab}>
          <div className="lab">
            <MiniMetricIcon name={m.ico} />
            {m.lab}
          </div>
          <div className="val">{m.val}</div>
          <div className="sub">{m.sub}</div>
        </div>
      ))}
    </div>
  );
}
