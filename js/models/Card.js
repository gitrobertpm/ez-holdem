/**
 * EZ Hold 'em - Card Class
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

class Card {
  /**
   *Creates an instance of Card.
   * @param {*} num
   * @param {*} suit
   * @memberof Card
   */
  constructor(num, suit) {
    this.num = num;
    this.suit = suit;

    /* set card color */
    this.color = (this.suit === 'hearts' || this.suit === 'diamonds') ? 'red' : 'black';
    
    /* set suit ASCII code */
    const suit_codes = {
      hearts: '&#9829;',
      spades: '&#9824;',
      diamonds: '&#9830;',
      clubs: '&#9827;'
    }
    this.suit_code = suit_codes[this.suit];
    
    /* set card value */
    const face_card_vals = {
      J: 11,
      Q: 12,
      K: 13,
      A: 14
    }
    this.val = (typeof this.num === 'number') ? this.num : face_card_vals[this.num];
  }
}