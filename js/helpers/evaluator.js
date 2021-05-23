/**
 * EZ Hold 'em - Hand Evaluator
 */

"use strict";


/* Return sorted hand */
const getSortedHand = hand => hand.sort((a, b) => b.val - a.val);


/* Check if hand contains straight */
const straightCheck = hand => {

  let isStraight = false;
  let newHand = hand;
  let handName = 'none';

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
    [14, 2, 3, 4, 5],
    [14, 5, 4, 3, 2],
    [5, 4, 3, 2, 1]
  ];

  const uniques = Array.from(new Set(hand.map(card => card.val))); //console.log(uniques);

  if (uniques.length > 4) {

    if (uniques.includes(14) && uniques.includes(5) && uniques.includes(4) && uniques.includes(3) && uniques.includes(2)) {
      const first = uniques.shift();
      uniques.push(first);
    }
    const handStr = uniques.join(''); //console.log(handStr);
    for (let i = 0, j = possibleStraights.length; i < j; i++) { //console.log(possibleStraights[i].join(''));
      if (handStr.includes(possibleStraights[i].reverse().join('')) || handStr.includes(possibleStraights[i].join(''))) { 
        isStraight = true;
        handName = 'Straight';
        if (hand.length === 5) {
          newHand = hand;
        } else {
          newHand = hand.filter(card => possibleStraights[i].includes(card.val));
        }
        if (newHand[0].num === 'A' && newHand[1].num === 5) {
          const first = newHand.shift();
          newHand.push(first);
        }
        break;
      }
    }
  }
  // console.log(isStraight, newHand, handName);
  return [isStraight, newHand, handName];
};


/* Check if hand contains flush, straight flush or royal flush */
const flushCheck = hand => {

  let isFlush = false;
  let newHand = hand;
  let handName = 'none';

  const suitNames = ['spades', 'hearts', 'clubs', 'diamonds'];
  const fx = suit => hand.filter(card => card.suit === suit);
  const suits = {};
  suitNames.forEach(suit => suits[suit] = fx(suit)); //console.log(suits);
  const flush = Object.values(suits).filter(arr => arr.length > 4)[0];

  if (flush) {
    isFlush = true;
    newHand = flush.slice(0, 5);
    handName = 'Flush';
    // Check for straight
    const hasStraight = straightCheck(newHand); //console.log(hasStraight);
    if (hasStraight[0]) {
      handName = 'Straight Flush';
        // Check for royal
      const nums = hasStraight[1].map(card => card.num);
      if (nums.includes('A') && nums.includes('K')) {
        handName = 'Royal Flush';
      }
    }
  }

  return [isFlush, newHand, handName];
};


/* Return array of duplicate cards */
const getNums = (hand, count) => {
  const nums = {};
  hand.forEach(card => {
    if (!nums[card.val]) {
      nums[card.val] = [card];
    } else {
      nums[card.val].push(card);
    }
  }); // console.log(nums);

  return Object.values(nums).filter(arr => arr.length >= count).sort((a, b) => b[0].val - a[0].val)[0]; 
};


/* Check if hand contains four of a kind */
const fourCheck = hand => {
  let isFours = false;
  let newHand = hand;
  let handName = 'none';

  const fours = getNums(hand, 4);

  if (fours) {
    isFours = true;
    const sortedRest = getSortedHand(hand.filter(card => card.num !== fours[0].num)); //console.log(sortedRest);
    newHand = [...fours.slice(0, 4), sortedRest[0]];
    handName = 'Four of a Kind';
  }
  //console.log(newHand);
  return [isFours, newHand, handName];
};


/* Check if hand contains pair(s) */
const pairCheck = hand => {
  let isPair = false;
  let newHand = hand;
  let handName = 'none';

  const pair = getNums(hand, 2); //console.log(pair);

  if (pair) {
    isPair = true;
    const sortedRest = getSortedHand(hand.filter(card => card.num !== pair[0].num)); //console.log(sortedRest);

    const secondPair = hand.length > 4 ? getNums(sortedRest, 2) : null;

    if (secondPair) {
      const nextSortedRest = getSortedHand(sortedRest.filter(card => card.num !== secondPair[0].num)); //console.log(sortedRest);
      newHand = [...pair.slice(0, 2), ...secondPair.slice(0, 2), nextSortedRest[0]];
      handName = 'Two Pair';
    } else {
      newHand = hand.length < 4 ? pair.slice(0, 2) : hand.length === 4 ? [...pair.slice(0, 2), sortedRest[0], sortedRest[1]] : [...pair.slice(0, 2), sortedRest[0], sortedRest[1], sortedRest[2]];
      handName = 'One Pair';
    }
  }
  //console.log(isPair, newHand, handName);
  return [isPair, newHand, handName];
};


/* Check if hand contains set */
const setCheck = hand => {
  let isSet = false;
  let newHand = hand;
  let handName = 'none';

  const set = getNums(hand, 3); //console.log(set);

  if (set) {
    isSet = true;
    const sortedRest = getSortedHand(hand.filter(card => card.num !== set[0].num)); //console.log(sortedRest);
    const alsoHasPair = pairCheck(sortedRest);
    if (alsoHasPair[0]) {
      newHand = [...set.slice(0, 3), ...alsoHasPair[1].slice(0, 2)];
      handName = 'Full House';
    } else {
      newHand = [...set.slice(0, 3), sortedRest[0], sortedRest[1]];
      handName = 'Three of a Kind';
    }
  }
  //console.log(isSet, newHand, handName);
  return [isSet, newHand, handName];
};


/* Evaluate hands to find best one and assign to player object */
const getAndSetBestHand = player => {

  /* Array of winning hand names */
  const winningHands = [
    'Royal Flush',
    'Straight Flush',
    'Four of a Kind',
    'Full House',
    'Flush',
    'Straight',
    'Three of a Kind',
    'Two Pair',
    'One Pair',
    'High Card'
  ];


  // get sorted hand - create helper function to return sorted hand
  const sortedHand = getSortedHand(player.hand); //console.log(sortedHand);


  /* Get index of hand name from array of winning hands */
  const getHandIndy = handName => winningHands.indexOf(handName);


  /* Get total value of hand */
  const getHandVal = hand => {
    let handVal = hand.reduce((acc, card) => {
      if (card) {
        return acc + card.val;
      }
    }, 0);

    if (hand.length > 4) {
      if (hand[0].num === 5 && hand[1].num === 4  && hand[2].num === 3  && hand[3].num === 2  && hand[4].num === 'A' ) {
        handVal -= 13;
      }
    }

    return handVal;
  }


  const setBestHand = (player, cards, name) => {
    const bestHand = {
      name: name,
      cards: cards,
      index: getHandIndy(name),
      val: getHandVal(cards)
    };

    return player.best_hand = bestHand;
  };


  // Check for flush, straight flush and royal flush
  const hasFlush = flushCheck(sortedHand); //console.log(hasFlush);

  if (hasFlush[0]) {
    console.log(`Player ${player.id} has ${hasFlush[2]}`);
    return setBestHand(player, hasFlush[1], hasFlush[2]);
  }


  // Check for straight
  const hasStraight = straightCheck(sortedHand); //console.log(hasStraight);

  if (hasStraight[0]) { //console.log(hasStraight);
    console.log(`Player ${player.id} has ${hasStraight[2]}`);
    return setBestHand(player, hasStraight[1], hasStraight[2]);
  }


  // Check for fours
  const hasFours = fourCheck(sortedHand); //console.log(hasFours);

  if (hasFours[0]) {
    console.log(`Player ${player.id} has ${hasFours[2]}`);
    return setBestHand(player, hasFours[1], hasFours[2]);
  }


  // Check for set and full house
  const hasSet = setCheck(sortedHand); //console.log(hasSet);

  if (hasSet[0]) {
    console.log(`Player ${player.id} has ${hasSet[2]}`);
    return setBestHand(player, hasSet[1], hasSet[2]);
  }


  // Check for pair(s)
  const hasPair = pairCheck(sortedHand); //console.log(hasPair);

  if (hasPair[0]) {
    console.log(`Player ${player.id} has ${hasPair[2]}`);
    return setBestHand(player, hasPair[1], hasPair[2]);
  }


  // High card
  console.log(`Player ${player.id} has High Card`);
  return setBestHand(player, sortedHand.slice(0, 5), 'High Card');
};


/* Get winner(s) */
const getAndSetWinner = game => { //console.log(game);

  let lowestIndex = 42;

  game.players.forEach(player => {
    if (player.best_hand.index < lowestIndex) {
      lowestIndex = player.best_hand.index;
    }
  }); //console.log(lowestIndex);

  const indexWinner = game.players.filter(player => player.best_hand.index === lowestIndex); //console.log(indexWinner);

  if (indexWinner.length === 1) {
    return game.hand_winner = indexWinner;
  } else {
    let highestVal = 0;
    game.players.forEach(player => {
      if (player.best_hand.val > highestVal) {
        highestVal = player.best_hand.val;
      }
    }); //console.log(highestVal);

    const valWinner = game.players.filter(player => player.best_hand.index === lowestIndex); //console.log(valWinner);

    return game.hand_winner = valWinner;
  }
};