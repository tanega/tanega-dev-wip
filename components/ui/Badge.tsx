import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "warm" | "cool" | "muted";
type Variant = BadgeVariant;

const variantClasses: Record<Variant, string> = {
  default: "bg-accent/10 text-accent border-accent/20",
  warm:    "bg-accent-warm/10 text-accent-warm border-accent-warm/20",
  cool:    "bg-accent-cool/10 text-accent-cool border-accent-cool/20",
  muted:   "bg-elevated text-muted border-border",
};

type BadgeProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export default function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
