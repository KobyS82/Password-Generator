// Add main password string
var mainString = [];

var passLength = 0;
var specChar = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '_', '-', '+', '=', '`', '|', '(', ')', '{', '}', ':', ';', '<', '>', '.', '?', '/'];
var upCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Checks if user wants a specific character set
var yesSpec = 0;
var yesUp = 0;
var yesLow = 0;
var yesNum = 0;

//stores password length for rerunning password length
var tempL = 0;

//  Prompts user for password characters and checks to see if response is valid
function passCriteria() {
  // Prompts user for length
  var userLength = parseInt(prompt("How many characters?"),10);
  if (Number.isNaN(userLength)){
    alert ('Has to be a number within 8-128');
    passCriteria()
     return null;
  }
  if (userLength < 8 || userLength > 128) {
    alert ('Must be atleast 8 and lest than 128 characters.')
    passCriteria()
    // return null;
  } 
  passLength = userLength;
  tempL = userLength;
  
  // Propts user for special characters
  var userSpecChar = prompt("Type 'yes' if you would like special characters. Otherwise remain blank and click OK.");
  if (userSpecChar !== '') {
    yesSpec = 1;
  }

  // Prompt user for upper case letters
  var userUpCase = prompt("Type 'yes' if you would like upper case characters. Otherwise remain blank and click OK.");
  if (userUpCase !== '') {
    yesUp = 1;
  }

  // Prompt user for upper case letters
  var userLowCase = prompt("Type 'yes' if you would like lower case characters. Otherwise remain blank and click OK.");
  if (userLowCase !== '') {
    yesLow = 1;
  }

  // Prompts user for numbers
  var userNumbers = prompt("Type 'yes' if you would like numbers in your password. Otherwise remain blank and click OK.");
  if (userNumbers !== '') {
    yesNum = 1;
  }

  // Checks to see if user said yes to anything
  if (yesSpec + yesUp + yesLow + yesNum === 0) {
    alert ("You must have characters for your password");
    passCriteria();
  }
}
passCriteria();


// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  mainString = [];
  finalPassword = [];
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

//Chooses a character and returns it to generatePassword
function whichChar(){
  // Chooses between the 3 criteria
  var randomChar = Math.floor(1 + Math.random() * 4);

  // Grabs a special character if randomChar chooses it and if the user chooses it
  if (randomChar === 1 && yesSpec === 1) {
    var specRandom = Math.floor(Math.random() * specChar.length);
    console.log("SPECIAL CHARACTER:" + specChar[specRandom]);
    return specChar[specRandom];
  }

  // Grabs a upper case character if randomChar chooses it and if the user chooses it
  else if (randomChar === 2 && yesUp === 1) {
    var upRandom = Math.floor(Math.random() * upCase.length);
    console.log("UPPER CASE LETTER:" + upCase[upRandom]);
    return upCase[upRandom];
  }
  
  // Grabs a lower case character if randomChar chooses it and if the user chooses it
  else if (randomChar === 3 && yesLow === 1) {
    var lowRandom = Math.floor(Math.random() * lowCase.length);
    console.log("LOWER CASE LETTER:" + lowCase[lowRandom]);
    return lowCase[lowRandom];
  }

  // Grabs a number if randomChar chooses it and if the user chooses it
  else if (randomChar === 4 && yesNum === 1) {
    var numRandom = Math.floor(Math.random() * nums.length);
    console.log("NUMBERS:" + nums[numRandom]);
    return nums[numRandom];
  }

  // Runs if randomizer choose a character thats not what the user wanted
  else {
    console.log("DIDNT RUN. randomChar:" + randomChar + ", yesSpec: " + yesSpec + ", yesUp: " + yesUp + ", yesLow: " + yesLow);
    randomChar = Math.floor(1 + Math.random() * 3);
    passLength++;
  }

}

// Generates the password array, then turns it into a string
function generatePassword() {
  passLength = tempL;
  for (var i = 0; i < passLength; i++) {
    mainString.push(whichChar());
  }
  var finalPassword = mainString;
  for (var i = 0; i < mainString.length; i++) {
    finalPassword = finalPassword.toString()
    .replace(",", "")  //remove the commas
    .replace("[", "")  //remove the right bracket
    .replace("]", "")  //remove the left bracket
    .trim()            //remove trailing spaces from partially initialized arrays
    ;
  }
  passLength = 0;
  return finalPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
