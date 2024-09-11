export interface ICustdat {
  id?: number;
  custdatId?: number | null;
  custId?: number | null;
  custFirstName?: string | null;
  custMiddleName?: string | null;
  custLastName?: string | null;
  custAddrLine1?: string | null;
  custAddrLine2?: string | null;
  custAddrLine3?: string | null;
  custAddrStateCd?: string | null;
  custAddrCountryCd?: string | null;
  custAddrZip?: string | null;
  custPhoneNum1?: string | null;
  custPhoneNum2?: string | null;
  custSsn?: number | null;
  custGovtIssuedId?: string | null;
  custDobYyyyMmDd?: string | null;
  custEftAccountId?: string | null;
  custPriCardHolderInd?: string | null;
  custFicoCreditScore?: number | null;
  filler?: string | null;
}

export class Custdat implements ICustdat {
  constructor(
    public id?: number,
    public custdatId?: number | null,
    public custId?: number | null,
    public custFirstName?: string | null,
    public custMiddleName?: string | null,
    public custLastName?: string | null,
    public custAddrLine1?: string | null,
    public custAddrLine2?: string | null,
    public custAddrLine3?: string | null,
    public custAddrStateCd?: string | null,
    public custAddrCountryCd?: string | null,
    public custAddrZip?: string | null,
    public custPhoneNum1?: string | null,
    public custPhoneNum2?: string | null,
    public custSsn?: number | null,
    public custGovtIssuedId?: string | null,
    public custDobYyyyMmDd?: string | null,
    public custEftAccountId?: string | null,
    public custPriCardHolderInd?: string | null,
    public custFicoCreditScore?: number | null,
    public filler?: string | null
  ) {}
}

export function getCustdatIdentifier(custdat: ICustdat): number | undefined {
  return custdat.id;
}
