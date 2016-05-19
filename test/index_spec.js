var assert = require('assert');
var bWatch = require('../index.js');

describe('BananaWatcher', function(){
  beforeEach(function() {
    testObject = {
      foo: 'foo',
      bar: 'bar',
      foobar: ['item1', 'item2'],
      barfoo: 'foobar'
    }
  });

  it('should be able to set up a new watcher', function(){
    var watcher = bWatch(testObject, 'foo', {});  
    assert.equal(watcher instanceof bWatch, true);
  });

  describe('Basic object properties', function(){
    describe('Property getters', function(){
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
    });

    describe('Property setters', function(){
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
  });


  describe('Arrays', function(){
    it('should still function as normal if no getter or setter are defined', function(){
      bWatch(testObject, 'foobar', {});
      testObject.foobar.push('item3');
      assert.equal(testObject.foobar[2], 'item3');
    });

    describe('Array setters', function(){
      it('should be able to set up a set that properly pushes a new array value', function(){
        bWatch(testObject, 'foobar', {
          set: function(oldValue, newValue){
            return newValue;
          }
        });
        testObject.foobar.push('item3');
        assert.equal(testObject.foobar[2], 'item3');
      });

      it('should be able to set up a set that changes a pushed array value', function(){
        bWatch(testObject, 'foobar', {
          set: function(oldValue, newValue){
            return 'item10';
          }
        });
        testObject.foobar.push('item3');
        assert.equal(testObject.foobar[2], 'item10');
      });

      it('should be able to set up a set that calls a custom function when a value is pushed to an array', function(done){
        bWatch(testObject, 'foobar', {
          set: function(oldValue, newValue){
            done();
            return newValue
          }
        });
        testObject.foobar.push('item3');
      });

    });
  });

});
