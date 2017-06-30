import Ember from "ember";
import BaseAuthenticated  from '../base-authenticated';
import SaveCaseMixin from '../../mixins/cases/save-model-mixin';
const { inject: { service }, RSVP } = Ember;


export default BaseAuthenticated.extend(SaveCaseMixin, {
  breadCrumbModelTitleProperty: 'caseModel.name',
  model(params) {
    console.log("model, params: ");
    console.log(params);
    return this.store.findRecord('case', params.case_id);
    /* Ember.RSVP.hash({

      // load case
      caseModel: this.store.findRecord('case', params.case_id),

      // load comments
      comments: this.store.query('case-comment', {
        page: {
          number: params.number,
          size: params.size
        },
        parentCase : params.case_id
      })//.toArray()

    });
    */
  },
  actions : {
    transitionToRouteName: function(routeName, model){
      console.log('actions transitionToRouteName: ' + routeName);
      this.transitionTo(routeName, model);
    }
  }

});
