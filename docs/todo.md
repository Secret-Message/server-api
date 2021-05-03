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
Naprawić socket.io | ❌️
Udokumentować endpointy | ✅️
Filtry wiadomości( z bazą danych będzie to kwestja dodani tylko whera do zapytania ) | ❌️
Poprawić odpowiedzi z niektórych endpointów | ❌️
zmienić ścieżki w routes np: /api/deleteServer -> /api/server/delete | ❌️
Dodać stopniowe pobieranie wiadomości, ponieważ serverr aktualnie wysyła wszystkie wiadomości w kanale | ❌️
Dodać Web RTC | ❌️
Dodać szyfrowanie np. AES, RSA | ❌️
Usunąć pole status z odpowiedzi requestów sam http status np 200("ok") czy 401("unauthorized") mówią o statusie | ✅️
Testy jednostkowe | ❌️
rozważyć ograniczenie ilości requestów( https://medium.com/dataseries/how-to-rate-limit-your-api-f1c2cf420bdf ) | ❌️
Naprawić zapytania sequalize wątpie, aby łączenie 4 tabel w jedną było dobrą praktyką, ale na razie nie znam lepszego rozwiązania | ❌️
Naprawić status requestów bo aktualnie zawsze w przypdaku błędu zwracam 403( forbidden ) niezależnie od tego co się stało | ❌️
Zawęzić zakresy pobierania danych sql, aby nie pobierał całych rzędów danych tylko potrzebne wartości np. attributes: ["uuid", "name"] | ❌️