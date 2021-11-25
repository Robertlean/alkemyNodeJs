# Challenge NodeJs - API Rest Disney
## Descripción del proyecto
Api de Disney creada para el challenge backend en NodeJs para Alkemy Labs. Está Api le permite explorar el mundo de Disney, conocer sus personajes, películas y los géneros de ellos. También permite crear, editar, borrar y buscar los personajes de la franquicia y sus largometrajes.

## Documentación
La documentación de la Api esta hecha en Swagger la misma se puede visualizar corriendo el proyecto ```npm start``` y yendo a "/api-doc"

## Tecnólogias

```bash
- NodeJs
- ExpressJs
- Sequelize ORM
- PostgreSQL
- JWT
- SendGrid
```
## Uso
### Clonar repositorio
En la terminal de su ordenador debe clonar el repositorio en cualquier carpeta que usted desee con el siguiente comando: ```git clone https://github.com/
Robertlean/alkemyNodeJs```

### Instalar módulos de Node
Al terminar de clonar el repositorio debe ingresar a la carpeta correspondiente con el comando bash: 
```bash
cd alkemyNodeJs
```
Luego debemos instalar las dependencias de Node

```bash
npm install
```

### Ejecutar script de la base de datos

Para ejecutar el script deberás abrir el entorno PgAdmin para PostgreSQL y copiar el script de la base de datos de Disney, que se encuentra dentro de la carpeta database, y pegarlo en la ventana "SQL" y correrlo. 

## Archivo ".env"
Al tener todo preparado y listo nuestros archivos, falta el momento de configurar los datos para tener todo relacionado a su equipo. Dentro del proyecto encontrará el archivo .envExample, a esté le debes cambiar el nombre a .env y dentro agregarle tus datos correspondiente en cada valor

```bash
- DB_USER, DB_PASSWORD, DB_HOST ( corresponden a los datos de alojamiento de su base de datos , son necesarios para que el proyecto pueda conectarse)

- JWT_SECRET ( secreto que se usara para poder verificar los token que emita la api )

- SENDGRID_KEY, SENDGRID_EMAIL ( variables para poder usar el servicio de sendgrid ,tienen que ser datos vinculados a una cuenta de sengrid )

```

## Collecciones
### Auth
Maneja el registro y logeo de los usuarios. Cuando se registre un nuevo usuario se le enviará un mail de bienvenida y cuando se logean, la Api emitirá un token para poder hacer el resto de peticiones. el token tiene una duración de 3 minutos

### Movies
Maneja todas las acciones relacionadas con las películas dentro de la api

### Characters
Maneja todas las acciones relacionadas con los personajes dentro de la api