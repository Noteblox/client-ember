import Ember from 'ember';
import Table from 'ember-light-table';
import {task} from 'ember-concurrency';

const {
  inject,
  isEmpty,
  computed
} = Ember;

export default Ember.Mixin.create({
  store: inject.service(),
  /**
   * The model type key. Used to retrieve the model class and it's metadata
   * from the injected store
   */
  modelName: null,
  /**
   * The current page number, one-based. The corresponding URL parameter will be converted
   * to zero-based when fetching a page of models.
   */
  page: 0,
  /**
   * The page size. defaults to ten.
   */
  limit: 10,
  /**
   * Sorting direction, either asc or desc
   */
  dir: 'asc',
  /**
   * The property name to sort by
   */
  sort: 'name',
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
   * Utility method used to obtain a proper URL param for sorting
   */
  jsonApiSort: Ember.computed('sort', 'dir', function () {
    return this.get('dir') == "desc" ? '-' + this.get('sort') : this.get('sort');
  }),
  /**
   * Call super, initialize columns config if needed, create table component
   */
  init() {
    this._super(...arguments);

    // Find the right columns to use if none are given
    if (!this.get('columns')) {
      // Use default columns for model class if provided with a modelName
      const modelName = this.get('modelName');
      if (modelName) {
        const ModelTypw = this.get('store').modelFor(modelName);
        if (ModelTypw) {
          this.set('columns', ModelTypw.columns);
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
    let sort = this.get('sort');
    let searchParams = {
      page: {
        number: this.get('page') - 1,
        size: this.get('limit')
      },
      sort: this.get('jsonApiSort')
    };
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
