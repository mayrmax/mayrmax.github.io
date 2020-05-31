---
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
The project uses a *Neo4J* as storage backend for the data, which allows it to store all kinds of relations between different
data nodes. Applications can **discover** what kind of data the server offers via *OpenID*, and the owner can manage permissions via *OAuth2*.
Selfbox is also a *OAuth2* provider, completely cutting the need for any third party service like *Facebook* and *Google*. The data gets offered
via *GraphQL* to the various clients. Furthermore, are all queries, mutations, OAuth scopes and more **automatically generated** based on a 
GraphQL schemata. 

[pds]: https://en.wikipedia.org/wiki/Personal_data_service