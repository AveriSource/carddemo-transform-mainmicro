import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'acctdat',
        data: { pageTitle: 'mainMicroApp.acctdatmicroAcctdat.home.title' },
        loadChildren: () => import('./ACCTDATMICRO/acctdat/acctdat.module').then(m => m.AcctdatmicroAcctdatModule),
      },
      {
        path: 'custdat',
        data: { pageTitle: 'mainMicroApp.custdatmicroCustdat.home.title' },
        loadChildren: () => import('./CUSTDATMICRO/custdat/custdat.module').then(m => m.CustdatmicroCustdatModule),
      },
      {
        path: 'cxacaix',
        data: { pageTitle: 'mainMicroApp.cxacaixmicroCxacaix.home.title' },
        loadChildren: () => import('./CXACAIXMICRO/cxacaix/cxacaix.module').then(m => m.CxacaixmicroCxacaixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
