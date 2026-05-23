# Assets Directory

Coloca aquí las imágenes y videos reales del producto.

## Estructura

```
assets/
├── hotels/          # Fotos de propiedades (sección Portfolio)
│   ├── hotel-1.jpg
│   ├── hotel-2.jpg
│   ├── hotel-3.jpg
│   └── hotel-4.jpg
├── screenshots/     # Capturas de pantalla del PMS
│   ├── arrivals.jpg
│   ├── housekeeping.jpg
│   └── revenue.jpg
├── videos/          # Videos de demostración por módulo
│   ├── frontdesk-demo.mp4
│   ├── restaurant-demo.mp4
│   └── onboarding.mp4
└── features/        # Imágenes para sección Why Kazehana
    ├── unified-reservations.jpg
    ├── housekeeping.jpg
    ├── revenue-signals.jpg
    └── compliance.jpg
```

## Uso en HTML

Las rutas ya están configuradas en los archivos `.content.html`.
Solo reemplaza los archivos placeholder y quita la clase `.is-placeholder`
del elemento cuando la imagen/video esté listo.
