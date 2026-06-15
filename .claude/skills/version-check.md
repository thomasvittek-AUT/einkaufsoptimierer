# Skill: Version Check

Verwende diesen Skill BEVOR du ein neues npm-Paket installierst.

## Pflicht-Checkliste

1. **Aktuelle Versionen im Projekt ermitteln**
   ```
   cat package.json
   ```

2. **Stabile Version wählen** (NICHT die neueste)
   - Suche die letzte LTS- oder stabile Version
   - Vermeide: Beta, RC, alpha, Versionen die < 6 Monate alt sind
   - Regel: Wenn die Versionsnummer > aktuellem Stand der Dokumentation ist → zu neu

3. **Kompatibilität prüfen**
   - Peer Dependencies lesen: `npm info <paket> peerDependencies`
   - Bekannte Konflikte mit installierten Paketen?
   - Besonders prüfen: Next.js ↔ Prisma ↔ NextAuth ↔ React

4. **Bekannte Probleme recherchieren**
   - GitHub Issues des Pakets nach "Next.js" oder "Turbopack" durchsuchen
   - Changelog auf Breaking Changes prüfen

## Bewährte Versionen für dieses Projekt
| Paket | Stabile Version | NICHT verwenden |
|---|---|---|
| next | 14.x | 15+, 16+ |
| prisma | 5.x | 6+, 7+ |
| next-auth | 4.x | 5-beta |
| @prisma/client | 5.x (= prisma) | 6+, 7+ |

## Entscheidungsregel
Wenn du unsicher bist: **ältere stabile Version wählen**. Ein bewährtes Paket schlägt immer ein neues mit unbekannten Bugs.
