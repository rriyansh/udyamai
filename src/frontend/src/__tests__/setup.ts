import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// The generated components use data-ocid rather than data-testid.
configure({ testIdAttribute: "data-ocid" });

// The @caffeineai/object-storage package ships a broken ESM build: its
// dist/index.js imports "./blob" (extensionless) which Node cannot resolve in
// the jsdom test environment, so any module that pulls in the generated
// backend wrapper (api-client -> backend -> object-storage) crashes at import
// time. The production Vite build resolves the package through its
// "@caffeine/source" export condition instead, so this only affects tests.
// The wrapper only uses ExternalBlob as a type for upload/download helpers that
// are never invoked in tests, so a stub class is sufficient.
vi.mock("@caffeineai/object-storage", () => ({
  ExternalBlob: class ExternalBlob {},
  StorageClient: class StorageClient {},
}));

// @caffeineai/core-infrastructure has the same broken-ESM-build problem (its
// dist/index.js imports "./config" extensionless). api-client uses its useActor
// hook to obtain the backend actor. In tests the backend is never available, so
// the hook must report no actor and not fetching, which routes every operation
// through the clearly-labelled DEMO DATA fallback path.
vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: null, isFetching: false }),
}));

// jsdom does not implement matchMedia. ThemeProvider and LandingPage both call
// it during render, so provide a minimal controllable stub.
const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

beforeEach(() => {
  window.matchMedia = matchMediaMock;
  // Reset persisted stores between tests so onboarding/settings state does not
  // leak across cases.
  window.localStorage.clear();
});

// motion's `whileInView` and recharts' ResponsiveContainer rely on browser
// APIs jsdom does not implement. Provide minimal stubs so those components
// render without crashing.
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds = [];
}
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

beforeEach(() => {
  globalThis.IntersectionObserver = IntersectionObserverMock;
  globalThis.ResizeObserver = ResizeObserverMock;
});

afterEach(() => {
  cleanup();
});
