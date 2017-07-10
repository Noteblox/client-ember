import Ember from 'ember';
import BaseSearch  from '../../base-search';

const MemberSearchRoute = BaseSearch.extend({

  modelName: 'context-membership',
  showRowRoute: 'users.user',
  belongsToName: 'context',
  breadCrumb: {
    title: 'Members'
  },
});


MemberSearchRoute.reopen({

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

export default MemberSearchRoute;
