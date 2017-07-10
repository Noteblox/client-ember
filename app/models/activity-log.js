import Ember from 'ember';
import DS from "ember-data";

const {
  computed
} = Ember;

const ActivityLog = DS.Model.extend({


  predicate: DS.attr('string'),
  createdDate: DS.attr('utc'),
  createdBy: DS.attr(),
  discriminator: DS.attr('string'),

  // User
  subject: DS.attr(),
  context: DS.attr(),
  object:  DS.attr(),
  predicateDescription: computed('predicate', 'discriminator', function() {
    return this.constructor.predicateDescriptions[this.get('predicate')] || this.constructor.predicateDescriptions['EVENT'];

  }),
  iconClass: computed('predicate', function() {
    return this.constructor.predicateIcons[this.get('predicate')] || this.constructor.predicateIcons['EVENT'];
  }),
});


ActivityLog.reopenClass({
  columns: computed(function () {
    return [{
      label: '',
      width: '50px',
      sortable: false,
      valuePath: 'predicateDescription',
      cellComponent: 'icon-cell'
    }, {
      label: '',
      sortable: false,
      cellComponent: 'activity-logs/overview-cell',
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

    "EVENT": 'participated',

    "COMMENTED": "commented in",

    "BECAME_MEMBER_OF": "is now a member of",
    "STOPPED_BEING_MEMBER_OF": "stopped being a member of",

    "CASE_CREATED": "created case",
    "CASE_UPDATED": "updated case",
    "CASE_COMMENTED": "commented in",

    "CREATED_ISSUE": "created issue",
    "UPDATED_ISSUE": "updated issue",

    "CREATED_NOTE": "created note",
    "UPDATED_NOTE": "updated note",
  },
  predicateIcons: {
    "EVENT": 'icon-event icons',

    "COMMENTED": 'icon-user-bubbles icons',

    "BECAME_MEMBER_OF": 'icon-user-following icons',
    "STOPPED_BEING_MEMBER_OF": 'icon-user-unfollow icons',

    "CASE_CREATED": 'icon-briefcase icons',
    "CASE_UPDATED": 'icon-briefcase icons',
    "CASE_COMMENTED": 'icon-briefcase icons',

    "CREATED_ISSUE": 'icon-support icons',
    "UPDATED_ISSUE": 'icon-support icons',

    "CREATED_NOTE": 'icon-notebook icons',
    "UPDATED_NOTE": 'icon-notebook icons',
  }
});

export default ActivityLog;
