#!/usr/bin/env python3
"""Replace purple accent with orange + deeper black background."""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def transform_styles(path):
    with open(path, "r", encoding="utf-8") as f:
        css = f.read()

    # ── Root variable changes ──
    css = css.replace("--accent: #a855f7;", "--accent: #f97316;")
    css = css.replace(
        "--card-border: rgba(168, 85, 247, 0.12);",
        "--card-border: rgba(249, 115, 22, 0.12);"
    )
    css = css.replace(
        "--glow-purple: 0 0 40px rgba(168, 85, 247, 0.25);",
        "--glow-orange: 0 0 40px rgba(249, 115, 22, 0.25);"
    )
    css = css.replace("--sand: #0a0a1a;", "--sand: #050508;")
    css = css.replace("--sky: #0f0f2a;", "--sky: #0a0a0f;")
    css = css.replace(
        "--card: rgba(20, 20, 50, 0.55);",
        "--card: rgba(18, 18, 22, 0.55);"
    )
    css = css.replace(
        "--card-hover: rgba(20, 20, 50, 0.75);",
        "--card-hover: rgba(18, 18, 22, 0.75);"
    )

    # ── Replace all var(--glow-purple) → var(--glow-orange) ──
    css = css.replace("var(--glow-purple)", "var(--glow-orange)")

    # ── Replace all rgba(168, 85, 247, X) → rgba(249, 115, 22, X) ──
    css = re.sub(r"rgba\(168,\s*85,\s*247", "rgba(249, 115, 22", css)

    # ── Replace hardcoded hex values ──
    css = css.replace("#7c3aed", "#c2410c")
    css = css.replace("#a855f7", "#f97316")
    css = css.replace("#6366f1", "#ea580c")

    # ── Shot gradients ──
    css = css.replace("#2a1a4e", "#1a0a02")

    # ── Header background ──
    css = css.replace(
        "background: rgba(15, 15, 42, 0.82);",
        "background: rgba(8, 8, 12, 0.88);"
    )

    # ── Notice overlay background ──
    css = css.replace(
        "background: rgba(10, 10, 26, 0.7);",
        "background: rgba(5, 5, 8, 0.8);"
    )

    # ── Body background ──
    css = css.replace(
        "background: var(--sand);",
        "background: #050508;"
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(css)
    print(f"Transformed {os.path.basename(path)}")


def transform_dark_mode(path):
    with open(path, "r", encoding="utf-8") as f:
        css = f.read()

    # ── Root variable changes for light mode ──
    css = css.replace("--accent: #7c3aed;", "--accent: #ea580c;")
    css = css.replace(
        "--glow-purple: 0 12px 40px rgba(124, 58, 237, 0.10);",
        "--glow-orange: 0 12px 40px rgba(234, 88, 12, 0.10);"
    )
    css = css.replace("var(--glow-purple)", "var(--glow-orange)")

    # ── Replace all rgba(124, 58, 237, X) → rgba(234, 88, 12, X) ──
    css = re.sub(r"rgba\(124,\s*58,\s*237", "rgba(234, 88, 12", css)

    # ── Replace hardcoded hex values ──
    css = css.replace("#7c3aed", "#ea580c")
    css = css.replace("#6366f1", "#c2410c")

    # ── Fix any light-mode specific bg references ──
    css = css.replace("--sand: #f8f7f4;", "--sand: #fafaf9;")

    with open(path, "w", encoding="utf-8") as f:
        f.write(css)
    print(f"Transformed {os.path.basename(path)}")


if __name__ == "__main__":
    transform_styles(os.path.join(ROOT, "css", "styles.css"))
    transform_dark_mode(os.path.join(ROOT, "css", "dark-mode.css"))
    print("Done. Color scheme changed to orange + black.")
