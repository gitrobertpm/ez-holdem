/**
 * EZ Hold 'em - Viewe
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

const selectors = {
  card_class: '.card',
  player_class: '.player',
  btn_class: '.player_btn',
  hole_card_cont_class: '.hole_card_container', 
  comm_cards_cont_id: '#community_cards_container'
}

/* set suit ASCII code */
const suit_codes = {
  hearts: '&#9829;',
  spades: '&#9824;',
  diamonds: '&#9830;',
  clubs: '&#9827;'
}


function updateActionView(players) {
  const players_view = document.querySelectorAll(`.player`);

  [...players_view].forEach((val, indy) => {
    (players[indy].actions_on) ? val.classList.add('actions_on') : val.classList.remove('actions_on');
  });
}


function updateBtnsView(players) {
  const btns_view = document.querySelectorAll(`.player_btn`);

  [...btns_view].forEach((val, indy) => {
    if (!['D', 'BB', 'SB'].includes(players[indy].button)) {
      val.style.display = 'none';
    } else {
      val.style.display = '';
      val.innerHTML = players[indy].button
      if (players[indy].button === 'D') {
        val.style.background = 'black';
      } else if (players[indy].button === 'SB') {
        val.style.background = 'rgba(0, 150, 250, 1)';
      } else if (players[indy].button === 'BB') {
        val.style.background = 'rgba(0, 0, 150, 1)';
      }
    }
  });
}


function updateHoleCardsView(players) {
  const hole_cards_cont_view = document.querySelectorAll(`.hole_cards_container`);

  [...hole_cards_cont_view].forEach((val, indy) => {
    if (players[indy].hole_cards.length === 0) {
      val.children[0].style.display = 'none';
      val.children[1].style.display = 'none';
    } else {
      val.children[0].style.display = '';
      val.children[1].style.display = '';
      val.children[0].innerHTML = `${players[indy].hole_cards[0].num} ${players[indy].hole_cards[0].suit_code}`;
      val.children[1].innerHTML = `${players[indy].hole_cards[1].num} ${players[indy].hole_cards[1].suit_code}`;
      (players[indy].hole_cards[0].color === 'black') ? val.children[0].style.color = 'black' : val.children[0].style.color = 'red';  
      (players[indy].hole_cards[1].color === 'black') ? val.children[1].style.color = 'black': val.children[1].style.color = 'red';
    }  
  });
}


function updateCommCardsView(table) {
  const comm_cards_cont_view = document.querySelector(`#community_cards_container`);

  [...comm_cards_cont_view.children].forEach((val, indy) => {
    if (indy < table.community_cards.length) {
      val.style.display = '';
      val.innerHTML = `${table.community_cards[indy].num} ${table.community_cards[indy].suit_code}`;
      (table.community_cards[indy].color === 'black') ? val.style.color = 'black' : val.style.color = 'red'; 
    } else {
      val.style.display = 'none';
    }
  });
}


function updatePlayers(players) {
  const players_view = document.querySelectorAll(`.player`);

  [...players_view].forEach((val, indy) => {
    console.log(val);
  });
  console.log(players_view);
  console.log(players);
}

// function updateView(players) {
//   updateActionView(players);
//   updateBtnsView(players);
//   updateHoleCardsView(players);
//   updateCommCardsView(table)

// };

// function updateCardView(players) {
  
// }




// const html = {
//   //card: `<span class="${this.selector.card_class}"></span>`,
//   //  style="color: ${this.color}"   ${this.num} ${this.suite_code}  
//   btn: {
//     D: `<span class="player_btn D_btn">D</span>`,
//     SB: `<span class="player_btn SB_btn">SB</span>`,
//     BB: `<span class="player_btn BB_btn">BB</span>`
//   }
// }
//this.suite_code = suit_codes[this.suit];

/* set card HTML: span element with interpolated values for color, number, suit code */
//this.className = 'card';
//const html = `<span class="${this.className}" style="color: ${this.color}">${this.num} ${this.suite_code}</span>`;



