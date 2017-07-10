import Ember from 'ember';
import DS from 'ember-data';

const {
  computed
} = Ember;

const ContextMembership = DS.Model.extend({
  admin: DS.attr('boolean'),
  createdDate: DS.attr('utc'),
  user: DS.attr(),//DS.belongsTo('user'),
  context: DS.attr(),//DS.belongsTo('base-context'),
});

ContextMembership.reopenClass({
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
      label: 'First Name',
      valuePath: 'user.firstName',
    }, {
      label: 'Last Name',
      valuePath: 'user.lastName',
    }, {
      label: 'Joined',
      valuePath: 'createdDate',
      cellComponent: 'from-now-cell'
    }];
  })
});

export default ContextMembership;
