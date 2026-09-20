"use client";

import { useState } from "react";
import type { DayPoint, HourPoint, WeatherCard } from "@/lib/weather";
import { tempColor, wmoLabelPl, wxAsset } from "@/lib/wmo";

type Mode = "conditions" | "precip" | "wind";

function fmtTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const t = iso.includes("T") ? iso.split("T")[1] : iso;
  return t.slice(0, 5);
}

function fmtNum(v: number | null | undefined, digits = 0, suffix = ""): string {
  if (v == null || Number.isNaN(v)) return "—";
  return `${v.toFixed(digits)}${suffix}`;
}

function isNight(time: string, sunrise: string | null, sunset: string | null): boolean {
  const hh = Number(fmtTime(time).slice(0, 2));
  const up = sunrise ? Number(fmtTime(sunrise).slice(0, 2)) : 7;
  const down = sunset ? Number(fmtTime(sunset).slice(0, 2)) : 20;
  return hh < up || hh >= down;
}

function weekdayPl(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pl-PL", { weekday: "short" }).replace(".", "");
}

export function WxMeteo({
  code,
  night = false,
  size = 48,
  alt
}: {
  code: number | null | undefined;
  night?: boolean;
  size?: number;
  alt?: string;
}) {
  return (
    <img
      className="wx-meteo"
      src={wxAsset(code, night)}
      alt={alt ?? wmoLabelPl(code)}
      width={size}
      height={size}
      draggable={false}
    />
  );
}

export function ForecastHighlight({ wx }: { wx: WeatherCard }) {
  const today = wx.days[0];
  const wet = wx.days.find((d) => (d.precipitation_mm ?? 0) >= 1);
  const parts = [
    `Dziś ${fmtNum(today?.t_min_c, 0)}–${fmtNum(today?.t_max_c, 0)}°`,
    wx.sea.temperature_c != null ? `morze ${fmtNum(wx.sea.temperature_c, 1)}°` : null,
    wet ? `${weekdayPl(wet.date)}: ${wet.precipitation_mm?.toFixed(0)} mm deszczu` : "bez opadu w najbliższych dniach"
  ].filter(Boolean);
  return <p className="wx-highlight">{parts.join(" · ")}</p>;
}

export function HoursStrip({
  hours,
  sunrise,
  sunset
}: {
  hours: HourPoint[];
  sunrise: string | null;
  sunset: string | null;
}) {
  const [mode, setMode] = useState<Mode>("conditions");
  const temps = hours.map((h) => h.temperature_c).filter((n): n is number => n != null);
  const tMin = temps.length ? Math.min(...temps) : 0;
  const tMax = temps.length ? Math.max(...temps) : 1;
  const span = Math.max(tMax - tMin, 1);
  const col = 76;
  const pad = 38;
  const w = Math.max(hours.length * col, col);
  const h = 54;
  const pts = hours
    .map((hr, i) => {
      const t = hr.temperature_c ?? tMin;
      const x = pad + i * col;
      const y = 8 + (1 - (t - tMin) / span) * (h - 16);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="hours pro-hours">
      <div className="pro-head">
        <h3>Najbliższe godziny</h3>
        <div className="pro-modes" role="tablist">
          {(
            [
              ["conditions", "Warunki"],
              ["precip", "Opad"],
              ["wind", "Wiatr"]
            ] as const
          ).map(([id, label]) => (
            <button key={id} className={mode === id ? "on" : ""} onClick={() => setMode(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="pro-hours-scroll">
        {mode === "conditions" && hours.length > 1 && (
          <svg className="pro-curve" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
            <defs>
              <linearGradient id="tempStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={tempColor(tMin)} />
                <stop offset="100%" stopColor={tempColor(tMax)} />
              </linearGradient>
            </defs>
            <polyline points={pts} fill="none" stroke="url(#tempStroke)" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
            {hours.map((hr, i) => {
              const t = hr.temperature_c ?? tMin;
              const x = pad + i * col;
              const y = 8 + (1 - (t - tMin) / span) * (h - 16);
              return <circle key={hr.time} cx={x} cy={y} r="3.2" fill={tempColor(t)} stroke="#fff" strokeWidth="1.4" />;
            })}
          </svg>
        )}
        <div className="pro-hour-row">
          {hours.map((hr, i) => {
            const night = isNight(hr.time, sunrise, sunset);
            const label = i === 0 ? "teraz" : fmtTime(hr.time);
            return (
              <div className="pro-hour" key={hr.time}>
                <div className="pro-hour-time">{label}</div>
                {mode === "conditions" && <WxMeteo code={hr.weather_code} night={night} size={52} />}
                {mode === "precip" && (
                  <div className="precip-col">
                    <div className="precip-pct">{fmtNum(hr.precip_prob, 0)}%</div>
                    <div className="precip-track">
                      <span style={{ height: `${Math.min(hr.precip_prob ?? 0, 100)}%` }} />
                    </div>
                    <div className="precip-mm">{hr.precipitation_mm && hr.precipitation_mm >= 0.1 ? `${hr.precipitation_mm.toFixed(1)} mm` : "—"}</div>
                  </div>
                )}
                {mode === "wind" && (
                  <div className="wind-col">
                    <img src="/wx/wind.svg" alt="" width={40} height={40} />
                    <b>{fmtNum(hr.wind_kmh, 0)}</b>
                    <span>km/h</span>
                    {hr.wind_gust_kmh != null && <em>porywy {fmtNum(hr.wind_gust_kmh, 0)}</em>}
                  </div>
                )}
                {mode === "conditions" && <b className="pro-hour-temp">{fmtNum(hr.temperature_c, 0)}°</b>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WeekStrip({ days, nowC }: { days: DayPoint[]; nowC: number | null }) {
  const [mode, setMode] = useState<Mode>("conditions");
  const mins = days.map((d) => d.t_min_c).filter((n): n is number => n != null);
  const maxs = days.map((d) => d.t_max_c).filter((n): n is number => n != null);
  const lo = mins.length ? Math.min(...mins) : 0;
  const hi = maxs.length ? Math.max(...maxs) : 1;
  const span = Math.max(hi - lo, 1);

  return (
    <section className="days pro-days">
      <div className="pro-head">
        <h3>7 dni · {fmtNum(lo, 0)}–{fmtNum(hi, 0)}°</h3>
        <div className="pro-modes">
          {(
            [
              ["conditions", "Warunki"],
              ["precip", "Opad"],
              ["wind", "Wiatr"]
            ] as const
          ).map(([id, label]) => (
            <button key={id} className={mode === id ? "on" : ""} onClick={() => setMode(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {days.map((d, i) => {
        const min = d.t_min_c ?? lo;
        const max = d.t_max_c ?? hi;
        const left = ((min - lo) / span) * 100;
        const width = Math.max(((max - min) / span) * 100, 10);
        const nowLeft = nowC != null && i === 0 ? ((nowC - lo) / span) * 100 : null;
        const rain = (d.precip_prob ?? 0) >= 15 || (d.precipitation_mm ?? 0) >= 0.5;
        return (
          <div className="apple-day" key={d.date}>
            <span className="day-name">{i === 0 ? "dziś" : weekdayPl(d.date)}</span>
            <WxMeteo code={d.weather_code} size={36} />
            {mode === "conditions" && rain && (
              <span className="day-pop">{fmtNum(d.precip_prob, 0)}%</span>
            )}
            {mode === "conditions" && !rain && <span className="day-pop muted" />}
            {mode === "precip" && (
              <span className="day-pop">{fmtNum(d.precip_prob, 0)}% · {fmtNum(d.precipitation_mm, 1)} mm</span>
            )}
            {mode === "wind" && <span className="day-pop">{fmtNum(d.wind_max_kmh, 0)} km/h</span>}
            {mode === "conditions" && (
              <>
                <span className="tmin">{fmtNum(min, 0)}°</span>
                <div className="range-track">
                  <span
                    className="range-fill"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      background: `linear-gradient(90deg, ${tempColor(min)}, ${tempColor(max)})`
                    }}
                  />
                  {nowLeft != null && <span className="now-dot" style={{ left: `${Math.min(Math.max(nowLeft, 2), 98)}%` }} />}
                </div>
                <span className="tmax">{fmtNum(max, 0)}°</span>
              </>
            )}
            {mode === "precip" && (
              <div className="day-precip-bar">
                <span style={{ width: `${Math.min(d.precip_prob ?? 0, 100)}%` }} />
              </div>
            )}
            {mode === "wind" && (
              <div className="day-precip-bar wind">
                <span style={{ width: `${Math.min(((d.wind_max_kmh ?? 0) / 40) * 100, 100)}%` }} />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}


