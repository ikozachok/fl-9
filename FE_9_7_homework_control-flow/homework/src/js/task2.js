// Your code goes here
let userNumber = null;
let gameRound;
let userWinPrize = 0;
let defaultMaxPrize = 10;
let defaultMaxNumber = 5;
let maxPrize = defaultMaxPrize;
let currentPrize = maxPrize;
let randomNumber;
let maxRandomNumber = defaultMaxNumber;
let userWinned;
let userWanttoContinue = true;

if (confirm('Do you want to play a game?')) {
  while(userWanttoContinue) {
    randomNumber = Math.floor(Math.random() * maxRandomNumber);
    gameRound = 3;
    userWinned = false;
    for (let i=0; i < 3; i++) {
      userNumber = prompt(
        `Enter a number from 0 to ${maxRandomNumber}
        Attempts left: ${gameRound}
        Total prize: ${userWinPrize}$
        Possible prize on current attempt: ${currentPrize}$`
      );

      if (!userNumber) {
        break;
      }

      if (Number.parseFloat(userNumber) === randomNumber) {
        userWinned = true;
        userWinPrize += currentPrize;
        userWanttoContinue = confirm(`
          Congrftulation! Your current prize is ${userWinPrize}$.Do you want to continue?
        `);
        maxPrize *= 3;
        currentPrize = maxPrize;
        maxRandomNumber *= 2;
        break;
      }
      currentPrize = Math.floor(currentPrize / 2);
      gameRound--;
    }
    if (!userWinned) {
      userWanttoContinue = confirm(`Thank you for a game. Your prize is: ${userWinPrize}$. Do you want to play again?`);
      userWinPrize = 0;
      maxPrize = defaultMaxPrize;
      currentPrize = defaultMaxPrize;
      maxRandomNumber = defaultMaxNumber;
    }
    if (userWinned && !userWanttoContinue) {
      userWanttoContinue = confirm(`
		Thank you for a game. Your prize is: ${userWinPrize}$. Do you want to play again?
	  `);
    }
  }
} else {
  confirm(`'You did not become a millionaire, but can.`);
}
