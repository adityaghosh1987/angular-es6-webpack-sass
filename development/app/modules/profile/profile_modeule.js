require('./profile_style.scss');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import profileRoute from './profile_route'
import profileCtrl from './profile_controller';

export default angular.module('webApp.profile', [uirouter])
  .config(profileRoute)
  .controller('profileController', profileCtrl)
  .name;
