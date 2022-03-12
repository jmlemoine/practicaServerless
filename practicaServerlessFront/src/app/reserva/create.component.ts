import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../services/reserva.service';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';

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
    public datepipe: DatePipe,
    private toastr: ToastrService, private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      this.max = data['max'];
    });
    this.doGet();
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
    
    const arrayTime = times.split(":");
    let word = arrayTime[1];
    console.log("Minuto: "+word);

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
      this.toastr.error('Solo puede reservar entre las 8AM y las 9PM!', 'Reserva NO Agregada!');
    }
    else if (endTime < mediumtime) {
      console.log("NO");
      this.toastr.error('Solo puede reservar entre las 8AM y las 9PM!', 'Reserva NO Agregada!');
      /*(error: any) => {
        
        console.log(error)
      }*/
      
    }
    else if (word != '00') {
      this.toastr.error('Solo puede reservar poniendo 00 en minutos!', 'Reserva NO Agregadass!');
    }
    else {
      console.log("SI");
      this.reserva = new Reserva(this.max, this.nombre, this.laboratorio, newdatetime);
      this.textSpinner = 'Creando Reserva ...'
      this.spinner.show();
      this.reservaService.write(this.reserva).subscribe(data => {
        /*if (startTime <= mediumtime) {
          //console.log("NO");
          this.toastr.success('Reserva Agregada!', 'Reserva Agregadass!');
        }
        else if (endTime >= mediumtime) {
          //console.log("NO");
          this.toastr.success('Reserva Agregada!', 'Reserva Agregadass!');
        }*/
        this.spinner.hide();
        this.router.navigate(['/']);
      }/*, error => {
        if (startTime > mediumtime) {
          console.log("NO");
          this.toastr.error('Reserva NO Agregada!', 'Reserva NO Agregadass!');
        }
        else if (endTime < mediumtime) {
          console.log("NO");
          this.toastr.error('Reserva NO Agregada!', 'Reserva NO Agregadass!');
        }
      }*/)
      this.toastr.success('Reserva Agregada!', 'Reserva Agregadass!');
    }
    
  }

  doGet() {
    let param: any = { 'nombre': 'k' };

    return this.httpClient.get<Reserva[]>(this.reservaService.reservaURL/*, { params: param }*/).subscribe((res: any) =>
      res.forEach((data: any, index: any) => {
        console.log(data.fechayhora, index)
      })
      
    );

  }

}
