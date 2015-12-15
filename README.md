# CicloP

## Descripción

Herramienta de verificación y validación de las etapas del ciclo de vida de software de la metodología Ciclo-P

## Requerimientos

- NodeJS
```sh
sudo apt-get install nodejs
```
- Node Package Manager (npm)
```sh
sudo apt-get install npm
```
- MongoDB
```sh
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install mongodb-org
```

## Instalacion

- Instalar las dependencias globles
```sh
sudo npm install -g express
sudo npm install -g express-generator
sudo npm install -g mongodb
```
- Ir al directorio del proyecto
```sh
node ./bin/www
```

- Abrir en un navegador:
```sh
localhost:3000
```
## Sitio Web de prueba

Disponible [aquí](http://ciclop-55993.onmodulus.net/)