import Ember from 'ember';
import DS from 'ember-data';
import BaseContext from "./base-context";

const {
  computed
} = Ember;


const Block =  BaseContext.extend({
  viewRouteName: 'blox.block',
});


export default Block;
