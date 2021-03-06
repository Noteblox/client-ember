import Ember from 'ember';
import DS from "ember-data";


const Resource = Ember.Mixin.create({

  pathFragment: DS.attr('string'),
  path: DS.attr('string'),

  name: DS.attr('string'),
  title: DS.attr('string'),
  detail: DS.attr('string'),

  createdDate: DS.attr('utc'),
  lastModifiedDate: DS.attr('utc'),

  createdBy: DS.attr(),//DS.belongsTo('user', {async: false, inverse: null  }),
  lastModifiedBy: DS.attr() //DS.belongsTo('user', {async: false, inverse: null }),
});


export default Resource;
