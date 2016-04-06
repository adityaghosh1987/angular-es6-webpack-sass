require('./home_style.scss');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import homeRoute from './home_route'
import homeCtrl from './home_controller';

export default angular.module('webApp.home', [uirouter])
  .config(homeRoute)
  .controller('homeController', homeCtrl)
  .name;
