export type WxIcon =
  | "clear"
  | "mainly-clear"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "showers"
  | "storm"
  | "snow";

export function wmoLabelPl(code: number | null | undefined): string {
  if (code == null) return "—";
  if (code === 0) return "Bezchmurnie";
  if (code === 1) return "Prawie bezchmurnie";
  if (code === 2) return "Częściowe zachmurzenie";
  if (code === 3) return "Pochmurno";
  if (code === 45 || code === 48) return "Mgła";
  if (code >= 51 && code <= 57) return "Mżawka";
  if (code >= 61 && code <= 67) return "Deszcz";
  if (code >= 71 && code <= 77) return "Śnieg";
  if (code >= 80 && code <= 82) return "Przelotne opady";
  if (code === 85 || code === 86) return "Przelotny śnieg";
  if (code >= 95) return "Burza";
  return "Zmienna";
}

export function wmoIcon(code: number | null | undefined): WxIcon {
  if (code == null) return "cloudy";
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "mainly-clear";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "showers";
  if (code >= 95) return "storm";
  return "cloudy";
}

export function wxAsset(code: number | null | undefined, night = false): string {
  const k = wmoIcon(code);
  if (k === "clear") return night ? "/wx/clear-night.svg" : "/wx/clear-day.svg";
  if (k === "mainly-clear") return night ? "/wx/partly-cloudy-night.svg" : "/wx/partly-cloudy-day.svg";
  if (k === "cloudy") return night ? "/wx/overcast-night.svg" : "/wx/overcast-day.svg";
  if (k === "fog") return night ? "/wx/fog-night.svg" : "/wx/fog-day.svg";
  if (k === "drizzle") return "/wx/drizzle.svg";
  if (k === "rain") return "/wx/rain.svg";
  if (k === "showers") return "/wx/rain.svg";
  if (k === "storm") return night ? "/wx/thunderstorms-night.svg" : "/wx/thunderstorms-day.svg";
  if (k === "snow") return "/wx/snow.svg";
  return "/wx/cloudy.svg";
}

export function tempColor(t: number): string {
  if (t <= 0) return "#2563eb";
  if (t <= 10) return "#3b82f6";
  if (t <= 15) return "#38bdf8";
  if (t <= 20) return "#34d399";
  if (t <= 25) return "#fbbf24";
  if (t <= 30) return "#fb923c";
  return "#ef4444";
}

export function compassFromDeg(deg: number | null | undefined): string {
  if (deg == null || Number.isNaN(deg)) return "—";
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}
