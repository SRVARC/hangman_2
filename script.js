const words = {
    ai_terms: ['meta', 'autocorrect', 'syntax', 'alexa', 'algorithm','chatbots','neuralnetwork','posenet','doodlenet','hyperparameter','token','Overfitting','Hallucination','Patternrecognition','Reinforcementlearning','Diffusion','Explainability','Lobbying','Paperclips','Redistribution','Regulation','Shoggoth','Training','Automation','Optimization','Reasoning','Robotics','Bias','Classification','Clustering','Dropout','Embeddings','Inference','Nanobots','Precision','Regression','Yield','Ontology','Conclusion','Categorization','Entity','Parsing','Plugins','Precision','Treemap','analytics','autoencoder','interpretation','perceptron','regularization'],
    Car_brand: ['nissan', 'renault', 'hyundai', 'mahindra', 'porsche','audi','dodge','jaguar','lexus','mercury','scoda','volvo','saab','polaris','austin','borgward','mclaren','marcos','fargo','santana','hansa','thulin','merkur','veritas','atlas','baojun','berg','chery','cisitalia','cizeta','cobera','dragon','elcat','enranger','falcon','force','haima','gutbrod','hulme','invicta','luxgen','magirus','perudua','radar','trident','venucia','mitsubishi','dacia','pontiac','buick'],
    Sports: ['golf', 'handball', 'basketball', 'fencing', 'archery','Boxing','Wrestling','judo','Volleyball','Surfing','Tennis','Sumo','Netball','Polo','Climbing','Dodgeball','Parkour','Running','Skiing','Yoga','shooting','Javelin','Shotput','Bowling','Gymnastics','Kabaddi','Chess','Cricket','Squash','Swimming','Taekwondo','Cycling','Trampoline','Waterpolo','sailing','darts','Paintball','Paragliding','Kayaking','Curling','Snooker','shinty','Equestrian','bandy','bocce','canicross','crossnet','dumog','footbag',"rugby"]
};

let selectedWord = '';
let wrongLetters = [];
let correctLetters = [];
const wordDisplay = document.getElementById('wordDisplay');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const keyboard = document.querySelector('.keyboard');
const restartBtn = document.getElementById('restartBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const categorySelection = document.getElementById('categorySelection');
const hangmanImage = document.getElementById('hangmanImage');

const loseSound = document.getElementById("loseSound");
const winningSound = document.getElementById("winningSound");
const correctguess = document.getElementById("correct_guess");
const wrongguess = document.getElementById("wrong_guess");

 maxWrongGuesses = 7; // Total stages of hangman (0 to 6)

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        startGame(category);
    });
});

 


function startGame(category) {
    selectedWord = words[category][Math.floor(Math.random() * words[category].length)];
    wrongLetters = [];
    correctLetters = [];
    categorySelection.style.display = 'none';
    updateDisplay();
    createKeyboard();
    updateHangmanImage();
}

function createKeyboard() {
    keyboard.innerHTML = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet.split('').forEach(letter => {
        const key = document.createElement('div');
        key.classList.add('key');
        key.textContent = letter;
        key.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(key);
    });
}

function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        correctguess.play();
        correctLetters.push(letter);
    } else {
        wrongguess.play();
        wrongLetters.push(letter);
    }
    updateDisplay();
    updateHangmanImage();
    checkGameOver();
}

function updateDisplay() {
    wordDisplay.textContent = selectedWord.split('').map(letter => (correctLetters.includes(letter) ? letter : '_')).join(' ');
    wrongLettersDisplay.textContent = `Wrong Letters: ${wrongLetters.join(', ')}`;
}

function updateHangmanImage() {
    hangmanImage.src = `hangman${wrongLetters.length}.png`;
}

function checkGameOver() {
    if (wrongLetters.length === maxWrongGuesses) {
        loseSound.play()
        alert(`Game Over! The word was: ${selectedWord}`);
        
    } else if (selectedWord.split('').every(letter => correctLetters.includes(letter))) {
        winningSound.play()
        alert('Congratulations! You guessed the word!');
        
        
    }
}

function restart()
{
    window.location = "index.html"
} 

