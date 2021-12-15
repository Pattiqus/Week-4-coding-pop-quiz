var startButton = document.getElementById("startButton");
// var questions = document.getElementById("questions");


// # Retrieve: Main Wrapper for Pop-Quiz Content
var questionsWrapper = document.getElementById('questionsWrapper');

var timeDisplay = document.getElementById("time");
var currentQuestioni = 0; 
var timerA;
var time = 100

function startQuiz(){
    var mainScreen = document.getElementById("main-screen")
    mainScreen.setAttribute("class", "hide");
    // questions.removeAttribute("class");
    timerA = setInterval(clockClick, 1000);
    timeDisplay.textContent = time;
    showQuestions();
}

var clockClick = function ( shouldDecrement ) {

    // # Sanity-Check: Ensure that the time should be decremented
    if( shouldDecrement || typeof shouldDecrement == "undefined" || shouldDecrement == null ) {
        time--;
    }

    // # Sanity-Check: That the timer hasn't hit a negative/zero value
    if( time <= 0 ) {
        time = 0;
        showFinishScreen();
    }

    // # Change: The timer display value
    timeDisplay.textContent = time;

};

var showFinishScreen = function() {

    // # Stop: The timer from running
    clearInterval( timerA );

    // # Retrieve: Time value as score
    var score = time;

    // # Hide: The Questions Wrapper
    questionsWrapper.classList.add('hide');

    // # Retrieve: Final Page
    var finalPage = document.getElementById('quizEnd');
    finalPage.classList.remove('hide');

    // # Debugging: Output the current score

    // # Retrieve: Data already stored in local storage
    var userAnswers = localStorage.getItem("user_answers");
    userAnswers = JSON.parse( userAnswers );
    

    // # Retrieve: Score Element to display
    var scoreEl = document.getElementById( "finalScore" );

    // # Set: Score on finish page
    scoreEl.innerHTML = score;

};

// function showQuestions() {
//     // getting question from question array
//     var currentQuestion = questions[currentQuestioni];
//     titleQ.textContent = currentQuestion.title;
//     // clear all choices
//     choicesQ.textContent = "";
//     // get choices
//     currentQuestion.choices.forEach( function(choice,i) {
//         var h2El = document.createElement("h2");
//         h2El.setAttribute("value",choices);
//     });
// }

startButton.onclick = startQuiz;

/**
 *  Function: showQuestions()
 *  Description: Dynamically paint/render questions 
 *      from pre-defined array. 
 *  @param
 */
var showQuestions = function( order ) {

    // # Determine: Order of questions is random or not.
    if( order || typeof order == "undefined" || order == null ) {
        order = "normal";
    }


    // # Sort: Questions array based on order parameter
    if( order == "normal" ) {
        questions.sort( function( a, b ) {
            return a.question_order - b.question_order;
        });
    } else {
        questions.sort( function( a, b ) {
            return Math.random() - 0.5;
        })
    }


    // # Determine: Current Question Index 
    var currentQuestionElData = questionsWrapper.getAttribute('data-current-question-index');


    // # Debugging: Check the value of the showQuestions
    // console.log( questions );
    // console.log( currentQuestionElData );

    // # Determine: Current Question Order
    if( currentQuestionElData == null ) {
        questionsWrapper.setAttribute('data-current-question-index', '0');
        var currentQuestionIndex = 0;
    } else {
        var currentQuestionIndex = parseInt( currentQuestionElData );
    }

    // console.log( questions[ currentQuestionIndex ] );

    // # Sanity-Check: Ensure next question exists in the array, otherwise show the end screen.
    if( typeof questions[ currentQuestionIndex ] != "undefined" ) {
        // console.log( questions[ currentQuestionIndex ] );
    }

    // # Sort: Question Choices in order
    if( order == "normal" ) {
        questions[ currentQuestionIndex ].question_choices.sort( function( a, b ) {
            return a.question_order - b.question_order;
        });
    } else if( order == "random" ) {
        questions[ currentQuestionIndex ].question_choices.sort( function( a, b ) {
            return Math.random() - 0.5;
        });
    }

    // # Set: Question Title
    var currentQuestion = questions[ currentQuestionIndex ];
    var currentQuestionTitle = currentQuestion.question_title;
    var currentQuestionAnswer = currentQuestion.question_answer;
    var currentQuestionChoices = currentQuestion.question_choices;
    
    var newChoicesHTML = '<div class="choices-wrapper">';

    // # Loop: Build each choice individualy by concatenating onto choice string
    for( var questionChoice = 0, totalQuestionChoices = currentQuestionChoices.length; questionChoice < totalQuestionChoices; questionChoice++ ) {

        // # Build: HTML Structure
        
        newChoicesHTML += '<div class="choice-item">';
            newChoicesHTML += '<button class="choice-button" data-value="' + currentQuestionChoices[ questionChoice ].choice_value + '">'
                newChoicesHTML += parseInt(questionChoice + 1) + ". " + currentQuestionChoices[ questionChoice ].choice_text;
            newChoicesHTML += "</button>";
        newChoicesHTML += '</div>';

    }

    newChoicesHTML += '</div>';

    // # Retrieve: HTML Elements to add replace content with
    var titleQ = document.getElementById("questionsTitle");
    var choicesQ = document.getElementById("choices");

    // # Set: Question Title to become the new HTML of associated element
    titleQ.innerHTML = currentQuestionTitle;

    // # Set: Question Choices to become the new HTML of associated element
    choicesQ.innerHTML = newChoicesHTML;

    // # Sanity-Check: Ensure Hide class is not on Questions Wrapper
    questionsWrapper.classList.remove('hide');

    // # Retrieve: Buttons Dynamically
    var choicesButtons = choicesQ.querySelectorAll('.choice-button');

    // # Bind: Click-Event to dynamically generated buttons
    for( var currentChoice = 0, totalChoices = choicesButtons.length; currentChoice < totalChoices; currentChoice++ ) {
        choicesButtons[ currentChoice ].addEventListener('click', verifyAnswers);
    }

};


/**
 *  Function: verifyAnswers
 *  Description: Check that the answer recorded is correct,
 *      save them to local storage.
 * 
 *  @param {Event} clickEvent - Event behvaiour passed from browser
 *  @return void
 */
var verifyAnswers = function( clickEvent ) {

    // # Prevent: Default behaviour from button click-event
    clickEvent.preventDefault();

    // # Determine: Current Button
    var currentButton = this;
    
    // # Retrieve: Current Question Index
    var currentQuestionIndex = parseInt( questionsWrapper.getAttribute("data-current-question-index") );

    // # Define: Current Question that is being displayed
    var currentQuestion = questions[ currentQuestionIndex ];

    // # Determine: Current Answer being selected
    var selectedAnswer = currentButton.getAttribute('data-value');

    // # Debugging: Output selected Answer
    // console.log( "Selected Answer: " + selectedAnswer );

    // # Check: Answer Correct
    var answerIsCorrect = currentQuestion.question_answer.toLowerCase().trim() == selectedAnswer.toLowerCase().trim();

    // # Debugging: Output Answer is Correct
    // console.log('Chosen Answer is correct: ' + ( answerIsCorrect ? "✔️" : "❌" ) );

    // # Debugging: Output to console the current question
    // console.log( currentQuestion );


    // # Get: Current Timer value
    var currentTimerValue = time;

    // # Decrement: Timer Value
    if( answerIsCorrect == false ) {
        time = time - 10;
        clockClick( false );
    }


    // # Save: Current User Answers
    saveUserAnswerToLocalStorage( 
        currentQuestionIndex,
        time,
        answerIsCorrect,
        selectedAnswer
    );

    // # Check: Next question is available/exists
    var nextQuestionIndex = currentQuestionIndex + 1;
    var nextQuestion = questions[ nextQuestionIndex ];

    if( typeof nextQuestion != "undefined" && nextQuestion != null ) {

        // # Set: Attribute to be next question index, before displaying
        questionsWrapper.setAttribute('data-current-question-index', nextQuestionIndex);

        // # Shift: To next screen/question
        showQuestions();
    } else {
        showFinishScreen();
    }



};


/**
 *  Function: saveUserAnswerToLocalStorage()
 *  Description: Save user answers and extra meta information to local storage
 *  
 *  @param {Integer} currentQuestionIndex - The index of the of the question
 *  @param {Integer} time - The remaining time when the user clicked on an answer
 *  @param {Boolean} answerIsCorrect - Whether or not the selected answer checks out
 *  @param {String} selectedAnswer - The value of the answer selected.
 *  @return void
 */
var saveUserAnswerToLocalStorage = function( currentQuestionIndex, time, answerIsCorrect, selectedAnswer ) {

    // # Define: Data to add to Local Storage
    var dataToStore = {
        questionIndex: currentQuestionIndex,
        time: time,
        answerCorrect: answerIsCorrect,
        selectedAnswer: selectedAnswer,
    };


    // # Retrieve: Data already stored in local storage
    var userAnswers = localStorage.getItem("user_answers");
    
    // # Case: First time adding in, ensure data is wrapped within an array
    if( userAnswers == null || !Array.isArray( userAnswers ) ) {
        userAnswers = [ dataToStore ];
    } else {
        userAnswers = JSON.parse( userAnswers );
        userAnswers.push( dataToStore );
    }

    console.log( JSON.stringify( userAnswers ) );

    // # Set: Data back into localStorage
    localStorage.setItem("user_answers", JSON.stringify( userAnswers ) );


};


// # Retrieve: Final Submit button to bind event
var submitScoreBtn = document.getElementById('submitBtn');



/**
 *  Function: showScoreboard
 *  Description: Hides current pages and shows the scoreboard
 */
var showScoreboard = function( clickEvent ) {

    // # Prevent: Default behaviour of button
    if( typeof clickEvent != "undefined" && clickEvent != null ) {
        clickEvent.preventDefault();
    }

    // # Retrieve: Scoreboard ELement
    var scoreboardWrapper = document.getElementById('scoreboardWrapper');
    var quizEndWrapper = document.getElementById('quizEnd');

    // # Retrieve: User's Name/Initials for consumption
    var username = document.getElementById('userName').value;

    // # Debugging: Output username to console
    console.log( username );
    
    // # Hide: Questions Wrapper
    quizEndWrapper.classList.add('hide');
    questionsWrapper.classList.add('hide');

    // # Display: Scoreboard Page
    scoreboardWrapper.classList.remove('hide');

    // # Define: Object data to save for score
    var scoreToSave = {
        userName: username,
        score:  time,
    };

    // # Save: User & Their score
    
    if( typeof clickEvent != "undefined" && clickEvent != null ) {
        var savedScores = localStorage.getItem("scoreboard");
        if( savedScores == null ) {
            savedScores = [ scoreToSave ];
        } else {
            savedScores = JSON.parse( savedScores );
            savedScores.push( scoreToSave );
            savedScores.sort(function( a, b ) {
                return b.score - a.score;
            });
        }

        
        localStorage.setItem("scoreboard", JSON.stringify( savedScores) );
    } else {
        savedScores = [];
    }

    // # Generate: HTML to display
    var scoreboardHtml = '<ol class="scoreboard-list">';

    // # Loop: Add scores to HTML list
    for( var currentScore = 0, totalScores = savedScores.length < 100 ? savedScores.length : 100; currentScore < totalScores; currentScore++ ) {
        
        console.log( savedScores[ currentScore ] );
        scoreboardHtml += '<li class="score-list-item">';
            scoreboardHtml += savedScores[ currentScore ].userName + " - " + savedScores[ currentScore ].score;
        scoreboardHtml += '</li>';

    }

    scoreboardHtml += '</ol>';
    
    // # Retrieve: Scores element to add generated data to
    var scoreEl = document.getElementById('scores');
    scoreEl.innerHTML = scoreboardHtml;

    

};


console.log( submitScoreBtn );

// # Bind: Click Event to showScoreboard() function
submitScoreBtn.addEventListener('click', showScoreboard);


/**
 *  Function: clearScoreboard()
 *  Descrption: Removes items from localStorage
 *  @return void
 */
var clearScoreboard = function() {
    localStorage.removeItem('user_answers');
    localStorage.removeItem('scoreboard');

    showScoreboard();
};

// # Retrieve: Clear Score Button
var clearScoreBtn = document.getElementById('clearScoreboard');

// # Bind: Click Event to showScoreboard() function
clearScoreBtn.addEventListener('click', clearScoreboard);


/**
 *  Function: startQuizAgain
 *  Description: Start timer and navigate user back to start
 */
var startQuizAgain = function() {

    var mainScreen = document.getElementById("main-screen");
    
    mainScreen.classList.remove("hide");
    questionsWrapper.classList.add("hide");
    document.getElementById('quizEnd').classList.add("hide");
    document.getElementById('scoreboardWrapper').classList.add("hide");
    questionsWrapper.removeAttribute('data-current-question-index');
    document.getElementById('userName').value = "";
    
    time = 100;
    timeDisplay.textContent = time;

};

var startQuizAgainBtn = document.getElementById('starQuizAgain');
startQuizAgainBtn.addEventListener('click', startQuizAgain);