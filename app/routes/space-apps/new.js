import Ember from 'ember';
import BaseAuthenticated  from '../base-authenticated';
import SaveModelMixin from 'noteblox-client-ember/mixins/space-apps/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('space-app');
  }
});
