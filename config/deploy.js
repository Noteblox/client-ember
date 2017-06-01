/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
      // always build the production environment
      build: {
          environment: 'production' // the default
      },
      // include other plugin configuration that applies to all deploy targets here

      git: {
          // The repo that we will deploy to. It defaults to the value of your containing repo's origin remote
          // repo: 'git@github.com:Noteblox/client-ember.git',

          // The branch that we will deploy to. It must already exist. Defaults to "gh-pages"
          // branch: 'gh-pages',

          // Path where we will create/update a working tree to manipulate the deployment branch.
          // Defaults to ../deploy-${project.name()}, relative to your project.
          // worktreePath: '../deploy-${project.name()}',

          // Message to use when committing the deployment, where %@ is replaced with the current git revision.
          commitMessage: 'Deployed %@'
      }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
