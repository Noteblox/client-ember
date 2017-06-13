import Ember from 'ember';
import BaseAuthenticated  from '../../base-authenticated';

export default BaseAuthenticated.extend({
  templateName: 'blox/block/memberships',
  breadCrumbModelTitleProperty: null,
  breadCrumb: {
    title: 'Members'
  },
  model: function() {
    var id = this.paramsFor('blox.block.app').block_id;
    return this.store.query('context-membership', {'context': id});
  }
});
