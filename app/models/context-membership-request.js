import DS from 'ember-data';

export default DS.Model.extend({

  // SENT_REQUEST, SENT_INVITE, CONFIRMED, BLOCK_REQUEST, BLOCK_INVITE
  status: DS.attr('string'),
  createdDate: DS.attr('utc'),
  user: DS.belongsTo('user'),
  context: DS.belongsTo('base-context'),

});
