const quotes = [
    'When you have eliminated the Impossible, whatever remain, howevre impossible, must be completed',
    'There is nothing more deceptive than an obviuos fact',
    'God created Human second to Him, well the Angels are higher beings than Humans,but it is mandatory for humans to not fall below the rquired standard set by our creator. This is according to other people though',
    'I never make exceptions. An exception dispoves the rules',
    'What one man can invent, another can discover',
    'Nothing clears up a case so much as stating it to another person',
    'Education never ends, Watson. Life is a series of learning and learning until the day we die.'
];//Here we create an array wih a list of all quotes

let words = [];//empty array to store all the words for the current quote
let wordIndex = 0;//space to store index of the word the player is currently typing
//starting time
let startTime = Date.now();
//page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedvalueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () =>{
    //get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);//allows us to randomly select a quote
    const quote = quotes[quoteIndex];
    //put the quote into an array of words
    words = quote.split(' ');
    //reret the word index for tracking
    wordIndex = 0;//set to 0 since the player will start from the first word

    //UI updates
    //Create an Array of span elements so we can set a class -- contains each word inside a span element
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});//allows us to highlight word on display
    //convert into String and set innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');//join the array ot create a string which we can update in the innerHtml on quoteElement
    //Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';//highlights it as yellow
    //clear any prior messages
    messageElement.innerText = '';//cleans messageElement by setting to ''

    //set up the textbox
    //clear the textbox
    typedvalueElement.value = '';
    //set focus
    typedvalueElement.focus();
    //set the event handler

    //start the timer
    startTime = new Date().getTime();
});

typedvalueElement.addEventListener('input', () => {
    //Get the current word
    const currentWord = words[wordIndex];
    //get the current value
    const typedValue = typedvalueElement.value;

    if(typedValue === currentWord && wordIndex === words.length -1) {
        //end of sentence
        //Display success
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds`;
        messageElement.innerText = message;
    }else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord){
        //end of word
        //clear the typedValueElement for the new word
        typedvalueElement.value = '';
        //move to the next word
        wordIndex++;
        //reset the class name for all the elements in th equote
        for(const wordElement of quoteElement.childNodes){
            wordElement.className = '';
        }
        //highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    }else if(currentWord.startsWith(typedValue)){
        //currently correct
        //highlight the next word
        typedvalueElement.className = '';
    } else{
        //error state
        typedvalueElement.className = 'error';
    }
});