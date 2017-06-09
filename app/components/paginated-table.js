import Ember from 'ember';
import TableCommon from '../mixins/table-common';

const {
  computed
} = Ember;

const PaginatedTable = Ember.Component.extend(TableCommon, {

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

export default PaginatedTable;
