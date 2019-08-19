/**
 * EZ Hold 'em - Game Class
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

class Game {
  constructor() {
    this.dealer = new Dealer();
  }

  // Game order of events
  // join a game or create a game
    // if create - private with just comp players or public allowing other humans to join
      // create table, add players, start and init game
    // else find table with comp player and replace como player with user


  // Start and init game
    // shuffle up and deal, set game to play and call play();


  init() {
    this.dealer.initRanBtns();
    this.dealer.initAction();
    updateHoleCardsView(this.dealer.players);
    updateCommCardsView(this.dealer.table);
  }


  addPlayers(playerCount) {
    const players = [];
    for (let i = 0, j = playerCount; i < j; i++) {
      const player = new Player(i+1);
      player.plyr_type = i === 0 ? 'human' : 'comp';
      player.id = i+1;
      players.push(player);
    }
    this.dealer.players = players;
  }

}


