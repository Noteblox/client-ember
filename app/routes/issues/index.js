import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    }
  },
  beforeModel: function(model, transition) {

    this.transitionTo('issues.assigned');

  }
});
