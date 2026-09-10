import { MapCard } from "@/components/ui/MapCard";
import { generateDemoAnalysis } from "@/lib/analysis-engine";
import type { AnalysisInput, MapData, Radius } from "@/lib/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const INPUT: AnalysisInput = {
  village: "Rampur",
  block: "Khairagarh",
  district: "Rajpur",
  state: "Madhya Pradesh",
  category: "dairy",
  capital: 100000,
};

function demoMap(radius: Radius): MapData {
  return generateDemoAnalysis(INPUT, radius).result.map;
}

describe("MapCard", () => {
  beforeEach(() => {
    // jsdom has no geolocation API, so getCurrentLocation resolves with a
    // null location and the map falls back to the engine's demo location,
    // clearly labelled as such.
  });

  it("shows 'Reliable local data unavailable' when no reliable external data exists", () => {
    render(
      <MapCard
        title="Competitor map"
        location="Rampur, Khairagarh"
        mapData={demoMap("5km")}
        radius="5km"
        onRadiusChange={vi.fn()}
      />,
    );
    expect(
      screen.getByText("Reliable local data unavailable"),
    ).toBeInTheDocument();
    // The fallback is clearly labelled as demo data, never presented as real.
    expect(
      screen.getByText(/clearly-labelled DEMO DATA for illustration only/i),
    ).toBeInTheDocument();
  });

  it("re-renders the competitor set when the radius toggle changes", async () => {
    const user = userEvent.setup();
    const onRadiusChange = vi.fn();
    const { rerender } = render(
      <MapCard
        title="Competitor map"
        location="Rampur, Khairagarh"
        mapData={demoMap("5km")}
        radius="5km"
        onRadiusChange={onRadiusChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "10km" }));
    expect(onRadiusChange).toHaveBeenCalledWith("10km");

    // Re-render with the 10 km competitor set and confirm the toggle reflects it.
    rerender(
      <MapCard
        title="Competitor map"
        location="Rampur, Khairagarh"
        mapData={demoMap("10km")}
        radius="10km"
        onRadiusChange={onRadiusChange}
      />,
    );
    expect(screen.getByRole("button", { name: "10km" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows the density legend", () => {
    render(
      <MapCard
        title="Competitor map"
        location="Rampur, Khairagarh"
        mapData={demoMap("5km")}
        radius="5km"
        onRadiusChange={vi.fn()}
      />,
    );
    expect(screen.getByText("Density")).toBeInTheDocument();
    for (const label of ["Dense", "Moderate", "Sparse", "Underserved"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
