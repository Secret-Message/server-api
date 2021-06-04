# Rest API

## User

### google obtain firebaseToken ( only for version without popup like cli )
```
method: "POST",
url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=<firebaseApiKey>,
body: {
    email: string,
    password: string,
    returnSecureToken: bool <always set to true >
},
response: {
    ind: string,
    localId: "string,
    email: string,
    displayName: string,
    idToken: string <this is what you need>,
    registered: bool,
    refreshToken: string,
    expiresIn: int <seconds>
},
description: "request will login to firebase and obtain required token"
```

### login v1 
```
method: "POST",
url: "<server>/api/v1/login",
body: {
    Token: string <token obtained from firebase>
},
respons: {
    User: object <user object>
},
cookie:  "request will automatic set ccookies for futer authentications",
description: "login to service"
```

### Get Current User v1
### Get User v1
### Modify Current User v1
### Delete Current User v1
### Get Shared Servers v1
### Get Shared Friends v1
### Get current User Servers v1
### Get current User Friends v1
### Create DM v1

## Friends

### Find users by friend code v1
### Send friend request v1
### Get friend requests v1
### Accept Friend request v1
### Reject Friend request v1

## Servers

### Create server v1
### Delete server v1
### Update server v1
### Get Banned Users v1
### Get server categories v1
### Create server invite v1
### Get server Roles v1

## Categories

### Create category v1
### Delete category v1
### Update category v1
### Asign permision to category v1
### Remove permission from category v1

## Channels

### Create channel v1
### Delete channel v1
### Update channel v1
### Asign permision to category v1
### Remove permission from category v1

## Messages

### Send message v1
### Delete message v1
### Update message v1
### Get messages in channel v1

## Roles

### Asaign role to user v1
### Remove role from user v1
### Create role v1
### delete role v1
### update role v1

## Members

### Join server v1
### Leave server v1
### Ban member v1
### Kick member v1
### Get member roles v1

## Utils

### Request tee v1
