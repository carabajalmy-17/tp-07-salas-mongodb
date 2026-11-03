# TP 07 - Persistencia inicial de reservas de salas

## 1. Descripción del proyecto

Este trabajo práctico parte de una copia del TP 06, denominada `tp-07-salas-mongodb`.

El objetivo es incorporar persistencia de reservas de salas de estudio utilizando **MongoDB Atlas y Mongoose**, mediante programas independientes ejecutados desde la terminal.

Se conserva la aplicación web desarrollada en el TP 06. En esta etapa, las rutas HTTP continúan trabajando con el servicio en memoria. La creación y consulta de reservas persistentes se realizan mediante scripts de Node.js.

## 2. Tecnologías utilizadas

- Node.js: `v24.19.0`
- Express: `^5.3.0`
- Mongoose: `9.10.3`
- MongoDB Atlas: clúster gratuito Free (M0).
- EJS: `^7.0.1`
- Prettier: `^3.9.10`
- ESLint: `^10.14.0`

## 3. Preparación del entorno

### Requisitos

- Node.js instalado.
- Una cuenta de MongoDB Atlas.
- Un clúster gratuito Free (M0).
- Un usuario de base de datos con permisos de lectura y escritura.
- Una dirección IP autorizada en Network Access.

### Configuración de MongoDB Atlas

1. Crear o utilizar un clúster gratuito Free (M0).
2. Crear un usuario de base de datos con permisos de lectura y escritura.
3. Agregar la dirección IP desde la que se realizará la conexión en Network Access.
4. Obtener la cadena de conexión desde la opción Connect de Atlas.
5. Seleccionar la conexión para una aplicación Node.js.
6. Reemplazar los marcadores de usuario, contraseña y host por los datos correspondientes.
7. Indicar como base de datos `reservas_salas_u7`.

### Instalación

Clonar o descargar el repositorio y, desde la carpeta del proyecto, ejecutar:

```bash
npm install
```

### Variables de entorno

El proyecto utiliza un archivo `.env` para guardar la configuración privada.

Copiar `.env.example` y crear un archivo llamado `.env`:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@HOST/reservas_salas_u7?retryWrites=true&w=majority
```

Reemplazar los marcadores de `MONGODB_URI` por la URI real proporcionada por Atlas.

**Importante:** el archivo `.env` contiene credenciales privadas y no debe subirse al repositorio. El archivo `.env.example` se utiliza como plantilla y no contiene datos reales.

## 4. Organización del proyecto

Las principales partes incorporadas para esta unidad son:

```text
tp-07-salas-mongodb/
│
├── src/
│   ├── config/
│   │   ├── entorno.js
│   │   └── base-datos.js
│   │
│   ├── modelos/
│   │   └── reservas.js
│   │
│   ├── index.js
│   ├── app.js
│   └── ...archivos del TP 06
│
├── scripts/
│   ├── comprobar-conexion.js
│   ├── crear-reserva.js
│   └── listar-reservas.js
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidad de los archivos

- `src/config/entorno.js`: obtiene y valida la configuración del entorno y la URI de MongoDB.
- `src/config/base-datos.js`: configura la resolución DNS y administra la conexión y desconexión de MongoDB.
- `src/modelos/reservas.js`: define el esquema y el modelo Reserva mediante Mongoose.
- `scripts/comprobar-conexion.js`: comprueba que la conexión con MongoDB pueda establecerse.
- `scripts/crear-reserva.js`: registra una reserva válida en la base de datos.
- `scripts/listar-reservas.js`: consulta y muestra las reservas almacenadas.

## 5. Base de datos, esquema y modelo

La base de datos utilizada en MongoDB Atlas se llama:

`reservas_salas_u7`

La colección utilizada es:

`reservas`

El esquema define la estructura de los documentos y las reglas de validación. A partir de ese esquema, Mongoose crea el modelo `Reserva`, que permite realizar operaciones sobre la colección.

Cada documento posee un identificador `_id` de tipo ObjectId generado por MongoDB.

El identificador se convierte a texto únicamente para mostrarlo en la terminal. No se generan identificadores consecutivos mediante `reduce`.

### Campos y validaciones

| Campo | Tipo | Reglas |
|---|---|---|
| estudiante | String | Obligatorio, elimina espacios al inicio y al final. |
| email | String | Obligatorio, elimina espacios y debe contener `@`. |
| sala | String | Obligatorio. Valores permitidos: Sala Norte, Sala Sur y Sala Multimedia. |
| fecha | String | Obligatorio y no puede quedar vacío. |
| turno | String | Obligatorio. Valores permitidos: Mañana, Tarde y Noche. |
| personas | Number | Obligatorio, entero entre 1 y 6. |

Las validaciones del esquema se ejecutan al crear una reserva mediante Mongoose.

La validación del correo comprueba la presencia del carácter `@`; no constituye una verificación completa de una dirección de correo electrónico.

La fecha se almacena como texto. En esta etapa no se valida que corresponda a una fecha real ni se comprueba disponibilidad de salas.

## 6. Conexión con MongoDB

La conexión se obtiene desde la variable de entorno `MONGODB_URI`.

En `src/config/base-datos.js` se configura la resolución DNS de Node.js utilizando los servidores:

- `8.8.8.8`
- `1.1.1.1`

Esta configuración se realiza en un único lugar, antes de establecer la conexión.

La aplicación web no necesita la URI de MongoDB para iniciar, porque continúa trabajando con el servicio en memoria.

### Comprobar la conexión

Desde la raíz del proyecto:

```bash
node --env-file=.env scripts/comprobar-conexion.js
```

Si la conexión se establece correctamente, se muestra un mensaje de confirmación. Si ocurre un error, el programa informa el tipo de error y los datos de diagnóstico disponibles, y finaliza indicando el fallo.

## 7. Creación y consulta de reservas

### Crear una reserva

Ejecutar:

```bash
node --env-file=.env scripts/crear-reserva.js
```

El programa se conecta a MongoDB, crea una reserva ficticia válida mediante el modelo `Reserva`, espera la confirmación de la escritura y muestra el `_id` devuelto.

Cada ejecución crea un documento nuevo. Por eso, ejecutar el programa varias veces puede generar reservas diferentes aunque los datos sean iguales.

### Listar las reservas

Ejecutar:

```bash
node --env-file=.env scripts/listar-reservas.js
```

El programa consulta todos los documentos de la colección, muestra sus identificadores y campos principales, e informa la cantidad recuperada.

La consulta no crea, modifica ni elimina documentos. Si la colección está vacía, debe mostrar una cantidad igual a cero.

## 8. Pruebas realizadas

Se realizaron pruebas de conexión, autenticación, creación, consulta y validación de datos.

| Prueba | Resultado observado |
|---|---|
| Conexión con URI válida | Correcto: conexión establecida. |
| Variable `MONGODB_URI` vacía | Correcto: se rechazó la conexión. |
| Contraseña incorrecta | Correcto: se rechazó la autenticación. |
| Restauración de URI válida | Correcto: conexión establecida nuevamente. |
| Creación de reserva válida | Correcto: se obtuvo un `_id`. |
| Consulta desde otro proceso | Correcto: se recuperaron los documentos almacenados. |
| Segunda consulta | Correcto: la cantidad permaneció sin cambios. |
| Email sin `@` | Correcto: Mongoose rechazó la reserva. |
| Sala no permitida | Correcto: Mongoose rechazó la reserva. |
| Turno no permitido | Correcto: Mongoose rechazó la reserva. |
| Personas igual a 0 | Correcto: Mongoose rechazó la reserva. |
| Personas igual a 7 | Correcto: Mongoose rechazó la reserva. |
| Personas igual a 2.5 | Correcto: Mongoose rechazó la reserva. |
| Estudiante vacío | Pendiente de completar. |
| Fecha vacía | Pendiente de completar. |
| Colección vacía | No realizada en esta base. |

### Estado de los documentos

La colección `reservas` conserva actualmente dos documentos de las ejecuciones válidas realizadas durante las pruebas.

Las pruebas negativas se verificaron comprobando que Mongoose rechazara los datos inválidos. No se deben inventar resultados ni eliminar documentos para simular una colección vacía.

### Evidencia de persistencia

La persistencia se comprueba ejecutando la creación y luego la consulta desde procesos independientes de Node.js.

El identificador `_id` permite reconocer el documento guardado y comprobar que puede recuperarse después de finalizar el proceso que lo creó.

Se adjuntarán como evidencia:

- Captura de la terminal con la creación y el `_id` confirmado.
- Captura de la consulta realizada desde otro proceso.
- Captura de MongoDB Atlas Data Explorer mostrando la base `reservas_salas_u7`, la colección `reservas` y los documentos almacenados.

## 9. Calidad del código

Se incorporaron Prettier y ESLint para mantener un formato consistente y detectar errores.

Los comandos utilizados son:

```bash
npm run format
```

Formatea los archivos de las carpetas `src` y `scripts`.

```bash
npm run format:check
```

Comprueba el formato sin modificar los archivos.

```bash
npm run lint
```

Ejecuta ESLint sobre las carpetas `src` y `scripts`.

```bash
npm run check
```

Ejecuta la comprobación de formato y el análisis de ESLint.

Resultado de la última comprobación: **sin errores**.

## 10. Continuidad de la aplicación web

Se conserva el funcionamiento de la aplicación Express del TP 06.

Para iniciar el servidor con la configuración local:

```bash
npm run start:local
```

También se puede iniciar con:

```bash
npm start
```

La aplicación web continúa utilizando el servicio en memoria. Por lo tanto, las reservas creadas desde los scripts de MongoDB no aparecen todavía en las vistas web.

Esta separación es intencional y corresponde al alcance del TP 07. La integración de la persistencia con el servicio HTTP se abordará en la Unidad 8.

Se verificó el funcionamiento de las rutas, el estado del servidor, el formulario y las respuestas de validación del proyecto anterior.

## 11. Seguridad

- Las credenciales de MongoDB se guardan en `.env`.
- El archivo `.env` está excluido del repositorio mediante `.gitignore`.
- Se incluye `.env.example` sin credenciales reales.
- No se deben publicar contraseñas, URI privadas ni datos personales.
- Los mensajes de error no deben exponer información sensible de conexión.
