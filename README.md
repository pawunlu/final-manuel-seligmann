# Proyecto Final - Flash Cines

## Enlaces
- [Cliente y Caracteristicas del sistema](https://docs.google.com/document/d/1d-4UqKOxYfXGjPnMMED2uWi18noOo9If8QMAWzwWIyo/edit)
- [Figma](https://www.figma.com/file/oVkJosToinwhV5cgpEO4k1/PaW---TP-Integrador?type=design&node-id=0%3A1&mode=design&t=I5wbagPDc2Hdc97w-1)
- [Diagrama de Entidad Relación](https://drive.google.com/file/d/1f0dSa205ZeVMa6eZXVloezfqCtiv4dH8/view)


## Instalación

### Docker
Requisitos: Docker y Docker-Compose
1. Duplicar el archivo `.env.example` y renombrar uno de ellos a `.env`. Puede editar las varibles del archivo `.env` a su gusto. En el caso no editarlo (sin configurar las variables de Mercado pago), la APP funcionará igual pero no se podran crear reservas (ya que para esta fucionalidad se necesitan las credenciales de MP).
2. Escribir el siguiente comando: `$ docker-compose up -d`.
3. Ya con los containers de docker corriendo, escribir los siguientes comandos:
    - `$ docker exec api npm run migration:run` 
    - `$ docker exec api npm run seed:run`
4. Todos listo. La app se encuentra corriendo en el puerto configurado en el archivo `.env` (variable PORT)

### Local
Requisitos: Node y DB Postgres
1. Duplicar el archivo `.env.example` y renombrar uno de ellos a `.env`. Puede editar las varibles del archivo `.env` a su gusto. En el caso no editarlo (sin configurar las variables de Mercado pago), la APP funcionará igual pero no se podran crear reservas (ya que para esta fucionalidad se necesitan las credenciales de MP).
2. Instalar las dependencias con el siguiente comando: `$ npm ci`
3. Correr los siguientes comandos:
    - `$ npm run migration:run` 
    - `$ npm run seed:run`
4. Levantar la app con el comandos: `$ npm run start:dev`
5. Todos listo. La app se encuentra corriendo en el puerto configurado en el archivo `.env` (variable PORT)

## Migraciones
Para crear cambios en la DB, primero se debe modificar o crear nuevas entidades que se encuentran en el directorio `src/database/models`.

Luego se debe reflejar estos cambios en los archivos `migraciones`. Para ellos se debe correr el comando `$ npm run migration:generate` o `$ npm run migration:generate:win` si estas en usando un SO Windows. Para agregarle un nombre representativo a la migracion, ejecutar el comando anterior con el siguiente flag `--name=<<nombre de la migracion>>` (sin <<>>)

Una vez creada la migracion, correr el comando `npm run migration:run` para reflejar las nuevas migraciones en la DB.
