import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICxacaix, getCxacaixIdentifier } from '../cxacaix.model';

export type EntityResponseType = HttpResponse<ICxacaix>;
export type EntityArrayResponseType = HttpResponse<ICxacaix[]>;

@Injectable({ providedIn: 'root' })
export class CxacaixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cxacaixes', 'cxacaixmicro');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cxacaix: ICxacaix): Observable<EntityResponseType> {
    return this.http.post<ICxacaix>(this.resourceUrl, cxacaix, { observe: 'response' });
  }

  update(cxacaix: ICxacaix): Observable<EntityResponseType> {
    return this.http.put<ICxacaix>(`${this.resourceUrl}/${getCxacaixIdentifier(cxacaix) as number}`, cxacaix, { observe: 'response' });
  }

  partialUpdate(cxacaix: ICxacaix): Observable<EntityResponseType> {
    return this.http.patch<ICxacaix>(`${this.resourceUrl}/${getCxacaixIdentifier(cxacaix) as number}`, cxacaix, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICxacaix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICxacaix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCxacaixToCollectionIfMissing(cxacaixCollection: ICxacaix[], ...cxacaixesToCheck: (ICxacaix | null | undefined)[]): ICxacaix[] {
    const cxacaixes: ICxacaix[] = cxacaixesToCheck.filter(isPresent);
    if (cxacaixes.length > 0) {
      const cxacaixCollectionIdentifiers = cxacaixCollection.map(cxacaixItem => getCxacaixIdentifier(cxacaixItem)!);
      const cxacaixesToAdd = cxacaixes.filter(cxacaixItem => {
        const cxacaixIdentifier = getCxacaixIdentifier(cxacaixItem);
        if (cxacaixIdentifier == null || cxacaixCollectionIdentifiers.includes(cxacaixIdentifier)) {
          return false;
        }
        cxacaixCollectionIdentifiers.push(cxacaixIdentifier);
        return true;
      });
      return [...cxacaixesToAdd, ...cxacaixCollection];
    }
    return cxacaixCollection;
  }
}
