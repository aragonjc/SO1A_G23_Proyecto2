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

## Estructura de proyecto
```
├── api
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── models
│       │   └── vaccine.js
│       ├── routes
│       │   └── routes.js
│       └── server.js
├── gRPC
│   ├── client
│   │   ├── client.go
│   │   ├── Dockerfile
│   │   ├── go.mod
│   │   └── go.sum
│   ├── docker-compose.yml
│   └── server
│       ├── Dockerfile
│       ├── go.mod
│       ├── go.sum
│       └── server.go
├── images
│   ├── arquitectura.png
│   ├── datos.jpeg
│   ├── edades.jpeg
│   ├── genero.jpeg
│   ├── home.jpeg
│   ├── top_pais.jpeg
│   ├── ultimos_vacunados.jpeg
│   └── vacunados.jpeg
├── locust.py
├── mongo
│   └── docker-compose.yml
├── react-app
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src
│       ├── AllVaccinatedByCountry.js
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── BarChart.js
│       ├── ByGender.js
│       ├── DataTable.js
│       ├── GraphVaccinated.js
│       ├── HamburgerMenu.js
│       ├── Home.js
│       ├── index.js
│       ├── IntermdianSearch.js
│       ├── logo.svg
│       ├── Mapa.js
│       ├── Menu.js
│       ├── PieGraph.js
│       ├── reportWebVitals.js
│       ├── resources
│       │   ├── img
│       │   │   ├── bottom-blur-circle.svg
│       │   │   └── top-blur-circle.svg
│       │   ├── js
│       │   │   └── SidebarData.js
│       │   └── styles
│       │       ├── barchart.css
│       │       ├── index.css
│       │       ├── Navbar.css
│       │       ├── search.css
│       │       └── showData.css
│       ├── SearchByCountry.js
│       ├── SearchGender.js
│       ├── setupTests.js
│       ├── ShowData.js
│       ├── ShowGraphBar.js
│       ├── ShowPeopleByCountry.js
│       └── TopVacunados.js
├── README.md
├── redis
│   └── docker-compose.yml
├── redis_pubsub
│   ├── Pub
│   │   ├── Dockerfile
│   │   ├── go.mod
│   │   ├── go.sum
│   │   └── publisher.go
│   └── Sub
│       ├── Dockerfile
│       ├── go.mod
│       ├── go.sum
│       └── subscriber.go
├── serverless
│   ├── package.json
│   ├── topCountries.js
│   └── vacunadosPais.js
└── traffic.json
```
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

### Kubernetes
```
kind: Ingress
apiVersion: extensions/v1beta1
metadata:
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/configuration-snippet: |
      proxy_set_header l5d-dst-override $service_name.$namespace.svc.cluster.local:$service_port;
      grpc_set_header l5d-dst-override $service_name.$namespace.svc.cluster.local:$service_port;
    ingress.kubernetes.io/rewrite-target: /
  name: redispub-ingress
  namespace: project
spec:
  rules:
    - host: redis.proyecto2-grupo23.cf
      http:
        paths:
          - backend:
              serviceName: redispub
              servicePort: 3000
---
apiVersion: split.smi-spec.io/v1alpha1
kind: TrafficSplit
metadata:
  name: function-split
  namespace: project
spec:
  service: dummy
  backends:
  - service: grpc
    weight: 500m
  - service: redispub
    weight: 500m
```

### Chaos mesh
```
kind: ServiceAccount
apiVersion: v1
metadata:
  namespace: project
  name: account-project-manager-tjcbm

---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: project
  name: role-project-manager-tjcbm
rules:
- apiGroups: [""]
  resources: ["pods", "namespaces"]
  verbs: ["get", "watch", "list"]
- apiGroups:
  - chaos-mesh.org
  resources: [ "*" ]
  verbs: ["get", "list", "watch", "create", "delete", "patch", "update"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: bind-project-manager-tjcbm
  namespace: project
subjects:
- kind: ServiceAccount
  name: account-project-manager-tjcbm
  namespace: project
roleRef:
  kind: Role
  name: role-project-manager-tjcbm
  apiGroup: rbac.authorization.k8s.io
```

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

### Kafka

#### Consumer
```
FROM golang
WORKDIR /
COPY . .
RUN go mod download
EXPOSE 9092
CMD ["go", "run", "consumer.go"]
```

#### Producer
```
FROM golang
WORKDIR /
COPY . .
RUN go mod download
EXPOSE 3000
CMD ["go", "run", "producer.go"]
```

#### Docker compose
```
version: "3.3"
services:
  kafkaserver:
    build: ./consumer
    ports:
      - "9092:9092"
    networks:
      - kafka-app

  kafkaclient:
    build: ./producer
    ports:
      - "3000:3000"
    networks:
      - kafka-app

networks:
  kafka-app:
    driver: "bridge"
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

### Preguntas
![Preguntas]()
---