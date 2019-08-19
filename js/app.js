/**
 * EZ Hold 'em - Controller
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

const card_el_DOM_collection = document.querySelectorAll('.card');
const players_DOM_collection = document.querySelectorAll('.player');
const community_cards_DOM_collection = document.querySelector('#community_cards_container');

const deal_button = document.querySelector('#deal_button');
const turn_button = document.querySelector('#turn_button');

turn_button.setAttribute('disabled', true);

const game = new Game();
game.addPlayers(8);
game.init();


deal_button.addEventListener('click', (e) => {
  e.preventDefault();
  game.dealer.shuffleUpAndDeal();
  deal_button.setAttribute('disabled', true);
});


turn_button.addEventListener('click', (e) => {
  e.preventDefault();
  turn_button.setAttribute('disabled', true);

  // Maybe abstract player turn out to its own function in Dealer.js and call it here
  // determine best hand
  // bet/raise, call, or fold
  game.dealer.endTurn();
});