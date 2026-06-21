# Projekt: Einkaufsoptimierer

## Ziel
- Web-App die aufgrund einer Einkaufsliste die günstigste Option (Supermärkte, Online-Shops) ermittelt.
- Import von Cookiedoo-Einkaufslisten, PDF, Text, HTML.
- Wiederkehrende Produkte erkennen und Grundbedarf vorschlagen.
- Fahrtrouten und Zeitkosten in die Preisermittlung einbeziehen (Phase 4).

## Festgelegter Tech-Stack
- Framework: Next.js 14 (LTS, stabil)
- Datenbank: SQLite via Prisma 5 (stabil, kein Adapter nötig)
- Login: NextAuth v4 (stabil)
- Styling: Tailwind CSS 3
- Sprache: JavaScript (kein TypeScript)

## Regeln für Claude Code

### Verhalten & Kommunikation
- Schreibe einfachen, gut kommentierten Code (Nutzer ist kein Programmierer).
- Erkläre Entscheidungen in 1–2 Sätzen auf Deutsch.
- Frage nach, bevor du etwas Großes oder Irreversibles tust.
- Mache nach jedem funktionierenden Stand einen Commit.

### PFLICHT: Analyse vor Aktion
- Bevor du ein neues Paket installierst: Versionsnummern und Kompatibilität prüfen.
- Bevor du einen Bug fixst: Ursache vollständig verstehen, nicht raten.
- Bevor du Code schreibst: Kurz den Plan nennen und bestätigen lassen.
- Nutze den Skill `/analyze-first` wenn du unsicher bist.

### PFLICHT: Versionsstrategie
- Immer LTS- oder stabile Releases wählen – NIEMALS Beta, RC oder die neueste Version ohne Prüfung.
- Bei jedem neuen Paket prüfen: Funktioniert es mit den bereits installierten Versionen?
- Nutze den Skill `/version-check` vor jeder Installation.

### PFLICHT: Code-Review vor Commits
- Vor jedem Commit den geänderten Code mit `/code-review` prüfen.
- Bei größeren Features: `/code-review ultra` für Multi-Perspektiven-Review.

## Status / offene Punkte
- Phase 1 abgeschlossen: Login, Registrierung, Dashboard ✅
- Phase 2 abgeschlossen: Einkaufslisten + Produkte erstellen/löschen ✅
- Phase 3 offen: Import (Cookiedoo, PDF, Text, HTML), Grundbedarf
- Phase 4 offen: Preisvergleich
- Phase 5 offen: Fahrtrouten, Prognosen
