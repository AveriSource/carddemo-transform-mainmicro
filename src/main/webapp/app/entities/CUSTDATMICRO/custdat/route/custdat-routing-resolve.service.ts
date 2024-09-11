import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICustdat, Custdat } from '../custdat.model';
import { CustdatService } from '../service/custdat.service';

@Injectable({ providedIn: 'root' })
export class CustdatRoutingResolveService implements Resolve<ICustdat> {
  constructor(protected service: CustdatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustdat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((custdat: HttpResponse<Custdat>) => {
          if (custdat.body) {
            return of(custdat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Custdat());
  }
}
