// app/models/user.js
import Ember from 'ember';
import DS from "ember-data";

const {
  computed
} = Ember;

const User = DS.Model.extend({
  name: DS.attr('string'),
  username: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  avatarUrl: DS.attr('string'),
  bannerUrl: DS.attr('string'),

  createdDate: DS.attr('utc'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string')
});

User.reopenClass({
  columns: computed(function() {
    return [{
      label: 'Avatar',
      valuePath: 'avatarUrl',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'Handle',
      valuePath: 'username',
      width: '150px'
    }, {
      label: 'First Name',
      valuePath: 'firstName',
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px'
    }];
  })
});

export default User;
