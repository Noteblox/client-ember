import DS from 'ember-data';
import Resource from './resource';
import config from "../config/environment";

export default Resource.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    //assignee: { embedded: 'always' },
    //parentApplication: { embedded: 'always' },
  },
  normalizeFindRecordResponse: function(store, type, payload, id, requestType) {
    if(payload){
      payload.links || (payload.links = {});
      payload.links.comments = `${config.apiHost}/${config.namespace}/caseComments?parentCase=` + id + "&_ps=100&sort=createdDate";
      console.log("normalizeFindRecordResponse, links: ");
      console.log(payload.links);
    }
    else {
      console.warn("normalizeFindRecordResponse, no payload: ");

    }
    return this._super(...arguments);
  }

});
