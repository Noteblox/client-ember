import Ember from 'ember';
import BaseAuthenticated  from '../../base-authenticated';

export default BaseAuthenticated.extend({
  breadCrumbModelTitleProperty: null,
  breadCrumb: {
    title: 'Apps'
  },
  model: function() {
    var id = this.paramsFor('blox.block').block_id;
    return this.store.query('space-app', {'space': id});
  }
});
