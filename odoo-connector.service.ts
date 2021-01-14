/*
 * Odoo Connector Service by Moldeo Interactive
 * Angular 8 - 10
 * Requires odoo_api install on Odoo server <https://github.com/codize-app/odoo_api>
 *
 * Developer: Ignacio Buioli <ibuioli@gmail.com>
 * Company: Codize <www.codize.ar>
 *
 * Develop for Codize, you are free to use it
 */

import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OdooConnector {

  constructor(
    private http: HttpClient,
    @Inject('server') private server: string,
    @Inject('db') private db: string,
    @Inject('user') private user: string,
    @Inject('pass') private pass: string,
    @Inject('uid') private uid?: string
  ) {
    this.server = server + '/odoo-api/';
    this.db = db;
    this.user = user;
    this.pass = pass;
    this.uid = uid;
  }

  public data(): any {
    console.log('Getting Odoo Data');
    const odoo$ = new Observable(observer => {
      this.http.post<any>(this.server + 'common/version',
      {params: {}}).subscribe(data => {
        if (data.result.error) {
          console.log('Err:', data.result.error);
          observer.error(data.result.error);
        } else {
          console.log('Odoo Data:', data.result);
          observer.next(data.result);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public login(): any {
    console.log('Getting UID');
    const odoo$ = new Observable(observer => {
      this.http.post<any>(this.server + 'common/login',
      {params: {db: this.db, login: this.user, password: this.pass}}).subscribe(data => {
        if (data.result.error) {
          console.log('Err:', data.result.error);
          observer.error(data.result.error);
        } else {
          console.log('UID:', data.result);
          this.uid = data.result;
          observer.next(data.result);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  /*public searchCount(model: string, param?: any): any {
    console.log('Search & Count:', model);
    const object = xmlrpc.createClient(this.server + 'object');
    const odoo$ = new Observable(observer => {
      object.methodCall('execute_kw', [this.db, this.uid, this.pass, model, 'search_count', [ param ]], (error: any, value: any) => {
        if (error) {
          console.log('Search & Count, ' + model);
          console.log('Err:', error);
          observer.error(error);
        } else {
          console.log('Search & Count, ' + model);
          observer.next(value);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public searchRead(model: string, param?: any, keyword?: any): any {
    console.log('Search & Read:', model);
    const object = xmlrpc.createClient(this.server + 'object');
    const odoo$ = new Observable(observer => {
      object.methodCall('execute_kw',
      [this.db, this.uid, this.pass, model, 'search_read', [ param ], keyword], (error: any, value: any) => {
        if (error) {
          console.log('Search & Read, ' + model);
          console.log('Err:', error);
          observer.error(error);
        } else {
          console.log('Search & Read, ' + model);
          observer.next(value);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public write(model: string, id: number, keyword: any): any {
    console.log('Write on:', model);
    const object = xmlrpc.createClient(this.server + 'object');
    const odoo$ = new Observable(observer => {
      object.methodCall('execute_kw',
      [this.db, this.uid, this.pass, model, 'write', [[id], keyword]], (error: any, value: any) => {
        if (error) {
          console.log('Write, ' + model);
          console.log('Err:', error);
          observer.error(error);
        } else {
          console.log('Write, ' + model);
          observer.next(value);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public create(model: string, keyword?: any): any {
    console.log('Create on:', model);
    const object = xmlrpc.createClient(this.server + 'object');
    const odoo$ = new Observable(observer => {
      object.methodCall('execute_kw',
      [this.db, this.uid, this.pass, model, 'create', [keyword]], (error: any, value: any) => {
        if (error) {
          console.log('Create, ' + model);
          console.log('Err:', error);
          observer.error(error);
        } else {
          console.log('Create, ' + model);
          observer.next(value);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public fieldsGet(model: string, keyword?: any): any {
    console.log('Fields get on:', model);
    const object = xmlrpc.createClient(this.server + 'object');
    const odoo$ = new Observable(observer => {
      object.methodCall('execute_kw',
      [this.db, this.uid, this.pass, model, 'fields_get', [keyword]], (error: any, value: any) => {
        if (error) {
          console.log('Fields get, ' + model);
          console.log('Err:', error);
          observer.error(error);
        } else {
          console.log('Fields get, ' + model);
          observer.next(value);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public renderReport(model: string, id: number): any { // Just Odoo 8, 9, 10
    console.log('Render Report on:', model);
    const report = xmlrpc.createClient(this.server + 'report');
    const odoo$ = new Observable(observer => {
      report.methodCall('render_report',
      [this.db, this.uid, this.pass, model, model, [id]], (error: any, value: any) => {
        if (error) {
          console.log('Render Report, ' + model);
          console.log('Err:', error);
          observer.error(error);
        } else {
          console.log('Render Report, ' + model);
          observer.next(value);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public delete(model: string, id: number): any {
    console.log('Delete on:', model);
    const object = xmlrpc.createClient(this.server + 'object');
    const odoo$ = new Observable(observer => {
      object.methodCall('execute_kw',
      [this.db, this.uid, this.pass, model, 'unlink', [[id]]], (error: any, value: any) => {
        if (error) {
          console.log('Delete, ' + model);
          console.log('Err:', error);
          observer.error(error);
        } else {
          console.log('Delete, ' + model);
          observer.next(value);
          observer.complete();
        }
      });
    });

    return odoo$;
  }*/
}
