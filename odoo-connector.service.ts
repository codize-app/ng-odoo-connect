/*
 * Odoo Connector Service by Moldeo Interactive
 * Angular 8
 * Requires jQuery & jQuery-XMLRPC
 * 
 * Developer: Ignacio Buioli (ibuioli@gmail.com)
 * Company: Moldeo Interactive (www.moldeointeractive.com.ar)
 * Company Contact: info@moldeointeractive.com.ar
 */

import { Observable } from 'rxjs';
declare var jquery: any;
declare var $: any;

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
          console.log('Write, ' + model + ' status:', status);
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          console.log('Write, ' + model + ' status:', status);
          console.log('Err:', error);
          observer.error(error);
        }
      });
    });

    return odoo$;
  }

  public create(model: string, keyword?: any): any {
    console.log('Create on:', model);
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: this.server + '/xmlrpc/2/object',
        methodName: 'execute_kw',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [this.db, this.uid, this.pass, model, 'create', [keyword]],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('Create, ' + model + ' status:', status);
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          console.log('Create, ' + model + ' status:', status);
          console.log('Err:', error);
          observer.error(error);
        }
      });
    });

    return odoo$;
  }

  public fieldsGet(model: string, keyword?: any): any {
    console.log('Fields get on:', model);
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: this.server + '/xmlrpc/2/object',
        methodName: 'execute_kw',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [this.db, this.uid, this.pass, model, 'fields_get', [keyword]],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('Fields get, ' + model + ' status:', status);
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          console.log('Fields get, ' + model + ' status:', status);
          console.log('Err:', error);
          observer.error(error);
        }
      });
    });

    return odoo$;
  }

  public renderReport(model: string, id: number): any {
    console.log('Render Report on:', model);
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: this.server + '/xmlrpc/2/report',
        methodName: 'render_report',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [this.db, this.uid, this.pass, model, [id]],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('Render Report, ' + model + ' status:', status);
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          console.log('Render Report, ' + model + ' status:', status);
          console.log('Err:', error);
          observer.error(error);
        }
      });
    });

    return odoo$;
  }

  public delete(model: string, id: number): any {
    console.log('Delete on:', model);
    const odoo$ = new Observable(observer => {
      $.xmlrpc({
        url: this.server + '/xmlrpc/2/object',
        methodName: 'execute_kw',
        dataType: 'xmlrpc',
        crossDomain: true,
        params: [this.db, this.uid, this.pass, model, 'unlink', [[id]]],
        success: (response: any, status: any, jqXHR: any) => {
          console.log('Delete, ' + model + ' status:', status);
          observer.next(response);
          observer.complete();
        },
        error: (jqXHR: any, status: any, error: any) => {
          console.log('Delete, ' + model + ' status:', status);
          console.log('Err:', error);
          observer.error(error);
        }
      });
    });

    return odoo$;
  }
}
