"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export function SiteHeader({ items }: { readonly items: readonly NavigationItem[] }) {
  const [hidden, setHidden] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    let previous = window.scrollY;
    const updateVisibility = () => {
      const current = window.scrollY;
      setHidden(current > previous && current > 80);
      previous = current;
    };
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setClock(new Intl.DateTimeFormat("en-SG", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date()));
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme ?? "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("mambo-theme", next);
  }

  const [brand, ...navigation] = items;

  return (
    <header className={`site-header${hidden ? " site-header--hidden" : ""}`}>
      <div className="site-header__inner">
        <button className="site-brand" onClick={toggleTheme} type="button">
          {brand?.label ?? "KOHKOHNUT"}
        </button>
        <nav className="site-navigation" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={`${item.href}-${item.label}`}>{item.label}</Link>
          ))}
        </nav>
        <time className="site-clock" suppressHydrationWarning>{clock}</time>
      </div>
    </header>
  );
}
