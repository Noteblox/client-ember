import Ember from 'ember';
import DS from 'ember-data';

const {
  computed
} = Ember;


const statusNames = {
  'SENT_REQUEST': 'Requested',
  'SENT_INVITE': 'Invited',
  'CONFIRMED': 'Confirmed',
  'BLOCK_REQUEST': 'Block requests',
  'BLOCK_INVITE': 'Block invites',
}
const ContextMembershipRequest = DS.Model.extend({

  status: DS.attr('string'),
  createdDate: DS.attr('utc'),
  user: DS.attr(),//DS.belongsTo('user'),
  context: DS.attr(),//DS.belongsTo('base-context'),

  statusName: computed('status', function() {
    return statusNames[this.get('status')];
  }),
});

ContextMembershipRequest.reopenClass({

  columns: computed(function () {
      return [{
      label: 'Avatar',
      avatarUrlPath: 'user.avatarUrl',
      avatarNamePath: 'user.name',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'Handle',
      valuePath: 'user.username',
    }, {
      label: 'Name',
      valuePath: 'user.name',
    }, {
      label: 'Sent',
      valuePath: 'createdDate',
      cellComponent: 'from-now-cell'
    }, {
      label: 'Status',
      valuePath: 'statusName',
    }];
  })
});

export default ContextMembershipRequest;
