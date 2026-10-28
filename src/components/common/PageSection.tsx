import React from "react";

export interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  spacing?: "compact" | "normal" | "spacious";
  divided?: boolean;
  children: React.ReactNode;
}

export function PageSection({
  id,
  spacing = "normal",
  divided = false,
  className = "",
  children,
  ...props
}: PageSectionProps) {
  const spacingClasses = {
    compact: "py-10 md:py-14",
    normal: "py-16 md:py-24",
    spacious: "py-24 md:py-32",
  }[spacing];

  const dividerClasses = divided
    ? "border-t border-[var(--border-subtle)]"
    : "";

  return (
    <section
      id={id}
      className={`relative ${spacingClasses} ${dividerClasses} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

