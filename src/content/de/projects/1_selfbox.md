---
order: 1
name: Selfbox – eine Personal-Data-Store-Lösung
anchor: selfbox
technologies:
  - Node.JS
  - Nest.JS
  - GraphQL
  - Neo4j
  - Cypher
  - OAuth
  - OpenID
  - Angular
duration:
  start: September 2018
  end: Juli 2019
---

Selfbox ist ein **Prototyp** für einen [**Personal Data Store**](https://en.wikipedia.org/wiki/Personal_data_service), der im Rahmen meiner Masterarbeit entworfen und umgesetzt wurde.
Das Projekt nutzt _Neo4J_ als Storage-Backend für die Daten, wodurch sich beliebige Beziehungen zwischen einzelnen
Datenknoten abbilden lassen. Anwendungen können über _OpenID_ **entdecken**, welche Art von Daten der Server anbietet, und die Besitzerin oder der Besitzer verwaltet die Berechtigungen über _OAuth2_.
Selfbox ist zugleich selbst _OAuth2_-Provider und macht damit Drittanbieter wie _Facebook_ oder _Google_ vollständig überflüssig. Die Daten werden
über _GraphQL_ an die verschiedenen Clients ausgeliefert. Sämtliche Queries, Mutations, OAuth-Scopes und mehr werden dabei **automatisch generiert** — auf Basis eines
GraphQL-Schemas.
