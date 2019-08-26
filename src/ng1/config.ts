import { StateProvider } from 'angular-ui-router';
import { UrlRouterProvider } from 'angular-ui-router';
import { ILocationProvider } from 'angular';
import { Configuration } from '../app/services/config.service';

configureNg1App.$inject = [
  '$locationProvider',
  '$stateProvider',
  '$urlRouterProvider',
  '$provide',
  'ServerConfig'
];
export function configureNg1App(
  $locationProvider: ILocationProvider,
  $stateProvider: StateProvider,
  $urlRouterProvider: UrlRouterProvider,
  $provide: any,
  config: Configuration
) {
  if (!config) {
    throw new Error(
      'ServerConfig is not loaded on the window!  Cannot continue.'
    );
  }

  //   $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
  // Specify the routes
  $stateProvider.state('home', {
    url: '/home',
    template: '<hello></hello>'
  });

  // $provide.decorator('ngModelDirective', [
  //   '$delegate',
  //   $delegate => {
  //     const ngModel = $delegate[0],
  //       controller = ngModel.controller;
  //     ngModel.controller = [
  //       '$scope',
  //       '$element',
  //       '$attrs',
  //       '$injector',
  //       function(scope, element, attrs, $injector) {
  //         const $interpolate = $injector.get('$interpolate');
  //         attrs.$set('name', $interpolate(attrs.name || '')(scope));
  //         $injector.invoke(controller, this, {
  //           $scope: scope,
  //           $element: element,
  //           $attrs: attrs
  //         });
  //       }
  //     ];
  //     return $delegate;
  //   }
  // ]);

  $provide.decorator('formDirective', [
    '$delegate',
    $delegate => {
      const form = $delegate[0],
        controller = form.controller;
      form.controller = [
        '$scope',
        '$element',
        '$attrs',
        '$injector',
        function(scope, element, attrs, $injector) {
          const $interpolate = $injector.get('$interpolate');
          attrs.$set(
            'name',
            $interpolate(attrs.name || attrs.ngForm || '')(scope)
          );
          $injector.invoke(controller, this, {
            $scope: scope,
            $element: element,
            $attrs: attrs
          });
        }
      ];
      return $delegate;
    }
  ]);

  //   $provide.decorator('$rootScope', [
  //     '$delegate',
  //     function($delegate) {
  //       var Scope = $delegate.constructor;
  //       var origBroadcast = Scope.prototype.$broadcast;
  //       var origEmit = Scope.prototype.$emit;

  //       Scope.prototype.$broadcast = function() {
  //         console.debug(
  //           '$broadcast was called on $scope ' + this.$id + ' with arguments:',
  //           arguments
  //         );
  //         return origBroadcast.apply(this, arguments);
  //       };
  //       Scope.prototype.$emit = function() {
  //         console.debug(
  //           '$emit was called on $scope ' + this.$id + ' with arguments:',
  //           arguments
  //         );
  //         return origEmit.apply(this, arguments);
  //       };
  //       return $delegate;
  //     }
  //   ]);

  console.debug('AngularJS routes set up.');
}
