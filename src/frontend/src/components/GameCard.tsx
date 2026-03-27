import { Link } from "@tanstack/react-router";
import { Star, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Game, GameCategory } from "../backend.d";

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  action: "/assets/generated/game-action.dim_400x225.png",
  puzzle: "/assets/generated/game-puzzle.dim_400x225.png",
  strategy: "/assets/generated/game-strategy.dim_400x225.png",
  retro: "/assets/generated/game-retro.dim_400x225.png",
  sports: "/assets/generated/game-sports.dim_400x225.png",
  arcade: "/assets/generated/game-arcade.dim_400x225.png",
};

const CATEGORY_COLORS: Record<string, string> = {
  action: "oklch(0.65 0.22 25)",
  puzzle: "oklch(0.65 0.18 265)",
  strategy: "oklch(0.65 0.20 165)",
  retro: "oklch(0.75 0.22 305)",
  sports: "oklch(0.65 0.20 140)",
  arcade: "oklch(0.75 0.18 200)",
};

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const cat = String(game.category).toLowerCase();
  const catColor = CATEGORY_COLORS[cat] ?? "oklch(0.75 0.22 305)";
  const fallbackImg =
    CATEGORY_FALLBACK_IMAGES[cat] ?? CATEGORY_FALLBACK_IMAGES.arcade;
  const imgSrc = game.thumbnailUrl || fallbackImg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-game flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={imgSrc}
          alt={game.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // If image fails to load, show black background
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          className="absolute top-2 right-2 text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: "oklch(0.11 0.018 265 / 80%)",
            color: catColor,
            border: `1px solid ${catColor}40`,
          }}
        >
          {cat}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3
          className="font-black uppercase text-sm leading-tight mb-2 line-clamp-1"
          style={{ color: "oklch(0.96 0.005 265)", letterSpacing: "0.02em" }}
        >
          {game.title}
        </h3>

        {/* Rating + players */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3 h-3 ${
                  s <= Math.round(game.rating) ? "fill-current" : ""
                }`}
                style={{
                  color:
                    s <= Math.round(game.rating)
                      ? "oklch(0.82 0.17 85)"
                      : "oklch(0.30 0.02 265)",
                }}
              />
            ))}
            <span
              className="text-xs font-bold ml-1"
              style={{ color: "oklch(0.82 0.17 85)" }}
            >
              {game.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Users
              className="w-3 h-3"
              style={{ color: "oklch(0.68 0.02 265)" }}
            />
            <span className="text-xs" style={{ color: "oklch(0.68 0.02 265)" }}>
              {Number(game.playerCount).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Play button */}
        <Link
          to="/games/$id"
          params={{ id: String(game.id) }}
          className="mt-auto"
        >
          <button
            type="button"
            className="btn-purple w-full text-center"
            style={{ borderRadius: "0.5rem" }}
            data-ocid="game.primary_button"
          >
            PLAY NOW
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
