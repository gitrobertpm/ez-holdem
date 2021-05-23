/**
 * EZ Hold 'em - Controller
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019 and again in 2021
 */

"use strict";

/* Main variables */
const card_el_DOM_collection = document.querySelectorAll('.card');
const players_DOM_collection = document.querySelectorAll('.player');
const community_cards_DOM_collection = document.querySelector('#community_cards_container');
const start_overlay = document.querySelector('.start_overlay');
const winner_overlay = document.querySelector('.winner_overlay');

const start_button = document.querySelector('#start_button');
const deal_button = document.querySelector('#deal_button');
const turn_button = document.querySelector('#turn_button');
const next_hand_button = document.querySelector('#next_hand_button');

/* Disable turn button by default */
turn_button.setAttribute('disabled', true);

/* Declare game variable*/
let game = null;

/* Start btn click handler - Define and initialize new game */
start_button.addEventListener('click', e => {
  e.preventDefault();
  game = new Game(8);
  game.init();
  start_overlay.style.opacity = 0;
  return setTimeout(() => {
    start_overlay.style.display = 'none';
  }, 600);
});

/* Deal btn click handler - Disable deal btn and deal */
deal_button.addEventListener('click', e => {
  e.preventDefault();
  deal_button.setAttribute('disabled', true);
  return game.deal();
  
});

/* Turn btn click handler - Disable turn btn and end user turn */
turn_button.addEventListener('click', e => {
  e.preventDefault();
  turn_button.setAttribute('disabled', true);
  return game.endTurn();
});

/* Next hand btn click handler - Enable deal btn and kick off next hand */
next_hand_button.addEventListener('click', e => {
  e.preventDefault();
  deal_button.removeAttribute('disabled');
  game.game_mode = 'deal';
  winner_overlay.style.opacity = 0;
  return setTimeout(() => {
    winner_overlay.style.display = 'none';
    game.resetHand();
  }, 600);
});
