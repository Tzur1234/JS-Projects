// Game values

let min = 1,
  max = 10,
  winningNum,
  guessLeft = 3;

// generate a winningNum
generateNum();

// UI Elements

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-input"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector("#message");

// set the value of min \ max nummber
minNum.textContent = min;
maxNum.textContent = max;

// Add event listener to guessBtn
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Add event listener
guessBtn.addEventListener("click", function (e) {
  // convert the result to number
  let guess = parseInt(guessInput.value);

  // Validate if the input correct (number 1-10)

  if (isNaN(guess) || guess < min || guess > max) {
    sendMsg(`Must to write a number between ${min} - ${max}`, "red");
  }
  // If won
  else if (guess === winningNum) {
    // disable new number
    guessInput.disabled = true;
    sendMsg(`You won ! the number is ${winningNum}`, "green");

    // Play again ?
    guessBtn.value = "PLAY AGAIN";
    guessBtn.className += "play-again";
  } else {
    // One less guess
    guessLeft -= 1;

    // Send a message
    sendMsg(`${guess} is wrong | guessLeft: ${guessLeft}`, "red");

    // Clean input
    guessInput.value = "";
    console.log(`guessLeft: ${guessLeft}`);

    if (guessLeft === 0) {
      sendMsg(
        `Game over, the correct number was ${winningNum}`,
        "red"
      );

      
      guessInput.disabled = true;
      // Play again ?
      guessBtn.value = "PLAY AGAIN";
      guessBtn.className += "play-again";
    }
  }

  e.preventDefault();
});

// send a message inside message Element
function sendMsg(msg, color) {
  message.style.color = color;

  message.textContent = msg;
}

function generateNum() {
  winningNum = Math.round(Math.random() * 9) + 1;
  console.log(`the winning number for this game ${winningNum}`);
}
