import DS from 'ember-data';
import Base from './application';

export default Base.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    //createdBy: { embedded: 'always' },
    //lastModifiedBy: { embedded: 'always' },
  }
});
