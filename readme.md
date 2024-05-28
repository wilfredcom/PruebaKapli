## React native app
```
$ cd antmanapp
$ npm i

# ios

$ cd ios
$ bundle install
$ bundle exec pod install
$ cd ..

$ npx react-native run-ios
or
$ npm start
# follow the instructions to open in your favorite device
```

## Laravel app
```
$ cd antman
$ cp .env.example .env
# configurar base de datos, nombre de la db, usuaro y contrasena
$ composer install
$ php artisan migrate
$ php artisan make:seeder CategorySeeder 
$ php artisan serve
```
Este proceso abre el servidor en el puerto 8000, con el mismo que la app utilizar para conectarse al localhost de la maquina.
