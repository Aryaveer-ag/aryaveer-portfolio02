import React from "react";
import Link from "next/link";

export type TextLinkVariant = "default" | "underline" | "arrow" | "muted";

export interface TextLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: TextLinkVariant;
  isExternal?: boolean;
  children: React.ReactNode;
}

export function TextLink({
  href,
  variant = "default",
  isExternal = false,
  className = "",
  children,
  ...props
}: TextLinkProps) {
  const variantClasses: Record<TextLinkVariant, string> = {
    default:
      "text-[var(--text-primary)] hover:text-white transition-colors duration-150 inline-flex items-center gap-1 font-medium",
    underline:
      "text-[var(--text-primary)] underline decoration-[var(--border-strong)] hover:decoration-white underline-offset-4 transition-colors duration-150 inline-flex items-center gap-1",
    arrow:
      "text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 inline-flex items-center gap-1 group font-medium",
    muted:
      "text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-150 inline-flex items-center gap-1 text-xs",
  };

  const baseClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] rounded-[var(--radius-sm)]";

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const renderArrow = () => {
    if (variant === "arrow" || isExternal) {
      return (
        <svg
          aria-hidden="true"
          className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M17 7H7M17 7V17"
          />
        </svg>
      );
    }
    return null;
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        {...props}
      >
        <span>{children}</span>
        {renderArrow()}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} {...props}>
      <span>{children}</span>
      {renderArrow()}
    </Link>
  );
}

