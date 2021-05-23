/**
 * EZ Hold 'em - Game Class
 */

"use strict";

/**
  * Creates an instance of Game
  * @param {number} playerCount
 **/

class Game {
  constructor(playerCount) {
    this.players = this.addPlayers(playerCount);
    this.table = new Table(this.players);
    this.dealer = new Dealer(this.players, this.table);
    this.game_mode = 'deal';
    this.hand_winner = '',
    this.table_winner = ''
  }


  /* Initialize game */
  init() {
    this.table.initRanBtns();
    this.table.initAction();

    /* Update display */
    updateHoleCardsView(this.players);
    return updateCommCardsView(this.table);
  };

  /* Add players to game */
  addPlayers(playerCount) {
    const players = [];
    for (let i = 0, j = playerCount; i < j; i++) {
      const player = new Player(i+1);
      player.plyr_type = i === 0 ? 'human' : 'comp';
      player.id = i+1;
      if (player.plyr_type === 'comp') {
        player.skill = Math.floor(Math.random * 5);
        player.risky = Math.floor(Math.random * 5) - player.skill;
        if (player.risky < 0) {
          player.risky = 0;
        }
      }
      players.push(player);
    }

    return players;
  };

  /* Deal cards */
  deal() {
    this.dealer.shuffleUpAndDeal();
    this.game_mode = 'play';
    this.players.forEach(player => getAndSetBestHand(player));
    return this.handleTurn();
  };


  /* Handling turns */
  handleTurn() {
    const that = this;


    // TESTING EVALUATOR
    // const playerHand = this.players[this.table.actions_on].hand;
    // const playerId = this.players[this.table.actions_on].id;

    // //this.players[this.actions_on].highCards();
    // this.players[this.table.actions_on].pairsAndSet();

    // if (playerHand.length > 4) {
    //   this.players[this.table.actions_on].checkForFlush();
    //   this.players[this.table.actions_on].checkForStraight();
    // }
    // END TESTING EVALUATOR



    // Maybe abstract comp turn out to its own function
    if (this.players[this.table.actions_on].plyr_type === 'comp') {

      // determine best hand
      // bet/raise, call, or fold

      const dur = (this.table.turn_count < this.players.length) ? 500 : 2000;
      // test what happens if I turn this into an arrow function - what will `this` do?
      return setTimeout(function() {
        that.endTurn();
      }, dur);

    } else {
      const turn_button = document.querySelector('#turn_button');
      return turn_button.removeAttribute('disabled');
    }
  };

  /* End player turn */
  endTurn() {
    /* If not last player - increment action, turn count and call handle turn */
    if (this.table.turn_count < this.players.length) {
      return this.endTurnNotLastPlayer();
    }

    /* If last player and river - reset hand and deal */
    if (this.table.turn_count === this.players.length && this.table.hand_phase === 'river') {
      return this.endTurnLastPlayerAndRiver();
    }

    /* If last player - increment hand and deal */
    if (this.table.turn_count === this.players.length) {
      return this.endTurnLastPlayerAndNotRiver();
    }
  }

  /* End turn for players who aren't the final player in a hand */
  endTurnNotLastPlayer() {
    this.table.incrementAction();
    this.table.incrementTurnCount();

    /* Update display */
    return this.handleTurn();
  }

  /* End turn for players who are the final player in a hand on the river */
  endTurnLastPlayerAndNotRiver() {
    this.table.incrementHandPhase();
    this.table.initAction();
    this.game_mode = 'deal';
    this.table.incrementTurnCount();
    return this.deal();
  }

  /* End turn for players who are the final player in a hand, but not on the river  */
  endTurnLastPlayerAndRiver() { console.log('end last turn river');
    const that = this;

    
    this.game_mode = 'winner';
    getAndSetWinner(that);

    /* Update display with delay */
    return setTimeout(function(){  
      updateOverlays(that.game_mode, that.hand_winner);
    }, 500);  
  }

  /* Reset hand */
  resetHand() {
    this.players.forEach(player => {
      player.button = null;
      player.actions_on = false;
      player.hole_cards = [];
      player.hand = [];
      player.best_hand = {};
    });

    this.table.community_cards = [];
    this.dealer.deck = [];
    this.dealer.burnt = [];
    this.hand_winner = [];
    this.table.incrementBtns();
    this.table.incrementHandPhase();
    this.table.initAction();
    this.table.incrementTurnCount();

    /* Update display */
    updateHoleCardsView(this.players);
    return updateCommCardsView(this.table);
  }
}
