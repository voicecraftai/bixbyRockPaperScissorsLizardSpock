var console = require("console");

module.exports.function = function shootHands(userHand) {
  
  var bixbyHand = HANDS[Math.floor(Math.random() * HANDS.length)];
  var result = rpslsLogic(bixbyHand, userHand);

  if (DEBUG) {
    console.log ("Result: win = " + result.whoWon + " message = " + result.message);
  }
   
  return {
    userHand: userHand,
    bixbyHand: bixbyHand,
    resultMessage: result.message,
    whoWon: result.whoWon
  };
}

function rpslsLogic(bixbyHand, userHand) {
  var result = {};
  if (bixbyHand == userHand) {
    result.message = null;
    result.whoWon = 0;
    return result;
  } else if (!userHand in RULES){  // Error handling for bad input
     var fail = require ('fail');
     throw fail.checkedError('Unrecognized hand from user.', 'BadInput', null);
     return 'Unrecognized hand';
  } else {
    if (bixbyHand in RULES[userHand]) {
      result.message = RULES[userHand][bixbyHand]
      result.whoWon = 1;
      return result;
    } else {
      result.message = RULES[bixbyHand][userHand]
      result.whoWon = 2;
      return result;
    }
  }
}

const DEBUG = false;
const HANDS = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
const RULES = {
  Rock: {
    Lizard: 'Rock crushes lizard',
    Scissors: 'Rock crushes scissors'
  },
  Paper: {
    Spock: 'Paper disproves Spock',
    Rock: 'Paper covers rock'
  },
  Scissors: {
    Lizard: 'Scissors beheads lizard',
    Paper: 'Scissors cuts paper'
  },
  Lizard: {
    Spock: 'Lizard poisons Spock',
    Paper: 'Lizard eats paper'
  },
  Spock: {
    Scissors: 'Spock distroys scissors',
    Rock: 'Spock vaporizes rock'
  }
};