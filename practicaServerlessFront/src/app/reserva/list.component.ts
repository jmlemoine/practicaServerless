import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  reservas: Reserva[] = [];
  textSpinner = '';
  max: number | undefined;

  

  constructor(private reservaService: ReservaService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void { 
    this.onLoad();
  }

  onLoad(): void { // Refrescar el listado de reservas
    this.textSpinner = 'Cargando Reservas ...'
    this.spinner.show();
    this.reservaService.list().subscribe(data => {
      this.reservas = this.orderBy(data);
      this.max = this.getMax();
      this.spinner.hide();
      console.log(this.reservas.length);
    })
  }

  orderBy(reservas: Reserva[]): Reserva[] {

    // Verificar si el id de a es mayor al id de b
    // Si cumple devuelve el primero, de lo contrario devuelve el último
    return reservas.sort((a, b) => (a.id > b.id ? 1 : -1))
  }

  getMax(): number {
    return Math.max(...this.reservas.map(p => p.id));
  }

  onDelete(id: number): void {
    this.textSpinner = 'Eliminando Reserva ...'
    this.spinner.show();
    this.reservaService.delete(id).subscribe(data => {
      this.onLoad();
    })
  }

}
