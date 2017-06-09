import BaseAuthenticated  from '../base-authenticated';

export default BaseAuthenticated.extend( {
  model: function(params) {
    console.log("model, params: ");
    console.log(params);
    return this.store.query('issue', {
      page: {
        number: params.number,
        size: params.size
      }
    }).toArray();
  },
});
