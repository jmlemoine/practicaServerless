import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CreateComponent } from './reserva/create.component';
import { DetailComponent } from './reserva/detail.component';
import { ListComponent } from './reserva/list.component';
import { UpdateComponent } from './reserva/update.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update', component: UpdateComponent },

  // Si se pone una dirección desconocida se redirecciona a ListComponent
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
