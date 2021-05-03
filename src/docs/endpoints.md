API REST

Name | Method | URL |Body required fields | Description | Work[ ✅️, ❌️]
---- | ------ | --- | ------------------- | ----------- | --------------
register | POST | https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key={firebaseApiKey} | email: string, password: string, returnSecureToken :true | Pozwala zautoryzować firebase requestem TYLKO WERSJA CMD | ✅️
login | POST | localhost:3000/api/login | Token: string{ten od firebase} | Pozwala zalogować się do API na 1h potem wymaga ponownej autoryzacji zwraca token JWT | ✅️
deleteUser | DELETE | localhost:3000/api/deleteUser | null | Usuwa usera oraz każe usunąć użytkownikowi token z jwt z cookie nawet jak nie usunie to autoryzacja czegoś takiego nie przepuści | ✅️
updateUser | PATCH | localhost:3000/api/updateUser | min 1 z tych name: string avatar: string | Aktualizuje usera w bazie danych może zmienić jego nick lub link do avataru | ✅️
getUserServers | GET | localhost:3000/api/getUserServers | null | Podaje listę serverów do których należysz | ✅️
getFriends | GET | localhost:3000/api/getUserFriends | null | Podaję listę znajomych których masz | ✅️
createServer | POST | localhost:3000/api/createServer | serverName: string | Tworzy server | ✅️
deleteServer | DELETE | localhost:3000/api/deleteServer | serverUuid: uuidv4 | Usuwa server | ✅️
updateServer | PATCH | localhost:3000/api/updateServer | serverUuid: uuidv4, name: string | Aktualizuje dane servera, aktualnie tylko nazwę | ✅️
getServerCategories | GET | localhost:3000/api/getServerCategories | serverUuid: uuidv4 | Zwraca listę wszystkich kategori na serverze | ✅️
getServerMembers | GET | localhost:3000/api/getServerMembers | serverUuid: uuidv4 | Zwraca listę członków servera | ✅️
createCategory | POST | localhost:3000/api/createCategory | serverUuid: uuidv4, name: string | Tworzy nową kategorię na serverze | ✅️
deleteCategory | DELETE | localhost:3000/api/deleteCategory | categoryId: int | Usuwa kategorię | ✅️
updateCategory | PATCH | localhost:3000/api/updateCategory | categoryId: int, name: string | Aktualizuje dane kategori aktualnie tylko nazwę | ✅️
getCategoryChannels | GET | localhost:3000/api/getCategoryChannels | categoryId: int | Zwraca kanały należące do kategori | ✅️
createChannel | POST | localhost:3000/api/createChannel | channelName: string, categoryId: int, voice: bool | Tworzy kanał tekstowy lub głosowy | ✅️
deleteChannel | DELETE | localhost:3000/api/deleteChannel | channelId: int | Usuwa kanał | ✅️
updateChannel | PATCH | localhost:3000/api/updateChannel | channelId: int, channelName: string | Zmienia dane kanału aktualnie znowu tylko nazwę | ✅️
getChannelMessages | GET | localhost:3000/api/getChannelMessages | channelId: int | Zwraca listę wszystkich wiadomości w kanale | ✅️
getUserDMs | GET | localhost:3000/api/getUserDMs | null | Zwraca listę serverów DM do których należysz | ✅️
sendMessage | POST | localhost:3000/api/sendMessage | content: string, channelId: int, OPTIONAL parentMessage: int( może być zbagowane bo nie sprawdzam czy wskazywana wiadomość w ogóle istnieje) | Wysyła wiadomość do wskazanego kanału | ✅️
deleteMessage | DELETE | localhost:3000/api/deleteMessage | messageId: int | Usuwa wiadomość | ✅️
editMessage | PATCH | localhost:3000/api/editMessage | messageId: int, content: string | Edytuje treść wiadomości | ✅️
joinServer | POST | localhost:3000/api/joinServer/{serverUuid} | null | Po kliknięciu w link dołączy cię do serwera | ✅️
leaveServer | POST | localhost:3000/api/leaveServer/{serverUuid} | null | Po kliknięciu w link opuszcza server o ile nie jesteś jego ownerem | ✅️
getUserById | GET | localhost:3000/api/getUserById | userId: uuidv4 | Zwraca informacje o użytkowniku | ✅️
createDM | POST | localhost:3000/api/createDM | reciverId: uuidv4 | Tworzy specjalny server do którego mogą należeć tylko dwaj użytkownicy oraz nie da się go edytować |  ✅️
acceptFriendInvite ||||| ❌️
declineFriendInvite ||||| ❌️
findUserByFriendCode ||||| ❌️
inviteFriend ||||| ❌️

</br>
*uuidv4 - to zwykły string
</br>
Socket.io events

Name | Data | Description
---- | ---- | -----------