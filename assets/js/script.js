// Elements

// Time remaining container and timer parent
var timeRemainingEl = document.querySelector("#time-remaining");
// The timer container
var timerEl = document.querySelector("#timer");
// High Score button container
var hsEl = document.querySelector(".hs-button");
// Container for current question name
var questionEl = document.querySelector(".question");
// Instruction/Answer selection container
var instructionsEl = document.querySelector(".instructions");
// Page name container
var pageNameEl = document.querySelector("#page-name");
// Begin button container
var beginEl = document.querySelector("#begin");

////// End of elements /////////

////// Element properties //////

// Text in the timer
var timerTime = timerEl.innerText;
// Score used on score screen
var finalScore;
// Tracks the user's score
var totalScore = 0;
// Array containing top 5 high scores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// Max allowed high scores
const MAX_HIGH_SCORES = 5;
// Current question number defaults to 0, switches to 1 when questionOne is triggered;
var questionNumber = 0;
// User's answer
var answerGiven = "Z";
// Response to users answer
var result = "What happened?";

// Result of user question

///// End of element data /////
/////////////////////////////
/////////////////////////////

// Utility functions
function startTimer() {
	timerInterval = setInterval(ticker, 1000);
}

function pauseTimer() {
	clearInterval(timerInterval);
}

function ticker() {
	timerTime--;
	timerEl.innerText = timerTime;
	if (timerTime <= 0) {
		clearInterval(timerInterval);
		outOfTime();
	}
}

function hideTimeRemaining() {
	timeRemainingEl.style.display = "none";
}

function showTimeRemaining() {
	timeRemainingEl.style.display = "inline-block";
}

function hideHighScore() {
	hsEl.style.display = "none";
}
function showHighScore() {
	hsEl.style.display = "inline-block";
}
function resetTimer() {
	timerTime = 75;
	timerEl.innerText = timerTime;
}

// Takes in a question and answer and returns results as a string
function questionResults() {
	if (questionNumber === 1 && answerGiven === "B") {
		result = "Correct!";
	} else if (questionNumber === 1 && answerGiven != "B") {
		result = "Incorrect";
	}
	if (questionNumber === 2 && answerGiven === "A") {
		result = "Correct!";
	} else if (questionNumber === 2 && answerGiven != "A") {
		result = "Incorrect";
	}
	if (questionNumber === 3 && answerGiven === "C") {
		result = "Correct!";
	} else if (questionNumber === 3 && answerGiven != "C") {
		result = "Incorrect";
	}
	if (questionNumber === 4 && answerGiven === "D") {
		result = "Correct!";
	} else if (questionNumber === 4 && answerGiven != "D") {
		result = "Incorrect";
	}
	if (questionNumber === 5 && answerGiven === "A") {
		result = "Correct!";
	} else if (questionNumber === 5 && answerGiven != "A") {
		result = "Incorrect";
	}
	return result;
}

// Displays results of user answer, pauses timer, clears display event, adds next question event
// to #begin button/"Next Question" button, changes begin button text to "Next Question"
function displayResults() {
	pauseTimer();
	if (questionResults() === "Incorrect") {
		timerTime = timerTime - 10;
		timerEl.innerText = timerTime;
	}
	console.log(questionResults());
	instructionsEl.innerText = questionResults();
	beginEl.innerText = "Next Question";
    beginEl.addEventListener("click", nextQuestion);
    beginEl.style.display = "inline-block";
}

///// End of utility functions /////

//Default Event Listeners
beginEl.addEventListener("click", nextQuestion);
hsEl.addEventListener("click", highScorePage);

///// End of Event Listeners /////

// Main pg to High Score
/* 
	Timer replaced with Main pg button, HSBtn replaced with Clear Scores btn, question text updated, instruction text updated, 
	begin button removed
*/

function mainPage() {
	timeRemainingEl.style.display = "inline-block";
	hsEl.style.display = "inline-block";
	hsEl.innerText = "High Scores";
	questionEl.innerText = "Instructions";
	instructionsEl.innerHTML = "Upon beginning the quiz the timer will begin counting down. <br/> Every question answered incorrectly will reduce the timer by 10 seconds. <br/> Answering the last question will initiate an initials entry prompt to save if it is a high score. <br/> The top 5 scores from your computer will be displayed on the high score page.";
	pageNameEl.innerText = "JavaScript Quiz!";
	beginEl.innerText = "Begin Quiz";
	beginEl.style.display = "inline-block";
	hsEl.addEventListener("click", highScorePage);
	hsEl.removeEventListener("click", mainPage);
}

function highScorePage() {
    instructionsEl.innerText = "";
		var highScoresListEl = document.createElement("ol");
		instructionsEl.appendChild(highScoresListEl);
		highScoresListEl.setAttribute("id", "highScoresList");
		highScoresListEl.innerHTML = highScores
			.map((score) => {
				return `<li class="high-score-list">${score.name}-${score.score}</li>`;
			})
			.join("");
	hsEl.style.display = "inline-block";
	timeRemainingEl.style.display = "none";
	hsEl.innerText = "Main Page";
	pageNameEl.innerText = "High Scores";
	questionEl.innerText = "The top 5 high scores:";
	//instructionsEl.innerHTML = "<p> 1st: <span id='first-place'></span></p> <p> 2nd: <span id='second-place'></span></p><p> 3rd: <span id='third-place'></span></p><p> 4th: <span id='fourth-place'></span></p><p> 5th: <span id='fifth-place'></span></p>";
	beginEl.style.display = "none";
	hsEl.addEventListener("click", mainPage);
	hsEl.removeEventListener("click", highScorePage);
}

// Question pg to Question pg
function nextQuestion() {
	if (questionNumber === 0) {
		questionOne();
	} else if (questionNumber === 1) {
		questionTwo();
	} else if (questionNumber === 2) {
		questionThree();
	} else if (questionNumber === 3) {
		questionFour();
	} else if (questionNumber === 4) {
		questionFive();
	} else if (questionNumber === 5) {
		scorePage();
	}
	if (questionNumber < 5) {
	}
}

function aSelected() {
	answerGiven = "A";
	displayResults();
}

function bSelected() {
	answerGiven = "B";
	displayResults();
}

function cSelected() {
	answerGiven = "C";
	displayResults();
}

function dSelected() {
	answerGiven = "D";
	displayResults();
}

function assignAnswerListeners() {
	var ansA = document.querySelector(".a");
	var ansB = document.querySelector(".b");
	var ansC = document.querySelector(".c");
	var ansD = document.querySelector(".d");
	ansA.addEventListener("click", aSelected);
	ansB.addEventListener("click", bSelected);
	ansC.addEventListener("click", cSelected);
	ansD.addEventListener("click", dSelected);
}

function questionOne() {
	//if (questionNumber === 4 && answerGiven === "D")

	hideHighScore();
	beginEl.style.display = "none";
	startTimer();
	questionNumber++;

	var questionOne = ": Which of the following about arrow functions is false?";
	var aText = "<p>A: They do not have bindings to the 'this' keyword ";
	var bText = "<p>B: They can be used as constructors ";
	var cText = "<p>C: They do not have the 'new.target' keyword ";
	var dText = "<p>D: You cannot use 'yield' within its body ";

	var answerA = "<button class='a' type='button'> A </button>";
	var answerB = "<button class='b' type='button'> B </button>";
	var answerC = "<button class='c' type='button'> C </button>";
	var answerD = "<button class='d' type='button'> D </button>";

	var pEnd = "</p>";

	instructionsEl.innerHTML = aText + answerA + pEnd + bText + answerB + pEnd + cText + answerC + pEnd + dText + answerD + pEnd;

	//if (questionNumber === 1 && answerGiven === "B")
	assignAnswerListeners();

	questionEl.innerText = "Question # " + questionNumber.toString() + questionOne;
}

function questionTwo() {
	//if (questionNumber === 2 && answerGiven === "A")
	
	hideHighScore();
	beginEl.style.display = "none";
	startTimer();
	questionNumber++;

    var questionTwo = ": Which is a correct on click handler?";
	var aText = "<p>A: element.addEventListener('click', functionName)";
	var bText = "<p>B: element.onClick(function)";
	var cText = "<p>C: element.function('click')";
	var dText = "<p>D: element.addEventListener(functionName, 'click')";

	var answerA = "<button class='a' type='button'> A </button>";
	var answerB = "<button class='b' type='button'> B </button>";
	var answerC = "<button class='c' type='button'> C </button>";
	var answerD = "<button class='d' type='button'> D </button>";

	var pEnd = "</p>";

    instructionsEl.innerHTML = aText + answerA + pEnd + bText + answerB + pEnd + cText + answerC + pEnd + dText + answerD + pEnd;
    
    	assignAnswerListeners();

	questionEl.innerText = "Question # " + questionNumber.toString() + questionTwo;
}

function questionThree() {
	//if (questionNumber === 3 && answerGiven === "C")

	hideHighScore();
	beginEl.style.display = "none";
	startTimer();
	questionNumber++;

	var questionThree = ": Document.querySelector(selectors) does what?";
	var aText = "<p>A:  grabs the last element that matches the selector";
	var bText = "<p>B:  grabs the first child of the selector";
	var cText = "<p>C:  grabs the first element that matches the selector";
	var dText = "<p>D:  grabs all elements that matches the selector";

	var answerA = "<button class='a' type='button'> A </button>";
	var answerB = "<button class='b' type='button'> B </button>";
	var answerC = "<button class='c' type='button'> C </button>";
	var answerD = "<button class='d' type='button'> D </button>";

	var pEnd = "</p>";

    instructionsEl.innerHTML = aText + answerA + pEnd + bText + answerB + pEnd + cText + answerC + pEnd + dText + answerD + pEnd;
    
    	assignAnswerListeners();

	questionEl.innerText = "Question # " + questionNumber.toString() + questionThree;
}

function questionFour() {
	//if (questionNumber === 4 && answerGiven === "D")

	hideHighScore();
	beginEl.style.display = "none";
	startTimer();
	questionNumber++;

	var questionFour = ": Const variables have what scope?";
	var aText = "<p>A:  Function";
	var bText = "<p>B:  Class";
	var cText = "<p>C:  Global";
	var dText = "<p>D:  Block";

	var answerA = "<button class='a' type='button'> A </button>";
	var answerB = "<button class='b' type='button'> B </button>";
	var answerC = "<button class='c' type='button'> C </button>";
	var answerD = "<button class='d' type='button'> D </button>";

	var pEnd = "</p>";

    instructionsEl.innerHTML = aText + answerA + pEnd + bText + answerB + pEnd + cText + answerC + pEnd + dText + answerD + pEnd;
    
    	assignAnswerListeners();

	questionEl.innerText = "Question # " + questionNumber.toString() + questionFour;
}

function questionFive() {
	//if (questionNumber === 5 && answerGiven === "A")

	hideHighScore();
	beginEl.style.display = "none";
	startTimer();
	questionNumber++;

	var questionFive = ": What is not a rule of a 'let' variable?";
	var aText = "<p>A: Let does not have 'Block' scope.";
	var bText = "<p>B:  Variables defined with let cannot be Redeclared.";
	var cText = "<p>C: Variables defined with let must be Declared before use.";
	var dText = "<p>D:  Variables defined with let have Block Scope.";

	var answerA = "<button class='a' type='button'> A </button>";
	var answerB = "<button class='b' type='button'> B </button>";
	var answerC = "<button class='c' type='button'> C </button>";
	var answerD = "<button class='d' type='button'> D </button>";

	var pEnd = "</p>";

    instructionsEl.innerHTML = aText + answerA + pEnd + bText + answerB + pEnd + cText + answerC + pEnd + dText + answerD + pEnd;
    
    	assignAnswerListeners();

	questionEl.innerText = "Question # " + questionNumber.toString() + questionFive;
}

//Checks if the score is a high score.
function scorePage() {
	finalScore = timerEl.innerText;
	questionEl.innerText = "Score:";
	instructionsEl.innerText = "Your score is: " + finalScore + "! Great job!";

	var enterInitialsEl = document.createElement("p");
	enterInitialsEl.textContent = "Enter initials:";
	instructionsEl.appendChild(enterInitialsEl);
	var inputBox = document.createElement("input");
	inputBox.setAttribute("class", "input-name");
	inputBox.setAttribute("id", "name");
	instructionsEl.appendChild(inputBox);

	var submitBtn = document.createElement("button");
	submitBtn.textContent = "Submit";
	submitBtn.setAttribute("class", "start");
	instructionsEl.appendChild(submitBtn);

	//Clears quiz properties and navigates to the High Score page
	submitBtn.addEventListener("click", () => {
		if (inputBox.value.length == 2) {
			const lastScore = {
				score: finalScore,
				name: inputBox.value,
			};
			totalScore = 0;
			questionNumber = 0;
			resetTimer();
			highScores.push(lastScore);
			highScores.sort((a, b) => b.score - a.score);
			highScores.splice(5);
			localStorage.setItem("highScores", JSON.stringify(highScores));
			highScorePage();
		} else {
			window.alert("Initials only.");
		}
	});

	beginEl.style.display = "none";
	beginEl.removeEventListener("click", displayResults);
	beginEl.removeEventListener("click", tryAgain);
}
//Links
function tryAgain() {
	totalScore = 0;
	questionNumber = 0;
	resetTimer();
	beginEl.removeEventListener("click", tryAgain);
	nextQuestion();
}

//  Out of time
/*
 If timer runs out, replace page name text with Out of Time, remove question text, remove instructions text, 
 update begin button to Try Again button
*/
function outOfTime() {
	questionEl.innerText = "Out of time";
	instructionsEl.innerText = "You are out of time. Start over?";
	beginEl.innerText = "Try again";
	beginEl.removeEventListener("click", nextQuestion);
	beginEl.addEventListener("click", tryAgain);
}
