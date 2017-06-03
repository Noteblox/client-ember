import Ember from 'ember';
import SaveModelMixin from 'noteblox-client-ember/mixins/websites/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('website');
  }
});
