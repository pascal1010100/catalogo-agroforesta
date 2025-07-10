"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-green-700 text-white hover:bg-green-800 shadow-md",
  secondary:
    "bg-white text-green-800 hover:bg-green-100 border border-green-700 shadow",
  outline:
    "border border-green-700 text-green-700 hover:bg-green-50 dark:border-green-300 dark:text-green-300 dark:hover:bg-green-900/30",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-full",
  md: "px-5 py-2 text-base rounded-full",
  lg: "px-6 py-3 text-lg rounded-full",
  icon: "p-2 rounded-full",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode | React.ReactElement;
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      asChild = false,
      iconLeft: IconLeft,
      iconRight: IconRight,
      className = "",
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center gap-2 font-semibold transition-all duration-150 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const classes = [
      base,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {IconLeft && <IconLeft className="w-4 h-4 mr-1" />}
        {children}
        {IconRight && <IconRight className="w-4 h-4 ml-1" />}
      </>
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement;
      return React.cloneElement(child, {
        ...props,
        className: [classes, child.props.className].filter(Boolean).join(" "),
        // ⚠️ No pasamos `ref` aquí porque TypeScript lo restringe
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
export { Button };
