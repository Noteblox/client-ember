import Ember from "ember";
import DS from "ember-data";
import Resource from "./resource";

const {
  computed
} = Ember;


const BaseContext = DS.Model.extend(Resource, {

  avatarUrl: DS.attr('string'),
  bannerUrl: DS.attr('string'),
  visibility: DS.attr('visibility', {defaultValue: "CLOSED"}),
  owner: DS.belongsTo('user'),
  //space: DS.attr(),
  membershipsCount: DS.attr(),

  memberships: DS.hasMany('context-membership', {async: true, inverse: 'space'}),
  membershipRequests: DS.hasMany('context-membership-request', {async: true, inverse: 'space'}),


});


BaseContext.reopenClass({
  columns: computed(function () {
    return [{
      label: '',
      avatarUrlPath: 'avatarUrl',
      avatarNamePath: 'title',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'App',
      cellComponent: 'space-apps/light-cell',
      valuePath: 'title',
    }, {
      label: 'Title',
      valuePath: 'title',
    }];
  })
});

export default BaseContext;
