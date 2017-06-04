//import BaseAuthenticated  from '../base-authenticated';
//import SaveModelMixin from 'super-rentals/mixins/spaces/save-model-mixin';
import Ember from 'ember';

//export default BaseAuthenticated.extend( {
export default Ember.Route.extend({
  model() {
    return [{
      name: 'NameOfIssue1',
      title: ' Issue Title1 ',
      description: ' this is a description of an issue1',
      visibility: 'OPEN'
    },
    {
      name: 'NameOfIssue2',
      title: ' Issue Title2 ',
      description: ' this is a description of an issue2',
      visibility: 'CLOSED'
    },
    {
      name: 'NameOfIssue3',
      title: ' Issue Title3 ',
      description: ' this is a description of an issue3',
      visibility: 'SECRET'
    },
    {
      name: 'NameOfIssue4',
      title: ' Issue Title4 ',
      description: ' this is a description of an issue4',
      visibility: 'OPEN'
    },
    ];
  }
});
