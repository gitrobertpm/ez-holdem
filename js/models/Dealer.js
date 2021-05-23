/**
 * EZ Hold 'em - Dealer Class
 */

"use strict";

/**
  * Creates an instance of Dealer
  * @param {array of Player objects} players
  * @param {Table object} table
 **/
class Dealer {
  constructor(players, table) {
    this.table = table;
    this.players = players;
    this.deck = [];
    this.burnt = [];
  }

/* Shuffle deck*/
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
    const randomDeckIndy = () => {
      const rdi = Math.floor(Math.random() * deckPrimer.length);
      const indy = deckPrimer.splice(rdi, 1);
      return indy[0];
    };

    /* Shuffle deck by replacing random null values in this.deck with Card objects */
    return this.deck.forEach((card, i, arr) => {
      const indy = randomDeckIndy();
      arr[i] = new_deck[indy];
    });
  };

  /* Cut the deck at a random midpoint*/
  cutDeck() {
    const ranCutIndy = Math.ceil(Math.random() * this.deck.length - 1);
    const halfOne = this.deck.slice(0, ranCutIndy);
    const halfTwo = this.deck.slice(ranCutIndy);
    const cutDeck = [...halfTwo, ...halfOne];
    return this.deck = cutDeck;
  };

  /* Deal top card */
  dealTopCard() {
    return this.deck.pop();
  };

  /* Burn top Ccard */
  burnOne() {
    return this.burnt.push(this.dealTopCard());
  };

  /* Shuffle, cut and deal hole cards - No burn card when dealing hole cards */
  dealHoleCards() {
    this.shuffle();
    this.cutDeck();
    this.players.forEach(player => {
      const cardOne = this.dealTopCard();
      const cardTwo = this.dealTopCard();
      player.hole_cards = [cardOne, cardTwo];
      player.hand = [cardOne, cardTwo];
    });

    /* Update display */
    return updateHoleCardsView(this.players);
  };

  /* Burn one and deal flop */
  dealFlop() {
    this.burnOne();
    const flopCards = [this.dealTopCard(), this.dealTopCard(), this.dealTopCard()];
    flopCards.forEach(card => {
      this.table.community_cards.push(card);
      this.players.forEach(player => player.hand.push(card));
    });

    /* Update display */
    return updateCommCardsView(this.table);
  };

  /* Burn one and deal turn card */
  dealTurn() {
    this.burnOne();
    const turnCard = this.dealTopCard();
    this.table.community_cards.push(turnCard);
    this.players.forEach(player => player.hand.push(turnCard));

    /* Update display */
    return updateCommCardsView(this.table);
  };

  /* Burn one and deal river card */
  dealRiver() {
    this.burnOne();
    const rivCard = this.dealTopCard();
    this.table.community_cards.push(rivCard);
    this.players.forEach(player => player.hand.push(rivCard));

    /* Update display */
    return updateCommCardsView(this.table);
  };

  /* Dealer action */
  shuffleUpAndDeal() {
    if (this.table.hand_phase === 'hole-cards') {
      return this.dealHoleCards();

    } else if (this.table.hand_phase === 'flop') {
      return this.dealFlop();
  
    } else if (this.table.hand_phase === 'turn') {
      return this.dealTurn();
  
    } else if (this.table.hand_phase === 'river') {
      return this.dealRiver();
    }
  };
};
