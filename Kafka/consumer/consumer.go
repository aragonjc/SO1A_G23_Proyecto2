package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/Shopify/sarama"
	"github.com/go-redis/redis/v8"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Estructura de caso
type caso struct {
	Name        string `json:"name"`
	Location    string `json:"location"`
	Gender      string `json:"gender"`
	Age         int    `json:"age"`
	VaccineType string `json:"vaccine_type"`
}

var ctx = context.Background()

func main() {

	//************************************************************REDIS

	//Conexion a Redis
	rdb := redis.NewClient(&redis.Options{
		Addr: "35.238.119.39:6379",
		DB:   0, // default DB
	})

	//************************************************************Mongo
	clienteMongo := options.Client().ApplyURI(fmt.Sprintf("mongodb://35.222.44.47:27017/sopes1"))
	cliente, err := mongo.Connect(context.TODO(), clienteMongo)
	if err != nil {
		log.Println(err)
	}

	topic := "proyecto2"
	worker, err := connectConsumer([]string{"localhost:9092"})
	if err != nil {
		panic(err)
	}

	// Calling ConsumePartition. It will open one connection per broker
	// and share it for all partitions that live on it.
	consumer, err := worker.ConsumePartition(topic, 0, sarama.OffsetOldest)
	if err != nil {
		panic(err)
	}
	fmt.Println("Consumer started ")
	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)
	// Count how many message processed
	msgCount := 0

	// Get signal for finish
	doneCh := make(chan struct{})
	go func() {
		for {
			select {
			case err := <-consumer.Errors():
				fmt.Println(err)

			case msg := <-consumer.Messages():
				msgCount++

				//Insertar a Redis
				rdb.LPush(ctx, "casos", msg.Value)

				//Insertar a Mongo

				//Toma el json y lo deserealiza
				data := msg.Value
				info := caso{}

				err := json.Unmarshal(data, &info)
				if err != nil {
					fmt.Println("Error...")
					fmt.Println(err)
				}

				fmt.Println("Info")
				fmt.Println(info)

				collection := cliente.Database("sopes1").Collection("vacunados")
				insertResult, err := collection.InsertOne(context.TODO(), info)
				if err != nil {
					log.Fatal(err)
				}
				log.Println(insertResult)

			case <-sigchan:
				fmt.Println("Interrupt is detected")
				doneCh <- struct{}{}
			}
		}
	}()

	<-doneCh
	fmt.Println("Processed", msgCount, "messages")

	if err := worker.Close(); err != nil {
		panic(err)
	}

}

func connectConsumer(brokersUrl []string) (sarama.Consumer, error) {
	config := sarama.NewConfig()
	config.Consumer.Return.Errors = true

	// Create new consumer
	conn, err := sarama.NewConsumer(brokersUrl, config)
	if err != nil {
		return nil, err
	}

	return conn, nil
}
