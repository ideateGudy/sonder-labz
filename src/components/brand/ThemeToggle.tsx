"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "size-10 rounded-[var(--radius-sm)] border border-border bg-white/50 dark:bg-white/5",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={cn("relative inline-block", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
        className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-white/60 text-foreground transition-colors hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10"
      >
        {theme === "dark" ? (
          <Moon className="size-4 text-foreground" />
        ) : theme === "light" ? (
          <Sun className="size-4 text-foreground" />
        ) : (
          <Laptop className="size-4 text-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 w-36 rounded-[var(--radius-sm)] border border-border bg-popover p-1.5 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setIsOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
              theme === "light"
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground hover:bg-muted"
            )}
          >
            <Sun className="size-4" />
            <span>Light</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setIsOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
              theme === "dark"
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground hover:bg-muted"
            )}
          >
            <Moon className="size-4" />
            <span>Dark</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme("system");
              setIsOpen(false);
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
              theme === "system"
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground hover:bg-muted"
            )}
          >
            <Laptop className="size-4" />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
}
