let guessword = document.querySelector('#word');
let fails = document.querySelector('#fails');
let wrguess = document.querySelector('#guess');
let success = document.querySelector('#wins');
let kytxt = document.querySelector('#keytext');
let pageimg = document.querySelector('#image');

var game = {
    wordList : ['yeast','flour','water','milk','cream','sugar','vanilla','salt','eggs','butter','frosting','sprinkles'],
    index : 0,
    keyword : '',
    blankword : [],
    tries : 15,
    guessList : [],
    win:0,
    key : '',

    //Builds everything needed to display
    build : function() {
        word = ''
        for (i in this.blankword) {
            word += `${this.blankword[i]} `;
        }
        guessword.innerText = word;
        fails.innerHTML = `You have <strong>${this.tries}</strong> chances left.`;
        wrguess.innerHTML = `You have already guessed: <br> ${this.guessList}`;
        success.innerText = `You have found ${this.win}`;
    },

    //Reset for new word
    reset : function() {
        document.addEventListener('keyup',checkLetter);
        this.blankword = []
        this.guessList = []
        this.tries=15;
        this.keyword = this.wordList[this.index]
        kytxt.innerText = 'Press any key to get started!'
        if (this.index  < this.wordList.length) {
            for (i in this.wordList[this.index]) {
                this.blankword.push('_');
            }
            this.build();
        } else {

            //Add stuff about amount found -> cake pic if all, unfinished cake if not 
            if (this.win === 12) {
                pageimg.innerHTML = `<img class="img-thumbnail m-1" src='assets/images/cake.jpg'><h2 style='color:green;'> You made the cake! Thanks for playing!</h2>`
            } else {
                pageimg.innerHTML = `<img class="img-thumbnail m-1" src='assets/images/cakefail.jpg'><h2 style='color:red;'> You missed a few ingredients, Try again and see if you can find them all!</h2>`
            }
        };
    },

    //Checks if enitre word is correct
    wordcheck : function() {
        let check = ''
        for (i in this.blankword){
            check += this.blankword[i];
        }
        if (check === this.keyword){
            return true
        } else {
            return false
        }
    },

    //Replaces letter at specified spot
    replace : function(i) {
        this.blankword[i] = this.key;
        this.build();
    },

    //logic for a wrong letter
    wguess : function() {
        if (this.guessList.includes(`${this.key} `) === false){
            this.guessList.push(`${this.key} `);
            if (this.tries > 0 ) {
                this.tries -= 1
            }
        } if (this.tries === 0) {
            this.index += 1
            pageimg.innerHTML = '<h4 style="color:red;">Oh no! You didn&#39;t  find it. Try to find another ingredient!<h4>'
            document.addEventListener('keydown',this.reset())
        }
    }
}

let checkLetter = function(event) {

    //Checking whether it is alphabetical
    if (event.keyCode>64 && event.keyCode<91){
        game.key = event.key

        //Counter to see if its in the word
        let ck = 0
        
        //Iterating through list to check if letter is in the word
        for (i in game.keyword) {
            if (game.key === game.keyword[i]) {
                game.replace(i);
            } else {
                ck+=1
            }
        }

        //logic for a wrong letter
        if (ck === game.keyword.length) {
            game.wguess();
            game.build();
        }

        //logic if word is finished
        if (game.wordcheck()) {
            game.win += 1
            game.index += 1
            pageimg.innerHTML = `<img class="img-thumbnail m-1" src='assets/images/${game.keyword}.jpg'><h2>You found ${game.keyword}!</h2>`
            document.addEventListener('keydown',game.reset());
        } 
    }
}


document.addEventListener('pageshow',game.reset());
