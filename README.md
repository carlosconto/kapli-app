Cree un sistema que permita registrar en una BD la información de dos tablas (ud las elije pero deben ser de al menos 3 campos de diferente tipo) que se encuentran relacionadas entre si (por ejemplo bancos/clientes o libros/capítulos), el backend debe usar algún patron de diseño popular y usar las características del framework para el manejo de BDs. El frontend en react-native se comunica con este back para permitir registrar la información y mostrarla en una tabla o grilla (visual) que muestre la información de las dos tablas (de la BD). Cuando se termine me avisan cual es su usuario en github para darle acceso de escritura al repositorio y se sube como una rama con su nombre. El repositorio está en https://github.com/wilfredcom/PruebaKapli


# Kapli test
## _Desarrollo de una app con react native y un aplicacion backend con Laravel_


Clonamos el repositorio https://github.com/wilfredcom/PruebaKapli.git el cual contiene los dos proyectos
1) la app en react native esta creada con el framework de expo
2) el backend en Laravel en su version 11.0
 
```sh
    git clone https://github.com/wilfredcom/PruebaKapli.git 
```
 
```sh
    cd appKapli && npm install
    npm run web *para ejecutar la app
```
----------
```sh
  cd kapli-backend && composer install
 //ejecutamos las migraciones y un seeder para llenar la bd con datos de pruebas
 php artisan migrate
 php artisan db:seed --class=BookSeeder
 //ejecutamos el servidor
 php artisan serve
```

## la app se ejucuta en la web para poder usar el mismo localhost para la conexion con la api