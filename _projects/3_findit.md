---
name: FindIt - A Microservice Platform to Organize Documents
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
    start: October 2017
    end: March 2018
---
I was part of a team which designed and implemented an application that is backed up by a series of [**microservices**][microservice]. 
The project was mainly to get to know a few of the **design patterns** such as [database per service][dbps], [Saga][saga] 
and [Event Sourcing][eventsourcing]. For the **immutable log** we utilized *Apache Kafka*, paired with 
various databases that acted as data sinks for reading and querying the data. We implemented a fully functional [API gateway][apigateway] with **service
discovery** by hand using docker and docker-compose. Each microservice used his own database view that was filled using the events saved
in our immutable log store. For metadata extraction and filtering we used *Apache Tika* combined with *Elasticsearch*.

[microservice]: https://microservices.io/patterns/microservices.html
[saga]: https://microservices.io/patterns/data/saga.html
[dbps]: https://microservices.io/patterns/data/database-per-service.html
[eventsourcing]: https://microservices.io/patterns/data/event-sourcing.html
[apigateway]: https://microservices.io/patterns/apigateway.html