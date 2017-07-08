import Ember from 'ember';
import Table from 'ember-light-table';
import SearchParamsMixin from './search-params';
import {task} from 'ember-concurrency';

const {
  inject,
  isEmpty,
  computed
} = Ember;

export default Ember.Mixin.create(SearchParamsMixin, {
  store: inject.service(),
  /**
   * Maintains loading state
   */
  isLoading: computed.oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,
  /**
   * An iterable collection of fetched records
   */
  model: null,
  /**
   * Page and other metadata
   */
  meta: null,
  /**
   * The table columns definitions to use
   */
  columns: null,
  table: null,
  /**
   * Call super, initialize columns config if needed, create table component
   */
  init() {
    this._super(...arguments);

    const modelName = this.get('modelName');

    // Find the right columns to use if none are given
    if (!this.get('columns')) {
      // Use default columns for model class if provided with a modelName
      console.log("table-common init, modelName: " + modelName);
      if (modelName) {
        const ModelType = this.get('store').modelFor(modelName);
        if (ModelType) {
          this.set('columns', ModelType.columns);
        }
      }
    }

    // Init table
    let table = new Table(this.get('columns'), this.get('model'), {enableSync: this.get('enableSync')});
    let sortColumn = table.get('allColumns').findBy('valuePath', this.get('sort'));

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }
    this.set('table', table);
  },
  fetchRecords: task(function*() {
    // get search parameters
    let searchParams = this.getSearchParams();
    console.log('table search params: ');
    console.log(searchParams);
    let records = yield this.get('store').query(this.get('modelName'), searchParams);
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
