import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAcctdat, getAcctdatIdentifier } from '../acctdat.model';

export type EntityResponseType = HttpResponse<IAcctdat>;
export type EntityArrayResponseType = HttpResponse<IAcctdat[]>;

@Injectable({ providedIn: 'root' })
export class AcctdatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/acctdats', 'acctdatmicro');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(acctdat: IAcctdat): Observable<EntityResponseType> {
    return this.http.post<IAcctdat>(this.resourceUrl, acctdat, { observe: 'response' });
  }

  update(acctdat: IAcctdat): Observable<EntityResponseType> {
    return this.http.put<IAcctdat>(`${this.resourceUrl}/${getAcctdatIdentifier(acctdat) as number}`, acctdat, { observe: 'response' });
  }

  partialUpdate(acctdat: IAcctdat): Observable<EntityResponseType> {
    return this.http.patch<IAcctdat>(`${this.resourceUrl}/${getAcctdatIdentifier(acctdat) as number}`, acctdat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAcctdat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcctdat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAcctdatToCollectionIfMissing(acctdatCollection: IAcctdat[], ...acctdatsToCheck: (IAcctdat | null | undefined)[]): IAcctdat[] {
    const acctdats: IAcctdat[] = acctdatsToCheck.filter(isPresent);
    if (acctdats.length > 0) {
      const acctdatCollectionIdentifiers = acctdatCollection.map(acctdatItem => getAcctdatIdentifier(acctdatItem)!);
      const acctdatsToAdd = acctdats.filter(acctdatItem => {
        const acctdatIdentifier = getAcctdatIdentifier(acctdatItem);
        if (acctdatIdentifier == null || acctdatCollectionIdentifiers.includes(acctdatIdentifier)) {
          return false;
        }
        acctdatCollectionIdentifiers.push(acctdatIdentifier);
        return true;
      });
      return [...acctdatsToAdd, ...acctdatCollection];
    }
    return acctdatCollection;
  }
}
