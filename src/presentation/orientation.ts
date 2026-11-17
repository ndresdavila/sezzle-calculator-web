/** Switches the calculator between portrait and landscape with a short morph. */
export function installOrientation(): void {
  const query = window.matchMedia("(orientation: landscape)");
  const root = document.documentElement;

  const orientation = () => (query.matches ? "landscape" : "portrait");
  root.dataset.orientation = orientation();

  query.addEventListener("change", () => {
    const next = orientation();
    if (root.dataset.orientation === next) {
      return;
    }
    const commit = () => {
      root.dataset.orientation = next;
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && typeof document.startViewTransition === "function") {
      document.startViewTransition(commit);
      return;
    }
    commit();
  });
}
