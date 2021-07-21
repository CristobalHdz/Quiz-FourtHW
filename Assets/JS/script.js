const start = document.getElementById("buttonPlay")
const homeOptions = document.getElementById("homeOptions")
const quiz = document.getElementById("quizContainer")
const quizContainer = document.getElementById("quizContainer")
const question = document.getElementById("questionText")
const counter = document.getElementById("counter")
const choiceA = document.getElementById("A")
const choiceB = document.getElementById("B")
const choiceC = document.getElementById("C")
const choiceD = document.getElementById("D")
const progress = document.getElementById("progress")
const score = document.getElementById("score")

// List of questions, options and answers
let questions = [
    {
        question: "What is 2+2?",
        choiceA: "1",
        choiceB: "1",
        choiceC: "4",
        choiceD: "1",
        correct: "C"
    },
    {
        question: "What is 2+2?",
        choiceA: "4",
        choiceB: "1",
        choiceC: "1",
        choiceD: "1",
        correct: "A"
    },
    {
        question: "What is 2+2?",
        choiceA: "1",
        choiceB: "1",
        choiceC: "1",
        choiceD: "4",
        correct: "D"
    },
];

//Questions render
let lastQuestion = questions.length - 1;
let runningQuestion = 0; //Current Quesiton
let timeLeft = 60; //Time left on quiz

function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<h1>" + q.question + "</h1>"
    choiceA.innerHTML = "<h1>" + q.choiceA + "</h1>"
    choiceB.innerHTML = "<h1>" + q.choiceB + "</h1>"
    choiceC.innerHTML = "<h1>" + q.choiceC + "</h1>"
    choiceD.innerHTML = "<h1>" + q.choiceD + "</h1>"
};

//start quiz
start.addEventListener("click", startQuiz);

function startQuiz() { //Notes: DONT USE ARROW FUNCTIONS WHEN ADDING EVENT LISTENER... FOR NOW
    homeOptions.style.display = "none";
    quiz.style.display = "block"
    renderQuestion();
    renderProgress();
    renderCounter();
}

startQuiz(); //NOTE: REMOVE AFTER TESTING


// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML = "<div><h1>" + qIndex + "/" + questions.length + "</h1></div>"
    }
};

//render time counter
function renderCounter() {
    
    let timerInterval = setInterval(function () {
        timeLeft--;
        counter.textContent = timeLeft

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            counter.textContent = "Time is up" //NOTE: MAKE IT END THE PROGRAM
        }
    }, 1000);
}


