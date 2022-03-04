import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  reserva: Reserva = null!;
  textSpinner = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(x => {
      this.reserva = new Reserva(x['id'], x['nombre'], x['laboratorio'], x['fechayhora'])
    });
  }

  onUpdate(): void {
    this.textSpinner = 'Actualizando Reservas ...'
    this.spinner.show();
    this.reservaService.write(this.reserva).subscribe(data => {
      this.spinner.hide();
      this.router.navigate(['/']);
    })
  }

}
