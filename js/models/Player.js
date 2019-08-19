/**
 * EZ Hold 'em - Player Class
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";

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
    this.best_hand = [];
  }

  // testHandChecker() {
  //   getHighCard(this.hand);
  //   getAllHighCards(this.hand);
  // }

  highCards() {
    const highCard = getHighCard(this.hand);
    const allHighCards = getAllHighCards(this.hand);
    console.log(highCard, allHighCards);
  }

  pairsAndSet() {
    const pair = getTopPair(this.hand);
    console.log(pair);
  }


  checkForStraight() {
    
    

    if (haveStraight(this.hand)) {
      console.log("Player " + this.id + " has a STRAIGHT!");
    }
    
    return true;
  }


  checkForFlush() {
    if (haveFlush(this.hand)) {
      console.log("Player " + this.id + " has a FLUSH!");
      return true;
    }
  }

  
  // determining the best five of seven card hand - hole cards + comm cards
  // check if hand contains a "winning hand"

  // best hand
  // add hole cards and comm cards
  // if less then five all cards equal hand
  // if more than five, find best five card hand
  // make evaluator file to determine hand value and quality


  // winning hands
    // high card
    // pair
    // two pair
    // three of a kind
    // straight
    // flush
    // full house
    // four of a kind
    // straight flush
    // royal flush


  // buy in


  // check


  // bet


  // raise


  // fold


  // best hand

}
