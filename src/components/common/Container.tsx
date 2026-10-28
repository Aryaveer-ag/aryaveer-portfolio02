import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
  children: React.ReactNode;
}

export function Container({
  size = "lg",
  className = "",
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    full: "max-w-full",
  }[size];

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

