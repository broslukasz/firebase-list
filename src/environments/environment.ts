// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/users',
  firebase: {
    apiKey: 'IzaSyC1F-MnDyVM3aoe2RsgIzwtLGKRsl1aWkU',
    authDomain: 'ubros-firebase-list.firebaseapp.com',
    databaseURL: 'ttps://lubros-firebase-list.firebaseio.com',
    projectId: 'ubros-firebase-list',
    storageBucket: 'ubros-firebase-list.appspot.com',
    messagingSenderId: '098128437865'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
