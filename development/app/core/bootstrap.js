/*jshint browser:true */
'use strict'; 

/**
*	Notice require('angular')? That replaces adding 
*	<script src="bower_components/angular/angular.min.js">. 
*	No need for that, this is a module system.
*/
require('./vendor')();
var appModule = require('../index.js');

//Replacing ng-app="appName"
angular.element(document).ready(function(){
	angular.bootstrap(document, [appModule.name], {
		
	});
	console.log('haa running 1');
});


/*

appModule.run(($log) => {
    $log.info('demo running 1');
});
*/