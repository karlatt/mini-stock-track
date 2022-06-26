
import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'sign',
})
export class SignPipe implements PipeTransform {
  constructor() {}

  transform(
    value: number | undefined
  ): string {
    if (value === undefined) {
      return '';
    }
    const sign = value > 0 ? '+' : '';
    return `${sign}${value}`;
  }
}
