var bWatch = require('../../index.js');

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
