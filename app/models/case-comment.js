import DS from 'ember-data';
import Resource from './resource';

const CaseComment = DS.Model.extend(Resource, {
  parentCase: DS.attr(),
});


export default CaseComment;
