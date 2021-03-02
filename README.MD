
# Welcome to CoinGecko Wrapper Backend

This Repo is my solution to the Wolox code challenge 

### Ejercicio (from requeriments)

Bases del ejercicio
El objetivo es desarrollar una API para consumir un servicio externo y utilizar su
información. Para realizar este desarrollo se tiene que utilizar NodeJS y el código
debe estar alojado en un repositorio en Github o Gitlab.
Se espera que el README.md contenga una breve explicación de como correr el
proyecto.

### Criteria (from requeriments)

- [x] Se debe poder crear usuarios, con los siguientes parámetros:
      Nombre
      Apellido
      Username (único)
      Contraseña (al menos 8 caracteres, alfanumérica)
      Moneda preferida (puede ser Euro, Dólar o Peso Argentino)
- [x] Se debe implementar autenticación mediante JWT:
  - [x] El token se debe obtener mediante un endpoint de login (pasando un usuario y contraseña).
  - [x] El token debe tener un tiempo de expiración.
  - [x] Este token debe generarse desde la aplicación sin utilizar servicios externos <br /> (puede utilizarse packages que faciliten la creación del mismo pero no servicios como Auth0).
- [x] Se debe poder listar todas las criptomonedas disponibles
  - [x] Los datos a incluir por cada criptomoneda deben ser:
      - [x]  Simbolo.
      - [x]  Precio (en la moneda preferida del usuario).
      - [x]  Nombre.
      - [x]  Imagen.
      - [x]  Fecha última actualización.
- [x] Se debe permitir agregar criptomonedas al usuario para hacerle seguimiento
  - [x] Sólo un usuario puede agregarse criptomonedas a sí mismo.
  - [x] La relación usuario-criptomoneda debe ser única.
- [x] Se debe poder obtener el top N de criptomonedas de un usuario
      (comparando la cotización en la moneda preferida del usuario que realiza la
      consulta):
  - [x] Un usuario solo puede obtener su top N de criptomonedas.
  - [x] Debe encontrarse ordenada por cotización (ascendente/descendente, descendente por default).
  - [x] N puede ser menor o igual a 25.
  - [x] Los datos a incluir por cada criptomoneda deben ser:
        Simbolo.
        Precio en Pesos Argentinos.
        Precio en Dólares.
        Precio en Euros.
        Nombre.
        Imagen.
        Fecha última actualización.



## Installation

create a.env file in root with your information and credentials

    MONGO_USERNAME=ADMIN // mongo info for docker container
    MONGO_PASSWORD=ADMIN // mongo info for docker container
    MONGO_PORT=27017 // mongo info for docker container
    MONGO_DB=gecko // mongo info for docker container
    MONGO_HOSTNAME=mongodb // mongo info for docker container
    PORT=8081 // backend port
    TOKEN_SECRET=SECRET123 // server secret for jwt access tokens tokens
    TOKEN_EXPIRATION_TIME_SECONDS=60 // access token expiration time

then run the following commands

    npm run install

## Usage

#### Development command
 
    npm run dev
    
#### Build command

    npm run build
    npm run start

#### Other commands
    npm run lint
    npm run lint:fix

    npm run test

## Docker Compose command
	docker-compose up --build
### Api Documentation
**You can get the full documentation in route [localhost:8081/docs ](http://localhost:8081 "localhost:8081/docs ")this is just introduction information**

|  Method |Path   | Description  |
| ------------ | ------------ | ------------ |
| GET  | /coins |get all available coins list   |
| GET | /coins/{coinid} | get more information about 1 coin   |
| POST  | /signup  | signup endpoint for new users  |
| POST | /login  | login endpoint for existing users  |
| POST  | /token  | token refresh endpoint  |
| GET  | /users/me/coins  | list all the user saved coins  |
| POST | /users/me/coins | add a new user coin or update existing one  |
| DELETE  |  /users/me/coins |  remove 1 coin from user information |
| GET  |  /users/me/coins/compare |  get all user coins in list with real-time price vs saved price |
| GET  |  /docs |  Api full documentation |


### Logs:

a "Logs" folder will be created when proyect is running
in that folder:

all.log -> contains all the api logs
error.log -> contains only the api errors information

### To Do:

- [ ] fix issue2

### In Progress:



### Done ✓:
- [x] fixed: issue3: users should have the option to delete 1 of their coins
- [x] fixed: issue1: duplicate coin for User if i add twice the same coin, fix: should update already existing User Coin in db
- [x] Build integration tests
- [x] Build validation middlewares
- [x] Build Documentation
- [x] Build Coins endpoints
- [x] Build Coins DB Model 
- [x] Build User endpoints
- [x] Build User DB Model 
- [x] Order files & folders for users services & controllers
- [x] Implement AccesToken & refresh tokens authentication
- [x] Use & Test Endpoints Mocks to assure requeriments
- [x] Set Up Docker files
- [x] Express core Set Up
- [x] Make files structure & Mock Responses
- [x] Design DB Models, Relations & Endpoints
- [x] Build Api sketch in OpenApi


### Issues :

- [ ] issue2: 1000ms restriction fix: workaround for gecko Wrapper in./src/services/utils/coingeckoWrapper.ts



## Author

👤 **Leonardo Ponciolo**

* Github: [@lponciolo](https://github.com/lponciolo)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/lponciolo/coingecko-wrapper/issues). 