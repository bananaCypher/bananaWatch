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
    if (that.callbacks.get){
      return that.callbacks.get(value);
    } else {
      return value;
    }
  }

  that.set = function(newValue){
    var value = that.obj[that.newProp];
    if (that.callbacks.set){
      that.obj[that.newProp] = that.callbacks.set(value, newValue);
    } else {
      that.obj[that.newProp] = newValue;
    }
  };

  Object.defineProperty(that.obj, that.prop, {
    get: that.get,
    set: that.set,
  });
  if(that.obj[that.newProp].constructor.name === 'Array'){
    that.obj[that.prop].push = function(value){
      var oldValue = that.obj[that.newProp];
      var length = that.obj[that.prop].length;
      that.obj[that.newProp][length] = (that.callbacks.set) ? that.callbacks.set(oldValue, value) : value;
    }
  }

  return that;
}

module.exports = BananaWatcher;
