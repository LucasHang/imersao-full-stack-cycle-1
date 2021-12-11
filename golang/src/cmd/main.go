package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/lucashang/imersao5-gateway/src/adapter/broker/kafka"
	"github.com/lucashang/imersao5-gateway/src/adapter/factory"
	"github.com/lucashang/imersao5-gateway/src/adapter/presenter/transaction"
	"github.com/lucashang/imersao5-gateway/src/usecase/process_transaction"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	fmt.Println("running main...")

	db, err := sql.Open("sqlite3", "test.db")
	if err != nil {
		log.Fatal(err)
	}

	repositoryFactory := factory.NewRepositoryDatabaseFactory(db)
	repository := repositoryFactory.CreateTransactionRepository()

	configMapProducer := &ckafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9092",
	}

	kafkaPresenter := transaction.NewTransactionKafkaPresenter()
	producer := kafka.NewKafkaProducer(configMapProducer, kafkaPresenter)

	var msgChan = make(chan *ckafka.Message)

	configMapConsumer := &ckafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9092",
		"client.id":         "goapp",
		"group.id":          "goapp",
	}

	topics := []string{"transactions"}

	consumer := kafka.NewConsumer(configMapConsumer, topics)

	go consumer.Consume(msgChan)

	usecase := process_transaction.NewProcessTransaction(repository, producer, "transactions_result")

	for msg := range msgChan {
		fmt.Println(msg.Value)
		var input process_transaction.TransactionDtoInput
		json.Unmarshal(msg.Value, &input)
		usecase.Execute(input)
	}
}
