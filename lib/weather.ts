import { compassFromDeg, wmoLabelPl } from "./wmo";
import type { Place } from "./places";

function n(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const x = Number(value);
  return Number.isFinite(x) ? x : null;
}

export type HourPoint = {
  time: string;
  temperature_c: number | null;
  weather_code: number | null;
  precipitation_mm: number | null;
  precip_prob: number | null;
  humidity_percent: number | null;
  wind_kmh: number | null;
  wind_gust_kmh: number | null;
  uv: number | null;
};

export type DayPoint = {
  date: string;
  t_min_c: number | null;
  t_max_c: number | null;
  sunrise: string | null;
  sunset: string | null;
  uv_max: number | null;
  precipitation_mm: number | null;
  precip_prob: number | null;
  wind_max_kmh: number | null;
  weather_code: number | null;
  sea_c: number | null;
};

export type WeatherCard = {
  timestamp: string;
  location: {
    id: string;
    name: string;
    city: string;
    country: string;
    lat: number;
    lon: number;
    timezone: string;
  };
  weather: {
    condition: string;
    description: string;
    code: number | null;
    cloud_cover_percent: number | null;
  };
  temperature: {
    current_c: number | null;
    feels_like_c: number | null;
    min_c: number | null;
    max_c: number | null;
  };
  atmosphere: {
    pressure_hpa: number | null;
    humidity_percent: number | null;
    uv: number | null;
  };
  wind: {
    speed_kmh: number | null;
    direction_deg: number | null;
    direction: string;
  };
  sun: {
    sunrise: string | null;
    sunset: string | null;
  };
  sea: {
    temperature_c: number | null;
    wave_height_m: number | null;
    wave_period_s: number | null;
    wave_direction_deg: number | null;
  };
  hours: HourPoint[];
  days: DayPoint[];
  source: {
    provider: string;
    marine: string;
    status: "ok" | "partial" | "error";
  };
};

export async function fetchPlaceWeather(place: Place): Promise<WeatherCard> {
  const forecast = new URL("https://api.open-meteo.com/v1/forecast");
  forecast.searchParams.set("latitude", String(place.lat));
  forecast.searchParams.set("longitude", String(place.lon));
  forecast.searchParams.set("timezone", "Europe/Madrid");
  forecast.searchParams.set("forecast_days", "7");
  forecast.searchParams.set("wind_speed_unit", "kmh");
  forecast.searchParams.set(
    "current",
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "cloud_cover",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "weather_code",
      "uv_index"
    ].join(",")
  );
  forecast.searchParams.set(
    "hourly",
    [
      "temperature_2m",
      "precipitation",
      "precipitation_probability",
      "weather_code",
      "relative_humidity_2m",
      "wind_speed_10m",
      "wind_gusts_10m",
      "uv_index"
    ].join(",")
  );
  forecast.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max"
    ].join(",")
  );

  const marine = new URL("https://marine-api.open-meteo.com/v1/marine");
  marine.searchParams.set("latitude", String(place.lat));
  marine.searchParams.set("longitude", String(place.lon));
  marine.searchParams.set("timezone", "Europe/Madrid");
  marine.searchParams.set("forecast_days", "7");
  marine.searchParams.set(
    "current",
    "sea_surface_temperature,wave_height,wave_period,wave_direction"
  );
  marine.searchParams.set("daily", "sea_surface_temperature_max");

  const [fRes, mRes] = await Promise.all([
    fetch(forecast.toString(), { next: { revalidate: 600 } }),
    fetch(marine.toString(), { next: { revalidate: 600 } })
  ]);

  if (!fRes.ok) {
    throw new Error(`Open-Meteo forecast HTTP ${fRes.status}`);
  }

  const f = (await fRes.json()) as Record<string, unknown>;
  const m = mRes.ok ? ((await mRes.json()) as Record<string, unknown>) : {};
  const current = (f.current ?? {}) as Record<string, unknown>;
  const daily = (f.daily ?? {}) as Record<string, unknown[]>;
  const hourly = (f.hourly ?? {}) as Record<string, unknown[]>;
  const mCurrent = (m.current ?? {}) as Record<string, unknown>;
  const mDaily = (m.daily ?? {}) as Record<string, unknown[]>;

  const times = (hourly.time ?? []) as string[];
  const nowIso = String(current.time ?? "");
  const start = Math.max(0, times.findIndex((t) => t >= nowIso));
  const hours: HourPoint[] = times.slice(start, start + 24).map((time, j) => {
    const i = start + j;
    return {
      time,
      temperature_c: n(hourly.temperature_2m?.[i]),
      weather_code: n(hourly.weather_code?.[i]),
      precipitation_mm: n(hourly.precipitation?.[i]),
      precip_prob: n(hourly.precipitation_probability?.[i]),
      humidity_percent: n(hourly.relative_humidity_2m?.[i]),
      wind_kmh: n(hourly.wind_speed_10m?.[i]),
      wind_gust_kmh: n(hourly.wind_gusts_10m?.[i]),
      uv: n(hourly.uv_index?.[i])
    };
  });

  const dates = (daily.time ?? []) as string[];
  const days: DayPoint[] = dates.map((date, i) => ({
    date,
    t_min_c: n(daily.temperature_2m_min?.[i]),
    t_max_c: n(daily.temperature_2m_max?.[i]),
    sunrise: (daily.sunrise?.[i] as string) ?? null,
    sunset: (daily.sunset?.[i] as string) ?? null,
    uv_max: n(daily.uv_index_max?.[i]),
    precipitation_mm: n(daily.precipitation_sum?.[i]),
    precip_prob: n(daily.precipitation_probability_max?.[i]),
    wind_max_kmh: n(daily.wind_speed_10m_max?.[i]),
    weather_code: n(daily.weather_code?.[i]),
    sea_c: n(mDaily.sea_surface_temperature_max?.[i])
  }));

  const code = n(current.weather_code);
  const windDeg = n(current.wind_direction_10m);

  return {
    timestamp: String(current.time ?? new Date().toISOString()),
    location: {
      id: place.id,
      name: place.name,
      city: place.name,
      country: "ES",
      lat: place.lat,
      lon: place.lon,
      timezone: "Europe/Madrid"
    },
    weather: {
      condition: wmoLabelPl(code),
      description: wmoLabelPl(code),
      code,
      cloud_cover_percent: n(current.cloud_cover)
    },
    temperature: {
      current_c: n(current.temperature_2m),
      feels_like_c: n(current.apparent_temperature),
      min_c: days[0]?.t_min_c ?? null,
      max_c: days[0]?.t_max_c ?? null
    },
    atmosphere: {
      pressure_hpa: n(current.pressure_msl),
      humidity_percent: n(current.relative_humidity_2m),
      uv: n(current.uv_index)
    },
    wind: {
      speed_kmh: n(current.wind_speed_10m),
      direction_deg: windDeg,
      direction: compassFromDeg(windDeg)
    },
    sun: {
      sunrise: days[0]?.sunrise ?? null,
      sunset: days[0]?.sunset ?? null
    },
    sea: {
      temperature_c: n(mCurrent.sea_surface_temperature),
      wave_height_m: n(mCurrent.wave_height),
      wave_period_s: n(mCurrent.wave_period),
      wave_direction_deg: n(mCurrent.wave_direction)
    },
    hours,
    days,
    source: {
      provider: "Open-Meteo",
      marine: mRes.ok ? "Open-Meteo Marine" : "unavailable",
      status: mRes.ok ? "ok" : "partial"
    }
  };
}
