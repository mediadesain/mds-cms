
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    SafeUrlPipe
  ],
  imports: [CommonModule],
  exports:[
    FilterPipe,
    SafeUrlPipe
  ]
})
export class PipesModule {}
