import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

actor {
  type GameCategory = {
    #action;
    #puzzle;
    #strategy;
    #retro;
    #sports;
    #arcade;
  };

  type Game = {
    id : Nat;
    title : Text;
    description : Text;
    category : GameCategory;
    iframeUrl : Text;
    thumbnailUrl : Text;
    rating : Float;
    playerCount : Nat;
    featured : Bool;
  };

  module Game {
    public func compare(game1 : Game, game2 : Game) : Order.Order {
      Nat.compare(game1.id, game2.id);
    };
  };

  let games = Map.empty<Nat, Game>();

  func initializeSampleGames() {
    let sampleGames : [(Nat, Game)] = [
      (
        1,
        {
          id = 1;
          title = "Super Platformer";
          description = "Jump and run through challenging levels in this classic platformer!";
          category = #action;
          iframeUrl = "https://itch.io/embed-upload/12345?color=333333";
          thumbnailUrl = "https://game-host.com/thumbnails/super_platformer.png";
          rating = 4.5;
          playerCount = 1200;
          featured = true;
        },
      ),
      (
        2,
        {
          id = 2;
          title = "Puzzle Master";
          description = "Test your brain with this addictive puzzle game!";
          category = #puzzle;
          iframeUrl = "https://itch.io/embed-upload/67890?color=333333";
          thumbnailUrl = "https://game-host.com/thumbnails/puzzle_master.png";
          rating = 4.1;
          playerCount = 850;
          featured = false;
        },
      ),
      (
        3,
        {
          id = 3;
          title = "Retro Racer";
          description = "Race against the clock in this fast-paced retro racing game!";
          category = #retro;
          iframeUrl = "https://html5games.com/retro-racer";
          thumbnailUrl = "https://game-host.com/thumbnails/retro_racer.png";
          rating = 4.3;
          playerCount = 950;
          featured = true;
        },
      ),
      (
        4,
        {
          id = 4;
          title = "Arcade Shooter";
          description = "Blast your way through waves of enemies in this classic arcade shooter!";
          category = #arcade;
          iframeUrl = "https://html5games.com/arcade-shooter";
          thumbnailUrl = "https://game-host.com/thumbnails/arcade_shooter.png";
          rating = 4.2;
          playerCount = 1100;
          featured = false;
        },
      ),
      (
        5,
        {
          id = 5;
          title = "Soccer Challenge";
          description = "Score goals and beat your high score in this fun soccer game!";
          category = #sports;
          iframeUrl = "https://html5games.com/soccer-challenge";
          thumbnailUrl = "https://game-host.com/thumbnails/soccer_challenge.png";
          rating = 3.8;
          playerCount = 720;
          featured = false;
        },
      ),
      (
        6,
        {
          id = 6;
          title = "Chess Champion";
          description = "Play chess against the computer or a friend!";
          category = #strategy;
          iframeUrl = "https://html5games.com/chess-champion";
          thumbnailUrl = "https://game-host.com/thumbnails/chess_champion.png";
          rating = 4.7;
          playerCount = 1300;
          featured = true;
        },
      ),
      (
        7,
        {
          id = 7;
          title = "Block Breaker";
          description = "Break all the blocks and set a new high score!";
          category = #arcade;
          iframeUrl = "https://itch.io/embed-upload/54321?color=333333";
          thumbnailUrl = "https://game-host.com/thumbnails/block_breaker.png";
          rating = 3.9;
          playerCount = 645;
          featured = false;
        },
      ),
      (
        8,
        {
          id = 8;
          title = "Memory Match";
          description = "Test your memory with this classic matching game!";
          category = #puzzle;
          iframeUrl = "https://html5games.com/memory-match";
          thumbnailUrl = "https://game-host.com/thumbnails/memory_match.png";
          rating = 4.0;
          playerCount = 700;
          featured = false;
        },
      ),
      (
        9,
        {
          id = 9;
          title = "Tank Wars";
          description = "Battle against enemy tanks in this action-packed game!";
          category = #action;
          iframeUrl = "https://itch.io/embed-upload/98765?color=333333";
          thumbnailUrl = "https://game-host.com/thumbnails/tank_wars.png";
          rating = 4.4;
          playerCount = 980;
          featured = true;
        },
      ),
      (
        10,
        {
          id = 10;
          title = "Tetris Mania";
          description = "Enjoy this classic puzzle game with a fresh twist!";
          category = #puzzle;
          iframeUrl = "https://html5games.com/tetris-mania";
          thumbnailUrl = "https://game-host.com/thumbnails/tetris_mania.png";
          rating = 4.6;
          playerCount = 1250;
          featured = true;
        },
      ),
    ];

    for ((id, game) in sampleGames.values()) {
      games.add(id, game);
    };
  };

  initializeSampleGames();

  public query ({ caller = _ }) func getAllGames() : async [Game] {
    games.values().toArray().sort();
  };

  public query ({ caller = _ }) func getGamesByCategory(category : GameCategory) : async [Game] {
    let filteredGames = List.empty<Game>();
    for (game in games.values()) {
      if (game.category == category) {
        filteredGames.add(game);
      };
    };
    filteredGames.sort().toArray();
  };

  public query ({ caller = _ }) func searchGames(searchTerm : Text) : async [Game] {
    let lowerSearchTerm = searchTerm.toLower();
    let matchingGames = List.empty<Game>();
    for (game in games.values()) {
      let lowerTitle = game.title.toLower();
      if (lowerTitle.contains(#text lowerSearchTerm)) {
        matchingGames.add(game);
      };
    };
    matchingGames.sort().toArray();
  };

  public query ({ caller = _ }) func getFeaturedGames() : async [Game] {
    let featuredGames = List.empty<Game>();
    for (game in games.values()) {
      if (game.featured) {
        featuredGames.add(game);
      };
    };
    featuredGames.sort().toArray();
  };

  public query ({ caller = _ }) func getGameById(id : Nat) : async Game {
    switch (games.get(id)) {
      case (null) { Runtime.trap("Game with id " # id.toText() # " does not exist.") };
      case (?game) { game };
    };
  };
};
