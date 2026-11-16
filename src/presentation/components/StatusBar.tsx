import { useEffect, useState } from "react";
import { useTheme } from "../theme/themeContext";

export function StatusBar() {
  const { mode, toggle } = useTheme();
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => setTime(formatTime(new Date())), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const nextMode = mode === "light" ? "dark" : "light";

  return (
    <header className="status">
      <div className="status__cluster">
        <time>{time}</time>
        <StatusIcons />
      </div>
      <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${nextMode} mode`}>
        {mode === "light" ? <MoonIcon /> : <SunIcon />}
        <span>{nextMode} mode</span>
      </button>
    </header>
  );
}

function formatTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";
  return `${hour}:${minute}`;
}

function StatusIcons() {
  return (
    <span className="status__icons" aria-hidden="true">
      <svg viewBox="0 0 18 14">
        <rect x="1" y="8" width="2.2" height="5" rx="0.6" fill="currentColor" />
        <rect x="5.2" y="5.5" width="2.2" height="7.5" rx="0.6" fill="currentColor" />
        <rect x="9.4" y="3" width="2.2" height="10" rx="0.6" fill="currentColor" />
        <rect x="13.6" y="1" width="2.2" height="12" rx="0.6" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 16 14">
        <path d="M1 6.5a9 9 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M3.4 9a5.6 5.6 0 0 1 9.2 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="8" cy="11.6" r="1.1" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 24 14">
        <rect x="1" y="2" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="20.2" y="5" width="1.6" height="4" rx="0.5" fill="currentColor" />
      </svg>
    </span>
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
