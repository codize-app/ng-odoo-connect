/*
 * Odoo Connector Service by Moldeo Interactive
 * Developer: Ignacio Buioli (ibuioli@gmail.com)
 * Company: Moldeo Interactive (www.moldeointeractive.com.ar)
 * Company Contact: info@moldeointeractive.com.ar
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var jquery: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class OdooConnector {
  server: string;
  db: string;
  user: string;
  pass: string;
  uid: string;

  constructor(server: string, db: string, user: string, pass: string) {
    this.server = server;
    this.db = db;
    this.user = user;
    this.pass = pass;
  }

  public data(): any {
    console.log('Getting Odoo Data');
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: this.server + '/xmlrpc/2/common',
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

  public login(): any {
    console.log('Getting UID');
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: this.server + '/xmlrpc/2/common',
        methodName: 'login',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [this.db, this.user, this.pass],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('UID:', status);
          console.log('UID:', response);
          this.uid = response[0];
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

  public searchRead(model: string, param?: any, keyword?: any): any {
    console.log('Search & Read:', model);
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: this.server + '/xmlrpc/2/object',
        methodName: 'execute_kw',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [this.db, this.uid, this.pass, model, 'search_read', [ param ] , keyword],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('Search & Read, ' + model + ' status:', status);
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          console.log('Search & Read, ' + model + ' status:', status);
          console.log('Err:', error);
          observer.error(error);
        }
      });
    });

    return odoo$;
  }

  public write(model: string, id: number, keyword: any): any {
    console.log('Write on:', model);
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: this.server + '/xmlrpc/2/object',
        methodName: 'execute_kw',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [this.db, this.uid, this.pass, model, 'write', [[id], keyword]],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('Search & Read, ' + model + ' status:', status);
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          console.log('Search & Read, ' + model + ' status:', status);
          console.log('Err:', error);
          observer.error(error);
        }
      });
    });

    return odoo$;
  }
}
