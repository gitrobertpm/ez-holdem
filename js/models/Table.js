/**
 * EZ Hold 'em - Table Class
 */

"use strict";

/**
  * Creates an instance of Table
  * @param {array of Player objects} players
 **/

class Table {
  constructor(players) {
    this.players = players;
    this.community_cards = [];
    this.turn_count = 1;
    this.D_btn_indy = null;
    this.SB_btn_indy = null;
    this.BB_btn_indy = null;
    this.actions_on = null;
    this.hand_phase = 'hole-cards';
  }

  /* IncrementTurn Count */
  incrementTurnCount() {
    return this.turn_count = (this.turn_count === this.players.length) ? 1 : this.turn_count + 1;
  };

  /* Increment hand phase */
  incrementHandPhase() {
    const hand_phases = ['hole-cards', 'flop', 'turn', 'river'];
    return this.hand_phase = (this.hand_phase === hand_phases[hand_phases.length - 1]) ? hand_phases[0] : hand_phases[hand_phases.indexOf(this.hand_phase) + 1];
  };

  /* Assign player buttons */
  assignBtns() {
    this.players.forEach(player => player.button = 'null');
    this.players[this.D_btn_indy].button = 'D';
    this.players[this.SB_btn_indy].button = 'SB';
    return this.players[this.BB_btn_indy].button = 'BB';
  };

  /* Assign player buttons */
  initRanBtns() {
    const ranPlyrIndy = Math.floor(Math.random() * this.players.length);
    this.D_btn_indy = ranPlyrIndy;
    this.SB_btn_indy = (this.D_btn_indy === this.players.length - 1) ? 0 : this.D_btn_indy + 1;
    this.BB_btn_indy = (this.SB_btn_indy === this.players.length - 1) ? 0 : this.SB_btn_indy + 1;
    this.assignBtns();

    /* Update display */
    return updateBtnsView(this.players);
  };

  /* Increment player buttons */
  incrementBtns() {
    const that = this
    this.D_btn_indy = (this.D_btn_indy === this.players.length - 1) ? 0 : this.D_btn_indy + 1;
    this.SB_btn_indy = (this.SB_btn_indy === this.players.length - 1) ? 0 : this.SB_btn_indy + 1;
    this.BB_btn_indy = (this.BB_btn_indy === this.players.length - 1) ? 0 : this.BB_btn_indy + 1;
    this.assignBtns();

    /* Update display with time delay */
    return setTimeout(function(){ 
      updateBtnsView(that.players);
    }, 500);
  };

  /* Assign Action */
  assignAction() {
    this.players.forEach(player => player.actions_on = false);
    return this.players[this.actions_on].actions_on = true;
  };

  /* Init Action */
  initAction() {
    if (this.hand_phase === 'hole-cards') {
      this.actions_on = (this.BB_btn_indy === this.players.length - 1) ? 0 : this.BB_btn_indy + 1;
    } else {
      this.actions_on = (this.D_btn_indy === this.players.length - 1) ? 0 : this.D_btn_indy + 1;
    }
    this.assignAction();

    /* Update display */
    return updateActionView(this.players);
  };

  /* Update Action */
  incrementAction() {
    this.actions_on = (this.actions_on === this.players.length - 1) ? 0 : this.actions_on + 1;
    this.assignAction();

    /* Update display */
    return updateActionView(this.players);
  };
};
