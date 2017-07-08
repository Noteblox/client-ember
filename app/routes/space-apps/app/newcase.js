import Ember from 'ember';
import BaseAuthenticated  from '../../base-authenticated';
import { singularize } from "ember-inflector";

const appCaseTypes = {
  "websiteIssueApp" : 'issue',
  "websiteNoteApp" : 'note'
}

export default BaseAuthenticated.extend({
  store: Ember.inject.service('store'),
  appModel: null,
  model: function(params) {

    // pickup application model
    const appModel = this.modelFor('space-apps.app');
    this.set('appModel', appModel);
    const appTypeName = singularize(appModel.get('pathFragment'));

    // figure out case model type
    const caseTypeName = appCaseTypes[appTypeName];
    //console.log('newcase route, caseTypeName: ' + caseTypeName);

    // create case model
    return this.store.createRecord(caseTypeName, {
      visibility: 'WEBSITE'
    });

  },
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('assigneeOptions', this.store.query('user', {

      page: {
        number: 0,
        size: 100
      }

    }));
  },
  actions: {
    submit: function (model) {
      const _this = this;
      //console.log("calling pushObject...");
      let appModel = this.get('appModel');
      appModel.get('cases').pushObject(model);
      //console.log("parentApplication...");
      model.set('parentApplication', {id: appModel.get('id')});
      //console.log("saving...");
      model.save().then(function(saved) {
        //console.log('saved the case: ');
        //console.log(saved);
        //console.log('transitioTo: ');
        _this.transitionTo('cases.case', saved.id);
      });
    },
  },
});
