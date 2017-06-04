// app/routes/application.js

import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('session-account'),
  breadCrumbModelTitleProperty: 'name',
  // add calculated property dynamically based on "breadCrumbModelTitleProperty"
  // to determine breadcrumb name
  afterModel(model, transition) {
    this._super(...arguments);

    let breadCrumbSet = false;

    let modelTitleProperty = model ?  this.get('modelTitleProperty') : false;
    console.log("breadCrumbModelTitleProperty: " + modelTitleProperty);
    if(modelTitleProperty){
      modelTitleProperty = `controller.model.${modelTitleProperty}`;
      console.log("breadCrumbModelTitleProperty: " + modelTitleProperty);

      Ember.defineProperty(this, 'breadCrumb', Ember.computed('breadCrumbTitle', modelTitleProperty, function(){

        let breadCrumb;
        const modelName = this.get(modelTitleProperty) || false;
        if(modelName){
          breadCrumb = {};
          breadCrumb.title = modelName;
        }
        return breadCrumb;
      }));
    }
  },
  beforeModel(transition) {
    //this._super(transition, queryParams);
    // widget mode?
    if(document.getElementById("restdude-embedded")){
      console.log("Switching to embed mode...");
      this.transitionTo('application-embed');
    }
    else{

      return this._loadCurrentUser();
    }
  },


  sessionAuthenticated() {
    this._loadCurrentUser().then(()=>{
      this.transitionTo('/');
    }).catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  },
  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },
    logout: function() {
      this.get('session').close();
    }
  }
});
