import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'drpSearch'
})
export class DrpSearchPipe implements PipeTransform {

  transform(value: any[], searchText:string) {
    if (searchText.trim()) {
      return value.filter(item => item.name.toLowerCase().search(searchText.trim().toLowerCase()) >= 0 ? true : false)
    } else {
      return value
    }
  }

}
