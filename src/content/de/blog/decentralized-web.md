---
title: "Eine Reise ins dezentrale Web"
description: "Linked Data, die Datapods von Solid, eine persönliche API, eine digitale Seele und autonome Agenten: Notizen vom Oktober 2018, geschrieben auf der Suche nach dem Thema meiner Masterarbeit."
date: 2018-10-08T12:00:00.000Z
updated: 2026-10-19T12:00:00.000Z
tags:
  - Linked Data
  - Solid
  - Personal Data Stores
  - Dezentralisierung
note: "Diesen Text habe ich im Oktober 2018 geschrieben, als ich das Thema für meine Masterarbeit über Personal Data Stores gesucht habe, und ursprünglich als fünf kurze Beiträge veröffentlicht. Er steht hier so, wie ich ihn damals geschrieben habe; korrigiert sind nur Absätze, eine Liste und ein paar Tippfehler."
---

Zuerst ein bisschen Hintergrund dazu, warum ich angefangen habe, Artikel zu schreiben. Wer daran nicht interessiert ist, springt einfach zum nächsten Abschnitt.

Gestern habe ich begonnen, Themen für meine Masterarbeit auszuloten. Ich habe einen starken Web-Hintergrund und wollte deshalb etwas in diesem Bereich machen. Die naheliegendste Wahl war zunächst, etwas mit Machine Learning zu bauen, das mehr Einblick in bestehende Daten gibt. Jahrelang war das ein Ziel von mir, während ich Ideen für interaktive Schulbücher, Notizbücher, Kollaborationswerkzeuge und Ähnliches skizzierte. All diese Ideen sind irgendwie nie aufgegangen, weil mir etwas fehlte.

Gestern habe ich endlich herausgefunden, was. Es war so offensichtlich, aber es brauchte diesen Funken, um das Feuer zu entzünden. Dieser Funke war für mich der tiefe Einstieg in Linked Data und in das Konzept der Datapods, das Solid eingeführt hat.

## Linked Data

Linked Data beschreibt einen Standard, der es Maschinen erlaubt, die Bedeutung eines Textes zu erfassen. Wenn ich zum Beispiel einen Satz schreibe wie „London ist die Hauptstadt von England“, dann weiß man sofort, was London, Hauptstadt und England bedeuten. Eine Maschine hat dieses Wissen nicht und kann mit dem Satz nichts „Intelligentes“ anfangen. Mit Linked Data enthielte der Satz Annotationen und Hinweise, die einer Maschine mehr über die Entitäten sagen und was sie sind. Sie würden die Maschine also zu weiteren Informationen über die Entitäten und ihre Beziehungen führen.

Das klingt vielleicht unspektakulär: Warum sollte es mich interessieren, dass eine Maschine versteht, was ich schreibe?

Genau das dachte ich anfangs auch, aber dann stellte ich mir ein Schulbuch vor, in dem ich lese, bestimmte Wörter überfahre und sofort mehr Details zu dieser Entität bekomme. Beim selben Satz würde ich über London fahren, und das Dokument könnte eine Datenbank auf irgendeinem Webserver abfragen und mir sagen, dass die Stadt derzeit 8,13 Millionen Einwohner hat. Oder dass London eine Fläche von 1572 km² umfasst. Das sind simple Beispiele, aber sie geben eine Vorstellung davon, was möglich wäre. Künftig könnte ich etwa einen Artikel über London schreiben, der statistische Daten enthält: Statt die Zahlen als Text zu schreiben, füge ich nur einen Hinweis ein, den aktuellen Wert aus einer Online-Quelle zu holen.

Linked Data macht es außerdem möglich, Dokumente nach Informationen abzufragen. Das heißt, wir können das Dokument einfach nach dem fragen, was wir wollen, statt uns durch unzählige Seiten zu lesen.

## Datapods

Solid ist ein Ökosystem der Firma Inrupt, gegründet von Tim Berners-Lee, dem Erfinder des World Wide Web, mit dem Ziel, Menschen die Kontrolle über ihre Inhalte und Daten und über deren Nutzung zurückzugeben.

Das Konzept ist einfach: Indem wir unsere Bilder, Beiträge, Likes und so weiter in einem strukturierten und gut beschriebenen Format auf einem privat oder öffentlich gehosteten Server ablegen, könnten verschiedene Apps interoperabel auf unseren Daten arbeiten. Wenn eine Website etwa Name, Profilbild und E-Mail-Adresse braucht, um einen Forenbeitrag zu erstellen, könnten wir ihr einfach Zugriff auf diese Daten geben. Die Website würde sich holen, was sie braucht, ohne dass wir irgendetwas manuell eingeben müssten.

Daten hosten, nur damit die Registrierung einfacher wird? Das kann ich mit Facebook, Google, GitHub und tausend anderen Diensten längst. Stimmt, nur nutzen diese Websites deine Daten, um dir Werbung zu zeigen, ohne dass du kontrollierst, wer Zugriff darauf hat. Aber es geht hier nicht nur um Datenbesitz, sondern darum, was wir tun könnten, wenn uns die Daten gehören. Wir könnten problemlos die Plattform wechseln, wenn uns eine Änderung der Oberfläche nicht gefällt oder eine andere Seite mehr kann. Denk kurz darüber nach: Die meisten von uns sind auf Facebook, weil unsere Freundinnen und Freunde dort sind. Könnten wir sie behalten und weiter ihre Feeds sehen, würden sich einige, wenn nicht die meisten, für etwas anderes entscheiden. Mit Datapods geht genau das mit einem Mausklick.

Aber da ist noch mehr:

- Kein Abgleich von Daten über mehrere Websites und Profile hinweg mehr.
- Das Teilen beliebiger Informationen wird so einfach wie nur möglich, weil die Daten bereits online liegen. Wir müssen der Person nur Zugriff darauf geben.
- Meinungsfreiheit: Weil dir die Daten gehören, kann dich niemand zwingen, etwas zu löschen, nur weil ihm deine Meinung nicht passt.

Haben wir diesen Schritt einmal getan, gibt es kein Zurück. Wir hätten volle Kontrolle und Verantwortung und würden das Web in einen blühenden Garten verwandeln statt in eine Stadt mit ummauerten Vierteln.

## Eine persönliche API

Wie können wir, andere Menschen, Apps und Websites diese Daten lesen und verändern? Um an ein bestimmtes Datum zu kommen, brauchen wir dessen URL (Uniform Resource Locator). Eine URL benennt den Ort, an dem die Ressource liegt; eine Beispielabfrage für all meine Fotos könnte `max.solid.com/photos` lauten. Für ein bestimmtes Foto oder Album erweitere ich die Abfrage einfach auf einen spezifischeren Ort, etwa `max.solid.com/photos/holiday_spain`.

Ist diese Abfrage standardisiert, wüsste jede App, wo sie meine Fotos in meinem Datapod findet, und könnte sie mir anzeigen. Ich könnte auch so etwas wie ein Inhaltsverzeichnis in einem Ordner ablegen oder generieren und dieses Dokument abfragen, um alle Fotos zu finden, die ich in Spanien gemacht habe. Dasselbe ließe sich für Dokumente machen: Man legt alle Dokumente im eigenen Pod ab statt auf dem lokalen PC, in Dropbox, Google Drive oder bei anderen Diensten.

Solid erlaubt es uns außerdem, Änderungen an einer bestimmten Ressource zu abonnieren. So können wir zum Beispiel Songs, die wir in einem Monat hören, automatisch einer Playlist für diesen Monat hinzufügen. Weil diese Daten online verfügbar sind, kann ich die Playlist mit Freundinnen und Freunden teilen, und sie werden benachrichtigt, wenn etwas dazukommt.

Ich hoffe, deine Ideen sind inzwischen ins Rollen gekommen und du denkst bereits an all das, was möglich wäre. Weil über Linked Data alles miteinander verbunden ist, könnte es Apps geben, die dir neue Musik empfehlen, indem sie einfach deine Bibliothek analysieren. Diese Apps würden miteinander konkurrieren, um den besten Dienst und die treffsichersten Empfehlungen zu liefern.

Auch deine gesammelten Gesundheitsdaten würdest du in deinem Pod ablegen wollen, inklusive Messwerten und Aktivitäten deines Fitness-Trackers. Du könntest Apps oder sogar deiner Ärztin Zugriff darauf geben und Empfehlungen für deine Gesundheit erhalten, automatisiert und so persönlich wie möglich, entsprechend deinen gespeicherten Präferenzen.

## Eine digitale Seele

Wir speichern unsere persönlichen Daten in Datapods und greifen über eine Art API darauf zu. Aber je länger ich darüber nachdenke, desto mehr gleicht ein Datapod einer digitalen Seele, verbunden mit jener digitalen Umgebung, die wir Internet nennen. Es ist persönlich, es besteht aus allem, was du online tust, es repräsentiert dich; es ist ein Spiegel, der zeigt, wer du online bist.

Das ist ein durchaus beunruhigender Gedanke. Aber überleg mal: Der Großteil dieser Informationen liegt bereits irgendwo auf einem Firmenserver, ohne jeden Einblick. Erst kürzlich haben wir, zumindest als Europäerinnen und Europäer, über die DSGVO Zugriff auf einen Teil dieser Daten bekommen. Garantiert erhältst du allerdings nur die einfachsten Rohdaten; der größte Teil des Werts bleibt als Betriebsgeheimnis unter Verschluss.

Eine digitale Seele bringt auch für bestehende Dienste viele Verbesserungen. Ich zum Beispiel bin mit Sprachassistenten nie richtig warm geworden. Ich besitze ein Amazon Echo und nutze Alexa, um Wecker zu stellen und Musik zu spielen. Siri, Google Home und Cortana bieten alle irgendeine Funktionalität, aber sie sind weder klug noch persönlich. Künftige Assistenten könnten deine digitale Seele lesen und beschreiben oder sogar auf Nachrichten antworten, allein auf Basis der Daten und Erkenntnisse, die sie daraus ziehen. Sie könnten echte Hilfe leisten, Dinge finden, Termine vereinbaren und verstehen, wovon du sprichst. Weil sie auch auf die Kalender deiner Freundinnen und Freunde zugreifen könnten (sofern diese sie teilen), könnten sie mit anderen Assistenten sprechen und Aktivitäten planen. Schreibst du einer Freundin, könnte dich der Assistent daran erinnern, nach ihrem neuen Job zu fragen, weil er ihren Feed verfolgt und dich auf den neuesten Stand gebracht hat.

Die Möglichkeiten sind endlos. Die Frage, die bleibt: Wollen wir eine solche Zukunft, und wie können wir unsere digitale Seele schützen und absichern?

## Autonome Agenten

Jetzt kommt einer der wesentlichen Bausteine, die das Web auf die nächste Stufe heben.

Es wird wirklich persönliche Assistenten geben, die dich kennen, deine Interessen, deine Freundinnen und Freunde und sogar deine Familie. Sie werden automatisch Daten für dich sammeln, sie mit Kontext anreichern und ins neue Web einweben. Sie werden Sportstatistiken sammeln, die Nachrichten, die dich am meisten interessieren, oder neue Filme und Serien durchsehen und dir vorschlagen. Sie werden herauszufinden versuchen, was dich am meisten interessiert, und sich selbst verbessern: durch direktes Feedback und durch indirektes Feedback aus dem, was du im Alltag tust.

Stell dir eine Zukunft vor, in der du mit smarten Geräten durch die Straßen gehst, die erfassen, wohin du schaust. Ein autonomer Agent bemerkt vielleicht, dass du einen bestimmten Gegenstand länger als üblich angesehen hast. Er könnte sich das merken, das Web nach Varianten davon durchsuchen und dir Geschäfte vorschlagen, in denen du beim Kauf am meisten sparst.

Zu dem, was Google, Facebook und Amazon ohnehin schon tun, ist der Unterschied gar nicht so groß. Worauf es hinausläuft, ist erneut der Besitz dieser Daten und die direkte Rückkopplung, die du zu deinen Agenten hast. Du kannst Informationen löschen, bearbeiten, aktualisieren oder ergänzen, wann und wo du willst. Daten sind Macht, und weil es deine Daten sind, solltest du derjenige sein, der entscheidet, was mit ihnen passiert und wer Zugriff darauf hat.
