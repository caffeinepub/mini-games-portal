import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Game {
    id: bigint;
    title: string;
    featured: boolean;
    thumbnailUrl: string;
    playerCount: bigint;
    description: string;
    iframeUrl: string;
    category: GameCategory;
    rating: number;
}
export enum GameCategory {
    action = "action",
    strategy = "strategy",
    puzzle = "puzzle",
    arcade = "arcade",
    sports = "sports",
    retro = "retro"
}
export interface backendInterface {
    getAllGames(): Promise<Array<Game>>;
    getFeaturedGames(): Promise<Array<Game>>;
    getGameById(id: bigint): Promise<Game>;
    getGamesByCategory(category: GameCategory): Promise<Array<Game>>;
    searchGames(searchTerm: string): Promise<Array<Game>>;
}
