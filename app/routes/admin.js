import Ember from 'ember';
import EmberAdminRouteAdmin from 'ember-admin/routes/admin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default EmberAdminRouteAdmin.extend(AuthenticatedRouteMixin, {

});