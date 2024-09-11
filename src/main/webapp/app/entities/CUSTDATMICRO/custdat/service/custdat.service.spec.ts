import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICustdat, Custdat } from '../custdat.model';

import { CustdatService } from './custdat.service';

describe('Service Tests', () => {
  describe('Custdat Service', () => {
    let service: CustdatService;
    let httpMock: HttpTestingController;
    let elemDefault: ICustdat;
    let expectedResult: ICustdat | ICustdat[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CustdatService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        custdatId: 0,
        custId: 0,
        custFirstName: 'AAAAAAA',
        custMiddleName: 'AAAAAAA',
        custLastName: 'AAAAAAA',
        custAddrLine1: 'AAAAAAA',
        custAddrLine2: 'AAAAAAA',
        custAddrLine3: 'AAAAAAA',
        custAddrStateCd: 'AAAAAAA',
        custAddrCountryCd: 'AAAAAAA',
        custAddrZip: 'AAAAAAA',
        custPhoneNum1: 'AAAAAAA',
        custPhoneNum2: 'AAAAAAA',
        custSsn: 0,
        custGovtIssuedId: 'AAAAAAA',
        custDobYyyyMmDd: 'AAAAAAA',
        custEftAccountId: 'AAAAAAA',
        custPriCardHolderInd: 'AAAAAAA',
        custFicoCreditScore: 0,
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

      it('should create a Custdat', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Custdat()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Custdat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            custdatId: 1,
            custId: 1,
            custFirstName: 'BBBBBB',
            custMiddleName: 'BBBBBB',
            custLastName: 'BBBBBB',
            custAddrLine1: 'BBBBBB',
            custAddrLine2: 'BBBBBB',
            custAddrLine3: 'BBBBBB',
            custAddrStateCd: 'BBBBBB',
            custAddrCountryCd: 'BBBBBB',
            custAddrZip: 'BBBBBB',
            custPhoneNum1: 'BBBBBB',
            custPhoneNum2: 'BBBBBB',
            custSsn: 1,
            custGovtIssuedId: 'BBBBBB',
            custDobYyyyMmDd: 'BBBBBB',
            custEftAccountId: 'BBBBBB',
            custPriCardHolderInd: 'BBBBBB',
            custFicoCreditScore: 1,
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

      it('should partial update a Custdat', () => {
        const patchObject = Object.assign(
          {
            custMiddleName: 'BBBBBB',
            custLastName: 'BBBBBB',
            custAddrLine1: 'BBBBBB',
            custAddrLine2: 'BBBBBB',
            custAddrLine3: 'BBBBBB',
            custAddrCountryCd: 'BBBBBB',
            custAddrZip: 'BBBBBB',
            custPhoneNum2: 'BBBBBB',
            custPriCardHolderInd: 'BBBBBB',
            custFicoCreditScore: 1,
            filler: 'BBBBBB',
          },
          new Custdat()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Custdat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            custdatId: 1,
            custId: 1,
            custFirstName: 'BBBBBB',
            custMiddleName: 'BBBBBB',
            custLastName: 'BBBBBB',
            custAddrLine1: 'BBBBBB',
            custAddrLine2: 'BBBBBB',
            custAddrLine3: 'BBBBBB',
            custAddrStateCd: 'BBBBBB',
            custAddrCountryCd: 'BBBBBB',
            custAddrZip: 'BBBBBB',
            custPhoneNum1: 'BBBBBB',
            custPhoneNum2: 'BBBBBB',
            custSsn: 1,
            custGovtIssuedId: 'BBBBBB',
            custDobYyyyMmDd: 'BBBBBB',
            custEftAccountId: 'BBBBBB',
            custPriCardHolderInd: 'BBBBBB',
            custFicoCreditScore: 1,
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

      it('should delete a Custdat', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCustdatToCollectionIfMissing', () => {
        it('should add a Custdat to an empty array', () => {
          const custdat: ICustdat = { id: 123 };
          expectedResult = service.addCustdatToCollectionIfMissing([], custdat);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(custdat);
        });

        it('should not add a Custdat to an array that contains it', () => {
          const custdat: ICustdat = { id: 123 };
          const custdatCollection: ICustdat[] = [
            {
              ...custdat,
            },
            { id: 456 },
          ];
          expectedResult = service.addCustdatToCollectionIfMissing(custdatCollection, custdat);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Custdat to an array that doesn't contain it", () => {
          const custdat: ICustdat = { id: 123 };
          const custdatCollection: ICustdat[] = [{ id: 456 }];
          expectedResult = service.addCustdatToCollectionIfMissing(custdatCollection, custdat);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(custdat);
        });

        it('should add only unique Custdat to an array', () => {
          const custdatArray: ICustdat[] = [{ id: 123 }, { id: 456 }, { id: 21243 }];
          const custdatCollection: ICustdat[] = [{ id: 123 }];
          expectedResult = service.addCustdatToCollectionIfMissing(custdatCollection, ...custdatArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const custdat: ICustdat = { id: 123 };
          const custdat2: ICustdat = { id: 456 };
          expectedResult = service.addCustdatToCollectionIfMissing([], custdat, custdat2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(custdat);
          expect(expectedResult).toContain(custdat2);
        });

        it('should accept null and undefined values', () => {
          const custdat: ICustdat = { id: 123 };
          expectedResult = service.addCustdatToCollectionIfMissing([], null, custdat, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(custdat);
        });

        it('should return initial array if no Custdat is added', () => {
          const custdatCollection: ICustdat[] = [{ id: 123 }];
          expectedResult = service.addCustdatToCollectionIfMissing(custdatCollection, undefined, null);
          expect(expectedResult).toEqual(custdatCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
