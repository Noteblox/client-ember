import Ember from 'ember';
import { singularize } from "ember-inflector";

const caseCommentTypes = {
  'system-error': 'error-comment',
  'client-error': 'error-comment',
  'issue': 'issue-comment',
  'note': 'note-comment'
};

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  caseModel: null,
  model: null,
  didReceiveAttrs() {
    this.initModel();
  },
  initModel() {
    const modelName =  singularize(this.caseModel.get('pathFragment'));
    console.log('case-comment-form didReceiveAttrs, modelName: ' + modelName + ', pathFragment: ' + this.caseModel.get('pathFragment') );
    if(!this.model){
      if(!this.caseModel){
        throw "Either a caseModel or model is required";
      }
      let commentType = caseCommentTypes[modelName];
      console.log("commentType: " + commentType);
      if(!commentType){
        throw "Could not map case type '" + modelName + "' to a corresponding comment type";
      }
      this.model = this.get('store').createRecord(commentType, {
      });
    }
  },
  actions: {
    submit: function (model) {
      this.model.save().then(function() {
        route.transitionTo('cases.case', this.caseModel.get('id'));
      }, function() {
        console.log('Failed to save the model');
      });
    },
  },
});
