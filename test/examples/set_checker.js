var bWatch = require('../../index.js');

var character = {
  name      : 'Guthrow',
  race      : 'Dwarf',
  class     : 'Wizard',
  lastRoll  : 2,
}

bWatch(character, 'lastRoll', {
  setChecker: function(oldValue, newValue){
    if (newValue >= 1 && newValue <= 6){
      return true;
    } else {
      console.log('Dice roll must be between 1 and 6');
      return false;
    }
  }
});

character.lastRoll = 12;
console.log(character.lastRoll);
character.lastRoll = 5;
console.log(character.lastRoll);
