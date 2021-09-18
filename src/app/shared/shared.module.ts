import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCheckboxComponent } from './components/filter-checkbox/filter-checkbox.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    FilterCheckboxComponent,
    FilterPipe,
    SafeUrlPipe
  ],
  imports: [CommonModule],
  exports:[
    FilterCheckboxComponent,
    FilterPipe,
    SafeUrlPipe
  ]
})
export class SharedModule {}
