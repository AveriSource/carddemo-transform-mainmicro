import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICxacaix, Cxacaix } from '../cxacaix.model';

import { CxacaixService } from './cxacaix.service';

describe('Service Tests', () => {
  describe('Cxacaix Service', () => {
    let service: CxacaixService;
    let httpMock: HttpTestingController;
    let elemDefault: ICxacaix;
    let expectedResult: ICxacaix | ICxacaix[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CxacaixService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        cxacaixId: 0,
        xrefCardNum: 'AAAAAAA',
        xrefCustId: 0,
        xrefAcctId: 0,
        filler: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Cxacaix', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Cxacaix()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cxacaix', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cxacaixId: 1,
            xrefCardNum: 'BBBBBB',
            xrefCustId: 1,
            xrefAcctId: 1,
            filler: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Cxacaix', () => {
        const patchObject = Object.assign(
          {
            cxacaixId: 1,
            xrefCustId: 1,
            filler: 'BBBBBB',
          },
          new Cxacaix()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Cxacaix', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            cxacaixId: 1,
            xrefCardNum: 'BBBBBB',
            xrefCustId: 1,
            xrefAcctId: 1,
            filler: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Cxacaix', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCxacaixToCollectionIfMissing', () => {
        it('should add a Cxacaix to an empty array', () => {
          const cxacaix: ICxacaix = { id: 123 };
          expectedResult = service.addCxacaixToCollectionIfMissing([], cxacaix);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cxacaix);
        });

        it('should not add a Cxacaix to an array that contains it', () => {
          const cxacaix: ICxacaix = { id: 123 };
          const cxacaixCollection: ICxacaix[] = [
            {
              ...cxacaix,
            },
            { id: 456 },
          ];
          expectedResult = service.addCxacaixToCollectionIfMissing(cxacaixCollection, cxacaix);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Cxacaix to an array that doesn't contain it", () => {
          const cxacaix: ICxacaix = { id: 123 };
          const cxacaixCollection: ICxacaix[] = [{ id: 456 }];
          expectedResult = service.addCxacaixToCollectionIfMissing(cxacaixCollection, cxacaix);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cxacaix);
        });

        it('should add only unique Cxacaix to an array', () => {
          const cxacaixArray: ICxacaix[] = [{ id: 123 }, { id: 456 }, { id: 13696 }];
          const cxacaixCollection: ICxacaix[] = [{ id: 123 }];
          expectedResult = service.addCxacaixToCollectionIfMissing(cxacaixCollection, ...cxacaixArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cxacaix: ICxacaix = { id: 123 };
          const cxacaix2: ICxacaix = { id: 456 };
          expectedResult = service.addCxacaixToCollectionIfMissing([], cxacaix, cxacaix2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cxacaix);
          expect(expectedResult).toContain(cxacaix2);
        });

        it('should accept null and undefined values', () => {
          const cxacaix: ICxacaix = { id: 123 };
          expectedResult = service.addCxacaixToCollectionIfMissing([], null, cxacaix, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cxacaix);
        });

        it('should return initial array if no Cxacaix is added', () => {
          const cxacaixCollection: ICxacaix[] = [{ id: 123 }];
          expectedResult = service.addCxacaixToCollectionIfMissing(cxacaixCollection, undefined, null);
          expect(expectedResult).toEqual(cxacaixCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
