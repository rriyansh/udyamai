import { Card } from "@/components/Card";
import {
  getCurrentLocation,
  findObservedNearbyBusinesses,
  hasGoogleMapsKey,
  loadGoogleMaps,
  renderGoogleMap,
} from "@/lib/map-service";
import type { Competitor, MapData, Radius } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, Navigation } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MapCardProps {
  title: string;
  location: string;
  mapData: MapData;
  radius: Radius;
  onRadiusChange: (radius: Radius) => void;
  /** User-selected business name/category used for live nearby lookup. */
  businessKeyword?: string;
  className?: string;
}

const DENSITY_LEGEND = [
  { key: "dense", label: "Dense", className: "map-density-dense" },
  { key: "moderate", label: "Moderate", className: "map-density-moderate" },
  { key: "sparse", label: "Sparse", className: "map-density-sparse" },
  {
    key: "underserved",
    label: "Underserved",
    className: "map-density-underserved",
  },
] as const;

/**
 * Functional competitor map with a 5km/10km radius toggle, competitor
 * markers, and a density legend. When reliable external data is
 * unavailable it shows 'Reliable local data unavailable' and falls back
 * to clearly-labelled DEMO DATA only in demo mode.
 */
export function MapCard({
  title,
  location,
  mapData,
  radius,
  onRadiusChange,
  businessKeyword,
  className,
}: MapCardProps) {
  const { competitors, reliableDataAvailable } = mapData;

  // Resolve the user's actual browser location. When geolocation is
  // unavailable or denied, fall back to the engine's coordinates and
  // clearly label it as a demo location — real-world data is never faked.
  const [geo, setGeo] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const googleMapRef = useRef<HTMLDivElement>(null);
  const [googleMapReady, setGoogleMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [observedCount, setObservedCount] = useState<number | null>(null);
  const [observedBusinesses, setObservedBusinesses] = useState<Competitor[]>([]);

  useEffect(() => {
    let cancelled = false;
    void getCurrentLocation().then((result) => {
      if (cancelled) return;
      if (result.location) {
        setGeo(result.location);
        setGeoError(null);
      } else {
        setGeo(null);
        setGeoError(result.error ?? "Location unavailable");
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!geo || !businessKeyword) return;
    let cancelled = false;
    void findObservedNearbyBusinesses(
      geo,
      businessKeyword,
      radius === "5km" ? 5000 : 10000,
    ).then((businesses) => {
      if (cancelled) return;
      setObservedCount(businesses?.length ?? null);
      setObservedBusinesses(
        (businesses ?? []).map((business, index) => ({
          id: Number.parseInt(business.id, 10) || index + 1,
          name: business.name,
          lat: business.lat,
          lng: business.lng,
          distanceKm: 0,
          priceRangeMin: 0,
          priceRangeMax: 0,
          priceRangeAvg: 0,
        })),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [geo, businessKeyword, radius]);

  useEffect(() => {
    if (!hasGoogleMapsKey() || !googleMapRef.current) {
      setMapError("Add VITE_GOOGLE_MAPS_API_KEY to show the live Google map.");
      return;
    }
    let cancelled = false;
    void loadGoogleMaps().then((api) => {
      if (!cancelled && api && googleMapRef.current) {
        renderGoogleMap(
          api,
          googleMapRef.current,
          {
            ...mapData,
            userLocation: geo ?? mapData.userLocation,
            competitors:
              observedBusinesses.length > 0
                ? observedBusinesses
                : mapData.competitors,
          },
          radius === "5km" ? 5 : 10,
        );
        setGoogleMapReady(true);
        setMapError(null);
      } else if (!cancelled) {
        setGoogleMapReady(false);
        setMapError("Google Maps could not load. Check the API key and Maps JavaScript API.");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [mapData, radius, geo, observedBusinesses]);

  const userLocation = geo ?? mapData.userLocation;
  const usingDemoLocation = geo === null;
  const displayedCompetitors =
    observedBusinesses.length > 0 ? observedBusinesses : competitors;

  // Position the user marker from the resolved location. The engine's
  // fallback (23.2, 77.4) maps to the centre of the viewBox.
  const markerX = Math.max(
    40,
    Math.min(360, 200 + (userLocation.lng - 77.4) * 40),
  );
  const markerY = Math.max(
    40,
    Math.min(200, 120 + (23.2 - userLocation.lat) * 40),
  );

  return (
    <Card className={cn("overflow-hidden p-0", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border p-4">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-primary" />
          <h3 className="font-display text-base font-semibold tracking-tight">
            {title}
          </h3>
        </div>
        <fieldset
          className="flex items-center rounded-full border border-border bg-muted/40 p-0.5"
          aria-label="Map radius"
          data-ocid="radius_toggle"
        >
          {(["5km", "10km"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRadiusChange(r)}
              aria-pressed={radius === r}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-smooth",
                radius === r
                  ? "bg-gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid={`radius_toggle.${r}`}
            >
              {r}
            </button>
          ))}
        </fieldset>
      </div>

      <div className="relative h-56 w-full overflow-hidden bg-muted/40">
        <div
          ref={googleMapRef}
          className={cn("h-full w-full", !googleMapReady && "hidden")}
        />
        <svg
          viewBox="0 0 400 240"
          className={cn("h-full w-full", googleMapReady && "hidden")}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity="0.12"
              />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#map-bg)" />
          <g stroke="var(--border)" strokeWidth="1" fill="none" opacity="0.7">
            <path d="M0 70 H400" />
            <path d="M0 140 H400" />
            <path d="M0 200 H400" />
            <path d="M90 0 V240" />
            <path d="M200 0 V240" />
            <path d="M310 0 V240" />
          </g>
          <path
            d="M0 160 C90 140 150 180 230 150 S340 120 400 140"
            stroke="var(--primary)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          {/* radius ring */}
          <circle
            cx="200"
            cy="120"
            r={radius === "5km" ? 60 : 110}
            fill="var(--primary)"
            opacity="0.08"
            stroke="var(--primary)"
            strokeOpacity="0.35"
            strokeDasharray="4 4"
          />
          {/* user location */}
          <circle cx={markerX} cy={markerY} r="7" fill="var(--map-marker)" />
          <circle
            cx={markerX}
            cy={markerY}
            r="14"
            fill="var(--map-marker)"
            opacity="0.25"
          />
          {/* competitor markers */}
          {displayedCompetitors.map((c, i) => {
            const x = observedBusinesses.length
              ? Math.max(25, Math.min(375, 200 + (c.lng - userLocation.lng) * 9000))
              : 120 + ((i * 73) % 200);
            const y = observedBusinesses.length
              ? Math.max(25, Math.min(215, 120 - (c.lat - userLocation.lat) * 9000))
              : 60 + ((i * 47) % 120);
            return (
              <g key={`${c.id}-${i}`}>
                <circle cx={x} cy={y} r="5" fill="var(--map-marker)" />
                <circle
                  cx={x}
                  cy={y}
                  r="9"
                  fill="var(--map-marker)"
                  opacity="0.18"
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur">
          <Navigation className="size-4 text-primary" />
          <span className="truncate">{location}</span>
          <span className="ml-auto shrink-0 text-xs text-muted-foreground">
            {usingDemoLocation
              ? "Approximate location"
              : `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`}
          </span>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {!reliableDataAvailable ? (
          <div
            className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm text-foreground/90"
            data-ocid="map_unavailable"
          >
            <p className="font-medium text-warning">
              Reliable local data unavailable
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Showing estimated map data for illustration only.
            </p>
          </div>
        ) : usingDemoLocation ? (
          <div
            className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-foreground/90"
            data-ocid="map_geolocation_fallback"
          >
            <p className="font-medium text-warning">Using an approximate location</p>
            <p className="mt-1 text-muted-foreground">
              {geoError ?? "Browser location unavailable"} — showing the
              engine's sample coordinates instead. Enable location access to
              centre the map on your actual position.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              {competitors.length} competitors
            </span>
            <span>·</span>
            <span>Avg distance {mapData.averageDistance} km</span>
          </div>
        )}
        {mapError ? (
          <p className="text-xs text-muted-foreground" data-ocid="map_setup_error">
            {mapError}
          </p>
        ) : null}
        {observedCount !== null ? (
          <p className="text-xs text-muted-foreground" data-ocid="observed_business_count">
            OpenStreetMap found {observedCount} mapped {businessKeyword} businesses in this radius; their locations are marked on the map. This is observed listing availability, not a claim about customer demand.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            Density
          </span>
          {DENSITY_LEGEND.map((item) => (
            <span
              key={item.key}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className={cn("map-legend-swatch", item.className)}
                style={{ background: "currentColor" }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
