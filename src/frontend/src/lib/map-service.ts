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

interface GeocoderAddressComponent {
  long_name: string;
  types: string[];
}

interface GeocoderResult {
  address_components: GeocoderAddressComponent[];
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
    Geocoder: new () => {
      geocode: (
        request: { location: { lat: number; lng: number } },
        callback: (results: GeocoderResult[] | null, status: string) => void,
      ) => void;
    };
  };
}

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;
let googleMapsLoadPromise: Promise<GoogleMapsApi | null> | null = null;
const proxyChatUrl = import.meta.env.VITE_OPENAI_PROXY_URL as
  | string
  | undefined;

function reverseLocationUrl(): string | undefined {
  if (!proxyChatUrl) return undefined;
  return proxyChatUrl.endsWith("/chat")
    ? `${proxyChatUrl.slice(0, -"/chat".length)}/location/reverse`
    : `${proxyChatUrl}/location/reverse`;
}

export interface ObservedBusiness {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export async function findObservedNearbyBusinesses(
  location: GeoLocation,
  keyword: string,
  radiusMeters: number,
): Promise<ObservedBusiness[] | null> {
  const url = reverseLocationUrl()?.replace("/location/reverse", "/market/nearby");
  if (!url || !keyword.trim()) return null;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...location, keyword, radiusMeters }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { results?: ObservedBusiness[] };
    return Array.isArray(data.results) ? data.results : null;
  } catch {
    return null;
  }
}

export function hasGoogleMapsKey(): boolean {
  return Boolean(googleMapsKey);
}

export function loadGoogleMaps(): Promise<GoogleMapsApi | null> {
  if (!googleMapsKey || typeof document === "undefined") {
    return Promise.resolve(null);
  }

  const existing = (window as Window & { google?: GoogleMapsApi }).google;
  if (existing?.maps) return Promise.resolve(existing);

  if (googleMapsLoadPromise) return googleMapsLoadPromise;
  googleMapsLoadPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(googleMapsKey)}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const google = (window as Window & { google?: GoogleMapsApi }).google;
      resolve(google?.maps ? google : null);
    };
    script.onerror = () => {
      googleMapsLoadPromise = null;
      resolve(null);
    };
    document.head.appendChild(script);
  });
  return googleMapsLoadPromise;
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

export interface ReverseGeocodeResult {
  village?: string;
  block?: string;
  district?: string;
  state?: string;
}

/**
 * Uses the server proxy to reverse-geocode coordinates. This is preferred
 * during onboarding because it does not require publishing a Maps key to the
 * browser. A null response simply lets the UI try the optional browser Maps
 * integration or ask for manual entry.
 */
export async function reverseGeocodeViaProxy(
  location: GeoLocation,
): Promise<ReverseGeocodeResult | null> {
  const url = reverseLocationUrl();
  if (!url) return null;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { address?: ReverseGeocodeResult };
    return data.address?.village ? data.address : null;
  } catch {
    return null;
  }
}

/**
 * Reverse-geocodes a detected location into real address components via the
 * Google Maps Geocoder. Never invents a village/district/state — any
 * component the API does not return is simply omitted so the UI can ask
 * the user to fill it in manually instead of showing fabricated data.
 */
export function reverseGeocode(
  api: GoogleMapsApi,
  location: GeoLocation,
): Promise<ReverseGeocodeResult | null> {
  return new Promise((resolve) => {
    const geocoder = new api.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status !== "OK" || !results || results.length === 0) {
        resolve(null);
        return;
      }
      const components = results[0].address_components;
      const find = (type: string) =>
        components.find((c) => c.types.includes(type))?.long_name;
      resolve({
        village: find("locality") ?? find("sublocality") ?? find("postal_town"),
        block: find("administrative_area_level_3"),
        district: find("administrative_area_level_2"),
        state: find("administrative_area_level_1"),
      });
    });
  });
}

export function getCurrentLocation(): Promise<MapServiceResult> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      resolve({ location: null, error: "Geolocation is not supported" });
      return;
    }
    // Browsers only expose geolocation on secure origins (https/localhost).
    // Without this check, the permission prompt silently never appears and
    // the failure gets misreported as "permission denied".
    if (typeof window !== "undefined" && window.isSecureContext === false) {
      resolve({
        location: null,
        error: "Location access requires a secure (https) connection",
      });
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
      (error) => {
        const messages: Record<number, string> = {
          1: "Location permission denied — enable it in your browser's site settings",
          2: "Your device could not determine its location right now",
          3: "Location request timed out — please try again",
        };
        resolve({
          location: null,
          error: messages[error.code] ?? "Location unavailable",
        });
      },
      { timeout: 10000, maximumAge: 60000 },
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
