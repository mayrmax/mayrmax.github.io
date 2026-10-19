---
title: "Agenten statt Annotationen: Meine Vorhersagen von 2019 im Faktencheck"
description: "2019 habe ich am Ende meiner Masterarbeit vorhergesagt, wohin sich das Web entwickelt. Sieben Jahre später: was eingetroffen ist, wo ich danebenlag und was ich daraus für die Arbeit mit KI-Agenten mitnehme."
date: 2026-10-19T12:00:00.000Z
translationKey: agents-not-annotations
tags:
  - KI-Agenten
  - MCP
  - Personal Data Stores
  - Datensouveränität
---

2019 habe ich an der FH Hagenberg meine Masterarbeit über Personal Data Stores abgegeben: Speicher, in denen deine persönlichen Daten bei dir liegen statt bei den Plattformen, die sie nutzen. Ich habe zuerst eine App auf [Solid](https://solidproject.org/) gebaut, bin an dessen Grenzen gestoßen und habe dann mit „Selfbox“ einen eigenen Prototyp entwickelt.

Das letzte Kapitel heißt „Future of the Web“. Darin habe ich ein paar Vermutungen aufgeschrieben, wohin sich das Web entwickelt. Ich habe es jetzt, sieben Jahre später, noch einmal gelesen. Hier ist die ehrliche Bilanz, mit den Originalzitaten.

## Agenten statt Annotationen

> The semantic web will not be based on semantic annotations on websites but on structured interfaces between servers where autonomous agents will interact with each other.

Das war die Vorhersage, auf die ich heute am stolzesten bin. Damals ging die Idee vom semantischen Web noch davon aus, dass wir Webseiten mit Bedeutung auszeichnen und Maschinen sie dann lesen. Ich habe vermutet, dass es anders kommt: dass Maschinen nicht Seiten lesen, sondern über Schnittstellen miteinander sprechen.

Genau so ist es gekommen. KI-Agenten rufen heute Werkzeuge über strukturierte Schnittstellen auf, und mit dem Model Context Protocol (MCP) gibt es dafür seit Ende 2024 einen offenen Standard. Anthropic hat ihn im Dezember 2025 an die Agentic AI Foundation unter dem Dach der Linux Foundation übergeben; ChatGPT, Gemini, Microsoft Copilot, VS Code und Cursor unterstützen ihn.

Die Annotationen sind übrigens nicht verschwunden. Strukturierte Daten nach schema.org stecken heute in unzähligen Websites, auch in dieser hier. Ich nutze sie täglich für technisches SEO. Nur lesen sie vor allem Suchmaschinen, nicht Agenten.

Nicht ganz eingetroffen ist der Teil mit „interact with each other“. Agenten arbeiten bisher meistens im Auftrag eines Menschen mit Servern, nicht untereinander.

**Urteil: getroffen.**

## Was ich damals unterschätzt habe

Das hatte ich nicht vorhergesagt, aber gebaut, ohne zu wissen, wofür. Das schwierigste Problem an Selfbox war nicht die Speicherung. Es war die Frage, wie sich eine fremde App mit einem von tausenden persönlichen Servern verbindet, den sie vorher nie gesehen hat.

Meine Antwort war Standard-OAuth mit drei Bausteinen:

1. **Discovery:** Jeder Server beschreibt sich selbst unter `/.well-known/openid-configuration`, die App konfiguriert sich daraus.
2. **Dynamische Registrierung:** Die App meldet sich beim Server selbst an, statt dass ein Entwickler sich manuell bei jedem einzelnen registrieren muss.
3. **Scopes aus dem Datenmodell:** Aus jedem Datentyp entstanden automatisch Berechtigungen wie `Movie:Read`, und du hast pro App zugestimmt, was sie darf.

Genau vor diesem Problem stehen heute MCP-Clients, die sich mit beliebigen MCP-Servern verbinden. Die Autorisierung in MCP baut auf OAuth auf und nutzt dieselben Bausteine. In der Spezifikation vom Juni 2025 war die dynamische Registrierung noch empfohlen; die Fassung vom November 2025 bevorzugt sogenannte Client ID Metadata Documents, bei denen die App über eine eigene URL beschreibt, wer sie ist. Die Richtung ist dieselbe.

Die Lektion daraus: **Bei Agenten ist nicht die Intelligenz das schwierige Problem, sondern die Frage, wer was darf.**

## Das Web wird regulierter und zersplitterter

> If current trends continue, then the web will be more regulated as it is now and possibly even more separated as developments in authoritarian states show.

Das war nicht besonders mutig, aber es stimmt. Seit 2019 sind in der EU der Digital Services Act, der Digital Markets Act, der AI Act und der Data Act dazugekommen; die meisten Bestimmungen des Data Act gelten seit September 2025. Bis Ende 2026 muss jeder Mitgliedstaat eine digitale Identitäts-Wallet anbieten, in Österreich soll ID Austria dazu werden.

Im selben Absatz habe ich auch geschrieben, dass manche Regierungen Regeln fordern, die Menschen zwingen, ihre Privatsphäre aufzugeben. Die Debatte um die sogenannte Chatkontrolle zeigt, dass auch das nicht übertrieben war.

**Urteil: getroffen.**

## WhatsApp zeigt Werbung

Ich habe damals erwähnt, dass WhatsApp plant, gezielte Werbung in die App zu bringen. Im Juni 2025 hat Meta das angekündigt: Werbung im Status-Bereich, die privaten Chats sollen werbefrei bleiben.

**Urteil: getroffen.** Nur die Folge, die ich daraus abgeleitet habe, ist ausgeblieben. Siehe nächster Punkt.

## Zentrale Plattformen verlieren gegen dezentrale Apps

> This promise slows down the change but can not stop it as centralized platforms cannot compete with decentralized applications.

Hier lag ich daneben. Die großen Plattformen haben ihre Nutzerinnen und Nutzer behalten, und mit KI hat sich die Macht eher noch weiter konzentriert: Wer die meisten Daten und die meiste Rechenleistung hat, baut die besten Modelle.

Das Spannende ist, dass die richtige Antwort schon im selben Kapitel stand. Ich habe über dezentrale Dienste geschrieben:

> These services are currently uncomfortable to use.

Genau das war der Punkt. Bequemlichkeit schlägt Prinzipien. Ein Dienst, der die Privatsphäre schützt, aber umständlicher ist, gewinnt nur die Menschen, die ohnehin überzeugt sind.

**Urteil: daneben.**

## Blockchain wird das Web 3.0

Ich habe Bitcoin, Ethereum und dezentrale Apps als nächste Generation des Webs beschrieben und behauptet, dezentraler Speicher werde bestehende Lösungen bei Kosten, Redundanz und Sicherheit um den Faktor zehn übertreffen.

Das ist nicht passiert. Nach dem Hype um 2021 sind dezentrale Apps eine Nische geblieben, und Krypto ist vor allem ein Finanzthema. Meine eigenen Projekte laufen heute auf ganz normalen Servern, diese Website zum Beispiel bei Hetzner in Nürnberg.

Was von der Idee geblieben ist, sieht für mich anders aus, als ich 2019 dachte. Dezentral heißt heute für mich nicht Blockchain, sondern: Nicht alles liegt bei drei US-Konzernen. Offene Software, selbst gehostet bei europäischen Anbietern, mit Werkzeugen wie Coolify, die es fast so bequem machen wie die großen Clouds.

**Urteil: daneben.**

## Graphen sind zukunftssicher

> Representing data in its natural form, in a semantic way, using relationships and nodes in a graph provides a future proof solution and allows semantic exploration.

Selfbox hat alle Daten in einer Graphdatenbank (Neo4j) gespeichert. Für persönliche Daten, die aus lauter Beziehungen bestehen, war das richtig. Und Graphen sind mit KI tatsächlich zurück: Wissensgraphen helfen Sprachmodellen, Zusammenhänge zu finden, die eine reine Textsuche übersieht.

Aber „zukunftssicher“ war zu groß. Für die meisten Projekte reicht eine gute relationale Datenbank. Bei malsati habe ich Neo4j sogar wieder ausgebaut, heute läuft dort alles auf PostgreSQL.

**Urteil: teils.**

## Personal Data Stores werden Mainstream

> If PDS will ever reach mainstream is unknown.

Wenigstens hier war ich vorsichtig. Solid gibt es weiterhin: Seit Oktober 2024 betreut das Open Data Institute das Projekt, und beim W3C wird ein Teil davon als Linked Web Storage standardisiert. Im Alltag der meisten Menschen ist es nicht angekommen.

Ein Teil der Idee kommt trotzdem, nur auf anderem Weg: über Regulierung. Die EU-Wallet ist ein Stück „deine Identität liegt bei dir“, der Data Act ein Stück „deine Daten gehören dir“.

Und in der Beschreibung von Selfbox habe ich vorhergesagt, dass eine KI dich schnell kennen könnte, ohne aufwendig trainiert zu werden, wenn deine Daten an einem Ort liegen. Das passiert gerade: Assistenten merken sich Dinge über dich und greifen über Schnittstellen auf deine Daten zu. Nur liegen diese Daten bei den Plattformen. Das Problem, um das sich meine ganze Arbeit gedreht hat, ist also nicht gelöst. Es ist mit KI dringender geworden.

**Urteil: offen.**

## Die Bilanz

| Vorhersage von 2019                                | Urteil   |
| -------------------------------------------------- | -------- |
| Agenten sprechen über Schnittstellen statt Annotationen | getroffen |
| Das Web wird regulierter und zersplitterter        | getroffen |
| WhatsApp zeigt Werbung                             | getroffen |
| Zentrale Plattformen verlieren gegen dezentrale Apps | daneben  |
| Blockchain und dezentraler Speicher werden das Web 3.0 | daneben  |
| Graphen sind zukunftssicher                        | teils    |
| Personal Data Stores werden Mainstream             | offen    |

Drei Treffer, zwei Fehlschläge, ein Unentschieden, eine offene Frage. Interessant finde ich weniger die Quote als das Muster: Getroffen habe ich, wo ich auf Technik und Regulierung geschaut habe. Daneben lag ich, wo ich auf das Verhalten von Menschen gesetzt habe.

## Was ich daraus mitnehme

Wenn ich heute KI-Agenten in bestehende Systeme integriere, sind es genau diese drei Lektionen:

- **Schnittstellen schlagen Semantik.** Ein Agent ist nur so gut wie die Schnittstellen, die er benutzen kann. Saubere, gut beschriebene APIs sind die beste Vorbereitung auf KI.
- **Berechtigungen sind das eigentliche Problem.** Ein Agent, der für eine Person arbeitet, darf nur sehen, was diese Person sehen darf. Das muss in die Architektur, nicht in den Prompt.
- **Bequemlichkeit entscheidet.** Datenschutz und europäisches Hosting setzen sich nur durch, wenn sie nicht umständlicher sind. Daran messe ich meine eigenen Lösungen.

Den Text, mit dem das alles 2018 angefangen hat, gibt es übrigens noch: [Eine Reise ins dezentrale Web](/de/blog/reise-ins-dezentrale-web).
