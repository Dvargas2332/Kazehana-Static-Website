# Despliegue en AWS: S3 (frontend) + EC2 con Docker (backend)

## Arquitectura

```
Navegador ──► S3 / CloudFront (landing estática)
     │
     └──► EC2 :3000 (Docker: API Hono/tRPC + MySQL)  ◄── CORS: ALLOWED_ORIGINS
```

Los formularios (demo / lista de espera / WhatsApp) llaman al API en EC2.
La URL del API se fija en el build del frontend con `VITE_API_URL`.

---

## 1. Backend en EC2 (un solo Dockerfile)

### Requisitos en la instancia
- EC2 con Docker (Amazon Linux 2023 / Ubuntu):
  ```bash
  # Amazon Linux 2023
  sudo dnf install -y docker && sudo systemctl enable --now docker
  sudo usermod -aG docker ec2-user   # cierra sesión y vuelve a entrar
  ```
- Una base de datos MySQL 8 accesible desde la instancia. Opciones:
  - **Amazon RDS** (recomendado para producción), o
  - MySQL instalado en el propio EC2.
- **Security Group**: abre el puerto `3000` (o pon un reverse proxy/ALB con HTTPS
  delante y expón solo 80/443 — recomendado, porque el navegador bloquea
  llamadas HTTP desde una página HTTPS).

### Pasos
1. Sube el proyecto a la instancia (`git clone`, `scp` o `rsync`).
2. Crea el `.env` de producción:
   ```bash
   cp .env.example .env
   ```
   ```ini
   APP_ID=kaze-hana-prod
   APP_SECRET=<un-secreto-largo-aleatorio>
   DATABASE_URL=mysql://usuario:password@host-mysql:3306/kaze_hana_landing
   ALLOWED_ORIGINS=https://<tu-dominio-o-url-de-cloudfront>
   ```
3. Construye y arranca el contenedor:
   ```bash
   docker build -t kaze-hana-api .
   docker run -d --name kaze-hana-api --restart unless-stopped \
     --env-file .env -p 3000:3000 kaze-hana-api
   docker logs -f kaze-hana-api    # verificar migraciones + arranque
   ```
   Al iniciar, el contenedor aplica las migraciones de `db/migrations`
   automáticamente antes de levantar el API.
4. Prueba: `curl http://localhost:3000/api/trpc/ping` debe responder `{"ok":true,...}`.

> Para inspeccionar leads: `mysql -h <host> -u <usuario> -p kaze_hana_landing -e "SELECT * FROM leads;"`

---

## 2. Frontend en S3 (estático)

### 2.1 Build con la URL del API
La URL del backend se hornea en el bundle. **Haz el build cuando ya sepas la
URL pública del EC2** (dominio o IP):

```bash
VITE_API_URL=http://<IP-O-DOMINIO-EC2>:3000 npm run build
```
El resultado queda en `dist/public/`.

> Si cambias la URL del backend después, repite el build y vuelve a subir.

### 2.2 Crear y subir al bucket
```bash
aws s3 mb s3://<nombre-bucket> --region <region>
aws s3 sync dist/public s3://<nombre-bucket> --delete
```

### 2.3 Configurar hosting estático
```bash
aws s3 website s3://<nombre-bucket> --index-document index.html --error-document index.html
```

Y una bucket policy pública de solo lectura (ajusta el nombre):

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicRead",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::<nombre-bucket>/*"
  }]
}
```
```bash
aws s3api put-bucket-policy --bucket <nombre-bucket> --file bucket-policy.json
```
(En "Bloquear acceso público" del bucket, desmarca las opciones para poder servir el sitio.)

### 2.4 (Recomendado) CloudFront + HTTPS
S3 website solo sirve HTTP. Para producción:
1. Crea una distribución CloudFront con origen el bucket (OAC, bucket privado).
2. Asigna un certificado ACM (gratis) con tu dominio.
3. Pon la URL de CloudFront en `ALLOWED_ORIGINS` del backend y reinicia el
   contenedor: `docker rm -f kaze-hana-api && docker run -d --name kaze-hana-api --restart unless-stopped --env-file .env -p 3000:3000 kaze-hana-api`.

---

## 3. Checklist final

- [ ] `ALLOWED_ORIGINS` en EC2 = URL exacta del frontend (con `https://`, sin `/` final)
- [ ] Frontend compilado con `VITE_API_URL` apuntando al EC2
- [ ] Security Group de EC2 abierto solo donde toca
- [ ] Enviar un lead de prueba desde la landing y verlo en la tabla `leads`
- [ ] Si la landing es HTTPS, el API también debe ser HTTPS (ALB/Caddy/NGINX + ACM/Let's Encrypt)

## Archivos clave

| Archivo | Propósito |
|---|---|
| `Dockerfile` | Imagen multi-etapa del backend; migra y arranca con un solo `docker run` |
| `api/migrate.ts` | Aplica `db/migrations` al arrancar |
| `src/providers/trpc.tsx` | Lee `VITE_API_URL` en build |
| `api/boot.ts` | CORS según `ALLOWED_ORIGINS` |
