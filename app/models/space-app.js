import Ember from 'ember';
import DS from 'ember-data';
import BaseContext from './base-context';

const {
  computed
} = Ember;

const App = BaseContext.extend({
  viewRouteName: 'space-apps.app',
  space: DS.attr(),//DS.belongsTo('workflow'),
  workflow: DS.attr(),//DS.belongsTo('workflow'),
  openCasesCount: DS.attr('number'),
  cases: DS.hasMany('case', {async: true, polymorphic: true/*, inverse: 'parentCase'*/})

});

App.reopenClass({
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
    },{
      label: 'Cases',
      valuePath: 'openCasesCount',
      width: '60px',
      cellComponent: 'space-apps/case-count-cell',
    }];
  })
});
export default App;

