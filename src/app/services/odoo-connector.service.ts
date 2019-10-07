/*
 * Odoo Connector Service by Moldeo Interactive
 * Developer: Ignacio Buioli
 * Company: Moldeo Interactive (www.moldeointeractive.com.ar)
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var jquery: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class OdooConnector {

  constructor() { }

  public data(server: string): any {
    console.log('Getting Odoo Data');
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: server + '/xmlrpc/2/common',
        methodName: 'version',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('Odoo Data:', response);
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

  public login(server: string, db: string, user: string, pass: string): any {
    console.log('Getting UID');
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: server + '/xmlrpc/2/common',
        methodName: 'login',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [db, user, pass],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('UID:', status);
          console.log('UID:', response);
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          console.log('UID:', status);
          console.log('Err:', error);
          observer.error(error);
        }
      });
    });

    return odoo$;
  }
}
