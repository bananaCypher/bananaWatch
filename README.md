# bananaWatch
A library to help quickly and easily set up getters and setters for object properties.

# Installation
```sh
npm install bananawatcher
```

# Usage
## Setting up a getter
```js
// getter.js
var bWatch = require('bananawatcher');

var fruitPrices = {
  apples  : 75,
  bananas : 0.80,
  lemons  : 90,
  oranges : 75,
};

// Set up a getter to convert the banana price to pence
bWatch(fruitPrices, 'bananas', {
  get: function(value){
    return value * 100; 
  }
});

console.log('The price of bananas is:', fruitPrices.bananas + 'p');
```
```sh
node getter.js

The price of bananas is: 80p
```

## Setting up a setter
```js
// setter.js
var bWatch = require('bananawatcher');

var user = {
  user_id   : 420,
  name      : 'Barry Manilow',
  username  : 'bazaTheGreat'
};

// Set up a setter to remove illegal username characters
bWatch(user, 'username', {
  set: function(oldValue, newValue){
    return newValue.replace(/[^a-zA-Z0-9]/g, '');
  }
});

user.username = '[$$$-IamBarry-$$$]';
console.log(user.name, 'your username is:', user.username);
```
```sh
node setter.js

Barry Manilow your username is IamBarry
```

## Setting up a getChecker
```js
// get_checker.js
var bWatch = require('bananawatcher');

var user = {
  name: 'Billy',
  favouriteFruit: 'apple'
};

bWatch(user, 'favouriteFruit', {
  getChecker: function(value){
    if(value == 'banna'){
      return true;
    } else {
      console.log('obviously the wrong answer');
      return false;
    }
  }
});

console.log(user.favouriteFruit);
user.favouriteFruit = 'banana';
console.log(user.favouriteFruit);
```
```sh
node get_checker.js

obviously the wrong answer
undefined
banana

```

## Setting up a setChecker
```js
// set_checker.js
var bWatch = require('bananawatcher');

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
```
```sh
node set_checker.js

Dice roll must be between 1 and 6
2
5
```
