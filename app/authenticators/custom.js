import Ember from "ember";
import ENV from "../config/environment";
import Base from "ember-simple-auth/authenticators/base";


const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default Base.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  userDetails: Ember.inject.service('user-details'),
  tokenEndpoint: `${ENV.apiHost}/${ENV.namespaceAuth}/jwt/access`,

  restore(data) {
    console.log('authenticatos/custom#restore, wrapping data: ');
    console.log(data);
    return new Promise((resolve, reject) => {
      // check for a valid user id
      console.log('authenticatos/custom#restore, data:');
      console.log(data);
      if (data && data.id) {
        reject();//resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(credentials) {
    const _this = this;
    // submitted credentials
    const data = JSON.stringify({
      username: (credentials.identification || credentials.username || credentials.email),
      password: credentials.password
    });
    // login request

    const requestOptions = {
      url: this.tokenEndpoint,
      type: 'POST',
      data,
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      crossDomain: true,
      xhrFields: { withCredentials: true }

    };
    return new Promise((resolve, reject) => {
      ajax(requestOptions).then((response) => {
        // Wrapping aync operation in Ember.run
        run(() => {
          //if (response && response.id) {
          console.log('authenticate response:');
          console.log(response);
            const store = _this.get('store');
            const modelClass = store.modelFor('user');
            const serializer = store.serializerFor('user');
            let user = response;// serializer.normalizeSingleResponse(store, modelClass, response);
            console.log('authenticate resolving users:');
            console.log(user);
          //user = store.push( user);
            _this.get('userDetails').set('user', user);

            console.log('authenticate resolving user:');
            console.log(user);
            resolve(user);
          //} else {
          //  reject(response);
          //}
        });
      }, (error) => {
        // Wrapping aync operation in Ember.run
        run(() => {
          reject(error);
        });
      });
    });
  },

  invalidate(data) {
     const requestOptions = {
      url: this.tokenEndpoint,
      type: 'DELETE',
      data,
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      crossDomain: true,
      xhrFields: { withCredentials: true }

    };
    return new Promise((resolve, reject) => {
      ajax(requestOptions).then((response) => {
        // Wrapping aync operation in Ember.run
        run(() => {
          resolve(response);
        });
      }, (error) => {
        // Wrapping aync operation in Ember.run
        run(() => {
          reject(error);
        });
      });
    });

}
});
