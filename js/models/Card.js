/**
 * EZ Hold 'em - Card Class
 */

"use strict";

/**
  *Creates an instance of Card
  * @param {number or string} num
  * @param {string} suit
  * @memberof Card
 **/

class Card {
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
};
