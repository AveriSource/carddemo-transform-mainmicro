export interface ICxacaix {
  id?: number;
  cxacaixId?: number | null;
  xrefCardNum?: string | null;
  xrefCustId?: number | null;
  xrefAcctId?: number | null;
  filler?: string | null;
}

export class Cxacaix implements ICxacaix {
  constructor(
    public id?: number,
    public cxacaixId?: number | null,
    public xrefCardNum?: string | null,
    public xrefCustId?: number | null,
    public xrefAcctId?: number | null,
    public filler?: string | null
  ) {}
}

export function getCxacaixIdentifier(cxacaix: ICxacaix): number | undefined {
  return cxacaix.id;
}
