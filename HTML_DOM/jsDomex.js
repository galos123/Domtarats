//list of questions
const questionList = [
    {
        question: "this is question 1",
        answer1: "this is answer 1",
        answer2: "this is answer 2",
        answer3: "this is answer 3",
        answer4: "this is answer 4",
        rightAnswer: "this is answer 1",
    },
    {
        question: "this is question 2",
        answer1: "this is answer 1 in 2",
        answer2: "this is answer 2 in 2",
        answer3: "this is answer 3 in 2",
        answer4: "this is answer 4 in 2",
        rightAnswer: "this is right answer in 2",
    },
];

//defining all buttons as variables
let questionSquare = document.getElementById("questionSquare");
let nextBtn = document.getElementById("nextBtn");
let restartBtn = document.getElementById("restartBtn");
let startGameBtn = document.getElementById("startGameBtn");
let endNextBtn = document.getElementById("endNextBtn");

//variables for how many times the player won
let gamesWon = 0;
let gamesLost = 0;
let playing = true;

//variables for the player score in the current game
let questionAsked = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

//a list of all the questions as divs
const madeQuestions = [];

function createQuestion(questionindex) {
    //creating a div for the question
    const questionContainer = document.createElement("div");

    //createing header for the question
    const questionheader = document.createElement("h2");
    questionheader.textContent = questionList[questionindex]["question"];
    questionContainer.appendChild(questionheader);

    //making the checkbox and label for each question
    for (let i = 1; i < Object.keys(questionList[questionindex]).length - 1; i++) {
        const answer = document.createElement("input");

        //createing answer checkbox
        answer.setAttribute("type", "radio");
        answer.setAttribute("name", "question" + questionindex);
        answer.setAttribute("id", "answer" + i + "question" + questionindex);
        answer.setAttribute("value", questionList[questionindex]["answer" + i]); //not sure if this is needed

        //createing label for each answer
        const label = document.createElement("label");
        label.setAttribute("for", "answer" + i + "question" + questionindex);
        label.textContent = questionList[questionindex]["answer" + i];

        //adding answer and label to answer container with a break line
        questionContainer.appendChild(answer);
        questionContainer.appendChild(label);
        questionContainer.appendChild(document.createElement("br"));
    }

    return questionContainer; //returning the question div
}

function nextBtnClick(questionindex) {
    //making list of all the answers and an empty variable for
    const answers = madeQuestions[questionindex].getElementsByTagName("input");
    let checkedanswer = null;

    //check if the right answer is selected
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            //check if the answer is selected
            checkedanswer = answers[i].value;

            //case for right answer
            if (checkedanswer == questionList[questionindex]["rightAnswer"]) {
                alert("correct");
                correctAnswers++;
                questionAsked++;
                nextQuestion();
                return true;
            }

            //case for wrong answer
            else {
                alert("wrong");
                wrongAnswers++;
                questionAsked++;
                nextQuestion();
                return false;
            }
        }
    }

    //case for no answer selected
    alert("no answer was selected pls try again");
}

function returnToStart() {
    //used after restarting the game

    //remove all screens and adding the start screen
    endScreen.remove();
    mainPart.remove();
    topBar.remove();
    body.appendChild(startScreen);
}

function resetCheckboxes() {
    //go over all the questions
    for (let i = 0; i < madeQuestions.length; i++) {
        //going over all the checkboxes and resetting them
        for (let j = 0; j < madeQuestions[i].getElementsByTagName("input").length; j++) {
            madeQuestions[i].getElementsByTagName("input")[j].checked = false;
        }
    }
}

function pageStart() {
    //resetting all stats
    questionAsked = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    //activate all buttons
    nextBtn.addEventListener("click", function () {
        nextBtnClick(questionAsked);
    });

    endNextBtn.addEventListener("click", function () {
        returnToStart(questionAsked);
    });

    restartBtn.addEventListener("click", function () {
        restartGame();
    });

    startGameBtn.addEventListener("click", function () {
        newGame();
    });

    //initialize questions
    for (let i = 0; i < questionList.length; i++) {
        console.log("made question" + i);
        madeQuestions.push(createQuestion(i));
    }

    //make all main parts js variables
    endBtnPlace = document.getElementById("endBtnPlace");
    mainPart = document.getElementById("mainPart");
    topBar = document.getElementById("topBar");
    startScreen = document.getElementById("startScreen");
    endScreen = document.getElementById("endScreen");

    endScreen.remove();
    mainPart.remove();
    topBar.remove();
    body.appendChild(startScreen);
}

function newGame() {
    questionAsked = 0; //keep only needed page parts needed
    body.appendChild(topBar);
    body.appendChild(mainPart);
    startScreen.remove();
    endScreen.remove();

    //remove all questions
    while (questionSquare.firstChild) {
        questionSquare.firstChild.remove();
    }

    //reset all chekcboxes
    resetCheckboxes();

    //push first question
    questionSquare.appendChild(madeQuestions[0]);
}

function nextQuestion() {
    if (questionAsked < questionList.length) {
        while (questionSquare.firstChild) {
            questionSquare.firstChild.remove();
        }
        //push next question
        questionSquare.appendChild(madeQuestions[questionAsked]);
        //next button is active
    } else gameOver();
}

function gameOver() {
    //remove all questions from question square
    while (questionSquare.firstChild) {
        questionSquare.firstChild.remove();
    }

    //remove mainpart
    mainPart.remove();

    //empty endScreen and making text for endScreen
    while (endScreen.firstChild) {
        endScreen.firstChild.remove();
    }
    let endHeader = document.createElement("h1");
    let txt = document.createTextNode("you got " + correctAnswers + " out of " + questionList.length + " correct");
    endHeader.appendChild(txt);

    //adding elements to endScreen
    endScreen.appendChild(endHeader);
    endScreen.appendChild(endBtnPlace);
    endBtnPlace.appendChild(endNextBtn);

    //adding endscreen
    body.appendChild(endScreen);
}

function restartGame() {
    //restart stats and remove everything but endScreen
    gamesLost++;
    questionAsked = 0;
    rightAnswer = 0;
    wrongAnswers = 0;
    mainPart.remove();
    topBar.remove();
    startScreen.remove();
    body.appendChild(endScreen);

    //empty endScreen
    while (endScreen.firstChild) {
        endScreen.firstChild.remove();
    }

    //making text for endScreen
    let endHeader = document.createElement("h1");
    let txt = document.createTextNode(
        "your total score is " +
            gamesWon +
            " games won and " +
            gamesLost +
            " games lost" +
            " (loss was added because you restarted the game)"
    );
    endHeader.appendChild(txt);

    //adding elements to endScreen
    endScreen.appendChild(endHeader);
    endScreen.appendChild(endBtnPlace);
    endBtnPlace.appendChild(endNextBtn);
}

// -----------------------------------------------------------------------------------------
pageStart();
