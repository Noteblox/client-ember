import Ember from 'ember';
import DS from "ember-data";

import { singularize } from "ember-inflector";
const {
  computed
} = Ember;


const Base = DS.Model.extend({
  pathFragment: DS.attr('string')
});



export default Base;
