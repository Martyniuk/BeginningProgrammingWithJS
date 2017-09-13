// We'll consider a password's strength to be "strong" if it is at least 10
// characters long. If it's between 7 and 10 characters long, we'll consider it to
// have "medium" strength, and if it's less than 7 characters, we'll say it is a
// "weak" password. Write a function that accepts as input a potential password and
// returns either "weak", "medium" or "strong" depending on its length.
//
//     passwordStrength("hello");
//     //=> weak
//
//     passwordStrength("longerpassword");
//     //=> strong
//
//     passwordStrength("helloone");
//     //=> medium
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




// A year is a leap year if it is divisible by 4, unless it is also divisible by
// 100 in which case it is not a leap year unless it is also divisible by
// 400. Phew. Got that? Good. Write a function that accepts a number and outputs
// true if the number is a leap year, false if not.
//
//      isLeapYear(1988);
//      //=> true
//
//      isLeapYear(2001);
//      //=> false
//
//      isLeapYear(1800);
//      //=> false
//
//      isLeapYear(2000);
//      //=> true
//
// It should also throw an error if the input is not a number.
//
//      isLeapYear("hello");
//      //=> THAT'S NOT A NUMBER!
// var isLeapYear = function (potentialLeapYear) {
//     if (typeof potentialLeapYear !== 'number') return 'THAT\'S NOT A NUMBER!';
//     return (potentialLeapYear % 4 === 0 && potentialLeapYear % 100 !== 0) && potentialLeapYear % 400 === 0;
// };

var isLeapYear = function (potentialLeapYear) {
    if (typeof potentialLeapYear !== 'number') {
        throw new Exception('THAT\'S NOT A NUMBER!');
    }

    if (potentialLeapYear % 4 === 0 && potentialLeapYear % 100 !== 0) {
        return true;
    } else {
        return potentialLeapYear % 400 === 0;
    }

    //&& potentialLeapYear % 400 === 0;
};


// Write a function that accepts three strings and input, and returns the one
// that would come earliest in the dictionary.
//
//      firstInDictionary("rhino", "aardvark", "zebra");
//      //=> aardvark
//
//      firstInDictionary("whale", "zebra", "yak");
//      //=> whale
//
//      firstInDictionary("whale", "zebra", "aardvark");
//      //=> aardvark
//
// It should throw an error string if any of the arguments are not strings.
//
//      firstInDictionary("whale", 5, 10);
//      //=> ALL THREE ARGS MUST BE STRINGS!
var firstInDictionary = function (a, b, c) {
    if (typeof a !== 'string' || typeof b !== 'string' || typeof c !== 'string') {
        throw new Error('ALL THREE ARGS MUST BE STRINGS!');
    }
    var arr = Array.from(arguments);
    return arr.sort()[0];
};


// Write a function that extracts a tag from a string representing an HTML
// element, but throws an error if the string is not an HTML element. You may reuse
// one of your functions from the previous section (or, better yet, see if you can
// remember how to re-write it).
//
//     getTagName("<p>this is a paragraph</p>");
//     //=> p
//
//     getTagName("<p>this is wrong</div>");
//     //=> Error: Not an HTML Element!
var getTagName = function (str) {
    let openTag = str.slice(str.indexOf('<') + 1, str.indexOf('>'));
    let closeTag = str.slice(str.lastIndexOf('</') + 2, str.lastIndexOf('>'));
    if (openTag !== closeTag) {
        throw new Error('Not an HTML Element!');
    } else {
        return openTag;
    }
};


// Re-implement our improveTweet function so it can generate any of lol, omg,
// lmao, and rofl.
var improveTweet = function (tweet) {
    const arr = ['lol', 'omg', 'lmao', 'rolf'];
    let randomIndex = Math.floor(Math.random() * arr.length);
    let result = tweet;

    if (result.indexOf(arr[randomIndex]) === -1 && result.indexOf(arr[randomIndex].toUpperCase()) === -1) {
        result = result + " " + arr[randomIndex];
    }
    return result;
};


// Write a function called `isQuestion` that returns true if the input is a
// string and it ends in a question mark. We'll use this function in the next
// practice problem.
var isQuestion = function (str) {
    return str.charAt(str.length - 1) === '?';
};


// The Magic 8 Ball is a classic toy that allows you to ask a yes/no
// question and it responds with a random answer. Most of the time (at least half)
// it responds with a "positive" answer, about a quarter of the time it responds
// with a "neutral" answer, and about a quarter of the time it responds with a
// "negative" answer. You can read more about the Magic 8 Ball toy (and see it's
// actual responses) on Wikipedia.
//
// Write a function that simulates the Magic 8 Ball by generating a random
// number. Try to make it match the probabilities of the real toy.
//
//     magic8Ball("Will people like this problem?");
//     //=> Very doubtful
//
//     magic8Ball("Do people like these videos?");
//     //=> My reply is no
//
//     // throw an error if there's no question mark at the end
//     // use your isQuestion function from the previous question
//     magic8Ball("you suck");
//     //=> THAT DOESN'T SOUND LIKE A QUESTION!
//
//     magic8Ball("Is this a question?");
//     //=> Signs point to yes
var magic8Ball = function (query) {
    if (!isQuestion(query)) {
        throw new Error("THAT DOESN'T SOUND LIKE A QUESTION!");
    }
    let answers = ['Signs point to yes', 'Signs point to yes', 'Very doubtful', 'My reply is no'],
        randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
};


// Suppose we wanted to randomly interject "-lol-" or "-omg-" into a random
// place in a string. For example:
//
//     randomInterject("this is a tweet");
//     //=> this is -omg- a tweet
//
// Notice that it may break into the middle of words as well.
//
//     randomInterject("hilarious, I'm having a great day");
//     //=> hil-lol-arious, I'm having a great day");
//
// This is a little tricky, so here are some tips. It may be helpful to break down
// this problem into two steps. First, you may want to write a function called
// interjection that accepts a number and two strings -- the interjection and the
// actual string.
//
//     interjectAt("interjection", 5, "hello world!");
//     //=> hello-interjection- world!
//
//     interjectAt("lol", 0, "this is a tweet");
//     //=> -lol-this is a tweet
//
//     interjectAt("omg", 15, "hello");
//     //=> the string doesn't have that many letters!
//
//     interjectAt(5, "omg", "hello");
//     //=> expected first arg to be a string, second arg to be a number and third arg to be a string
//
// You can interject by using two slices. For instance:
//
//     var str = "hello world!";
//     var beginning = str.slice(0,5);
//     var end = str.slice(5,str.length);
//     var strWithInterjection = beginning + "-lol-" + end;
//
// You just have to generalize this to an arbitrary index and wrap it in a function.
var interjectAt = function (interajection, index, string) {
    if (string.length < index) {
        throw ("the string doesn't have that many letters!");
    }
    if (typeof interajection !== 'string' || typeof index !== 'number' || typeof string !== 'string') {
        throw ("expected first arg to be a string, second arg to be a number and third arg to be a string");
    }
    let beginning = string.slice(0, index);
    let end = string.slice(index);
    return beginning + '-' +interajection + '-' + end;
};


// Now that you have a robust function to do your interjection, your actual
// `randomInterjection` function consists of generating a random message and a
// random location within the string, and then calling into the `interjectAt`
// function with the appropriate arguments.
var randomInterject = function (string) {
    if (typeof string !== 'string') throw ('input is not a string');
    let array = ['-lol-','-omg-'];
    let randInString = Math.floor(Math.random() * string.length);
    let randomInrjectionIndex = Math.floor(Math.round() * array.length); 
    return interjectAt(array[randomInrjectionIndex], randInString, string);
};







