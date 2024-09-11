export interface IAcctdat {
  id?: number;
  acctdatId?: number | null;
  acctId?: number;
  acctActiveStatus?: string | null;
  acctCurrBal?: number | null;
  acctCreditLimit?: number | null;
  acctCashCreditLimit?: number | null;
  acctOpenDate?: string | null;
  acctExpiraionDate?: string | null;
  acctReissueDate?: string | null;
  acctCurrCycCredit?: number | null;
  acctCurrCycDebit?: number | null;
  acctAddrZip?: string | null;
  acctGroupId?: string | null;
  filler?: string | null;
}

export class Acctdat implements IAcctdat {
  constructor(
    public id?: number,
    public acctdatId?: number | null,
    public acctId?: number,
    public acctActiveStatus?: string | null,
    public acctCurrBal?: number | null,
    public acctCreditLimit?: number | null,
    public acctCashCreditLimit?: number | null,
    public acctOpenDate?: string | null,
    public acctExpiraionDate?: string | null,
    public acctReissueDate?: string | null,
    public acctCurrCycCredit?: number | null,
    public acctCurrCycDebit?: number | null,
    public acctAddrZip?: string | null,
    public acctGroupId?: string | null,
    public filler?: string | null
  ) {}
}

export function getAcctdatIdentifier(acctdat: IAcctdat): number | undefined {
  return acctdat.id;
}
