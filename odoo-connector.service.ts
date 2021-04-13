/*
 * Odoo Connector Service by Codize
 * Angular 8+
 * Requires odoo_api install on Odoo server <https://github.com/codize-app/odoo_api>
 *
 * Main Developer: Ignacio Buioli <ibuioli@gmail.com>
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

  public searchCount(model: string, param?: any): any {
    console.log('Search & Count:', model);
    const odoo$ = new Observable(observer => {
      this.http.post<any>(this.server + 'object/search_count',
      {params: {db: this.db, login: this.user, password: this.pass, model, filters: param}}).subscribe(data => {
        if (data.result.error) {
          console.log('Err:', data.result.error);
          observer.error(data.result.error);
        } else {
          console.log('Search & Count:', data.result);
          this.uid = data.result;
          observer.next(data.result);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public searchRead(model: string, param?: any, keyword?: any): any {
    console.log('Search & Read:', model);
    const odoo$ = new Observable(observer => {
      this.http.post<any>(this.server + 'object/search_read',
      {params: {db: this.db, login: this.user, password: this.pass, model, filters: param, keys: keyword}}).subscribe(data => {
        if (data.result.error) {
          console.log('Err:', data.result.error);
          observer.error(data.result.error);
        } else {
          console.log('Search & Read:', data.result);
          this.uid = data.result;
          observer.next(data.result);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public write(model: string, id: number, keyword: any): any {
    console.log('Write on:', model);
    const odoo$ = new Observable(observer => {
      this.http.post<any>(this.server + 'object/write',
      {params: {db: this.db, login: this.user, password: this.pass, model, id, vals: keyword}}).subscribe(data => {
        if (data.result.error) {
          console.log('Err:', data.result.error);
          observer.error(data.result.error);
        } else {
          console.log('Write:', data.result);
          this.uid = data.result;
          observer.next(data.result);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public create(model: string, keyword?: any): any {
    console.log('Create on:', model);
    const odoo$ = new Observable(observer => {
      this.http.post<any>(this.server + 'object/create',
      {params: {db: this.db, login: this.user, password: this.pass, model, vals: keyword}}).subscribe(data => {
        if (data.result.error) {
          console.log('Err:', data.result.error);
          observer.error(data.result.error);
        } else {
          console.log('Create:', data.result);
          this.uid = data.result;
          observer.next(data.result);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public fieldsGet(model: string, keyword?: any): any {
    console.log('Fields get on:', model);
    const odoo$ = new Observable(observer => {
      this.http.post<any>(this.server + 'object/fields_get',
      {params: {db: this.db, login: this.user, password: this.pass, model, keys: keyword}}).subscribe(data => {
        if (data.result.error) {
          console.log('Err:', data.result.error);
          observer.error(data.result.error);
        } else {
          console.log('Fields Get:', data.result);
          this.uid = data.result;
          observer.next(data.result);
          observer.complete();
        }
      });
    });

    return odoo$;
  }

  public delete(model: string, id: number): any {
    console.log('Delete on:', model);
    const odoo$ = new Observable(observer => {
      this.http.post<any>(this.server + 'object/unlink',
      {params: {db: this.db, login: this.user, password: this.pass, model, id}}).subscribe(data => {
        if (data.result.error) {
          console.log('Err:', data.result.error);
          observer.error(data.result.error);
        } else {
          console.log('Delete:', data.result);
          this.uid = data.result;
          observer.next(data.result);
          observer.complete();
        }
      });
    });

    return odoo$;
  }
}
