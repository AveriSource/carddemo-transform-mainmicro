import { Acctdat } from 'app/entities/ACCTDATMICRO/acctdat/acctdat.model';
import { Custdat } from 'app/entities/CUSTDATMICRO/custdat/custdat.model';

export interface ICoactvwc {
  acctdat?: Acctdat;
  custdat?: Custdat;
}

export class Coactvwc {
  constructor(public acctdat?: Acctdat, public custdat?: Custdat) {}
}

export function getCoactvwcIdentifier(coactvwc: ICoactvwc): number | undefined {
  return coactvwc.acctdat!.acctId;
}
