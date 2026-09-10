import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, C as CircleCheck } from "./index-CeuI7PIL.js";
import { C as Card } from "./Card-DVJtgs4C.js";
import { M as MapPin } from "./map-pin-C-AVKAEB.js";
import { T as TriangleAlert } from "./EstimateBadge-BwLRuXD6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
];
const CircleMinus = createLucideIcon("circle-minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode);
function getCurrentLocation() {
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
            lng: position.coords.longitude
          },
          error: null
        });
      },
      () => {
        resolve({ location: null, error: "Location permission denied" });
      },
      { timeout: 8e3, maximumAge: 6e4 }
    );
  });
}
const DENSITY_LEGEND = [
  { key: "dense", label: "Dense", className: "map-density-dense" },
  { key: "moderate", label: "Moderate", className: "map-density-moderate" },
  { key: "sparse", label: "Sparse", className: "map-density-sparse" },
  {
    key: "underserved",
    label: "Underserved",
    className: "map-density-underserved"
  }
];
function MapCard({
  title,
  location,
  mapData,
  radius,
  onRadiusChange,
  className
}) {
  const { competitors, reliableDataAvailable } = mapData;
  const [geo, setGeo] = reactExports.useState(null);
  const [geoError, setGeoError] = reactExports.useState(null);
  reactExports.useEffect(() => {
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
  const userLocation = geo ?? mapData.userLocation;
  const usingDemoLocation = geo === null;
  const markerX = Math.max(
    40,
    Math.min(360, 200 + (userLocation.lng - 77.4) * 40)
  );
  const markerY = Math.max(
    40,
    Math.min(200, 120 + (23.2 - userLocation.lat) * 40)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: cn("overflow-hidden p-0", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold tracking-tight", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "fieldset",
        {
          className: "flex items-center rounded-full border border-border bg-muted/40 p-0.5",
          "aria-label": "Map radius",
          "data-ocid": "radius_toggle",
          children: ["5km", "10km"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onRadiusChange(r),
              "aria-pressed": radius === r,
              className: cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-smooth",
                radius === r ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              ),
              "data-ocid": `radius_toggle.${r}`,
              children: r
            },
            r
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 w-full overflow-hidden bg-muted/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          viewBox: "0 0 400 240",
          className: "h-full w-full",
          preserveAspectRatio: "xMidYMid slice",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "map-bg", x1: "0", y1: "0", x2: "1", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--accent)", stopOpacity: "0.18" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "stop",
                {
                  offset: "100%",
                  stopColor: "var(--primary)",
                  stopOpacity: "0.12"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "400", height: "240", fill: "url(#map-bg)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { stroke: "var(--border)", strokeWidth: "1", fill: "none", opacity: "0.7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 70 H400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 140 H400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 200 H400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M90 0 V240" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M200 0 V240" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M310 0 V240" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M0 160 C90 140 150 180 230 150 S340 120 400 140",
                stroke: "var(--primary)",
                strokeWidth: "2",
                fill: "none",
                opacity: "0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "200",
                cy: "120",
                r: radius === "5km" ? 60 : 110,
                fill: "var(--primary)",
                opacity: "0.08",
                stroke: "var(--primary)",
                strokeOpacity: "0.35",
                strokeDasharray: "4 4"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: markerX, cy: markerY, r: "7", fill: "var(--map-marker)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: markerX,
                cy: markerY,
                r: "14",
                fill: "var(--map-marker)",
                opacity: "0.25"
              }
            ),
            competitors.map((c, i) => {
              const x = 120 + i * 73 % 200;
              const y = 60 + i * 47 % 120;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: x, cy: y, r: "5", fill: "var(--map-marker)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: x,
                    cy: y,
                    r: "9",
                    fill: "var(--map-marker)",
                    opacity: "0.18"
                  }
                )
              ] }, c.id);
            })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "size-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: location }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto shrink-0 text-xs text-muted-foreground", children: usingDemoLocation ? "DEMO location" : `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-4", children: [
      !reliableDataAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm text-foreground/90",
          "data-ocid": "map_unavailable",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-warning", children: "Reliable local data unavailable" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Showing clearly-labelled DEMO DATA for illustration only." })
          ]
        }
      ) : usingDemoLocation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-foreground/90",
          "data-ocid": "map_geolocation_fallback",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-warning", children: "Using demo location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-muted-foreground", children: [
              geoError ?? "Browser location unavailable",
              " — showing the engine's sample coordinates instead. Enable location access to centre the map on your actual position."
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
          competitors.length,
          " competitors"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Avg distance ",
          mapData.averageDistance,
          " km"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Density" }),
        DENSITY_LEGEND.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn("map-legend-swatch", item.className),
                  style: { background: "currentColor" }
                }
              ),
              item.label
            ]
          },
          item.key
        ))
      ] })
    ] })
  ] });
}
const levelClass = {
  low: "risk-low",
  medium: "risk-medium",
  high: "risk-high"
};
const levelIcon = {
  low: CircleCheck,
  medium: CircleMinus,
  high: TriangleAlert
};
const levelLabel = {
  low: "Low",
  medium: "Medium",
  high: "High"
};
function RiskChip({ category, className }) {
  const Icon = levelIcon[category.level];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-2 rounded-xl border border-border bg-card p-4",
        className
      ),
      "data-ocid": "risk_chip",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: category.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                levelClass[category.level]
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-3.5" }),
                levelLabel[category.level]
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Why: " }),
            category.why
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "What to do: " }),
            category.whatToDo
          ] })
        ] })
      ]
    }
  );
}
export {
  MapCard as M,
  RiskChip as R
};
