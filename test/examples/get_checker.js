var bWatch = require('../../index.js');

var user = {
  name: 'Billy',
  favouriteFruit: 'apple'
};

bWatch(user, 'favouriteFruit', {
  getChecker: function(value){
    if(value == 'banana'){
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
