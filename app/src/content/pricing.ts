export type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  rooms: string;
  features: string[];
  featured?: boolean;
};

/**
 * Precios de referencia en dólares para la etapa de acceso anticipado.
 * Se editan aquí y se reflejan en la sección de precios y en el mensaje del formulario.
 */
export const plans: Plan[] = [
  {
    id: "esencial",
    name: "Esencial",
    tagline: "Para un negocio pequeño que quiere recepción, sala y reportes en un solo sistema.",
    monthly: 39,
    yearly: 31,
    rooms: "Hasta 10 habitaciones · 1 punto de venta",
    features: [
      "Recepción, reservas y calendario de ocupación",
      "Restaurante: mesas, comandas y cobro",
      "Estado de habitaciones y limpieza",
      "Reportes de ocupación y ventas",
      "3 usuarios incluidos",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    tagline: "Para equipos con recepción, restaurante y dirección trabajando a la vez.",
    monthly: 79,
    yearly: 63,
    rooms: "Hasta 30 habitaciones · 3 puntos de venta",
    features: [
      "Todo lo de Esencial",
      "Contabilidad: asientos, cuentas y cierres",
      "Cargo a la habitación desde el restaurante",
      "Roles por área: recepción, sala, limpieza y dirección",
      "Usuarios ilimitados y soporte por WhatsApp",
    ],
    featured: true,
  },
  {
    id: "boutique",
    name: "Boutique",
    tagline: "Para grupos con varias propiedades, restaurante y facturación electrónica.",
    monthly: 149,
    yearly: 119,
    rooms: "Habitaciones, sedes y puntos de venta sin límite",
    features: [
      "Todo lo de Profesional",
      "Facturación electrónica",
      "Vista consolidada multi-propiedad",
      "Migración asistida de tu operación actual",
      "Acceso anticipado a nuevas funciones y soporte prioritario",
    ],
  },
];

export const pricingNotes = [
  "Precios en dólares estadounidenses, impuestos no incluidos.",
  "Recepción, restaurante, contabilidad y facturación comparten la misma suscripción.",
  "Sin permanencia y sin coste por reserva ni por cubierto.",
  "El precio de lanzamiento se mantiene mientras la suscripción esté activa.",
];
