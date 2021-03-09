//Course: NSCC_PROG2700
//Name: Yi-Hsien(Michaelson) Hsin
//Student Number: W0412307
// REQ-001	RETRIEVE AND PERSIST A DECK OF CARDS FROM THE API (10 PTS)
// REQ-002	REQUEST FIVE CARDS FROM THE DECK (10 PTS)
// REQ-003	DISPLAY THE HAND IN A WEB PAGE (10 PTS)
// REQ-004	WRITE A FUNCTION THAT WILL DETERMINE THE HIGHEST POKER HAND FOR THE DISPLAYED CARDS (10 PTS)
// REQ-005	WRAP THE ENTIRE APPLICATION IN AN INDEPENDENTLY INVOKED FUNCTION EXPRESSION (IIFE) (OR EQUIVALENT) (5 PTS)

var fetchApi = (function(){  
    var result, highCard, style;
    var arr_value = [];
    var spades = 0, hearts = 0, clubs = 0, diamonds = 0;
    // fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=5')
    // fetch('https://www.mikecaines.com/cards/royalflush.json')
    // fetch('https://www.mikecaines.com/cards/straightflush.json')
    // fetch('https://www.mikecaines.com/cards/fourofakind.json')
    // fetch('https://www.mikecaines.com/cards/fullhouse.json')
    // fetch('https://www.mikecaines.com/cards/flush.json')
    // fetch('https://www.mikecaines.com/cards/highstraight.json')
    // fetch('https://www.mikecaines.com/cards/lowstraight.json')
    // fetch('https://www.mikecaines.com/cards/threeofakind.json') 
    // fetch('https://www.mikecaines.com/cards/twopair.json')
    // fetch('https://www.mikecaines.com/cards/pair.json')
    // fetch('https://www.mikecaines.com/cards/acehigh.json')
        .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        document.getElementById("deck").innerHTML
        +="<strong>" + " id: " + "</strong>" +  myJson.deck_id//b81cq6w05yke"
        +"<strong>" + " remianing: " + "</strong>" +  myJson.remaining + "<br/>"
        myJson.cards.forEach(function(element){
            var value = ToNumber(element.value);
            arr_value.push(value);
            arr_value.sort(function(a, b){return a-b});
            var counter = value_count(arr_value).sort(function(a, b){return a-b});
        
            element.suit === "SPADES" ? spades++ : 
            element.suit === "HEARTS" ? hearts++ :
            element.suit ===  "CLUBS" ? clubs++ :
            diamonds++;
            
            (spades === 5 || hearts === 5 || clubs === 5 || diamonds === 5) 
            && arr_value.reduce(getSum, 0) === 60 ? 
            (result = "Royal flush", setTimeout(function(){ alert("Congrats"); }, 2000) ) :
            (spades === 5 || hearts === 5 || clubs === 5 || diamonds === 5)
            && straight(arr_value) === 5 && arr_value[4] === 14 && arr_value[0] === 10 ?
            result = "High Stright flush" :
            (spades === 5 || hearts === 5 || clubs === 5 || diamonds === 5)
            && straight(arr_value) === 5 && arr_value[4] === 14 && arr_value[0] === 2 ?
            result = "Low Stright flush" :
            (spades === 5 || hearts === 5 || clubs === 5 || diamonds === 5)
            && straight(arr_value) === 5 ?
            result = "Stright flush" :
            counter[1] === 4 ?
            result = "Four of a kind" :
            (counter[0] === 2 && counter[1] === 3) ?
            result = "Full House" :
            spades === 5 || hearts === 5 || clubs === 5 || diamonds === 5 ?
            result = "Flush" :
            straight(arr_value) === 5 && arr_value[4] === 14 && arr_value[0] === 10 ?
            result = "High Straight" :
            straight(arr_value) === 5 && arr_value[4] === 14 && arr_value[0] === 2 ?
            result = "Low Straight" :
            straight(arr_value) === 5 ?
            result = "Straight" :
            counter[2] === 3 ?
            result = "Three of a kind" : 
            counter.filter(x => x === 2).length == 2 ?
            result = "Two Pairs" : 
            counter[3] === 2 ?
            result = "One Pair" :
            (highCard = ToCards(arr_value.reduce(function(a, b) {return Math.max(a, b);})),
            result = "High Cards: " + highCard);
            document.getElementById("cardsimg").innerHTML
            += '&nbsp;' + '<img src='+element.image+'>' + '&nbsp;';
            document.getElementById("cardValue").innerHTML = result;

        });
    });
});

function ToNumber(value) {
    return value === "ACE" ? 14//If value is ACE, return 14
    : value === "JACK" ? 11
    : value === "QUEEN" ? 12
    : value === "KING" ? 13
    : parseInt(value);//Default value, retrun 2-10 as Int
}

function ToCards(value) {
    return value === 14 ? "A" //If value is ACE, return 14
    : value === 11 ? "J"
    : value === 12 ? "Q"
    : value === 13 ? "K"
    : value.toString(10); //Default value, retrun 2-10 as Int
}

function getSum(a, b) {
    return a + b;
  };

function straight(myArray) {
    var counter = 1;
    for (var i = 0; i < myArray.length; i++) {
        myArray[i+1] - myArray[i] === 1 ? counter++ : null;
    };
    return counter;
};

function value_count(arr) {
    let countObj = {}
    for(let x of arr){
        countObj[x] = (countObj[x] || 0) + 1;
    }
    return Object.values(countObj);
}
fetchApi();

// Reference: 
// https://deckofcardsapi.com/
// https://www.cardplayer.com/rules-of-poker/hand-rankings
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
// https://codeburst.io/how-to-count-poperty-values-in-an-array-including-unique-property-values-74d46cbf2921
// https://stackoverflow.com/questions/59510349/how-to-recognise-full-house-and-two-pair-in-a-javascript-poker-game