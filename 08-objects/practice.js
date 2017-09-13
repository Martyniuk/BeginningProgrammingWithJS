// Write a function called isUser that accepts an object, and returns true if it is
// a valid user object, false otherwise. A valid user object will contain a
// property called `name` which is a string, and a property called `screen_name`
// which is also a string. It should contain no other properties.
//
//     isUser({ "name":"Semmy Purewal", "screen_name":"semmypurewal" });
//     //=> true
//
//     isUser({ "name":"Firstname Lastname", "screen_name":"user" });
//     //=> true
//
//     isUser("semmypurewal");
//     //=> false
//
//     isUser({ "age": 37, "name":"Semmy Purewal", "screen_name":"semmypurewal" });
//     //=> false
//
var isUser = function (obj) {
    return typeof obj === 'object' && Object.keys(obj).length === 2 && typeof obj.name === 'string' && typeof obj.screen_name === 'string';
};


// Often when working with HTML, we'll want to take data stored in an object and
// display it as an HTML `div` element. For example, suppose we have a person
// object which contains a name and a screen_name. We'd like to produce a `div`
// that contains an `h1` element with the name, and an `h2` element with
// screen_name. For example:
//
//     var user = { "name":"Semmy Purewal", "screen_name":"semmypurewal" };
//
//     userToDiv(user);
//     //=> "<div><h1>Semmy Purewal</h1><h2>semmypurewal</h2></div>"
//
// Write this function. It should throw an error if the user is not a valid
// user. It might be helpful to use some functions from previous sections.
//
function openTag(tag) {
    return `<${tag}>`;
}
function closingTag(tag) {
    return `</${tag}>`;
}
function toTagContent(tag, content) {
    return `${openTag(tag)}${content}${closingTag(tag)}`;
}


var userToDiv = function (object) {
    if (!isUser(object)) throw ('Is not valid User!');
    let nameToh1 = toTagContent('h1', object.name),
        screenNameToh2 = toTagContent('h2', object.screen_name),
        nameAndScreenName = nameToh1 + screenNameToh2;
    return toTagContent('div', nameAndScreenName);
};


// Now suppose we have a user object that contains a list of tweets. In HTML, we
// may want to represent that as a list element with a set of list items. That
// looks something like this:
//
//     <ul>
//       <li>this is a tweet.</li>
//       <li>this is another tweet.</li>
//     </ul>
//
// Write a function that converts a user object containing tweets into an HTML
// `div` element representing that user.
//
//     userWithTweetsToDiv({
//         "name": "Semmy Purewal",
//         "screen_name":"semmypurewal",
//         "tweets": [
//             "this is a tweet.",
//             "this is another tweet!"
//         ]
//     });
//     //=> "<div><h1>Semmy Purewal</h1><h2>semmypurewal</h2><ul><li>this is a tweet.</li><li>this is another tweet</li></ul></div>"
//
var userWithTweetsToDiv = function (object) {
    let nameToh1 = toTagContent('h1', object.name),
        screenNameToh2 = toTagContent('h2', object.screen_name),
        tweetsList = object.tweets.map(i => {
            return toTagContent('li', i);
        }).join(''),
        tweetsToUl = toTagContent('ul', tweetsList),
        objectToDiv = nameToh1 + screenNameToh2 + tweetsToUl;
    return toTagContent('div', objectToDiv);
};


// Write a function that accepts an array of strings, and returns an object that
// represents the number of times that each string appears in the array. This might
// sound confusing, but this is what we'd like to have happen.
//
//     frequencies([ "hello", "world", "hello", "goodbye", "hello", "world", "thing" ]);
//     //=> { "hello" : 3, "world" : 2, "goodbye": 1, "thing" : 1 }
//
//     frequencies([]);
//     //=> {}
//
//     frequencies([ "hello", "world" ]);
//     //=> { "hello" : 1, "world" : 1 }
//
// There are several ways you can do it, but it might be interesting to try it with
// the `reduce` method that starts with an empty object.
//
var frequencies = function (array) {
    let obj = {};
    for (var i = 0; i < array.length; i++) {
      if (obj[array[i]]) {
        obj[array[i]]++;
      } else {
        obj[array[i]] = 1;
      }
    }
    return obj;

    /*
    return array.reduce((obj, current) => {
        if (obj[current]) {
            obj[current]++;
        } else {
            obj[current] = 1;
        }
        return obj;
    }, {});
    */
};
