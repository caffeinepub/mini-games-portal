import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import { useGameById } from "../hooks/useQueries";

// Fallback game data for demo
const FALLBACK_GAME = {
  id: BigInt(1),
  title: "NEON RUNNER",
  category: "arcade",
  description:
    "Sprint through a neon-lit cityscape in this fast-paced endless runner. Dodge obstacles, collect power-ups, and beat your high score.",
  thumbnailUrl: "",
  iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
  rating: 4.7,
  playerCount: BigInt(125000),
  featured: true,
};

function hoverColor(el: HTMLElement, color: string) {
  el.style.color = color;
}

export default function GamePlayerPage() {
  const { id } = useParams({ from: "/games/$id" });
  const navigate = useNavigate();
  const gameId = id ? BigInt(id) : null;
  const { data: game, isLoading } = useGameById(gameId);

  const displayGame = game ?? (isLoading ? null : FALLBACK_GAME);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div
        className="sticky top-16 z-40 border-b"
        style={{
          backgroundColor: "oklch(0.12 0.02 265 / 95%)",
          borderColor: "oklch(0.22 0.03 265)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors"
            style={{ color: "oklch(0.68 0.02 265)" }}
            onMouseEnter={(e) =>
              hoverColor(e.currentTarget, "oklch(0.75 0.22 305)")
            }
            onMouseLeave={(e) =>
              hoverColor(e.currentTarget, "oklch(0.68 0.02 265)")
            }
            data-ocid="player.button"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK
          </button>

          <div
            className="h-5 w-px mx-2"
            style={{ backgroundColor: "oklch(0.22 0.03 265)" }}
          />

          {displayGame && (
            <>
              <div
                className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "oklch(0.64 0.245 305 / 20%)",
                  color: "oklch(0.75 0.22 305)",
                  border: "1px solid oklch(0.64 0.245 305 / 40%)",
                }}
              >
                {String(displayGame.category).toUpperCase()}
              </div>
              <h1
                className="font-black uppercase tracking-wide text-sm"
                style={{ color: "oklch(0.96 0.005 265)" }}
              >
                {displayGame.title}
              </h1>

              <div className="flex items-center gap-4 ml-auto">
                <div className="hidden sm:flex items-center gap-1">
                  <Star
                    className="w-3.5 h-3.5 fill-current"
                    style={{ color: "oklch(0.82 0.17 85)" }}
                  />
                  <span
                    className="text-xs font-bold"
                    style={{ color: "oklch(0.82 0.17 85)" }}
                  >
                    {displayGame.rating.toFixed(1)}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Users
                    className="w-3.5 h-3.5"
                    style={{ color: "oklch(0.68 0.02 265)" }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.68 0.02 265)" }}
                  >
                    {Number(displayGame.playerCount).toLocaleString()}
                  </span>
                </div>
                <a
                  href={displayGame.iframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold uppercase transition-colors"
                  style={{ color: "oklch(0.68 0.02 265)" }}
                  onMouseEnter={(e) =>
                    hoverColor(e.currentTarget, "oklch(0.75 0.22 305)")
                  }
                  onMouseLeave={(e) =>
                    hoverColor(e.currentTarget, "oklch(0.68 0.02 265)")
                  }
                >
                  <ExternalLink className="w-3 h-3" /> OPEN
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Iframe area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-4"
        style={{ minHeight: "calc(100vh - 8rem)" }}
      >
        {isLoading ? (
          <div
            className="w-full h-full min-h-96 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "oklch(0.14 0.022 265)",
              border: "1px solid oklch(0.22 0.03 265)",
            }}
            data-ocid="player.loading_state"
          >
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
                style={{ borderColor: "oklch(0.64 0.245 305)" }}
              />
              <p
                className="text-sm font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.68 0.02 265)" }}
              >
                Loading Game...
              </p>
            </div>
          </div>
        ) : displayGame ? (
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: "1px solid oklch(0.64 0.245 305 / 40%)",
              boxShadow: "0 0 40px oklch(0.55 0.28 305 / 20%)",
              height: "calc(100vh - 9rem)",
            }}
          >
            <iframe
              src={displayGame.iframeUrl}
              title={displayGame.title}
              className="w-full h-full"
              allowFullScreen
              style={{ border: "none" }}
              data-ocid="player.canvas_target"
            />
          </div>
        ) : (
          <div
            className="w-full rounded-xl flex items-center justify-center"
            style={{
              height: "calc(100vh - 9rem)",
              backgroundColor: "oklch(0.14 0.022 265)",
              border: "1px solid oklch(0.22 0.03 265)",
            }}
            data-ocid="player.error_state"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3
                className="text-xl font-black uppercase tracking-wide mb-2"
                style={{ color: "oklch(0.96 0.005 265)" }}
              >
                GAME NOT FOUND
              </h3>
              <p style={{ color: "oklch(0.68 0.02 265)" }}>
                This game may have been removed.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Game info bar */}
      {displayGame && (
        <div
          className="border-t px-4 sm:px-6 py-4"
          style={{
            backgroundColor: "oklch(0.12 0.02 265)",
            borderColor: "oklch(0.22 0.03 265)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.68 0.02 265)" }}
            >
              {displayGame.description}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
