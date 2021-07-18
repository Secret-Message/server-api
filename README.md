# Secret Message API
![shield](https://img.shields.io/github/repo-size/Secret-Message/server-api) ![shield](https://img.shields.io/github/v/release/Secret-Message/server-api?color=red&label=Latest%20version%3A) ![shield](https://img.shields.io/github/commits-since/Secret-Message/server-api/latest) ![shield](https://img.shields.io/maintenance/yes/2021) ![shield](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-important) ![shield](https://img.shields.io/badge/Supported%20platforms%3A%20-Windows%20%7C%20MacOS%20%7C%20Linux%20%7C%20Ubuntu-informational)
</br>

(description placeholder)

Przydatne linki:
- schemat bazy danych: https://drawsql.app/f-2/diagrams/secret-message-v3
- spotlight api docs: na spootlight powinna być dokumentacja stabilnej wersji a to jest testowa 

DM i server są teraz tym samym jedyna różnica między nimi to to że DM jest read-only i nie można na nim tworzyć ani usuwać kanałów

DOCKER:
Aby uruchomić kontener dockera zmień rozszerzenie z docker-compose.yml.template na docker-compose.yml i zastąp wszystkie { wartości } odpowiadającymi im wartościami np { api-port } na 3000. Upewnij się że masz zainstalowane docker i docker-compose. Aby uruchomić i połączyć ze sobą wszystkie kontenery automatycznie użyj komendy:
```bash
docker-compose up
```

**Frankoslaw: To jest bardziej stabilna wersja api, ale cały czas jak coś się zepsuje weź wersję z brancha dev **