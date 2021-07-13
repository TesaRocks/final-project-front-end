import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortPipe implements PipeTransform {
  transform(value: any): unknown {
    if (value.length > 8) {
      return value.substr(0, 8) + ' ...';
    } else {
      return value;
    }
  }
}
