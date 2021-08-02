import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCheckboxComponent } from './components/filter-checkbox/filter-checkbox.component';
import { OfflineMessageComponent } from './components/offline-message/offline-message.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ConnectionService } from './services/conection.service';

@NgModule({
  declarations: [
    FilterCheckboxComponent,
    OfflineMessageComponent,
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
export class SharedModule {
  constructor(private connection : ConnectionService){}
}
