import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string) {
    if (filterString === '') {
      return value;
    } else {
      const filterLen = filterString.length;
      const resultArray = [];
      for (const item of value) {
        if (item.userName.substr(0, filterLen) === filterString) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }
}
