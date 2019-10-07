import { Component, OnInit } from '@angular/core';
import { OdooConnector } from '@service/odoo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-odoo-connect';
  odoo = new OdooConnector(
    'http://localhost:8069',
    'odoo',
    'admin',
    'admin'
  );

  constructor() {}

  public ngOnInit(): void {
    // [Demo] Get Odoo server Data
    this.odoo.data().subscribe((res: any) => res);

    // [Demo] LogIn & SearchRead res.partner
    this.odoo.login().subscribe((res: any) => {
      this.odoo.searchRead(
        'res.partner',
        [['customer', '=', true]],
        {fields: ['name'], limit: 5}
      ).subscribe((obj: any) => {
        console.log(obj);
      });
    });
  }
}
