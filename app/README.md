# Kaze Hana Cloud · Landing page

Landing page de marketing para una suite de gestión de hospitalidad: recepción, restaurante, management, contabilidad y facturación electrónica. Incluye presentación del producto, beneficios, recorrido interactivo, acceso anticipado, preguntas frecuentes y tres flujos de contacto.

## Funciones

- Diseño responsive para escritorio y móvil.
- Paneles ilustrativos de reservas, habitaciones y reportes.
- Formularios de demostración, lista de espera y contacto por WhatsApp.
- Persistencia de solicitudes en MySQL mediante Drizzle ORM y tRPC.
- Navegación accesible, validación de formularios y soporte para movimiento reducido.

## Desarrollo

```bash
npm install
npm run db:push
npm run dev
```

## Producción

```bash
npm run check
npm run build
npm start
```

La aplicación se sirve en el puerto 3000. La compilación genera el frontend en `dist/public/` y el servidor empaquetado en `dist/boot.js`.

## Despliegue en AWS

Frontend estático en S3 + backend en EC2 con Docker: ver [DEPLOY.md](./DEPLOY.md).
