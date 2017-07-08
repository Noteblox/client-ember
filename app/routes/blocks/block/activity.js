
import BaseSearch  from '../../base-search';

const BlockActivityRoute = BaseSearch.extend( {
  modelName: 'activity-log',
  showRowRoute: 'space-apps',
  belongsToName: 'context',
  /**
   * The property name of related object to use for the query. Defaults to 'id'
   */
  belongsToPropertyName: 'path',
  getBelongsToValue() {
    const val = this.get('belongsToValue');
    return val ? val + '%' : val;
  },
});

BlockActivityRoute.reopen({

  beforeModel: function(transition) {
    this._super(transition);
    const belongsToValue =  this.get('belongsToValue');
    if(belongsToValue){
      this.set('belongsToValue', belongsToValue + '%');
    }
  },
  actions: {

    showRow(source, model, e){

      console.log("showRow, e: ");
      console.log(e);

      let routeName;
      let routeModel;
      let discriminator = model.get('discriminator');
      let predicate = model.get('predicate');


      // if note/issue
      if (predicate == 'CREATED_NOTE' || predicate == 'UPDATED_NOTE'
        || predicate == 'CREATED_ISSUE' || predicate == 'UPDATED_ISSUE') {
        routeName = 'cases.case.index';
        routeModel = model.get('object.id');
        console.log("showRow, issue/note: ");
        console.log(model.get('object'));
      }
      // else block
      else if (predicate == 'BECAME_MEMBER_OF') {
        routeName = 'blox.block.index'
        routeModel = model.get('context.id');
        console.log("showRow, context: ");
        console.log(model.get('context'));
      }
      console.log("showRow, discriminator: " + discriminator + ", routeName: " + routeName + ", routeModel: ");
      console.log(routeModel);
      if (routeName) {
        this.transitionTo(routeName, routeModel);
      }
    },
  }
});


export default BlockActivityRoute;
