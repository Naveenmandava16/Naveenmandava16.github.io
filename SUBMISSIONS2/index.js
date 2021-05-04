document.querySelector(".close-popup").addEventListener("click", function (e) {
    document.querySelector(".popup").style.display = "none";
})
let popup = document.querySelector(".popup");
// declare global variables
var totalCardsFromDeck = 0;
var facePath = "";
var isfaceDown = false;
const SUITS = ["C", "D", "H", "S"];
const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

var playerHolder = {
    cards: [],
    score: 0,
};
var dealerHolder = {
    cards: [],
    score: 0
};


var Deck = {
    myDeckArray: [],
    StartArray: function () {
        var  st, rk;
        for (st = 0; st < SUITS.length; st += 1) {
            for (rk = 0; rk < RANKS.length; rk += 1) {
                this.myDeckArray[st * 13 + rk] = {
                    rank: RANKS[rk],
                    suit: SUITS[st],
                    path :"cards/"+RANKS[rk]+SUITS[st]+".png",
                };
            }
        }
    },
    ReShuffleDeck: function () {
        var holder, selectorNum;
        for (let i = 0; i < this.myDeckArray.length; i += 1) {
            selectorNum = Math.floor(Math.random() * this.myDeckArray.length);
            holder = this.myDeckArray[i];
            this.myDeckArray[i] = this.myDeckArray[selectorNum];
            this.myDeckArray[selectorNum] = holder;
        }
    }
};


function getCardsValueAtHand(handDeck) {
    var cardAtHandArray = [],
    currAceSuitCount = 0,
    cardAtHandArray = handDeck,
    TotalScore = 0,
    i = 0;
    for (i; i < cardAtHandArray.length; i += 1) {
        if (cardAtHandArray[i].rank === "J" ||
        cardAtHandArray[i].rank === "Q" ||
        cardAtHandArray[i].rank === "K") {
            TotalScore += 10;
        } else if (cardAtHandArray[i].rank === "A") {
            TotalScore += 11;
            currAceSuitCount += 1;
        } else {
            TotalScore += cardAtHandArray[i].rank;
        }
    }
    // if score is over 20 and card is ace .... reduce 10 from 11 ace
    while (currAceSuitCount > 0 && TotalScore > 21) {
        TotalScore -= 10;
        currAceSuitCount -= 1;
    }
    return TotalScore;
}


function RestartGame() {
    totalCardsFromDeck = 0;
    playerHolder.cards = [];
    dealerHolder.cards = [];
    playerHolder.score = 0;
    dealerHolder.score = 0;
    Deck.StartArray();
    Deck.ReShuffleDeck();
    document.getElementById("hit-btn").disabled = true;
    document.getElementById("stand-btn").disabled = true;
    document.getElementById("start-btn").disabled = false;
}


// logic for ending the game
function endBlackJackGame() {
    console.log("heeey " + isfaceDown)
    if(isfaceDown){
        // isfaceDown = false;
        let element = document.getElementById('faceDown');
        // console.log(element.getElementsByTagName("img")[0].src=null)
        element.getElementsByTagName("img")[0].src=facePath

    }
    if (playerHolder.score === 21) {
        // document.getElementById("Finalmessage").innerHTML =
        // "You win! "+`<br>`+"You got blackjack.";
        popup.style.display="block"
        popup.querySelector(".popup-content").innerHTML =
        "You win! "+`<br>`+"You got blackjack.";
        RestartGame();
    }
    if (playerHolder.score > 21) {
        // document.getElementById("Finalmessage").innerHTML =
        // "You Bust! (Over 21) "+`<br>`+"The Dealer Wins";
        popup.style.display="block"
        popup.querySelector(".popup-content").innerHTML =
        "You Bust! (Over 21) "+`<br>`+"The Dealer Wins";
        RestartGame();
    }
    if (dealerHolder.score === 21) {
        // document.getElementById("Finalmessage").innerHTML =
        // "You Lost!  "+`<br>`+"The Dealer Got Black Jack";
        popup.style.display="block"
        popup.querySelector(".popup-content").innerHTML =
        "You Lost!  "+`<br>`+"The Dealer Got Black Jack";
        RestartGame();
    }
    if (dealerHolder.score > 21) {
        // document.getElementById("Finalmessage").innerHTML =
        // "You Won!  "+`<br>`+"The Dealer Busted (Over 21)";
        popup.style.display="block"
        popup.querySelector(".popup-content").innerHTML =
        "You Won!  "+`<br>`+"The Dealer Busted (Over 21)";
        RestartGame();
    }
    if (dealerHolder.score >= 17 && playerHolder.score > dealerHolder.score && playerHolder.score < 21) {
        // document.getElementById("Finalmessage").innerHTML =
        // "You Won!  "+`<br>`+"You beat the dealer";
        popup.style.display="block"
        popup.querySelector(".popup-content").innerHTML =
        "You Won!  "+`<br>`+"You beat the dealer";
        RestartGame();
    }

    // over 17
    if (dealerHolder.score >= 17 && playerHolder.score < dealerHolder.score && dealerHolder.score < 21) {
        // document.getElementById("Finalmessage").innerHTML =
        // "You Lost!  "+`<br>`+"The Dealer had Higher Score";
        popup.style.display="block"
        popup.querySelector(".popup-content").innerHTML =
        "You Lost!  "+`<br>`+"The Dealer had Higher Score";
        RestartGame();
    }
    // push or Draw
    if (dealerHolder.score >= 17 && playerHolder.score === dealerHolder.score && dealerHolder.score < 21) {
        // document.getElementById("Finalmessage").innerHTML =
        // "You Draw (Push)! "+`<br>`+"The Dealer had same scores";
        popup.style.display="block"
        popup.querySelector(".popup-content").innerHTML =
        "You Draw (Push)! "+`<br>`+"The Dealer had same scores";
        RestartGame();
    }
}

function DrawCardByDealer() {
        dealerHolder.cards.push(Deck.myDeckArray[totalCardsFromDeck]);
        dealerHolder.score = getCardsValueAtHand(dealerHolder.cards);
        // added elemensts
        var dealerArray = dealerHolder.cards;
        dealerListItems = dealerArray.reduce((delearResult, item) => {
        console.log(totalCardsFromDeck);

        if(totalCardsFromDeck == 1){
            facePath = item.path;
            delearResult =
            `<li id="faceDown">
            <img   src = "cards/blue_back.png" />
            </li>`
         }

        delearResult +=
        `<li>
            <img src = "${item.path}" />
            </li>`;
            return delearResult;
        },'');
        dealerResultElement = document.getElementById('dealer-cards-holder');
        console.log(dealerResultElement.p)
        // Set the inner HTML
        dealerResultElement.innerHTML = dealerListItems;
         document.getElementById("dealer-score").innerHTML =
         "Dealer Score: " + dealerHolder.score;

         totalCardsFromDeck += 1;
}

function startNewGame() {
    document.getElementById("start-btn").disabled = true;
    document.getElementById("hit-btn").disabled = false;
    document.getElementById("stand-btn").disabled = false;
    document.getElementById("Finalmessage").innerHTML = "";
    getPlayerHit();
    DrawCardByDealer();
    getPlayerHit();
    endBlackJackGame();
}

function getPlayerHit() {

    playerHolder.cards.push(Deck.myDeckArray[totalCardsFromDeck]);
    playerHolder.score = getCardsValueAtHand(playerHolder.cards);
    // set elements for player
    var playerArray = playerHolder.cards;
    playerListItems = playerArray.reduce((playerResult, item) => {
    playerResult += `<li>
        <img src = "${item.path}" />
        </li>`;
        return playerResult;
        }, '');
    playerResultElement = document.getElementById('player-cards-holder');
    // Set the inner HTML
    playerResultElement.innerHTML = playerListItems;

    document.getElementById("player-score").innerHTML =
     "Player Score: " + playerHolder.score;
    totalCardsFromDeck += 1;
    if (totalCardsFromDeck >= 2) {
        endBlackJackGame();
    }
}

function HitStand() {
    while (dealerHolder.score < 17) {
        console.log(document.getElementById('faceDown'));
        let mainElem = document.getElementById("dealer-cards-holder")
        let element = document.getElementById('faceDown');
        // mainElem.removeChild(document.querySelector("#faceDown"));
        // mainElem.removeChild(element)
        // element.remove();
        DrawCardByDealer();
    }
    endBlackJackGame();
}


// create the decks and reshuffle them
Deck.StartArray();
Deck.ReShuffleDeck();
