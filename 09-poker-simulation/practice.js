var suits = ["clubs", "diamonds", "hearts", "spades"];
var ranks = ["two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "jack", "queen", "king", "ace"];

// return true if the input is a suit, false otherwise.
var isSuit = function (input) {
    return suits.indexOf(input) != -1;
};

// return true if the input is a rank, false otherwise.
var isRank = function (input) {
    return ranks.indexOf(input) != -1;
};

// return true if the input is a card object, false otherwise.
var isCard = function (input) {
    return typeof input === 'object'
        && Object.keys(input).length === 2
        && typeof input.rank !== 'undefined'
        && typeof input.suit !== 'undefined'
        && isRank(input.rank)
        && isSuit(input.suit);
};

// return true if the input is a deck of cards (an array of 52 cards
// with no duplicates)
var isDeck = function (input) {
    if (!(input instanceof Array)) return false;
    let unique = [...new Set(input.map(i => i))];
    return unique.length === 52;
};

// construct a deck of 52 cards that will pass the isDeck method
var createDeck = function () {
    let deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            deck.push({ suit: suits[i], rank: ranks[j] });
        }
    }

    return deck;
};

// fisher-yates shuffle
var shuffle = function (deck) {
    for (let i = deck.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * i);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
};

// return true if the input is an array of 5 valid cards
var isHand = function (hand) {
    if (!(hand instanceof Array)) return false;

    return hand.reduce((res, i) => {
        res = isCard(i);
        return res;
    }, false);
};

// This function should return the first five cards from a shuffled
// deck.
var dealHand = function () {
    let deck = createDeck();
    shuffle(deck);
    let result = [];
    for (let i = 0; i < 5; i++) {
        result.push(deck[i]);
    }
    return result;
};

// This function should accept two card objects, and return true if
// the first card is higher than the second one. The ordering is based
// on the rank first. If the rank of the first card is bigger than the
// rank of the second, the first is always bigger. If the rank is the
// same, then the suit is the tie breaker in this order: clubs,
// diamonds, hearts, spades. In this case, clubs is the lowest suit,
// and spades is the highest. If they are the same rank and suit then
// this function should return false since they are equal.
var rankHighest = function (a, b) {
    if (ranks.indexOf(a.rank) > ranks.indexOf(b.rank)) {
        return true;
    } else if (ranks.indexOf(a.rank) < ranks.indexOf(b.rank)) {
        return false;
    } else {
        return suitHighest(a, b);
    }
}
var suitHighest = function (a, b) {
    if (suits.indexOf(a.suit) > suits.indexOf(b.suit)) {
        return true;
    } else {
        return false;
    }
}

var isHigherThan = function (a, b) {
    if (!(isCard(a) && isCard(b))) return false;
    return rankHighest(a, b);
};

// This function is similar (though not the opposite) of the isHigher
// function.
function rankLowest(a, b) {
    if (ranks.indexOf(a.rank) < ranks.indexOf(b.rank)) {
        return true;
    } else if (ranks.indexOf(a.rank) > ranks.indexOf(b.rank)) {
        return false;
    } else {
        return suitLowest(a, b);
    }
}
function suitLowest(a, b) {
    if (suits.indexOf(a.suit) < suits.indexOf(b.suit)) {
        return true;
    } else {
        return false;
    }
}
var isLowerThan = function (a, b) {
    if (!(isCard(a) && isCard(b))) return false;
    return rankLowest(a, b);
};

// Use the isHigher function to find the highest card in an array
// of cards
var highCard = function (array) {
    if (array.length === 0) return array;
    return array.reduce((res, i) => {

        if (isHigherThan(i, res)) {
            return i;
        } else {
            return res;
        }
    });
};

// Use the isLower function to find the lowest card in an array
// of cards
var lowCard = function (array) {
    if (array.length === 0) return array;
    return array.reduce((res, i) => {
        if (isLowerThan(res, i)) {
            return res;
        } else {
            return i;
        }
    });
};

// Returns true if the hand contains a pair. Remember -- it returns
// true if the hand *contains* a pair, so if you send in two-pair or
// three-of-a-kind it should still return true. We'll account for that
// later.
var containsPair = function (hand) {
    // hand == array of 5 Cards
    if (hand.length !== 5) return false;
    let isPair = false;
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (JSON.stringify(hand[i].rank) == JSON.stringify(hand[j].rank)) {
                isPair = true;
            }
        }
    }
    return isPair;

    /* var counts = countRanks(hand);

    return Object.keys(counts).map(function (rank) {
        return counts[rank];
    }).some(function (count) {
        return count >= 2;
    }); 
    
    */
};


// Returns true if the hand contains two-pair
var containsTwoPair = function (hand) {
    if (hand.length !== 5) return false;
    let counter = 0;
    for (let i = 0; i < hand.length; i++) {
        for (let j = i + 1; j < hand.length; j++) {
            if (JSON.stringify(hand[i].rank) == JSON.stringify(hand[j].rank)) {
                counter++;
            }
        }
    }
    return counter === 2;
};

// Returns true if the hand contains three-of-a-kind
var containsThreeOfAKind = function (hand) {
    let resObj = {},
        result = false;
    for (let i = 0; i < hand.length; i++) {
        if (resObj[hand[i].rank]) {
            resObj[hand[i].rank]++;
        } else {
            resObj[hand[i].rank] = 1;
        }
    }
    //console.log(`res obj --> ${JSON.stringify(resObj)}`);
    for (let key in resObj) {
        if (resObj[key] === 3) {
            result = true;
        } else {
            console.log(`obj-- ${JSON.stringify(resObj)} with Key -- ${key} has value --> ${resObj[key]}!`);
        }
    }
    return result ? result : false;
};

// Returns true if the hand contains any kind of straight, including
// one where the ace is low
var containsStraight = function (hand) {

    var nonAces = hand.filter(function (card) {
        return card.rank !== "ace";
    });

    var result = false;

    // first case
    if (!containsPair(hand) && ranks.indexOf(highCard(hand).rank) - ranks.indexOf(lowCard(hand).rank) === 4) {
        result = true;
    } else if (nonAces.length === 4 && !containsPair(nonAces) && highCard(nonAces).rank === "five" && lowCard(nonAces).rank === "two") {
        result = true;
    }

    return result;

    // below dont works with ace example
    //
    /* hand.forEach(i => {
        if (!isCard(i)) return `hand is not a "hand"`;
    });
    if (ranks.indexOf(highCard(hand)) === ranks[ranks.length - 1]) {
        //ace
    }
    let lowest = lowCard(hand); // two
    let lowestIndex = ranks.indexOf(lowest.rank); // index
    let arrayOfIndexes = hand.map(i => {
        return ranks.indexOf(i.rank);
    });
    let sorted = arrayOfIndexes.sort((a,b) => {return a - b});
    return lowestIndex + 4 === sorted[sorted.length - 1]; */
};

// Returns true if the hand contains a flush
var containsFlush = function (hand) {
    return hand
        .map(i => {
            return i.suit;
        })
        .filter(i => {
            return i === hand[0].suit;
        })
        .length === 5;

    /* 
    return hand.map(function (card) {
        return card.suit;
    }).every(function (suit) {
        return suit === hand[0].suit;
    });
    */
};

// Returns true if the hand contains a full house
var containsFullHouse = function (hand) {
    let resObj = {};
    hand.forEach(i => {
        if (resObj[i.rank]) {
            resObj[i.rank]++;
        } else {
            resObj[i.rank] = 1;
        }
    });
    return Object.keys(resObj).length === 2 &&
        Object.values(resObj).reduce(i => i >= 2);
};

// Returns true if the hand contains four-of-a-kind
var containsFourOfAKind = function (hand) {
    let result = hand
        .map(i => {
            return i.rank;
        })
        .reduce((res, rank) => {
            res[rank] = typeof res[rank] === 'undefined' ? 1 : res[rank] += 1;
            return res;
        }, {});
    return Object.values(result)[0] === 4 || Object.values(result)[1] === 4;
};

// Returns true if the hand contains a straight-flush
var containsStraightFlush = function (hand) {
    return containsFlush(hand) && containsStraight(hand);
};

// Returns true if the hand contains a royal-flush
var containsRoyalFlush = function (hand) {
    return containsFlush(hand) && containsStraight(hand) && hand[hand.length - 1].rank === 'ace';
};

// Returns a string representing the highest rank a hand has. For
// example, if you send in a full-house, it will contain a pair and a
// three-of-a-kind as well, but a full-house is the highest rank
var highestRank = function (hand) {
    let result = '';
    if (containsRoyalFlush(hand)) {
        result = 'Royal Flush';
    } else if (containsStraightFlush(hand)) {
        rresult = 'Straight Flush';
    } else if (containsFourOfAKind(hand)) {
        result = 'Four Of A Kind';
    } else if (containsFullHouse(hand)) {
        result = 'Full House';
    } else if (containsFlush(hand)) {
        result = 'Flush';
    } else if (containsStraight(hand)) {
        result = 'Straight';
    } else if (containsThreeOfAKind(hand)) {
        result = 'Three Of A Kind';
    } else if (containsTwoPair(hand)) {
        result = 'Two Pair';
    } else if (containsPair(hand)) {
        result = 'Pair';
    } else {
        result = 'bust';
    }
    return result.toLowerCase();
};