/**
 * EZ Hold 'em - Player Class
 */

"use strict";

/**
  * Creates an instance of Player
  * @param {number} num
 **/

class Player {
  constructor(id) {
    this.id = id;
    this.plyr_type = null;
    this.name = null;
    this.avatar = null;
    this.actions_on = false;
    this.hand_position = null;
    this.button = null;
    this.chips = [];
    this.hole_cards = [];
    this.hand = [];
    this.best_hand = {};
    this.risky = null;
    this.skill = null;
  }
};
