// http://stackoverflow.com/a/1919670
// helper function
var createObject = function (o) {
  function F() {}
  F.prototype = o;
  return new F();
};

var BananaWatcher = function(obj, prop, callbacks){
  var that = createObject(BananaWatcher.prototype);
  that.obj = obj;
  that.prop = prop;
  that.newProp = '_' + that.prop;
  that.obj[that.newProp] = that.obj[that.prop];
  that.callbacks = callbacks;

  that.get = function(){
    var value = that.obj[that.newProp];
    if(that.callbacks.getChecker){
      if (!that.callbacks.getChecker(value)) {
        return;
      };
    }
    if(that.callbacks.get){
      that.callbacks.get(value); 
    }
    return value;
  }

  that.set = function(newValue){
    var value = that.obj[that.newProp];
    if(that.callbacks.setChecker){
      if (!that.callbacks.setChecker(value)) {
        return;
      };
    }
    if(that.callbacks.set){
      that.callbacks.set(value, newValue);
    }
    that.obj[that.newProp] = newValue;
  }

  Object.defineProperty(that.obj, that.prop, {
    get: that.get,
    set: that.set
  });

  return that;
}

module.exports = BananaWatcher;
