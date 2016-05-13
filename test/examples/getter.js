var bWatch = require('../../index.js');

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
