/*
 * Odoo Connector Service by Codize
 * Angular 19+
 * Requires odoo_api install on Odoo server <https://github.com/codize-app/odoo_api>
 *
 * Main Developer: Ignacio Buioli <ibuioli@gmail.com>
 * Company: Codize <www.codize.ar>
 *
 * Develop for Codize, you are free to use it
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OdooConnector {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('server') server: string,
    @Inject('db') private db: string,
    @Inject('user') private user: string,
    @Inject('pass') private pass: string,
    @Inject('uid') private uid?: string
  ) {
    this.apiUrl = `${server}/odoo-api/`;
  }

  private handleError(error: any): Observable<never> {
    console.error('Odoo API Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }

  public data(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}common/version`, { params: {} })
      .pipe(catchError(this.handleError));
  }

  public login(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}common/login`, {
      params: { db: this.db, login: this.user, password: this.pass }
    }).pipe(map(response => {
      console.log('Log In:', response);
      return response.result;
    }),catchError(this.handleError));
  }

  public searchCount(model: string, param?: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}object/search_count`, {
      params: { db: this.db, login: this.user, password: this.pass, model, filters: param }
    }).pipe(map(response => {
      console.log('Search Count:', response);
      return response.result;
    }),catchError(this.handleError));
  }

  public searchRead(model: string, param?: any, keyword?: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}object/search_read`, {
      params: { db: this.db, login: this.user, password: this.pass, model, filters: param, keys: keyword }
    }).pipe(map(response => {
      console.log('Search Read:', response);
      return response.result;
    }),catchError(this.handleError));
  }

  public write(model: string, id: number, keyword: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}object/write`, {
      params: { db: this.db, login: this.user, password: this.pass, model, id, vals: keyword }
    }).pipe(map(response => {
      console.log('Write:', response);
      return response.result;
    }),catchError(this.handleError));
  }

  public create(model: string, keyword?: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}object/create`, {
      params: { db: this.db, login: this.user, password: this.pass, model, vals: keyword }
    }).pipe(map(response => {
      console.log('Create:', response);
      return response.result;
    }),catchError(this.handleError));
  }

  public fieldsGet(model: string, keyword?: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}object/fields_get`, {
      params: { db: this.db, login: this.user, password: this.pass, model, keys: keyword }
    }).pipe(map(response => {
      console.log('Fields Get:', response);
      return response.result;
    }),catchError(this.handleError));
  }

  public delete(model: string, id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}object/unlink`, {
      params: { db: this.db, login: this.user, password: this.pass, model, id }
    }).pipe(map(response => {
      console.log('Delete:', response);
      return response.result;
    }),catchError(this.handleError));
  }
}
