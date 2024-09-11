import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAcctdat, Acctdat } from '../acctdat.model';

import { AcctdatService } from './acctdat.service';

describe('Service Tests', () => {
  describe('Acctdat Service', () => {
    let service: AcctdatService;
    let httpMock: HttpTestingController;
    let elemDefault: IAcctdat;
    let expectedResult: IAcctdat | IAcctdat[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AcctdatService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        acctdatId: 0,
        acctId: 0,
        acctActiveStatus: 'AAAAAAA',
        acctCurrBal: 0,
        acctCreditLimit: 0,
        acctCashCreditLimit: 0,
        acctOpenDate: 'AAAAAAA',
        acctExpiraionDate: 'AAAAAAA',
        acctReissueDate: 'AAAAAAA',
        acctCurrCycCredit: 0,
        acctCurrCycDebit: 0,
        acctAddrZip: 'AAAAAAA',
        acctGroupId: 'AAAAAAA',
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

      it('should create a Acctdat', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Acctdat()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Acctdat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            acctdatId: 1,
            acctId: 1,
            acctActiveStatus: 'BBBBBB',
            acctCurrBal: 1,
            acctCreditLimit: 1,
            acctCashCreditLimit: 1,
            acctOpenDate: 'BBBBBB',
            acctExpiraionDate: 'BBBBBB',
            acctReissueDate: 'BBBBBB',
            acctCurrCycCredit: 1,
            acctCurrCycDebit: 1,
            acctAddrZip: 'BBBBBB',
            acctGroupId: 'BBBBBB',
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

      it('should partial update a Acctdat', () => {
        const patchObject = Object.assign(
          {
            acctdatId: 1,
            acctCreditLimit: 1,
            acctOpenDate: 'BBBBBB',
            acctExpiraionDate: 'BBBBBB',
            filler: 'BBBBBB',
          },
          new Acctdat()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Acctdat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            acctdatId: 1,
            acctId: 1,
            acctActiveStatus: 'BBBBBB',
            acctCurrBal: 1,
            acctCreditLimit: 1,
            acctCashCreditLimit: 1,
            acctOpenDate: 'BBBBBB',
            acctExpiraionDate: 'BBBBBB',
            acctReissueDate: 'BBBBBB',
            acctCurrCycCredit: 1,
            acctCurrCycDebit: 1,
            acctAddrZip: 'BBBBBB',
            acctGroupId: 'BBBBBB',
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

      it('should delete a Acctdat', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAcctdatToCollectionIfMissing', () => {
        it('should add a Acctdat to an empty array', () => {
          const acctdat: IAcctdat = { id: 123 };
          expectedResult = service.addAcctdatToCollectionIfMissing([], acctdat);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(acctdat);
        });

        it('should not add a Acctdat to an array that contains it', () => {
          const acctdat: IAcctdat = { id: 123 };
          const acctdatCollection: IAcctdat[] = [
            {
              ...acctdat,
            },
            { id: 456 },
          ];
          expectedResult = service.addAcctdatToCollectionIfMissing(acctdatCollection, acctdat);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Acctdat to an array that doesn't contain it", () => {
          const acctdat: IAcctdat = { id: 123 };
          const acctdatCollection: IAcctdat[] = [{ id: 456 }];
          expectedResult = service.addAcctdatToCollectionIfMissing(acctdatCollection, acctdat);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(acctdat);
        });

        it('should add only unique Acctdat to an array', () => {
          const acctdatArray: IAcctdat[] = [{ id: 123 }, { id: 456 }, { id: 24409 }];
          const acctdatCollection: IAcctdat[] = [{ id: 123 }];
          expectedResult = service.addAcctdatToCollectionIfMissing(acctdatCollection, ...acctdatArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const acctdat: IAcctdat = { id: 123 };
          const acctdat2: IAcctdat = { id: 456 };
          expectedResult = service.addAcctdatToCollectionIfMissing([], acctdat, acctdat2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(acctdat);
          expect(expectedResult).toContain(acctdat2);
        });

        it('should accept null and undefined values', () => {
          const acctdat: IAcctdat = { id: 123 };
          expectedResult = service.addAcctdatToCollectionIfMissing([], null, acctdat, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(acctdat);
        });

        it('should return initial array if no Acctdat is added', () => {
          const acctdatCollection: IAcctdat[] = [{ id: 123 }];
          expectedResult = service.addAcctdatToCollectionIfMissing(acctdatCollection, undefined, null);
          expect(expectedResult).toEqual(acctdatCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
