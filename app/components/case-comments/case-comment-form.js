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
  statusModels: null,
  model: null,
  didReceiveAttrs() {
    this.initModel();
  },
  initModel() {
    const modelName =  singularize(this.caseModel.get('pathFragment'));
    //console.log('case-comment-form didReceiveAttrs, modelName: ' + modelName + ', pathFragment: ' + this.caseModel.get('pathFragment') );
    if(!this.model){
      if(!this.caseModel){
        throw "Either a caseModel or model is required";
      }
      let commentType = caseCommentTypes[modelName];
      //console.log("commentType: " + commentType);
      if(!commentType){
        throw "Could not map case type '" + modelName + "' to a corresponding comment type";
      }
      this.set('model', this.get('store').createRecord(commentType, {}));
    }
    //console.log("statuses:");
    //console.log(this.get('caseModel.parentApplication.workflow'));//.get('statuses')
    //console.log(this.get('caseModel').get('parentApplication').get('workflow'));//.get('statuses')
    ////console.log(this.get('caseModel').parentApplication.workflow.statuses);
  },
  actions: {
    submit: function (model) {
      const _this = this;
      this.caseModel.get('comments').pushObject(this.model);
      this.model.set('parentCase', {id: this.caseModel.get('id')});
      this.model.save().then(function(saved) {
        //console.log('saved the comment: ');
        //console.log(saved);
        _this.set('model', null);
        _this.initModel();
        //_this.rerender();//.initModel(true);
        //_this.sendAction('transitionToRouteName', 'cases.case', _this.caseModel.get('id'));
      });
    },
  },
});
