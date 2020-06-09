//Set of variables and Lists
let wordList = ['mouse','frog','dog','cat','bobcat'];
let n = 0;
let wrong = 15;
let keyword = wordList[n];
let guessword = document.querySelector('#word');
let fails = document.querySelector('#fails');
let wrguess = document.querySelector('#guess');
let success = document.querySelector('#wins');

 //Build word for display
const buildWord = function() {
    word = ''
    for (i in blankword) {
        word += `${blankword[i]} `;
    }
    guessword.innerText = word;
    fails.innerText = `You have ${wrong} chances left.`;
    wrguess.innerText = guessList;
    success.innerText = `You have completed ${n}`;

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
    blankword = []
    guessList = []
    if (n<wordList.length) {
        for (i in wordList[n]) {
            blankword.push('_');
        }
        buildWord();
        wrong=15;
    } else {
        alert('Thanks for Playing!')
    }
}

//Replace Letting and Build
const replace = function(i,L) {
    blankword[i] = L;
    buildWord();
}

//Adds wrong guess to list
const wrongGuess = function(letter){
    guessList.push(`${letter} `);
}

//Checks Letter and replaces as needed. Also checks word.
const checkLetter = function(event) {

    //Checking whether it is alphabetical
    if (event.keyCode>64 && event.keyCode<91){

        //Counter to see if its in the word
        let ck = 0
        keyword = wordList[n]

        //Iterating through list to check if letter is in the word
        for (i in keyword) {
            console.log(i);
            if (event.key === keyword[i]) {
                replace(i,event.key); 
            } else {
                ck+=1
            }
        }

        //Changing amount of tries and checking if word is finished.
        if (ck === keyword.length) {
            wrong -= 1;
            wrongGuess(event.key);
            buildWord();
        }
        if (wordcheck(keyword)) {
            alert(`Yay! The word is ${keyword}!`)
            n += 1
            
            reset(n);
        } 
    }
}

document.addEventListener('keyup',checkLetter);
document.addEventListener('pageshow',reset(n))
