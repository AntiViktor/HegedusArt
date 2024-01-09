import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forintCurrency'
})
export class ForintCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return ''; // Handle non-numeric values gracefully
    }

    const formattedValue = value.toFixed(0); // Format number with two decimal places
    return `${formattedValue} Ft`;
  }

}
