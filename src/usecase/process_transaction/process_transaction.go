package process_transaction

import (
	"github.com/lucashang/imersao5-gateway/src/domain/entity"
	"github.com/lucashang/imersao5-gateway/src/domain/repository"
)

type ProcessTransaction struct {
	Repository repository.TransactionRepository
}

func NewProcessTransaction(repository repository.TransactionRepository) *ProcessTransaction {
	return &ProcessTransaction{Repository: repository}
}

func (p *ProcessTransaction) Execute(input TransactionDtoInput) (TransactionDtoOutput, error) {
	transaction := entity.NewTransaction()
	transaction.ID = input.ID
	transaction.AccountID = input.AccountID
	transaction.Amount = input.Amount

	cc, invalidCC := entity.NewCreditCard(
		input.CreditCardNumber,
		input.CreditCardName,
		input.CreditCardExpirationMonth,
		input.CreditCardExpirationYear,
		input.CreditCardCVV,
	)

	if invalidCC != nil {
		return p.rejectTransaction(transaction, invalidCC)
	}

	transaction.SetCreditCard(*cc)

	invalidTransaction := transaction.IsValid()

	if invalidTransaction != nil {
		return p.rejectTransaction(transaction, invalidTransaction)
	}

	return p.approveTransaction(transaction)
}

func (p *ProcessTransaction) approveTransaction(transaction *entity.Transaction) (TransactionDtoOutput, error) {
	err := p.Repository.Insert(
		transaction.ID,
		transaction.AccountID,
		transaction.Amount,
		entity.APPROVED,
		"",
	)

	if err != nil {
		return TransactionDtoOutput{}, err
	}

	output := TransactionDtoOutput{
		ID:           transaction.ID,
		Status:       entity.APPROVED,
		ErrorMessage: "",
	}

	return output, nil
}

func (p *ProcessTransaction) rejectTransaction(transaction *entity.Transaction, transactionErr error) (TransactionDtoOutput, error) {
	err := p.Repository.Insert(
		transaction.ID,
		transaction.AccountID,
		transaction.Amount,
		entity.REJECTED,
		transactionErr.Error(),
	)

	if err != nil {
		return TransactionDtoOutput{}, err
	}

	output := TransactionDtoOutput{
		ID:           transaction.ID,
		Status:       entity.REJECTED,
		ErrorMessage: transactionErr.Error(),
	}

	return output, nil
}