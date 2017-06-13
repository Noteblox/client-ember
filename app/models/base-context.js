import Ember from 'ember';
import DS from "ember-data";

const {
  computed
} = Ember;


const BaseContext = DS.Model.extend({

  name: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  bannerUrl: DS.attr('string'),
  visibility: DS.attr('visibility', { defaultValue: "CLOSED" }),
  createdDate: DS.attr('utc'),
  owner: DS.belongsTo('user'),
  space: DS.attr(),
  memberships: DS.hasMany('context-membership'),
  membershipRequests: DS.hasMany('context-membership-request')

});


BaseContext.reopenClass({
  columns: computed(function() {
    return [{
      label: '',
      avatarUrlPath: 'avatarUrl',
      avatarNamePath: 'title',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'App',
      cellComponent: 'space-apps/light-cell'
    }, {
      label: 'Title',
      valuePath: 'title',
    }];
  })
});

export default BaseContext;
