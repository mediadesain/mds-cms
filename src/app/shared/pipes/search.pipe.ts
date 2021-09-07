import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'search',
  pure: false
})

export class SearchPipe implements PipeTransform {
	transform(items: any[], search: { objkey: string, keyword: string }): any[] {
    if(items && search.keyword != undefined)
      items = items.filter( item => item[search.objkey].toLowerCase().includes(search.keyword.toLowerCase()) )
    return items;
	}
}
