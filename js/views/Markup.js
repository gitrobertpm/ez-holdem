/**
 * EZ Hold 'em - Markup Class
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

class Markup {
  constructor() {

    this.selector = {
      card_class: '.card',
      player_class: '.player',
      btn_class: '.player_btn',
      hole_card_cont_class: '.hole_card_container', 
      comm_cards_cont_id: '#community_cards_container'
    }

    // this.dom_el {
    //   card_el_coll: 
    // }

    this.card_el_DOM_cellection = document.querySelectorAll('.card');
    this.players_DOM_collection = document.querySelectorAll('.player');
    this.hole_cards_container_el_selector = '.hole_card_container';
    this.community_cards_DOM_collection = document.querySelector('#community_cards_container');
    this.player_btn_selector = '.player_btn';

    this.html = {
      card: `<span class="${this.selector.card_class}"></span>`,
      //  style="color: ${this.color}"   ${this.num} ${this.suite_code}  
      btn: {
        D: `<span class="player_btn D_btn">D</span>`,
        SB: `<span class="player_btn SB_btn">SB</span>`,
        BB: `<span class="player_btn BB_btn">BB</span>`
      }
    }

    /* set suit ASCII code */
    this.suit_codes = {
      hearts: '&#9829;',
      spades: '&#9824;',
      diamonds: '&#9830;',
      clubs: '&#9827;'
    }
    //this.suite_code = suit_codes[this.suit];

    /* set card HTML: span element with interpolated values for color, number, suit code */
    //this.className = 'card';
    this.html = `<span class="${this.className}" style="color: ${this.color}">${this.num} ${this.suite_code}</span>`; 
  }

  getDomEl(selector) {
    return document.querySelector(selector);
  }

  getDomColl(selector) {
    return document.querySelectorAll(selector);
  }

//  const html = {
//    card: {
//      className: 'card',
//      html: `<span class="${this.className}" style="color: ${this.color}">${this.num} ${this.suite_code}</span>`
//    },
//    button: {},
//    player: {},
//   table: {}
//  }
}