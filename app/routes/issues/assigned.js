import Ember  from 'ember';
import BaseSearch  from '../base-search';

export default BaseSearch.extend( {
  templateName: 'issues/base-search',
  modelTypeName: 'issue',

  sessionAccount: Ember.inject.service(),
/*
  model: function(params) {
    var user =  this.get('sessionAccount.account');
    console.log("joined#model, user: ");
    console.log(user);
    if(!user || !user.id){
      throw "No user ID was found in session";
    }
    return this.store.query('issue', {
      page: {
        number: params.number,
        size: params.size,
      },
      //assignee: user.id
    });
  },
  */
});
