routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./home_template.html'),
      controller: 'homeController',
      controllerAs: 'home'
    });
}
