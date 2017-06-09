import Ember from 'ember';
import DS from "ember-data";

const {
  computed
} = Ember;


const BaseCase = DS.Model.extend({

  name: DS.attr('string'),
  title: DS.attr('string'),
  detail: DS.attr('string')

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
