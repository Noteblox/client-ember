import Ember from "ember";
import config from "./config/environment";
//import adminRouter from 'ember-admin/router';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function () {
    // Add ember- admin routes
    //adminRouter(this);
    this.route('about');
    this.route('contact');
    this.route('not-found', {path: '/*path'});
    this.route('server-error', {path: '/auth/500'});
    this.route('login', {path: '/auth/login'});
    this.route('register', {path: '/auth/register'});
    this.route('user');
    this.route('forgot-password');
    this.route('protected');

    this.route('application-embed');
    this.route('account');
    this.route('confirmationEmail');
    this.route('friends', function () {
        this.route('show', {
            path: ':friend_id'
        });
    });

    this.route('users', function () {
        this.route('new');

        this.route('edit', {
            path: ':user_id/edit'
        });

        this.route('show', {
            path: ':user_id'
        });
    });
    this.route('home');
    this.route('accountandprofile');
    this.route('configureapps');
    this.route('statistics');
    this.route('systemsettings');
    this.route('clientplans');
    this.route('billing');


    this.route('auth', function () {
        this.route('login');
        this.route('register');
        this.route('forgot-password');
    });

    this.route('photo', {path: '/photo/:photo_id'}, function () {
        this.route('comment', {path: '/comment/:comment_id'});
    });


    this.route('blox', function () {
      this.route('new');
      this.route('find', function () {
        this.route('joined');
        this.route('owned');
      });
      this.route('block', {path: ':block_id'}, function () {
        this.route('settings');
        this.route('members');
        this.route('billing');
        this.route('membership-requests');
        this.route('apps');

        this.route('activity');
      });
    });
    this.route('context-membership');
    this.route('context-membership-request');
    this.route('hosts', function () {
        this.route('new');

        this.route('edit', {
            path: ':host_id/edit'
        });

        this.route('show', {
            path: ':host_id'
        });
    });
    this.route('space-apps', function () {
        this.route('new');

        this.route('edit', {
            path: ':space-app_id/edit'
        });

        this.route('show', {
            path: ':space-app_id'
        });


      this.route('app', {path: ':app_id'}, function () {
        this.route('settings');
        this.route('members');
        this.route('membership-requests');
      });
    });

    this.route('cases', function () {
      this.route('new');
      this.route('case', {path: ':case_id'}, function () {
          this.route('comments');
      });

      this.route('edit', {
          path: ':case_id/edit'
      });

    });
    this.route('case-comments', function () {
        this.route('new');

        this.route('edit', {
            path: ':case-comment_id/edit'
        });

        this.route('show', {
            path: ':case-comment_id'
        });
    });
    this.route('help');
    this.route('notes');
    this.route('tasks');
});

export default Router;
