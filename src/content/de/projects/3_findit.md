---
order: 3
name: FindIt – eine Microservice-Plattform zur Dokumentenverwaltung
anchor: documentmanagement
technologies:
  - Apache Kafka
  - Apache Tika
  - Event Sourcing
  - API Gateway
  - Docker
  - AWS
  - Elasticsearch
  - NodeJS
  - Java
  - PostgreSQL
  - MySQL
duration:
  start: Oktober 2017
  end: März 2018
---

Ich war Teil eines Teams, das eine Anwendung entworfen und umgesetzt hat, die auf einer Reihe von [**Microservices**](https://microservices.io/patterns/microservices.html) aufbaut.
Ziel war vor allem, einige der **Design Patterns** kennenzulernen — etwa [Database per Service](https://microservices.io/patterns/data/database-per-service.html), [Saga](https://microservices.io/patterns/data/saga.html)
und [Event Sourcing](https://microservices.io/patterns/data/event-sourcing.html). Für das **unveränderliche Log** setzten wir _Apache Kafka_ ein, kombiniert mit
verschiedenen Datenbanken als Data Sinks zum Lesen und Abfragen. Ein voll funktionsfähiges [API Gateway](https://microservices.io/patterns/apigateway.html) mit **Service
Discovery** haben wir mit Docker und docker-compose selbst gebaut. Jeder Microservice nutzte seine eigene Datenbanksicht, die aus den Events
im Log befüllt wurde. Für Metadatenextraktion und Filterung kamen _Apache Tika_ und _Elasticsearch_ zum Einsatz.
