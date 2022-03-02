package com.example.practicaserverless;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.ArrayList;
import java.util.List;

public class Handler implements RequestHandler<Request, Object> {

    @Override
    public Object handleRequest(Request request, Context context) {

        // Creamos la base de datos: cliente por defecto que va a hacer la base de datos
        // Va a tener un rol, es decir, el mismo cliente accede a la base de datos
        // Dicho rol ejecuta la función lambda
        AmazonDynamoDB db = AmazonDynamoDBClientBuilder.defaultClient();

        // Este Mapper accede a los JSON y los convierte en objetos
        // Al igual que los objetos los convierte en JSON
        // Le pasamos una base de datos
        DynamoDBMapper mapper = new DynamoDBMapper(db);

        // Reserva vacía
        Reserva reserva = null;

        // Tipo de método HTTP
        switch (request.getHttpMethod()) {

            // Podemos obtener una reserva en sí
            // También podemos obtener una lista de reservas
            case "GET":
                // Obtener la lista de reservas
                if (request.getId() == 0) {
                    List<Reserva> reservas = new ArrayList<>();
                    reservas = mapper.scan(Reserva.class, new DynamoDBScanExpression());
                    return reservas; // Retorna la lista de reservas
                }
                else { // De lo contrario
                    // Obtiene un id de reserva que será igual al Mapper
                    reserva = mapper.load(Reserva.class, request.getId());
                    return reserva; // Retorna la reserva
                }

            // Crear una nueva reserva
            // También actualizar reserva
            // Si existe lo actualiza, de lo contrario crea una nueva reserva
            case "POST":
                reserva = request.getReserva();
                mapper.save(reserva);
                return reserva; // Retorna la reserva con el id si existe, si no retorna la reserva nueva

            // Para eliminar una reserva
            case "DELETE":
                reserva = mapper.load(Reserva.class, request.getId());
                mapper.delete(reserva);
                return reserva; // Retorna la reserva eliminada

        }

        return null;
    }
}
