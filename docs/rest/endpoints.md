# Rest API

- <> - comments
- ? - optional argument
- ... - multi elements
- allow i deny - [są to pola do nadawania uprawnień](./extras/privlages.md)

## User
### google obtain firebaseToken ( only for version without popup like cli )
```js
method: "POST",
url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=<firebaseApiKey>",
body: {
    email: string,
    password: string,
    returnSecureToken: bool <always set to true >
},
response: {
    ind: string,
    localId: "string",
    email: string,
    displayName: string,
    idToken: string <this is what you need>,
    registered: bool,
    refreshToken: string,
    expiresIn: int <seconds>
},
description: "request will login to firebase and obtain required token"
```
### login v1 / who am i v1 ( CREATE / READ )
### get user by id v1 ( READ ) <!--- inherit from base service -->
### get user by friend code v1 ( READ ) 
### get current user servers v1 ( READ )
```
Merged with logi / who am i
```

### get current user friends v1 ( READ )
```
Merged with logi / who am i
```

### modify current user v1 ( UPDATE ) <!--- inherit from base service -->
### Delete Current User v1 ( DELETE ) <!--- inherit from base service -->
### Get shared users v1 ( READ )
### Get shared servers v1 ( READ ) 

## Friends
### Get frined requests v1 ( READ ) <!--- inherit from base service -->
### Send friend request v1 ( CREATE ) <!--- inherit from base service -->
### Accep friend request v1
### Reject friend request v1
### Finde user by friend code v1
```
Moved to User service
```
## Servers
### Create server ( CREATE ) <!--- inherit from base service -->
### Get server by id ( READ ) <!--- inherit from base service -->
### Update server ( UPDATE ) <!--- inherit from base service -->
### Delete server ( DELETE ) <!--- inherit from base service -->
## Categories
### CREATE
### READ
### UPDATE
### DELETE
## Channels
### CREATE
### READ
### UPDATE
### DELETE
## Messages
### CREATE
### READ
### UPDATE
### DELETE
## Roles
### CREATE
### READ
### UPDATE
### DELETE
## Members
### CREATE
### READ
### UPDATE
### DELETE

## Permissions
### CREATE
### READ
### UPDATE
### DELETE

## Utils
### Request coffe v1
```js
method: "GET",
url: "<server>/api/v1/getCupOfCoffe",
body: null,
response: null,
response_status: 418
description: "I'm a teapot"
```