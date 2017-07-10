import BaseSearch  from '../base-search';

const Route = BaseSearch.extend( {
  modelName: 'block',
  showRowRoute: 'blocks.block',
  showNewRowRoute: 'blocks.new',
});



export default Route;
