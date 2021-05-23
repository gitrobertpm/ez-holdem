/**
 * EZ Hold 'em - Updating displays
 */

"use strict";

// const selectors = {
//   card_class: '.card',
//   player_class: '.player',
//   btn_class: '.player_btn',
//   hole_card_cont_class: '.hole_card_container', 
//   comm_cards_cont_id: '#community_cards_container'
// }

// /* set suit ASCII code */
// const suit_codes = {
//   hearts: '&#9829;',
//   spades: '&#9824;',
//   diamonds: '&#9830;',
//   clubs: '&#9827;'
// }


/**
  * Update overlays
  * @param {string} game_mode
 **/
const updateOverlays = (game_mode, winner) => { //console.log(game_mode, winner);
  const start_overlay = document.querySelector('.start_overlay');
  const winner_overlay = document.querySelector('.winner_overlay');

  if (game_mode === 'winner') {
    winner_overlay.style.display = 'block';
    if (winner.length === 1) {
      winner_overlay.querySelector('h1').innerHTML = `Player ${winner[0].id} won with a ${winner[0].best_hand.name}!`;
    } else {
      const winners = winner.map(player => player.id).join(', ');
      winner_overlay.querySelector('h1').innerHTML = `Players ${winners} won with a ${winner[0].best_hand.name}!`;
    }
    
    return winner_overlay.style.opacity = '1';
  }

  if (game_mode === 'end') {
    start_overlay.style.display = 'block';
    return start_overlay.style.opacity = '1';
  }
};

/**
  * Update actions
  * @param {array} players
 **/
const updateActionView = players => {
  const players_view = document.querySelectorAll(`.player`);

  return [...players_view].forEach((val, indy) => {
    (players[indy].actions_on) ? val.classList.add('actions_on') : val.classList.remove('actions_on');
  });
};

/**
  * Update buttons
  * @param {array} players
 **/
const updateBtnsView = players => {
  const btns_view = document.querySelectorAll(`.player_btn`);

  return [...btns_view].forEach((val, indy) => {
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
};

/**
  * Update hole cards
  * @param {array} players
 **/
const updateHoleCardsView = players => {
  const hole_cards_cont_view = document.querySelectorAll(`.hole_cards_container`);

  return [...hole_cards_cont_view].forEach((val, indy) => {
    if (players[indy].hole_cards.length === 0) {
      val.children[0].style.display = 'none';
      val.children[1].style.display = 'none';
    } else {
      val.children[0].style.display = '';
      val.children[1].style.display = '';
      val.children[0].innerHTML = `<span class="card-num">${players[indy].hole_cards[0].num}</span> <span class="card-suit">${players[indy].hole_cards[0].suit_code}</span>`;
      val.children[1].innerHTML = `<span class="card-num">${players[indy].hole_cards[1].num}</span> <span class="card-suit">${players[indy].hole_cards[1].suit_code}</span>`;
      (players[indy].hole_cards[0].color === 'black') ? val.children[0].style.color = 'black' : val.children[0].style.color = 'red';  
      (players[indy].hole_cards[1].color === 'black') ? val.children[1].style.color = 'black': val.children[1].style.color = 'red';
    }  
  });
};

/**
  * Update community cards
  * @param {object} table
 **/
const updateCommCardsView = table => {
  const comm_cards_cont_view = document.querySelector(`#community_cards_container`);

  return [...comm_cards_cont_view.children].forEach((val, indy) => {
    if (indy < table.community_cards.length) {
      val.style.display = '';
      val.innerHTML = `<span class="card-num">${table.community_cards[indy].num}</span> <span class="card-suit">${table.community_cards[indy].suit_code}</span>`;
      (table.community_cards[indy].color === 'black') ? val.style.color = 'black' : val.style.color = 'red'; 
    } else {
      val.style.display = 'none';
    }
  });
};

/**
  * Update players
  * @param {array} players
 **/
const updatePlayers = players => {
  const players_view = document.querySelectorAll(`.player`);

  [...players_view].forEach((val, indy) => {
    console.log(val);
  });
  console.log(players_view);
  console.log(players);
};
