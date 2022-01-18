import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { konfersiURLslug } from '../../helper/mds-helper.component';
import { CheckBoxModelInterface, FilterModelInterface, FilterSelectedInterface } from './filter-checkbox.interface';
@Component({
  selector: 'filter-checkbox',
  templateUrl: 'filter-checkbox.component.html'
})

export class FilterCheckboxComponent implements OnInit {
  @Input() Title: string | undefined;
  @Input() data: any;
  @Input('FilterModel') filterBy!: string[];
  @Input('FilteredModel') filterSelected!: FilterSelectedInterface;
  filterList: FilterModelInterface = {}
  filterSelectedUrl: FilterSelectedInterface = {};
  
  constructor(
    public router: Router,
    public activeroute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.filterToCheckbox();
  }

  filterToCheckbox(){
    this.filterBy.forEach( (prop: string) => {
      // Create Filter Model
      const getAllValue = this.data.map( (item:any) => item[prop] );
      const listval = [...new Set(getAllValue.flat())];
      const convertcheckbox:any = [];
      listval.forEach( (val: any) => {
        const obj:any = {};
        obj['text'] = val;
        obj['value'] = konfersiURLslug(val);
        if(!obj['ischecked'])
          obj['ischecked'] = false;
        this.activeroute.queryParams.subscribe( param => {
          if(param[prop]){
            const isArray = param[prop].includes(',');
            const checkArrOrStr = isArray ? param[prop].split(',') : [param[prop]];
            const isInclude = checkArrOrStr.map( (a: string) => a === obj['value']).includes(true);
            obj['ischecked']= isInclude ? true : false;
          }
        });
        convertcheckbox.push(obj);
      })
      this.filterList[prop] = convertcheckbox;
      // Selected Filter Model
      setTimeout( () => {
        this.filterSelected[prop] = this.filterList[prop].filter((a)=>a.ischecked).map((a:any)=>a.text);
        this.filterSelectedUrl[prop] = this.filterList[prop].filter((a)=>a.ischecked).map((a)=>a.value);
        if(this.filterSelected[prop].length == 0)
          delete this.filterSelected[prop]
      }, 500);
    });
  }


  checkBoxFilter(filterSelected: FilterSelectedInterface, filterSelectedUrl: FilterSelectedInterface, prop: string, select: CheckBoxModelInterface) {
    // ----- IF URL PARAMETER EMPTY ----- //
    if (!filterSelected[prop] || !filterSelectedUrl[prop]) {
      filterSelected[prop] = []
      filterSelectedUrl[prop] = []
    }
    this.router.navigate([], { 
      queryParams: {[prop]: select.value},
      queryParamsHandling: 'merge'
    })

    // ----- IF URL PARAMETER EXSIEST ----- //
    const idx = filterSelected[prop].indexOf(select.text)
    if (idx > -1) {
      // Remove param value/s
      filterSelected[prop].splice(idx, 1);
      filterSelectedUrl[prop].splice(idx, 1);
      // Delete property if value/s empty
      if (filterSelected[prop].length == 0 || filterSelectedUrl[prop].length == 0) {
        delete filterSelected[prop]
        delete filterSelectedUrl[prop]
      }
      // Remove to url queryParam
      this.router.navigate([], { 
        queryParams: {[prop]: filterSelectedUrl[prop] ? filterSelectedUrl[prop].join() : null},
        queryParamsHandling: 'merge'
      })
    } else {
      // Add property value/s
      filterSelectedUrl[prop],filterSelected[prop].push(select.text);
      filterSelectedUrl[prop].push(select.value);
      // Add to url queryParam
      this.router.navigate([], { 
        queryParams: {[prop]: filterSelectedUrl[prop].join()},
        queryParamsHandling: 'merge'
      })
    }
  }

  resetFilter(filter: FilterModelInterface, filterSelected: FilterSelectedInterface, prop:string){
    filter[prop].forEach( (a:any) => a.ischecked = false );
    delete filterSelected[prop]
    this.router.navigate([], { 
      queryParams: {[prop]: null},
      queryParamsHandling: 'merge'
    })
  }

  resetAll(filter: FilterModelInterface, filterSelected: FilterSelectedInterface, props:string[]){
    props.forEach( (prop) => {
      filter[prop].forEach( (a:any) => a.ischecked = false);
      delete filterSelected[prop]
      this.router.navigate([], { queryParams: {} })
    });
  }

}
