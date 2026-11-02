# TP 07 
## Punto de partida y nombre de la copia

Este proyecto corresponde al TP N7. El objetivo es incorporar MongoDB y Mongoose. El proyecto es una copia funcional del TP6
que conserva la aplicacion web desarrollada con Express. 

## Tecnologías y versiones Utilizadas
Node.js: v24.19.0
JavaScript: js@10.0.1
express: express@5.3.0
MongoDB Atlas 
MOngoose: mongoose@9.10.3
morgan: morgan@1.12.1
npm: 11.17.0

## Instalacion y configuracion 
 Para ejecutar este proyecto se necesita tener instalado Node.js y npm. Tener acceso a una cuenta de MongoDB atlas y contar con un cluster gratuito.

### Configuracion de MongoDB atlas 
ingresar a MongoDB Atlas, crear un cluster gratuito Free(M0), crear un usuario de base de datos con permisos de lectura y escritura.
Copiar la URI de coneccion para Node.js y reemplazar los datos de ejemplo por el usuario, contraseña y host correspondiente. 

### Conceptos de MongoDB y Mongoose

#### MongoDB

Es una base de datos NoSQL que almacena información en documentos, agrupados dentro de colecciones.

#### Mongoose

Es una biblioteca de Node.js que permite trabajar con MongoDB de una manera organizada, utilizando esquemas y modelos.

#### Schema (esquema)

Define la estructura que deben tener los documentos: sus campos, tipos de datos y reglas de validación.

#### Modelo

Se crea a partir de un Schema y permite realizar operaciones sobre una colección, como crear, consultar, modificar y eliminar documentos.

#### Colección

Es un conjunto de documentos relacionados entre sí. En este proyecto, los documentos de reservas se almacenan en la colección reservas.

#### Documento

Es cada registro individual almacenado dentro de una colección.

#### ObjectId

Es el identificador único que MongoDB utiliza habitualmente en el campo _id de cada documento. Se genera automáticamente cuando no se proporciona uno.

### Modelo Reserva y validadcion
el modelo reserva representa las reservas de salas de estudio. 

los campos definidos son: 
    estudiante: Tipo "String" (obligatorio, sin espacio en los extremos)
    email: tipo "String" (obligatorio, debe contener @)
    sala: tipo "String" (obligatorio, debe ser una sala permitida)
        valores permitidos: Sala Norte, Sala Sur o Sala Multimedia
    turno: tipo "String" (obligatorio, debe ser un turno permitido)
        valores permitidos: Turno Tarde, Turno Mañana o Turno Noche
    fecha: tipo "String" (obligatorio, no vacio)
    personas: tipo "String" (obligatorio, entre 1 y 6 personas)