import Ember from 'ember';
import Table from 'ember-light-table';
import { task } from 'ember-concurrency';

const {
  inject,
  isEmpty,
  computed
} = Ember;

export default Ember.Mixin.create({
  modelType: '',
  store: inject.service(),

  page: 0,
  limit: 10,
  dir: 'asc',
  sort: 'name',

  isLoading: computed.oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,

  model: null,
  meta: null,
  columns: null,
  table: null,
  jsonApiSort: Ember.computed('sort', 'dir', function(){

    return this.get('dir') == "desc" ? '-' + this.get('sort') : this.get('sort');
  }),
  init() {
    this._super(...arguments);

    let table = new Table(this.get('columns'), this.get('model'), { enableSync: this.get('enableSync') });
    let sortColumn = table.get('allColumns').findBy('valuePath', this.get('sort'));

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
  },

  fetchRecords: task(function*() {
    let sort = this.get('sort');
    let searchParams = {
      page: {
        number: this.get('page') - 1,
        size: this.get('limit')
      },
      sort: this.get('jsonApiSort')
    };
    let records = yield this.get('store').query(this.get('modelType'), searchParams);
    this.get('model').pushObjects(records.toArray());
    this.set('meta', records.get('meta'));
    this.set('canLoadMore', !isEmpty(records));
  }).restartable(),

  actions: {
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.get('fetchRecords').perform();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          canLoadMore: true,
          page: 0
        });
        this.get('model').clear();
      }
    }
  }
});
