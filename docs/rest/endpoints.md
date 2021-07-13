# Rest API

- <> - comments
- ? - optional argument
- ... - multi elements
- allow i deny - [są to pola do nadawania uprawnień](./extras/privlages.md)

## User
### google obtain firebaseToken ( only for version without popup like cli )
```js
{
    "method": "POST",
    "url": `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${firebaseApiKey}`,
    "body": {
        "email": "string",
        "password": "string",
        "returnSecureToken": "bool" //always set to true
    },
    "response": {
        "ind": "string",
        "localId": "string",
        "email": "string",
        "displayName": "string",
        "idToken": "string", //this is what you need
        "registered": "bool",
        "refreshToken": "string",
        "expiresIn": "int" //seconds
    },
    "description": "request will login to firebase and obtain required token"
}
```
### login v1 / who am i v1 ( CREATE / READ )
```js
{
    "method": "post",
    "url": `${serverIP}/api/v1/login`
}
```

### get user by id v1 ( READ ) <!--- inherit from base service -->
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/users/:userId`
}
```

### find user by friend code v1 ( READ ) 
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/users/friendCode/:friendCode`
    "description": "This is only helper endpoint for easier searching for user all other operations still operate on userId exept of friendCode"
}
```

### get current user servers v1 ( READ )
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/users/me/servers`
}
```

### get current user friends v1 ( READ )
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/users/me/friends`
}
```

### modify current user v1 ( UPDATE ) <!--- inherit from base service -->
```js
{
    "method": "PATCH",
    "url": `${serverIP}/api/v1/users`
}
```

### Delete Current User v1 ( DELETE ) <!--- inherit from base service -->
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/users`
}
```

### Get shared friends v1 ( READ )
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/users/:userId/sharedFriends`
}
```

### Get shared servers v1 ( READ ) 
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/users/:userId/sharedServers`
}
```

## Friends
### Get frined requests v1 ( READ ) <!--- inherit from base service -->
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/users/friendsRequests`
}
```

### Send friend request v1 ( CREATE ) <!--- inherit from base service -->
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/users/friendsRequests`
}
```

### Accep friend request v1
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/users/friendsRequests/:requestId/accept`
}
```

### Reject friend request v1
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/users/friendsRequests/:requestId/reject`
}
```

### Find user by friend code v1
```
Moved to User service
```
## Servers
### Create server ( CREATE ) <!--- inherit from base service -->
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/servers`
}
```

### Get server by id ( READ ) <!--- inherit from base service -->
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId`
}
```

### Update server ( UPDATE ) <!--- inherit from base service -->
```js
{
    "method": "PATCH",
    "url": `${serverIP}/api/v1/servers/:serverId`
}
```

### Delete server ( DELETE ) <!--- inherit from base service -->
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId`
}
```

## Categories
### Get categories by serverId v1 ( READ )
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/categories`
}
```

### Get category by id v1 ( READ ) <!--- inherit from base service -->
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId`
}
```

### Create category v1 ( CREATE ) <!--- inherit from base service -->
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/servers/:serverId/categories`
}
```

### Update category v1 ( UPDATE ) <!--- inherit from base service -->
```js
{
    "method": "PATCH",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId`
}
```

### Delete category v1 ( DELETE ) <!--- inherit from base service -->
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId`
}
```

## Channels
### Get channels by categoryId v1 ( READ )
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels`
}
```

### Create channe v1 ( CREATE ) <!--- inherit from base service -->
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels`
}
```

### Get channel by id v1 ( READ ) <!--- inherit from base service -->
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId`
}
```

### Update channel v1 ( UPDATE ) <!--- inherit from base service -->
```js
{
    "method": "PATCH",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId`
}
```

### Delete channel v1 ( DELETE ) <!--- inherit from base service -->
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId`
}
```

## Messages
### Send message v1 ( CREATE ) <!--- inherit from base service -->
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages`
}
```

### Get messages in channel v1 ( READ ) <!--- inherit from base service -->
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages?offset=<>&limit=<>`
}
```

### Edit message v1 ( UPDATE ) <!--- inherit from base service -->
```js
{
    "method": "PATCH",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages/:messageId`
}
```

### Delete message v1 ( DELETE ) <!--- inherit from base service -->
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages/:messageId`
}
```

## Roles
### Create role v1 ( CREATE ) <!--- inherit from base service -->
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/servers/:serverId/roles`
}
```

### Get member roles v1 ( READ ) 
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/members/:memberId/roles`
}
```

### Get server roles v1 ( READ ) 
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/roles`
}
```

### Update role v1 ( UPDATE ) <!--- inherit from base service -->
```js
{
    "method": "PATCH",
    "url": `${serverIP}/api/v1/servers/:serverId/roles/:roleId`
}
```

### Delete role v1 ( DELETE ) <!--- inherit from base service -->
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/roles/:roleId`
}
```

### Assign role to member v1 ( CREATE )
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/servers/:serverId/members/:memberId/roles`
}
```

### Remove role from member v1 ( DELETE )
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/members/:memberId/roles/:assignId`
}
```

## Members
### Join server v1 ( CREATE )
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/join/:serverId`
}
```

### Leave server v1 ( DELETE )
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/users/servers/:serverId`
}
```

### Ban member v1 ( DELETE )
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/members/:memberId/ban`
}
```

### Kick member v1 ( DELETE )
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/members/:memberId/kick`
}
```

### Unban member v1 ( DELETE )
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/bans/:userId`
}
```

## Permissions overwrites
### Assign permission overwrite v1 ( CREATE )
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/permissionsOwerwrites` ||
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permissionsOwerwrites`
}
```

### Get permission overwrites v1 ( READ )
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/permissionsOwerwrites` ||
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permissionsOwerwrites`
}
```

### Update permission overwrite v1 ( UPDATE )
```js
{
    "method": "PATCH",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/permissionsOwerwrites/:overwriteID` ||
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permissionsOwerwrites/overwriteID`
}
```

### Delete permission overwrite v1 ( DELETE )
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/permissionsOwerwrites/:overwriteID` ||
    "url": `${serverIP}/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permissionsOwerwrites/overwriteID`
}
```

## Invites
### Create server invite v1 ( CREATE ) <!--- inherit from base service -->
```js
{
    "method": "POST",
    "url": `${serverIP}/api/v1/servers/:serverId/invites`
}
```

### Delete server invite v1 ( DELETE ) <!--- inherit from base service -->
```js
{
    "method": "DELETE",
    "url": `${serverIP}/api/v1/servers/:serverId/invites/:inviteId`
}
```

### Get existing server invites v1 ( READ ) <!--- inherit from base service -->
```js
{
    "method": "GET",
    "url": `${serverIP}/api/v1/servers/:serverId/invites`
}
```

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