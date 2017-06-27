import DS from 'ember-data';
import config from "../config/environment";
import Base from './base-context';

export default Base.extend({

  normalizeFindRecordResponse: function(store, type, payload, id, requestType) {
    if(payload){
      payload.links || (payload.links = {});
      payload.links.comments = `${config.apiHost}/${config.namespace}/caseComments?parentCase=` + id + "&sort=-createdDate";
      console.log("normalizeFindRecordResponse, links: ");
      console.log(payload.links);
   }
   else {
      console.warn("normalizeFindRecordResponse, no payload: ");

    }
   return this._super(...arguments);
  }

});
