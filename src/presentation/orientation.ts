/** Portrait or landscape from the viewport. The card size eases in CSS. */
export function installOrientation(): void {
  const query = window.matchMedia("(orientation: landscape)");
  const root = document.documentElement;

  const apply = () => {
    root.dataset.orientation = query.matches ? "landscape" : "portrait";
  };

  apply();
  query.addEventListener("change", apply);
}
