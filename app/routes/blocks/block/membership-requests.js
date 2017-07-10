import Ember from 'ember';
import BaseSearch  from '../../base-search';

const MemberRequestSearchRoute = BaseSearch.extend({
  modelName: 'context-membership-request',
  showRowRoute: 'users.user',
  belongsToName: 'context',
  breadCrumb: {
    title: 'Requests'
  },
});


MemberRequestSearchRoute.reopen({

  actions: {

    showRow(source, model, e){
      const route = this.get('showRowRoute');
      console.log("showRow, route: " + route + ", args: ");
      console.log(arguments);
      console.log("showRow, model: ");
      console.log(model);
      console.log("showRow, e: ");
      console.log(e);
      if(route){
        this.transitionTo(route, model.get('user').id);
      }
    },
  }
});

export default MemberRequestSearchRoute;
