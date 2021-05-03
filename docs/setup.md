Instrukcja jak zainstalować i skonfigurować testowe api

# 1) baza danych
Najpierw mósisz zainstalować bazę danych np: sqllite, postgresSQL, mysql, mariaDB, microsoftSQL. Powinny działać wszystkie bazy danych z wymienionych, ponieważ testowa wersja api korzysta z ORM( Object–relational mapping ) za pomocą biblioteki sequalize, działa to na zasadzie pośrednika który tłumaczy funkcje i obiekty js na dialekty konkretnych baz danych. Lecz rekomenduje użycie mysql, ponieważ przetestowałem go i wiem że działa. Tutorial do instalacji: https://youtu.be/Cz3WcZLRaWc?t=303.

# 2) konfiguracja
API wymaga do działania paru plików konfiguracyjnych pierwszym z nich jest firebase-admin-key.json, który, można pobrać z strony projektu firebase należy zmienić jego nazwę i umieścić w folderze config. Kolejnym plikiem który jest wymagany jest plik konfiguracyjny bazy danych należy utworzyć plik db.config.js w folderze config a jego struktura powinna wyglądać mniej więcej tak:
```
module.exports = {
    HOST: "localhost",
    USER: { twój login },
    PASSWORD: "{ twoje hasło },
    DB: { nazwa bazy dancyh },
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
```
Nie trzeba tworzyć rzadnych tabel w bazie danych sequalize zajmie się tym sam. Ostatnim plikiem jest plik .env który powinien znaleźć się w głównym folderze projektu i powinie zawierać takie wartości:
```
SERVER_TOKEN="tajnyKluczPrywatny" //wymagany jest do generowania tokenów jwt
DEBUG=0 //nie pokazuje logów w konsoli
```

# 3) Debugowanie
Jeżeli coś w bazie danych ulegnie zepsuciu, możesz wyzerować wszystkie wartości i utworzyć na nowo zmieniając wartość w pliku /models/index.js line: 51 force z false na true sequalize usunie wszystkie tabele razem z wszystkimi wartościami i utworzy je na nowo doprowadzi to także do utraty danych. Jeżeli chcesz ukryć wszystkie komendy SQL które są uruchamiane odkomentuj linię 11 w pliku /models/index.js wyłączy to logowanie sequalize.

# 4) Finalne uruchomienie
```
Relese: npm start start
Debug: npm start debug
```

# 5) Testy jednostkowe
Coming soon