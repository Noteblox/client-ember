import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  serialize: function(value) {
    return value ? value.toUpperCase() : value;
  },

  deserialize: function(value) {
    const newValue = value ? value.toLowerCase() : value;
    console.log("deserialize value: " + value + ", newValue: " + newValue);
    return newValue;
  }
});
