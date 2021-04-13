# NgOdooConnect Service

### Load like SubModule

```
git submodule add https://github.com/codize-app/ng-odoo-connect.git
```

### Install dependencies

It requires odoo_module installed on Odoo server

```
git clone https://github.com/codize-app/odoo_api
```

### Example

```javascript
odoo = new OdooConnector(
    this.http,
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
