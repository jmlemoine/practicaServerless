import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../services/reserva.service';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  nombre = '';
  laboratorio = '';
  fechayhora = '';
  fechayhoraI = '';
  max!: number;
  reserva: Reserva = null!;
  textSpinner = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      this.max = data['max'];
    });
  }

  onCreate(): void {
    this.max++;
    console.log("Fecha larga: "+this.fechayhora);
    let date = new Date(this.fechayhora);
    let newdate = this.datepipe.transform(this.fechayhora, 'MM/dd/yyyy') as string;
    console.log("Fecha corta: "+newdate);
    console.log("Hora 12 horas: "+this.fechayhoraI);
    let times = moment(this.fechayhoraI, 'hh:mm A').format('HH:mm');
    console.log("Hora 24 horas: "+times);
    var nt = moment(times, 'HH:mm').add(1, 'hours').format('HH:mm');
    console.log("Hora 24 horas + 1: "+nt);
    let newdatetime = newdate + ' ' + times + ' a ' + nt as string;
    

    var startTime = moment('08:00', "HH:mm");
    var endTime = moment('21:00', "HH:mm");
    var mediumtime = moment(times, "HH:mm");
    let t = new Date(times);
    //var currentTime = moment(t);
    //console.log(currentTime);
    startTime.toString();
    endTime.toString();
    times.toString();
    if (startTime > mediumtime) {
      console.log("NO");
    }
    else if (endTime < mediumtime) {
      console.log("NO");
    }
    else {
      console.log("SI");
      this.reserva = new Reserva(this.max, this.nombre, this.laboratorio, newdatetime);
      this.textSpinner = 'Creando Reserva ...'
      this.spinner.show();
      this.reservaService.write(this.reserva).subscribe(data => {
        this.spinner.hide();
        this.router.navigate(['/']);
      })
    }

    
  }

}
