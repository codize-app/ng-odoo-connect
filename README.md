# NgOdooConnect Service

### Example

```javascript
odoo = new OdooConnector(
    'http://localhost:8069',
    'odoo',
    'admin',
    'admin'
);
```

```javascript
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
```
