# Currency Exchange App

**Wersja aplikacji**: `1.0.0`  
**Autor**: Piotr Glejzer

## Opis projektu

Currency Exchange App to aplikacja webowa stworzona do wyświetlania aktualnych kursów walut oraz kalkulacji wartości wymiany pomiędzy różnymi walutami. Aplikacja wykorzystuje API NBP (Narodowy Bank Polski), aby pobierać najnowsze dostępne dane kursów walut oraz historię kursów w wybranym zakresie dat. Projekt jest napisany w `TypeScript` przy użyciu `React` oraz biblioteki `Recharts` do renderowania wykresów.

## Funkcjonalności

- **Wyświetlanie kursów walut**: Aplikacja pobiera i wyświetla kursy walut z API NBP, z możliwością wyboru konkretnej daty.
- **Wyszukiwanie walut**: Użytkownik może wyszukiwać waluty po nazwie lub kodzie waluty.
- **Dynamiczne filtrowanie**: Użytkownik może filtrować wyświetlane waluty bez konieczności ponownego ładowania strony.
- **Przełączanie widoku walut**: Początkowo widocznych jest 10 walut, a po kliknięciu przycisku „Pokaż więcej” ładowane są wszystkie dostępne waluty.
- **Wykres historyczny waluty**: Aplikacja umożliwia wyświetlanie wykresu zmian kursu wybranej waluty w zadanym przedziale czasu.
- **Obsługa błędów i informacji**: W przypadku podania nieprawidłowej daty, aplikacja informuje użytkownika i pobiera najnowsze dostępne dane.

## Technologie

- **React** (wersja 18.3.1): Framework frontendowy do budowania interfejsu użytkownika.
- **TypeScript** (wersja 4.9.5): Typowany język nadzwyczajny dla JavaScript, zwiększający bezpieczeństwo kodu.
- **Recharts** (wersja 2.12.7): Biblioteka do renderowania interaktywnych wykresów.
- **React Router Dom** (wersja 6.26.2): Zarządzanie trasami i nawigacją w aplikacji.
- **ESLint i Prettier**: Lintowanie kodu i automatyczne formatowanie dla zachowania wysokiej jakości kodu.
- **Testing Library**: Zestaw narzędzi do testowania komponentów React.

## Instalacja

### Wymagania:

- **Node.js** (wersja >= 18.18.0)  
  Aplikacja została stworzona na wersji `Node 18.18.0` oraz `npm 7.0.4`. Zalecamy używanie wersji Node wyższej niż `18`, aby zapewnić kompatybilność.

### Kroki instalacji:

1. **Klonowanie repozytorium:**

   ```bash
   git clone https://github.com/pglejzer/zd-rekrutacyjne.git
   cd zd-rekrutacyjne
   ```

2. **Instalacja zależności:**

   ```bash
   npm install
   ```

3. **Uruchomienie aplikacji w trybie deweloperskim:**

   ```bash
   npm start
   ```

   Aplikacja zostanie uruchomiona na `http://localhost:3000/`.

4. **Budowanie aplikacji produkcyjnej:**

   Aby zbudować aplikację w trybie produkcyjnym, użyj polecenia:

   ```bash
   npm run build
   ```

## Skrypty

- `npm start`: Uruchamia aplikację w trybie deweloperskim.
- `npm run build`: Buduje aplikację w trybie produkcyjnym.
- `npm test`: Uruchamia zestaw testów jednostkowych.
- `npm run eject`: Umożliwia wyeksportowanie ustawień domyślnych Reacta, jeśli wymagane są dodatkowe modyfikacje.

## Struktura katalogów

- `/src`: Główny katalog projektu, zawierający komponenty, style i narzędzia.
  - `/components`: Komponenty React do różnych funkcji aplikacji.
  - `/services`: Warstwa komunikacji z API.
  - `/utils`: Funkcje pomocnicze, takie jak przetwarzanie dat.
  - `/tests`: Testy jednostkowe komponentów i logiki aplikacji.
  - `/assets`: Zasoby statyczne, takie jak obrazy, ikony itp.

## Kluczowe komponenty

### 1. `CurrencyList`

Komponent wyświetlający listę walut z aktualnymi kursami. Zawiera możliwość filtrowania walut oraz zmianę daty dla uzyskania kursów z innych dni.

- **Pobieranie danych**: Wykorzystuje `getCurrencyRates` z API NBP.
- **Filtrowanie**: Implementuje filtrowanie po nazwie waluty lub kodzie waluty.
- **Pokaż więcej**: Początkowo wyświetla 10 walut, a po kliknięciu przycisku „Pokaż więcej” widoczne są wszystkie waluty.

### 2. `CurrencyDetail`

Komponent do wyświetlania szczegółowego wykresu zmian kursu wybranej waluty na podstawie danych historycznych.

- **Pobieranie danych historycznych**: Wykorzystuje `getCurrencyHistory` z API NBP.
- **Wykres**: Używa `Recharts` do wyświetlania interaktywnego wykresu zmian kursu waluty.

## API

Aplikacja korzysta z publicznego API NBP do pobierania danych o kursach walut.

### Endpoints:

- **GET /tables/A/**: Pobiera aktualne kursy walut.
- **GET /rates/A/{code}/{startDate}/{endDate}/**: Pobiera dane historyczne dla wybranej waluty w zadanym przedziale czasu.

### Przykład żądania:

```javascript
fetch('https://api.nbp.pl/api/exchangerates/tables/A?format=json')
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## Zależności

### Główne zależności:

- **React**: Główna biblioteka do tworzenia interfejsów użytkownika.
- **React Router Dom**: Zarządzanie trasami w aplikacji.
- **Recharts**: Wizualizacja danych na wykresach.
- **TypeScript**: Statycznie typowany JavaScript.

### Zależności deweloperskie:

- **ESLint & Prettier**: Lintowanie i formatowanie kodu.
- **Testing Library & Jest**: Testowanie komponentów i logiki aplikacji.

## Uwagi końcowe

Zalecana wersja `Node.js` to **>=18.18.0**, aby uniknąć problemów z kompatybilnością.

## Licencja

Ten projekt jest objęty licencją MIT.
