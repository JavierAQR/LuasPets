export interface Appointment {
    id: number;
    userId?: { idUser: number };
    appointmentDate: string; // o Date si prefieres trabajar con objetos Date
    startTime: string; // o Date si prefieres objetos Date
    endTime: string; // o Date si prefieres objetos Date
    status: string;
    serviceName: string;
    cost: number; // o BigDecimal si necesitas una representación más precisa
  }