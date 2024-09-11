jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAcctdat, Acctdat } from '../acctdat.model';
import { AcctdatService } from '../service/acctdat.service';

import { AcctdatRoutingResolveService } from './acctdat-routing-resolve.service';

describe('Service Tests', () => {
  describe('Acctdat routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AcctdatRoutingResolveService;
    let service: AcctdatService;
    let resultAcctdat: IAcctdat | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AcctdatRoutingResolveService);
      service = TestBed.inject(AcctdatService);
      resultAcctdat = undefined;
    });

    describe('resolve', () => {
      it('should return IAcctdat returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAcctdat = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAcctdat).toEqual({ id: 123 });
      });

      it('should return new IAcctdat if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAcctdat = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAcctdat).toEqual(new Acctdat());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Acctdat })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAcctdat = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAcctdat).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
