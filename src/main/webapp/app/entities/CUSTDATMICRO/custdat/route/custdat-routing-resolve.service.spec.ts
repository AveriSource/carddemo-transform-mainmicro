jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICustdat, Custdat } from '../custdat.model';
import { CustdatService } from '../service/custdat.service';

import { CustdatRoutingResolveService } from './custdat-routing-resolve.service';

describe('Service Tests', () => {
  describe('Custdat routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CustdatRoutingResolveService;
    let service: CustdatService;
    let resultCustdat: ICustdat | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CustdatRoutingResolveService);
      service = TestBed.inject(CustdatService);
      resultCustdat = undefined;
    });

    describe('resolve', () => {
      it('should return ICustdat returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCustdat = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCustdat).toEqual({ id: 123 });
      });

      it('should return new ICustdat if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCustdat = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCustdat).toEqual(new Custdat());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Custdat })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCustdat = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCustdat).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
