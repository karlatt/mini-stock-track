import { Injectable } from '@angular/core';
import { FinnHubApiClient, Quote, SymbolLookupInfo } from '@finnHubApi';
import { LocalStorageService } from '@core/services/storage';
import { DataStoreService } from '@core/services/data';
import { forkJoin, map, Observable } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { Stock } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayService {
  constructor(
    private readonly apiClient: FinnHubApiClient,
    private readonly localStorage: LocalStorageService,
    private readonly store: DataStoreService
  ) {}

  get trackedKey$(): Observable<Array<string>> {
    return this.store.getMapKey$();
  }

  get trackedStock$(): Observable<Array<Stock>> {
    return this.store.getValue$<Stock>();
  }
  initializeFromSavedData(messageService: MessageService): void {
    this.store.initializeValues<Stock>(
      (code) => this.fetchStockData(code, messageService),
      this.localStorage.getArrayOfItems<string>(),
      true
    );
  }

  fetchStockData(code: string, messageService: MessageService) {
    code = code.toUpperCase();
    forkJoin([
      this.apiClient
        .symbolSearch(code)
        .pipe(map((resp) => resp.result?.find((s) => s.symbol === code))),
      this.apiClient.quote(code),
    ]).subscribe({
      next: ([lookup, quote]) =>
        this.manageNewStock(lookup, quote, code, messageService),
      error: (e) => this.manageError(e, 'fetchStockData', messageService),
    });
  }
  manageError(
    e: any,
    methodName: string,
    messageService: MessageService
  ): void {
    let message = `An error occurred when calling ${methodName}`;
    if (e instanceof Error) {
      message += `\nCause:${e.message}`;
    }
    const serviceMessage: Message = {
      icon: 'pi-exclamation-triangle',
      severity: 'error',
      summary: 'Error',
      detail: message,
    };

    messageService.add(serviceMessage);
  }
  manageNewStock(
    lookup: SymbolLookupInfo | undefined,
    quote: Quote,
    code: string,
    messageService: MessageService
  ): void {
    if (!lookup) {
      const serviceMessage: Message = {
        icon: 'pi-exclamation-triangle',
        severity: 'error',
        summary: 'Error',
        detail: `Impossible to find accurate information for code => ${code}`,
      };

      messageService.add(serviceMessage);
      return;
    }
    const stock = ApiGatewayService.createStockModel(lookup, quote, code);
    this.addStockToTrackedData(stock);
  }
  addStockToTrackedData(stock: Stock, emit: boolean = true) {
    this.localStorage.addItemToArray(stock.code);
    this.store.upsertItem<Stock>(stock.code, stock, emit);
  }
  removeStockFromTrackedData(code: string, emit: boolean = true) {
    this.localStorage.removeItemFromArray(code);
    this.store.removeItem(code, emit);
  }

  private static createStockModel(
    lookup: SymbolLookupInfo,
    quote: Quote,
    code: string
  ): Stock {
    return {
      code: code,
      change: quote.dp!,
      openingPrice: quote.o!,
      highPrice: quote.h!,
      name: lookup.description!,
      currentPrice: quote.c!,
      isPositive: quote.dp! > 0,
      date: new Date(),
    };
  }
}
