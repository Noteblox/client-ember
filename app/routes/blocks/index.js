import Ember from 'ember';
import BaseAuthenticatedRoute from '../base-authenticated';

export default BaseAuthenticatedRoute.extend({
  beforeModel: function(model, transition) {

    this.transitionTo('blocks.owned');

  }
});
