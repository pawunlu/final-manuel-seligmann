# Proyecto Final - Flash Cines


## Migraciones
Para crear cambios en la DB, primero se debe modificar o crear nuevas entidades que se encuentran en el directorio `src/database/models`.

Luego se debe reflejar estos cambios en los archivos `migraciones`. Para ellos se debe correr el comando `$ npm run migration:generate` o `$ npm run migration:generate:win` si estas en usando un SO Windows. Para agregarle un nombre representativo a la migracion, ejecutar el comando anterior con el siguiente flag `--name=<<nombre de la migracion>>` (sin <<>>)

Una vez creada la migracion, correr el comando `npm run migration:run` para reflejar las nuevas migraciones en la DB.
