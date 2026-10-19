---
order: 1
name: Selfbox - A Personal Data Store Solution
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
  end: July 2019
---

Selfbox is a **prototype** for a [**Personal Data Store**][pds] that was designed and implemented during my master thesis.
The project uses a _Neo4J_ as storage backend for the data, which allows it to store all kinds of relations between different
data nodes. Applications can **discover** what kind of data the server offers via _OpenID_, and the owner can manage permissions via _OAuth2_.
Selfbox is also a _OAuth2_ provider, completely cutting the need for any third party service like _Facebook_ and _Google_. The data gets offered
via _GraphQL_ to the various clients. Furthermore, are all queries, mutations, OAuth scopes and more **automatically generated** based on a
GraphQL schemata.

[pds]: https://en.wikipedia.org/wiki/Personal_data_service
