Zadanie | Status[ ✅️, 🚧, ❌️ ]
--- | ---
System kategori | ✅️
System kanałów | ✅️
System serverów | ✅️
System userów | ✅️
System wiadomości | ✅️
System przyjaciół | ❌️
System uprawnień( aktualnie działa tylko owner ) | 🚧
Baza danych |✅️
Wysyłanie wiadomości | ✅️
Tworzenie serverów DM | ✅️
Dodać allowNull: false do struktury bazy danych | ✅️
Naprawić socket.io | 🚧
Udokumentować endpointy | ✅️
Filtry wiadomości( z bazą danych będzie to kwestja dodani tylko whera do zapytania ) | ✅️
Poprawić odpowiedzi z niektórych endpointów | ✅️
zmienić ścieżki w routes np: /api/deleteServer -> /api/server/delete | ✅️
Dodać stopniowe pobieranie wiadomości, ponieważ serverr aktualnie wysyła wszystkie wiadomości w kanale | ✅️
Dodać Web RTC | ❌️
Dodać szyfrowanie np. AES, RSA | ❌️
Usunąć pole status z odpowiedzi requestów sam http status np 200("ok") czy 401("unauthorized") mówią o statusie | ✅️
Testy jednostkowe oraz TDD( test driven development ) | ❌️
rozważyć ograniczenie ilości requestów( https://medium.com/dataseries/how-to-rate-limit-your-api-f1c2cf420bdf ) | ❌️
Naprawić status requestów bo aktualnie zawsze w przypdaku błędu zwracam 403( forbidden ) niezależnie od tego co się stało | ✅️
Install docsify as dev dependency | ✅️
Replace models.js with models.ts or replace sequalize( SQL ORM ) with mongosee ( ORM for mongo DB NO SQL database) | ✅️
Add indexes to mongoDB | ❌️