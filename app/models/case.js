import Ember from 'ember';
import DS from "ember-data";
import Resource from "./resource";

const {
  computed
} = Ember;


const BaseCase = DS.Model.extend(Resource, {
  viewRouteName: 'cases.case',
  quote: DS.attr('string'),
  priority: DS.attr('string'),
  commentsCount: DS.attr('number'),
  status: DS.attr(),
  visibility: DS.attr('string', {defaultValue: 'WEBSITE'}),

  assignee: DS.attr(),//DS.belongsTo('user'),

  parentApplication: DS.attr(),//DS.belongsTo('space-app' , {polymorphic: true, inverse: 'cases' }),
  comments: DS.hasMany('case-comment', {async: true, polymorphic: true/*, inverse: 'parentCase'*/}),


  statusName: computed('status', function() {
    return this.get('status.name');
  }),
  iconClass: computed('status', function() {
    const statusName =  this.get('status.name');
    let statusIconClass = 'icon-exclamation';
    if(statusName == 'Unassigned'){
      statusIconClass = 'icon-minus';
    }
    else if(statusName == 'Closed'){
      statusIconClass = 'icon-close';
    }

    return statusIconClass + ' icons';
  }),

});


BaseCase.reopenClass({
  columns: computed(function() {
    return [{
      label: 'Status',
      width: '20px',
      sortable: false,
      valuePath: 'statusName',
      cellComponent: 'icon-cell'
    }, {
      label: 'Overview',
      //width: '60px',
      sortable: true,
      valuePath: 'title',
      cellComponent: 'cases/overview-cell'
    }, {
      label: 'Comments',
      valuePath: 'commentsCount',
      width: '30px',
      cellComponent: 'cases/comment-count-cell',
    }];
  })
});

export default BaseCase;
