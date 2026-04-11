# Kazehana Cloud PMS - Sitio Web Oficial

[![CI](https://github.com/Dvargas2332/Kazehana-Static-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/Dvargas2332/Kazehana-Static-Website/actions/workflows/ci.yml)
![HTML](https://img.shields.io/badge/HTML-94%25-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-6%25-yellow)
![License](https://img.shields.io/badge/Licencia-Propietaria-red)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue)

Landing page publica del sistema de gestion hotelera **Kazehana Cloud PMS**. Completamente estatica: HTML, CSS y JS en un solo archivo, sin frameworks ni dependencias de build.

> **[Ver sitio en vivo ->](https://dvargas2332.github.io/Kazehana-Static-Website/)**

---

## Caracteristicas

- **Multiidioma**: EN / ES / FR / PT / IT / JA con autodeteccion por navegador y persistencia en `localStorage`
- **Secciones completas**: hero, modulos, equipos, flujo de trabajo, vision del sistema, capturas de producto, testimonios, FAQ y contacto
- **Formulario de contacto**: envio via API con proteccion antispam mediante Cloudflare Turnstile
- **Carrusel de capturas**: autoplay con controles manuales
- **Header colapsable**: con estado persistente entre sesiones
- **CI automatizado**: suite de validacion ejecutada en cada push

---

## Stack

| Tecnologia | Uso |
|---|---|
| HTML5 | Estructura completa de la pagina |
| CSS3 | Estilos integrados en el HTML |
| JavaScript | Interactividad, multiidioma, carrusel |
| Cloudflare Turnstile | Proteccion antispam del formulario |
| GitHub Actions | CI/CD automatizado |
| GitHub Pages | Hosting gratuito |

---

## Requisitos

- Node.js v18 o superior

---

## Desarrollo local

```bash
npm start
```

Abre `http://localhost:3000` en el navegador.

> Tambien puedes abrir `index.html` directamente en el navegador sin necesidad de servidor.

---

## Estructura

```text
Kazehana-Static-Website/
|-- index.html          # Pagina completa (HTML + CSS + JS)
|-- server.js           # Servidor estatico local (sin dependencias)
|-- scripts/
|   `-- validate.js     # Validaciones automaticas de estructura y contenido
|-- ico/                # Iconos de los modulos del PMS
|-- ico/                # Iconos de modulos y logo de la marca Kazehana
`-- .github/
    `-- workflows/
        `-- ci.yml      # Pipeline de integracion continua
```

---

## Iconos del PMS

| Front Desk | Restaurant | Management | Accounting | E-Invoice |
|---|---|---|---|---|
| ![Front Desk](./ico/frontdesk.png) | ![Restaurant](./ico/restaurant.png) | ![Management](./ico/management.png) | ![Accounting](./ico/accounting.png) | ![E-Invoice](./ico/einvoice.png) |

---

## Validacion

```bash
npm test
```

Verifica automaticamente:

- Existencia de archivos clave
- Secciones de navegacion
- Items del FAQ
- Traducciones en todos los idiomas
- Recursos de imagen

---

## Deploy

### GitHub Pages
1. Ve a **Settings -> Pages** en el repositorio.
2. Selecciona la rama `main` y la carpeta raiz `/`.
3. Guarda; GitHub publica la URL automaticamente.

### AWS S3
1. Crea el bucket y habilita **Static Website Hosting**.
2. Sube `index.html` e `ico/`.
3. Aplica una bucket policy de solo lectura (`s3:GetObject`).

---

## Autor

**Diego Alonso Vargas Almengor**

- GitHub: [@Dvargas2332](https://github.com/Dvargas2332)
- LinkedIn: [Diego Vargas](https://www.linkedin.com/in/diego-vargas-almengor-5ba024240/)
- Email: vargas.almengor@gmail.com

---

## Licencia - Propietaria

**© 2025-2026 Diego Alonso Vargas Almengor. Todos los derechos reservados.**

Codigo propietario. Se permite la revision para fines de evaluacion unicamente. Cualquier uso, modificacion, distribucion o explotacion comercial requiere acuerdo de licencia por escrito.

Ver [LICENSE.md](./LICENSE.md) y [NOTICE.md](./NOTICE.md) para los terminos y avisos complementarios.
