//app/routes/base-authenticated.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  breadCrumbModelTitleProperty: 'name',
  // add calculated property dynamically based on "breadCrumbModelTitleProperty"
  // to determine breadcrumb name
  afterModel(model, transition) {
    console.log('base-authenticated#afterModel');
    this._super(...arguments);

    let breadCrumbSet = false;

    let modelTitleProperty = model ?  this.get('breadCrumbModelTitleProperty') : false;
    if(modelTitleProperty){
      modelTitleProperty = `controller.model.${modelTitleProperty}`;

      Ember.defineProperty(this, 'breadCrumb', Ember.computed('breadCrumbTitle', modelTitleProperty, function(){

        let breadCrumb;
        const modelName = this.get(modelTitleProperty) || false;
        console.log('breadcrumb model-based title: ' + modelName);
        if(modelName){
          breadCrumb = {};
          breadCrumb.title = modelName;
        }
        return breadCrumb;
      }));
    }
    else {
      console.log("afterModel: no breadcrumb modelTitleProperty was found")
    }
  },
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
