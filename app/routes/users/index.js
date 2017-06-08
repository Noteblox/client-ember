import BaseAuthenticated  from '../base-authenticated';

export default BaseAuthenticated.extend( {
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    }
  },
  model: function(params) {
    console.log("model, params: ");
    console.log(params);
    return this.store.query('user', {
      page: {
        number: params.number,
        size: params.size
      }
    }).toArray();
  },
});
