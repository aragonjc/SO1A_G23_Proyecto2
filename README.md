# Sistemas Operativos 1 Grupo 23
## Integrantes
|Carnet|Nombre|
|:-----|:-----|
|201403552|Juan Carlos Aragón Bámaca|
|201404006|Oscar Alejandro Rodríguez Calderón|
|201403546|Josué Carlos Pérez Montenegro|
|201403532|Ever Eduardo Chicas Prado|
---
## Descripcion
Se solicita construir un sistema genérico de arquitectura distribuida que muestre
estadísticas en tiempo real utilizando Kubernetes y service mesh como Linkerd y
otras tecnologías Cloud Native.

---
## Objetivos
- Comprender la teoría de la concurrencia y el paralelismo para desarrollar
sistemas distribuidos.
- Experimentar y probar con las tecnologías Cloud Native útiles para desarrollar
sistemas distribuidos modernos.
- Diseñar estrategias de sistemas distribuidos para mejorar la respuesta de alta
concurrencia.
- Monitorear procesos distribuidos utilizando tecnologías asociadas a la
observabilidad y la telemetría.
- Implementar contenedores y orquestadores en sistemas distribuidos.
- Medir la fidelidad y el desempeño en sistemas con alta disponibilidad.
- Implementar la Chaos Engineering.

---
## Arquitectura
![Architectura](https://github.com/aragonjc/SO1A_G23_Proyecto2/blob/develop/images/arquitectura.png)
---

## Primera parte (generador de tráfico con Locust)
```
[
{
"name": "Pablo Mendoza"
"location": "Guatemala City"
"gender": "male"
"age": 35
"vaccine_type": "Sputnik V"
}
]
```

## Segunda parte (Docker, Kubernetes y balanceadores de carga)

---
## Tercera parte (RPC, brokers y bases de datos NoSQL)

### gRPC

#### client
```
FROM golang
WORKDIR /
COPY . .
RUN go mod download
EXPOSE 3000
CMD ["go", "run", "client.go"]
```

#### server
```
FROM golang
WORKDIR /
COPY . .
RUN go mod download
EXPOSE 50051
CMD ["go", "run", "server.go"]
```

#### Docker Compose
```
version: "3.3"
services:
  grpcserver:
    build: ./server
    ports:
      - "50051:50051"
    networks:
      - grpcapp

  grpcclient:
    build: ./client
    ports:
      - "3000:3000"
    networks:
      - grpcapp

networks:
  grpcapp:
    driver: "bridge"
```

### redis pubsub

#### Pub
```
FROM golang
WORKDIR /
COPY . .

RUN go mod download

EXPOSE 3000

CMD ["go", "run", "publisher.go"]
```

#### Sub
```
FROM golang
WORKDIR /
COPY . .

RUN go mod download

CMD ["go", "run", "subscriber.go"]
```

---
## Cuarta parte (base de datos NoSQL)

### Mongo
```
version: "3.9"

services:
  mongodb:
    image: mongo
    container_name: mongodb
    environment:
      - PUID=1000
      - PGID=1000
    ports:
      - 27017:27017
    volumes:
      - db-data:/data/db

volumes:
  db-data:
    driver: local

```

### Redis
```
version: "3.9"
services:
 redisdb:
    image: redis
    container_name: redisdb
    command: redis-server
    ports:
     - "6379:6379"
    volumes:
     - ./redis-data:/var/lib/redis
     - ./redis.conf:/usr/local/etc/redis/redis.conf
    environment:
     - REDIS_REPLICATION_MODE=master
```

---
## Quinta parte (sitio web)

### Serverles
```
 const redis = require('redis');
 var groupBy = require('json-groupby')
```

### API

#### Dockerfile
```
FROM node:14

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "src/server.js" ]
```

#### server
```
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
```

### APP
![Home](https://github.com/aragonjc/SO1A_G23_Proyecto2/blob/develop/images/home.jpeg)
---
![Datos](https://github.com/aragonjc/SO1A_G23_Proyecto2/blob/develop/images/datos.jpeg)
---
![Top edades](https://github.com/aragonjc/SO1A_G23_Proyecto2/blob/develop/images/edades.jpeg)
---
![Genero](https://github.com/aragonjc/SO1A_G23_Proyecto2/blob/develop/images/genero.jpeg)
---
![Top paises](https://github.com/aragonjc/SO1A_G23_Proyecto2/blob/develop/images/top_pais.jpeg)
---
![Ultimos vacunados](https://github.com/aragonjc/SO1A_G23_Proyecto2/blob/develop/images/ultimos_vacunados.jpeg)
---
![Vacunados](https://github.com/aragonjc/SO1A_G23_Proyecto2/blob/develop/images/vacunados.jpeg)
---
