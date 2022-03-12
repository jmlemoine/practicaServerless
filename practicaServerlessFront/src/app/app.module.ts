import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'

// external
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListComponent } from './reserva/list.component';
import { CreateComponent } from './reserva/create.component';
import { UpdateComponent } from './reserva/update.component';
import { DetailComponent } from './reserva/detail.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, ListComponent, CreateComponent, UpdateComponent, DetailComponent],
  imports: [BrowserModule, NgxSpinnerModule, BrowserAnimationsModule, HttpClientModule,
    HttpClientModule, FormsModule, AppRoutingModule, /*ReactiveFormsModule,*/
    MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
    NgxMaterialTimepickerModule, NgxMatTimepickerModule, ToastrModule.forRoot()],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
