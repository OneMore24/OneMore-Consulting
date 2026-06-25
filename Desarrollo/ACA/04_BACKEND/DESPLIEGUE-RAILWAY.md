# Despliegue del backend ACA en Railway

Objetivo: poner la API con una **URL pública** para que la app funcione en
cualquier celular y red (no solo en la Wi-Fi local).

## Requisitos previos
- Repo en GitHub (ya lo tienes: `OneMore24/OneMore-Consulting`).
- Cuenta en railway.app (ya creada).

## 1. Crear el proyecto y la base de datos
1. Railway → **New Project** → **Deploy from GitHub repo** → elige
   `OneMore24/OneMore-Consulting` (autoriza Railway en GitHub si lo pide).
2. En el servicio creado → **Settings → Root Directory** =
   `Desarrollo/ACA/04_BACKEND`  ← **importante** (el backend está en una subcarpeta).
3. En el proyecto → **New → Database → Add MySQL**.

## 2. Conectar el backend con la BD
1. Abre el servicio del **backend** → pestaña **Variables** → **New Variable**:
   - `MYSQL_URL` = `${{MySQL.MYSQL_URL}}`  (referencia a la BD; usa el autocompletado)
   - `JWT_SECRET` = una cadena larga y secreta (la que quieras)
   > No definas `PORT`: Railway lo inyecta solo y el backend ya lo lee.
2. El backend redeployará. En **Deploy Logs** debe aparecer
   `Servidor ACA corriendo...` y `Conectado a MySQL`.

## 3. Cargar el esquema en la BD de Railway
1. Servicio **MySQL** → pestaña **Connect** → copia los datos de conexión
   pública (host, puerto, usuario, password, database).
2. Conéctate con **MySQL Workbench** (o `mysql` CLI) usando esos datos y ejecuta
   el archivo **`database/ACA-DB-deploy.sql`** (crea tablas + datos semilla sobre
   la BD existente, sin borrar nada).

## 4. Generar la URL pública
1. Servicio backend → **Settings → Networking → Generate Domain**.
2. Te dará algo como `https://aca-backend-production.up.railway.app`.
3. Pruébala en el navegador: debe responder
   `{"message":"API ACA funcionando","status":"ok"}`.

## 5. Recompilar el APK apuntando a esa URL
1. En `03_FRONTED/eas.json`, perfil `preview`, agrega:
   ```json
   "env": { "EXPO_PUBLIC_API_URL": "https://TU-URL.up.railway.app" }
   ```
2. `cd Desarrollo/ACA/03_FRONTED && npx eas-cli build -p android --profile preview`
3. El nuevo APK funciona desde **cualquier red** (10+ celulares, distintas ubicaciones).

## Notas
- `MYSQL_URL` (interna) es la conexión backend↔BD dentro de Railway.
- La capa gratuita de Railway tiene límites de uso/crédito; suficiente para
  pruebas y presentación.
