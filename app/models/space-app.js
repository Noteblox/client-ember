import Ember from 'ember';
import DS from 'ember-data';
import BaseContext from './base-context';

const {
  computed
} = Ember;

const App = BaseContext.extend({

});

App.reopenClass({
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
      cellComponent: 'space-apps/light-cell',
      valuePath: 'title',
    }, {
      label: 'Visibility',
      valuePath: 'visibility',
    }];
  })
});

export default App;
