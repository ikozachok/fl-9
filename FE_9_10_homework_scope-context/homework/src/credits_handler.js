function userCard(key) {
  const card = {
    key: key,
    balance: 100,
    transactionLimit: 100,
    historyLogs: []
  }

  function getCardOptions() {

    return this.card;
  }

  function putCredits(balance) {
    this.log('Received credits');
    this.card.balance += balance;
  }

  function takeCredits(balance) {
    const minBalance = 0;
    const newBalance = this.card.balance - balance;
    if (newBalance < minBalance) {
      console.log('You can not take credits from the card!');
    } else {
      this.log('Withdrawall of credits');
      this.card.balance -= balance;
    }
  }

  function setTransactionLimit(limit) {
    this.log('Transaction limit change');
    this.card.transactionLimit = limit;
  }

  function transferCredits(amount, recipientCard) {
    const minBalance = 0;
    const comision = 0.995;
    let amountWithComision = amount * comision;
    const newBalance = this.card.balance - amountWithComision;

    if (newBalance < minBalance || newBalance > this.card.transactionLimit) {
      console.log('You can not take credits from the card!');
    } else {
      this.log('Withdrawall of credits');
      this.card.balance -= amountWithComision;
      recipientCard.putCredits(amountWithComision);
    }
  }

  function log(type) {
    function date() {
      const now = new Date();
      const day = now.getDate();
      let month = now.getMonth();
      const year = now.getFullYear();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ten = 10;
      if (month < ten) {
        month = '0' + month;
      }

      return `${day}/${month}/${year}, ${hour}:${minutes}:${seconds}`;
    }
    let types = ['Received credits', 'Withdrawall of credits', 'Transaction limit change'];
    this.card.historyLogs.push(
      {
        type: type,
        credits: this.card.balance,
        operationTime: date()
      }
    );
  }

  return {
    card: card,
    getCardOptions: getCardOptions,
    putCredits: putCredits,
    takeCredits: takeCredits,
    setTransactionLimit: setTransactionLimit,
    transferCredits: transferCredits,
    log: log
  }
}

function UserAccount() {
  const maxCard = 3;
  this.cards = [];

  this.addCard = function () {
    const cardsQuentity = this.cards.length;
    if (cardsQuentity < maxCard) {
      const newCard = userCard(cardsQuentity);
      this.cards.push(newCard);
    }
  }

  this.getCardByKey = function (key) {

    return this.cards.find(function(el) {

      return el.card.key === key
    });
  }

  return this;
}