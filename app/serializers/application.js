// app/serializers/application.js
import Ember from 'ember';
import DS from 'ember-data';
import { pluralize } from "ember-inflector";

export default DS.RESTSerializer.extend({
  /*keyForRelationship: function(key) {
      return Ember.String.decamelize(key);
  }*/
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {

    let normalizedPayload = payload;

    // wrap response in object as modelName-based property
    if(payload && payload.id === id){
      normalizedPayload = {};
      normalizedPayload[primaryModelClass.modelName] = payload;
    }

    const result = this._super(store, primaryModelClass, normalizedPayload, id, requestType);

    return result;
  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {

    let normalizedPayload = payload;
    if(payload){
      // wrap payload to pluralized model name
      if(Ember.isArray(payload)){
        normalizedPayload = {};
        normalizedPayload[pluralize(primaryModelClass.modelName)] = payload;
      }
      // rename "content" to pluralized model name
      else if(payload && Ember.isArray(payload.content)){
        normalizedPayload[pluralize(primaryModelClass.modelName)] = normalizedPayload.content;
        delete normalizedPayload.content;
      }
    }

    // init meta
    normalizedPayload.meta || (normalizedPayload.meta = {});

    // move "links" into meta
    if(normalizedPayload.links !== undefined){
      normalizedPayload.meta.links = normalizedPayload.links;
      delete normalizedPayload.links;
    }

    // move "page" into meta
    if(normalizedPayload.page !== undefined){
      normalizedPayload.meta.page = normalizedPayload.page;
      delete normalizedPayload.page;
    }

    // move "urlParameters" into meta
    if(normalizedPayload.urlParameters !== undefined){
      normalizedPayload.meta.urlParameters = normalizedPayload.urlParameters;
      delete normalizedPayload.urlParameters;
    }

    const result = this._super(store, primaryModelClass, normalizedPayload, id, requestType);

    return result;
  },
  serialize(snapshot, options) {
    console.log("serialize options: ");
    console.log(options);
    let json = this._super(snapshot, options);//snapshot.serialize(options);

    console.log('RESTSerializer wrapped json: ');
    console.log(json);
/*
    // unwrap object
    for(var propName in json){
      json = json[propName];
      break;
    }
    console.log('RESTSerializer unwrapped json: ');
    console.log(json);
    */
    return json;
  },
});
