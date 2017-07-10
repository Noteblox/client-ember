import BaseSearch  from '../../base-search';

const Route = BaseSearch.extend( {
  modelName: 'space-app',
  belongsToName: 'space',
  showRowRoute: 'space-apps.app',
  showNewRowRoute: 'space-apps.new',

});



export default Route;
