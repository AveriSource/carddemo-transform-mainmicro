import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICoactvwc } from '../coactvwc.model';

import { CoactvwcService } from './coactvwc.service';
import { IAcctdat } from 'app/entities/ACCTDATMICRO/acctdat/acctdat.model';

describe('Service Tests', () => {
  describe('Coactvwc Service', () => {
    let service: CoactvwcService;
    let httpMock: HttpTestingController;
    let elemDefault: ICoactvwc;
    let elemAccount: IAcctdat;
    let expectedResult: ICoactvwc | ICoactvwc[] | IAcctdat[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CoactvwcService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        acctdat: {
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
        },
        custdat: {
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
        },
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

      it('should return a list of Acctdat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            coactvwcId: 1,
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
          elemAccount
        );

        const expected = Object.assign({}, returnedFromService);

        service.queryAcctdats().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
