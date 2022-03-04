import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  reservaURL = environment.reservaURL;

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Reserva[]> { // Retornar un array o arreglo de reservas
    return this.httpClient.get<Reserva[]>(this.reservaURL);
  }

  public write(reserva: Reserva): Observable<Reserva> { // Retornar una reserva creada o editada
    return this.httpClient.post<Reserva>(this.reservaURL, reserva);
  }

  public delete(id: number): Observable<Reserva> { // Retornar una reserva eliminada
    return this.httpClient.delete<Reserva>(this.reservaURL + `${id}`);
  }

}
