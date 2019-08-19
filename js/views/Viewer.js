/**
 * EZ Hold 'em - Viewer Class
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

class Viewer {
  constructor() {
    this.markup = new Markup();

    //this.card_el_DOM_cellection = document.querySelectorAll('.card');
    //this.players_DOM_collection = document.querySelectorAll('.player');
    // this.hole_cards_container_el_selector = '.hole_card_container';
    //this.community_cards_DOM_collection = document.querySelector('#community_cards_container');
    // this.player_btn_selector = '.player_btn';

    // this.btn_html = {
    //   D: `<span class="player_btn D_btn">D</span>`,
    //   SB: `<span class="player_btn SB_btn">SB</span>`,
    //   BB: `<span class="player_btn BB_btn">BB</span>`
    // }
  }

  addPlayersToDisply() {}


  /* Displaying cards */
  addCardToDisplay(card, parent) {
    const el= document.createRange().createContextualFragment(card.html).querySelector(`.${card.className}`);
    parent.append(el);
  }

  addHoleCardsToDisplay(player) {
    this.players.forEach(player => {
      const player_el = document.querySelector(`#player_${player.id} ${this.hole_cards_container_el_selector }`);
      this.addCardToDisplay(player.hole_cards[0], player_el);
      this.addCardToDisplay(player.hole_cards[1], player_el);
    });
  }

  addFlopToDisplay() {
    // const tabel_el = document.querySelector('#community_cards_container');
    this.addCardToDisplay(this.table.community_cards[0], this.community_cards_DOM_collection);
    this.addCardToDisplay(this.table.community_cards[1], this.community_cards_DOM_collection);
    this.addCardToDisplay(this.table.community_cards[2], this.community_cards_DOM_collection);
  }

  addTurnToDisplay() {
    // const tabel_el = document.querySelector('#community_cards_container');
    this.addCardToDisplay(this.table.community_cards[3], this.community_cards_DOM_collection);
  }

  addRiverToDisplay() {
    // const tabel_el = document.querySelector('#community_cards_container');
    this.addCardToDisplay(this.table.community_cards[4], this.community_cards_DOM_collection);
  }

  collectCards() {
    const cards = document.querySelectorAll(`.card`);
    [...cards].forEach(card => card.parentElement.removeChild(card));
  }
  /* End sections */


  /* Displaying buttons */
  addBtnToDisplay(btn_html, selector, parent) {
    console.log(this.markup);
    const el= document.createRange().createContextualFragment(btn_html).querySelector(selector);
    parent.append(el);
  }

  addButtonsToDisplay(btn_html, selector, parent) {
    //const players = document.querySelectorAll('.player');

    this.addBtnToDisplay(btn_html, selector, parent);
    this.addBtnToDisplay(btn_html, selector, parent);
    this.addBtnToDisplay(btn_html, selector, parent);

    // this.addBtnToDisplay(this.dealer.btn_html.D, this.players_DOM_collection[this.dealer.next_D_btn_indy]);
    // this.addBtnToDisplay(this.dealer.btn_html.SB, this.players_DOM_collection[this.dealer.next_SB_btn_indy]);
    // this.addBtnToDisplay(this.dealer.btn_html.BB, this.players_DOM_collection[this.dealer.next_BB_btn_indy]);
    // players[this.dealer.actions_on].classList.add('actions_on');
  }

  collectButtons() {
    //const buttons = document.querySelectorAll('.player_btn');
    console.log(document.querySelectorAll('.player_btn'))
    //[...this.player_btn_DOM_collection].forEach(button => button.parentElement.removeChild(button));

    
  }

  addActionToDisplay() {
    this.players_DOM_collection[this.dealer.actions_on].classList.add('actions_on');
  }

  revokeAction() {
    [...this.players_DOM_collection].forEach(player => player.classList.remove('actions_on'));
  }
}