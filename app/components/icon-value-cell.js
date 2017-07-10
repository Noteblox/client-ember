import Ember from 'ember';
import layout from 'noteblox-client-ember/templates/components/icon-value-cell';

const {
  Component,
  computed
} = Ember;

const IconValueCell = Component.extend({
  layout,
  iconClass: null,
});


export default IconValueCell;
