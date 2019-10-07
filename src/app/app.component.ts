import { Component, OnInit } from '@angular/core';
import { OdooConnector } from '@service/odoo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-odoo-connect';
  uid: number;

  constructor(public odoo: OdooConnector) {}

  public ngOnInit(): void {
    this.odoo.data('http://localhost:8069').subscribe((res: any) => {});

    this.odoo.login('http://localhost:8069', 'odoo', 'admin', 'admin').subscribe((res: any) => {
      this.uid = res[0];
    });
  }
}
