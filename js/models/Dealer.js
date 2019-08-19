/**
 * EZ Hold 'em - Dealer Class
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

class Dealer {
  /******************************
   *Creates an instance of Dealer.
   * @memberof Dealer
   *****************************/
  constructor() {
    this.table = new Table();
    this.players = [];
    this.deck = [];
    this.burnt = [];
    this.turn_count = 1;
    this.D_btn_indy = null;
    this.SB_btn_indy = null;
    this.BB_btn_indy = null;
    this.actions_on = null;
    this.game_mode = 'deal';
    this.hand_phase = 'hole-cards';
  }

  // Handle Turn Count
  incrementTurnCount() {
    this.turn_count = (this.turn_count === this.players.length) ? 1 : this.turn_count + 1;
  }


  // Handle hand phase
  incrementHandPhase() {
    const hand_phases = ['hole-cards', 'flop', 'turn', 'river'];
    this.hand_phase = (this.hand_phase === hand_phases[hand_phases.length - 1]) ? hand_phases[0] : hand_phases[hand_phases.indexOf(this.hand_phase) + 1];
  }


  /* Handling player buttons */
  assignBtns() {
    this.players.forEach(player => player.button = 'null');
    this.players[this.D_btn_indy].button = 'D';
    this.players[this.SB_btn_indy].button = 'SB';
    this.players[this.BB_btn_indy].button = 'BB';
  }

  initRanBtns() {
    const ranPlyrIndy = Math.floor(Math.random() * this.players.length);
    this.D_btn_indy = ranPlyrIndy;
    this.SB_btn_indy = (this.D_btn_indy === this.players.length - 1) ? 0 : this.D_btn_indy + 1;
    this.BB_btn_indy = (this.SB_btn_indy === this.players.length - 1) ? 0 : this.SB_btn_indy + 1;
    this.assignBtns();
    updateBtnsView(this.players);
  }

  incrementBtns() {
    const that = this
    this.D_btn_indy = (this.D_btn_indy === this.players.length - 1) ? 0 : this.D_btn_indy + 1;
    this.SB_btn_indy = (this.SB_btn_indy === this.players.length - 1) ? 0 : this.SB_btn_indy + 1;
    this.BB_btn_indy = (this.BB_btn_indy === this.players.length - 1) ? 0 : this.BB_btn_indy + 1;
    this.assignBtns();
    setTimeout(function(){ 
      updateBtnsView(that.players);
    }, 500);
    
  }
  /* End Section */


  /* Handle Action On */
  assignAction() {
    this.players.forEach(player => player.actions_on = false);
    this.players[this.actions_on].actions_on = true;
  }

  initAction() {
    if (this.hand_phase === 'hole-cards') {
      this.actions_on = (this.BB_btn_indy === this.players.length - 1) ? 0 : this.BB_btn_indy + 1;
    } else {
      this.actions_on = (this.D_btn_indy === this.players.length - 1) ? 0 : this.D_btn_indy + 1;
    }
    this.assignAction();
    updateActionView(this.players);
  }

  incrementAction() {
    this.actions_on = (this.actions_on === this.players.length - 1) ? 0 : this.actions_on + 1;
    this.assignAction();
    updateActionView(this.players);
  }
  /* End Section */


  /************************
   * @description Shuffler
   * @memberof Dealer
   ***********************/
  shuffle() {
    if (this.deck !== []) this.deck = [];
    const deckPrimer = [];
    const new_deck = new Deck().deck;

    /* Push numbers 0 - 51 into deckPrimer array
     * Push 52 null value placeholders into this.deck */
    for (let i = 0; i < 52; i++) {
      deckPrimer.push(i);
      this.deck.push(null);
    }
    
    /* Grab,remove and return a random index from deckPrimer */
    function randomDeckIndy() {
      const rdi = Math.floor(Math.random() * deckPrimer.length);
      const indy = deckPrimer.splice(rdi, 1);
      return indy[0];
    }

    /* Shuffle deck by replacing random null values in this.deck with Card objects */
    this.deck.forEach((card, i, arr) => {
      const indy = randomDeckIndy();
      arr[i] = new_deck[indy];
    });
  }

  cutDeck() {
    const ranCutIndy = Math.ceil(Math.random() * this.deck.length - 1);
    const halfOne = this.deck.slice(0, ranCutIndy);
    const halfTwo = this.deck.slice(ranCutIndy);
    const cutDeck = [...halfTwo, ...halfOne];
    this.deck = cutDeck;
  }
  /* End section*/


  /* Handling deal */
  dealTopCard() {
    return this.deck.pop();
  }

  burnOne() {
    this.burnt.push(this.dealTopCard());
  }

  dealHoleCards() {
    this.shuffle();
    this.cutDeck();
    this.players.forEach(player => {
      const cardOne = this.dealTopCard();
      const cardTwo = this.dealTopCard();
      player.hole_cards = [cardOne, cardTwo];
      player.hand = [cardOne, cardTwo];
    });
    updateHoleCardsView(this.players);
  }

  dealFlop() {
    this.burnOne();
    const flopCards = [this.dealTopCard(), this.dealTopCard(), this.dealTopCard()];
    flopCards.forEach(card => {
      this.table.community_cards.push(card);
      this.players.forEach(player => player.hand.push(card));
    });
    updateCommCardsView(this.table);
  }

  dealTurn() {
    this.burnOne();
    const turnCard = this.dealTopCard();
    this.table.community_cards.push(turnCard);
    this.players.forEach(player => player.hand.push(turnCard));
    updateCommCardsView(this.table);
  }

  dealRiver() {
    this.burnOne();
    const rivCard = this.dealTopCard();
    this.table.community_cards.push(rivCard);
    this.players.forEach(player => player.hand.push(rivCard));
    updateCommCardsView(this.table);
  }


  shuffleUpAndDeal() {
    if (this.hand_phase === 'hole-cards') {
      this.dealHoleCards();

    } else if (this.hand_phase === 'flop') {
      this.dealFlop();
  
    } else if (this.hand_phase === 'turn') {
      this.dealTurn();
  
    } else if (this.hand_phase === 'river') {
      this.dealRiver();
    }

    this.game_mode = 'play';
    this.handleTurn();
  }
  /* End Section */


  /* Handling turns */
  handleTurn() {
    const that = this;

    const playerHand = this.players[this.actions_on].hand;
    const playerId = this.players[this.actions_on].id;

    //this.players[this.actions_on].highCards();
    this.players[this.actions_on].pairsAndSet();

    if (playerHand.length > 4) {
      this.players[this.actions_on].checkForFlush();
      this.players[this.actions_on].checkForStraight();
    }

    // Maybe abstract comp turn out to its own function
    if (this.players[this.actions_on].plyr_type === 'comp') {

      // determine best hand
      // bet/raise, call, or fold

      const dur = (this.turn_count < this.players.length) ? 500 : 2000;
        // test what happens if I turn this into an arrow function - what will `this` do?
        setTimeout(function(){
          that.endTurn();
        }, dur);

    } else {
      const turn_button = document.querySelector('#turn_button');
      turn_button.removeAttribute('disabled');
    }

    

    //console.log(playerHand, playerId);
  }


  endTurn() {
    // if not last player - increment action, turn count and call handle turn
    if (this.turn_count < this.players.length) {
      return this.endTurnNotLastPlayer();
    }

    // if last player and river - reset comm cards, hole cards, deck, burnt, update hole and comm cards views, increment btns and call shuffleUpAndDeal
    if (this.turn_count === this.players.length && this.hand_phase === 'river') {
      return this.endTurnLastPlayerAndRiver();
    }


    // if last player - increment hand phase, init action, game mode deal, shuffle up and deal  and call shuffleUpAndDeal
    if (this.turn_count === this.players.length) {
      return this.endTurnLastPlayerAndNotRiver();
    }
  }


  endTurnNotLastPlayer() {
    this.incrementAction();
    this.incrementTurnCount();
    this.handleTurn();
  }


  endTurnLastPlayerAndRiver() {
    const that = this;

    this.players.forEach(player => {
      player.button = null;
      player.actions_on = false;
      player.hole_cards = [];
      player.hand = [];
    });

    this.table.community_cards = [];
    this.deck = [];
    this.burnt = [];
    this.incrementBtns();
    this.incrementHandPhase();
    this.initAction();
    this.game_mode = 'deal';
    this.incrementTurnCount();
    updateHoleCardsView(this.players);
    updateCommCardsView(this.table);

    setTimeout(function(){  
      that.shuffleUpAndDeal();
    }, 500);  
  }


  endTurnLastPlayerAndNotRiver() {
    this.incrementHandPhase();
    this.initAction();
    this.game_mode = 'deal';
    this.incrementTurnCount();
    this.shuffleUpAndDeal();
  }
  /* End Section */
}