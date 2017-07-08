import Ember from 'ember';
import Table from 'ember-light-table';
import {task} from 'ember-concurrency';

const {
  inject,
  isEmpty,
  computed
} = Ember;

export default Ember.Mixin.create({

  /**
   * Either 'rest' or 'jsonapi'
   */
  apiType: 'rest',
  /**
   * The model type key. Used to retrieve the model class and it's metadata
   * from the injected store
   */
  modelName: null,
  /**
   * The property name to sort by
   */
  sort: 'id',
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
   * Utility method used to obtain a proper URL param for sorting
   */
  jsonApiSort: Ember.computed('sort', 'dir', function () {
    return this.get('dir') == "desc" ? '-' + this.get('sort') : this.get('sort');
  }),
  /**
   * The property name of the *-to-one relationship to use when searching
   */
  belongsToName: null,
  /**
   * The property name of related object to use for the query. Defaults to 'id'
   */
  belongsToPropertyName: 'id',
  /**
   * The property value of the *-to-one relationship to use when searching
   */
  belongsToValue: null,
  getSearchParams(params) {
    // ensure params is not undefined
    params || (params = {});

    console.log('getSearchParams, given params:')
    console.log(params);
    let sort = this.get('sort');
    let searchParams = {};

    let pageNumber = params.number ? params.number : this.get('page') - 1;
    let pageSize = params.size ? params.size : this.get('limit') - 1;
    let belongsToName = this.get('belongsToName');
    let belongsToPropertyName = this.get('belongsToPropertyName');
    let belongsToValue = this.get('belongsToValue');

    console.log('getSearchParams, belongsToName: ' + belongsToName + ', belongsToValue: ' + belongsToValue)

    // add sorting
    searchParams.sort = this.get('jsonApiSort');

    const apiType = this.get('apiType');
    // add page number and size
    if(apiType == 'jsonapi'){
      searchParams.page = {
        number: pageNumber,
        size: pageSize
      };
      // todo: parent filter
    }
    else {// rest
      searchParams['_pn'] = pageNumber;
      searchParams['_ps'] = pageSize;

      // set parent
      if(belongsToName && belongsToValue){
        searchParams[belongsToName + '.' + belongsToPropertyName] = belongsToValue;
      }

    }

    console.log('getSearchParams, return:')
    console.log(searchParams);
    return searchParams;
  },
});
