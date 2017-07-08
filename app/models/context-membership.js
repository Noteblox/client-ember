import DS from 'ember-data';

export default DS.Model.extend({
  admin: DS.attr('boolean'),
  createdDate: DS.attr('utc'),
  user: DS.attr(),//DS.belongsTo('user'),
  context: DS.attr(),//DS.belongsTo('base-context'),
});
