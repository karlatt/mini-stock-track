import { DecimalPipe, PercentPipe } from '@angular/common';
import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'prefsuffix',
})
export class PreSufPipe implements PipeTransform {
  constructor(
    private readonly decimalPipe: DecimalPipe,
    private readonly percentPipe: PercentPipe
  ) {}

  transform(
    value: number | undefined,
    percent = false
  ): string {
    if (value === undefined) {
      return '';
    }
    const sign = value > 0 ? '+' : '';
    const displayed = percent
      ? this.percentPipe.transform(value/100, '1.0-2')
      : this.decimalPipe.transform(value, '1.0-2');
    return `${sign}${displayed}`;
  }
}
