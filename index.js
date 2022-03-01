// Message to show the user
let message;
// State of "life"
let isAlive;
// Array of cards
let cards;
// Total sum
let sum;
// Player name and bet
let player = {name:"", bet:0};

// Function to start the game from 0
function startGame() {
    isAlive = true;
    cards = [generateCard(), generateCard()];
    sum = (cards[0] + cards[1]);
    player = {name: "Static", bet:20};
    renderGame();
}

// Function to get a new card
function newCard() {
    if (!isAlive || sum === 21) return;
    let card = generateCard();
    sum += card;
    cards.push(card);
    renderGame();
}

// Function to render the game in the html
function renderGame() {
    if (isAlive) {
        document.querySelector("#player-el").textContent = player.name + ": $" + player.bet;
        // show the cards
        document.querySelector("#cards-el").textContent = "Cards: "
        for (let card of cards) {
            document.querySelector("#cards-el").textContent += " | " + card;
        }
        // Show the sum in the screen
        document.querySelector("#sum-el").textContent = "Sum: " + sum;
        // Verify if user is still alive and get the corresponding message
        result = verifyOutcome(sum);
        message = result.msg;
        isAlive = result.state;
    }
    // Show the message in the string
    document.querySelector("#message-el").textContent = message;
}

// Verify the output
function verifyOutcome(sum) {
    if (sum === 21 ) {
        return {msg:"You got blackjack", state:true};
    } else if (sum < 21){
        return {msg:"Do you want to draw new cards?", state:true};
    } else {
        isAlive = false;
        return {msg:"You've lost, you're out", state:false};
    }
}

// Generate a random card between 2 and 11 [aprox aces to 11]
function generateCard() {
    let card =  Math.floor(Math.random() * 13) + 1;
    if (card > 10) return 10;
    else if (card === 1) return 11;
    else return card;
}