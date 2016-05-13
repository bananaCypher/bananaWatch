var bWatch = require('../../index.js');

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
