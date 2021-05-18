package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"

	"github.com/go-redis/redis/v8"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

type casoJSON struct {
	Name        string `json:"name"`
	Location    string `json:"location"`
	Gender      string `json:"gender"`
	Age         int    `json:"age"`
	VaccineType string `json:"vaccine_type"`
	Type        string
}

//var ctx = context.Background()

const (
	port = ":50051"
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	//log.Printf("Received: %v", in.GetName())

	//************************************************************REDIS

	//Conexion a Redis
	rdb := redis.NewClient(&redis.Options{
		Addr: "35.238.119.39:6379",
		DB:   0, // default DB
	})

	rdb.LPush(ctx, "casos", in.GetName())

	//************************************************************MONGO
	//Toma el json y lo deserealiza
	data := in.GetName()
	info := casoJSON{}
	json.Unmarshal([]byte(data), &info)

	//Mongo
	clienteMongo := options.Client().ApplyURI(fmt.Sprintf("mongodb://35.222.44.47:27017/sopes1"))
	cliente, err := mongo.Connect(context.TODO(), clienteMongo)
	if err != nil {
		log.Println(err)
	}

	//insertar los datos en mongo
	collection := cliente.Database("sopes1").Collection("vacunados")
	insertResult, err := collection.InsertOne(context.TODO(), info)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(insertResult)

	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}

func main() {

	lis, err := net.Listen("tcp", port)

	if err != nil {
		log.Printf("Falló al escuchar: %v", err)
	}

	s := grpc.NewServer()

	pb.RegisterGreeterServer(s, &server{})

	fmt.Println(">> SERVER: El servidor está escuchando...")

	if err := s.Serve(lis); err != nil {
		log.Printf("Falló el servidor: %v", err)
	}
}
