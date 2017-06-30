import Ember from 'ember';
import DS from "ember-data";
import Resource from "./resource";

const {
  computed
} = Ember;


const BaseCase = DS.Model.extend(Resource, {

  quote: DS.attr('string'),
  priority: DS.attr('string'),
  status: DS.attr(),
  visibility: DS.attr('string'),
/*
  assignee: DS.belongsTo('user'),
  parentApplication: DS.belongsTo('space-app' , {polymorphic: true, inverse: 'cases' }),
*/
  comments: DS.hasMany('case-comment', {async: true, polymorphic: true/*, inverse: 'parentCase'*/})

});


BaseCase.reopenClass({
  columns: computed(function() {
    return [{
      label: '',
      valuePath: 'avatarUrl',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'Name',
      valuePath: 'name',
    }, {
      label: 'Title',
      valuePath: 'title',
    }];
  })
});

export default BaseCase;
