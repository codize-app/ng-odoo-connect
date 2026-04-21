/*
 * Odoo Connector Service by Codize
 * Angular 19+
 * Requires odoo_api brach auth_version install on Odoo server <https://github.com/codize-app/odoo_api>
 *
 * Devs:
 * - Ignacio Buioli
 * - Martin Bruno
 * Company: Codize <www.codize.ar>
 *
 * Develop for Codize, you are free to use it
 */

import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OdooConnector {

  public uid: number | null = null;
  private sessionToken: string | null = null;

  constructor(
    private http: HttpClient,
    @Inject('server') private server: string,
    @Inject('db') private db: string,
    @Inject('user') private user: string,
    @Inject('pass') private pass: string,
    @Inject('uid') _uid?: string
  ) {
    this.server = server + '/odoo-api/';
    const storedToken = localStorage.getItem('token');
    const storedUid = parseInt(localStorage.getItem('odoo_uid') || '0');
    if (storedToken && storedUid) {
      this.sessionToken = storedToken;
      this.uid = storedUid;
    }
  }

  // ─── helpers ──────────────────────────────────────────────────────────────

  private post<T>(endpoint: string, params: object): Observable<T> {
    const body = this.sessionToken
      ? { params: { ...params, token: this.sessionToken } }
      : { params };

    return new Observable<T>(observer => {
      this.http.post<any>(this.server + endpoint, body).subscribe({
        next: data => {
          if (data?.result?.error === 'TOKEN_INVALID' || data?.result?.error === 'TOKEN_EXPIRED') {
            observer.error('SESSION_EXPIRED');
            return;
          }
          if (data?.result?.error) {
            observer.error(data.result.error);
            console.error(data.result.error);
            return;
          }
          observer.next(data.result);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  private withSessionRetry<T>(callFn: () => Observable<T>): Observable<T> {
    return callFn().pipe(
      catchError(err => {
        if (err === 'SESSION_EXPIRED') {
          this.uid = null;
          this.sessionToken = null;
          return this.login().pipe(switchMap(() => callFn()));
        }
        return throwError(err);
      })
    );
  }

  // ─── public API ───────────────────────────────────────────────────────────

  public data(): Observable<any> {
    return this.post('common/version', {});
  }

  public login(): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(this.server + 'common/login', {
        params: { db: this.db, login: this.user, password: this.pass }
      }).subscribe({
        next: data => {
          if (data?.result?.error || !data?.result?.uid) {
            observer.error(data?.result?.error ?? 'AUTH_REQUIRED');
            return;
          }
          this.uid = data.result.uid;
          this.sessionToken = data.result.token;
          localStorage.setItem('token', data.result.token);
          localStorage.setItem('odoo_uid', String(data.result.uid));
          observer.next(this.uid);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  public ensureSession(): Observable<any> {
    if (this.uid && this.sessionToken) return of(this.uid);
    return this.login();
  }

  public searchCount(model: string, param?: any): Observable<any> {
    return this.withSessionRetry(() =>
      this.post('object/search_count', { model, filters: param })
    );
  }

  public searchRead(model: string, param?: any, keyword?: any): Observable<any> {
    return this.withSessionRetry(() =>
      this.post('object/search_read', { model, filters: param, keys: keyword })
    );
  }

  public write(model: string, id: number, keyword: any): Observable<any> {
    return this.withSessionRetry(() =>
      this.post('object/write', { model, id, vals: keyword })
    );
  }

  public create(model: string, keyword?: any): Observable<any> {
    return this.withSessionRetry(() =>
      this.post('object/create', { model, vals: keyword })
    );
  }

  public fieldsGet(model: string, keyword?: any): Observable<any> {
    return this.withSessionRetry(() =>
      this.post('object/fields_get', { model, keys: keyword })
    );
  }

  public delete(model: string, id: number): Observable<any> {
    return this.withSessionRetry(() =>
      this.post('object/unlink', { model, id })
    );
  }

  public executeMethod(model: string, ids: number[], method: string, args: any[] = [], kwargs: any = {}): Observable<any> {
    return this.withSessionRetry(() =>
      this.post('object/execute_method', { model, ids, method, args, kwargs })
    );
  }
}