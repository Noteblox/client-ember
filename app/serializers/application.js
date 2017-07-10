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
  /**
   @method _normalizeResponse
   @param {DS.Store} store
   @param {DS.Model} primaryModelClass
   @param {Object} payload
   @param {String|Number} id
   @param {String} requestType
   @param {Boolean} isSingle
   @return {Object} JSON-API Document
   @private
   */
  _normalizeResponse(store, primaryModelClass, payload, id, requestType, isSingle) {
    let documentHash = {
      data: null,
      included: []
    };

    let meta = this.extractMeta(store, primaryModelClass, payload);
    if (meta) {
      assert('The `meta` returned from `extractMeta` has to be an object, not "' + Ember.typeOf(meta) + '".', Ember.typeOf(meta) === 'object');
      documentHash.meta = meta;
    }

    if (isSingle) {
      let { data, included } = this.normalize(primaryModelClass, payload);
      documentHash.data = data;
      if (included) {
        documentHash.included = included;
      }
    } else {

      // setup data
      let content = payload.content;
      let ret = new Array(content ? content.length : 0);
      if(content){
        for (let i = 0, l = content.length; i < l; i++) {
          let item = content[i];
          let { data, included } = this.normalize(primaryModelClass, item);
          if (included) {
            documentHash.included.push(...included);
          }
          ret[i] = data;
        }
      }
      documentHash.data = ret;


      // add "page" and "urlParameters" to meta
      if(payload.page !== undefined){
        documentHash.meta || (documentHash.meta = {});
        documentHash.meta.page = payload.page;
      }
      if(payload.urlParameters !== undefined){
        documentHash.meta || (documentHash.meta = {});
        documentHash.meta.urlParameters = payload.urlParameters;
      }
      if(payload.links !== undefined){
        //documentHash.meta || (documentHash.meta = {});
        //documentHash.meta.links = payload.links;
        documentHash.links = payload.links;
      }
    }

    console.log('_normalizeResponse, documentHash: ');
    console.log(documentHash);
    return documentHash;
  },
  /*
   @method normalize
   @param {DS.Model} typeClass
   @param {Object} hash
   @return {Object}
   */
  normalize(modelClass, resourceHash) {
    let data = null;

    if (resourceHash) {
      this.normalizeUsingDeclaredMapping(modelClass, resourceHash);
      if (Ember.typeOf(resourceHash.links) === 'object') {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash.links);
      }

      data = {
        id:            this.extractId(modelClass, resourceHash),
        type:          modelClass.modelName,
        attributes:    this.extractAttributes(modelClass, resourceHash),
        relationships: this.extractRelationships(modelClass, resourceHash)
      };
      //console.log('normalize, data: ');
      //console.log(data);
      this.applyTransforms(modelClass, data.attributes);
    }

    return { data };
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
