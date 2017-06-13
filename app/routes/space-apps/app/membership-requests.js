import Ember from 'ember';
import BaseAuthenticated  from '../../base-authenticated';

export default BaseAuthenticated.extend({
  templateName: 'blox/block/membership-requests',
  breadCrumbModelTitleProperty: null,
  breadCrumb: {
    title: 'Requests'
  },
  model: function() {
    var id = this.paramsFor('blox.block.app').app_id;
    return this.store.query('context-membership-request', {'context': id});
  }
});
