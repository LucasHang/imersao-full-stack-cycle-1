package factory

import (
	"database/sql"

	adapterRepo "github.com/lucashang/imersao5-gateway/src/adapter/repository"
	domainRepo "github.com/lucashang/imersao5-gateway/src/domain/repository"
)

type RepositoryDatabaseFactory struct {
	DB *sql.DB
}

func NewRepositoryDatabaseFactory(db *sql.DB) *RepositoryDatabaseFactory {
	return &RepositoryDatabaseFactory{DB: db}
}

func (r RepositoryDatabaseFactory) CreateTransactionRepository() domainRepo.TransactionRepository {
	return adapterRepo.NewTransactionRepositoryDb(r.DB)
}
