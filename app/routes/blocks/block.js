import BaseAuthenticated  from '../base-authenticated';
import SaveModelMixin from 'noteblox-client-ember/mixins/blox/save-model-mixin';

export default BaseAuthenticated.extend( {
  breadCrumbModelTitleProperty: 'name',
  model: function(params) {
    return this.store.findRecord('block', params.block_id);
  }
});
