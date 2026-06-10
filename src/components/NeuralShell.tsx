import { ReactNode } from "react";
import { NeuralBackground } from "./NeuralBackground";

type Props = {
  children: ReactNode;
  /** Optional eyebrow above the title (e.g. "Painel") */
  eyebrow?: string;
  /** Main title — rendered in Orbitron uppercase */
  title: string;
  /** Cyan-highlighted second word of the title (optional) */
  titleAccent?: string;
  /** Subtitle below the title (magenta small caps) */
  subtitle?: string;
  /** Right-aligned header action (e.g. Sair button) */
  headerRight?: ReactNode;
  /** Max-width of the content column */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "5xl";
};

const widthClass: Record<NonNullable<Props["maxWidth"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "5xl": "max-w-5xl",
};

export function NeuralShell({
  children,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  headerRight,
  maxWidth = "2xl",
}: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralBackground />
      <div className="neural-content min-h-screen flex flex-col">
        <header className="px-4 sm:px-8 pt-8 pb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://github.com/waconverse/assets-synapsea/blob/main/logo1.png?raw=true"
              alt="Synapsea"
              className="h-12 w-auto neon-logo-pulse"
            />
            <div>
              {eyebrow && (
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-glow-magenta">
                  {eyebrow}
                </p>
              )}
              <h1 className="font-orbitron text-2xl sm:text-3xl font-black tracking-widest italic uppercase text-white text-glow-cyan">
                {title}
                {titleAccent && <span className="text-[hsl(185,100%,50%)]"> {titleAccent}</span>}
              </h1>
              {subtitle && (
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-glow-magenta mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </header>

        <main className={`flex-1 px-4 sm:px-8 pb-12 w-full mx-auto ${widthClass[maxWidth]}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
