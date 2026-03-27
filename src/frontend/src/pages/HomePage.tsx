import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { GameCategory } from "../backend.d";
import CategoryFilter from "../components/CategoryFilter";
import GameGrid from "../components/GameGrid";
import Hero from "../components/Hero";
import { useAllGames, useFeaturedGames } from "../hooks/useQueries";

// Fallback games for first load
const FALLBACK_GAMES = [
  {
    id: BigInt(1),
    title: "NEON RUNNER",
    category: "arcade" as GameCategory,
    description: "Sprint through a neon-lit cityscape.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.7,
    playerCount: BigInt(125000),
    featured: true,
  },
  {
    id: BigInt(2),
    title: "BLOCK BREAKER ULTRA",
    category: "action" as GameCategory,
    description: "Classic breakout with power-ups.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.5,
    playerCount: BigInt(87000),
    featured: false,
  },
  {
    id: BigInt(3),
    title: "MIND MAZE",
    category: "puzzle" as GameCategory,
    description: "Solve intricate puzzle chambers.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.8,
    playerCount: BigInt(64000),
    featured: false,
  },
  {
    id: BigInt(4),
    title: "SPACE CONQUEROR",
    category: "strategy" as GameCategory,
    description: "Build your galactic empire.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.3,
    playerCount: BigInt(43000),
    featured: false,
  },
  {
    id: BigInt(5),
    title: "PIXEL RACER",
    category: "retro" as GameCategory,
    description: "8-bit racing at its finest.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.6,
    playerCount: BigInt(98000),
    featured: false,
  },
  {
    id: BigInt(6),
    title: "SOCCER SHOWDOWN",
    category: "sports" as GameCategory,
    description: "Fast-paced 1v1 soccer action.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.4,
    playerCount: BigInt(55000),
    featured: false,
  },
  {
    id: BigInt(7),
    title: "CYBER INVADERS",
    category: "arcade" as GameCategory,
    description: "Classic space shooter reinvented.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.5,
    playerCount: BigInt(72000),
    featured: false,
  },
  {
    id: BigInt(8),
    title: "DUNGEON TACTICIAN",
    category: "strategy" as GameCategory,
    description: "Command your dungeon heroes.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.2,
    playerCount: BigInt(31000),
    featured: false,
  },
  {
    id: BigInt(9),
    title: "GRAVITY FLIP",
    category: "puzzle" as GameCategory,
    description: "Flip gravity to solve levels.",
    thumbnailUrl: "",
    iframeUrl: "https://scratch.mit.edu/projects/embed/10128407/",
    rating: 4.9,
    playerCount: BigInt(110000),
    featured: false,
  },
];

interface HomePageProps {
  searchQuery: string;
}

export default function HomePage({ searchQuery }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: allGames, isLoading } = useAllGames();
  const { data: featuredGames } = useFeaturedGames();

  const games = allGames && allGames.length > 0 ? allGames : FALLBACK_GAMES;
  const featuredGame =
    featuredGames && featuredGames.length > 0
      ? featuredGames[0]
      : FALLBACK_GAMES[0];

  const filteredGames = useMemo(() => {
    let result = games;
    if (activeCategory && activeCategory !== "all") {
      result = result.filter(
        (g) =>
          String(g.category).toLowerCase() === activeCategory.toLowerCase(),
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [games, activeCategory, searchQuery]);

  return (
    <main>
      <Hero featuredGame={featuredGame} />

      {/* Featured Games section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16" id="games">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-black uppercase tracking-widest"
              style={{
                color: "oklch(0.96 0.005 265)",
                letterSpacing: "0.12em",
              }}
            >
              FEATURED GAMES
            </h2>
            <div
              className="h-px flex-1 ml-6"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.64 0.245 305 / 50%), transparent)",
              }}
            />
          </div>

          {/* Category filters */}
          <div className="mb-8">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Game grid */}
          <GameGrid games={filteredGames} isLoading={isLoading} />
        </motion.div>
      </section>
    </main>
  );
}
