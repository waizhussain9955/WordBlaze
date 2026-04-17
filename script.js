
// WordBlaze - Advanced Word Guessing Game
// Developed by Waiz

class WordBlaze {
    constructor() {
        // DOM Elements
        this.elements = {
            wordDisplay: document.getElementById('wordDisplay'),
            hintText: document.getElementById('hintText'),
            hintBtn: document.getElementById('hintBtn'),
            keyboard: document.getElementById('keyboard'),
            timer: document.getElementById('timer'),
            livesDisplay: document.getElementById('livesDisplay'),
            currentScore: document.getElementById('currentScore'),
            highScore: document.getElementById('highScore'),
            streak: document.getElementById('streak'),
            wordsCompleted: document.getElementById('wordsCompleted'),
            gameModal: document.getElementById('gameModal'),
            modalTitle: document.getElementById('modalTitle'),
            modalEmoji: document.getElementById('modalEmoji'),
            resultWord: document.getElementById('resultWord'),
            finalScore: document.getElementById('finalScore'),
            finalWords: document.getElementById('finalWords'),
            finalStreak: document.getElementById('finalStreak'),
            newHighScore: document.getElementById('newHighScore'),
            successAnimation: document.getElementById('successAnimation'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            changeDifficultyBtn: document.getElementById('changeDifficultyBtn'),
            difficultyBtns: document.querySelectorAll('.difficulty-btn')
        };

        // Game State
        this.gameState = {
            currentWord: '',
            currentHint: '',
            guessedLetters: new Set(),
            wrongGuesses: 0,
            score: 0,
            highScore: 0,
            streak: 0,
            wordsCompleted: 0,
            bestStreak: 0,
            difficulty: 'easy',
            timeLeft: 60,
            timerInterval: null,
            isGameActive: false,
            hintUsed: false
        };

        // Difficulty Settings
        this.difficultySettings = {
            easy: { time: 90, lives: 8, scoreMultiplier: 1, hintCost: 30 },
            medium: { time: 60, lives: 6, scoreMultiplier: 1.5, hintCost: 50 },
            hard: { time: 45, lives: 4, scoreMultiplier: 2, hintCost: 75 }
        };

        // Word Database
        this.wordDatabase = [
            { word: "apple", hint: "A sweet red or green fruit", category: "fruit" },
            { word: "banana", hint: "A long yellow fruit loved by monkeys", category: "fruit" },
            { word: "carrot", hint: "A crunchy orange vegetable", category: "vegetable" },
            { word: "river", hint: "A natural stream of water", category: "nature" },
            { word: "mountain", hint: "A tall rocky elevation", category: "nature" },
            { word: "ocean", hint: "A vast body of saltwater", category: "nature" },
            { word: "keyboard", hint: "An input device for typing", category: "technology" },
            { word: "javascript", hint: "A popular programming language", category: "technology" },
            { word: "sunflower", hint: "A yellow flower that faces the sun", category: "nature" },
            { word: "penguin", hint: "A flightless bird in cold regions", category: "animal" },
            { word: "python", hint: "A programming language named after a snake", category: "technology" },
            { word: "cloud", hint: "Collection of water droplets in the sky", category: "nature" },
            { word: "rainbow", hint: "An arc of colors after rain", category: "nature" },
            { word: "book", hint: "A source of written knowledge", category: "object" },
            { word: "butterfly", hint: "A flying insect with colorful wings", category: "animal" },
            { word: "island", hint: "Land surrounded by water", category: "geography" },
            { word: "camel", hint: "A desert animal with humps", category: "animal" },
            { word: "guitar", hint: "A string instrument for music", category: "music" },
            { word: "camera", hint: "A device for taking photos", category: "technology" },
            { word: "mango", hint: "King of fruits, tropical and sweet", category: "fruit" },
            { word: "orange", hint: "A citrus fruit rich in Vitamin C", category: "fruit" },
            { word: "grape", hint: "Small round fruit used for wine", category: "fruit" },
            { word: "peach", hint: "Soft fruit with fuzzy skin", category: "fruit" },
            { word: "pizza", hint: "Italian dish with cheese and toppings", category: "food" },
            { word: "burger", hint: "Sandwich with a patty", category: "food" },
            { word: "pasta", hint: "Italian dish made from noodles", category: "food" },
            { word: "sushi", hint: "Japanese dish with rice and seafood", category: "food" },
            { word: "tacos", hint: "Mexican dish in a folded tortilla", category: "food" },
            { word: "chocolate", hint: "Sweet treat made from cacao beans", category: "food" },
            { word: "coffee", hint: "Popular morning beverage", category: "drink" },
            { word: "planet", hint: "Celestial body orbiting a star", category: "space" },
            { word: "galaxy", hint: "A system of millions of stars", category: "space" },
            { word: "rocket", hint: "Vehicle for space travel", category: "technology" },
            { word: "forest", hint: "Large area covered with trees", category: "nature" },
            { word: "desert", hint: "Dry, sandy region with little rainfall", category: "geography" },
            { word: "volcano", hint: "Mountain that erupts lava", category: "geography" },
            { word: "diamond", hint: "Hardest natural material", category: "mineral" },
            { word: "rainforest", hint: "Dense forest with high rainfall", category: "nature" },
            { word: "elephant", hint: "Largest land animal with a trunk", category: "animal" },
            { word: "dolphin", hint: "Intelligent marine mammal", category: "animal" },
            { word: "eagle", hint: "Large bird of prey", category: "animal" },
            { word: "turtle", hint: "Reptile with a protective shell", category: "animal" },
            { word: "computer", hint: "Electronic device for processing data", category: "technology" },
            { word: "internet", hint: "Global network of computers", category: "technology" },
            { word: "telephone", hint: "Device for voice communication", category: "technology" },
            { word: "airplane", hint: "Flying vehicle for travel", category: "transport" },
            { word: "bicycle", hint: "Two-wheeled human-powered vehicle", category: "transport" },
            { word: "submarine", hint: "Underwater naval vessel", category: "transport" },
            { word: "telescope", hint: "Instrument for viewing distant objects", category: "science" },
            { word: "microscope", hint: "Instrument for viewing tiny objects", category: "science" },
            { word: "hospital", hint: "Place for medical treatment", category: "building" },
            { word: "library", hint: "Place for borrowing books", category: "building" },
            { word: "restaurant", hint: "Place where meals are served", category: "building" },
            { word: "cinema", hint: "Place for watching movies", category: "entertainment" },
            { word: "concert", hint: "Live musical performance", category: "entertainment" },
            { word: "festival", hint: "Celebration with special activities", category: "event" },
            { word: "birthday", hint: "Annual celebration of birth", category: "event" },
            { word: "wedding", hint: "Marriage ceremony", category: "event" },
            { word: "holiday", hint: "Day of celebration or rest", category: "event" },
            { word: "adventure", hint: "Exciting and unusual experience", category: "concept" },
            { word: "mystery", hint: "Something difficult to understand", category: "concept" },
            { word: "treasure", hint: "Valuable hidden items", category: "concept" },
            { word: "journey", hint: "Act of traveling from one place to another", category: "concept" },
            { word: "wisdom", hint: "Quality of having good judgment", category: "concept" },
            { word: "courage", hint: "Ability to face danger or difficulty", category: "concept" },
            { word: "friendship", hint: "State of being friends", category: "concept" },
            { word: "happiness", hint: "State of feeling happy", category: "emotion" },
            { word: "excitement", hint: "Feeling of enthusiastic eagerness", category: "emotion" },
            { word: "curiosity", hint: "Desire to know or learn something", category: "emotion" },
            { word: "creativity", hint: "Ability to create new things", category: "concept" },
            { word: "imagination", hint: "Ability to form mental images", category: "concept" },
            { word: "inspiration", hint: "Process of being mentally stimulated", category: "concept" },
            { word: "motivation", hint: "Reason or desire to act", category: "concept" },
            { word: "determination", hint: "Firmness of purpose", category: "concept" },
            { word: "patience", hint: "Capacity to accept delay", category: "concept" },
            { word: "gratitude", hint: "Quality of being thankful", category: "emotion" },
            { word: "optimism", hint: "Hopefulness about the future", category: "emotion" },
            { word: "confidence", hint: "Feeling of self-assurance", category: "emotion" },
            { word: "ambition", hint: "Strong desire to achieve something", category: "concept" },
            { word: "generosity", hint: "Quality of being kind and giving", category: "concept" },
            { word: "honesty", hint: "Quality of being truthful", category: "concept" },
            { word: "loyalty", hint: "Faithfulness to a person or cause", category: "concept" },
            { word: "respect", hint: "Due regard for feelings", category: "concept" },
            { word: "trust", hint: "Firm belief in reliability", category: "concept" },
            { word: "harmony", hint: "Agreement or peaceful existence", category: "concept" },
            { word: "balance", hint: "State of equilibrium", category: "concept" },
            { word: "freedom", hint: "Power of self-determination", category: "concept" },
            { word: "justice", hint: "Fairness in behavior", category: "concept" },
            { word: "equality", hint: "State of being equal", category: "concept" },
            { word: "diversity", hint: "Variety of different elements", category: "concept" },
            { word: "innovation", hint: "Action of innovating", category: "concept" },
            { word: "progress", hint: "Forward movement", category: "concept" },
            { word: "success", hint: "Accomplishment of aim", category: "concept" },
            { word: "achievement", hint: "Thing done successfully", category: "concept" },
            { word: "victory", hint: "State of having won", category: "concept" },
            { word: "champion", hint: "Winner of competition", category: "concept" },
            { word: "legendary", hint: "Famous and celebrated", category: "concept" },
            { word: "extraordinary", hint: "Very unusual or remarkable", category: "concept" },
            { word: "magnificent", hint: "Impressively beautiful", category: "concept" },
            { word: "spectacular", hint: "Beautiful in a dramatic way", category: "concept" },
            { word: "breathtaking", hint: "Astonishing or awe-inspiring", category: "concept" },
            { word: "phenomenal", hint: "Very remarkable", category: "concept" },
            { word: "outstanding", hint: "Exceptionally good", category: "concept" },
            { word: "brilliant", hint: "Exceptionally clever", category: "concept" },
            { word: "genius", hint: "Exceptional intellectual power", category: "concept" },
            { word: "masterpiece", hint: "Work of outstanding artistry", category: "concept" },
            { word: "paradise", hint: "Perfect place", category: "concept" },
            { word: "utopia", hint: "Ideal society", category: "concept" },
            { word: "fantasy", hint: "Imaginary world", category: "concept" },
            { word: "dream", hint: "Series of thoughts during sleep", category: "concept" },
            { word: "nightmare", hint: "Frightening dream", category: "concept" },
            { word: "illusion", hint: "Deceptive appearance", category: "concept" },
            { word: "reality", hint: "State of things as they exist", category: "concept" },
            { word: "universe", hint: "All existing space and matter", category: "space" },
            { word: "infinity", hint: "State of being endless", category: "concept" },
            { word: "eternity", hint: "Infinite or unending time", category: "concept" }
        ];

        this.init();
    }

    init() {
        this.loadGameData();
        this.setupEventListeners();
        this.createKeyboard();
        this.startNewGame();
    }

    loadGameData() {
        // Load saved data from localStorage
        const savedData = localStorage.getItem('wordBlazeData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.gameState.highScore = data.highScore || 0;
            this.gameState.difficulty = data.difficulty || 'easy';
        }

        // Update UI with loaded data
        this.updateHighScore();
        this.setDifficulty(this.gameState.difficulty);
    }

    saveGameData() {
        const dataToSave = {
            highScore: this.gameState.highScore,
            difficulty: this.gameState.difficulty
        };
        localStorage.setItem('wordBlazeData', JSON.stringify(dataToSave));
    }

    setupEventListeners() {
        // Difficulty buttons
        this.elements.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const level = btn.dataset.level;
                this.setDifficulty(level);
            });
        });

        // Hint button
        this.elements.hintBtn.addEventListener('click', () => this.useHint());

        // Modal buttons
        this.elements.playAgainBtn.addEventListener('click', () => {
            this.hideModal();
            this.startNewGame();
        });

        this.elements.changeDifficultyBtn.addEventListener('click', () => {
            this.hideModal();
            this.showDifficultySelector();
        });

        // Physical keyboard input (works on both mobile and desktop)
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
        
        // Mobile touch keyboard support
        this.setupMobileKeyboardSupport();
    }
    
    setupMobileKeyboardSupport() {
        // This method is now handled in createKeyboard to avoid duplicates
        // Mobile touch support is automatically handled by click events
    }

    createKeyboard() {
        this.elements.keyboard.innerHTML = '';
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.textContent = letter;
            button.dataset.letter = letter.toLowerCase();
            button.addEventListener('click', () => this.guessLetter(letter.toLowerCase()));
            this.elements.keyboard.appendChild(button);
        }
    }

    setDifficulty(level) {
        this.gameState.difficulty = level;
        
        // Update UI
        this.elements.difficultyBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === level);
        });

        // Update game settings
        const settings = this.difficultySettings[level];
        this.gameState.timeLeft = settings.time;
        this.elements.timer.textContent = settings.time;

        // Save preference
        this.saveGameData();
    }

    startNewGame() {
        // Reset game state
        this.gameState.currentWord = '';
        this.gameState.currentHint = '';
        this.gameState.guessedLetters.clear();
        this.gameState.wrongGuesses = 0;
        this.gameState.isGameActive = true;
        this.gameState.hintUsed = false;

        // Select random word
        const randomIndex = Math.floor(Math.random() * this.wordDatabase.length);
        const wordObj = this.wordDatabase[randomIndex];
        this.gameState.currentWord = wordObj.word.toUpperCase();
        this.gameState.currentHint = wordObj.hint;

        // Reset UI
        this.updateWordDisplay();
        this.updateLivesDisplay();
        this.resetKeyboard();
        this.updateHintButton();
        this.startTimer();

        // Display hint
        this.elements.hintText.textContent = this.gameState.currentHint;

        // Hide modal if visible
        this.hideModal();
    }

    updateWordDisplay() {
        this.elements.wordDisplay.innerHTML = '';
        
        for (let letter of this.gameState.currentWord) {
            const li = document.createElement('li');
            if (this.gameState.guessedLetters.has(letter.toLowerCase())) {
                li.textContent = letter;
                li.classList.add('guessed');
            }
            this.elements.wordDisplay.appendChild(li);
        }
    }

    updateLivesDisplay() {
        const settings = this.difficultySettings[this.gameState.difficulty];
        const maxLives = settings.lives;
        const remainingLives = maxLives - this.gameState.wrongGuesses;

        this.elements.livesDisplay.innerHTML = '';
        for (let i = 0; i < maxLives; i++) {
            const life = document.createElement('span');
            life.className = 'life';
            life.textContent = '❤️';
            if (i >= remainingLives) {
                life.classList.add('lost');
            }
            this.elements.livesDisplay.appendChild(life);
        }
    }

    resetKeyboard() {
        const buttons = this.elements.keyboard.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('correct', 'incorrect');
        });
    }

    updateHintButton() {
        const settings = this.difficultySettings[this.gameState.difficulty];
        this.elements.hintBtn.disabled = this.gameState.hintUsed || !this.gameState.isGameActive;
        this.elements.hintBtn.querySelector('.hint-text-btn').textContent = 
            `Get Hint (-${settings.hintCost} pts)`;
    }

    startTimer() {
        this.stopTimer();
        
        const settings = this.difficultySettings[this.gameState.difficulty];
        this.gameState.timeLeft = settings.time;
        this.elements.timer.textContent = this.gameState.timeLeft;

        this.gameState.timerInterval = setInterval(() => {
            this.gameState.timeLeft--;
            this.elements.timer.textContent = this.gameState.timeLeft;

            // Add warning effect when time is low
            if (this.gameState.timeLeft <= 10) {
                this.elements.timer.classList.add('warning');
            } else {
                this.elements.timer.classList.remove('warning');
            }

            if (this.gameState.timeLeft <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }

    stopTimer() {
        if (this.gameState.timerInterval) {
            clearInterval(this.gameState.timerInterval);
            this.gameState.timerInterval = null;
        }
    }

    guessLetter(letter) {
        if (!this.gameState.isGameActive || this.gameState.guessedLetters.has(letter)) {
            return;
        }

        this.gameState.guessedLetters.add(letter);
        
        const button = this.elements.keyboard.querySelector(`[data-letter="${letter}"]`);
        if (button) {
            button.disabled = true;
        }

        if (this.gameState.currentWord.includes(letter.toUpperCase())) {
            // Correct guess
            if (button) button.classList.add('correct');
            this.updateWordDisplay();
            this.playSound('correct');
            
            // Calculate score bonus for correct guess
            const settings = this.difficultySettings[this.gameState.difficulty];
            const timeBonus = Math.max(0, this.gameState.timeLeft * 2);
            const letterScore = 10 * settings.scoreMultiplier + timeBonus;
            this.updateScore(Math.round(letterScore));

            // Check for win
            if (this.checkWin()) {
                this.endGame(true);
            }
        } else {
            // Wrong guess
            if (button) button.classList.add('incorrect');
            this.gameState.wrongGuesses++;
            this.updateLivesDisplay();
            this.playSound('wrong');
            
            // Shake animation
            this.elements.wordDisplay.parentElement.classList.add('shake');
            setTimeout(() => {
                this.elements.wordDisplay.parentElement.classList.remove('shake');
            }, 500);

            // Check for loss
            const settings = this.difficultySettings[this.gameState.difficulty];
            if (this.gameState.wrongGuesses >= settings.lives) {
                this.endGame(false);
            }
        }
    }

    handleKeyboardInput(e) {
        if (!this.gameState.isGameActive) return;

        const letter = e.key.toUpperCase();
        
        // Handle letter keys (A-Z)
        if (letter.length === 1 && letter >= 'A' && letter <= 'Z') {
            e.preventDefault();
            this.guessLetter(letter.toLowerCase());
            return;
        }
        
        // Handle backspace on mobile
        if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            // Optional: Handle backspace functionality if needed
            return;
        }
        
        // Handle spacebar for hint (mobile friendly)
        if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            this.useHint();
            return;
        }
        
        // Handle Enter for new game
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!this.gameState.isGameActive) {
                this.startNewGame();
            }
            return;
        }
        
        // Handle Escape to close modal
        if (e.key === 'Escape') {
            e.preventDefault();
            if (!this.elements.gameModal.classList.contains('hidden')) {
                this.hideModal();
            }
            return;
        }
    }

    useHint() {
        if (this.gameState.hintUsed || !this.gameState.isGameActive) return;

        const settings = this.difficultySettings[this.gameState.difficulty];
        
        // Find unguessed letters
        const unguessedLetters = [];
        for (let letter of this.gameState.currentWord) {
            if (!this.gameState.guessedLetters.has(letter.toLowerCase())) {
                unguessedLetters.push(letter);
            }
        }

        if (unguessedLetters.length > 0) {
            // Reveal a random letter
            const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
            this.gameState.guessedLetters.add(randomLetter);
            
            // Update keyboard
            const button = this.elements.keyboard.querySelector(`[data-letter="${randomLetter.toLowerCase()}"]`);
            if (button) {
                button.disabled = true;
                button.classList.add('correct');
            }
            
            // Update display
            this.updateWordDisplay();
            
            // Deduct points
            this.updateScore(-settings.hintCost);
            
            // Mark hint as used
            this.gameState.hintUsed = true;
            this.updateHintButton();
            
            // Check for win
            if (this.checkWin()) {
                this.endGame(true);
            }
        }
    }

    checkWin() {
        for (let letter of this.gameState.currentWord) {
            if (!this.gameState.guessedLetters.has(letter.toLowerCase())) {
                return false;
            }
        }
        return true;
    }

    updateScore(points) {
        this.gameState.score = Math.max(0, this.gameState.score + points);
        this.elements.currentScore.textContent = this.gameState.score;

        // Update high score
        if (this.gameState.score > this.gameState.highScore) {
            this.gameState.highScore = this.gameState.score;
            this.updateHighScore();
            this.saveGameData();
        }
    }

    updateHighScore() {
        this.elements.highScore.textContent = this.gameState.highScore;
    }

    updateStreak() {
        this.gameState.streak++;
        this.elements.streak.textContent = this.gameState.streak;
        
        if (this.gameState.streak > this.gameState.bestStreak) {
            this.gameState.bestStreak = this.gameState.streak;
        }
    }

    updateWordsCompleted() {
        this.gameState.wordsCompleted++;
        this.elements.wordsCompleted.textContent = this.gameState.wordsCompleted;
    }

    endGame(isWin) {
        this.gameState.isGameActive = false;
        this.stopTimer();

        if (isWin) {
            // Calculate final score with bonuses
            const settings = this.difficultySettings[this.gameState.difficulty];
            const timeBonus = this.gameState.timeLeft * 5 * settings.scoreMultiplier;
            const livesBonus = (settings.lives - this.gameState.wrongGuesses) * 20 * settings.scoreMultiplier;
            const streakBonus = this.gameState.streak * 10 * settings.scoreMultiplier;
            
            this.updateScore(Math.round(timeBonus + livesBonus + streakBonus));
            this.updateStreak();
            this.updateWordsCompleted();
            
            // Show success animation
            this.showSuccessAnimation();
            
            // Start next word after delay
            setTimeout(() => {
                this.startNewGame();
            }, 2000);
        } else {
            // Game over - reset streak
            this.gameState.streak = 0;
            this.elements.streak.textContent = '0';
            
            // Show game over modal
            this.showGameOverModal();
        }
    }

    showSuccessAnimation() {
        this.elements.successAnimation.classList.remove('hidden');
        setTimeout(() => {
            this.elements.successAnimation.classList.add('hidden');
        }, 1000);
    }

    showGameOverModal() {
        const isNewHighScore = this.gameState.score >= this.gameState.highScore && this.gameState.score > 0;
        
        // Update modal content
        this.elements.modalTitle.textContent = 'Game Over!';
        this.elements.modalEmoji.textContent = '😔';
        this.elements.resultWord.textContent = this.gameState.currentWord;
        this.elements.finalScore.textContent = this.gameState.score;
        this.elements.finalWords.textContent = this.gameState.wordsCompleted;
        this.elements.finalStreak.textContent = this.gameState.bestStreak;
        
        // Show new high score message
        this.elements.newHighScore.style.display = isNewHighScore ? 'block' : 'none';
        
        // Show modal
        this.elements.gameModal.classList.remove('hidden');
    }

    hideModal() {
        this.elements.gameModal.classList.add('hidden');
    }

    showDifficultySelector() {
        // Focus on difficulty buttons
        this.elements.difficultyBtns[0].focus();
    }

    playSound(type) {
        // Create simple sound effects using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct') {
            oscillator.frequency.value = 523.25; // C5
            gainNode.gain.value = 0.1;
            oscillator.type = 'sine';
        } else if (type === 'wrong') {
            oscillator.frequency.value = 200; // Low tone
            gainNode.gain.value = 0.1;
            oscillator.type = 'sawtooth';
        }
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WordBlaze();
});

// Mobile Keyboard Toggle
class MobileKeyboardToggle {
    constructor() {
        this.toggleBtn = document.getElementById('keyboardToggleBtn');
        this.keyboardContainer = document.getElementById('keyboardContainer');
        this.toggleText = document.querySelector('.toggle-text');
        this.isKeyboardVisible = true;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        
        // Handle initial state based on screen size
        if (window.innerWidth <= 768) {
            // Initially hide keyboard on mobile
            this.hideKeyboard();
            document.getElementById('mobileKeyboardToggle').style.display = 'flex';
        } else {
            // Always show keyboard on desktop
            this.showKeyboard();
            document.getElementById('mobileKeyboardToggle').style.display = 'none';
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                document.getElementById('mobileKeyboardToggle').style.display = 'flex';
            } else {
                document.getElementById('mobileKeyboardToggle').style.display = 'none';
                this.showKeyboard(); // Always show on desktop
            }
        });
    }
    
    setupEventListeners() {
        this.toggleBtn.addEventListener('click', () => {
            this.toggleKeyboard();
        });
        
        // Add touch feedback
        this.toggleBtn.addEventListener('touchstart', () => {
            this.toggleBtn.style.transform = 'scale(0.95)';
        });
        
        this.toggleBtn.addEventListener('touchend', () => {
            this.toggleBtn.style.transform = 'scale(1)';
        });
    }
    
    toggleKeyboard() {
        if (this.isKeyboardVisible) {
            this.hideKeyboard();
        } else {
            this.showKeyboard();
        }
    }
    
    hideKeyboard() {
        this.keyboardContainer.classList.add('hidden');
        this.toggleText.textContent = 'Show Keyboard';
        this.isKeyboardVisible = false;
        
        // Add haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    showKeyboard() {
        this.keyboardContainer.classList.remove('hidden');
        this.toggleText.textContent = 'Hide Keyboard';
        this.isKeyboardVisible = true;
        
        // Add haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Smooth scroll to keyboard
        setTimeout(() => {
            this.keyboardContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }
}

// Initialize mobile keyboard toggle
document.addEventListener('DOMContentLoaded', () => {
    new MobileKeyboardToggle();
});