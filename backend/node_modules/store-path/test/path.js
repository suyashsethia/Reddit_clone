var path = require('..');
var Store = require('datastore');
var assert = require('assert');

describe("Path middleware", function() {
  var store = null;
  beforeEach(function() {
    store = new Store({
      country : {
        france: 'paris',
        canada : 'edmonton',
        ireland : 'dublin'
      },
      names: ['olivier', 'amy', ['jean', 'daniel']]
    });
    store.use(path);
  });

  describe("API", function() {

    it("should have path handler", function() {
      assert.equal(typeof store.path, 'function');
    });

  });

  describe("Getter", function() {

    it("should get store value", function() {
      assert.deepEqual(store.path('country'), {
        france: 'paris',
        canada : 'edmonton',
        ireland: 'dublin'
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
      store.path('country.ireland', '');

      var country = store.get('country');
      assert.equal(country.canada.city, 'calgary');
      assert.equal(country.france, 'strasbourg');
      assert.equal(country.ireland, '');
    });

    // it('should set new attributes in store', function() {
    //   store.path('mandatory.video', true);
    //   assert.deepEqual(store.get('mandatory'), {
    //     video: true
    //   });
    //   assert.equal(store.path('mandatory.video'), true);
    // });

    it("should set array from path", function() {
      store.path('names.0', 'nicolas');
      store.path('names.2.0', 'michelle');

      var names = store.get('names');
      assert.equal(names[0], 'nicolas');
      assert.equal(names[2][0], 'michelle');
    });

  });


});