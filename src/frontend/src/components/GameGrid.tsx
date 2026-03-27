import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { Game } from "../backend.d";
import GameCard from "./GameCard";

const PAGE_SIZE = 6;
const SKELETON_IDS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

interface GameGridProps {
  games: Game[];
  isLoading?: boolean;
}

export default function GameGrid({ games, isLoading }: GameGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = games.slice(0, visibleCount);
  const hasMore = visibleCount < games.length;

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        data-ocid="games.loading_state"
      >
        {SKELETON_IDS.map((skId) => (
          <div
            key={skId}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "oklch(0.14 0.022 265)" }}
          >
            <Skeleton className="aspect-video w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="text-center py-20" data-ocid="games.empty_state">
        <div className="text-6xl mb-4">🎮</div>
        <h3
          className="text-xl font-black uppercase tracking-wide mb-2"
          style={{ color: "oklch(0.96 0.005 265)" }}
        >
          NO GAMES FOUND
        </h3>
        <p style={{ color: "oklch(0.68 0.02 265)" }}>
          Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        data-ocid="games.list"
      >
        {visible.map((game, i) => (
          <div key={String(game.id)} data-ocid={`games.item.${i + 1}`}>
            <GameCard game={game} index={i} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            type="button"
            className="btn-purple px-10 py-3"
            style={{ borderRadius: "0.5rem" }}
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            data-ocid="games.secondary_button"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
}
