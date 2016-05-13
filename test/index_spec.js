var assert = require('assert');
var bWatch = require('../index.js');

describe('BananaWatcher', function(){
  beforeEach(function() {
    testObject = {
      foo: 'foo',
      bar: 'bar',
      foobar: 'barfoo',
      barfoo: 'foobar'
    }
  });

  it('should be able to set up a new watcher', function(){
    var watcher = bWatch(testObject, 'foo', {});  
    assert.equal(watcher instanceof bWatch, true);
  });

  it('should be able to set up a get that returns the right value', function(){
    bWatch(testObject, 'foo', {
      get: function(value){
        // do some stuff with the value
        return value;
      }
    });  
    assert.equal(testObject.foo, 'foo');
  });

  it('should be able to set up a get that returns a different value', function(){
    bWatch(testObject, 'foo', {
      get: function(value){
        var newValue = 'bunny bunny' + ' ' + value + ' ' + value;
        // do some stuff with the value
        return newValue;
      }
    });  
    assert.equal(testObject.foo, 'bunny bunny foo foo');
  });

  it('should be able to set up a get that calls a custom function', function(done){
    var finishTheTest = function(value){
      if(value == 'foo'){ done() }
    }

    bWatch(testObject, 'foo', {
      get: function(value){
        finishTheTest(value);
        // do some stuff with the value
        return value;
      }
    });  
    assert.equal(testObject.foo, 'foo');
  });

  it('should be able to set up a set that properly sets the value', function(){
    bWatch(testObject, 'foo', {
      set: function(oldValue, newValue){
        // do some stuff with the value
        return newValue;
      }
    });  
    testObject.foo = 'bar';
    assert.equal(testObject.foo, 'bar');
  });

  it('should be able to set up a set that changes the set value', function(){
    bWatch(testObject, 'foo', {
      set: function(oldValue, newValue){
        var changed = 'banana_' + newValue;
        // do some stuff with the value
        return changed;
      }
    });  
    testObject.foo = 'bar';
    assert.equal(testObject.foo, 'banana_bar');
  });

  it('should be able to set up a set that calls a custom function', function(done){
    var finishTheTest = function(value){
      if(value == 'bar'){ done() }
    }

    bWatch(testObject, 'foo', {
      set: function(oldValue, newValue){
        finishTheTest(newValue);
        // do some stuff with the value
        return newValue;
      }
    });  
    testObject.foo = 'bar';
    assert.equal(testObject.foo, 'bar');
  });
});
