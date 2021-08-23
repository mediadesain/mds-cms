import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './shared/components/auth/auth.component';
import { MenubarComponent } from './shared/components/menubar/menubar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { environment } from '../environments/environment';
import firebase from "firebase/app";
import { AuthService } from './shared/services/firebase/auth.service';
import { AuthGuardService } from './shared/guard/auth.guard';
import { DatabaseService } from './shared/services/firebase/database.service';
import { StorageService } from './shared/services/firebase/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenubarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuardService, DatabaseService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebase)
  }
}
