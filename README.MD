### Ejercicio

Bases del ejercicio
El objetivo es desarrollar una API para consumir un servicio externo y utilizar su
información. Para realizar este desarrollo se tiene que utilizar NodeJS y el código
debe estar alojado en un repositorio en Github o Gitlab.
Se espera que el README.md contenga una breve explicación de como correr el
proyecto.

### Criteria

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
  - [ ] Debe encontrarse ordenada por cotización (ascendente/descendente, descendente por default).
  - [ ] N puede ser menor o igual a 25.
  - [x] Los datos a incluir por cada criptomoneda deben ser:
        Simbolo.
        Precio en Pesos Argentinos.
        Precio en Dólares.
        Precio en Euros.
        Nombre.
        Imagen.
        Fecha última actualización.

### To Do:

- [ ] Build validation middlewares
- [ ] Build integration tests
- [ ] Build Documentation

### In Progress:

- [ ] Order files & folders for users services & controllers

### Done ✓:


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
