import DS from 'ember-data';

export default DS.Model.extend({
  admin: DS.attr('boolean'),
  createdDate: DS.attr('utc'),
  user: DS.belongsTo('user'),
  context: DS.belongsTo('base-context'),
});
