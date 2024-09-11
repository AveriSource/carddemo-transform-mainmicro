import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AcctdatComponent } from '../list/acctdat.component';
import { AcctdatDetailComponent } from '../detail/acctdat-detail.component';
import { AcctdatUpdateComponent } from '../update/acctdat-update.component';
import { AcctdatRoutingResolveService } from './acctdat-routing-resolve.service';

const acctdatRoute: Routes = [
  {
    path: '',
    component: AcctdatComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AcctdatDetailComponent,
    resolve: {
      acctdat: AcctdatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AcctdatUpdateComponent,
    resolve: {
      acctdat: AcctdatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AcctdatUpdateComponent,
    resolve: {
      acctdat: AcctdatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(acctdatRoute)],
  exports: [RouterModule],
})
export class AcctdatRoutingModule {}
