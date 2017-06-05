// app/adapters/account.js
import Ember from 'ember';
import ApplicationAdapter from './application';
import {singularize, pluralize} from 'ember-inflector';

export default ApplicationAdapter.extend({

  pathForType: function(type) {
    console.log("pathForType,ISSUE/NOTE type: " + type);
    //const newType = Ember.String.camelize(type);
    console.log("pathForType,ISSUE/NOTE type: " + type);
    return pluralize('note');
  },
});
