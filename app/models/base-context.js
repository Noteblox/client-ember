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
  membershipsCount: DS.attr(),

  memberships: DS.hasMany('context-membership', {async: true/*, inverse: 'space'*/}),
  membershipRequests: DS.hasMany('context-membership-request', {async: true/*, inverse: 'space'*/}),


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
      label: 'Title',
      cellComponent: 'blocks/light-cell',
      valuePath: 'title',
    }, {
      label: 'Visibility',
      valuePath: 'visibility',
    },{
      label: 'Members',
      valuePath: 'membershipsCount',
      width: '60px',
      cellComponent: 'blocks/member-count-cell',
    }];
  })
});

export default BaseContext;
