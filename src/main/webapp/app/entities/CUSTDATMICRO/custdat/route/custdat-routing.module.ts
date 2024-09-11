import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CustdatComponent } from '../list/custdat.component';
import { CustdatDetailComponent } from '../detail/custdat-detail.component';
import { CustdatUpdateComponent } from '../update/custdat-update.component';
import { CustdatRoutingResolveService } from './custdat-routing-resolve.service';

const custdatRoute: Routes = [
  {
    path: '',
    component: CustdatComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustdatDetailComponent,
    resolve: {
      custdat: CustdatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustdatUpdateComponent,
    resolve: {
      custdat: CustdatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustdatUpdateComponent,
    resolve: {
      custdat: CustdatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(custdatRoute)],
  exports: [RouterModule],
})
export class CustdatRoutingModule {}
