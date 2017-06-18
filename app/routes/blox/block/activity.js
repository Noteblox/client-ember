
import BaseSearch  from '../../base-search';

const BlockActivityRoute = BaseSearch.extend( {
  modelTypeName: 'activity-log',
  showRowRoute: 'space-apps',
});

BlockActivityRoute.reopen({
  actions: {
    showRow(source, model, e){

      let routeName;

      // if note
      /*if(model.get('object.quote')){
        routeName = 'notes.note'
      }
      // if case
      else*/ if(model.get('object.name')){
        routeName = 'issues.issue'
      }
      // else block
      else{
        routeName = 'blox.block'
      }
      console.log("showRow, routeName: " + routeName + ", args: ");
      console.log(arguments);
      console.log("showRow, model: ");
      console.log(model);
      console.log("showRow, e: ");
      console.log(e);
      if(route){
        this.transitionTo(route, model);
      }
    },
  }
});


export default BlockActivityRoute;
