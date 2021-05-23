/**
 * EZ Hold 'em - Deck Class
 */

"use strict";

/**
  * Creates an instance of Deck
 **/

class Deck {
  constructor() {
    this.deck = this.createDeck();
  }

  /**
   * @description - Loop over arrays of suits and cards to create new deck of 52 Card objects
   * @returns - Array card objects 
   */
  createDeck() {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    const deck = [];

    suits.forEach((suit, i, ary) => {
      cards.forEach((card, j) => {       
        deck.push(new Card(card, suit));
      });
    });

    return deck;
  };
};
