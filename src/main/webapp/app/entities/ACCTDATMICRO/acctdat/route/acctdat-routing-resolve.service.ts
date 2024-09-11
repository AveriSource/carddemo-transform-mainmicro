import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAcctdat, Acctdat } from '../acctdat.model';
import { AcctdatService } from '../service/acctdat.service';

@Injectable({ providedIn: 'root' })
export class AcctdatRoutingResolveService implements Resolve<IAcctdat> {
  constructor(protected service: AcctdatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAcctdat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((acctdat: HttpResponse<Acctdat>) => {
          if (acctdat.body) {
            return of(acctdat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Acctdat());
  }
}
