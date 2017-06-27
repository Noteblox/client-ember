import Ember from 'ember';
import DS from "ember-data";
import Resource from "./resource";

const {
  computed
} = Ember;


const BaseCase = Resource.extend({

  name: DS.attr('string'),
  title: DS.attr('string'),
  detail: DS.attr('string'),
  quote: DS.attr('string'),
  priority: DS.attr('string'),
  parentApplication: DS.attr(),
  status: DS.attr(),
  createdDate: DS.attr('utc'),
  createdBy: DS.attr(),
  assignee: DS.attr(),

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
