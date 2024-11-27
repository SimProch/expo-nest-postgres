Zadání:

Vytvořit mobilní aplikaci (iOS/Android), která má tyto funkce:

- Registrace
- Přihlášení


Funkce po přihlášení:

- Tlačítko 1: Po kliku to načte formulář, kde si budete moci upravit své údaje
- Tlačítko 2: Po kliku se zobrazí okno, kde bude vidět přední kamera telefonu
- Tlačítko 3: Po kliku vyskočí okno, kde napíšete město a vypíše to aktuální počasí v tomto městě (níže je API)

——————


Budete potrebovat udelat HTTP request GET api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

API key: 91a8b0d4c5d50d9617d0cce89862204e
city name - to co zadá uživatel

Dokumentace je dostupná po přihlášení na https://openweathermap.org/current


-------


Struktura registrace

{
 "email": "",
 "password": "",
 "phoneNumber": "",
 "cities": [
   {
     "name": "",
     "address": {
       "postCode": ""
     }
   }
 ]
}

- validace jednotlivých polí
- pro tlačítka použít spodní navigaci
- tlačítko 3: seznam uložených měst, klik na město zobrazí stránku s informací o vybraném městě + výsledky z API

