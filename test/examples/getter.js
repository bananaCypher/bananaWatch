var bWatch = require('../../index.js');

var fruitPrices = {
  apples  : 75,
  bananas : 0.80,
  lemons  : 90,
  oranges : 75,
}

//Set up the getter
bWatch(fruitPrices, 'bananas', {
  get: function(value){
    return value * 100; 
  }
});

console.log('The price of bananas is:', fruitPrices.bananas + 'p');
