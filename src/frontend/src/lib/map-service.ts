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

interface GoogleMapsApi {
  maps: {
    Map: new (
      element: HTMLElement,
      options: { center: { lat: number; lng: number }; zoom: number },
    ) => unknown;
    Marker: new (options: {
      map: unknown;
      position: { lat: number; lng: number };
      title?: string;
    }) => unknown;
    Circle: new (options: {
      map: unknown;
      center: { lat: number; lng: number };
      radius: number;
      fillColor: string;
      fillOpacity: number;
      strokeColor: string;
      strokeOpacity: number;
    }) => unknown;
  };
}

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;

export function hasGoogleMapsKey(): boolean {
  return Boolean(googleMapsKey);
}

export function loadGoogleMaps(): Promise<GoogleMapsApi | null> {
  if (!googleMapsKey || typeof document === "undefined") {
    return Promise.resolve(null);
  }

  const existing = (window as Window & { google?: GoogleMapsApi }).google;
  if (existing?.maps) return Promise.resolve(existing);

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(googleMapsKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const google = (window as Window & { google?: GoogleMapsApi }).google;
      resolve(google?.maps ? google : null);
    };
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

export function renderGoogleMap(
  api: GoogleMapsApi,
  element: HTMLElement,
  mapData: MapData,
  radiusKm: number,
): void {
  const center = mapData.userLocation;
  const map = new api.maps.Map(element, {
    center,
    zoom: radiusKm === 5 ? 13 : 11,
  });
  new api.maps.Marker({ map, position: center, title: "Your location" });
  new api.maps.Circle({
    map,
    center,
    radius: radiusKm * 1000,
    fillColor: "#8bd646",
    fillOpacity: 0.12,
    strokeColor: "#4c8d18",
    strokeOpacity: 0.6,
  });
  for (const competitor of mapData.competitors) {
    new api.maps.Marker({
      map,
      position: { lat: competitor.lat, lng: competitor.lng },
      title: competitor.name,
    });
  }
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
