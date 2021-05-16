package main

import (
	"fmt"
	"context"
	"log"
	"net/http"
	"io/ioutil"
	"encoding/json"
	"io"
	"strconv"
	
	"github.com/gorilla/mux"
	"github.com/go-redis/redis/v8"
)

type info struct {
	Name			string 
	Location		string 
	Gender			string
	Age				int   
	Vaccine_type	string
	Type 			string
}

var ctx = context.Background()

func redispub(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	var nuevo info
	err = json.Unmarshal(body, &nuevo)
	if err != nil { panic(err)}
	log.Println(nuevo)
	nuevo.Type = "Redis"
	rdb := redis.NewClient(&redis.Options{
        Addr:     "35.238.119.39:6379",
        DB:       0,  // default DB
	})

	var publicaicion = string("{\"name\":\""+nuevo.Name +"\"," +
							"\"location\":\""+nuevo.Location+"\"," +
							"\"gender\":\""+nuevo.Gender+"\"," +
							"\"age\":"+strconv.Itoa(nuevo.Age)+"," +
							"\"vaccine_type\":\""+nuevo.Vaccine_type+"\"," +
							"\"Type\":\""+nuevo.Type+"\"}")
							
	rdb.Publish(ctx, "prueba", string(publicaicion))

	io.WriteString(w,"true")
}

func main() {
	fmt.Println("se levanto el server")
	request()
}

func request() {
	myrouter := mux.NewRouter().StrictSlash(true)
	myrouter.HandleFunc("/redispub", redispub).Methods("POST")
	log.Fatal(http.ListenAndServe(":5001", myrouter))
}