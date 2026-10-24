import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <path
        d="M34 11C30 7 21 7 16 12C11 17 12 23 20 25L28 27C36 29 37 35 32 40C27 45 18 45 14 41"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="35" r="3" className="fill-lume" />
    </svg>
  );
}

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Sonder Labz home"
      className={cn(
        "inline-flex items-center gap-2.5 text-ink dark:text-white transition-opacity hover:opacity-90",
        className
      )}
    >
      <LogoMark />
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-ink dark:text-white">
          Sonder Labz
        </span>
      )}
    </Link>
  );
}
