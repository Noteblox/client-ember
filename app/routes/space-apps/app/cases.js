import BaseSearch from "./../../base-search";

const CasesView = BaseSearch.extend({
  modelName: 'case',
  showRowRoute:'cases.case.index',
  belongsToName: 'parentApplication'
});


export default CasesView;
