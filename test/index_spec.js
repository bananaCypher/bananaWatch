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

  it('should be able to set up a get watcher', function(done){
    bWatch(testObject, 'foo', {
      get: function(){
        done();
        return 'foo foo';
      }
    });  
    'bunny bunny' + testObject.foo;
  });

  it('should be able to set up a set watcher', function(done){
    bWatch(testObject, 'foo', {
      set: function(){
        done();
        return 'foo foo';
      }
    });  
    testObject.foo = 'bunny bunny';
  });

  it('should be able to set up a get checker', function(done){
    bWatch(testObject, 'foo', {
      getChecker: function(){
        //do some sheit
        //check some stuffs
        return true
      }
    }); 

    setTimeout(function() {
      assert.equal('bunny bunny' + testObject.foo, 'bunny bunnyfoo');
      done(); 
    }, 100);
  });

  it('should not return the value if get checker fails', function(done){
    bWatch(testObject, 'foo', {
      getChecker: function(){
        //do some sheit
        //check some stuffs
        return false
      }
    });  

    setTimeout(function() {
      assert.equal('bunny bunny' + testObject.foo, 'bunny bunnyundefined');
      done(); 
    }, 100);
  });

  it('should be able to set up a set checker', function(done){
    bWatch(testObject, 'foo', {
      setChecker: function(){
        //do some sheit
        //check some stuffs
        return true;
      }
    });  

    setTimeout(function() {
      testObject.foo = 'bunny';
      assert.equal(testObject.foo, 'bunny');
      done(); 
    }, 100);
  });

  it('should not be able to set a value if set checker fails', function(done){
    bWatch(testObject, 'foo', {
      setChecker: function(){
        //do some sheit
        //check some stuffs
        return false;
      }
    });  

    setTimeout(function() {
      testObject.foo = 'bunny';
      assert.equal(testObject.foo, 'foo');
      done(); 
    }, 100);
  });
});
