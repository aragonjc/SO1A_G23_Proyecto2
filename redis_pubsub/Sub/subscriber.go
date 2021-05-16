package main

import (
	
	"fmt"
	"context"
	"time"
	"encoding/json"
	"log"
	
	"github.com/go-redis/redis/v8"
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

		fmt.Println(msg.Payload)
		
		//enviar a bases de datos
		var nuevo info
		datos := []byte(msg.Payload)
		err = json.Unmarshal(datos, &nuevo)
		//
		//Redis
		rdb.LPush(ctx, "casos", msg.Payload)
		log.Println(nuevo)
	}

}