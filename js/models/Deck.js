/**
 * EZ Hold 'em - Deck Class
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

class Deck {
  /**
   *Creates an instance of Deck.
   * @memberof Deck
   */
  constructor() {
    this.deck = this.createDeck();
  }

  /**
   * @description - Loop over suits and cards arrs
   *                to create unshuffled deck of 52
   *                Card objecs
   * @returns 
   * @memberof Deck
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
  }
}