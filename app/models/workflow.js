import DS from 'ember-data';

export default DS.Model.extend( {
  name: DS.attr('string'),
  description: DS.attr('string'),
  comments: DS.hasMany('case-status', {async: true})
});
