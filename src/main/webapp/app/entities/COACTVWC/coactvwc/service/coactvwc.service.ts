import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICoactvwc } from '../coactvwc.model';
import { IAcctdat } from 'app/entities/ACCTDATMICRO/acctdat/acctdat.model';
import { EntityArrayResponseType as AcctdatArrayResponseType } from 'app/entities/ACCTDATMICRO/acctdat/service/acctdat.service';

export type EntityResponseType = HttpResponse<ICoactvwc>;
export type EntityArrayResponseType = HttpResponse<ICoactvwc[]>;

@Injectable({ providedIn: 'root' })
export class CoactvwcService {
  protected acctdatResourceUrl = this.applicationConfigService.getEndpointFor('api/acctdats', 'acctdatmicro');
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/readAcct', 'coactvwc');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICoactvwc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  queryAcctdats(req?: any): Observable<AcctdatArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcctdat[]>(this.acctdatResourceUrl, { params: options, observe: 'response' });
  }
}
