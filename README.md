# Kazehana Cloud PMS – Web Estática

**Aviso:** Código propietario. Solo revisión/evaluación. Uso comercial requiere licencia por escrito.
**Notice:** Proprietary code. Review/evaluation only. Commercial use requires a written license.

Landing page estática con selector de idioma, sección de módulos con íconos y formulario de contacto (mailto).
Static landing page with language selector, module icons, and contact form (mailto).

## Licencia
Este repositorio es **propietario**. Se permite la revisión del código solo para fines de evaluación.
Para cualquier uso, modificación, distribución, despliegue o explotación comercial se requiere
un acuerdo de licencia por escrito.

## Requisitos
- Node.js (solo si quieres usar el servidor local).

## Ejecutar en local
```powershell
cd "C:\Users\varga\Desktop\PROYECTOS DE PROGRAMACION\PROYECTO PMS\static-website"
npm start
```
Abre `http://localhost:3000`.

También puedes abrir `index.html` directamente en el navegador.

## Estructura
- `index.html` : Página principal (HTML + CSS + JS integrado)
- `server.js` : Servidor estático mínimo (sin dependencias)
- `ico/` : Íconos usados en la sección de módulos
- `Log/` : Logo(s)

## Idiomas
Detección automática por navegador + selector manual. El idioma elegido se guarda en `localStorage`.

## Formulario de contacto
El formulario usa `mailto:` (abre el cliente de correo). Si necesitas envío real sin abrir correo, intégralo con un backend o servicio (Formspree, AWS, etc.).

## Deploy (opcional)
### GitHub Pages
1. Crea un repo y sube el contenido.
2. En GitHub, ve a **Settings → Pages**.
3. Selecciona la rama (`main`) y la carpeta raíz.
4. Guarda y espera a que publique.

### AWS S3 (sitio estático)
1. Crea el bucket y habilita **Static Website Hosting**.
2. Sube los archivos (`index.html`, `ico/`, `Log/`).
3. Desactiva **Block Public Access** si el sitio será público.
4. Aplica una policy de solo lectura.

Si necesitas ayuda con cualquiera de estos pasos, dímelo y lo preparo.
