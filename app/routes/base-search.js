import Ember  from 'ember';
import BaseAuthenticated  from './base-authenticated';
import SearchParamsMixin from '../mixins/search-params';

export default BaseAuthenticated.extend(SearchParamsMixin, {
  templateName: 'base-search',
  showRowRoute: null,
  // ember paper data table
  totalPages: 0,
  limitOptions: Ember.A([5,10,15]),

  init() {
    this._super(arguments);
    this.set('page', 1);
  },
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    let belongsToName = this.get('belongsToName');
    let belongsToValue = this.get('belongsToValue');
    controller.set('modelName', this.get('modelName'));
    controller.set('belongsToName', belongsToName);
    controller.set('belongsToValue', belongsToValue);
    controller.set('sort', this.get('sort'));
    controller.set('dir', this.get('dir'));
    controller.set('meta', this.get('meta'));

    console.log('setupController, belongsToName: ' + belongsToName + ', belongsToValue: ' + belongsToValue);

  },
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    },
    showRow(source, model, e){
      const route = this.get('showRowRoute');
      console.log("showRow, route: " + route + ", args: ");
      console.log(arguments);
      console.log("showRow, model: ");
      console.log(model);
      console.log("showRow, e: ");
      console.log(e);
      if(route){
        this.transitionTo(route, model);
      }
    },
    decrementPage() {
      let page = this.get('page');
      if (page > 0) {
        this.set('page', page - 1);
      }
    },
    incrementPage() {
      let page = this.get('page');
      let max = this.get('totalPages');
      if (page < max) {
        this.set('page', page + 1);
      }
    },
    toggleShowEdit(cell) {
      Ember.set(cell, 'showEdit', false);
    }
  },
  model: function(params) {
    console.log("model, params: ");
    console.log(params);
    const _this = this;
    return this.store.query(this.get('modelName'), this.getSearchParams(params)).toArray();
  },
  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    }
  },
  beforeModel: function(transition) {

    this._super(transition);
    // get parent route model
    let routeName = this.get('routeName');
    const lastDotIndex = routeName.lastIndexOf('.');
    if(lastDotIndex > 0){
      routeName = routeName.substring(0, lastDotIndex);
      const belongsToPropertyName = this.get('belongsToPropertyName');
      console.log('base-search#beforeModel routeName: ' + routeName + ', belongsToPropertyName: ' + belongsToPropertyName + ', parentRouteModel: ');
      const parentRouteModel = this.modelFor(routeName);
      console.log(parentRouteModel);
      if(parentRouteModel){
        const belongsToValue = Ember.getWithDefault(parentRouteModel, belongsToPropertyName, null);
        console.log('base-search#beforeModel parentRouteModelKey: ' + belongsToValue);
        this.set('belongsToValue', belongsToValue);
      }
    }
  },
  afterModel: function(model, transition) {
    this._super(model, transition);
    console.log("base-search#afterModel, model: ");
    console.log(model);
    if(model){
      const meta = model.get('meta');
      console.log("base-search#afterModel, meta: ");
      console.log(meta);

      if(meta){
        this.set("meta", meta.get('meta'));
        this.set("page", meta.get('number'));
        this.set("limit", meta.get('size'));
        this.set("totalPages", meta.get('totalPages'));
        const links = model.meta.documentLinks;
      }
    }
    /*
     this.set("controller.page", this.get('totalPages'));
     this.set("controller.limit", this.get('totalPages'));
     this.set("controller.totalPages", this.get('totalPages'));*/

  }
});

/*

 "meta":{
 "number":0,
 "last":false,
 "size":10,
 "numberOfElements":10,
 "totalPages":3,
 "sort":[
 {
 "direction":"ASC",
 "property":"id",
 "ignoreCase":false,
 "nullHandling":"NATIVE",
 "ascending":true,
 "descending":false
 }
 ],
 "first":true,
 "totalElements":21
 },
 */
