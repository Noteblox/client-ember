import DS from 'ember-data';
import BaseCase from './base-case';

export default BaseCase.extend({
  visibility: DS.attr('string'),
  comments: DS.hasMany('case-comment', {async: true/*, inverse: 'parentCase'*/})
});
