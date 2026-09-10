import type { Competitor, MapData } from "@/lib/types";

/**
 * Map service — browser geolocation + static map imagery.
 * ------------------------------------------------------------------
 * Uses the browser Geolocation API to locate the user and renders a
 * static map representation. Competitor counts are NEVER invented: when
 * external data is unavailable, `reliableDataAvailable` is set to false
 * and callers must show 'Reliable local data unavailable' and fall back
 * to clearly-labelled DEMO DATA only in demo mode.
 */

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface MapServiceResult {
  location: GeoLocation | null;
  error: string | null;
}

export function getCurrentLocation(): Promise<MapServiceResult> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      resolve({ location: null, error: "Geolocation is not supported" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
        });
      },
      () => {
        resolve({ location: null, error: "Location permission denied" });
      },
      { timeout: 8000, maximumAge: 60000 },
    );
  });
}

/**
 * Builds a static map view from a location and a set of competitors.
 * When no reliable external competitor data exists, returns a map with
 * `reliableDataAvailable: false` so the UI can show the fallback state.
 */
export function buildStaticMap(
  location: GeoLocation | null,
  competitors: Competitor[],
  _radiusKm: number,
): MapData {
  const userLocation = location ?? { lat: 23.2, lng: 77.4 };
  const reliableDataAvailable = location !== null && competitors.length > 0;

  return {
    userLocation,
    competitors,
    competitorDensity: competitors.length,
    nearestCompetitors: [...competitors]
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 3),
    averageDistance:
      competitors.length > 0
        ? Math.round(
            (competitors.reduce((sum, c) => sum + c.distanceKm, 0) /
              competitors.length) *
              10,
          ) / 10
        : 0,
    businessClusters: [],
    underservedZones: [],
    reliableDataAvailable,
  };
}
