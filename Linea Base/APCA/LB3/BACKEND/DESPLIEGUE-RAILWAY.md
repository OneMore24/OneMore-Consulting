# Despliegue del backend ACA en Railway

Objetivo: publicar la API con una URL pública para que la aplicación funcione en cualquier dispositivo y red, sin depender de un equipo local.

## Requisitos previos

- Repositorio en GitHub: `OneMore24/OneMore-Consulting`.
- Cuenta en railway.app.

## 1. Crear el proyecto y la base de datos

1. En Railway, seleccione **New Project** y luego **Deploy from GitHub repo**; elija el repositorio `OneMore24/OneMore-Consulting` (autorice el acceso de Railway en GitHub si se solicita).
2. En el servicio creado, abra **Settings** y establezca **Root Directory** en `Desarrollo/ACA/04_BACKEND`. Este paso es indispensable, ya que el backend reside en una subcarpeta.
3. En el proyecto, agregue una base de datos con **New** y **Add MySQL**.

## 2. Conectar el backend con la base de datos

1. En el servicio del backend, abra la pestaña **Variables** y agregue:
   - `MYSQL_URL` con el valor `${{MySQL.MYSQL_URL}}` (referencia a la base de datos).
   - `JWT_SECRET` con una cadena secreta de suficiente longitud.

   No defina la variable `PORT`: Railway la inyecta automáticamente y el backend ya la utiliza.
2. El servicio se redesplegará. En **Deployments → View logs** deben aparecer los mensajes `Servidor ACA corriendo...` y `Conectado a MySQL`.

## 3. Cargar el esquema en la base de datos

1. En el servicio MySQL, abra **Variables** y copie el valor de `MYSQL_PUBLIC_URL`, con formato `mysql://USUARIO:CONTRASEÑA@HOST:PUERTO/railway`.
2. Conéctese con MySQL Workbench (o el cliente `mysql`) usando esos datos y ejecute el archivo `database/ACA-DB-deploy.sql`, que crea las tablas y los datos semilla sobre la base de datos existente.

## 4. Generar la URL pública

1. En el servicio del backend, abra **Settings → Networking** y seleccione **Generate Domain** (si solicita un puerto, indique 3000).
2. Se generará una dirección con formato `https://<nombre>.up.railway.app`.
3. Verifíquela en el navegador: debe responder `{"message":"API ACA funcionando","status":"ok"}`.

## 5. Recompilar la aplicación con la URL pública

1. En `03_FRONTED/eas.json`, dentro del perfil `preview`, configure:
   ```json
   "env": { "EXPO_PUBLIC_API_URL": "https://<nombre>.up.railway.app" }
   ```
2. Ejecute `npx eas-cli build -p android --profile preview` desde `03_FRONTED`.
3. El nuevo APK funcionará desde cualquier red y ubicación.

## Notas

- `MYSQL_URL` corresponde a la conexión interna entre el backend y la base de datos dentro de Railway.
- La capa gratuita de Railway tiene límites de uso; es suficiente para pruebas y demostraciones.
