# NgOdooConnect Service

### Load like SubModule

```
git submodule add https://github.com/codize-app/ng-odoo-connect.git
```

### Install dependencies

```
npm i xmlrpc
npm i @types/xmlrpc
```

### Solution for commons errors

In recent Angular versions, the system can't recognize http and https node modules. For this, first search the file ```node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js``` and replace ```node: false``` by ```node: {http:true,https:true,url:true}```

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
