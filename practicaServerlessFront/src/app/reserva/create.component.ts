import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  nombre = '';
  laboratorio = '';
  fechayhora = '';
  max!: number;
  reserva: Reserva = null!;
  textSpinner = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      this.max = data['max'];
    });
  }

  onCreate(): void {
    this.max++;
    this.reserva = new Reserva(this.max, this.nombre, this.laboratorio, this.fechayhora);
    this.textSpinner = 'Creando Reserva ...'
    this.spinner.show();
    this.reservaService.write(this.reserva).subscribe(data => {
      this.spinner.hide();
      this.router.navigate(['/']);
    })
  }

}
