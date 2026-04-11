🌸 Kazehana Cloud PMS — Sitio Web Oficial
Mostrar imagen
Mostrar imagen
Mostrar imagen
Mostrar imagen
Mostrar imagen
Landing page pública del sistema de gestión hotelera Kazehana Cloud PMS. Completamente estática — HTML, CSS y JS en un solo archivo, sin frameworks ni dependencias de build.

🔗 Ver sitio en vivo →


✨ Características

🌍 Multiidioma — EN / ES / FR / PT / IT / JA con autodetección por navegador y persistencia en localStorage
📋 Secciones completas — Hero, módulos, equipos, flujo de trabajo, visión del sistema, capturas de producto, testimonios, FAQ y contacto
📬 Formulario de contacto — Envío via API con protección antispam mediante Cloudflare Turnstile
🎠 Carrusel de capturas — Autoplay con controles manuales
📌 Header colapsable — Con estado persistente entre sesiones
✅ CI automatizado — Suite de validación ejecutada en cada push


🛠️ Stack
TecnologíaUsoHTML5Estructura completa de la páginaCSS3Estilos integrados en el HTMLJavaScriptInteractividad, multiidioma, carruselCloudflare TurnstileProtección antispam del formularioGitHub ActionsCI/CD automatizadoGitHub PagesHosting gratuito

⚙️ Requisitos

Node.js v18 o superior (solo para desarrollo local)


🚀 Desarrollo local
bashnpm start
Abre http://localhost:3000 en el navegador.

También puedes abrir index.html directamente en el navegador sin necesidad de servidor.


📁 Estructura
Kazehana-Static-Website/
├── index.html          # Página completa (HTML + CSS + JS)
├── server.js           # Servidor estático local (sin dependencias)
├── scripts/
│   └── validate.js     # Validaciones automáticas de estructura y contenido
├── ico/                # Íconos de los módulos del PMS
├── Log/                # Logotipo de la marca Kazehana
└── .github/
    └── workflows/
        └── ci.yml      # Pipeline de integración continua

🧪 Validación
bashnpm test
Verifica automáticamente:

Existencia de archivos clave
Secciones de navegación
Ítems del FAQ
Traducciones en todos los idiomas
Recursos de imagen


🌐 Deploy
GitHub Pages (recomendado)

Ve a Settings → Pages en el repositorio
Selecciona rama main y carpeta raíz /
Guarda — GitHub publica la URL automáticamente

AWS S3 (producción)

Crea el bucket y habilita Static Website Hosting
Sube index.html, ico/ y Log/
Aplica bucket policy de solo lectura (s3:GetObject)


👨‍💻 Autor
Diego Alonso Vargas Almengor

GitHub: @Dvargas2332
LinkedIn: Diego Vargas
Email: vargas.almengor@gmail.com


📄 Licencia — Propietaria
© 2025-2026 Diego Alonso Vargas Almengor. Todos los derechos reservados.
Código propietario. Se permite la revisión para fines de evaluación únicamente.
Cualquier uso, modificación, distribución o explotación comercial requiere acuerdo de licencia por escrito.
Ver archivo LICENSE.md para los términos completos.