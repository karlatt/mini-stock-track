import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { FinnHubApiClient } from '@finnHubApi';
import { Sentiment } from '@data/models';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class InsiderSentimentResolver implements Resolve<Sentiment> {

  constructor(private readonly apiClient: FinnHubApiClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Sentiment> {
    let code = route.paramMap.get('code');

    if (!code) {
      throw new Error('Cant get information without symbol to seek');
    }
    code = code.toUpperCase();
    const to = dayjs().startOf('month').subtract(1, 'month');
    const from = to.subtract(2, 'month');
    return this.apiClient.symbolSearch(code).pipe(
      switchMap((quote) =>
        this.apiClient.insiderSentiment(code!, from.format(DATE_FORMAT), to.format(DATE_FORMAT)).pipe(
          map((res) => ({
            code: code!,
            name: quote.result!.find((r) => r.symbol === code)!.description!,
            data: res.data!.map(
              (d) =>
                ({
                  date:dayjs()
                  .startOf('month')
                  .set('year', d.year!)
                  .set('month', d.month!)
                  .toDate(),
                  mspr: d.mspr!,
                  change: d.change!,
                  isPositive: d.change! > 0,
                }!)
            ),
          }))
        )
      )
    );
  }


  subtractMonths(numOfMonths: number, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);

    return date;
  }
}
const DATE_FORMAT:string= "YYYY-MM-DD";
