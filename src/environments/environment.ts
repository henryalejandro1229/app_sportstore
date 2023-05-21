// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const host = '127.0.0.1';
export const hostEmail = 'localhost:4000'
export const environment = {
  production: false,
  url: `bordados_app_backend/api`,
  urlImg: `http://localhost/bordados_app_backend/api/products/imageProducts/`,
  urlEmail: `https://app-los-pajaritos-server-email-production.up.railway.app/bordados_app_backend`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
