import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const categories = [
  "Action",
  "Puzzle",
  "Strategy",
  "Retro",
  "Sports",
  "Arcade",
];

export default function Navbar({ onSearch, searchQuery = "" }: NavbarProps) {
  const [catOpen, setCatOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: "oklch(0.11 0.018 265 / 92%)",
        borderColor: "oklch(0.22 0.03 265)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center shrink-0"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/siva-games-logo-transparent.dim_400x120.png"
            alt="SIVA GAMES"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "oklch(0.68 0.02 265)" }}
          />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full text-sm font-medium outline-none focus:ring-2 focus:ring-primary/50"
            style={{
              backgroundColor: "oklch(0.18 0.025 265)",
              border: "1px solid oklch(0.28 0.03 265)",
              color: "oklch(0.96 0.005 265)",
              fontSize: "0.85rem",
            }}
            data-ocid="nav.search_input"
          />
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link" data-ocid="nav.link">
            EXPLORE
          </Link>

          <div className="relative">
            <button
              type="button"
              className="nav-link flex items-center gap-1"
              onClick={() => setCatOpen((v) => !v)}
              data-ocid="nav.dropdown_menu"
            >
              CATEGORIES <ChevronDown className="w-3 h-3" />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 rounded-xl border py-2 min-w-40"
                  style={{
                    backgroundColor: "oklch(0.16 0.025 265)",
                    borderColor: "oklch(0.22 0.03 265)",
                  }}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className="w-full text-left px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors"
                      style={{ color: "oklch(0.68 0.02 265)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "oklch(0.96 0.005 265)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "oklch(0.68 0.02 265)";
                      }}
                      onClick={() => {
                        setCatOpen(false);
                        navigate({
                          to: "/",
                          search: { category: cat.toLowerCase() },
                        });
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/" className="nav-link" data-ocid="nav.link">
            COMMUNITY
          </Link>
        </nav>

        {/* Login btn */}
        <button
          type="button"
          className="btn-purple ml-auto shrink-0"
          data-ocid="nav.button"
        >
          LOG IN
        </button>
      </div>
    </header>
  );
}
