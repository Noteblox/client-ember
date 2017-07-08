import Ember from "ember";
import moment from 'moment';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  //session: service('session'),

  user: null,
  userDetailsChanged: Ember.observer('user', function() {
    console.log('userDetailsChanged, user: ' + this.get('user.name'));
    this.resetLocale();
  }),
  resetLocale() {
    const user = this.get('user');
    console.log('resetLocale, user: ');
    console.log(user);

     if (user) {

       // moment config
       //const moment = this.get('moment');

       // update the global locale?
       const userLocale = user.get ? user.get('locale') : user.locale;
       if (userLocale && userLocale !== moment.locale()) {
         // load the locale if needed
         if (moment.locales().indexOf(userLocale) === -1) {
            Ember.$.getScript(`/assets/moment-locales/${userLocale}.js`);
         }
         // update locale
         moment.setLocale(userLocale);
         // Globally set Timezone
         // moment.setTimeZone('America/Los_Angeles');
       }
     }

  }
});
