# Preslov

TypeScript/JavaScript biblioteka za preslovljavanje srpskog ćiriličnog pisma u latinicu i ASCII latinicu. Radi u browseru i na serveru (node.js / deno / bun).

Ova biblioteka je TypeScript/JavaScript port [srbovanje](https://github.com/dejan/srbovanje) Ruby gem-a.

## Instalacija

```bash
npm install preslov
```

Ili sa bun-om:

```bash
bun add preslov
```

## Upotreba

```typescript
import { translit } from 'preslov';

// Preslovljavanje u latinicu sa dijakritičkim znacima (podrazumevano)
translit('Љубав'); // 'Ljubav'
translit('ЉУБАВ'); // 'LJUBAV'

// Eksplicitno navođenje latinice
translit('Ђурђевак', { to: 'latin' }); // 'Đurđevak'

// Preslovljavanje u ASCII latinicu (bez dijakritičkih znakova)
translit('Đurđevak', { to: 'ascii' }); // 'Djurdjevak'
translit('ĐURĐEVAK', { to: 'ascii' }); // 'DJURDJEVAK'

// Kreiranje URL slug-ova
translit('Карађорђева шницла', { to: 'slug' }); // 'karadjordjeva-snicla'
translit('Шабан Шаулић', { to: 'slug' }); // 'saban-saulic'
```

## API Referenca

### `translit(text: string, options?: { to?: 'latin' | 'ascii' | 'slug' }): string`

Glavna funkcija za preslovljavanje sa fleksibilnim izlaznim formatom.

- **Parametri**: 
  - `text` - Tekst za preslovljavanje
  - `options.to` - Ciljni format: `'latin'` (sa dijakritičkim znacima, podrazumevano), `'ascii'` (bez dijakritičkih znakova), ili `'slug'` (URL-friendly)
- **Vraća**: Preslovljen tekst u navedenom formatu
- **Primeri**:
  ```typescript
  translit("Његош")                    // "Njegoš" (podrazumevano: latin)
  translit("Његош", { to: "latin" })   // "Njegoš"
  translit("Његош", { to: "ascii" })   // "Njegos"
  translit("Његош", { to: "slug" })    // "njegos"
  ```

### `alphabet(): readonly string[]`

Vraća srpsku abecedu u latiničnom pismu.

- **Vraća**: Niz slova srpske abecede u latiničnom pismu

## Razvoj

### Preduslov

- [Bun](https://bun.sh/) - Brzi JavaScript runtime i package manager

### Instalacija

```bash
git clone git@github.com:dejan/preslov.git
cd preslov

bun install
```

### Testiranje

```bash
bun test
```

### Isprobavanje

```bash
bun repl
```

```typescript
> import { translit, alphabet } from "./src/preslov";
> translit("Његош", { to: "latin" })
'Njegoš'
```

### Formatiranje

```bash
bunx prettier --check "src/**/*.ts" --write
```

### Pakovanje

```bash
bun run build
```

## Licenca

MIT License

Copyright (c) 2025 Dejan Simic

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
