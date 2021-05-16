package main

import (
	
	"fmt"
	"context"
	"time"
	"encoding/json"
	"log"
	
	"github.com/go-redis/redis/v8"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


type info struct {
	Name			string	`json: "name"`
	Location		string	`json: "location"`
	Gender			string	`json: "gender"`
	Age				int   	`json: "age"`
	Vaccine_type	string	`json: "vaccine_type"`
	Type 			string	`json: "Type"`
}

var ctx = context.Background()

func main() {
	
	// --> creacion de la conexion a redis 
	rdb := redis.NewClient(&redis.Options{
        Addr:     "35.238.119.39:6379",
        DB:       0,  // default DB
	})

    for {
		time.NewTicker(2 * time.Second)

		sub := rdb.PSubscribe(ctx,"prueba")

		msg, err := sub.ReceiveMessage(ctx)
		if err != nil {
			panic(err)
		}

		//fmt.Println(msg.Payload)
		
		//enviar a bases de datos
		var nuevo info
		datos := []byte(msg.Payload)
		err = json.Unmarshal(datos, &nuevo)
		
		//enviar datos a bd's
		//Redis
		rdb.LPush(ctx, "casos", msg.Payload)
		log.Println(nuevo)

		//Mongo
		clienteMongo := options.Client().ApplyURI(fmt.Sprintf("mongodb://35.222.44.47:27017/sopes1"))
		cliente, err := mongo.Connect(context.TODO(),clienteMongo)
		if err != nil {
			log.Println(err)
		}

		//insertar los datos en mongo
		collection := cliente.Database("sopes1").Collection("vacunados")
		insertResult, err := collection.InsertOne(context.TODO(), nuevo)
		if err != nil {
			log.Fatal(err)
		}
		log.Println(insertResult)
	}

}