// app/controllers/login.js
import Ember from "ember";

import ApplicationController from '../application';

export default ApplicationController.extend({

  actions: {
    authenticate: function() {
      const credentials = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:custom', credentials).catch((reason)=>{
        console.log("authentication error:");
        console.log(reason);
        let responseJson = reason && reason.responseJSON ? reason.responseJSON : {};
        this.set('errorMessage', responseJson.title || responseJson.message || reason.error || reason);
      });
    }

  }
});
