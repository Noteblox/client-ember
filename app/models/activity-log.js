import Ember from 'ember';
import DS from "ember-data";

const {
  computed
} = Ember;



const ActivityLog = DS.Model.extend({


  predicate: DS.attr('string'),
  createdDate: DS.attr('utc'),
  discriminator: DS.attr('string'),

  // User
  subject: DS.attr(),
  context: DS.attr(),
  object:  DS.attr(),
  predicateDescription: computed('predicate', 'discriminator', function() {
    const predicate = this.get('predicate');
    return this.constructor.predicateDescriptions[predicate] || predicate;

  })
});


ActivityLog.reopenClass({
  columns: computed(function() {
    return [{
      label: '',
      avatarUrlPath: 'row.subject.avatarUrl',
      avatarNamePath: 'row.subject.name',
      width: '40px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'App',
      cellComponent: 'activity-logs/light-cell',
      valuePath: 'title',
    }];
  }),
  discriminatorDescriptions: {
    "1": "blox",
    "2": "app",
    "3": "case",
    "4": "comment",
    "5": "membership",
    "6": "membership request",
    "7": "issue",
    "8": "note"
  },
  predicateDescriptions: {
    "CREATED_ISSUE": "created issue",
    "UPDATED_ISSUE": "updated issue",
    "CREATED_NOTE": "created note",
    "UPDATED_NOTE": "updated note",
    "COMMENTED": "commented",
    "BECAME_MEMBER_OF": "joined"
  }
});

export default ActivityLog;
