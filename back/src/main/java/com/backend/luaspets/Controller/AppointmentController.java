package com.backend.luaspets.Controller;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.luaspets.DTO.AppointmentRequest;
import com.backend.luaspets.DTO.AppointmentResponse;
import com.backend.luaspets.Model.Appointment;
import com.backend.luaspets.Services.AppointmentService;


@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = { "http://localhost:4200" })
public class AppointmentController {

   @Autowired
   private AppointmentService appointmentService;


   // Obtener todas las citas
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    // Obtener una cita por ID
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentById(@PathVariable Integer id) {
        AppointmentResponse response = appointmentService.getAppoinmentById(id);
        return ResponseEntity.ok(response);
    }

   @PostMapping("/create")
   public ResponseEntity<AppointmentResponse> createAppointment(@RequestBody AppointmentRequest request){
    
    AppointmentResponse response = new AppointmentResponse();
    Appointment appointment = appointmentService.createAppointment(request);

    response.setId(appointment.getId());
    response.setUserId(request.getUserId());
    response.setServiceId(request.getServiceId());
    response.setPetId(request.getPetId());
    response.setAppointmentDate(request.getAppointmentDate());
    response.setStartTime(request.getStartTime());
    response.setEndTime(request.getEndTime());


    return ResponseEntity.status(HttpStatus.CREATED).body(response);
   }

   @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable Integer id,
            @RequestBody AppointmentRequest request) {
        Appointment updatedAppointment = appointmentService.updateAppointment(id, request);
        return ResponseEntity.ok(updatedAppointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Integer id) {
        appointmentService.deleteAppointmentById(id);
        return ResponseEntity.noContent().build();
    }

 /* excel */
    @GetMapping("/export.xlsx")
    public ResponseEntity<byte[]> exportFoodData() {
    try (Workbook workbook = new XSSFWorkbook()) {
        Sheet sheet = workbook.createSheet("Citas");

        // Título
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("Lista de Citas");

        // Estilo del título
        CellStyle titleStyle = workbook.createCellStyle();
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 14);
        titleStyle.setFont(titleFont);
        titleStyle.setAlignment(HorizontalAlignment.CENTER);
        titleStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        titleStyle.setFillForegroundColor(IndexedColors.GOLD.getIndex());
        titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // Aplicar el estilo al título y fusionar celdas
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 7)); // Fusiona desde la columna 0 a la columna 9

        // Estilo para el encabezado
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        headerStyle.setFillForegroundColor(IndexedColors.GOLD.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);

        // Estilo para las celdas de datos
        CellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setAlignment(HorizontalAlignment.LEFT);
        dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);

        // Estilo para celdas de precio (número con formato de moneda)
        CellStyle currencyStyle = workbook.createCellStyle();
        currencyStyle.cloneStyleFrom(dataStyle);
        currencyStyle.setDataFormat(workbook.createDataFormat().getFormat("$#,##0.00"));

        // Encabezados
        String[] headers = {"ID", "ID Usuario", "Servicio", "Mascota", "Fecha", "Hora inicio", "Hora fin", "Estado"};
        Row headerRow = sheet.createRow(1); // Mover el encabezado a la fila 1, debajo del título
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
            sheet.autoSizeColumn(i); // Ajuste automático de ancho de columna para que el contenido se vea completo
        }

        // Datos
        List<Appointment> appointments = appointmentService.getAllAppointments();
        int rowIndex = 2; // Comienza en la fila 2, después del título y el encabezado
        for (Appointment appointment : appointments) {
            Row row = sheet.createRow(rowIndex++);

            Cell cellId = row.createCell(0);
            cellId.setCellValue(appointment.getId());
            cellId.setCellStyle(dataStyle);

            Cell cellName = row.createCell(1);
            cellName.setCellValue(appointment.getUser().getId());
            cellName.setCellStyle(dataStyle);

            Cell cellBrand = row.createCell(2);
            cellBrand.setCellValue(appointment.getService().getName());
            cellBrand.setCellStyle(dataStyle);

            Cell cellDescription = row.createCell(3);
            cellDescription.setCellValue(appointment.getPet().getName());
            cellDescription.setCellStyle(dataStyle);

            Cell cellPrice = row.createCell(4);
            cellPrice.setCellValue(appointment.getAppointmentDate());
            cellPrice.setCellStyle(currencyStyle);

            Cell cellStock = row.createCell(5);
            cellStock.setCellValue(appointment.getStartTime().toString());
            cellStock.setCellStyle(dataStyle);

            Cell cellCategory = row.createCell(6);
            cellCategory.setCellValue(appointment.getEndTime().toString());
            cellCategory.setCellStyle(dataStyle);

            Cell cellImageUrl = row.createCell(7);
            cellImageUrl.setCellValue(appointment.getStatus());
            cellImageUrl.setCellStyle(dataStyle);

        }

        // Ajustar ancho de columnas manualmente en caso de que autoSizeColumn no sea suficiente
        for (int i = 0; i < headers.length; i++) {
            sheet.setColumnWidth(i, sheet.getColumnWidth(i) + 1000); // Añadir espacio adicional para evitar que el contenido quede cortado
        }

        // Convertir el Workbook en un byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        byte[] excelData = outputStream.toByteArray();

        HttpHeaders headersResponse = new HttpHeaders();
        headersResponse.setContentDispositionFormData("attachment", "AlmacenComidas.xlsx");
        headersResponse.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.ok()
                .headers(headersResponse)
                .body(excelData);
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).build();
    }
}
}
