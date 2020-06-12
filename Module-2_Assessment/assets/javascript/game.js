//Set of variables and Lists
let wordList = ['yeast','flour','water','milk','cream','sugar','vanilla','salt','eggs','butter','frosting','sprinkles'];
let n = 0;
let w=0;
let wrong = 15;
let blankword = [];
let guessList = []
let keyword = wordList[n];
let guessword = document.querySelector('#word');
let fails = document.querySelector('#fails');
let wrguess = document.querySelector('#guess');
let success = document.querySelector('#wins');
let kytxt = document.querySelector('#keytext');
let pageimg = document.querySelector('#image');


 //Build word for display
const buildWord = function() {
    word = ''
    for (i in blankword) {
        word += `${blankword[i]} `;
    }
    guessword.innerText = word;
    fails.innerHTML = `You have <strong>${wrong}</strong> chances left.`;
    wrguess.innerHTML = `You have already guessed: <br> ${guessList}`;
    success.innerText = `You have found ${w}`;
}

//Checks if word is correct
const wordcheck = function(keyword) {
    let check = ''
    for (i in blankword){
        check += blankword[i];
    }
    if (check === keyword){
        return true
    } else {
        return false
    }
}

//Reset for New Word
//***Have something else step for a different word***
const reset = function(n) {
    document.addEventListener('keyup',checkLetter);
    blankword = []
    guessList = []
    keyword = wordList[n]
    kytxt.innerText = 'Press any key to get started!'
    if (n<wordList.length) {
        for (i in wordList[n]) {
            blankword.push('_');
        }
        buildWord();
        
    } else {
        
        //Add stuff about amount found -> cake pic if all, unfinished cake if not 
        if (this.win === 12) {
            pageimg.innerHTML = `<img class="img-thumbnail m-1" src='assets/images/cake.jpg'><h2 style='color:green;'> You made the cake! Thanks for playing!</h2>`
        } else {
            pageimg.innerHTML = `<img class="img-thumbnail m-1" src='assets/images/cakefail.jpg'><h2 style='color:red;'> You missed a few ingredients, Try again and see if you can find them all!</h2>`
        }
    }
}

//Adds wrong guess to list
const wrongGuess = function(letter){
    if (guessList.includes(`${letter} `) === false){
        guessList.push(`${letter} `);
        if (wrong > 0 ) {
            wrong -= 1
        }
    } if (wrong === 0) {
        n += 1;
        kytxt.innerHTML = `<p style="color:red;">Oh no! You couldn't find the ingredient. Press Enter to continue!</p>`
        document.addEventListener('keydown',winReset)
    }
}

//Reset after a word is found
const winReset = function() {
    document.removeEventListener('keyup',checkLetter);
    wrong=15;
    if (event.keyCode === 13) {
        document.removeEventListener('keydown', winReset);
        
        reset(n);
    }
}

//Checks Letter and replaces as needed. Also checks word.
const checkLetter = function(event) {

    //Checking whether it is alphabetical
    if (event.keyCode>64 && event.keyCode<91){

        //Counter to see if its in the word
        let ck = 0
        
        //Iterating through list to check if letter is in the word
        for (i in keyword) {
            if (event.key === keyword[i]) {
                blankword[i] = event.key;
                buildWord();
            } else {
                ck+=1
            }
        }

        //logic for a wrong letter
        if (ck === keyword.length) {
            wrongGuess(event.key);
            buildWord();
        }

        //logic if word is finished
        if (wordcheck(keyword)) {
            w += 1
            n += 1
            kytxt.innerHTML = `<p style="color:green;">Yay! Press Enter to continue!</p>`
            pageimg.innerHTML = `<img class="img-thumbnail m-1" src='assets/images/${keyword}.jpg'>`
            document.addEventListener('keydown',winReset);
        } 
    }
}

document.addEventListener('pageshow',reset(n));
