routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('profile', {
      url: '/profile',
      template: require('./profile_template.html'),
      controller: 'profileController',
      controllerAs: 'profile'
    });
}
