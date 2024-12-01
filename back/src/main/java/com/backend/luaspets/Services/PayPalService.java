package com.backend.luaspets.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.paypal.core.PayPalHttpClient;
import com.paypal.http.HttpResponse;
import com.paypal.http.exceptions.HttpException;
import com.paypal.orders.*;

@Service
public class PayPalService {
    
     private final PayPalHttpClient payPalClient;

    public PayPalService(PayPalHttpClient payPalClient) {
        this.payPalClient = payPalClient;
    }

    public String createOrder(double totalAmount, String currency) {
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.checkoutPaymentIntent("CAPTURE");

        ApplicationContext applicationContext = new ApplicationContext()
                .brandName("LuasPets")
                .landingPage("BILLING")
                .cancelUrl("http://localhost:8080/cancel")
                .returnUrl("http://localhost:8080/success");

        orderRequest.applicationContext(applicationContext);

        List<PurchaseUnitRequest> purchaseUnits = new ArrayList<>();
        PurchaseUnitRequest purchaseUnitRequest = new PurchaseUnitRequest()
                .amountWithBreakdown(new AmountWithBreakdown()
                        .currencyCode(currency)
                        .value(String.valueOf(totalAmount)));
        purchaseUnits.add(purchaseUnitRequest);
        orderRequest.purchaseUnits(purchaseUnits);

        OrdersCreateRequest request = new OrdersCreateRequest();
        request.requestBody(orderRequest);

        try {
            HttpResponse<Order> response = payPalClient.execute(request);
            return response.result().id();
        } catch (HttpException e) {
            System.err.println("Error al crear la orden: " + e.getMessage());
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
