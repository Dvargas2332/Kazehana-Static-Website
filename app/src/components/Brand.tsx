import { cn } from "@/lib/utils";

export function Brand({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <a
      href="#inicio"
      className={cn("brand", inverted && "brand--inverted", className)}
      aria-label="Kaze Hana Cloud, volver al inicio"
    >
      <img className="brand__mark" src="/brand/kazehana-cloud.svg" alt="" aria-hidden="true" />
      <span className="brand__type">
        <strong>Kaze Hana</strong>
        <small>Cloud · Suite</small>
      </span>
    </a>
  );
}
