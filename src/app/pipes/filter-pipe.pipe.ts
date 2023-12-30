// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Car[], filterText: string, filterColorText: string): Car[] {
    filterText = filterText ? filterText.toLowerCase() : '';
    filterColorText = filterColorText ? filterColorText.toLowerCase() : '';

    return value.filter((c: Car) => {   
      const brandMatch = c.brandName.toLowerCase().includes(filterText);
      const colorMatch = c.colorName.toLowerCase().includes(filterColorText);

      // İsterseniz sadece biri eşleşse de yeterlidir, ya da her ikisi de eşleşmeli
      return (filterText === '' || brandMatch) && (filterColorText === '' || colorMatch);
    });
  }
}
