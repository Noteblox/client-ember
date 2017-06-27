import Ember from 'ember';
import DS from "ember-data";
import Base from "./base";


const Resource = Base.extend({

  name: DS.attr('string'),
  title: DS.attr('string'),
  detail: DS.attr('string'),
  createdDate: DS.attr('utc'),
  createdBy: DS.attr()
});


export default Resource;
