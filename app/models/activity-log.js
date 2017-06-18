import Ember from 'ember';
import DS from "ember-data";

const {
  computed
} = Ember;


const BaseContext = DS.Model.extend({


  predicate: DS.attr('string'),
  createdDate: DS.attr('utc'),
  // User
  subject: DS.attr(),
  context: DS.attr(),
  object:  DS.attr()
});


BaseContext.reopenClass({
  columns: computed(function() {
    return [{
      label: '',
      avatarUrlPath: 'subject.avatarUrl',
      avatarNamePath: 'subject.name',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'App',
      cellComponent: 'activity-logs/light-cell',
      valuePath: 'title',
    }];
  })
});

export default BaseContext;
