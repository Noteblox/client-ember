import DS from 'ember-data';
import Resource from './application';

export default Resource.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    owner: { embedded: 'always' },
  }
});
