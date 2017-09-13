// your notes here!
console.log("hello world!");


var isNumber = function (potentialNumber) {
    return typeof potentialNumber === 'number';
};

var isPositiveNumber = function (number) {
    return isNumber(number) && number > 0;
};

var isYear = function (potentialYear) {
    return isPositiveNumber(potentialYear) && potentialYear <= 9999;
};

var isTweet = function (potentialTweet) {
    return potentialTweet.length <= 140;
};

var isTweetWithLol = function(potentialTweet) {
    return isTweet(potentialTweet) && potentialTweet.indexOf('lol');
}

var passwordStrength = function (password) {
    let passwordLength = password.length;
    let result = '';
    switch (true) {
        case (passwordLength < 7):
            result = 'weak';
            break;
        case (passwordLength >= 7 && passwordLength < 10):
            result = 'medium';
            break;
        case (passwordLength >= 10):
            result = 'strong';
            break;
    }
    return result;
};
