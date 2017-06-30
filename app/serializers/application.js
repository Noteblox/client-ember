// app/serializers/application.js
import Ember from 'ember';
import DS from 'ember-data';
import { pluralize } from "ember-inflector";

export default DS.JSONSerializer.extend({
  /*keyForRelationship: function(key) {
      return Ember.String.decamelize(key);
  }*/
/*
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    console.log("normalizeSingleResponse");
    let normalizedPayload = payload;

    // wrap response in object as modelName-based property
    if(payload && payload.id === id){
      normalizedPayload = {};
      normalizedPayload[primaryModelClass.modelName] = payload;
    }

    const result = this._super(store, primaryModelClass, normalizedPayload, id, requestType);

    return result;
  },
*/
  /**
   *
   * @method serializeBelongsTo
   * @param {DS.Snapshot} snapshot
   * @param {Object} json
   * @param {Object} relationship
   */
  serializeBelongsTo(snapshot, json, relationship) {
    this._super(snapshot, json, relationship);
    let key = relationship.key;
    let payloadKey = this._getMappedKey(key, snapshot.type);
    if (payloadKey === key && this.keyForRelationship) {
      payloadKey = this.keyForRelationship(key, "belongsTo", "serialize");
    }

    if(Ember.typeOf(json[payloadKey]) == 'string'){
      json[payloadKey] = {id: json[payloadKey]};
    }

  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    console.log("normalizeArrayResponse, payload:");
    console.log(payload);

    const result = this._super(store, primaryModelClass, (payload && payload.content ? payload.content : []), id, requestType);

    /*
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
     */

    // init meta
    result.meta || (result.meta = {});

    // move "links" into meta
    if(payload.links !== undefined){
      result.meta.links = payload.links;
    }

    // move "page" into meta
    if(payload.page !== undefined){
      result.meta.page = payload.page;
    }

    // move "urlParameters" into meta
    if(payload.urlParameters !== undefined){
      result.meta.urlParameters = payload.urlParameters;
    }

    console.log("normalizeArrayResponse, result:");
    console.log(result);
    return result;
  },

  /*
  serialize(snapshot, options) {
    console.log("serialize options: ");
    console.log(options);
    let json = this._super(snapshot, options);//snapshot.serialize(options);

    console.log('RESTSerializer wrapped json: ');
    console.log(json);

    // unwrap object
    for(var propName in json){
      json = json[propName];
      break;
    }
    console.log('RESTSerializer unwrapped json: ');
    console.log(json);

    return json;
  },
*/
});
