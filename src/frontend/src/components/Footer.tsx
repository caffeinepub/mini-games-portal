import { Link } from "@tanstack/react-router";
import { Github, Twitter, Youtube } from "lucide-react";
import { SiDiscord } from "react-icons/si";

function hoverColor(el: HTMLElement, color: string) {
  el.style.color = color;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "oklch(0.12 0.02 265)",
        borderColor: "oklch(0.22 0.03 265)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Logo + copyright */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/siva-games-logo-transparent.dim_400x120.png"
                alt="SIVA GAMES"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "oklch(0.68 0.02 265)" }}
            >
              Your ultimate destination for free browser mini-games. Play
              instantly, no downloads required.
            </p>
            <p className="text-xs" style={{ color: "oklch(0.50 0.02 265)" }}>
              © {year}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "oklch(0.64 0.245 305)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>

          {/* Col 2: Social */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.96 0.005 265)" }}
            >
              FOLLOW US
            </h4>
            <div className="flex gap-3">
              {[
                { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                { icon: <Github className="w-4 h-4" />, label: "GitHub" },
                { icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
                { icon: <SiDiscord className="w-4 h-4" />, label: "Discord" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: "oklch(0.18 0.025 265)",
                    border: "1px solid oklch(0.22 0.03 265)",
                    color: "oklch(0.68 0.02 265)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "oklch(0.75 0.22 305)";
                    e.currentTarget.style.borderColor =
                      "oklch(0.64 0.245 305 / 50%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "oklch(0.68 0.02 265)";
                    e.currentTarget.style.borderColor = "oklch(0.22 0.03 265)";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Quick links */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.96 0.005 265)" }}
            >
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/" as const, label: "All Games" },
                { to: "/" as const, label: "Action Games" },
                { to: "/" as const, label: "Puzzle Games" },
                { to: "/" as const, label: "Retro Classics" },
                { to: "/" as const, label: "Arcade Games" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition-colors"
                    style={{ color: "oklch(0.68 0.02 265)" }}
                    onMouseEnter={(e) =>
                      hoverColor(e.currentTarget, "oklch(0.75 0.22 305)")
                    }
                    onMouseLeave={(e) =>
                      hoverColor(e.currentTarget, "oklch(0.68 0.02 265)")
                    }
                    data-ocid="footer.link"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
