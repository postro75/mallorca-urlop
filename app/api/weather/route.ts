import { NextRequest, NextResponse } from "next/server";
import { getPlace } from "@/lib/places";
import { fetchPlaceWeather } from "@/lib/weather";

export const revalidate = 600;

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const place = getPlace(id);
  try {
    const card = await fetchPlaceWeather(place);
    return NextResponse.json(card, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "weather_failed";
    return NextResponse.json({ error: message, place: place.id }, { status: 502 });
  }
}
