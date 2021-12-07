package entity

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCreditCard(t *testing.T) {
	creditCard, err := NewCreditCard("5123224720031001", "Jose da Silva", 12, 2024, 123)
	assert.Equal(t, "5123224720031001", creditCard.number)
	assert.Nil(t, err)
}

func TestCreditCardNumber(t *testing.T) {
	_, err := NewCreditCard("400000000000000000", "Jose da Silva", 12, 2024, 123)
	assert.Equal(t, "invalid credit card number", err.Error())
}

func TestCreditCardExpirationMonth(t *testing.T) {
	_, err1 := NewCreditCard("5123224720031001", "Jose da Silva", 13, 2024, 123)
	assert.Equal(t, "invalid expiration month", err1.Error())

	_, err2 := NewCreditCard("5123224720031001", "Jose da Silva", 0, 2024, 123)
	assert.Equal(t, "invalid expiration month", err2.Error())
}

func TestCreditCardExpirationYear(t *testing.T) {
	lastYear := time.Now().AddDate(-1, 0, 0)

	_, err1 := NewCreditCard("5123224720031001", "Jose da Silva", 12, lastYear.Year(), 123)
	assert.Equal(t, "invalid expiration year", err1.Error())
}
