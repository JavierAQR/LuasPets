package com.backend.luaspets.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.paypal.core.PayPalHttpClient;
import com.paypal.orders.OrdersCreateRequest;

@Controller
@CrossOrigin(origins = { "http://localhost:4200" })
public class PayPalController {

    private final PayPalHttpClient payPalClient;

    public PayPalController(PayPalHttpClient payPalClient) {
        this.payPalClient = payPalClient;
    }



    @GetMapping("/paypal/test")
    public ResponseEntity<String> testPayPalIntegration() {
    OrdersCreateRequest request = new OrdersCreateRequest();
    request.prefer("return=representation");

    // Construir el cuerpo de la solicitud
    request.requestBody(Map.of(
        "intent", "CAPTURE",
        "purchase_units", List.of(Map.of(
            "amount", Map.of(
                "currency_code", "USD",
                "value", "10.00"
            )
        ))
    ));

    try {
        // Ejecutar la solicitud
        var response = payPalClient.execute(request);
        return ResponseEntity.ok("PayPal client está funcionando correctamente. Estado: " + response.statusCode() +
                                 ", Respuesta: " + response.result());
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error al probar PayPal client: " + e.getMessage());
    }
}

}
