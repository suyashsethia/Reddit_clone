var path = require('store-path'),
    Store = require('datastore'),
    assert = require('assert');

describe("Path middleware", function() {
  var store = null;
  beforeEach(function() {
    store = new Store({
      country : {
        france: 'paris',
        canada : 'edmonton'
      },
      names: ['olivier', 'amy', ['jean', 'daniel']]
    });
    store.use(path);
  });
  
  describe("API", function() {
    it("should have path handler", function() {
      assert.equal(typeof store.path, 'function');
    });

    it("should have change handler", function() {
      assert.equal(typeof store.change, 'function');      
    });
  });

  describe("Getter", function() {
    it("should get store value", function() {
      assert.deepEqual(store.path('country'), {
        france: 'paris',
        canada : 'edmonton'
      });
    });
    
    it('should get store value from path', function() {
      assert.equal(store.path('country.canada'), 'edmonton');
    });
  });
  
  describe("Setter", function() {
    it('should set store value', function() {
      store.path('country', 'england');
      assert.equal(store.get('country'), 'england');
    });

    it('should set store value from path', function() {
      store.path('country.canada.city', 'calgary');
      store.path('country.france', 'strasbourg');

      var country = store.get('country');
      debugger
      assert.equal(country.canada.city, 'calgary');
      assert.equal(country.france, 'strasbourg');
    });

    it("should set array from path", function() {
      store.path('names.0', 'nicolas');
      store.path('names.2.0', 'michelle');

      var names = store.get('names');
      assert.equal(names[0], 'nicolas');
      assert.equal(names[2][0], 'michelle');
    });
    
  });
  
  // describe("Change", function() {
  //   it('should listen changes on store attribute', function() {
  //     var changed = false;
  //     store.change('country', function() {
  //       changed = !changed;
  //     });
  //     store.path('country', 'us');
  //     debugger
  //     assert.equal(changed, true);
  //   });

  //   it('should listent changes on path', function() {
  //     var changed = true;
  //     store.change('country.')
  //   });
  // });
  
  
});
