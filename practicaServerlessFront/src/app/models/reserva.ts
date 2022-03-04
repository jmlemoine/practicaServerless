export class Reserva {

    id: number;
    nombre: string;
    laboratorio: string;
    fechayhora: string;

    constructor(id: number, nombre: string, laboratorio: string, fechayhora: string) {
        this.id = id;
        this.nombre = nombre;
        this.laboratorio = laboratorio;
        this.fechayhora = fechayhora;
    }

}
