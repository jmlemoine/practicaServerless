import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

// external
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListComponent } from './reserva/list.component';
import { CreateComponent } from './reserva/create.component';
import { UpdateComponent } from './reserva/update.component';
import { DetailComponent } from './reserva/detail.component';

@NgModule({
  declarations: [AppComponent, ListComponent, CreateComponent, UpdateComponent, DetailComponent],
  imports: [BrowserModule, NgxSpinnerModule, BrowserAnimationsModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
