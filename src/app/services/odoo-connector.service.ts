import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var jquery: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class OdooConnector {

  constructor() { }

  public login(server: string, db: string, user: string, pass: string): any {
    const fUser = $.xmlrpc.force('string', user);
    const fPassword = $.xmlrpc.force('string', pass);
    const fDbName = $.xmlrpc.force('string', db);

    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: server + '/xmlrpc/2/common',
        methodName: 'login',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [fDbName, fUser, fPassword],
        success: (response: any, status: any, jqXHR: any) => {
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          observer.error(error);
        }
      });
    });

    return odoo$;
  }

  public data(server: string): any {
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: server + '/xmlrpc/2/common',
        methodName: 'version',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [],
        success: (response: any, status: any, jqXHR: any) => {
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          observer.error(error);
        }
      });
    });

    return odoo$;
  }
}
