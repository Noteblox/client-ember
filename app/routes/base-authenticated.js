//app/routes/base-authenticated.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  //authenticationRoute: 'auth.login'
  /*
  userSession: service('session-account'),
  sessionAuthenticated() {
    console.log("base-authenticated#sessionAuthenticated, arguments: ");
    console.log(arguments);
    this._super(...arguments);
    const _this = this;
    this._loadCurrentUser().then(function(currentUser) {
      console.log("base-authenticated#sessionAuthenticated, currentUser: ");
      console.log(currentUser);
      if(!currentUser || !currentUser.id){
        _this.get('session').invalidate();
      }
      else{
        this.transitionTo('/');
      }
    }, function(reason) {
      // on rejection
      _this.get('session').invalidate();
    });

  },
/*
  _loadCurrentUser() {
    console.log("base-authenticated#_loadCurrentUser ");
    return this.get('userSession').loadCurrentUser();
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
  */
});
