/**
 * EZ Hold 'em - Game DOM
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";


const game_dom = {
  table: `<div id="table" class="table">   
            <h1>EZ Hold 'em</h1>
            <div id="community_cards_container" class="community_cards_container"></div>
          </div>`,
  player: `<div id="player_1" class="player player_1">
            <div class="player_inner_wrapper">
                <p>One</p>
                <span class="hole_card_container"></span>
            </div>
          </div>`,
  card: `<span class="card">A &#9824;</span>`,
  button: `<span class="player_btn">X</span>` 
}


/*{

      <div id="player_1" class="player player_1">
        <div class="player_inner_wrapper">
            <p>One</p>
            <span class="hole_card_container">
              <span class="card">A &#9824;</span>
              <span class="card">A &#9824;</span>
            </span>
        </div>
        <span class="player_btn">X</span>
      </div>

      <div id="player_2" class="player player_2">
        <div class="player_inner_wrapper">
            <p>Two</p>
            <span class="hole_card_container">
              <span class="card">A &#9824;</span>
              <span class="card">A &#9824;</span>
            </span>
        </div>
        <span class="player_btn">X</span>
      </div>

      <div id="player_3" class="player player_3">
        <div class="player_inner_wrapper">
            <p>Three</p>
            <span class="hole_card_container">
              <span class="card">A &#9824;</span>
              <span class="card">A &#9824;</span>
            </span>
        </div>
        <span class="player_btn">X</span>
      </div>

      <div id="player_4" class="player player_4">
        <div class="player_inner_wrapper">
            <p>Four</p>
            <span class="hole_card_container">
              <span class="card">A &#9824;</span>
              <span class="card">A &#9824;</span>
            </span>
        </div>
        <span class="player_btn">X</span>
      </div>

      <div id="player_5" class="player player_5">
        <div class="player_inner_wrapper">
            <p>Five</p>
            <span class="hole_card_container">
              <span class="card">A &#9824;</span>
              <span class="card">A &#9824;</span>
            </span>
        </div>
        <span class="player_btn">X</span>
      </div>

      <div id="player_6" class="player player_6">
        <div class="player_inner_wrapper">
            <p>Six</p>
            <span class="hole_card_container">
              <span class="card">A &#9824;</span>
              <span class="card">A &#9824;</span>
            </span>
        </div>
        <span class="player_btn">X</span>
      </div>

      <div id="player_7" class="player player_7">
        <div class="player_inner_wrapper">
            <p>Seven</p>
            <span class="hole_card_container">
              <span class="card">A &#9824;</span>
              <span class="card">A &#9824;</span>
            </span>
        </div>
        <span class="player_btn">X</span>
      </div>

      <div id="player_8" class="player player_8">
        <div class="player_inner_wrapper">
            <p>Eight</p>
            <span class="hole_card_container">
              <span class="card">A &#9824;</span>
              <span class="card">A &#9824;</span>
            </span>
        </div>
        <span class="player_btn">X</span>
      </div>

      <form id="player_control" class="player_control">
        <input type="button" id="deal_button" class="deal_button player_control_button" value="Deal">
        <input type="button" id="check_button" class="check_button player_control_button" value="Check">
      </form> }*/