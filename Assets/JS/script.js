// Start Menu Window
const start = document.getElementById("buttonPlay")
const homeOptions = document.getElementById("homeOptions")
const quiz = document.getElementById("quizContainer")
const buttonHiscores = document.getElementById("buttonHiscores")
//Quiz Window
const question = document.getElementById("questionText")
const counter = document.getElementById("counter")
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const choiceD = document.getElementById("D")
const progress = document.getElementById("progress")
const score = document.getElementById("score")
const wrongText = document.getElementById("wrongText")
//Hiscores Menu
const results = document.getElementById("resultsContainer")
const returnMenu = document.getElementById("returnMenu")
const nameTag = document.getElementById("nameTag")
const inputAccept = document.getElementById("inputAccept")
const nameTagName = document.getElementById("nameTagName")
const nameTagScore = document.getElementById("nameTagScore")

// List of questions, options and answers
let questions = [
    {
        id: "1",
        question: "Which of the following best describes what a function in JS is used for",
        choiceA: "A function creates new variables",
        choiceB: "A function is a reusable piece of code that can accept input and performs a specific task",
        choiceC: "A function stores data",
        choiceD: "A function allows for the use of mathematical operators",
        correct: "B"
    },
    {
        question: "What is the purpose of a parameter?",
        choiceA: "To call a function",
        choiceB: "To specify actual values passed to a function",
        choiceC: "To allow a function to accept data",
        choiceD: "None of the above",
        correct: "C"
    },
    {
        question: "Which of the following is NOT a looping structure?",
        choiceA: "If",
        choiceB: "For",
        choiceC: "While",
        choiceD: "For-While",
        correct: "A"
    },
    {
        question: "Which of the following is a JS data type ",
        choiceA: "null",
        choiceB: "undefined",
        choiceC: "object",
        choiceD: "All of the above",
        correct: "D"
    },
    {
        question: "What are the three important manipulations done in a for loop on a loop variable? ",
        choiceA: "Initialization,Testing, Incrementation",
        choiceB: "Updation, Incrementation, Initialization",
        choiceC: "Initialization,Testing, Updation",
        choiceD: "Testing, Updation, Testing",
        correct: "C"
    },
    {
        question: "Which of the following is syntactically correct for loop?",
        choiceA: "for (1<=10,i++)",
        choiceB: "for i=1 to 10",
        choiceC: "for (i=0;i<=10;i++)",
        choiceD: "for (i=0;i<=10)",
        correct: "C"
    },
    {
        question: "The statement is an example of 'while (3==3) {}' ",
        choiceA: "A typographical error",
        choiceB: "An infinite loop",
        choiceC: "An illegal JS statement",
        choiceD: "None of the above",
        correct: "B"
    },
    {
        question: "What would be the output of'console.log(typeof('5' + 5 ))?  ",
        choiceA: "number",
        choiceB: "string",
        choiceC: "null",
        choiceD: "object",
        correct: "B"
    },
    {
        question: "Which operator is known as the equality operator; which checks whether its two operators are 'equal'?",
        choiceA: "=",
        choiceB: "==",
        choiceC: "===",
        choiceD: "&&",
        correct: "B"
    },
    {
        question: "If an operator is NaN or converts to NaN, what will the comparison operator return?",
        choiceA: "True",
        choiceB: "False",
        choiceC: "Undefined",
        choiceD: "NaN",
        correct: "B"
    },
];


//Variables render
let lastQuestion = questions.length;
let runningQuestion = 0; //Current Quesiton
let timeLeft = 60; //Time left on quiz
let quizScore = 0 //Number of correct answers
let questionCount = 1 //Question number
let hiscoreOverride = 1 //If 0 then you can change the hiscore, if 1 then you can't



function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<h1>" + q.question + "</h1>"
    choiceA.innerHTML = "<h1>" + q.choiceA + "</h1>"
    choiceB.innerHTML = "<h1>" + q.choiceB + "</h1>"
    choiceC.innerHTML = "<h1>" + q.choiceC + "</h1>"
    choiceD.innerHTML = "<h1>" + q.choiceD + "</h1>"
};

//render time counter
function renderCounter() {
    let timerInterval = setInterval(function () {
        timeLeft--;
        counter.textContent = timeLeft
        if (timeLeft <= 0) {
            openHiscores()
            timeLeft = 60
            clearInterval(timerInterval)
        }
    }, 1000);
};

//start quiz
start.addEventListener("click", startQuiz);
function startQuiz() {
    homeOptions.style.display = "none";
    quiz.style.display = "block"
    renderQuestion();
    renderCounter();
    hiscoreOverride--;
}

//Open Hiscores from main page
buttonHiscores.addEventListener("click", openHiscores);
function openHiscores() {
    homeOptions.style.display = "none";
    quiz.style.display = "none"
    results.style.display = "block"
}

// Go back to main page from hiscores page
returnMenu.addEventListener("click", openMainMenu);
function openMainMenu() {
    location.reload();
}

//Check Answers
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        quizScore++; //Correct answer
        if (questionCount < lastQuestion) {
            questionCount++;
            runningQuestion++;
            renderQuestion();
            score.innerHTML = "<h1>" + quizScore + "</h1>"
            progress.textContent = questionCount + "/" + questions.length
        } else {
            openHiscores();
        }

    } else {
        timeLeft -= 5
        //Wrong answer text show
        wrongText.innerHTML ="Wrong answer, 5 seconds have been subtracted"
        wrongText.style.color = "White"
        let wrongTextTime = 0

        let wrongTextTimerInterval = setInterval(function () {
            wrongTextTime++;
            if (wrongTextTime === 2) {
                wrongText.style.color = "transparent"
            }
        }, 1000)
    }
}

//Hiscores
nameTagName.innerHTML = localStorage.getItem("playerName")
nameTagScore.innerHTML = localStorage.getItem("finalScore")

inputAccept.addEventListener("click", function (event) {
    event.preventDefault();

    var playerName = nameTag.value
    var finalScore = quizScore

    if(hiscoreOverride == 0) {

        localStorage.setItem("playerName", nameTag.value)
        localStorage.setItem("finalScore", quizScore)
    
        nameTagName.innerHTML = localStorage.getItem("playerName")
        nameTagScore.innerHTML = localStorage.getItem("finalScore")

    } else {
        alert("You need to play the game to enter a hiscore!!")

    }
})
