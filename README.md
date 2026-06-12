# Sonnenblick Montafon

Luxus-Ferienwohnung in Bartholomäberg, Vorarlberg. Single-file Web­seite mit eingebautem Buchungs­kalender und Admin-Panel.

**Live:** _wird nach Deploy hier eingetragen_

## Tech

Reines HTML / CSS / JavaScript — keine Frameworks, keine Build-Pipeline. Daten werden in `localStorage` des Browsers gespeichert.

## Features

- 2-Monats-Verfügbarkeits­kalender mit Saison­preisen pro Tag
- Sofortbuchung **oder** unverbindliche Anfrage
- Galerie mit Lightbox, Aktivitäten-Sektion (Winter / Sommer) mit echten Fotos
- Vollständig editierbares Admin-Panel (versteckter Punkt unten rechts, Standard-Passwort `sonnenblick2026` — sofort ändern!)
- E-Mail-Benachrichtigungen via [EmailJS](https://www.emailjs.com) (im Admin-Panel konfigurierbar)
- DSGVO-konform: Impressum, Datenschutz, AGB im Admin editierbar
- Alpine Luxury / Editorial Design (Cormorant Garamond + Manrope)
- Mobile-first, `prefers-reduced-motion` respektiert, WCAG-Focus-States

## Lokale Entwicklung

```sh
# Doppelklick auf index.html — fertig.
```

## Deploy auf GitHub Pages

1. Repo auf GitHub erstellen
2. `git remote add origin git@github.com:USERNAME/REPO.git`
3. `git push -u origin main`
4. In den Repo-Settings: **Pages** → Source = `main` / `(root)` → Save
5. Nach ~1 Minute live auf `https://USERNAME.github.io/REPO/`

## Admin-Setup nach Deploy

1. Passwort ändern (Tab "Passwort")
2. Hero-Bild, Kontakt­daten, Adresse aktualisieren (Tab "Allgemein")
3. EmailJS einrichten für Buchungs-Benachrichtigungen (Tab "E-Mail")
4. Echte Fotos in Galerie und Aktivitäten hochladen
