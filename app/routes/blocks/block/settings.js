import Ember from 'ember';
import BaseAuthenticated  from '../../base-authenticated';
import SaveModelMixin from 'noteblox-client-ember/mixins/blox/save-model-mixin';

export default BaseAuthenticated.extend(SaveModelMixin, {
  breadCrumbModelTitleProperty: null,
  breadCrumb: {
    title: 'Settings'
  }
});
