# bananaWatch
A library to help quickly and easily set up getters and setters for object properties.

# Installation
```sh
npm install bananawatcher
```

# How it works
To watch an object all you need to do is call bananawatcher passing in the *object to watch*, the *specific key* you want to watch and the *callback functions* you want to use.

## The object
bananawatcher should be able to watch any object including built in objects, it can even watch DOM elements however it only fires when Javascript is interacting with the element e.g. if you watch for set on an input field it won't fire when the user types in it but it will if you set it's value through JavaScript.

## The key
The key is just the key of the object you want to watch e.g. `var obj={test: 'test', bluePill: 'should have taken it'}` do if you wanted to watch for getting or setting on bluePill you would pass in 'bluePill'.

## The callback functions
There are 2 callback functions you can call they are get and set.

### get
get is called every time something requests the object property, it is passed the value of the property and is expected to return what should be returned to the requester.

### set
set is called every time something tries to set the object property, it is passed both the current value and the attempted set value and it is expected to return what the value should be set as.

# Usage
## Setting up a getter
```js
// getter.js
var bWatch = require('bananawatcher');

var fruitPrices = {
  apples  : 0.75,
  bananas : 0.80,
  lemons  : 0.90,
  oranges : 0.75,
};

// Set up getters to convert the prices to pence
for (var key in fruitPrices) {
  bWatch(fruitPrices, key, {
    get: function(value){
      return Number(value * 100) + 'p';
    }
  });
}

console.log('The price of bananas is:', fruitPrices.bananas);
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
  user_id   : 1337,
  name      : 'Barry Manilow',
  username  : 'bazaTheGreat'
};

// Set up a setter to remove illegal username characters
bWatch(user, 'username', {
  set: function(oldValue, newValue){
    return newValue.replace(/[^a-zA-Z0-9]/g, '');
  }
});

user.username = '<---IamBarry--->';
console.log(user.name, 'your username is:', user.username);
```
```sh
node setter.js

Barry Manilow your username is IamBarry
```

## Setting up another setter
```js
// watch_setter.js
var bWatch = require('bananawatcher');
var share = {
  name  : 'Alphabet Inc.',
  epic  : 'GOOG',
  price : 710.83
};

var notifyUser = function(message){
  console.log(message);
};

bWatch(share, 'price', {
  set: function(oldValue, newValue){
    if (newValue < 700) {
      notifyUser(share.name + '(' + share.epic + ') has gone below the threshold.');
    }
    return newValue;
  }
});

share.price = 650;
```
```sh
node watch_setter.js

Alphabet Inc.(GOOG) has gone below the threshold
```

