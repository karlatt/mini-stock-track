import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Stock } from '@data/models';
import { ApiGatewayService } from '@data/gateway';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stock-layout',
  templateUrl: './stock-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockLayoutComponent implements OnInit {
  code!: string;
  stocks$!: Observable<Array<Stock>>;
  codePattern = '^[a-zA-Z]{0,5}$';

  isLoading: boolean = false;
  constructor(
    private readonly apiGateway: ApiGatewayService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.apiGateway.initializeFromSavedData(this.messageService);
    this.stocks$ = this.apiGateway.trackedStock$;
  }

  sendCode(): void {
    this.isLoading = true;
    this.apiGateway.fetchStockData(this.code, this.messageService);
    this.isLoading = false;
    this.code = '';
  }
  removeFromTrackedData: (code: string) => void = (code) =>
    this.apiGateway.removeStockFromTrackedData(code);
}
