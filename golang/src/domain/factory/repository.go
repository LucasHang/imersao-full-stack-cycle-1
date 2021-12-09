package factory

import "github.com/lucashang/imersao5-gateway/src/domain/repository"

type RepositoryFactory interface {
	CreateTransactionRepository() repository.TransactionRepository
}
