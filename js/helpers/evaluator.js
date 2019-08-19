/**
 * EZ Hold 'em - PHand Evaluator
 * Developed by: Robert Manolis
 *               Milwaukie, OR - 2019
 */

"use strict";


const winningHands = [
  'royalFlush',
  'straight flush',
  'four of a kind',
  'full house',
  'flush',
  'straight',
  'three of a kind',
  'two pair',
  'pair'
]


function getHighCard(hand) {
  const vals = hand.map((card, i) => card.val);
  const maxVal = Math.max(...vals);
  const maxIndy = vals.indexOf(maxVal);
  //console.log('High card', hand[maxIndy]);
  return hand[maxIndy];
}

function getAllHighCards(hand) {
  const handOfHighCards = [];
  const storage = [];
  hand.forEach(card => storage.push(card));
  while (storage.length > 0 && handOfHighCards.length < 5) {
    const highCard = getHighCard(storage);
    const vals = storage.map((card, i) => card.val);
    const maxVal = Math.max(...vals);
    const maxIndy = vals.indexOf(maxVal);
    handOfHighCards.push(highCard);
    storage.splice(maxIndy, 1);
  }
  //console.log('hand of high cards, handOfHighCards);

  return handOfHighCards;
}

function getTopPair(hand) {
  const compare = (a,b) => (a.val > b.val) ? -1 : (a.val < b.val) ? 1 : 0;
  const sortedHand = hand.sort(compare);
  const topPair = [];
  const storage = [];
  sortedHand.forEach(card => storage.push(card));
  
  // loop over reversed hand to starting with high card to see if there is a match
  while (storage.length > 1 && topPair.length < 2) {
    const cardToCheck = storage.splice(0, 1);
    storage.forEach(card => (card.val === cardToCheck[0].val) ? topPair.push(card, cardToCheck[0]) : false );
  }

  return topPair;
}


function getTwoPair(hand) {
  // variables for indexesOfPair, and storage
  // push hand to storage
  // check storage for getPair
  // if pair - capture indexes and remove from storage and check for pair
  // if second pair capture indexes and remove from storage and get high card of storage and store index and return hand indexes from index
  // else return false
}


function getSet (hand) {
  // variable to reverse sort hand
  // loop over hand, highest to lowest
  // check if two other cards match
  // if so return set plus next two highest
}

// write up whole process


// when a card is dealt, or when player turn starts, player uses functions from the evaluator file to evaluate best hand
// ideally, one function will return the bast hand up to five cards from the hand passed into the evaluator functions, and player class will set it as best_hand
// maybe when best_hand is returned, maybe it is an object that includes the high-card-evaluator-of-combo/kicker, which is also set by player
// to determine best hand, we check for desired combinations, highest to lowest, conditional upon the length of the hand

// to get best hand we create functions for testing for each combo - if combo exists return hand else return false
// create bestHand function that sticks all combo testers into array
// loop over bestHandTesters array, from highest to lowest, return first one that is not false
// use array of combo names, and index of highest combo to get best hand name
// if none are true, get five highest cards and return those;

// if hand length is 2 cards, check for pair, else high card
// if hand length is 5 or more, check for Royal flush, straight flush, four of a kind, full house, flush, straight, three of a kind, two pair, pair, high card
// if two players have same hand, check which is greater - might be handled in dealer, but function might be here
// if desired combo located, evaluator returns it and player class sets it to best hand property - maybe an object including best hand and kicker


// to compare hands across players, we assign a value to each desired combo and see which player hand has the highest combo value
// if two or more players' hands have the same combo value, further evaluation is required to determine which is better, like high card/kicker




const possibleStraights = [
  [10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13],
  [8, 9, 10, 11, 12],
  [7, 8, 9, 10, 11],
  [6, 7, 8, 9, 10],
  [5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8],
  [3, 4, 5, 6, 7],
  [2, 3, 4, 5, 6],
  [14, 2, 3, 4, 5]
];

function haveStraight(hand) {

  // loop over possibleStraights
    // on each iteration, filter over possibleStraights sub-array
      // if hand parameter contains/includes 

  //const handVals = hand.map(card => card.val).sort((a, b) => a - b);
  const sortedUniqueHandVals = [...new Set(hand.map(card => card.val).sort((a, b) => b - a))];
  const straightArray = [];
  const sequence = sortedUniqueHandVals.filter((val, i, vals) => {

    if (val - 1 === vals[i + 1] || val + 1 === vals[i - 1]) {
      if (straightArray.length === 0) {
        straightArray.unshift(val);
        
      } else if (val + 1 === straightArray[0]) {
        straightArray.unshift(val);
      }
    }
  });
  

  let straight = false;
 
  return straight;
}


function getKicker() {

}






function havePairTwoPairSetFullHouseFourOfAKind() {

}


// function haveStraight(hand) {

//   // console.log(hand)

//   // function compare(a,b) {
//   //   if (a.val < b.val)
//   //      return -1;
//   //   if (a.val > b.val)
//   //     return 1;
//   //   return 0;
//   // }

//   //const sortedHand = hand.sort(compare);
//   // see if hand contains five sequential values
//   // put sorted values in array and remove duplicates
//   //const handVals = sortedHand.map(card => card.val);
//   //const uniqueHandVals = [...new Set(handVals)];

//   //const handVals = hand.map(card => card.val).sort((a, b) => a - b);
//   const sortedUniqueHandVals = [...new Set(hand.map(card => card.val).sort((a, b) => b - a))];
//   const straightArray = [];
//   const sequence = sortedUniqueHandVals.filter((val, i, vals) => {

//     if (val - 1 === vals[i + 1] || val + 1 === vals[i - 1]) {
//       if (straightArray.length === 0) {
//         straightArray.unshift(val);
        
//       } else if (val + 1 === straightArray[0]) {
//         straightArray.unshift(val);
//       }
//     }
//   });
//   //const secondSequence = firstSequence.filter((val, i, vals) => val + 1 === vals[i + 1] || val - 1 === vals[i - 1]);


//   //console.log(sortedHand);
//   //console.log(handVals);
//   console.log(sortedUniqueHandVals);
//   //console.log(sequence);
//   console.log('straightArray', straightArray);
//   //console.log(secondSequence);
  

//   let straight = false;
//   // for (let i = 0, j = sortedHand.length; i < j; i++) {
//   //   console.log(sortedHand[i], sortedHand[i].val, sortedHand[i + 1].val + 1);
//   //   if (sortedHand[i].val === sortedHand[i + 1].val - 1 && 
//   //       sortedHand[i].val === sortedHand[i + 2].val - 2 &&
//   //       sortedHand[i].val === sortedHand[i + 3].val - 3 &&
//   //       sortedHand[i].val === sortedHand[i + 4].val - 4) {
//   //         straight = true;
//   //   }
//   // }
  
  
//   hand.forEach((card, i, hand) => {
//     // if hand contains card
//     // if (hand.includes()) {

//     // }
//   });
//   return straight;
// }

function haveFlush(hand) {
  const spades = hand.filter(card => card.suit === 'spades');
  const hearts = hand.filter(card => card.suit === 'hearts');
  const clubs = hand.filter(card => card.suit === 'clubs');
  const diamonds = hand.filter(card => card.suit === 'diamonds');
  const suits = [spades, hearts, clubs, diamonds];
  let flush = false;

  suits.forEach(suit => {
    if (suit.length > 4) {
      flush = true;
    }
  });

  return flush;
}


function haveStraightFlush() {

}

function bestHand(hand) {

}



// winning hands

// points for each card

// determining highest high card, pair, set, etc.

// place a number value on each hand

// look for winning combos



console.log('evaluator');

// {
  //   if (a.val > b.val)
  //       return -1;
  //   if (a.val < b.val)
  //     return 1;
  //   return 0;
  // }
    // {
    //   if (card.val === cardToCheck[0].val) {
    //     topPair.push(card, cardToCheck[0]);
    //   }
    // });