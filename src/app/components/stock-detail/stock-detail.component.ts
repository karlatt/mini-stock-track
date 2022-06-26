import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Stock } from '../../data/models/stock.model';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockDetailComponent {
  @Input() stock!: Stock;
  @Output() stockRemover = new EventEmitter<string>();

  //currency pipe params
  currencyPipeParameters = {
    format: '1.0-2',
    symbol: 'USD',
    display: 'symbol-narrow',
  };

  sendRemoveSignal: (code: string) => void = (code) =>
    this.stockRemover.emit(code);
}
