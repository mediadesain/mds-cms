import { Pipe, PipeTransform } from '@angular/core';
import { filterMultiple } from '../helper/mds-helper.component';

@Pipe({
	name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {
	transform(items: any[], filter: any): any[] {
    // console.log('Filter Comparison',items, filter)
    if (!items) { return []; }
    const keys = Object.keys(filter);
    const values = Object.values(filter);
    for (const a in keys){
      const key: string = keys[a];
      const val: any = values[a];
      // console.log({[key]:val})
      if (!Array.isArray(val)){
        items = items.filter( a => a[key].includes(val));
      } else {
        if (val.length > 0) {
          items = filterMultiple(items, key, val);
        }
      }
      // items = !Array.isArray(val) ? items.filter( a => a[key].includes(val)) : filterMultiple(items, key, val)
    }
    // console.log('Filter Resut',items)
    return items;
	}
}

/* Document Filter Pipe Summarized by MediaDesain
  Items is loop of array item and filter is item will show. Makesure format filter like this example
  const items = [
    {category:'A', type:'food'},
    {category:'B', type:'drink'},
    {category:'C', type:'snack'},
    {category:'A', type:'drink'},
    {category:'B', type:'snack'}
  ]
  const filteritems = {
    category:['A','B'],
    type:['food', 'drink']
  }
  <ul>
    <li *ngFor="let item of (items|filter:filteritems)"> ... </li>
  </ul>

  Output [
    {category:'A', type:'food'},
    {category:'B', type:'drink'},
    {category:'A', type:'drink'}
  ]
*/
