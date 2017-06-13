import BaseAuthenticated  from '../../base-authenticated';
import SaveModelMixin from 'noteblox-client-ember/mixins/blox/save-model-mixin';

export default BaseAuthenticated.extend( {
  beforeModel(transition) {
    this.transitionTo('space-apps.app.settings');
  },
});
