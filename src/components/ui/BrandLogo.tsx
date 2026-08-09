import Link from "next/link";
import { Car } from "lucide-react";

type BrandLogoProps = {
  href?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md";
};

export default function BrandLogo({ href = "/", variant = "light", size = "md" }: BrandLogoProps) {
  const isDark = variant === "dark";
  const iconBox = size === "sm" ? "w-9 h-9" : "w-10 h-10 sm:w-11 sm:h-11";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const titleSize = size === "sm" ? "text-lg" : "text-xl sm:text-2xl";

  const content = (
    <span className="inline-flex items-center gap-2.5 group">
      <span
        className={`${iconBox} relative flex-shrink-0 rounded-xl bg-gradient-to-br from-brand to-brand-dark shadow-md shadow-brand/25 flex items-center justify-center ring-2 ring-gold/80`}
      >
        <Car className={`${iconSize} text-white`} strokeWidth={2.25} />
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gold border-2 border-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`${titleSize} font-display font-bold tracking-wide uppercase`}>
          <span className={isDark ? "text-white" : "text-navy"}>Hasnain</span>{" "}
          <span className="text-brand">Auto</span>
        </span>
        <span
          className={`mt-1 text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] uppercase ${
            isDark ? "text-gold" : "text-grey-text"
          }`}
        >
          Decoration Accessories
        </span>
      </span>
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} className="flex-shrink-0 hover:opacity-95 transition-opacity" aria-label="Hasnain Auto home">
      {content}
    </Link>
  );
}
