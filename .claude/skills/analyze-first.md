# Skill: Analyze First

Verwende diesen Skill BEVOR du einen Fehler fixst oder ein neues Feature baust.

## Pflicht-Checkliste

1. **Fehlermeldung vollständig lesen**
   - Was sagt der Fehler genau?
   - In welcher Datei und Zeile tritt er auf?
   - Was hat sich zuletzt geändert?

2. **Ursache benennen** (nicht raten)
   - Was ist die Root Cause?
   - Ist es ein Versions-, Konfigurations- oder Logikproblem?

3. **Lösungsoptionen abwägen**
   - Mindestens zwei Optionen nennen.
   - Empfehlung mit Begründung geben.
   - Nutzer bestätigen lassen bevor Code geändert wird.

4. **Seiteneffekte prüfen**
   - Welche anderen Dateien/Features sind betroffen?
   - Kann die Änderung etwas Bestehendes kaputtmachen?

## Wann erzwingen
- Bei jedem Fehler der mehr als 5 Minuten dauert
- Bei Fehlern die Abhängigkeiten (node_modules, Prisma, Auth) betreffen
- Wenn der erste Fix-Versuch nicht funktioniert hat
