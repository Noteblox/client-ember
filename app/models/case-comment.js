import DS from 'ember-data';
import Resource from './resource';

const CaseComment = DS.Model.extend(Resource, {
  //parentCase: DS.attr(),//DS.attr()//('case' , {polymorphic: true, inverse: 'comments' }),
});


export default CaseComment;
