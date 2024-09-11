import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICustdat, getCustdatIdentifier } from '../custdat.model';

export type EntityResponseType = HttpResponse<ICustdat>;
export type EntityArrayResponseType = HttpResponse<ICustdat[]>;

@Injectable({ providedIn: 'root' })
export class CustdatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/custdats', 'custdatmicro');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(custdat: ICustdat): Observable<EntityResponseType> {
    return this.http.post<ICustdat>(this.resourceUrl, custdat, { observe: 'response' });
  }

  update(custdat: ICustdat): Observable<EntityResponseType> {
    return this.http.put<ICustdat>(`${this.resourceUrl}/${getCustdatIdentifier(custdat) as number}`, custdat, { observe: 'response' });
  }

  partialUpdate(custdat: ICustdat): Observable<EntityResponseType> {
    return this.http.patch<ICustdat>(`${this.resourceUrl}/${getCustdatIdentifier(custdat) as number}`, custdat, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustdat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustdat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCustdatToCollectionIfMissing(custdatCollection: ICustdat[], ...custdatsToCheck: (ICustdat | null | undefined)[]): ICustdat[] {
    const custdats: ICustdat[] = custdatsToCheck.filter(isPresent);
    if (custdats.length > 0) {
      const custdatCollectionIdentifiers = custdatCollection.map(custdatItem => getCustdatIdentifier(custdatItem)!);
      const custdatsToAdd = custdats.filter(custdatItem => {
        const custdatIdentifier = getCustdatIdentifier(custdatItem);
        if (custdatIdentifier == null || custdatCollectionIdentifiers.includes(custdatIdentifier)) {
          return false;
        }
        custdatCollectionIdentifiers.push(custdatIdentifier);
        return true;
      });
      return [...custdatsToAdd, ...custdatCollection];
    }
    return custdatCollection;
  }
}
