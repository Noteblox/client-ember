import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

/**
 * @module Light Table
 * @submodule Cell Types
 */

/**
 * @module Cell Types
 * @class Base Cell
 */

const Avatar = Component.extend({

  /**
   * @property value
   * @type {Mixed}
   */
  value: computed('rawValue', function() {
    let rawValue = this.get('rawValue');
    let format = this.get('column.format');

    if (format && typeof format === 'function') {
      return format.call(this, rawValue);
    }
    return rawValue;
  })
});


export default Avatar;
