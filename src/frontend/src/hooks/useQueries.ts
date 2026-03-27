import { useQuery } from "@tanstack/react-query";
import type { Game, GameCategory } from "../backend.d";
import { useActor } from "./useActor";

export function useAllGames() {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGames();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGamesByCategory(category: GameCategory) {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGamesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchGames(query: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games", "search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.searchGames(query);
    },
    enabled: !!actor && !isFetching && query.trim().length > 0,
  });
}

export function useFeaturedGames() {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedGames();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGameById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Game>({
    queryKey: ["game", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error("No actor or id");
      return actor.getGameById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}
