import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const {
  computed
} = Ember;

export default Ember.Component.extend(TableCommon, {
  modelType: 'user',
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
  }),

  init() {
    this._super(...arguments);
    this.send('setPage', 1);
  },

  actions: {
    setPage(page) {
      let totalPages = this.get('meta.totalPages');
      let currPage = this.get('page');

      if (page < 1 || page > totalPages || page === currPage) {
        return;
      }

      this.set('page', page);
      this.get('model').clear();
      this.get('fetchRecords').perform();
    }
  }
});
