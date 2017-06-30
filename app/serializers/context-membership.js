import DS from 'ember-data';
import config from "../config/environment";
import Base from './application';

export default Base.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    user: { embedded: 'always' },
    context: { embedded: 'always' },
  }

});
