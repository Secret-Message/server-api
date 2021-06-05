# Rest API

- <> - comments
- ? - optional argument
- ... - multi elements
- allow i deny - [są to pola do nadawania uprawnień](./extras/privlages.md)

## User

### google obtain firebaseToken ( only for version without popup like cli )
```js
method: "POST",
url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=<firebaseApiKey>,
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

### login v1 
```js
method: "POST",
url: "<server>/api/v1/login",
body: {
    Token: string <token obtained from firebase>
},
response: {
    user: {
        id: UUIDv4<string>
        friend_code: int,
        avatar_url: string,
        join_date: datatime,
        status: string,
        custom_status: string
    }
},
cookie:  "request will automatic set ccookies for futer authentications",
description: "login to service"
```

### Get Current User v1
```js
method: "GET",
url: "<server>/api/v1/users",
body: null,
response: {
    user: {
        id: UUIDv4<string>
        friend_code: int,
        avatar_url: string,
        join_date: datatime,
        status: string,
        custom_status: string
    }
},
description: "get your user"
```

### Get User v1
```js
method: "GET",
url: "<server>/api/v1/users/:userUUID",
body: null,
response: {
    user: {
        id: UUIDv4<string>
        friend_code: int,
        avatar_url: string,
        join_date: datatime,
        status: string,
        custom_status: string
    }
},
description: "get any user"
```

### Modify Current User v1
```js
method: "PATCH",
url: "<server>/api/v1/users",
body: {
    ?new_avatar: string,
    ?new_nickname: string,
    ?new_customStatus: string
},
response: {
    user: {
        id: UUIDv4<string>
        friend_code: int,
        avatar_url: string,
        join_date: datatime,
        status: string,
        custom_status: string
    }
},
description: "update your user"
```

### Delete Current User v1
```js
method: "DELETE",
url: "<server>/api/v1/users",
body: null,
response: null,
response_status: 214,
description: "delete your user"
```

### Get Shared Servers v1
```js
method: "GET",
url: "<server>/api/v1/users/:userUUID/sharedServers",
body: null,
response: {
    servers: [
        {
            id: int
            name: string,
            icon_url: string
        },
        ...
    ]
},
description: "show all servers where belongs both you and specified user"
```

### Get Shared Friends v1
```js
method: "GET",
url: "<server>/api/v1/users/:userUUID/sharedFriends",
body: null,
response: {
    friends: [
        {
            id: UUIDv4<string>
            friend_code: int,
            avatar_url: string,
            join_date: datatime,
            status: string,
            custom_status: string
        },
        ...
    ]
},
description: "show all friends whos belongs both you and specified user"
```

### Get current User Servers v1
```js
method: "GET",
url: "<server>/api/v1/users/servers?type=<'dm' | 'public' | null>",
body: null,
response: {
    servers: [
        {
            id: int,
            name: string,
            icon_url: string,
            dm: bool
        },
        ...
    ]
},
description: "show all your servers"
```

### Get current User Friends v1
```js
method: "GET",
url: "<server>/api/v1/users/friends",
body: null,
response: {
    friends: [
        {
            id: UUIDv4<string>
            friend_code: int,
            avatar_url: string,
            join_date: datatime,
            status: string,
            custom_status: string
        },
        ...
    ]
},
description: "show all your friends"
```

### Create DM v1
```js
method: "POST",
url: "<server>/api/v1/servers/createDM",
body: {
    reciverUUID: UUIDv4<string> 
},
response: {
    id: int,
    name: string,
    icon_url: string,
    categories: [
        {
            id: int,
            name: string,
            number: int< set order and hierarchy of elements >,
            channels: [
                {
                    id: int,
                    name: string,
                    voice: bool,
                    number: int
                },
                {
                    id: int,
                    name: string,
                    voice: bool,
                    number: int
                }
            ]
        }
    ]
},
description: "create new DM if alreaady exists return existing one"
```

## Friends

### Find users by friend code v1
```js
method: "GET",
url: "<server>/api/v1/users/byFriendCode/:friendCode",
body: null,
response: {
    users: [
        {
            id: UUIDv4<string>
            friend_code: int,
            avatar_url: string,
            join_date: datatime,
            status: string,
            custom_status: string
        },
        ...
    ]
},
description: "show all users with same friendCode if actidently some users share same friend code it is still posible to find diffrence betwen they beacouse they probably have other nicknames, avatars or status"
```

### Send friend request v1
```js
method: "POST",
url: "<server>/api/v1/users/sendFriendRequest",
body: {
    reciver_UUID: UUIDv4<string>
},
response: {
    id: int,
    requester: UUIDv4<string>,
    reciver: UUIDv4<string>
},
description: "send friend request"
```

### Get friend requests v1
```js
method: "GET",
url: "<server>/api/v1/users/myFriendRequest",
body: null,
response: {
    friend_requests: [
        {
            id: int,
            requester: UUIDv4<string>,
            reciver: UUIDv4<string>
        },
        ...
    ]
},
description: "return all friend requests that you recived"
```

### Accept Friend request v1
```js
method: "POST",
url: "<server>/api/v1/users/acceptFriendRequest",
body: {
    requestId: int <can be obtained from "Get friend requests">
},
response: {
    newFriend: {
        id: UUIDv4<string>
        friend_code: int,
        avatar_url: string,
        join_date: datatime,
        status: string,
        custom_status: string
    }
},
description: "accept friend request"
```

### Reject Friend request v1
```js
method: "POST",
url: "<server>/api/v1/users/rejectFriendRequest",
body: {
    request_id: int <can be obtained from "Get friend requests">
},
response: null,
response_status: 200,
description: "reject friend request"
```


## Servers

### Create server v1
```js
method: "POST",
url: "<server>/api/v1/servers",
body: {
    server_name: string,
    ?server_icon_url: string
},
response: {
    id: int,
    server_name: string,
    server_icon_url: string
},
description: "create new server"
```

### Delete server v1
```js
method: "DELETE",
url: "<server>/api/v1/servers/:serverId",
body: null,
response: null,
response_status: 214,
description: "delete server"
```

### Update server v1
```js
method: "PATCH",
url: "<server>/api/v1/servers/:serverId",
body: {
    ?new_name: string,
    ?new_logo_url: string
},
response: {
    id: int,
    server_name: string,
    server_icon_url: string
},
description: "update server"
```
### Get server Members v1
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/members",
body: null,
response: {
    members: [
        {
            id: int,
            user: {
                id: UUIDv4<string>
                friend_code: int,
                avatar_url: string,
                join_date: datatime,
                status: string,
                custom_status: string
            }
        }
    ]
},
description: "get banned users in server"
```

### Get Banned Users v1
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/bannedUsers",
body: null,
response: {
    banned: [
        {
            id: int,
            reason: string,
            permanent: bool,
            timeout: datetime,
            user: {
                id: UUIDv4<string>
                friend_code: int,
                avatar_url: string,
                join_date: datatime,
                status: string,
                custom_status: string
            }
        }
    ]
},
description: "get banned users in server"
```

### Get server categories v1
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/categories",
body: null,
response: {
    categories: [
        {
            id: int,
            name: string,
            number: int< set order and hierarchy of elements >
        },
        ...
    ]
},
description: "get categories in server"
```

### Create server invite v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/invites",
body: {
    timeout: string < null, "24h", "1d", "7d" >
},
response: {
    id: UUIDv4<string>,
    invite_url: string < example: "http://<server>/api/servers/join/<invite_id>" >
},
description: "create invite with timeout null means invite is permanent"
```

### Get server Roles v1
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/roles",
body: null,
response: {
    roles: [
        {
            id: int,
            allow: int,
            deny: int,
            name: string,
            color: int,
            mentionable: bool,
            number: int< set order and hierarchy of elements >
        },
        ...
    ]
},
description: "Returns roles in a server"
```

## Categories

### Get category channels
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels",
body: null,
response: {
    channels: [
        {
            id: int,
            name: string,
            voice: bool,
            number: int< set order and hierarchy of elements >
        },
        ...
    ]
},
description: "Returns channels in a category"
```

### Create category v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/categories",
body: {
   name: string,
   number: int< set order and hierarchy of elements >
},
response: {
    id: int,
    name: string,
    number: int< set order and hierarchy of elements >
},
description: "Creates new category"
```

### Delete category v1
```js
method: "DELETE",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId",
body: null,
response: null,
response_status: 214,
description: "Delete category"
```

### Update category v1
```js
method: "PATCH",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId",
body: {
    ?name: string,
    ?number: int
},
response: {
    id: int,
    name: string,
    number: int< set order and hierarchy of elements >
},
description: "Update category"
```

### Asign permision to category v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/permisions",
body: {
    ?member_id: UUIDv4<string>,
    ?role_id: int,
    allow: int< look to extras/privlages.md >,
    deny: int< look to extras/privlages.md >,
    number: int
},
response: {
    id: int,
    member_id: UUIDv4<string>,
    role_id: int,
    allow: int< look to extras/privlages.md >,
    deny: int< look to extras/privlages.md >,
    number: int
},
description: "Adds permission overwrite to category"
```

### Remove permission from category v1
```js
method: "DELETE",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/permisions/:permssionsOverwriteId",
body: null,
response: null,
response_status: 214,
description: "Remove permission overwrite from category"
```

### Update permission for category v1
```js
method: "PATCH",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/permisions/:permssionsOverwriteId",
body: {
    allow: int< look to extras/privlages.md >,
    deny: int< look to extras/privlages.md >,
    ?number: int
},
response: {
    id: int,
    member_id: UUIDv4<string>,
    role_id: int,
    allow: int< look to extras/privlages.md >,
    deny: int< look to extras/privlages.md >,
    number: int
},
description: "Update permission overwrite in category"
```

### Get category permissions v1
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/permisions",
body: null,
response: {
    permisson_overwrite: [
        {
            id: int,
            member_id: UUIDv4<string>,
            role_id: int,
            allow: int< look to extras/privlages.md >,
            deny: int< look to extras/privlages.md >,
            number: int
        },
        ...
    ]
},
description: "Get all permissions overwrite from category"
```

## Channels

### Create channel v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels",
body: {
   name: string,
   voice: bool,Update permission overwrite from
   number: int< set order and hierarchy of elements >
},
response: {
    id: int,
    name: string,
    voice: bool,
    number: int< set order and hierarchy of elements >
},
description: "Creates new channel"
```

### Delete channel v1
```js
method: "DELETE",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId",
body: null,
response: null,
response_status: 214,
description: "Delete channel"
```

### Update channel v1
```js
method: "PATCH",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId",
body: {
    ?name: string,
    ?number: int
},
response: {
    id: int,
    name: string,
    voice: bool,
    number: int< set order and hierarchy of elements >
},
description: "Update channel"
```

### Asign permision to channel v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permisions",
body: {
    ?member_id: int,
    ?role_id: int,
    allow: int< look to extras/privlages.md >,
    deny: int< look to extras/privlages.md >,
    number: int
},
response: {
    id: int,
    member_id: UUIDv4<string>,
    role_id: int,
    allow: int< look to extras/privlages.md >,
    deny: int< look to extras/privlages.md >,
    number: int
},
description: "Adds permission overwrite to channel"
```

### Remove permission from channel v1
```js
method: "DELETE",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permisions/:permssionsOverwriteId",
body: null,
response: null,
response_status: 214,
description: "Remove permission overwrite from channel"
```

### Update permission for channel v1
```js
method: "PATCH",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permisions/:permssionsOverwriteId",
body: {
    allow: int< look to extras/privlages.md >,
    deny: int< look to extras/privlages.md >,
    ?number: int
},
response: {
    id: int,
    member_id: UUIDv4<string>,
    role_id: int,
    allow: int< look to extras/privlages.md >,
    deny: int< look to extras/privlages.md >,
    number: int
},
description: "Update permission overwrite in channel"
```

### Get channel permissions v1
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/permisions",
body: null,
response: {
    permisson_overwrite: [
        {
            id: int,
            member_id: UUIDv4<string>,
            role_id: int,
            allow: int< look to extras/privlages.md >,
            deny: int< look to extras/privlages.md >,
            number: int
        },
        ...
    ]
},
description: "Get all permissions overwrite from channel"
```

## Messages

### Send message v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages",
body: {
    content: string,
    ?parent_message: int< if this message is response to other you specify it here>
},
response: {
    id: int,
    author: UUIDv4<string>,
    content: string,
    send_date: datetime,
    parent_message: int
},
description: "Send message to channel"
```

### Delete message v1
```js
method: "DELETE",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages/:messageId",
body: null,
response: null,
response_status: 214,
description: "Delete message from channel"
```

### Update message v1
```js
method: "PATCH",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages/:messageId",
body: {
    ?content: string
},
response: {
    id: int,
    author: UUIDv4<string>,
    content: string,
    send_date: datetime,
    parent_message: int
},
description: "Update message in channel"
```

### Get messages in channel v1
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/categories/:categoryId/channels/:channelId/messages?offset=<int>&max=<int betwen 1 and 100>",
body: null,
response: {
    messages: [
        {
            id: int,
            author: UUIDv4<string>,
            content: string,
            send_date: datetime,
            parent_message: int
        },
        ...
    ]
},
description: "Get messages in channel. Max set how many messages you will get if you dont set it, it will return 50 if you want to load more messages like in first request you load offset=0 then in second you load offset = offset + max"
```

## Roles

### Create role v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/roles",
body: {
    allow: int,
    deny: int,
    name: string,
    ?color: int,
    ?mentionable: int,
    number: int
},
response: {
    id: int,
    allow: int,
    deny: int,
    name: string,
    color: int,
    mentionable: int,
    number: int
},
description: "Creates new role"
```

### delete role v1
```js
method: "DELETE",
url: "<server>/api/v1/servers/:serverId/roles/:roleId",
body: null,
response: null,
response_status: 214,
description: "Delete role"
```

### update role v1
```js
method: "PATCH",
url: "<server>/api/v1/servers/:serverId/roles/:roleId",
body: {
    ?allow: int,
    ?deny: int,
    ?name: string,
    ?color: int,
    ?mentionable: bool,
    ?number: int
},
response: {
    id: int,
    allow: int,
    deny: int,
    name: string,
    color: int,
    mentionable: int,
    number: int
},
description: "Update role"
```

### Asaign role to user v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/members/:memberId/roles",
body: {
    role_id: int,
    number: int
},
response: {
    id: int,
    member: {
        id: int,
        user: {
            id: UUIDv4<string>
            friend_code: int,
            avatar_url: string,
            join_date: datatime,
            status: string,
            custom_status: string
        }
    },
    role: {
        id: int,
        allow: int,
        deny: int,
        name: string,
        color: int,
        mentionable: int,
        number: int
    }
},
description: "Asign role to member"
```

### Remove role from user v1
```js
method: "DELETE",
url: "<server>/api/v1/servers/:serverId/members/:memberId/roles/:roleAsignId<id przypisania roli do użytkownika nie samej roli>",
body: null,
response: null,
response_status: 214,
description: "Remove role from member"
```

## Members

### Join server v1
```js
method: "POST",
url: "<server>/api/v1/invites/:inviteId",
body: null,
response: {
    id: int,
    name: string,
    icon_url: string,
    dm: bool
},
description: "Join a server"
```

### Leave server v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/leave",
body: null,
response: null,
response_status: 214,
description: "Leave a server"
```

### Ban member v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/members/:memberId/ban",
body: {
    reason: string,
    permanent: bool,
    timeout: datetime,
    ?user_id: UUIDv4,
    ?member_id: int
},
response: {
    id: int,
    reason: string,
    permanent: bool,
    timeout: datetime,
    user: {
        id: UUIDv4<string>
        friend_code: int,
        avatar_url: string,
        join_date: datatime,
        status: string,
        custom_status: string
    }
},
description: "Ban a user"
```

### Kick member v1
```js
method: "POST",
url: "<server>/api/v1/servers/:serverId/members/:memberId/kick",
body: null,
response: null,
response_status: 214,
description: "Kick a user"
```

### Get member roles v1
```js
method: "GET",
url: "<server>/api/v1/servers/:serverId/members/:memberId/roles",
body: null,
response: {
    roles: [
        {
            id: int,
            allow: int,
            deny: int,
            name: string,
            color: int,
            mentionable: bool,
            number: int< set order and hierarchy of elements >
        },
        ...
    ]
},
description: "show all user roles"
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