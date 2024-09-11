jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICxacaix, Cxacaix } from '../cxacaix.model';
import { CxacaixService } from '../service/cxacaix.service';

import { CxacaixRoutingResolveService } from './cxacaix-routing-resolve.service';

describe('Service Tests', () => {
  describe('Cxacaix routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CxacaixRoutingResolveService;
    let service: CxacaixService;
    let resultCxacaix: ICxacaix | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CxacaixRoutingResolveService);
      service = TestBed.inject(CxacaixService);
      resultCxacaix = undefined;
    });

    describe('resolve', () => {
      it('should return ICxacaix returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCxacaix = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCxacaix).toEqual({ id: 123 });
      });

      it('should return new ICxacaix if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCxacaix = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCxacaix).toEqual(new Cxacaix());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Cxacaix })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCxacaix = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCxacaix).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
