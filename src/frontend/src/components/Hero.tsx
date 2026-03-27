import { Link } from "@tanstack/react-router";
import { Star, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Game } from "../backend.d";

interface HeroProps {
  featuredGame?: Game | null;
}

export default function Hero({ featuredGame }: HeroProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div
        className="rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.022 265) 0%, oklch(0.16 0.04 285) 100%)",
          border: "1px solid oklch(0.22 0.03 265)",
          boxShadow: "0 8px 48px oklch(0.55 0.28 305 / 15%)",
        }}
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{
              backgroundColor: "oklch(0.64 0.245 305 / 20%)",
              color: "oklch(0.75 0.22 305)",
              border: "1px solid oklch(0.64 0.245 305 / 40%)",
            }}
          >
            🎮 Featured Game Portal
          </div>
          <h1
            className="text-4xl md:text-5xl font-black uppercase leading-tight mb-4"
            style={{ color: "oklch(0.96 0.005 265)", letterSpacing: "-0.02em" }}
          >
            LEVEL UP YOUR <span className="text-gradient-purple">GAMING.</span>
          </h1>
          <p
            className="text-base mb-8 leading-relaxed"
            style={{ color: "oklch(0.68 0.02 265)" }}
          >
            Discover &amp; Play Hundreds of Free Mini-Games. From action-packed
            adventures to mind-bending puzzles — all in your browser.
          </p>
          <Link to="/">
            <button
              type="button"
              className="btn-purple text-sm px-8 py-3"
              data-ocid="hero.primary_button"
            >
              BROWSE GAMES
            </button>
          </Link>
        </motion.div>

        {/* Right: Featured game art */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div
            className="relative rounded-xl overflow-hidden"
            style={{ border: "1px solid oklch(0.64 0.245 305 / 40%)" }}
          >
            <img
              src="/assets/generated/hero-game-art.dim_600x400.jpg"
              alt="Featured game art"
              className="w-full h-56 md:h-72 object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.14 0.022 265) 0%, transparent 50%)",
              }}
            />
            {featuredGame && (
              <div className="absolute bottom-4 left-4 right-4">
                <p
                  className="text-xs uppercase tracking-widest font-bold mb-1"
                  style={{ color: "oklch(0.75 0.22 305)" }}
                >
                  {String(featuredGame.category)}
                </p>
                <h3
                  className="text-lg font-black uppercase"
                  style={{ color: "oklch(0.96 0.005 265)" }}
                >
                  {featuredGame.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <Star
                      className="w-3 h-3 fill-current"
                      style={{ color: "oklch(0.82 0.17 85)" }}
                    />
                    <span
                      className="text-xs font-bold"
                      style={{ color: "oklch(0.82 0.17 85)" }}
                    >
                      {featuredGame.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users
                      className="w-3 h-3"
                      style={{ color: "oklch(0.68 0.02 265)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.68 0.02 265)" }}
                    >
                      {Number(featuredGame.playerCount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Glow effect */}
          <div
            className="absolute -inset-2 rounded-2xl -z-10 blur-2xl opacity-30"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.28 305), oklch(0.70 0.15 200))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
