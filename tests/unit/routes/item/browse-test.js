import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:item/browse', 'ItemBrowseRoute', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function() {
  var route = this.subject();
  ok(route);
});
