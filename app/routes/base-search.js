import Ember  from 'ember';
import BaseAuthenticated  from './base-authenticated';

export default BaseAuthenticated.extend( {
  modelTypeName: null,
  showRowRoute: null,
  // ember paper data table
  totalPages: 0,
  limitOptions: Ember.A([5,10,15]),
  limit: 10,
  page: 1,
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
    return this.store.query(this.get('modelTypeName'), {
      page: {
        number: params.number,
        size: params.size
      }
    }).toArray();
  },
  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    }
  },
  afterModel: function(model, transition) {
    this._super(model, transition);
    if(model){
      const meta = model.get('meta');
      if(meta){
        this.set("page", meta.get('number'));
        this.set("limit", meta.get('size'));
        this.set("totalPages", meta.get('totalPages'));
        const links = model.meta.documentLinks;
        console.log("afterModel, links: ");
        console.log(links);
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
