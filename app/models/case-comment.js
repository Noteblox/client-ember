import DS from 'ember-data';
import Resource from './resource';

const CaseComment = Resource.extend({
  visibility: DS.attr('string'),
  parentCase: DS.belongsTo('case', {async: true, inverse: 'comments' })
});


export default CaseComment;
