import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectEmpty'
})
export class ObjectEmptyPipe implements PipeTransform {

  transform(value: object): unknown {
    return Object.keys(value).length === 0;
  }

}
