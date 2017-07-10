// app/routes/application.js
import Ember from "ember";
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {

  session: service('session'),
  /**
   This method handles the session's
   {{#crossLink "SessionService/authenticationSucceeded:event"}}{{/crossLink}}
   event. If there is a transition that was previously intercepted by the
   {{#crossLink "AuthenticatedRouteMixin/beforeModel:method"}}
   AuthenticatedRouteMixin's `beforeModel` method{{/crossLink}} it will retry
   it. If there is no such transition, the `ember_simple_auth-redirectTarget`
   cookie will be checked for a url that represents an attemptedTransition
   that was aborted in Fastboot mode, otherwise this action transitions to the
   {{#crossLink "Configuration/routeAfterAuthentication:property"}}{{/crossLink}}.
   @method sessionAuthenticated
   @public
   */
  sessionAuthenticated() {
    this._super(...arguments);
    const userDetails = this.get('session.userDetails');
    console.log('application sessionAuthenticated, userDetails: ' + (userDetails ? userDetails.get('name') : userDetails));
  },
  /**
   This method handles the session's
   {{#crossLink "SessionService/invalidationSucceeded:event"}}{{/crossLink}}
   event. __It reloads the Ember.js application__ by redirecting the browser
   to the application's root URL so that all in-memory data (such as Ember
   Data stores etc.) gets cleared.
   If the Ember.js application will be used in an environment where the users
   don't have direct access to any data stored on the client (e.g.
   [cordova](http://cordova.apache.org)) this action can be overridden to e.g.
   simply transition to the index route.
   @method sessionInvalidated
   @public
   */
  sessionInvalidated() {
    this._super(...arguments);
  },

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },
    logout: function() {
      this.get('session').close();
    },
    transitionToRouteName: function(routeName, model){
      this.transitionTo(routeName, model);
    }
  }

});
