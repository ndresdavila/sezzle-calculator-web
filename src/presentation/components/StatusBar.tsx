import { useTheme } from "../theme/themeContext";

export function StatusBar() {
  const { mode, toggle } = useTheme();
  const nextMode = mode === "light" ? "dark" : "light";

  return (
    <header className="status">
      <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${nextMode} mode`}>
        {mode === "light" ? <MoonIcon /> : <SunIcon />}
        <span>{nextMode} mode</span>
      </button>
    </header>
  );
}

function MoonIcon() {
  return (
    <svg className="icon icon--small" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16 3.2A8.2 8.2 0 1 0 20.8 14 6.4 6.4 0 0 1 16 3.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="icon icon--small" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3.2v2.2M12 18.6v2.2M3.2 12h2.2M18.6 12h2.2M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
