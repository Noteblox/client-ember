import DS from 'ember-data';
import config from "../config/environment";
import Resource from './application';

export default Resource.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    //parentCase: { embedded: 'always' }
  }
});
