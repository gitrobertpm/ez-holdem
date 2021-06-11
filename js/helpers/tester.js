/**
 * EZ Hold 'em - Tester
 */

"user strict";

/* Simulated hands for testing */
const testHands = {
  royalFlush: [
    new Card('A', 'spades'),
    new Card('K', 'spades'),
    new Card('Q', 'spades'),
    new Card('J', 'spades'),
    new Card(10, 'spades'),
    new Card(10, 'clubs'),
    new Card(9, 'diamonds')
  ],
  straightFlush: [
    new Card(6, 'spades'),
    new Card(7, 'spades'),
    new Card(8, 'spades'),
    new Card(10, 'spades'),
    new Card(9, 'spades'),
    new Card(10, 'clubs'),
    new Card(9, 'diamonds')
  ],
  fours: [
    new Card(2, 'spades'),
    new Card('A', 'spades'),
    new Card('A', 'hearts'),
    new Card('A', 'clubs'),
    new Card('A', 'diamonds'),
    new Card(10, 'clubs'),
    new Card(9, 'diamonds')
  ],
  fullHouse: [
    new Card(2, 'spades'),
    new Card(2, 'spades'),
    new Card(3, 'hearts'),
    new Card(3, 'clubs'),
    new Card(3, 'diamonds'),
    new Card(10, 'clubs'),
    new Card(9, 'diamonds')
  ],
  flush: [
    new Card(2, 'hearts'),
    new Card(4, 'spades'),
    new Card(6, 'spades'),
    new Card(7, 'spades'),
    new Card(9, 'spades'),
    new Card(10, 'spades'),
    new Card(9, 'diamonds')
  ],
  straight: [
    new Card(3, 'spades'),
    new Card(5, 'spades'),
    new Card(2, 'spades'),
    new Card(4, 'spades'),
    new Card('A', 'hearts'),
    new Card(10, 'clubs'),
    new Card(9, 'diamonds')
  ],
  straight2: [
    new Card(3, 'spades'),
    new Card(5, 'spades'),
    new Card(2, 'spades'),
    new Card(4, 'spades'),
    new Card(6, 'hearts'),
    new Card(7, 'clubs'),
    new Card(7, 'diamonds')
  ],
  set: [
    new Card(5, 'spades'),
    new Card(7, 'spades'),
    new Card(3, 'hearts'),
    new Card(3, 'clubs'),
    new Card(3, 'diamonds'),
    new Card(10, 'clubs'),
    new Card(9, 'diamonds')
  ],
  twoPair: [
    new Card(2, 'spades'),
    new Card(2, 'spades'),
    new Card(3, 'hearts'),
    new Card(3, 'clubs'),
    new Card(7, 'diamonds'),
    new Card(10, 'clubs'),
    new Card(5, 'diamonds')
  ],
  onePair: [
    new Card(2, 'spades'),
    new Card(2, 'spades'),
    new Card(5, 'hearts'),
    new Card(7, 'clubs'),
    new Card(9, 'diamonds'),
    new Card(10, 'clubs'),
    new Card(3, 'diamonds')
  ],
  highCard: [
    new Card(2, 'spades'),
    new Card(4, 'spades'),
    new Card(6, 'hearts'),
    new Card(8, 'clubs'),
    new Card(10, 'diamonds'),
    new Card(10, 'clubs'),
    new Card(3, 'diamonds')
  ],
  
};


/* Change flop and whole for player one for testing purposes */
const rigGame = (game, hand) => { console.log(hand);
  game.table.community_cards = hand.slice(0, 5);
  updateCommCardsView(game.table);
  game.players[0].hole_cards = hand.slice(5);
  updateHoleCardsView(game.players)
  game.players[0].hand = hand;
  game.table.hand_phase = 'river';
};