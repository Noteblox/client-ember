import BaseAuthenticated  from '../base-authenticated';
import SaveModelMixin from 'noteblox-client-ember/mixins/users/save-model-mixin';

export default BaseAuthenticated.extend(SaveModelMixin, {
  modelTitleProperty: 'username',
});
