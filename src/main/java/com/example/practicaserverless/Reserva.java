package com.example.practicaserverless;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "reserva")
public class Reserva {

    @DynamoDBHashKey
    private int id;

    @DynamoDBAttribute
    private String nombre;

    @DynamoDBAttribute
    private String laboratorio;

    @DynamoDBAttribute
    private String fechayhora;

    public Reserva() {}

    public Reserva(int id, String nombre, String laboratorio, String fechayhora) {
        this.id = id;
        this.nombre = nombre;
        this.laboratorio = laboratorio;
        this.fechayhora = fechayhora;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLaboratorio() {
        return laboratorio;
    }

    public void setLaboratorio(String laboratorio) {
        this.laboratorio = laboratorio;
    }

    public String getFechayhora() {
        return fechayhora;
    }

    public void setFechayhora(String fechayhora) {
        this.fechayhora = fechayhora;
    }

}
